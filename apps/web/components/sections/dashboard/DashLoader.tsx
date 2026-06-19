"use client";

import { useAccounts } from "@/hooks/dashboard/use-accounts";
import { useRecentTransactions } from "@/hooks/dashboard/use-recent";
import { useDashboardSummary } from "@/hooks/dashboard/use-summary";
import { useEffect } from "react";
import { useDashboardStore } from "@/store/dashboard.store";
import { useRevenue } from "@/hooks/dashboard/use-revenue";
import { useUser } from "@/hooks/dashboard/use-user";

export default function DashboardLoader() {


  const {
    data:user,
    isLoading: userLoading,
    error: errorUser,
  } = useUser();

const {
  data: accounts,
  isLoading,
  error,
} = useAccounts();

const {
  data: revenue,
  isLoading: isLoadingRevenue,
  error: errorRevenue,
} = useRevenue();

const {
  data: recentTransactions,
  isLoading: isLoadingRecentTransactions,
  error: errorRecentTransactions,
} = useRecentTransactions();

const {
  data: summary,
  isLoading: isLoadingSummary,
  error: errorSummary,
} = useDashboardSummary();


useEffect(() => {
  const store =
    useDashboardStore.getState();

  store.setUserLoading(
    userLoading,
  );

  store.setUserError(
    errorUser
      ? errorUser.message
      : null,
  );

  if (user) {
    store.setUser(user);
  }
}, [user, userLoading, errorUser]);

useEffect(() => {
  const store =
    useDashboardStore.getState();

  store.setAccountsLoading(
    isLoading,
  );

  store.setAccountsError(
    error
      ? error.message
      : null,
  );

  if (accounts) {
    store.setAccounts(accounts);
  }
}, [accounts, isLoading, error]);





useEffect(() => {
  const store =
    useDashboardStore.getState();

  store.setChartDataLoading(
    isLoadingRevenue,
  );

  store.setChartDataError(
    errorRevenue
      ? errorRevenue.message
      : null,
  );

  if (revenue) {
    store.setChartData(revenue);
  }
}, [
  revenue,
  isLoadingRevenue,
  errorRevenue,
]);




useEffect(() => {
  const store =
    useDashboardStore.getState();

  store.setRecentTransactionsLoading(
    isLoadingRecentTransactions,
  );

  store.setRecentTransactionsError(
    errorRecentTransactions
      ? errorRecentTransactions.message
      : null,
  );

  if (recentTransactions) {
    store.setRecentTransactions(
      recentTransactions,
    );
  }
}, [
  recentTransactions,
  isLoadingRecentTransactions,
  errorRecentTransactions,
]);




useEffect(() => {
  const store =
    useDashboardStore.getState();

  store.setSummaryLoading(
    isLoadingSummary,
  );

  store.setSummaryError(
    errorSummary
      ? errorSummary.message
      : null,
  );

  if (summary) {
    store.setSummary(summary);
  }
}, [
  summary,
  isLoadingSummary,
  errorSummary,
]);

  return null;
}