export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export type Payment = {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  stripeSessionId: string;
  stripePaymentIntentId: string | null;
  userId: string;
  accountId: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateCheckoutSessionResponse = {
  url: string;
  sessionId: string;
};
