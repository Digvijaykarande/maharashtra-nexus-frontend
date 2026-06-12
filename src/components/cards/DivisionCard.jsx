"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  MapPinned,
  Landmark,
} from "lucide-react";

export default function DivisionCard({ division }) {
  // Safe fallbacks parsing real-time backend schema objects cleanly
  const shortName = division?.short || division?.name?.slice(0, 2).toUpperCase() || "MH";
  const districtCount = division?.districtsCount || division?.districts?.length || 0;
  const talukaCount = division?.talukasCount || 0;
  const villageCount = division?.villagesCount || division?.villages || 0;
  const targetSlug = division?.slug || division?.name?.toLowerCase() || "";

  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.2,
      }}
      className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-emerald-300 hover:shadow-xl flex flex-col justify-between h-full"
    >
      {/* Gradient Top Accent Bar */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 to-emerald-300" />

      <div>
        {/* Header Row */}
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-sm font-black text-emerald-600 border border-emerald-100">
            {shortName}
          </div>

          <Building2
            size={20}
            className="text-slate-300 group-hover:text-emerald-500 transition-colors duration-300"
          />
        </div>

        {/* Title */}
        <h3 className="mt-6 text-xl font-black text-slate-800 tracking-tight leading-tight">
          {division?.name}
        </h3>
        
        {division?.description && (
          <p className="mt-2 text-xs font-medium text-slate-400 line-clamp-2 leading-relaxed">
            {division.description}
          </p>
        )}

        {/* Primary Counts Metrics block */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-slate-50 border border-slate-100/60 p-4">
            <Landmark
              size={18}
              className="text-emerald-500"
            />
            <h4 className="mt-3 text-2xl font-black text-slate-800 tracking-tight">
              {districtCount}
            </h4>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">
              Districts
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 border border-slate-100/60 p-4">
            <MapPinned
              size={18}
              className="text-emerald-500"
            />
            <h4 className="mt-3 text-2xl font-black text-slate-800 tracking-tight">
              {talukaCount}
            </h4>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">
              Talukas
            </p>
          </div>
        </div>
      </div>

      <div>
        {/* Village Sub-Bar */}
        <div className="mt-4 rounded-2xl bg-emerald-50/60 border border-emerald-100/50 p-4">
          <p className="text-xs font-bold text-emerald-700/70 uppercase tracking-wider">
            Villages Registered
          </p>
          <h4 className="mt-1 text-2xl font-black text-emerald-600 tracking-tight">
            {villageCount.toLocaleString("en-IN")}
          </h4>
        </div>

        {/* Action Call-to-Navigation */}
        <Link 
          href={`/divisions/${targetSlug}`} 
          className="mt-6 inline-flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-emerald-600 transition-all duration-300 group-hover:gap-3.5 focus:outline-none focus:ring-0"
        >
          Explore Division
          <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
}