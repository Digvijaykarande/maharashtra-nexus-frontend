import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import Breadcrumb from "@/components/navigation/Breadcrumb";
import VillageMapWrapper from "@/components/maps/VillageMapWrapper";
import { districts } from "@/data/districts";
import { talukasByDistrict } from "@/data/talukas";
import DistrictAnalytics from "@/components/analytics/DistrictAnalytics";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPinned, Users, Building2, Landmark, Map as MapIcon } from "lucide-react";

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
  buldhana:   { lat: 20.5292, lng: 76.1842 },
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

export default async function DistrictPage({ params }) {
  const { slug } = await params;
  const district = districts.find((d) => d.slug === slug);
  if (!district) notFound();

  const talukas = talukasByDistrict[slug] || [];
  const coords = districtCoordinates[slug] || { lat: 19.7515, lng: 75.7139 };

  return (
    <>
      <Navbar />
      <main>

        <section className="pt-8">
          <Container>
            <Breadcrumb items={[
              { label: "Home", href: "/" },
              { label: "Divisions", href: "/divisions" },
              { label: district.name },
            ]} />
          </Container>
        </section>

        <section className="py-24">
          <Container>
            <h1 className="text-5xl font-bold lg:text-7xl">{district.name}</h1>
            <p className="mt-6 max-w-3xl text-lg text-slate-600">
              {district.name} district is administered from {district.headquarters} and
              contains {district.talukas} talukas forming an important part of
              Maharashtra's administrative structure.
            </p>
          </Container>
        </section>

        <section className="pb-20">
          <Container>
            <div className="grid gap-6 md:grid-cols-4">
              <InfoCard icon={<MapPinned />} value={district.headquarters} label="Headquarters" />
              <InfoCard icon={<Landmark />}  value={district.talukas}      label="Talukas"      />
              <InfoCard icon={<Building2 />} value="1000+"                 label="Villages"     />
              <InfoCard icon={<Users />}     value="3M+"                   label="Population"   />
            </div>
          </Container>
        </section>

        {/* ── Map Section ── */}
        <section className="pb-16">
          <Container>
            <h2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-slate-900">
              <MapIcon className="h-6 w-6 text-emerald-500" />
              Geographic Boundaries
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

        <section className="pb-20">
          <Container><DistrictAnalytics /></Container>
        </section>

        <section className="pb-24">
          <Container>
            <h2 className="text-3xl font-bold">Talukas</h2>
            {talukas.length > 0 ? (
              <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {talukas.map((t) => <TalukaCard key={t.slug} taluka={t} />)}
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-dashed border-slate-300 p-10 text-center">
                <p className="text-slate-500">Taluka data will be available soon.</p>
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
    <div className="rounded-3xl border border-slate-200 bg-white p-6">
      <div className="text-emerald-500">{icon}</div>
      <h3 className="mt-4 text-2xl font-bold">{value}</h3>
      <p className="mt-2 text-slate-600">{label}</p>
    </div>
  );
}

function TalukaCard({ taluka }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-300 hover:shadow-lg">
      <h3 className="font-semibold">{taluka.name}</h3>
      <p className="mt-2 text-sm text-slate-500">{taluka.villages} Villages</p>
      <Link href={`/talukas/${taluka.slug}`} className="mt-4 text-sm font-medium text-emerald-600">
        View Taluka →
      </Link>
    </div>
  );
}