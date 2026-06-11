"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import Container from "../layout/Container";
import { divisions } from "@/data/divisions";
import { districts } from "@/data/districts";
import {
  Search,
  MapPinned,
  Building2,
  Landmark,
  ArrowRight,
} from "lucide-react";

export default function MapPreviewSection() {
      const [query, setQuery] = useState("");

    const searchTerm = query.trim().toLowerCase();

    const divisionResults = searchTerm
      ? divisions.filter((division) =>
          division.name.toLowerCase().includes(searchTerm)
        )
      : [];

    const districtResults = searchTerm
      ? districts.filter((district) =>
          district.name.toLowerCase().includes(searchTerm)
        )
      : [];
  return (
    <section className="relative py-15 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-3xl" />

      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-700">
              Maharashtra Explorer
            </span>

            <h2 className="mt-6 max-w-[650px] text-4xl font-bold tracking-tight lg:text-5xl">
              Explore Maharashtra's Administrative Network
            </h2>

            <p className="mt-6 text-lg text-slate-600">
              Navigate through Maharashtra's complete administrative hierarchy from divisions
               and districts to talukas, villages, cities and towns.
            </p>

            {/* Search */}
            {/* Search */}
<div className="relative mt-8">
  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition-all duration-300 focus-within:border-emerald-400 focus-within:shadow-lg">
    <Search
      size={18}
      className="text-slate-400"
    />

    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search divisions or districts..."
      className="w-full bg-transparent outline-none"
    />
  </div>

  {/* Search Results */}
  {query.trim() && (
    <div className="absolute z-30 mt-2 max-h-80 w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl">

      {divisionResults.length === 0 &&
        districtResults.length === 0 && (
          <div className="p-4 text-sm text-slate-500">
            No results found
          </div>
      )}

      {divisionResults.length > 0 && (
        <>
          <div className="sticky top-0 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Divisions
          </div>

          {divisionResults.slice(0, 5).map((division) => (
            <Link
              key={division.slug}
              href={`/divisions/${division.slug}`}
              className="block border-b border-slate-100 px-4 py-3 transition hover:bg-emerald-50"
            >
              <div className="font-medium text-slate-900">
                {division.name}
              </div>
            </Link>
          ))}
        </>
      )}

      {districtResults.length > 0 && (
        <>
          <div className="sticky top-0 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Districts
          </div>

          {districtResults.slice(0, 5).map((district) => (
            <Link
              key={district.slug}
              href={`/districts/${district.slug}`}
              className="block border-b border-slate-100 px-4 py-3 transition hover:bg-emerald-50"
            >
              <div className="font-medium text-slate-900">
                {district.name}
              </div>

              <div className="text-sm text-slate-500">
                Headquarters: {district.headquarters}
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  )}
</div>

{/* Popular Searches */}
<div className="mt-4">
  <p className="mb-3 text-sm font-medium text-slate-500">
    Popular Searches
  </p>

  <div className="flex flex-wrap gap-2">
    {[
      {
        name: "Pune",
        href: "/districts/pune",
      },
      {
        name: "Mumbai",
        href: "/districts/mumbai-city",
      },
      {
        name: "Nagpur",
        href: "/districts/nagpur",
      },
      {
        name: "Nashik",
        href: "/districts/nashik",
      },
      {
        name: "Kolhapur",
        href: "/districts/kolhapur",
      },
    ].map((item) => (
      <Link
        key={item.name}
        href={item.href}
        className="rounded-full bg-slate-100 px-3 py-1.5 text-sm transition hover:bg-emerald-100 hover:text-emerald-700"
      >
        {item.name}
      </Link>
    ))}
  </div>
</div>

<Link
  href="/divisions"
  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-medium text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-600"
>
  Start Exploring
  <ArrowRight size={18} />
</Link>

      </motion.div>

          {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >

      <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_25px_60px_rgba(16,185,129,0.12)]">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">
          Maharashtra Explorer
        </h3>
        <MapPinned className="text-emerald-500" />
      </div>

    {/* Hierarchy Tree */}
    <div className="mt-4 space-y-4">

      <HierarchyItem
        title="Pune Division"
        subtitle="5 Districts"
      />

      <HierarchyItem
        title="Nagpur Division"
        subtitle="6 Districts"
      />

      <HierarchyItem
        title="Nashik Division"
        subtitle="5 Districts"
      />

      <HierarchyItem
        title="Konkan Division"
        subtitle="7 Districts"
      />

    </div>

    {/* Bottom Stats */}
    <div className="mt-5 grid grid-cols-3 gap-4">
      <MiniStat
        icon={<Landmark size={18} />}
        value="36"
        label="Districts"
      />

      <MiniStat
        icon={<Building2 size={18} />}
        value="358"
        label="Talukas"
      />

      <MiniStat
        icon={<MapPinned size={18} />}
        value="43K+"
        label="Villages"
      />
    </div>
  </div>
</motion.div>

        </div>
      </Container>
    </section>
  );
}

function MiniStat({
  value,
  label,
  icon,
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 text-center">
      <div className="flex justify-center text-emerald-500">
        {icon}
      </div>

      <h4 className="mt-2 text-xl font-bold">
        {value}
      </h4>

      <p className="text-sm text-slate-500">
        {label}
      </p>
    </div>
  );
}

function HierarchyItem({
  title,
  subtitle,
}) {
  return (
    <div className="group flex items-center justify-between rounded-2xl border border-slate-100 p-4 transition-all duration-300 hover:border-emerald-200 hover:bg-emerald-50">
      <div>
        <h4 className="font-medium">
          {title}
        </h4>

        <p className="text-sm text-slate-500">
          {subtitle}
        </p>
      </div>

      <div className="h-2 w-2 rounded-full bg-emerald-500" />
    </div>
  );
}