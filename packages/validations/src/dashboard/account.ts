import { z } from "zod";

export const CreateAccountSchema =
  z.object({
    name: z
      .string()
      .min(2)
      .max(50),

    type: z.enum([
      "CHECKING",
      "SAVINGS",
      "CREDIT",
      "INVESTMENT",
      "CASH",
    ]),
  });



export type CreateAccountInput =
  z.infer<typeof CreateAccountSchema>;




