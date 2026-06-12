"use client";

import Container from "../layout/Container";
import DivisionCard from "../cards/DivisionCard";
import { useLivePlatformData } from "@/hooks/useLivePlatformData";
import { Loader2 } from "lucide-react";

export default function DivisionSection() {
  const { divisions, districts, talukas, villages, loading } = useLivePlatformData();

  return (
    <section className="relative py-18">
      <div className="absolute left-1/2 top-0 -z-10 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-3xl" />
      <Container>
        <div className="text-center">
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-700">
            Administrative Divisions
          </span>
          <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-900 lg:text-5xl">
            Explore Maharashtra Divisions
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base font-medium text-slate-500 leading-relaxed">
            Navigate through Maharashtra's administrative hierarchy and explore districts, talukas, villages, cities and towns across all live data branches.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24 gap-2 text-slate-400 text-sm font-semibold">
            <Loader2 className="animate-spin text-emerald-600" size={20} />
            <span>Connecting to live geographical shards...</span>
          </div>
        ) : (
          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {divisions.map((division) => {
              const currentSlug = division.slug || division.name?.toLowerCase()?.replace(" division", "");

              // 🧠 Compute array lengths based on active database mappings
              const arrayDistrictsCount = districts.filter(
                (d) => d.divisionSlug === currentSlug || d.division?.toLowerCase() === currentSlug
              ).length;

              const arrayTalukasCount = talukas.filter(
                (t) => t.divisionSlug === currentSlug || t.division?.toLowerCase() === currentSlug
              ).length;

              const arrayVillagesCount = villages.filter(
                (v) => v.divisionSlug === currentSlug || v.division?.toLowerCase() === currentSlug
              ).length;

              // 🎯 SAFE LOOKUPS: Prefer real-time array totals. If empty, fall back directly to fields from database!
              const finalDistricts = arrayDistrictsCount || Number(division.districts) || 0;
              const finalTalukas = arrayTalukasCount || Number(division.talukas) || 0;
              const finalVillages = arrayVillagesCount || Number(division.villages) || 0;

              return (
                <DivisionCard
                  key={division._id || division.id}
                  division={{
                    ...division,
                    short: division.short || division.name?.slice(0, 2).toUpperCase(),
                    districts: finalDistricts,
                    talukas: finalTalukas,
                    villages: finalVillages,
                    slug: currentSlug
                  }}
                />
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}