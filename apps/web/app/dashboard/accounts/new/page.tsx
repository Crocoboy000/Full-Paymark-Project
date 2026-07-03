"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Wallet,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,

  TrendingUp,
  CreditCard,
  PiggyBank,
  Banknote,
  Building2,
} from "lucide-react";

import { CreateAccountSchema, type CreateAccountInput } from "@paymark/validations";
import { useCreateAccount } from "@/hooks/accounts/use-create-account";

const ACCOUNT_TYPES: {
  value: CreateAccountInput["type"];
  label: string;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    value: "CHECKING",
    label: "Checking",
    description: "Everyday spending & bills",
    icon: Building2,
  },
  {
    value: "SAVINGS",
    label: "Savings",
    description: "Grow your money over time",
    icon: PiggyBank,
  },
  {
    value: "CREDIT",
    label: "Credit",
    description: "Track card balances",
    icon: CreditCard,
  },
  {
    value: "INVESTMENT",
    label: "Investment",
    description: "Stocks, ETFs & portfolios",
    icon: TrendingUp,
  },
  {
    value: "CASH",
    label: "Cash",
    description: "Physical cash on hand",
    icon: Banknote,
  },
];

export default function CreateAccountPage() {
  const router = useRouter();
  const createAccountMutation = useCreateAccount();

  const [error, setError] = useState("");
  const [nameFocused, setNameFocused] = useState(false);
  const [formData, setFormData] = useState<CreateAccountInput>({
    name: "",
    type: "CHECKING",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = CreateAccountSchema.safeParse(formData);
    if (!result.success) {
      return setError(result.error.issues[0]?.message);
    }

    try {
      await createAccountMutation.mutateAsync(result.data);
      router.push("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create account",
      );
    }
  };

  return (
    <section
      className="
        mx-auto w-full
        max-w-2xl px-4 py-2
      "
    >
      <div
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(circle_at_top,rgba(255,137,117,.15),transparent_60%)]
        "
      />
             <div className=" bg-gradient-to-br from-transparent from-20% filter blur-[200px] to-primary absolute top-0 w-150 opacity-70 right-1/6 rounded-full h-100 z-0"></div>
        <div className=" bg-gradient-to-br from-transparent from-20% filter blur-[300px] to-secondary absolute top-0 w-150 opacity-70 left-1 lg:left-1/4 rounded-full h-100 z-2"></div>
        <div className=" bg-gradient-to-t from-dark from-20% to-transparent absolute inset-0 z-8"></div>

      <div
        className="pointer-events-none absolute inset-0  opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,137,117,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,137,117,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="
        relative overflow-hidden
        rounded-3xl h-full
        z-10
        "
      >

        <div className="relative h-full overflow-y-auto">
          <div className="flex min-h-full flex-col p-8">

            <div className="mb-8 flex flex-shrink-0 items-center justify-between">
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
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

            <div className="mb-8 flex-shrink-0">
              <div className="mb-4 flex items-center gap-4">
                <div
                  className="
                    flex h-12 w-12 flex-shrink-0
                    items-center justify-center
                    rounded-2xl border border-primary/20
                    bg-primary/10
                  "
                >
                  <Wallet className="h-6 w-6 text-primary" />
                </div>

                <div
                  className="
                    h-px flex-1
                    bg-gradient-to-r from-primary/25 to-transparent
                  "
                />
              </div>

              <p
                className="
                  mb-1 text-[11px]
                  font-medium uppercase tracking-widest
                  text-primary/60
                "
              >
                New Account
              </p>

              <h1 className="text-h4 font-semibold text-light">
                Let&apos;s set things up
              </h1>

              <p className="mt-1 text-caption text-gray3">
                Add a financial account and start tracking everything in one
                place. You can always rename or change the type later.
              </p>
            </div>

            {error && (
              <div
                className="
                  mb-5 flex flex-shrink-0
                  items-start gap-3
                  rounded-2xl border border-secondary/20
                  bg-secondary/10 p-4
                "
              >
                <div
                  className="
                    mt-0.5 flex h-5 w-5 flex-shrink-0
                    items-center justify-center
                    rounded-full bg-secondary/20
                  "
                >
                  <span className="text-[10px] font-bold text-secondary">
                    !
                  </span>
                </div>
                <p className="text-caption text-secondary">{error}</p>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="flex flex-1 flex-col gap-6"
            >
              <div>
                <div className="mb-2 flex items-baseline justify-between">
                  <label className="text-caption font-medium text-light">
                    Account Name
                  </label>
                  <span className="text-[11px] text-gray3/50">Required</span>
                </div>

                <div
                  className={`
                    rounded-2xl border bg-dark-bg
                    transition-all duration-200
                    ${
                      nameFocused
                        ? "border-primary/40 shadow-[0_0_0_3px_rgba(255,137,117,0.07)]"
                        : "border-light/10"
                    }
                  `}
                >
                  <input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    onFocus={() => setNameFocused(true)}
                    onBlur={() => setNameFocused(false)}
                    placeholder="e.g. Main Checking, Emergency Fund…"
                    className="
                      w-full rounded-2xl bg-transparent
                      px-4 py-3.5 text-sm text-light outline-none
                      placeholder:text-gray3/40
                    "
                  />
                </div>

                <p className="mt-1.5 pl-1 text-[11px] text-gray3/50">
                  Pick a name you&apos;ll instantly recognise at a glance
                </p>
              </div>

              <div>
                <div className="mb-3 flex items-baseline justify-between">
                  <label className="text-caption font-medium text-light">
                    Account Type
                  </label>
                  <span className="text-[11px] text-gray3/50">
                    Choose one
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {ACCOUNT_TYPES.map((type, idx) => {
                    const Icon = type.icon;
                    const isSelected = formData.type === type.value;
                    const isLast =
                      idx === ACCOUNT_TYPES.length - 1 &&
                      ACCOUNT_TYPES.length % 2 !== 0;

                    return (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            type: type.value,
                          })
                        }
                        className={`
                          relative flex cursor-pointer
                          flex-col items-start gap-3
                          rounded-2xl border p-4 text-left
                          transition-all duration-200
                          ${isLast ? "col-span-2" : ""}
                          ${
                            isSelected
                              ? "border-primary/40 bg-primary/[0.08]"
                              : "border-light/10 bg-dark-bg hover:border-light/20 hover:bg-light/[0.02]"
                          }
                        `}
                      >
                        {isSelected && (
                          <CheckCircle2
                            className="
                              absolute right-3.5 top-3.5
                              h-3.5 w-3.5 text-primary
                            "
                          />
                        )}

                        <div
                          className={`
                            flex h-9 w-9 items-center justify-center
                            rounded-xl transition-colors
                            ${isSelected ? "bg-primary/15" : "bg-light/5"}
                          `}
                        >
                          <Icon
                            className={`
                              h-4 w-4
                              ${isSelected ? "text-primary" : "text-gray3"}
                            `}
                          />
                        </div>

                        <div>
                          <p
                            className={`
                              text-sm font-medium transition-colors
                              ${isSelected ? "text-light" : "text-light/65"}
                            `}
                          >
                            {type.label}
                          </p>
                          <p className="mt-0.5 text-[11px] text-gray3/55">
                            {type.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex-1" />

              <div className="flex-shrink-0">
                <button
                  type="submit"
                  disabled={createAccountMutation.isPending}
                  className="
                    flex w-full cursor-pointer items-center
                    justify-center gap-2
                    rounded-2xl bg-primary
                    px-5 py-3.5 text-sm
                    font-medium text-dark
                    transition-all duration-200
                    hover:opacity-90 active:scale-[0.985]
                    disabled:cursor-not-allowed disabled:opacity-50
                  "
                >
                  {createAccountMutation.isPending ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Setting up your account…
                    </>
                  ) : (
                    <>
                      Create Account
                      <ChevronRight className="h-4 w-4" />
                    </>
                  )}
                </button>


              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}