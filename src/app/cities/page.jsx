"use client";

import { useState } from "react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import Link from "next/link";
import { Search, Building2, Users } from "lucide-react";
import { cities } from "@/data/cities";

export default function CitiesPage() {
  const [query, setQuery] = useState("");

  const filteredCities = cities.filter((city) =>
    city.name?.toLowerCase().includes(query.toLowerCase())
  );

  const totalPopulation = cities.reduce(
    (sum, city) => sum + (city.population || 0),
    0
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50/50">
        {/* Main Content Banner Header */}
        <section className="py-24">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-700 shadow-sm">
                Maharashtra Cities
              </span>

              <h1 className="mt-6 text-5xl font-bold lg:text-7xl tracking-tight text-slate-900">
                Explore Cities
              </h1>

              <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Browse major cities across Maharashtra, their population structures, and local administrative configurations.
              </p>
            </div>
          </Container>
        </section>

        {/* Cumulative Metric Panels */}
        <section className="pb-12">
          <Container>
            <div className="grid gap-6 md:grid-cols-2">
              <DashboardStatCard
                icon={<Building2 className="w-6 h-6" />}
                value={cities.length}
                label="Registered Cities"
              />
              <DashboardStatCard
                icon={<Users className="w-6 h-6" />}
                value={totalPopulation.toLocaleString()}
                label="Combined Population"
              />
            </div>
          </Container>
        </section>

        {/* Reactive Search Controls */}
        <section className="pb-12">
          <Container>
            <div className="mx-auto max-w-3xl">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
                <Search size={20} className="text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search cities by name..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full outline-none text-slate-800 bg-transparent text-base placeholder-slate-400"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Results Dynamic Grid Display */}
        <section className="pb-24">
          <Container>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCities.map((city) => (
                <RootCityCard key={city.slug} city={city} />
              ))}
            </div>
            {filteredCities.length === 0 && (
              <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-md mx-auto">
                <p className="text-slate-500 font-medium">No matching cities found for "{query}"</p>
              </div>
            )}
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}

function DashboardStatCard({ icon, value, label }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex items-center gap-5">
      <div className="text-emerald-500 bg-emerald-50 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{value}</h3>
        <p className="mt-0.5 text-sm font-medium text-slate-500">{label}</p>
      </div>
    </div>
  );
}

function RootCityCard({ city }) {
  return (
    <Link href={`/cities/${city.slug}`} className="block group">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-emerald-300 group-hover:shadow-xl h-full flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors tracking-tight">
            {city.name}
          </h3>
          <p className="mt-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {city.type || "Urban Zone"}
          </p>
          <div className="mt-4 pt-4 border-t border-slate-50 space-y-1">
            <p className="text-sm text-slate-600 font-medium">
              Population: <span className="text-slate-800 font-semibold">{city.population?.toLocaleString()}</span>
            </p>
            <p className="text-xs text-slate-500">
              Region: {city.taluka} Taluka
            </p>
          </div>
        </div>
        <div className="mt-6 text-sm font-semibold text-emerald-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
          View Details &rarr;
        </div>
      </div>
    </Link>
  );
}