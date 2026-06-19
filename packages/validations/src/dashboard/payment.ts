import { z } from "zod";

export const CreateCheckoutSessionSchema = z.object({
  amount: z.number().positive("Amount must be greater than 0"),
  accountId: z.string().min(1, "Account is required"),
});

export type CreateCheckoutSessionInput = z.infer<typeof CreateCheckoutSessionSchema>;
