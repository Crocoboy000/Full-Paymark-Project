import { useMutation } from "@tanstack/react-query";

import {
  createAccount,
} from "@/services/account.api";

export const useCreateAccount =
  () =>
    useMutation({
      mutationFn: createAccount,
    });