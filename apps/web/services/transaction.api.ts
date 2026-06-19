import { api } from "@/lib/api";

import type {
  SearchRecipientResponse,
  TransferInput,
} from "@paymark/types";

export const getRecentTransactions =
  async () => {
    const { data } =
      await api.get(
        "/transactions/recent",
      );

    return data;
};






export const searchRecipientAccounts =
  async (
    email: string,
  ): Promise<SearchRecipientResponse> => {
    const { data } =
      await api.get<SearchRecipientResponse>(
        "/account/search",
        {
          params: {
            email,
          },
        },
      );

    return data;
  };
export const createTransfer =
  async (
    payload: TransferInput,
  ) => {
    const { data } =
      await api.post(
        "/transactions/transfer",
        payload,
      );

    return data;
  };