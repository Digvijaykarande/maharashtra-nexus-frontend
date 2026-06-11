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
  { division: "Pune", districts: 5 },
  { division: "Nagpur", districts: 6 },
  { division: "Nashik", districts: 5 },
  { division: "Konkan", districts: 7 },
  { division: "Amravati", districts: 5 },
  { division: "Sambhajinagar", districts: 8 },
];

export default function DivisionComparisonChart() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold">
        Division Comparison
      </h2>

      <p className="mt-2 text-slate-600">
        Number of districts across divisions.
      </p>

      <div className="mt-8 h-[400px]">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis dataKey="division" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="districts"
              fill="#10b981"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}