import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, PaymentStatus, TransactionStatus, TransactionType, TransactionCategory } from '@prisma/client';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: any;

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {
    const key = this.config.get<string>('STRIPE_SECRET_KEY');
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY is not configured');
    }
    this.stripe = new Stripe(key, { apiVersion: this.config.get<any>('STRIPE_API_VERSION') });
  }

  async createCheckoutSession(userId: string, accountId: string, amount: number) {
    const account = await this.prisma.account.findUnique({ where: { id: accountId } });
    if (!account || account.userId !== userId) {
      throw new BadRequestException('Account not found or not yours');
    }

    const amountInCents = Math.round(amount * 100);
    if (amountInCents < 50) {
      throw new BadRequestException('Minimum amount is $0.50');
    }

    let session: any;
    try {
      session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: { name: 'Add Money to Paymark' },
              unit_amount: amountInCents,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${this.config.get<string>('FRONTEND_URL')}/dashboard/wallet?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${this.config.get<string>('FRONTEND_URL')}/dashboard/wallet?cancelled=true`,
        metadata: {
          userId,
          accountId,
        },
      });
    } catch (err: any) {
      if (err?.type === 'StripeAuthenticationError') {
        throw new BadRequestException('Invalid Stripe API key. Please check your STRIPE_SECRET_KEY in .env');
      }
      throw new InternalServerErrorException(`Stripe error: ${err?.message || 'Unknown error'}`);
    }

    await this.prisma.payment.create({
      data: {
        amount,
        stripeSessionId: session.id,
        userId,
        accountId,
        status: PaymentStatus.PENDING,
      },
    });

    return { url: session.url!, sessionId: session.id };
  }

  async verifySession(sessionId: string) {
    let session: any;
    try {
      session = await this.stripe.checkout.sessions.retrieve(sessionId);
    } catch {
      throw new BadRequestException('Invalid session ID');
    }

    if (session.payment_status !== 'paid') {
      throw new BadRequestException('Session not paid yet');
    }

    await this.completePayment(session);
    return { status: 'completed' };
  }

  async handleWebhook(rawBody: Buffer, signature: string) {
    const webhookSecret = this.config.get<string>('STRIPE_WEBHOOK_SECRET');
    if (!webhookSecret) {
      throw new InternalServerErrorException('Webhook secret not configured');
    }

    let event: any;
    try {
      event = this.stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch {
      throw new BadRequestException('Invalid webhook signature');
    }

    if (event.type === 'checkout.session.completed') {
      await this.completePayment(event.data.object as any);
    }

    return { received: true };
  }

  private async completePayment(session: any) {
    const payment = await this.prisma.payment.findFirst({
      where: { stripeSessionId: session.id, status: PaymentStatus.PENDING },
    });

    if (!payment) return;

    const amount = new Prisma.Decimal(payment.amount.toString());

    await this.prisma.$transaction(async (tx) => {
      const { count } = await tx.payment.updateMany({
        where: { id: payment.id, status: PaymentStatus.PENDING },
        data: {
          status: PaymentStatus.COMPLETED,
          stripePaymentIntentId: session.payment_intent as string,
        },
      });

      if (count === 0) return;

      await tx.account.update({
        where: { id: payment.accountId },
        data: { balance: { increment: amount } },
      });

      await tx.transaction.create({
        data: {
          amount,
          type: TransactionType.INCOME,
          category: TransactionCategory.OTHER,
          senderAccountId: payment.accountId,
          status: TransactionStatus.COMPLETED,
          externalReference: session.id,
          processedAt: new Date(),
        },
      });

      await tx.notification.create({
        data: {
          userId: payment.userId,
          title: 'Money Received',
          message: `$${Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })} has been added to your account via Stripe.`,
        },
      });
    });
  }
}
