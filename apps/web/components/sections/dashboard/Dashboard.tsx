import Header from "@/components/features/dashboard/header";
import StatsGrid from "@/components/features/dashboard/StatsGrid";

import { RevenueChartCard } from "@/components/features/dashboard/RevenueChart";
import { BreakdownCard } from "@/components/features/dashboard/BreadownCard";

import { AccountsCard } from "@/components/features/dashboard/Accounts";
import { InvestmentPerformanceCard } from "@/components/features/dashboard/InvestmentCard";

import { QuickActions } from "@/components/features/dashboard/QuickActions";
import { RecentActivity } from "@/components/features/dashboard/RecentActivity";

export default function Dashboard() {
  return (
    <main
      className="
        flex flex-col gap-5
        overflow-x-hidden
        w-12/12
        p-4
      "
    >
      <Header />

      <StatsGrid />

            <section
        className="
          grid gap-5
          xl:grid-cols-[minmax(0,2fr)_380px]
        "
      >


        <section
          className="
            grid gap-5
            grid-cols-3 
            md:grid-cols-2
            lg:grid-cols-5
          "
        >
          <RevenueChartCard />
          <AccountsCard />
          <BreakdownCard />


          <InvestmentPerformanceCard />
        </section>

        <aside
          className="
            flex flex-col gap-5
            min-w-0
          "
        >
          <QuickActions />

          <RecentActivity/>
        </aside>
          </section>

    </main>
  );
}