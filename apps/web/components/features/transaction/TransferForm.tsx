"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Toast from "@/components/ui/Toast";
import { Search, Send, X, ArrowLeft } from "lucide-react";
import { useTransferStore } from "@/store/transfer.store";
import { useRecipientAccounts } from "@/hooks/transaction/use-recipient-accounts";
import { useTransfer } from "@/hooks/transaction/use-transfer";
import { useRouter } from "next/navigation";
import { useDashboardStore } from "@/store/dashboard.store";
import  {Loader2}  from "lucide-react";


export default function TransferForm() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const accounts = useDashboardStore(
  (state) => state.accounts,
);

const [senderAccountId, setSenderAccountId] =
  useState("");

  const [amountRaw, setAmountRaw] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{ email?: string; amount?: string }>({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState<null | {
    type: "success" | "error";
    msg: string;
  }>(null);

  const {
    recipientAccounts,
    selectedAccountId,
    setAccounts,
    setSelectedAccount,
    clear,
  } = useTransferStore();

  const lookupMutation = useRecipientAccounts();
  const transferMutation = useTransfer();

  const formatAmountForDisplay = (v: string) => {
    if (!v) return "";
    const num = Number(v.replace(/[^0-9.]/g, ""));
    if (Number.isNaN(num)) return "";
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };



  const validateEmail = (e: string) => {
    if (!e.trim()) return "Recipient email required";
    if (!/^\S+@\S+\.\S+$/.test(e)) return "Enter a valid email";
    return "";
  };

  const validateAmount = (v: string) => {
    const num = Number(v);
    if (!v || Number.isNaN(num) || num <= 0) return "Enter an amount greater than 0";
    if (num > 1_000_000) return "Amount exceeds maximum allowed";
    return "";
  };

  const handleLookup = async () => {
    const emailError = validateEmail(email);
    setErrors((s) => ({ ...s, email: emailError || undefined }));
    if (emailError) return;
    try {
      const result = await lookupMutation.mutateAsync(email);

      if (!("data" in result) || !result.data) {
        setAccounts([]);
        setSelectedAccount("");
        setToast({ type: "error", msg: result.message });
        return;
      }

      setAccounts(result.data.accounts ?? []);
      const foundAccounts = result.data.accounts ?? [];
      setSelectedAccount(
        foundAccounts.length === 1
          ? foundAccounts[0].id
          : "",
      );

      if (foundAccounts.length === 0) {
        setToast({
          type: "error",
          msg: "No accounts found for that email.",
        });
        return;
      }

      setToast({ type: "success", msg: result.message });
    } catch {
      setToast({ type: "error", msg: "Lookup failed. Try again." });
    }
  };

  const onEmailKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLookup();
    }
  };

  const handlePreset = (v: number) => {
    setAmountRaw(String(v));
    setErrors((s) => ({ ...s, amount: undefined }));
  };

  const handleSendClick = () => {
    const amountErr = validateAmount(amountRaw);
    setErrors((s) => ({ ...s, amount: amountErr || undefined }));
    if (!selectedAccountId) {
      setToast({ type: "error", msg: "Select a recipient account." });
      return;
    }
    if (amountErr) return;
    setShowConfirm(true);
  };

  const handleTransfer = async () => {
    setShowConfirm(false);
    try {
      await transferMutation.mutateAsync({
        senderAccountId,
        receiverAccountId: selectedAccountId!,
        amount: Number(amountRaw),
        description,
      });
      setToast({ type: "success", msg: "Transfer successful" });
      setEmail("");
      setAmountRaw("");
      setDescription("");
      setCurrency("USD");
      clear();
    } catch (err: any) {
      setToast({ type: "error", msg: err?.message || "Transfer failed" });
    }
  };

  return (
    <>
      <div className="relative">
        <div className="mb-8 flex flex-shrink-0 items-center justify-between">
          <button
            type="button"
            onClick={() => router.replace("/dashboard")}
            className="
              group flex cursor-pointer items-center gap-2
              text-caption text-gray3
              transition-colors duration-200 hover:text-light
            "
          >
            <ArrowLeft
              className="
                h-4 w-4
                transition-transform duration-200
                group-hover:-translate-x-0.5
              "
            />
            Back
          </button>

          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-10 rounded-full bg-primary" />
            <div className="h-1.5 w-10 rounded-full bg-light/15" />
            <span className="ml-1 text-[11px] text-gray3/50">
              Step 1 of 2
            </span>
          </div>
        </div>

        <header className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-h4 text-light">Transfer Money</h1>
            <p className="mt-1 text-caption text-gray3">
              Fast, secure transfers — review before sending.
            </p>
          </div>

          <div
            className="
              flex-shrink-0 rounded-xl
              border border-light/10 text-gray1
              px-3 py-1.5 text-caption
            "
          >
            {new Date().toLocaleDateString()}
          </div>
        </header>

        <div className="mb-5 h-px bg-gradient-to-r from-primary/20 via-light/8 to-transparent" />

        <div className="mb-5 grid gap-4 lg:grid-cols-2">
          <div>
            <label className="mb-2 block text-caption text-gray3">
              From Account
            </label>

            <select
              value={senderAccountId}
              onChange={(e) => setSenderAccountId(e.target.value)}
              className="
                w-full rounded-xl border border-light/10
                px-4 py-3 text-light outline-none
                transition bg-dark focus:border-primary/40
              "
            >
              <option value="">Select account</option>
              {accounts?.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name} {" • "} ${Number(account.balance).toFixed(2)}
                </option>
              ))}
            </select>

            <p className="mt-2 text-caption text-gray3/60">
              Choose the account funds will be sent from.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-caption text-gray3">
              Recipient Email
            </label>

            <div className="flex gap-3">
              <Input
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setAccounts([]);
                  setSelectedAccount("");
                  setErrors((s) => ({ ...s, email: undefined }));
                }}
                onKeyDown={onEmailKey}
                placeholder="john@example.com"
                icon={<Search className="size-5 text-gray3" />}
              />

              <button
                onClick={handleLookup}
                disabled={lookupMutation.isPending}
                className="
                  rounded-xl border border-primary
                  bg-primary/10 px-5 text-sm font-medium
                  text-primary transition-all hover:opacity-90
                  disabled:opacity-50
                "
              >
                {lookupMutation.isPending ?         <Loader2
          className="
            size-8
            animate-spin
            text-primary
          "
        /> : "Find"}
              </button>
            </div>

            {errors.email && (
              <p className="mt-2 text-caption text-secondary">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {recipientAccounts.length > 0 && (
          <div className="mb-5">
            <label className="mb-2 block text-caption text-gray3">
              Recipient Account
            </label>

            <select
              value={selectedAccountId}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="
                w-full rounded-xl border border-light/10
                px-4 py-3 text-light outline-none
                transition bg-dark focus:border-primary/40
              "
            >
              <option value="">Select recipient account</option>
              {recipientAccounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name} {" • "} {account.type}
                </option>
              ))}
            </select>

            <p className="mt-2 text-caption text-gray3/60">
              Choose which account will receive the transfer.
            </p>
          </div>
        )}

        <div className="mb-5 h-px bg-gradient-to-r from-transparent via-light/8 to-secondary/20" />

        <div className="mb-5 grid gap-4 md:grid-cols-3 md:items-start">
          <div className="md:col-span-2">
            <label className="mb-2 block text-caption text-gray3">Amount</label>

            <div className="flex gap-3">
              <Input
                name="amount"
                type="text"
                value={formatAmountForDisplay(amountRaw)}
                onChange={(e) => {
                  const raw = e.target.value.replace(/,/g, "");
                  setAmountRaw(raw);
                  setErrors((s) => ({ ...s, amount: undefined }));
                }}
                placeholder="0.00"
                aria-label="Amount"
              />

              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="
                  cursor-pointer rounded-xl border border-light/10
                  bg-dark px-3 py-1 text-sm text-light outline-none
                  transition-colors duration-200 hover:border-light/20
                "
                aria-label="Currency"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>

            {errors.amount && (
              <p className="mt-2 text-caption text-secondary">{errors.amount}</p>
            )}
          </div>
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-caption text-gray3">
            Note <span className="text-gray3/50">(optional)</span>
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a friendly note visible to the recipient…"
            className="
              h-24 w-full resize-none rounded-xl border border-light/10
              bg-dark p-3 text-sm text-light outline-none
              placeholder:text-gray3/40 transition-colors duration-200
              focus:border-light/20
            "
            aria-label="Note"
          />
        </div>

        <div className="mb-5 h-px bg-gradient-to-r from-secondary/20 via-light/8 to-transparent" />

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-caption text-gray3/60">
            Double-check details before sending.
          </p>

          <div className="flex gap-3 md:ml-auto">
            <button
              onClick={() => {
                setEmail("");
                setAmountRaw("");
                setDescription("");
                setCurrency("USD");
                setSenderAccountId("");
                setErrors({});
                clear();
              }}
              className="
                cursor-pointer rounded-xl border border-light/10
                bg-dark-bg px-4 py-2 text-caption text-gray3
                transition-all duration-200 hover:border-light/20 hover:text-light
              "
            >
              Reset
            </button>

            <button
              onClick={handleSendClick}
              disabled={!selectedAccountId || transferMutation.isPending}
              className="
                flex cursor-pointer items-center gap-2
                rounded-xl bg-primary px-5 py-2
                text-sm font-semibold text-dark
                transition-all duration-200 hover:opacity-90
                active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50
              "
            >
              <Send className="size-4" />
              {transferMutation.isPending ? "Sending…" : "Transfer"}
            </button>
          </div>
        </div>
      </div>

      {showConfirm && (
        <div
          className="
            fixed inset-0 z-40 flex items-center justify-center
            bg-dark/75 p-4 backdrop-blur-sm
          "
        >
          <div
            className="
              relative w-full max-w-lg overflow-hidden
              rounded-2xl border border-light/10 bg-dark p-6
            "
          >
            <div
              className="
                pointer-events-none absolute -right-16 -top-16
                h-56 w-56 rounded-full bg-primary/15 blur-[70px]
              "
            />

            <div className="relative">
              <div className="flex items-start justify-between">
                <h3 className="text-h6 text-light">Confirm Transfer</h3>
                <button
                  onClick={() => setShowConfirm(false)}
                  aria-label="Close"
                  className="
                    cursor-pointer rounded-lg border border-light/10
                    bg-dark-bg p-1 transition-colors hover:border-light/20
                  "
                >
                  <X className="size-4 text-gray3" />
                </button>
              </div>

              <div className="mt-4 h-px bg-gradient-to-r from-primary/25 via-light/8 to-transparent" />

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-primary/20 bg-dark px-4 py-3">
                  <span className="text-caption text-gray3">Sending to</span>
                  <span className="text-sm font-medium text-light">{email}</span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-primary/20 bg-dark px-4 py-3">
                  <span className="text-caption text-gray3">Amount</span>
                  <span className="text-body font-semibold text-primary">
                    {currency} {Number(amountRaw).toLocaleString()}
                  </span>
                </div>

                {description && (
                  <div className="rounded-xl border border-primary/20 bg-dark px-4 py-3">
                    <span className="text-caption text-gray3">Note: </span>
                    <span className="text-caption text-light/70">{description}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="
                    cursor-pointer rounded-xl border border-light/10
                    bg-dark-bg px-4 py-2 text-caption text-gray3
                    transition-all duration-200 hover:border-light/20 hover:text-light
                  "
                >
                  Cancel
                </button>

                <button
                  onClick={handleTransfer}
                  className="
                    cursor-pointer rounded-xl bg-primary px-5 py-2
                    text-sm font-semibold text-dark transition-all duration-200
                    hover:opacity-90 active:scale-[0.97]
                  "
                >
                  Confirm & Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <Toast toast={toast} onDismiss={() => setToast(null)} />
      )}
    </>
  );
}