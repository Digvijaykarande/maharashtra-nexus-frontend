"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import VillageMapWrapper from "@/components/maps/VillageMapWrapper";
import { useLivePlatformData } from "@/hooks/useLivePlatformData";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Building2,
  MapPinned,
  Landmark,
  ArrowRight,
  Map as MapIcon,
  Loader2,
  ChevronLeft
} from "lucide-react";

const divisionCoordinates = {
  pune: { lat: 18.5204, lng: 73.8567 },
  nagpur: { lat: 21.1458, lng: 79.0882 },
  nashik: { lat: 19.9975, lng: 73.7898 },
  konkan: { lat: 18.9440, lng: 72.8258 },
  amravati: { lat: 20.9374, lng: 77.7796 },
  sambhajinagar: { lat: 19.8762, lng: 75.3433 },
};

export default function DivisionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;

  const { divisions, districts, talukas, villages, loading } = useLivePlatformData();

  const division = divisions.find((d) => d.slug === slug || d.name?.toLowerCase()?.includes(slug));
  
  // Compute array lengths based on active database mappings
  const filteredDistricts = districts.filter(d => d.divisionSlug === slug || d.division?.toLowerCase() === slug);
  const filteredTalukas = talukas.filter(t => t.divisionSlug === slug || t.division?.toLowerCase() === slug);
  const filteredVillages = villages.filter(v => v.divisionSlug === slug || v.division?.toLowerCase() === slug);

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-3 bg-slate-50/50 text-slate-500">
        <Loader2 className="animate-spin text-emerald-600" size={32} />
        <span className="text-sm font-bold tracking-wide">Syncing Live Division Boundaries...</span>
      </div>
    );
  }

  if (!division) {
    router.push("/divisions");
    return null;
  }

  // Fall back to direct properties on the division object if filtered child arrays are empty
  const finalDistrictsCount = filteredDistricts.length || Number(division.districts) || 0;
  const finalTalukasCount = filteredTalukas.length || Number(division.talukas) || 0;
  const finalVillagesCount = filteredVillages.length || Number(division.villages) || 0;

  const coords = divisionCoordinates[slug] || { lat: 19.7515, lng: 75.7139 };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50/50 pb-16">
        {/* Navigation Breadcrumb */}
        <div className="pt-6">
          <Container>
            <Link href="/divisions" className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-emerald-600 transition-colors">
              <ChevronLeft size={14} /> Back to Regions
            </Link>
          </Container>
        </div>

        {/* Hero Section */}
        <section className="py-12">
          <Container>
            <div className="max-w-4xl">
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-700 shadow-sm">
                Division Details
              </span>
              <h1 className="mt-6 text-5xl font-black lg:text-7xl tracking-tight text-slate-900">
                {division.name}
              </h1>
              <p className="mt-6 max-w-2xl text-base font-medium text-slate-500 leading-relaxed">
                {division.description || "Administrative division profile connected directly to active platform mapping clusters."}
              </p>
            </div>
          </Container>
        </section>

        {/* Overview Cards Grid (Duplicates Removed) */}
        <section className="pb-16">
          <Container>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
              <InfoCard icon={<MapPinned size={18} />} value={division.headquarters || "Regional HQ"} label="Headquarters" />
              <InfoCard icon={<Landmark size={18} />} value={finalDistrictsCount} label="Districts" />
              <InfoCard icon={<Building2 size={18} />} value={finalTalukasCount} label="Talukas" />
              <InfoCard icon={<MapPinned size={18} />} value={finalVillagesCount.toLocaleString("en-IN")} label="Villages" />
            </div>
          </Container>
        </section>

        {/* Map Vector Component Block */}
        <section className="pb-16">
          <Container>
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2 mb-6 tracking-tight">
              <MapIcon className="text-emerald-500 w-5 h-5" /> Geographic Boundaries Information
            </h2>
            <div className="h-[500px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm p-2 relative z-10">
              <VillageMapWrapper 
                lat={coords.lat} 
                lng={coords.lng} 
                divisionSlug={slug}
                placeName={`${division.name} Headquarters: ${division.headquarters || "Regional Base"}`} 
              />
            </div>
          </Container>
        </section>

        {/* Mapped Live Districts Section */}
        <section className="pb-12">
          <Container>
            <div className="border-b pb-4 border-slate-200 mb-6">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Districts Registry</h2>
              <p className="mt-1 text-sm font-medium text-slate-500">Administrative sub-district entries synced from your cloud data layers.</p>
            </div>

            {filteredDistricts.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-200 p-12 text-center text-sm font-semibold text-slate-400 bg-white">
                No active sub-district entries mapped to this division footprint.
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredDistricts.map((district) => {
                  const subTalukas = talukas.filter(t => t.districtSlug === district.slug || t.district?.toLowerCase() === district.name?.toLowerCase());
                  return (
                    <DistrictCard 
                      key={district._id || district.slug} 
                      district={{
                        ...district,
                        talukas: subTalukas.length || district.talukas || 0
                      }} 
                      parentSlug={slug} 
                    />
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

function InfoCard({ icon, value, label }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-emerald-500 bg-emerald-50 w-11 h-11 rounded-2xl flex items-center justify-center border border-emerald-100 mb-4">
        {icon}
      </div>
      <h3 className="text-2xl font-black text-slate-800 tracking-tight">{value}</h3>
      <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400">{label}</p>
    </div>
  );
}

function DistrictCard({ district, parentSlug }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:border-emerald-300 hover:shadow-xl flex flex-col justify-between h-full">
      <div>
        <h3 className="font-bold text-lg text-slate-800 tracking-tight">{district.name}</h3>
        <p className="mt-2 text-xs font-semibold text-slate-400 uppercase tracking-wide">
          Headquarters: <span className="text-slate-600 font-bold">{district.headquarters || "Municipal Capital"}</span>
        </p>
        <p className="mt-1 text-xs font-semibold text-slate-400 uppercase tracking-wide">
          Tally Blocks: <span className="text-slate-600 font-bold">{district.talukas} Talukas</span>
        </p>
      </div>

      <Link
        href={`/districts/${district.slug}`}
        className="mt-6 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-emerald-600 hover:text-emerald-700 transition-colors group"
      >
        View District Profiles 
        <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}