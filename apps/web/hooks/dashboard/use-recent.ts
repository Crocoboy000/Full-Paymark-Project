import { useQuery } from "@tanstack/react-query";

import { getRecentTransactions } from "@/services/transaction.api";

export const useRecentTransactions =
  () =>
    useQuery({
      queryKey: [
        "recent-transactions",
      ],
      queryFn:
        getRecentTransactions,
    });