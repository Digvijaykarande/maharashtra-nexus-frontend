"use client";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import Link from "next/link";
import { useState } from "react";
import { divisions } from "@/data/divisions";
import { districts } from "@/data/districts";
import { useMemo } from "react";

import {
  Building2,
  Search,
  ArrowRight,
} from "lucide-react";

export default function DivisionsPage() {

   const [query, setQuery] = useState("");
   const searchTerm = query.trim().toLowerCase();

const divisionResults = useMemo(
  () =>
    searchTerm
      ? divisions.filter((division) =>
          division.name.toLowerCase().includes(searchTerm)
        )
      : [],
  [searchTerm]
);

const districtResults = useMemo(
  () =>
    searchTerm
      ? districts.filter((district) =>
          district.name.toLowerCase().includes(searchTerm)
        )
      : [],
  [searchTerm]
);

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

              <h1 className="mt-6 text-5xl font-bold tracking-tight lg:text-7xl">
                Explore Divisions
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600">
                Browse Maharashtra's six administrative
                divisions and explore districts,
                talukas, villages, cities and towns.
              </p>

            </div>
          </Container>
        </section>

        {/* Stats */}
        <section className="pb-16">
          <Container>
            <div className="grid gap-6 md:grid-cols-3">

              <StatCard
                value="6"
                label="Divisions"
              />

              <StatCard
                value="36"
                label="Districts"
              />

              <StatCard
                value="358"
                label="Talukas"
              />

            </div>
          </Container>
        </section>

        {/* Search */}
      {/* Search */}
<section className="pb-12">
  <Container>
    <div className="relative mx-auto max-w-xl">

      {/* Input */}
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition-all duration-300 focus-within:border-emerald-400 focus-within:shadow-lg">

        <Search
          size={18}
          className="text-slate-400"
        />

        <input
          type="text"
          placeholder="Search divisions or districts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent outline-none"
        />

      </div>

      {/* Results */}
      {query.trim() && (
        <div className="absolute left-0 right-0 top-full z-30 mt-2 max-h-96 overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl">

          {divisionResults.length === 0 &&
            districtResults.length === 0 && (
              <div className="p-4 text-sm text-slate-500">
                No results found
              </div>
          )}

          {/* Divisions */}
          {divisionResults.length > 0 && (
            <>
              <div className="sticky top-0 border-b bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Divisions
              </div>

              {divisionResults
                .slice(0, 5)
                .map((division) => (
                  <Link
                    key={division.slug}
                    href={`/divisions/${division.slug}`}
                    onClick={() => setQuery("")}
                    className="block border-b border-slate-100 px-4 py-3 transition-all duration-200 hover:bg-emerald-50 hover:pl-6"
                  >
                    <div className="font-medium text-slate-900">
                      {division.name}
                    </div>
                  </Link>
                ))}
            </>
          )}

          {/* Districts */}
          {districtResults.length > 0 && (
            <>
              <div className="sticky top-0 border-b bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Districts
              </div>

              {districtResults
                .slice(0, 5)
                .map((district) => (
                  <Link
                    key={district.slug}
                    href={`/districts/${district.slug}`}
                    onClick={() => setQuery("")}
                    className="block border-b border-slate-100 px-4 py-3 transition-all duration-200 hover:bg-emerald-50 hover:pl-6"
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
  </Container>
</section>

      </main>
      {/* Divisions Grid */}
<section className="pb-24">
  <Container>

    <div className="mb-8 flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold">
          Maharashtra Divisions
        </h2>

        <p className="mt-2 text-slate-600">
          Explore all administrative divisions of Maharashtra.
        </p>
      </div>

      <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
        {divisions.length} Divisions
      </span>
    </div>

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      {divisions.map((division) => (
        <Link
          key={division.id}
          href={`/divisions/${division.slug}`}
        >
          <DivisionCard division={division} />
        </Link>
      ))}

    </div>

  </Container>
</section>

      <Footer />
    </>
  );
}

function StatCard({
  value,
  label,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center">
      <h3 className="text-4xl font-bold text-emerald-600">
        {value}
      </h3>

      <p className="mt-2 text-slate-600">
        {label}
      </p>
    </div>
  );
}

function DivisionCard({
  division,
}) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl">

      <div className="flex items-center justify-between">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 font-bold text-emerald-600">
          {division.short}
        </div>

        <Building2 className="text-emerald-500" />

      </div>

      <h3 className="mt-6 text-xl font-bold">
        {division.name}
      </h3>

      <p className="mt-3 text-sm text-slate-600">
        {division.description}
      </p>

      <div className="mt-6 grid grid-cols-3 gap-3">

        <MiniStat
          value={division.districts}
          label="Districts"
        />

        <MiniStat
          value={division.talukas}
          label="Talukas"
        />

        <MiniStat
          value={division.villages}
          label="Villages"
        />

      </div>

      <div className="mt-6 flex items-center gap-2 font-medium text-emerald-600">
        Explore Division

        <ArrowRight size={18} />
      </div>

    </div>
  );
}

function MiniStat({
  value,
  label,
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-3 text-center">
      <p className="font-bold">
        {value}
      </p>

      <p className="text-xs text-slate-500">
        {label}
      </p>
    </div>
  );
}