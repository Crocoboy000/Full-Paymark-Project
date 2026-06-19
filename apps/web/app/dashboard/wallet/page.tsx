"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, ArrowLeft, Wallet, Plus, CheckCircle, XCircle } from "lucide-react";
import { useDashboardStore } from "@/store/dashboard.store";
import { useCreateCheckoutSession } from "@/hooks/payment/use-create-checkout-session";
import { api } from "@/lib/api";
import Toast from "@/components/ui/Toast";

export default function WalletPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const accounts = useDashboardStore((s) => s.accounts);

  const [accountId, setAccountId] = useState("");
  const [amountRaw, setAmountRaw] = useState("");
  const [toast, setToast] = useState<null | { type: "success" | "error"; msg: string }>(null);

  const checkoutMutation = useCreateCheckoutSession();

  const success = searchParams.get("success");
  const cancelled = searchParams.get("cancelled");
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (success === "true" && sessionId) {
      api.post("/stripe/verify-session", { sessionId })
        .then(() => {
          setToast({ type: "success", msg: "Payment successful! Your account has been credited." });
          queryClient.invalidateQueries({ queryKey: ["accounts"] });
          queryClient.invalidateQueries({ queryKey: ["recentTransactions"] });
        })
        .catch((err) => {
          setToast({ type: "error", msg: err?.response?.data?.message || "Payment verification failed." });
        });
    }
    if (cancelled === "true") {
      setToast({ type: "error", msg: "Payment was cancelled. No charges were made." });
    }
  }, [success, cancelled, sessionId, queryClient]);

  const defaultAccount = accounts.find((a) => a.type === "CHECKING") || accounts[0];

  useEffect(() => {
    if (defaultAccount && !accountId) {
      setAccountId(defaultAccount.id);
    }
  }, [defaultAccount, accountId]);

  const handleAddMoney = async () => {
    if (!accountId) {
      setToast({ type: "error", msg: "Please select an account." });
      return;
    }
    const amount = Number(amountRaw);
    if (!amountRaw || isNaN(amount) || amount <= 0) {
      setToast({ type: "error", msg: "Enter a valid amount greater than 0." });
      return;
    }
    if (amount < 0.5) {
      setToast({ type: "error", msg: "Minimum amount is $0.50." });
      return;
    }

    try {
      const result = await checkoutMutation.mutateAsync({ amount, accountId });
      window.location.href = result.url;
    } catch (err: any) {
      setToast({ type: "error", msg: err?.response?.data?.message || err?.message || "Failed to create payment session." });
    }
  };

  return (
    <main className="mx-auto flex w-full min-h-screen max-w-3xl items-center justify-center overflow-hidden px-4 py-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,137,117,.15),transparent_60%)]" />
      <div className="bg-gradient-to-br from-transparent from-20% filter blur-[200px] to-primary absolute top-0 w-150 opacity-70 right-1/6 rounded-full h-100 z-0" />
      <div className="bg-gradient-to-br from-transparent from-20% filter blur-[300px] to-secondary absolute top-0 w-150 opacity-70 left-1 lg:left-1/4 rounded-full h-100 z-2" />
      <div className="bg-gradient-to-t from-dark from-20% to-transparent absolute inset-0 z-8" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,137,117,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,137,117,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <section className="relative z-10 flex h-full w-full flex-col justify-center overflow-hidden rounded-2xl bg-transparent p-6">
        <div className="mb-8 flex flex-shrink-0 items-center justify-between">
          <button
            type="button"
            onClick={() => router.replace("/dashboard")}
            className="group flex cursor-pointer items-center gap-2 text-caption text-gray3 transition-colors duration-200 hover:text-light"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Back
          </button>

          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-10 rounded-full bg-primary" />
            <span className="ml-1 text-[11px] text-gray3/50">Add Money</span>
          </div>
        </div>

        <header className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-h4 text-light">Add Money</h1>
            <p className="mt-1 text-caption text-gray3">
              Securely add funds to your account via Stripe.
            </p>
          </div>
          <div className="flex-shrink-0 rounded-xl border border-light/10 text-gray1 px-3 py-1.5 text-caption">
            {new Date().toLocaleDateString()}
          </div>
        </header>

        <div className="mb-5 h-px bg-gradient-to-r from-primary/20 via-light/8 to-transparent" />

        {success === "true" ? (
          <div className="flex flex-col items-center justify-center py-16">
            <CheckCircle className="size-16 text-primary mb-4" />
            <h2 className="text-h4 text-light mb-2">Payment Successful!</h2>
            <p className="text-caption text-gray3 text-center max-w-md">
              Your account has been credited. You can now use the funds for transfers and expenses.
            </p>
            <button
              onClick={() => router.replace("/dashboard")}
              className="mt-6 cursor-pointer rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-dark transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
            >
              Back to Dashboard
            </button>
          </div>
        ) : cancelled === "true" ? (
          <div className="flex flex-col items-center justify-center py-16">
            <XCircle className="size-16 text-secondary mb-4" />
            <h2 className="text-h4 text-light mb-2">Payment Cancelled</h2>
            <p className="text-caption text-gray3 text-center max-w-md">
              No charges were made. You can try again whenever you&apos;re ready.
            </p>
            <button
              onClick={() => router.replace("/dashboard/wallet")}
              className="mt-6 cursor-pointer rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-dark transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="mb-5 grid gap-4 lg:grid-cols-2">
              <div>
                <label className="mb-2 block text-caption text-gray3">
                  Deposit To
                </label>
                <select
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                  className="w-full rounded-xl border border-light/10 px-4 py-3 text-light outline-none transition bg-dark focus:border-primary/40"
                >
                  <option value="">Select account</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name} {" • "} ${Number(account.balance).toFixed(2)}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-caption text-gray3/60">
                  Funds will be added to this account.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-caption text-gray3">
                  Amount (USD)
                </label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    step="0.01"
                    min="0.50"
                    value={amountRaw}
                    onChange={(e) => setAmountRaw(e.target.value)}
                    placeholder="0.00"
                    className="w-full rounded-xl border border-light/10 bg-dark px-4 py-3 text-light outline-none transition focus:border-primary/40 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    aria-label="Amount"
                  />
                </div>
                <p className="mt-2 text-caption text-gray3/60">
                  Minimum $0.50. You will be redirected to Stripe to complete payment.
                </p>
              </div>
            </div>

            <div className="mb-5 h-px bg-gradient-to-r from-transparent via-light/8 to-secondary/20" />

            <div className="flex gap-2 mb-5">
              {[10, 25, 50, 100].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setAmountRaw(String(preset))}
                  className="cursor-pointer rounded-xl border border-light/10 bg-dark-bg px-4 py-2 text-caption text-gray3 transition-all duration-200 hover:border-primary/40 hover:text-primary"
                >
                  ${preset}
                </button>
              ))}
            </div>

            <div className="mb-5 h-px bg-gradient-to-r from-secondary/20 via-light/8 to-transparent" />

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p className="text-caption text-gray3/60">
                Secured by Stripe. Your card details are never stored on our servers.
              </p>
              <button
                onClick={handleAddMoney}
                disabled={checkoutMutation.isPending}
                className="flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-dark transition-all duration-200 hover:opacity-90 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {checkoutMutation.isPending ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <Plus className="size-5" />
                )}
                {checkoutMutation.isPending ? "Redirecting…" : "Add Money"}
              </button>
            </div>
          </>
        )}
      </section>

      {toast && <Toast toast={toast} onDismiss={() => setToast(null)} />}
    </main>
  );
}
