"use client";

import { useDashboardStore } from "@/store/dashboard.store";
import EmptyState from "@/components/ui/EmptyState";
import LoadingState from "@/components/ui/LoadingState";
import ErrorState from "@/components/ui/ErrorState";
import Link from "next/link";

export function AccountsCard() {
  const accounts = useDashboardStore(
    (state) => state.accounts,
  );

  const accountsLoading =
    useDashboardStore(
      (state) => state.accountsLoading,
    );

  const accountsError =
    useDashboardStore(
      (state) => state.accountsError,
    );

  if (accountsLoading) {
    return (
      <LoadingState />
    );
  }

  if (accountsError) {
    return (
      <ErrorState  />
    );
  }


  if (!accounts?.length) {
    return (
      <EmptyState
        className="col-span-12 md:col-span-2 xl:col-span-2"
        title="No accounts yet"
        message="Create your first account to start"
        link="dashboard/accounts/new"  
      />
    );
  }

  return (
    <section
      className="
        rounded-3xl
        col-span-12
        md:col-span-4
        xl:col-span-2
        border border-white/[0.05]
        bg-[linear-gradient(135deg,#0E0E0E,#141414)]
        p-5
      "
    >
      <header className="mb-5 flex justify-between">
        <h3 className="text-body text-white">
          Your Accounts
        </h3>

        <Link href="/dashboard/accounts/new" className="text-caption cursor-pointer hover:underline text-secondary">
          Create Account
        </Link>
      </header>

      {accounts.length === 0 ? (
        <p className="text-sm text-zinc-400">
          No accounts found
        </p>
      ) : (
        <ul className="space-y-3">
          {accounts.map((account) => (
            <li
              key={account.id}
              className="
                flex justify-between
                rounded-2xl
                border border-white/[0.04]
                bg-white/[0.02]
                p-4
              "
            >
              <span className="text-[12px] text-white">
                {account.name}
              </span>

              <span className="text-[12px] text-white">
                $
                {Number(
                  account.balance,
                ).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}