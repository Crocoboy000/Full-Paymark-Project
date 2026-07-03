"use client"

import { useDashboardStore } from "@/store/dashboard.store";
import type { RecentTransaction } from "@paymark/types";

import EmptyState from "@/components/ui/EmptyState";

export function RecentActivity() {
    const data = useDashboardStore(
      (state) => state.recentTransactions,
    );
  
    const recentTransactionsLoading =
      useDashboardStore(
        (state) => state.recentTransactionsLoading,
      );
  
    const recentTransactionsError =
      useDashboardStore(
        (state) => state.recentTransactionsError,
      );
  
    if (recentTransactionsLoading) {
      return (
        <section
          className="
            rounded-3xl
            col-span-12
            md:col-span-4
            xl:col-span-2
            border border-white/[0.05]
            p-5
          "
        >
          Loading accounts...
        </section>
      );
    }
  
    if (recentTransactionsError) {
      return (
        <section
          className="
            rounded-3xl
            col-span-12
            md:col-span-4
            xl:col-span-2
            border border-white/[0.05]
            p-5
          "
        >
          {recentTransactionsError}
        </section>
      );
    }

    if (!data?.length) {
      return (
        <EmptyState
          title="No activity yet"
          message="Your recent transactions will appear here."
        />
      );
    }
  return (
    <aside
      className="
        flex-1
        rounded-3xl
        border border-white/[0.05]
        bg-[linear-gradient(135deg,#0E0E0E,#141414)]
        p-5
      "
    >
      <header className="mb-5">
        <h3 className="text-body font-medium text-white">
          Recent Activity
        </h3>
      </header>

      <ul className="space-y-5">
        {data.map((tx: RecentTransaction) => (
          <li
            key={tx.id}
            className="flex justify-between"
          >
            <div>
              <p className="text-caption text-white">
                {tx.description}
              </p>

              <p className="text-[12px] text-gray3">
                {new Date(
                  tx.createdAt,
                ).toLocaleDateString()}
              </p>
            </div>

            <span
              className={
                tx.type === "INCOME"
                  ? "text-emerald-400"
                  : "text-secondary"
              }
            >
              {tx.type === "INCOME"
                ? "+"
                : "-"}
              ${tx.amount}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}