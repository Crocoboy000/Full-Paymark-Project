"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import {
  spendingData,
  spendingColors,
} from "@/context/dashboardData";

export function BreakdownCard() {
  const total = spendingData.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  return (
    <article
      className="
        rounded-3xl
        col-span-12
        md:col-span-6
        xl:col-span-2
        border border-white/[0.04]
        bg-gradient-to-br
        from-[#0E0E0E]
        via-[#151515]
        to-[#1B1B1B]
        p-6
      "
    >
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-sm text-white">
          Spending Breakdown
        </h3>

        <button
          className="
            rounded-xl
            border border-white/[0.06]
            px-3 py-2
            text-xs text-[#ACAFB9]
          "
        >
          This Month
        </button>
      </div>

      <div className="grid  sm:grid-cols-[282px_1fr] gap-6">
        <div className="relative h-48">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={spendingData}
                dataKey="amount"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={3}
              >
                {spendingData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={spendingColors[index]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div
            className="
              absolute inset-0
              flex flex-col items-center justify-center
            "
          >
            <span className="text-2xl text-white">
              ${total.toLocaleString()}
            </span>

            <span className="text-[12px] text-[#606165]">
              Total Spent
            </span>
          </div>
        </div>

        <div className="space-y-2">
          {spendingData.map((item, index) => {
            const percentage = (
              (item.amount / total) *
              100
            ).toFixed(0);

            return (
              <div
                key={item.name}
                className="flex items-center justify-center gap-5 sm:justify-around lg:justify-between w-full"
              >
                <div className="flex items-center justify-center gap-3">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor:
                        spendingColors[index],
                    }}
                  />

                  <span className="text-[13px] flex text-[#ACAFB9]">
                    {item.name}
                  </span>
                </div>

                <div className="text-left flex flex-col justify-center items-end w-full">
                  <p className="text-[13px] text-white">
                    {percentage}%
                  </p>

                  <p className="text-[12px] text-[#606165]">
                    ${item.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}