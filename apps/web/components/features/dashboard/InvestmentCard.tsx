"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

import { investments } from "@/context/dashboardData";

export function InvestmentPerformanceCard() {
  return (
    <section
      className="
        relative overflow-hidden
        col-span-12
        xl:col-span-3
        rounded-3xl
        border border-white/[0.04]
        bg-gradient-to-br
        from-[var(--dark)]
        via-[var(--dark-bg)]
        to-[#1A1A1A]
        p-6
        min-w-0
      "
    >
      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-[radial-gradient(circle_at_top,rgba(255,137,117,.12),transparent_55%)]
        "
      />

      <header className="relative mb-8 flex items-start justify-between">
        <div>
          <h3
            className="
              text-[13px]
              font-medium
              text-white
            "
          >
            Investment Performance
          </h3>

          <h2
            className="
              mt-4
              text-3xl
              font-semibold
              text-white
              md:text-4xl
            "
          >
            $48,006.05
          </h2>

          <p
            className="
              text-[12px]
              text-[var(--gray3)]
            "
          >
            Total Investment Value
          </p>
        </div>

        <div className="text-right">
          <p
            className="
              text-sm
              font-medium
              text-emerald-400
            "
          >
            ↑ 12.75%
          </p>

          <p
            className="
              text-[12px]
              text-[var(--gray3)]
            "
          >
            vs last year
          </p>
        </div>
      </header>

      <div className="relative h-[240px] w-full">
        <ResponsiveContainer>
          <BarChart
            data={investments}
            margin={{
              top: 10,
              right: 0,
              left: -20,
              bottom: 0,
            }}
            barCategoryGap="35%"
          >
            <defs>
              <linearGradient
                id="investmentBar"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#FF8975"
                />

                <stop
                  offset="100%"
                  stopColor="#FF584E"
                />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="month"
              tick={{
                fill: "#606165",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fill: "#606165",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={false}
              contentStyle={{
                background: "#141414",
                border: "1px solid rgba(255,255,255,.05)",
                borderRadius: "16px",
                color: "#fff",
              }}
            />

            <Bar
              dataKey="value"

               className="text-light/50"
              radius={[8, 8, 0, 0]}
            >
              {investments.map((entry) => (
                <Cell
                  key={entry.month}
                  fill="url(#investmentBar)"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}