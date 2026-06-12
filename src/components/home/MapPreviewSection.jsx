"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import Container from "../layout/Container";
import { useLivePlatformData } from "@/hooks/useLivePlatformData";
import {
  Search,
  MapPinned,
  Building2,
  Landmark,
  ArrowRight,
  Loader2
} from "lucide-react";

export default function MapPreviewSection() {
  const [query, setQuery] = useState("");
  const { divisions, districts, stats, loading } = useLivePlatformData();

  const searchTerm = query.trim().toLowerCase();

  const divisionResults = searchTerm
    ? divisions.filter((division) => division.name.toLowerCase().includes(searchTerm))
    : [];

  const districtResults = searchTerm
    ? districts.filter((district) => district.name.toLowerCase().includes(searchTerm))
    : [];

  return (
    <section className="relative py-15 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-3xl" />

      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

          {/* LEFT PANEL */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-700">
              Maharashtra Explorer
            </span>
            <h2 className="mt-6 max-w-[650px] text-4xl font-black tracking-tight text-slate-900 lg:text-5xl">
              Explore Maharashtra's Administrative Network
            </h2>
            <p className="mt-6 text-base font-medium text-slate-500 leading-relaxed">
              Navigate through Maharashtra's complete administrative hierarchy from divisions and districts to talukas, villages, cities and towns.
            </p>

            {/* Search */}
            <div className="relative mt-8">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition-all duration-300 focus-within:border-emerald-400 focus-within:shadow-lg">
                <Search size={18} className="text-slate-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Query live repository records..."
                  className="w-full bg-transparent outline-none font-medium text-slate-800"
                />
              </div>

              {/* Live Search Popup Overlay */}
              {query.trim() && (
                <div className="absolute left-0 right-0 z-30 max-h-80 overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl mt-2">
                  {divisionResults.length === 0 && districtResults.length === 0 && (
                    <div className="p-4 text-sm font-medium text-slate-400">No active structures located</div>
                  )}

                  {divisionResults.length > 0 && (
                    <>
                      <div className="sticky top-0 bg-slate-50 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Divisions</div>
                      {divisionResults.slice(0, 5).map((division) => (
                        <Link key={division.slug} href={`/divisions/${division.slug}`} className="block border-b border-slate-100 px-4 py-3 font-bold text-slate-700 hover:bg-emerald-50">
                          {division.name}
                        </Link>
                      ))}
                    </>
                  )}

                  {districtResults.length > 0 && (
                    <>
                      <div className="sticky top-0 bg-slate-50 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Districts</div>
                      {districtResults.slice(0, 5).map((district) => (
                        <Link key={district.slug} href={`/divisions/pune/${district.slug}`} className="block border-b border-slate-100 px-4 py-3 hover:bg-emerald-50 group">
                          <div className="font-bold text-slate-700 group-hover:text-emerald-800 text-sm">{district.name}</div>
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>

            <Link href="/divisions" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-bold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-600 text-sm">
              Start Exploring <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* RIGHT TREE GRID */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between border-b pb-4 border-slate-100">
                <h3 className="font-bold text-lg text-slate-900 tracking-tight">Administrative Tree Branching</h3>
                <MapPinned className="text-emerald-500" size={20} />
              </div>

              <div className="mt-4 space-y-2 max-h-60 overflow-y-auto scrollbar-none">
                {loading ? (
                  <div className="flex items-center justify-center py-12 text-slate-400 font-semibold text-xs gap-1.5">
                    <Loader2 className="animate-spin text-emerald-500" size={14} /> Syncing hierarchy structure...
                  </div>
                ) : (
                  divisions.slice(0, 5).map((div) => (
                    <HierarchyItem 
                      key={div.slug} 
                      title={`${div.name} Division`} 
                      subtitle={`${div.districts?.length || div.districtsCount || 5} Tracked Districts`} 
                    />
                  ))
                )}
              </div>

              {/* Bottom Live Counters */}
              <div className="mt-5 grid grid-cols-3 gap-3">
                <MiniStat icon={<Landmark size={16} />} value={loading ? "..." : stats.districtsCount} label="Districts" />
                <MiniStat icon={<Building2 size={16} />} value={loading ? "..." : stats.talukasCount} label="Talukas" />
                <MiniStat icon={<MapPinned size={16} />} value={loading ? "..." : `${(stats.totalVillages / 1000).toFixed(0)}K+`} label="Villages" />
              </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}

function MiniStat({ value, label, icon }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3 text-center border border-slate-100">
      <div className="flex justify-center text-emerald-500 mb-1">{icon}</div>
      <h4 className="text-xl font-black text-slate-800 tracking-tight">{value}</h4>
      <p className="text-[11px] font-bold text-slate-400 mt-0.5">{label}</p>
    </div>
  );
}

function HierarchyItem({ title, subtitle }) {
  return (
    <div className="group flex items-center justify-between rounded-2xl border border-slate-100 p-3.5 transition-all duration-150 hover:border-emerald-200 hover:bg-emerald-50/50">
      <div>
        <h4 className="font-bold text-slate-800 text-sm tracking-tight">{title}</h4>
        <p className="text-xs text-slate-400 font-medium mt-0.5">{subtitle}</p>
      </div>
      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" />
    </div>
  );
}