"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import { revenueData } from "@/context/dashboardData";

export function RevenueChartCard() {
  return (
    <article
      className="
        rounded-3xl
        col-span-12 xl:col-span-3
        border border-white/[0.04]
        bg-gradient-to-br
        from-[#0E0E0E]
        via-[#151515]
        to-[#1B1B1B]
        p-6
      "
    >
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h3 className="text-sm text-white">
            Financial Overview
          </h3>

          <h2 className="mt-2 text-3xl font-semibold text-white">
            $52,143.75
          </h2>

          <p className="text-[13px] text-[#606165]">
            Total Balance
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-emerald-400">
            +6.41%
          </p>

          <p className="text-[12px] text-[#606165]">
            vs last month
          </p>
        </div>
      </div>

      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient
                id="incomeGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#FF8975"
                  stopOpacity={0.4}
                />
                <stop
                  offset="100%"
                  stopColor="#FF8975"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="rgba(255,255,255,.04)"
            />

            <XAxis
              dataKey="date"
              tick={{ fill: "#606165", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="income"
              stroke="#FF8975"
              strokeWidth={3}
              fill="url(#incomeGradient)"
            />

            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#AFAFAF"
              strokeDasharray="4 4"
              fillOpacity={0}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}