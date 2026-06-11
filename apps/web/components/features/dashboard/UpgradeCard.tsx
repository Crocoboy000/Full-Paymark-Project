
import { PremiumLogo } from "../../ui/Icons";

import { DashboardButton } from "../../ui/DashboardButton";

export function UpgradeCard() {
  return (
    <aside
      className="
        upCard
        relative overflow-hidden
        rounded-3xl
        w-[90%]
        border border-light/20
        bg-[linear-gradient(135deg,#0E0E0E,#141414)]
        p-6
      "
    >
      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-[radial-gradient(circle_at_bottom_right,rgba(255,137,117,.18),transparent_45%)]
        "
      />

      <div className="relative flex flex-col gap-2 z-10">

          <PremiumLogo className="text-[#FF8975] size-10" />

        <h3
          className="
            text-caption
            font-semibold
            text-white
          "
        >
          Upgrade to Premium
        </h3>

        <p
          className="
            text-[12px]
            text-[#ACAFB9]
          "
        >
          Unlock higher limits, cashback and
          exclusive financial insights.
        </p> 

        <DashboardButton
          className="
          mt-2
        w-[60%]

          "
        >
          Upgrade Now
        </DashboardButton>
      </div>
    </aside>
  );
}