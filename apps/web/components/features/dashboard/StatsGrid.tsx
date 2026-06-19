"use client";

import StatCard from "@/components/ui/StatCard";
import { useDashboardStore } from "@/store/dashboard.store";

export default function StatsGrid() {
  const summary =
    useDashboardStore(
      (state) => state.summary,
    );

  const loading =
    useDashboardStore(
      (state) => state.summaryLoading,
    );

  const error =
    useDashboardStore(
      (state) => state.summaryError,
    );

  if (loading) {
    return (
      <div>
        Loading summary...
      </div>
    );
  }

  if (error) {
    return (
      <div>
        {error}
      </div>
    );
  }

  if (!summary) {
    return null;
  }

  return (
    <section
      className="
        grid gap-4
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >
      <StatCard
        title="Total Balance"
        value={summary.totalBalance}
      />

      <StatCard
        title="Total Income"
        value={summary.totalIncome}
      />

      <StatCard
        title="Total Expenses"
        value={summary.totalExpenses}
      />

      <StatCard
        title="Net Worth"
        value={summary.netWorth}
      />
    </section>
  );
}