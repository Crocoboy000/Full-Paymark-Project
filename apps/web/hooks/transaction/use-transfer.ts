
import { useMutation } from "@tanstack/react-query";

import {
  createTransfer,
} from "@/services/transaction.api";

export const useTransfer =
  () =>
    useMutation({
      mutationFn:
        createTransfer,
    });