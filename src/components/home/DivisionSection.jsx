"use client";

import Container from "../layout/Container";
import DivisionCard from "../cards/DivisionCard";
import { divisions } from "@/data/divisions";

export default function DivisionSection() {
  return (
    <section className="relative py-18">
      <div className="absolute left-1/2 top-0 -z-10 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-3xl" />
      <Container>
        <div className="text-center">
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-700">
            Administrative Divisions
          </span>

          <h2 className="mt-5 text-4xl font-bold tracking-tight lg:text-5xl">
            Explore Maharashtra Divisions
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600">
            Navigate through Maharashtra's administrative
            hierarchy and explore districts, talukas,
            villages, cities and towns across all divisions.
          </p>

        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {divisions.map((division) => (
            <DivisionCard
              key={division.id}
              division={division}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}