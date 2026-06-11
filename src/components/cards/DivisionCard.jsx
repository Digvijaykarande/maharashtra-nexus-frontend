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
  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.2,
      }}
      className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-emerald-300 hover:shadow-xl"
    >
      {/* Gradient Border */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 to-emerald-300" />

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-sm font-bold text-emerald-600">
          {division.short}
        </div>

        <Building2
          size={20}
          className="text-emerald-500"
        />
      </div>

      {/* Title */}
      <h3 className="mt-6 text-xl font-bold leading-tight">
        {division.name}
      </h3>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-slate-50 p-4">
          <Landmark
            size={18}
            className="text-emerald-500"
          />

          <h4 className="mt-3 text-2xl font-bold">
            {division.districts}
          </h4>

          <p className="text-sm text-slate-500">
            Districts
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <MapPinned
            size={18}
            className="text-emerald-500"
          />

          <h4 className="mt-3 text-2xl font-bold">
            {division.talukas}
          </h4>

          <p className="text-sm text-slate-500">
            Talukas
          </p>
        </div>
      </div>

      {/* Village Count */}
      <div className="mt-4 rounded-2xl bg-emerald-50 p-4">
        <p className="text-sm text-slate-500">
          Villages
        </p>

        <h4 className="mt-1 text-2xl font-bold text-emerald-600">
          {division.villages.toLocaleString()}
        </h4>
      </div>

      {/* Button */}
      <Link href={`/divisions/${division.slug}`} className="mt-6 flex items-center gap-2 font-medium text-emerald-600 transition-all duration-300 group-hover:gap-3 focus:outline-none focus:ring-0">
        Explore Division
        <ArrowRight size={18} />
      </Link>
    </motion.div>
  );
}