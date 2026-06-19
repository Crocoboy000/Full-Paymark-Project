import { Controller, Post, Body, Headers, Req, UseGuards } from '@nestjs/common';
import type { RawBodyRequest } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { JwtGuard } from '../auth/guards/jwt/jwt.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateCheckoutSessionSchema } from '../../../../packages/validations/src/dashboard/payment';

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @UseGuards(JwtGuard)
  @Post('create-checkout-session')
  async createCheckoutSession(
    @CurrentUser() user: { id: string },
    @Body() body: { amount: number; accountId: string },
  ) {
    const parsed = CreateCheckoutSessionSchema.parse(body);
    return this.stripeService.createCheckoutSession(user.id, parsed.accountId, parsed.amount);
  }

  @UseGuards(JwtGuard)
  @Post('verify-session')
  async verifySession(
    @CurrentUser() user: { id: string },
    @Body() body: { sessionId: string },
  ) {
    return this.stripeService.verifySession(body.sessionId);
  }

  @Post('webhook')
  async handleWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
  ) {
    const rawBody = req.rawBody;
    if (!rawBody) {
      return { error: 'Raw body required' };
    }
    return this.stripeService.handleWebhook(rawBody, signature);
  }

}
