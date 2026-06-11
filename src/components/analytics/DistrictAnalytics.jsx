"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  {
    category: "Talukas",
    value: 15,
  },
  {
    category: "Villages",
    value: 1200,
  },
  {
    category: "Schools",
    value: 850,
  },
  {
    category: "Hospitals",
    value: 120,
  },
];

export default function DistrictAnalytics() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Administrative Insights
          </h2>

          <p className="mt-2 text-slate-600">
            Key metrics and administrative indicators.
          </p>
        </div>

        <div className="rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
          Live Overview
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">

        <MetricCard
          value="15"
          label="Talukas"
        />

        <MetricCard
          value="1200+"
          label="Villages"
        />

        <MetricCard
          value="850"
          label="Schools"
        />

        <MetricCard
          value="120"
          label="Hospitals"
        />

      </div>

      <div className="mt-10 h-[320px]">

        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis dataKey="category" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#10b981"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

function MetricCard({
  value,
  label,
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-3xl font-bold text-emerald-600">
        {value}
      </p>

      <p className="mt-1 text-sm text-slate-500">
        {label}
      </p>
    </div>
  );
}