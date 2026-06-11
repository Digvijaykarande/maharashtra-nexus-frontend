"use client";

import {
  Clock,
  User,
  Search,
  FileText,
  Pencil,
  Trash2,
  LogIn,
  Download,
} from "lucide-react";

import { useState } from "react";

const logs = [
  {
    id: 1,
    action: "Created",
    entity: "Wagholi Village",
    user: "Admin",
    time: "2 min ago",
    type: "create",
  },
  {
    id: 2,
    action: "Updated",
    entity: "Pune District",
    user: "Admin",
    time: "15 min ago",
    type: "update",
  },
  {
    id: 3,
    action: "Deleted",
    entity: "Hospital Record",
    user: "Admin",
    time: "1 hour ago",
    type: "delete",
  },
  {
    id: 4,
    action: "Login",
    entity: "Admin Session",
    user: "Admin",
    time: "2 hours ago",
    type: "login",
  },
  {
    id: 5,
    action: "Export",
    entity: "Population Report",
    user: "Admin",
    time: "3 hours ago",
    type: "export",
  },
];

const actionStyles = {
  create: {
    icon: FileText,
    color: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  },
  update: {
    icon: Pencil,
    color: "bg-blue-50 text-blue-700 border-blue-200/60",
  },
  delete: {
    icon: Trash2,
    color: "bg-red-50 text-red-700 border-red-200/60",
  },
  login: {
    icon: LogIn,
    color: "bg-slate-50 text-slate-700 border-slate-200/60",
  },
  export: {
    icon: Download,
    color: "bg-amber-50 text-amber-700 border-amber-200/60",
  },
};

export default function LogsPage() {
  const [search, setSearch] = useState("");

  const filteredLogs = logs.filter(
    (log) =>
      log.entity.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Container */}
      <div className="px-1 py-2">
        <h1 className="text-2xl font-bold text-slate-900">
          Activity Logs
        </h1>
        <p className="mt-0.5 text-sm text-slate-500">
          Monitor real-time administrative changes and platform events
        </p>
      </div>

      {/* Modern Filter Search Panel */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search by action or entity..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition duration-200 focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Styled Timeline Log Interface Module */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="relative space-y-2">
          
          {/* Central Connecting Tracker Axis Line */}
          {filteredLogs.length > 1 && (
            <div className="absolute left-[21px] top-4 bottom-4 w-px bg-slate-100" />
          )}

          {filteredLogs.map((log, index) => {
            const config = actionStyles[log.type] || actionStyles.login;
            const Icon = config.icon;

            return (
              <div
                key={log.id}
                className="group relative flex items-start gap-4 rounded-2xl p-3 transition-colors duration-200 hover:bg-slate-50/60"
              >
                {/* Timeline Axis Bullet Nodes Wrapper */}
                <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-white shadow-sm shadow-slate-100/50 transition-transform duration-300 group-hover:scale-105 border-slate-150">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg border ${config.color}`}>
                    <Icon size={15} />
                  </div>
                </div>

                {/* Primary Content Context Area */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className={`inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-bold uppercase tracking-wider ${config.color}`}>
                        {log.action}
                      </span>
                      <span className="font-semibold text-slate-900 truncate text-sm sm:text-base">
                        {log.entity}
                      </span>
                    </div>

                    {/* Meta Badge Tags Row */}
                    <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                      <div className="inline-flex items-center gap-1 rounded-md bg-slate-50 border border-slate-100 px-2 py-1 text-slate-500">
                        <User size={12} className="text-slate-400" />
                        <span>{log.user}</span>
                      </div>

                      <div className="inline-flex items-center gap-1 rounded-md bg-slate-50 border border-slate-100 px-2 py-1 text-slate-500">
                        <Clock size={12} className="text-slate-400" />
                        <span>{log.time}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}

          {/* Fallback Display For Empty Data Filters */}
          {!filteredLogs.length && (
            <div className="py-16 text-center text-sm text-slate-400">
              No matching activity records located in logs database.
            </div>
          )}

        </div>
      </div>
    </div>
  );
}