"use client";

import { Search } from "lucide-react";

export default function AdminSearch({
  value,
  onChange,
}) {
  return (
    <div className="relative">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition duration-200 focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500"
      />
    </div>
  );
}