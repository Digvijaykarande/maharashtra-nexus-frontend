"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import Container from "../layout/Container";

import {
  Search,
  Building2,
  Landmark,
  MapPinned,
  Users,
  HeartPulse,
} from "lucide-react";
import { divisions } from "@/data/divisions";
import { districts } from "@/data/districts";

export default function Hero() {

  const [query, setQuery] = useState("");
  
    const divisionResults = divisions.filter((division) =>
      division.name
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  
    const districtResults = districts.filter((district) =>
      district.name
        .toLowerCase()
        .includes(query.toLowerCase())
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

            <h1 className="mt-6 text-5xl font-bold tracking-tight lg:text-7xl">
                <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-600 bg-clip-text text-transparent">
                    Explore Maharashtra
                </span>

                <br />

                <span className="text-slate-900">
                    Through Data
                </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-600">
              Access administrative, population,
              healthcare, and educational insights
              across Maharashtra through a modern
              data-driven platform.
            </p>

            <div className="mt-8 max-w-xl">
        <div className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition-all duration-300 hover:border-emerald-300 hover:shadow-lg focus-within:border-emerald-500 focus-within:shadow-lg">
          <Search className="h-5 w-5 text-slate-400" />
          <input
                  type="text"
                  placeholder="Search divisions or districts..."
                  value={query}
                  onChange={(e) =>
                    setQuery(e.target.value)
                  }
                  className="w-full outline-none"
                />
        </div>
      </div>

      {/* Search Results Dropdown */}
{query.trim() && (
  <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
    {divisionResults.length === 0 &&
      districtResults.length === 0 && (
        <div className="p-4 text-sm text-slate-500">
          No results found
        </div>
      )}

    {/* Divisions */}
    {divisionResults.length > 0 && (
      <>
        <div className="border-b bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Divisions
        </div>

        {divisionResults.map((division) => (
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

    {/* Districts */}
    {districtResults.length > 0 && (
      <>
        <div className="border-b bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Districts
        </div>

        {districtResults.map((district) => (
          <Link
            key={district.slug}
            href={`/districts/${district.slug}`}
            className="block border-b border-slate-100 px-4 py-3 transition hover:bg-emerald-50"
          >
            <div className="font-medium text-slate-900">
              {district.name}
            </div>

            <div className="text-sm text-slate-500">
              {district.headquarters}
            </div>
          </Link>
        ))}
      </>
    )}
  </div>
)}

  <div className="mt-8 flex items-center gap-5">
    <Link href="/divisions" className="rounded-xl bg-emerald-500 px-6 py-3 font-medium text-white shadow-lg shadow-emerald-500/25 transition hover:-translate-y-0.5 hover:bg-emerald-600">
      Explore Maharashtra
    </Link>

    <Link href="/analytics" className="font-medium text-slate-700 transition hover:text-emerald-600">
      View Statistics →
    </Link>
  </div>
          </div>

  {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
  {/* Floating Population Card */}
  <motion.div
    animate={{
      y: [0, -12, 0],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
    }}
    className="absolute -top-8 right-0 z-20 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-xl"
  >
    <p className="text-sm text-slate-500">
      Population
    </p>

    <h3 className="text-xl font-bold">
      125M+
    </h3>
  </motion.div>

  {/* Floating Hospital Card */}
  <motion.div
    animate={{
      y: [0, 12, 0],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
    }}
    className="absolute -bottom-8 left-8 z-20 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-xl"
  >
    <div className="flex items-center gap-2">
      <HeartPulse
        size={18}
        className="text-emerald-500"
      />

      <span className="text-sm text-slate-500">
        Hospitals
      </span>
    </div>

    <h3 className="mt-2 text-xl font-bold">
      12K+
    </h3>
  </motion.div>

  {/* Main Card */}
  <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_25px_60px_rgba(16,185,129,0.12)]">
    <h3 className="text-lg font-semibold">
      Maharashtra Overview
    </h3>

    <div className="mt-8 grid grid-cols-2 gap-4">
      <StatCard
        icon={<Landmark size={20} />}
        title="Divisions"
        value="6"
      />

      <StatCard
        icon={<Building2 size={20} />}
        title="Districts"
        value="36"
      />

      <StatCard
        icon={<MapPinned size={20} />}
        title="Talukas"
        value="358+"
      />

      <StatCard
        icon={<Users size={20} />}
        title="Villages"
        value="43K+"
      />
    </div>
  </div>
</motion.div>

        </div>
      </Container>
    </section>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="group rounded-2xl border border-slate-200 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg">          
          <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {title}
        </p>

        <div className="text-emerald-500 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
      </div>

      <h4 className="mt-3 text-2xl font-bold">
        {value}
      </h4>
    </div>
  );
}