"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import Breadcrumb from "@/components/navigation/Breadcrumb";
import VillageMapWrapper from "@/components/maps/VillageMapWrapper";
import DistrictAnalytics from "@/components/analytics/DistrictAnalytics";
import { useLivePlatformData } from "@/hooks/useLivePlatformData";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { MapPinned, Users, Building2, Landmark, Map as MapIcon, Loader2 } from "lucide-react";

const districtCoordinates = {
  pune:       { lat: 18.5204, lng: 73.8567 },
  satara:     { lat: 17.6805, lng: 74.0183 },
  sangli:     { lat: 16.8524, lng: 74.5815 },
  solapur:    { lat: 17.6868, lng: 75.9067 },
  kolhapur:   { lat: 16.7050, lng: 74.2433 },
  nashik:     { lat: 19.9975, lng: 73.7898 },
  dhule:      { lat: 20.9042, lng: 74.7749 },
  jalgaon:    { lat: 21.0077, lng: 75.5626 },
  nandurbar:  { lat: 21.3653, lng: 74.2442 },
  ahmednagar: { lat: 19.0952, lng: 74.7480 },
  nagpur:     { lat: 21.1458, lng: 79.0882 },
  wardha:     { lat: 20.7453, lng: 78.6022 },
  bhandara:   { lat: 21.1667, lng: 79.6500 },
  gondia:     { lat: 21.4624, lng: 80.1948 },
  chandrapur: { lat: 19.9615, lng: 79.2961 },
  gadchiroli: { lat: 20.1809, lng: 80.0000 },
  amravati:   { lat: 20.9374, lng: 77.7796 },
  buldhana:   { lat: 20.5292, px: 76.1842 },
  akola:      { lat: 20.7002, lng: 77.0082 },
  washim:     { lat: 20.1119, lng: 77.1333 },
  yavatmal:   { lat: 20.3888, lng: 78.1204 },
  aurangabad: { lat: 19.8762, lng: 75.3433 },
  jalna:      { lat: 19.8347, lng: 75.8816 },
  parbhani:   { lat: 19.2704, lng: 76.7742 },
  hingoli:    { lat: 19.7173, lng: 77.1493 },
  nanded:     { lat: 19.1383, lng: 77.3210 },
  beed:       { lat: 18.9890, lng: 75.7601 },
  latur:      { lat: 18.4088, lng: 76.5604 },
  osmanabad:  { lat: 18.1860, lng: 76.0390 },
  thane:      { lat: 19.2183, lng: 72.9781 },
  palghar:    { lat: 19.6967, lng: 72.7650 },
  raigad:     { lat: 18.5158, lng: 73.1810 },
  ratnagiri:  { lat: 16.9944, lng: 73.3000 },
  sindhudurg: { lat: 16.3490, lng: 73.8553 },
};

export default function DistrictPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;

  const { districts, talukas, villages, loading } = useLivePlatformData();

  // Find targeted district node in the synchronized collection
  const district = districts.find((d) => d.slug === slug || d.name?.toLowerCase() === slug);

  // Compute sub-hierarchies from actual global database data layers
  const filteredTalukas = talukas.filter((t) => t.districtSlug === slug || t.district?.toLowerCase() === slug);
  const filteredVillages = villages.filter((v) => v.districtSlug === slug || v.district?.toLowerCase() === slug);
  const totalPopulation = filteredVillages.reduce((sum, v) => sum + (Number(v.population) || 0), 0);

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-2 bg-white text-slate-400">
        <Loader2 className="animate-spin text-emerald-600" size={28} />
        <span className="text-sm font-semibold">Syncing District Workspace Parameters...</span>
      </div>
    );
  }

  if (!district) {
    router.push("/divisions");
    return null;
  }

  const coords = districtCoordinates[slug] || { lat: 19.7515, lng: 75.7139 };

  return (
    <>
      <Navbar />
      <main className="bg-slate-50/40 pb-16">
        <section className="pt-8">
          <Container>
            <Breadcrumb items={[
              { label: "Home", href: "/" },
              { label: "Divisions", href: "/divisions" },
              { label: district.name },
            ]} />
          </Container>
        </section>

        <section className="py-16">
          <Container>
            <h1 className="text-5xl font-black tracking-tight text-slate-900 lg:text-6xl">{district.name}</h1>
            <p className="mt-4 max-w-3xl text-base font-medium text-slate-500 leading-relaxed">
              {district.name} district is administered from its headquarters at <span className="text-slate-800 font-bold">{district.headquarters || "Regional Center"}</span>, 
              coordinating operations across live administrative registries.
            </p>
          </Container>
        </section>

        {/* Dynamic Metric Cards Component Grid */}
        <section className="pb-16">
          <Container>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
              <InfoCard icon={<MapPinned size={18} />} value={district.headquarters || "Center"} label="Headquarters" />
              <InfoCard icon={<Landmark size={18} />} value={filteredTalukas.length || district.talukas || 0} label="Talukas Mapped" />
              <InfoCard icon={<Building2 size={18} />} value={filteredVillages.length.toLocaleString("en-IN")} label="Villages Tracked" />
              <InfoCard icon={<Users size={18} />} value={totalPopulation > 0 ? totalPopulation.toLocaleString("en-IN") : "Calculating..."} label="Total Population Data" />
            </div>
          </Container>
        </section>

        {/* Geographic Boundary Canvas */}
        <section className="pb-16">
          <Container>
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-black text-slate-900 tracking-tight">
              <MapIcon className="h-5 w-5 text-emerald-500" />
              Geographic Boundary Vector
            </h2>
            <div className="h-[460px] overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-sm">
              <VillageMapWrapper
                lat={coords.lat}
                lng={coords.lng}
                divisionSlug={slug}
                placeName={`${district.name} — ${district.headquarters}`}
                mode="single"
              />
            </div>
          </Container>
        </section>

        {/* Dynamic Charts Integration Canvas */}
        <section className="pb-16">
          <Container><DistrictAnalytics /></Container>
        </section>

        {/* Live Child Talukas Grid */}
        <section className="pb-12">
          <Container>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Taluka Hubs</h2>
            {filteredTalukas.length > 0 ? (
              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredTalukas.map((t) => {
                  const subVillages = villages.filter(v => v.talukaSlug === t.slug || v.taluka?.toLowerCase() === t.name?.toLowerCase());
                  return (
                    <TalukaCard 
                      key={t._id || t.slug} 
                      taluka={{
                        ...t,
                        villages: subVillages.length || t.villages || 0
                      }} 
                    />
                  );
                })}
              </div>
            ) : (
              <div className="mt-6 rounded-3xl border border-dashed border-slate-200 p-12 text-center text-sm font-semibold text-slate-400 bg-white">
                No active sub-taluka entries mapped to this district footprint.
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
      <div className="text-emerald-500 w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-2xl font-black text-slate-800 tracking-tight">{value}</h3>
      <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400">{label}</p>
    </div>
  );
}

function TalukaCard({ taluka }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-300 hover:shadow-lg flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-slate-800 tracking-tight text-lg">{taluka.name}</h3>
        <p className="mt-1 text-xs font-semibold text-slate-400 uppercase tracking-wide">{taluka.villages} Registered Villages</p>
      </div>
      <Link href={`/divisions`} className="mt-4 text-xs font-bold uppercase tracking-wider text-emerald-600 hover:text-emerald-700 transition-colors">
        Explore Grid Node →
      </Link>
    </div>
  );
}