"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import Container from "../layout/Container";
import { useLivePlatformData } from "@/hooks/useLivePlatformData";
import {
  Search,
  Building2,
  Landmark,
  MapPinned,
  Users,
  HeartPulse,
  Loader2
} from "lucide-react";

export default function Hero() {
  const [query, setQuery] = useState("");
  const { divisions, districts, stats, loading } = useLivePlatformData();

  const divisionResults = divisions.filter((division) =>
    division.name.toLowerCase().includes(query.toLowerCase())
  );

  const districtResults = districts.filter((district) =>
    district.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="relative overflow-hidden min-h-[85vh] flex items-center">
      <div className="absolute left-1/2 top-0 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute right-0 top-1/3 -z-10 h-[350px] w-[350px] rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="absolute left-0 bottom-0 -z-10 h-[300px] w-[300px] rounded-full bg-amber-400/10 blur-3xl" />
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          
          {/* Left Side */}
          <div>
            <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-700">
              Administrative Intelligence Platform
            </span>

            <h1 className="mt-6 text-5xl font-black tracking-tight lg:text-7xl">
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-600 bg-clip-text text-transparent">
                Explore Maharashtra
              </span>
              <br />
              <span className="text-slate-900">Through Data</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg font-medium text-slate-500 leading-relaxed">
              Access administrative, population, healthcare, and educational insights across Maharashtra through a modern data-driven platform.
            </p>

            <div className="mt-8 max-w-xl relative">
              <div className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition-all duration-300 hover:border-emerald-300 hover:shadow-lg focus-within:border-emerald-500 focus-within:shadow-lg">
                {loading ? <Loader2 className="h-5 w-5 text-emerald-500 animate-spin" /> : <Search className="h-5 w-5 text-slate-400" />}
                <input
                  type="text"
                  placeholder="Search live divisions or districts..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full outline-none text-slate-800 font-medium"
                />
              </div>

              {/* Dynamic Live Dropdown Results */}
              {query.trim() && (
                <div className="absolute left-0 right-0 z-30 mt-2 max-h-64 overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl">
                  {divisionResults.length === 0 && districtResults.length === 0 && (
                    <div className="p-4 text-sm font-medium text-slate-500">No matching clusters found</div>
                  )}

                  {divisionResults.length > 0 && (
                    <>
                      <div className="sticky top-0 bg-slate-50 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                        Divisions
                      </div>
                      {divisionResults.map((division) => (
                        <Link
                          key={division.slug}
                          href={`/divisions/${division.slug}`}
                          className="block border-b border-slate-100 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800"
                        >
                          {division.name}
                        </Link>
                      ))}
                    </>
                  )}

                  {districtResults.length > 0 && (
                    <>
                      <div className="sticky top-0 bg-slate-50 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                        Districts
                      </div>
                      {districtResults.map((district) => (
                        <Link
                          key={district.slug}
                          href={`/divisions/pune/${district.slug}`} // Maps securely to your routing pattern
                          className="block border-b border-slate-100 px-4 py-3 transition hover:bg-emerald-50 group"
                        >
                          <div className="font-bold text-slate-700 group-hover:text-emerald-800 text-sm">{district.name}</div>
                          <div className="text-xs text-slate-400 font-semibold mt-0.5">HQ: {district.headquarters || "Regional Office"}</div>
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="mt-8 flex items-center gap-5">
              <Link href="/divisions" className="rounded-xl bg-emerald-500 px-6 py-3 font-bold text-white shadow-lg shadow-emerald-500/25 transition hover:-translate-y-0.5 hover:bg-emerald-600 text-sm">
                Explore Maharashtra
              </Link>
              <Link href="/analytics" className="font-bold text-slate-700 transition hover:text-emerald-600 text-sm">
                View Statistics →
              </Link>
            </div>
          </div>

          {/* Right Floating Deck (Hydrated from Live Metrics) */}
          <div className="relative flex justify-center">
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-8 right-0 z-20 rounded-2xl border border-slate-100 bg-white px-5 py-3 shadow-xl">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">State Census</p>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">125M+</h3>
            </motion.div>

            <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -bottom-8 left-8 z-20 rounded-2xl border border-slate-100 bg-white px-5 py-3 shadow-xl">
              <div className="flex items-center gap-1.5">
                <HeartPulse size={16} className="text-emerald-500 animate-pulse" />
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Hospitals</span>
              </div>
              <h3 className="mt-1 text-2xl font-black text-slate-800 tracking-tight">
                {loading ? "..." : `${(stats.totalHospitals / 1000).toFixed(1)}K+`}
              </h3>
            </motion.div>

            <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_25px_60px_rgba(16,185,129,0.08)]">
              <h3 className="text-lg font-black text-slate-900 tracking-tight border-b pb-4 border-slate-100">Maharashtra Overview</h3>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <StatCard icon={<Landmark size={18} />} title="Divisions" value={loading ? "..." : stats.divisionsCount} />
                <StatCard icon={<Building2 size={18} />} title="Districts" value={loading ? "..." : stats.districtsCount} />
                <StatCard icon={<MapPinned size={18} />} title="Talukas" value={loading ? "..." : stats.talukasCount} />
                <StatCard icon={<Users size={18} />} title="Villages" value={loading ? "..." : `${(stats.totalVillages / 1000).toFixed(0)}K+`} />
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="group rounded-2xl border border-slate-200 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md bg-slate-50/30">          
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
        <div className="text-emerald-500 transition-transform duration-200 group-hover:scale-105">{icon}</div>
      </div>
      <h4 className="mt-2 text-3xl font-black text-slate-800 tracking-tight">{value}</h4>
    </div>
  );
}