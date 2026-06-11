import { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
  change: string;
  subtitle: string;
  trend: "up" | "down";
  icon: LucideIcon;
};

export default function StatCard({
  title,
  value,
  change,
  subtitle,
  trend,
  icon: Icon,
}: StatCardProps) {
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
        <div className="space-y-2">
          <p
            className="
              text-[12px]
              md:text-[13px]
              text-[#ACAFB9]
            "
          >
            {title}
          </p>

          <h3
            className="
              font-semibold tracking-tight text-white
              text-2xl
              md:text-h4
              lg:text-h3
            "
          >
            {value}
          </h3>

          <div className="flex items-center gap-1">
            <span
              className={`
                text-[12px] md:text-[13px]
                font-medium
                ${
                  trend === "up"
                    ? "text-emerald-400"
                    : "text-[#FF584E]"
                }
              `}
            >
              {change}
            </span>

            <span
              className="
                text-[12px]
                md:text-[13px]
                text-[#606165]
              "
            >
              {subtitle}
            </span>
          </div>
        </div>

        <div
          className="
            relative flex h-12 w-12 items-center justify-center
            rounded-2xl
            border border-white/[0.04]
            bg-gradient-to-br
            from-[#FF8975]/25
            via-[#FF8975]/10
            to-transparent
            shrink-0
            backdrop-blur-xl
          "
        >
          <div
            className="
              absolute inset-0 rounded-2xl
              bg-[#FF8975]/20
              blur-xl
              mix-blend-screen
            "
          />

          <Icon
            className="
              relative z-10
              h-5 w-5
              text-[#FF8975]
            "
          />
        </div>
      </div>
    </article>
  );
}