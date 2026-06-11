"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Pune", value: 25 },
  { name: "Nagpur", value: 18 },
  { name: "Konkan", value: 20 },
  { name: "Nashik", value: 14 },
  { name: "Amravati", value: 11 },
  { name: "Sambhajinagar", value: 12 },
];

const COLORS = [
  "#10b981",
  "#34d399",
  "#6ee7b7",
  "#059669",
  "#047857",
  "#065f46",
];

export default function PopulationDistributionChart() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold">
        Population Distribution
      </h2>

      <div className="mt-8 h-[350px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={120}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}