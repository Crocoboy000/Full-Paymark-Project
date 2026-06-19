import { useQuery } from "@tanstack/react-query";

import {
  getAccounts,
} from "@/services/account.api";

export const useAccounts =
  () =>
    useQuery({
      queryKey: [
        "accounts",
      ],
      queryFn:
        getAccounts,
    });