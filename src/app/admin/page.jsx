"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { geoService } from "@/services/geoService";
import {
  Landmark,
  Building2,
  MapPinned,
  TreePine,
  Home,
  Building,
  HeartPulse,
  School,
  GraduationCap,
  Users,
  TrendingUp,
  Plus,
  Clock,
  ArrowUpRight,
  Loader2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const populationTrend = [
  { year: "2001", pop: 96.9 },
  { year: "2006", pop: 103.4 },
  { year: "2011", pop: 112.4 },
  { year: "2016", pop: 117.2 },
  { year: "2021", pop: 121.8 },
  { year: "2024", pop: 125.0 },
];

const divisionPop = [
  { name: "Pune", pop: 29.3 },
  { name: "Nashik", pop: 19.8 },
  { name: "Aurangabad", pop: 18.6 },
  { name: "Mumbai", pop: 22.1 },
  { name: "Amravati", pop: 14.9 },
  { name: "Nagpur", pop: 12.7 },
];

const recentActivity = [
  { id: 1, action: "Created", entity: "Nashik District", user: "Admin", time: "2 min ago", type: "create" },
  { id: 2, action: "Updated", entity: "Pune Division stats", user: "Admin", time: "18 min ago", type: "update" },
  { id: 3, action: "Deleted", entity: "Duplicate hospital record", user: "Admin", time: "1 hr ago", type: "delete" },
  { id: 4, action: "Exported", entity: "Population report (PDF)", user: "Admin", time: "2 hr ago", type: "export" },
];

const actionColor = {
  create: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  update: "bg-blue-50 text-blue-700 border border-blue-200",
  delete: "bg-red-50 text-red-700 border border-red-200",
  export: "bg-amber-50 text-amber-700 border border-amber-200",
};

const quickActions = [
  { label: "Add Division", href: "/admin/divisions/create", icon: Landmark },
  { label: "Add District", href: "/admin/divisions", icon: Building2 },
  { label: "Add Taluka", href: "/admin/divisions", icon: MapPinned },
  { label: "Add Village", href: "/admin/divisions", icon: TreePine },
];

// ── Custom Tooltip Component ───────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-lg text-sm">
      <p className="font-semibold text-slate-700">{label}</p>
      <p className="text-emerald-600 font-bold">{payload[0].value}M</p>
    </div>
  );
}

// ── Fixed Stat Card Component ──────────────────────────────
function StatCard({ label, value, icon: Icon, href, color }) {
  const colors = {
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    blue: "bg-blue-50 text-blue-600",
  };

  const cardContent = (
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p>
        <h3 className="mt-2 text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
      </div>
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${colors[color]}`}>
        <Icon size={22} />
      </div>
    </div>
  );

  const cardFooter = (
    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
      <span className="font-medium text-slate-400">Live Infrastructure Node</span>
      <span className="font-bold text-emerald-600 group-hover:underline">Explore →</span>
    </div>
  );

  return href ? (
    <Link href={href} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-emerald-300">
      {cardContent}
      {cardFooter}
    </Link>
  ) : (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {cardContent}
      <div className="mt-5 border-t border-slate-100 pt-3 text-xs text-slate-400 font-medium">
        System Automated Parameter
      </div>
    </div>
  );
}

// ── Main Page Component ─────────────────────────────────────
export default function AdminDashboard() {
  const [liveCounts, setLiveCounts] = useState({
    divisions: "...",
    districts: "...",
    talukas: "...",
    villages: "...",
    cities: "...",
    towns: "...",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardMetrics() {
      try {
        // Query the live system database endpoints simultaneously
        const [divs, dists, tals, vils, cits, twns] = await Promise.all([
          geoService.getAllDivisions?.() || [],
          geoService.getAllDistricts?.() || [],
          geoService.getAllTalukas?.() || [],
          geoService.getAllVillages?.() || [],
          geoService.getAllCities?.() || [],
          geoService.getAllTowns?.() || [],
        ]);

        // Safely map values based on payload wrappers
        setLiveCounts({
          divisions: divs?.data?.length || divs?.length || 0,
          districts: dists?.data?.length || dists?.length || 0,
          talukas: tals?.data?.length || tals?.length || 0,
          villages: vils?.data?.length || vils?.length || 0,
          cities: cits?.data?.length || cits?.length || 0,
          towns: twns?.data?.length || twns?.length || 0,
        });
      } catch (err) {
        console.error("Dashboard metric sync failure:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardMetrics();
  }, []);

  const statsGroups = [
    {
      group: "Administrative Hierarchy Matrix",
      color: "emerald",
      items: [
        { label: "Divisions", value: liveCounts.divisions, icon: Landmark, href: "/admin/divisions" },
        { label: "Districts", value: liveCounts.districts, icon: Building2, href: "/admin/divisions" },
        { label: "Talukas", value: liveCounts.talukas, icon: MapPinned, href: "/admin/divisions" },
        { label: "Villages", value: liveCounts.villages, icon: TreePine, href: "/admin/divisions" },
        { label: "Cities", value: liveCounts.cities, icon: Building, href: "/admin/divisions" },
        { label: "Towns", value: liveCounts.towns, icon: Home, href: "/admin/divisions" },
      ],
    },
  ];

  const nowString = new Date().toLocaleString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto p-2">
      {/* Welcome Block */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Welcome back, Admin 👋
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-0.5">
            System Synchronized Tracker Profile : {nowString}
          </p>
        </div>
        <div className="flex w-fit items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
          <TrendingUp size={14} />
          <span>Core Network Operational</span>
        </div>
      </div>

      {/* Metrics Section */}
      {statsGroups.map((group) => (
        <div key={group.group} className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">
            {group.group}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {group.items.map((item) => (
              <StatCard key={item.label} {...item} color={group.color} />
            ))}
          </div>
        </div>
      ))}

      {/* Charts Grid Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Population Trend */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Population Trend</h3>
              <p className="text-xs text-slate-400 mt-0.5">State Census Records (Millions)</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
              +2.7% YoY Growth
            </span>
          </div>  
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={populationTrend} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="popGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="pop"
                stroke="#10b981"
                strokeWidth={2.5}
                fill="url(#popGrad)"
                dot={{ fill: "#10b981", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Division Split */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="font-bold text-slate-900 text-lg">Population by Division</h3>
            <p className="text-xs text-slate-400 mt-0.5">Demographic Densities Analysis</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={divisionPop} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="pop" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activities and Actions Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between border-b border-slate-50 pb-3">
            <h3 className="font-bold text-slate-900 text-lg">System Audit Activity</h3>
            <Link href="/admin/divisions" className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-emerald-600 transition-colors">
              View Logs <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-start gap-4 py-3.5 first:pt-1 last:pb-1">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-md px-1.5 py-0.5 text-xs font-bold tracking-wide uppercase ${actionColor[item.type]}`}>
                      {item.action}
                    </span>
                    <span className="text-sm font-semibold text-slate-700">{item.entity}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-400 font-medium">
                    <Clock size={12} />
                    <span>{item.time}</span>
                    <span>·</span>
                    <span className="text-slate-500">Operator: {item.user}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Setup Cards */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-5 font-bold text-slate-900 text-lg border-b border-slate-50 pb-3">
            Quick Initialization Gateways
          </h3>
          <div className="space-y-2.5">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="group flex items-center gap-3 rounded-xl border border-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:text-emerald-700"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                    <Icon size={16} />
                  </div>
                  {action.label}
                  <Plus size={14} className="ml-auto opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:scale-110" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}