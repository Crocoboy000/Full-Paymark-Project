import { create } from "zustand";

import {
  DashboardRevenue,
  DashboardState,
  User,
} from "@paymark/types";

type DashboardStore = {
  user: User | null;

  summary: DashboardState["summary"] | null;

  accounts: DashboardState["accounts"];

  recentTransactions:
    DashboardState["recentTransactions"];

  chartData:
    DashboardRevenue;

  userLoading: boolean;
  summaryLoading: boolean;
  accountsLoading: boolean;
  recentTransactionsLoading: boolean;
  chartDataLoading: boolean;

  userError: string | null;
  summaryError: string | null;
  accountsError: string | null;
  recentTransactionsError: string | null;
  chartDataError: string | null;

  setUser: (
    user: User,
  ) => void;

  setSummary: (
    summary: DashboardState["summary"],
  ) => void;

  setAccounts: (
    accounts: DashboardState["accounts"],
  ) => void;

  setRecentTransactions: (
    transactions: DashboardState["recentTransactions"],
  ) => void;

  setChartData: (
    data: DashboardState["chartData"],
  ) => void;

  setUserLoading: (
    loading: boolean,
  ) => void;

  setSummaryLoading: (
    loading: boolean,
  ) => void;

  setAccountsLoading: (
    loading: boolean,
  ) => void;

  setRecentTransactionsLoading: (
    loading: boolean,
  ) => void;

  setChartDataLoading: (
    loading: boolean,
  ) => void;

  setUserError: (
    error: string | null,
  ) => void;

  setSummaryError: (
    error: string | null,
  ) => void;

  setAccountsError: (
    error: string | null,
  ) => void;

  setRecentTransactionsError: (
    error: string | null,
  ) => void;

  setChartDataError: (
    error: string | null,
  ) => void;

  clearDashboard: () => void;
};

export const useDashboardStore =
  create<DashboardStore>((set) => ({
    user: null,

    summary: null,

    accounts: [],

    recentTransactions: [],

    chartData: { data: [], transactionCount: 0 },

    userLoading: false,
    summaryLoading: false,
    accountsLoading: false,
    recentTransactionsLoading: false,
    chartDataLoading: false,

    userError: null,
    summaryError: null,
    accountsError: null,
    recentTransactionsError: null,
    chartDataError: null,

    setUser: (user) =>
      set({
        user,
      }),

    setSummary: (summary) =>
      set({
        summary,
      }),

    setAccounts: (accounts) =>
      set({
        accounts,
      }),

    setRecentTransactions: (
      transactions,
    ) =>
      set({
        recentTransactions:
          transactions,
      }),

    setChartData: (data) =>
      set({
        chartData: data,
      }),

    setUserLoading: (
      loading,
    ) =>
      set({
        userLoading: loading,
      }),

    setSummaryLoading: (
      loading,
    ) =>
      set({
        summaryLoading:
          loading,
      }),

    setAccountsLoading: (
      loading,
    ) =>
      set({
        accountsLoading:
          loading,
      }),

    setRecentTransactionsLoading: (
      loading,
    ) =>
      set({
        recentTransactionsLoading:
          loading,
      }),

    setChartDataLoading: (
      loading,
    ) =>
      set({
        chartDataLoading:
          loading,
      }),

    setUserError: (
      error,
    ) =>
      set({
        userError: error,
      }),

    setSummaryError: (
      error,
    ) =>
      set({
        summaryError: error,
      }),

    setAccountsError: (
      error,
    ) =>
      set({
        accountsError: error,
      }),

    setRecentTransactionsError: (
      error,
    ) =>
      set({
        recentTransactionsError:
          error,
      }),

    setChartDataError: (
      error,
    ) =>
      set({
        chartDataError: error,
      }),

    clearDashboard: () =>
      set({
        user: null,

        summary: null,

        accounts: [],

        recentTransactions: [],

        chartData: { data: [], transactionCount: 0 },

        userLoading: false,
        summaryLoading: false,
        accountsLoading: false,
        recentTransactionsLoading: false,
        chartDataLoading: false,

        userError: null,
        summaryError: null,
        accountsError: null,
        recentTransactionsError: null,
        chartDataError: null,
      }),
  }));