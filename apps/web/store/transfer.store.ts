import { create } from "zustand";
import { TransferRecipientAccount } from "@paymark/types";

type TransferStore = {
  recipientAccounts:
    TransferRecipientAccount[];

  loading: boolean;

  error: string | null;

  selectedAccountId: string;

  setAccounts: (
    accounts: TransferRecipientAccount[],
  ) => void;

  setSelectedAccount: (
    id: string,
  ) => void;

  setLoading: (
    value: boolean,
  ) => void;

  setError: (
    value: string | null,
  ) => void;

  clear: () => void;
};

export const useTransferStore =
  create<TransferStore>((set) => ({
    recipientAccounts: [],
    loading: false,
    error: null,
    selectedAccountId: "",

    setAccounts: (accounts) =>
      set({
        recipientAccounts: accounts,
      }),

    setSelectedAccount: (id) =>
      set({
        selectedAccountId: id,
      }),

    setLoading: (loading) =>
      set({
        loading,
      }),

    setError: (error) =>
      set({
        error,
      }),

    clear: () =>
      set({
        recipientAccounts: [],
        selectedAccountId: "",
        loading: false,
        error: null,
      }),
  }));