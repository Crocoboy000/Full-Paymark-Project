
import { PremiumLogo } from "../../ui/Icons";

import { DashboardButton } from "../../ui/DashboardButton";

export function UpgradeCard() {
  return (
    <aside
      className="
        upCard
        relative overflow-hidden
        rounded-3xl
        w-[80%]
        h-[20%]
        mx-auto
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
        <div className="flex items-center w-full gap-2 ">
          <PremiumLogo className="text-[#FF8975] size-6" />

        <h3
          className="
            text-[14px]
            font-semibold
            text-light
            w-full
            whitespace-nowrap
          "
        >
          Upgrade to Premium
        </h3>
        </div>


        <p
          className="
            text-[12px]
            text-[#ACAFB9]
          "
        >
          Unlock higher limits, cashback and
          exclusive financial insights.
        </p> 


          <h3 className="mt-5 text-secondary underline hover:text-primary text-[12px]">
          Upgrade Now
          </h3>
      </div>
    </aside>
  );
}