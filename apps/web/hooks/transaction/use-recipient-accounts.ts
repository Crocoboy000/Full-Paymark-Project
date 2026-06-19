

import { useMutation } from "@tanstack/react-query";

import {
  searchRecipientAccounts,
} from "@/services/transaction.api";

export const useRecipientAccounts =
  () =>
    useMutation({
      mutationFn:
        searchRecipientAccounts,
    });