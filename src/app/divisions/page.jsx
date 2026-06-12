"use client";

import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import Link from "next/link";
import { useState } from "react";
import { useLivePlatformData } from "@/hooks/useLivePlatformData";
import { Building2, Search, ArrowRight, Loader2 } from "lucide-react";

export default function DivisionsPage() {
  const [query, setQuery] = useState("");
  const { divisions, districts, talukas, villages, stats, loading } = useLivePlatformData();
  const searchTerm = query.trim().toLowerCase();

  const divisionResults = searchTerm
    ? divisions.filter((division) =>
        division.name?.toLowerCase().includes(searchTerm)
      )
    : [];

  const districtResults = searchTerm
    ? districts.filter((district) =>
        district.name?.toLowerCase().includes(searchTerm)
      )
    : [];

  return (
    <>
      <Navbar />
      
      <main>
        {/* Hero */}
        <section className="py-24">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-700">
                Maharashtra Administrative Structure
              </span>

              <h1 className="mt-6 text-5xl font-black tracking-tight lg:text-7xl text-slate-900">
                Explore Divisions
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg font-medium text-slate-500 leading-relaxed">
                Browse Maharashtra's administrative divisions and explore districts,
                talukas, villages, cities and towns mapped directly within our production shards.
              </p>
            </div>
          </Container>
        </section>

        {/* Dynamic Cloud Core Counters */}
        <section className="pb-16">
          <Container>
            <div className="grid gap-6 md:grid-cols-3">
              <StatCard value={loading ? "..." : stats.divisionsCount} label="Divisions" />
              <StatCard value={loading ? "..." : stats.districtsCount} label="Districts" />
              <StatCard value={loading ? "..." : stats.talukasCount} label="Talukas" />
            </div>
          </Container>
        </section>

        {/* Dynamic Search Context Bar */}
        <section className="pb-12">
          <Container>
            <div className="relative mx-auto max-w-xl">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition-all duration-300 focus-within:border-emerald-400 focus-within:shadow-lg">
                {loading ? <Loader2 className="animate-spin text-emerald-500" size={18} /> : <Search size={18} className="text-slate-400" />}
                <input
                  type="text"
                  placeholder="Search divisions or districts..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent outline-none font-medium text-slate-800"
                />
              </div>

              {query.trim() && (
                <div className="absolute left-0 right-0 top-full z-30 mt-2 max-h-96 overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl">
                  {divisionResults.length === 0 && districtResults.length === 0 && (
                    <div className="p-4 text-sm font-medium text-slate-400">No active structures located</div>
                  )}

                  {divisionResults.length > 0 && (
                    <>
                      <div className="sticky top-0 bg-slate-50 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b">Divisions</div>
                      {divisionResults.slice(0, 5).map((division) => (
                        <Link
                          key={division.slug}
                          href={`/divisions/${division.slug}`}
                          onClick={() => setQuery("")}
                          className="block border-b border-slate-100 px-4 py-3 font-bold text-slate-700 transition hover:bg-emerald-50 hover:pl-6"
                        >
                          {division.name}
                        </Link>
                      ))}
                    </>
                  )}

                  {districtResults.length > 0 && (
                    <>
                      <div className="sticky top-0 bg-slate-50 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b">Districts</div>
                      {districtResults.slice(0, 5).map((district) => (
                        <Link
                          key={district.slug}
                          href={`/divisions/pune/${district.slug}`}
                          onClick={() => setQuery("")}
                          className="block border-b border-slate-100 px-4 py-3 transition hover:bg-emerald-50 hover:pl-6"
                        >
                          <div className="font-bold text-slate-700 text-sm">{district.name}</div>
                          <div className="text-xs text-slate-400 font-semibold mt-0.5">Headquarters: {district.headquarters || "Regional Center"}</div>
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
          </Container>
        </section>

        {/* Divisions Render Grid */}
        <section className="pb-24">
          <Container>
            <div className="mb-8 flex items-center justify-between border-b pb-4 border-slate-100">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">State Administrative Regions</h2>
                <p className="mt-1 text-sm font-medium text-slate-500">Explore administrative divisions of Maharashtra state.</p>
              </div>
              <span className="rounded-full bg-emerald-50 border border-emerald-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
                {loading ? "..." : `${divisions.length} Live Regions`}
              </span>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 text-slate-400 font-medium text-sm gap-2">
                <Loader2 className="animate-spin text-emerald-600" size={28} />
                <span>Syncing Regional Node Shards...</span>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {divisions.map((division) => {
  const currentSlug = division.slug || division.name?.toLowerCase()?.replace(" division", "");
  
  const finalDistricts = districts.filter(d => d.divisionSlug === currentSlug).length || Number(division.districts) || 0;
  const finalTalukas = talukas.filter(t => t.divisionSlug === currentSlug).length || Number(division.talukas) || 0;
  const finalVillages = villages.filter(v => v.divisionSlug === currentSlug).length || Number(division.villages) || 0;

  return (
    <Link key={division._id || division.id} href={`/divisions/${currentSlug}`}>
      <DivisionCard 
        division={{
          ...division,
          districts: finalDistricts,
          talukas: finalTalukas,
          villages: finalVillages,
          slug: currentSlug
        }} 
      />
    </Link>
  );
})}
              </div>
            )}
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
      <h3 className="text-4xl font-black text-emerald-600 tracking-tight">{value}</h3>
      <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400">{label}</p>
    </div>
  );
}

function DivisionCard({ division }) {
  return (
    <Link href={`/divisions/${division.slug}`} className="block group">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-200 group-hover:-translate-y-1 group-hover:border-emerald-300 group-hover:shadow-xl flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 font-black text-emerald-600 uppercase text-xs">
              {division.short || division.name.slice(0, 2)}
            </div>
            <Building2 className="text-slate-300 group-hover:text-emerald-500 transition-colors" size={20} />
          </div>

          <h3 className="mt-5 text-xl font-black text-slate-800 tracking-tight">{division.name}</h3>
          <p className="mt-2 text-xs font-medium text-slate-400 leading-relaxed line-clamp-3">
            {division.description || "Comprehensive administrative hierarchy monitoring active across localized municipal clusters."}
          </p>
        </div>

        <div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            <MiniStat value={division.districts} label="Districts" />
            <MiniStat value={division.talukas} label="Talukas" />
            <MiniStat value={division.villages ? division.villages.toLocaleString("en-IN") : 0} label="Villages" />
          </div>

          <div className="mt-5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 transition-all group-hover:gap-2.5">
            Explore Division <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </Link>
  );
}

function MiniStat({ value, label }) {
  return (
    <div className="rounded-xl bg-slate-50 border border-slate-100/60 p-2.5 text-center">
      <p className="font-extrabold text-slate-800 tracking-tight text-sm">{value}</p>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-0.5">{label}</p>
    </div>
  );
}