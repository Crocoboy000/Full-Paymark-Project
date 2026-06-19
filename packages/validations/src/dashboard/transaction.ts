import { z } from "zod";

export const CreateTransactionSchema = z
  .object({
    senderAccountId: z.string().min(1, "Sender account is required"),

    receiverAccountId: z.string().min(1, "Receiver account is required").optional(),

    amount: z
      .number()
      .positive("Amount must be greater than 0"),

    type: z.enum(["INCOME", "EXPENSE", "TRANSFER"]),

    category: z.string().max(50).optional(),

    description: z.string().max(255).optional(),

    externalReference: z.string().max(255).optional(),

    idempotencyKey: z.string().max(255).optional(),
  })
  .superRefine((val, ctx) => {
    if (val.type === "TRANSFER" && !val.receiverAccountId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "receiverAccountId is required for TRANSFER",
        path: ["receiverAccountId"],
      });
    }
  });



  export const CreateTransferSchema =
  z.object({
    senderAccountId: z
      .string()
      .min(
        1,
        "Sender account is required",
      ),

    receiverEmail: z
      .string()
      .email(
        "Valid recipient email is required",
      ),

    amount: z
      .number()
      .positive(
        "Amount must be greater than 0",
      ),

    description: z
      .string()
      .max(255)
      .optional(),
  });

export type CreateTransferInput =
  z.infer<
    typeof CreateTransferSchema
  >;

  
export type CreateTransactionInput = z.infer<typeof CreateTransactionSchema>;
