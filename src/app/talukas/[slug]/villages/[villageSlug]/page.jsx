import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import Breadcrumb from "@/components/navigation/Breadcrumb";
import VillageMapWrapper from "@/components/maps/VillageMapWrapper";

import { villages } from "@/data/villages";
import { cities } from "@/data/cities"; // For finding nearby regional hubs
import { hospitalsByVillage } from "@/data/hospitals";
import { schoolsByVillage } from "@/data/schools";
import { collegesByVillage } from "@/data/colleges";

import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Users, HeartPulse, School, GraduationCap, Calendar, Info, Building2 } from "lucide-react";

export default async function VillageDetailPage({ params }) {
  const { slug, villageSlug } = await params;

  const village = villages.find((v) => v.slug === villageSlug);
  if (!village) {
    notFound();
  }

  // Find nearby cities within the same district zone perimeter
  const nearbyCities = cities
    .filter((c) => c.district.toLowerCase() === village.district.toLowerCase())
    .slice(0, 3);

  const hospitals = hospitalsByVillage[village.slug] || [];
  const schools = schoolsByVillage[village.slug] || [];
  const colleges = collegesByVillage[village.slug] || [];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50/50">
        <section className="pt-8">
          <Container>
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Talukas", href: "/talukas" },
                { label: village.taluka, href: `/talukas/${slug}` },
                { label: "Villages", href: `/talukas/${slug}/villages` },
                { label: village.name },
              ]}
            />
          </Container>
        </section>

        {/* Hero Section */}
        <section className="py-16">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-700 shadow-sm">
                  {village.type}
                </span>
                <h1 className="mt-6 text-5xl font-bold lg:text-7xl tracking-tight text-slate-900">
                  {village.name}
                </h1>
                <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                  {village.address}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm border border-emerald-100">
                    Population: {village.population?.toLocaleString()}
                  </span>
                  <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm border border-blue-100">
                    Hospitals: {village.hospitals}
                  </span>
                  <span className="rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700 shadow-sm border border-purple-100">
                    Schools: {village.schools}
                  </span>
                </div>
              </div>

              <AtAGlanceCard village={village} />
            </div>
          </Container>
        </section>

        {/* Demographics Metrics */}
        <section className="pb-16">
          <Container>
            <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="text-emerald-500 w-6 h-6" /> Population Information
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <StatCard label="Total Population" value={village.population?.toLocaleString()} />
              <StatCard label="Male Population" value={village.malePopulation?.toLocaleString()} />
              <StatCard label="Female Population" value={village.femalePopulation?.toLocaleString()} />
            </div>
          </Container>
        </section>

        {/* System Summary Grid */}
        <section className="pb-16">
          <Container>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
              <StatCard label="Total Hospitals" value={hospitals.length || village.hospitals || 0} icon={<HeartPulse className="text-blue-500 w-4 h-4" />} />
              <StatCard label="Total Schools" value={schools.length || village.schools || 0} icon={<School className="text-purple-500 w-4 h-4" />} />
              <StatCard label="Total Colleges" value={colleges.length || village.colleges || 0} icon={<GraduationCap className="text-indigo-500 w-4 h-4" />} />
              <StatCard label="Data Last Updated" value={village.lastUpdated} icon={<Calendar className="text-amber-500 w-4 h-4" />} />
            </div>
          </Container>
        </section>

        {/* Local Infrastructure Directories */}
        <section className="pb-16">
          <Container>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Local Infrastructure & Directories</h2>
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <HeartPulse className="text-blue-500" /> Hospitals ({hospitals.length})
                </h3>
                {hospitals.length > 0 ? (
                  <ul className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                    {hospitals.map((h, idx) => (
                      <li key={idx} className="p-3 bg-slate-50 rounded-xl hover:bg-blue-50/50 transition-colors">
                        <p className="font-semibold text-slate-800 text-sm">{h.name}</p>
                        <p className="text-xs text-slate-500 mt-1">{h.type}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-400 text-sm italic py-4">No specific local hospital records found.</p>
                )}
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <School className="text-purple-500" /> Schools ({schools.length})
                </h3>
                {schools.length > 0 ? (
                  <ul className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                    {schools.map((s, idx) => (
                      <li key={idx} className="p-3 bg-slate-50 rounded-xl hover:bg-purple-50/50 transition-colors">
                        <p className="font-semibold text-slate-800 text-sm">{s.name}</p>
                        <p className="text-xs text-slate-500 mt-1">{s.board}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-400 text-sm italic py-4">No specific local school records found.</p>
                )}
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <GraduationCap className="text-indigo-500" /> Colleges ({colleges.length})
                </h3>
                {colleges.length > 0 ? (
                  <ul className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                    {colleges.map((c, idx) => (
                      <li key={idx} className="p-3 bg-slate-50 rounded-xl hover:bg-indigo-50/50 transition-colors">
                        <p className="font-semibold text-slate-800 text-sm">{c.name}</p>
                        <p className="text-xs text-slate-500 mt-1">{c.stream}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-400 text-sm italic py-4">No specific local college records found.</p>
                )}
              </div>
            </div>
          </Container>
        </section>

        {/* Administrative Breakdown */}
        <section className="pb-16">
          <Container>
            <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-2 mb-6">
              <Info className="text-slate-400 w-6 h-6" /> Administrative Details
            </h2>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full text-left border-collapse">
                <tbody>
                  <TableRow label="State" value={village.state} />
                  <TableRow label="Administrative Division" value={village.division} />
                  <TableRow label="District Headquarters" value={village.district} />
                  <TableRow label="Taluka / Block" value={village.taluka} />
                  <TableRow label="Settlement Classification" value={village.type} />
                </tbody>
              </table>
            </div>
          </Container>
        </section>

        {/* Geographic Leaflet Map Layer Component */}
        <section className="pb-16">
          <Container>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Geographic Map</h2>
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 min-h-[450px] shadow-sm">
              <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-40">
                <div className="text-center">
                  <MapPin size={40} className="mx-auto text-emerald-500 animate-pulse" />
                  <p className="mt-4 text-sm font-medium text-slate-500">Loading Map Layer Component...</p>
                </div>
              </div>
              <div className="relative z-10 w-full h-[450px]">
                <VillageMapWrapper
                    lat={village.latitude}
                    lng={village.longitude}
                    divisionSlug={village.district.toLowerCase()}
                    placeName={village.name}
                    mode="single"
                  />
              </div>
            </div>
          </Container>
        </section>

        {/* Nearby Cities Dynamic Listing Layout */}
        <section className="pb-24">
          <Container>
            <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-2 mb-2">
              <Building2 className="text-emerald-500 w-6 h-6" /> Nearby Cities
            </h2>
            <p className="text-slate-500 mb-8 font-medium text-sm">Major regional urban hubs near {village.name}:</p>
            <div className="grid gap-6 md:grid-cols-3">
              {nearbyCities.map((city) => (
                <Link href={`/cities/${city.slug}`} key={city.slug} className="block group">
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-emerald-300 group-hover:shadow-xl h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors tracking-tight">
                        {city.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">{city.type}</p>
                    </div>
                    <div className="mt-6 text-sm font-semibold text-emerald-600 flex items-center gap-1">
                      Explore City &rarr;
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}

function AtAGlanceCard({ village }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col justify-between">
      <h2 className="text-2xl font-bold text-slate-900 tracking-tight">At A Glance</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-slate-500 text-sm font-medium">Taluka</span>
          <span className="font-semibold text-slate-800 text-sm">{village.taluka}</span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-slate-500 text-sm font-medium">District</span>
          <span className="font-semibold text-slate-800 text-sm">{village.district}</span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-slate-500 text-sm font-medium">Division</span>
          <span className="font-semibold text-slate-800 text-sm">{village.division}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500 text-sm font-medium">Settlement Population</span>
          <span className="font-semibold text-slate-800 text-sm">{village.population?.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-center gap-2">
        {icon}
        <h3 className="text-2xl font-bold text-emerald-600 tracking-tight">{value}</h3>
      </div>
      <p className="mt-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
    </div>
  );
}

function TableRow({ label, value }) {
  return (
    <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70 transition-colors">
      <td className="p-4 font-semibold text-sm text-slate-700 w-1/3 bg-slate-50/40">{label}</td>
      <td className="p-4 text-sm text-slate-600 font-medium">{value}</td>
    </tr>
  );
}