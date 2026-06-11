import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import VillageMapWrapper from "@/components/maps/VillageMapWrapper";
import { divisions } from "@/data/divisions";
import { districtsByDivision } from "@/data/districts";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Building2,
  MapPinned,
  Landmark,
  ArrowRight,
  Map as MapIcon,
} from "lucide-react";

// Fallback coordinate map for Maharashtra administrative division headquarters
const divisionCoordinates = {
  pune: { lat: 18.5204, lng: 73.8567 },
  nagpur: { lat: 21.1458, lng: 79.0882 },
  nashik: { lat: 19.9975, lng: 73.7898 },
  konkan: { lat: 18.9440, lng: 72.8258 }, // Centered near Mumbai headquarters
  amravati: { lat: 20.9374, lng: 77.7796 },
  sambhajinagar: { lat: 19.8762, lng: 75.3433 },
};

export default async function DivisionDetailPage({ params }) {
  const { slug } = await params;

  const division = divisions.find((d) => d.slug === slug);

  if (!division) {
    notFound();
  }

  const districts = districtsByDivision[slug] || [];
  
  // Resolve latitude and longitude safely based on slug
  const coords = divisionCoordinates[slug] || { lat: 19.7515, lng: 75.7139 }; // Maharashtra default fallback center

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50/50">
        {/* Hero Section */}
        <section className="py-24">
          <Container>
            <div className="max-w-4xl">
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-700 shadow-sm">
                Division Details
              </span>

              <h1 className="mt-6 text-5xl font-bold lg:text-7xl tracking-tight text-slate-900">
                {division.name}
              </h1>

              <p className="mt-6 max-w-2xl text-lg text-slate-600 leading-relaxed">
                {division.description}
              </p>
            </div>
          </Container>
        </section>

        {/* Overview Cards Grid */}
        <section className="pb-16">
          <Container>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
              <InfoCard
                icon={<MapPinned />}
                value={division.headquarters}
                label="Headquarters"
              />
              <InfoCard
                icon={<Landmark />}
                value={division.districts}
                label="Districts"
              />
              <InfoCard
                icon={<Building2 />}
                value={division.talukas}
                label="Talukas"
              />
              <InfoCard
                icon={<MapPinned />}
                value={division.villages?.toLocaleString()}
                label="Villages"
              />
            </div>
          </Container>
        </section>

        {/* Replace your previous Geographic Map Section container block with this updated block: */}
        <section className="pb-16">
          <Container>
            <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-2 mb-6">
              <MapIcon className="text-emerald-500 w-6 h-6" /> Geographic Boundaries Information
            </h2>
            
            <div className="h-[500px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm p-2 relative z-10">
              {/* Passing down the active division slug to parse the precise regional polygon boundaries */}
              <VillageMapWrapper 
                lat={coords.lat} 
                lng={coords.lng} 
                divisionSlug={slug}
                placeName={`${division.name} Headquarters: ${division.headquarters}`} 
              />
              
            </div>
          </Container>
        </section>

        {/* District Preview Section */}
        <section className="pb-24">
          <Container>
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Districts
              </h2>
              <p className="mt-2 text-slate-600">
                Administrative districts within this division.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {districts.map((district) => (
                <DistrictCard
                  key={district.slug}
                  district={district}
                />
              ))}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}

function InfoCard({ icon, value, label }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="text-emerald-500 bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center">
        {icon}
      </div>
      <h3 className="mt-4 text-3xl font-bold text-slate-900 tracking-tight">
        {value}
      </h3>
      <p className="mt-2 text-sm font-medium text-slate-500">
        {label}
      </p>
    </div>
  );
}

function DistrictCard({ district }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-300 hover:shadow-lg flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-lg text-slate-800 tracking-tight">
          {district.name}
        </h3>
        <p className="mt-2 text-sm font-medium text-slate-500">
          Headquarters: {district.headquarters}
        </p>
        <p className="mt-1 text-sm font-medium text-slate-500">
          {district.talukas} Talukas
        </p>
      </div>

      <Link
        href={`/districts/${district.slug}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
      >
        View District
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}