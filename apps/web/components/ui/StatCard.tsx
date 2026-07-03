import {
  Wallet,
  BadgeDollarSign,
  ReceiptText,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  "Total Balance": Wallet,
  "Total Income": BadgeDollarSign,
  "Total Expenses": ReceiptText,
  "Net Worth": TrendingUp,
};

type StatCardProps = {
  title: string;
  value: number;
};

export default function StatCard({
  title,
  value,
}: StatCardProps) {
  const Icon = ICON_MAP[title] ?? Wallet;

  return (
    <article
      className="
        relative overflow-hidden rounded-3xl
        border border-white/[0.04]
        bg-gradient-to-br
        from-[#0E0E0E]
        via-[#161616]
        to-[#1A1A1A]
        p-5
      "
    >
      <div
        className="
          absolute inset-0 opacity-50
          bg-[radial-gradient(circle_at_top,rgba(255,137,117,.15),transparent_55%)]
        "
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-[13px] text-[#ACAFB9]">
            {title}
          </p>

          <h3
            className="
              mt-2
              text-2xl
              font-semibold
              text-white
            "
          >
            $
            {value.toLocaleString()}
          </h3>
        </div>

        <div
          className="
            flex h-12 w-12 items-center justify-center
            rounded-2xl
            border border-white/[0.04]
            bg-[#FF8975]/10
          "
        >
          <Icon
            className="
              h-5 w-5
              text-[#FF8975]
            "
          />
        </div>
      </div>
    </article>
  );
}