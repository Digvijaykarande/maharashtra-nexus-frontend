"use client";

import AdminMiniStatCard from "@/components/admin/AdminMiniStatCard";

import {
  TrendingUp,
  Building2,
  MapPinned,
  GraduationCap,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const populationTrend = [
  { year: "2001", population: 96.9 },
  { year: "2011", population: 112.4 },
  { year: "2021", population: 121.8 },
  { year: "2024", population: 125.0 },
];

const divisionPopulation = [
  { division: "Pune", population: 29.3 },
  { division: "Mumbai", population: 22.1 },
  { division: "Nashik", population: 19.8 },
  { division: "Nagpur", population: 12.7 },
  { division: "Amravati", population: 14.9 },
  { division: "Sambhajinagar", population: 18.6 },
];

const institutionData = [
  { name: "Hospitals", count: 12400 },
  { name: "Schools", count: 98200 },
  { name: "Colleges", count: 4812 },
];

const COLORS = ["#10b981", "#3b82f6", "#f59e0b"];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-slate-150 bg-white/95 px-3 py-2 shadow-xl backdrop-blur-sm text-xs">
      <p className="font-semibold text-slate-800">{label}</p>
      <p className="mt-0.5 font-bold text-emerald-600 text-sm">
        {payload[0].value}M
      </p>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header Container */}
      <div className="px-1 py-2">
        <h1 className="text-2xl font-bold text-slate-900">
          Analytics Dashboard
        </h1>
        <p className="mt-0.5 text-sm text-slate-500">
          Population and administrative insights across Maharashtra
        </p>
      </div>

      {/* Dynamic Mini Stat Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminMiniStatCard
          title="Population"
          value="125M+"
          icon={TrendingUp}
        />
        <AdminMiniStatCard
          title="Districts"
          value="36"
          icon={Building2}
        />
        <AdminMiniStatCard
          title="Talukas"
          value="358"
          icon={MapPinned}
        />
        <AdminMiniStatCard
          title="Institutions"
          value="115K+"
          icon={GraduationCap}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Population Trend Area Chart */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="mb-5">
            <h2 className="font-bold text-slate-900">
              Population Trend
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Maharashtra Population Growth (Millions)
            </p>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={populationTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="populationGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="population"
                stroke="#10b981"
                fill="url(#populationGradient)"
                strokeWidth={3}
                dot={{ fill: "#10b981", r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, fill: "#10b981" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Division Population Bar Chart */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="mb-5">
            <h2 className="font-bold text-slate-900">
              Population By Division
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Current estimates (Millions)
            </p>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={divisionPopulation} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="division" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="population"
                fill="#10b981"
                radius={[6, 6, 0, 0]}
                maxBarSize={35}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Institution Distribution Pie Chart */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="mb-5">
            <h2 className="font-bold text-slate-900">
              Institution Distribution
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Schools, Colleges and Hospitals ratio
            </p>
          </div>

          <div className="flex justify-center items-center h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={institutionData}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={4}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                  className="text-xs font-semibold fill-slate-700"
                >
                  {institutionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Insights Accent Container Grid */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
          <h2 className="mb-5 font-bold text-slate-900">
            Quick Insights
          </h2>

          <div className="space-y-3.5">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 transition-colors hover:bg-emerald-50">
              <h3 className="font-semibold text-emerald-800 text-sm">
                Highest Population Division
              </h3>
              <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                Pune Division leads with a recorded metric of <span className="font-semibold text-emerald-700">29.3 Million</span> residents.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4 transition-colors hover:bg-blue-50">
              <h3 className="font-semibold text-blue-800 text-sm">
                Education Network
              </h3>
              <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                Extensive networks found with more than <span className="font-semibold text-blue-700">98,000 schools</span> managed statewide.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4 transition-colors hover:bg-amber-50">
              <h3 className="font-semibold text-amber-800 text-sm">
                Healthcare Coverage
              </h3>
              <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                Comprehensive tracking active over <span className="font-semibold text-amber-700">12,400 hospitals</span> mapped directly in data logs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}