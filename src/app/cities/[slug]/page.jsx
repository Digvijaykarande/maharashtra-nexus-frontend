import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import Breadcrumb from "@/components/navigation/Breadcrumb";
import VillageMapWrapper from "@/components/maps/VillageMapWrapper";

import { cities } from "@/data/cities";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Users, Building2, MapPin, HeartPulse, School, GraduationCap } from "lucide-react";

export default async function CityPage({ params }) {
  // Destructure 'slug' to read directly from app/cities/[slug]
  const { slug } = await params;
  const city = cities.find((c) => c.slug === slug);

  if (!city) {
    notFound();
  }

  const nearbyCities = cities
    .filter((c) => c.slug !== city.slug && c.district === city.district)
    .slice(0, 3);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50/50">
        {/* Breadcrumb Section */}
        <section className="pt-8">
          <Container>
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Cities", href: "/cities" },
                { label: city.name },
              ]}
            />
          </Container>
        </section>

        {/* Hero Section */}
        <section className="py-16">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <span className="rounded-full bg-emerald-50 border border-emerald-100 px-4 py-1 text-sm font-medium text-emerald-700 shadow-sm">
                  {city.type || "Urban Settlement"}
                </span>

                <h1 className="mt-6 text-5xl font-bold lg:text-7xl tracking-tight text-slate-900">
                  {city.name}
                </h1>

                <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                  {city.address || `${city.name}, ${city.taluka} Taluka, ${city.district} District, Maharashtra`}
                </p>
              </div>

              <AtAGlanceCard city={city} />
            </div>
          </Container>
        </section>

        {/* Statistics Metric Cards */}
        <section className="pb-16">
          <Container>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
              <StatCard label="Population" value={city.population?.toLocaleString()} icon={<Users className="w-5 h-5 text-emerald-500" />} />
              <StatCard label="Hospitals" value={city.hospitals || 0} icon={<HeartPulse className="w-5 h-5 text-blue-500" />} />
              <StatCard label="Schools" value={city.schools || 0} icon={<School className="w-5 h-5 text-purple-500" />} />
              <StatCard label="Colleges" value={city.colleges || 0} icon={<GraduationCap className="w-5 h-5 text-indigo-500" />} />
            </div>
          </Container>
        </section>

        {/* Administrative Table Grid */}
        <section className="pb-16">
          <Container>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Administrative Information</h2>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full text-left border-collapse">
                <tbody>
                  <TableRow label="State" value={city.state || "Maharashtra"} />
                  <TableRow label="Division" value={city.division} />
                  <TableRow label="District" value={city.district} />
                  <TableRow label="Taluka" value={city.taluka} />
                  <TableRow label="Type Classification" value={city.type} />
                </tbody>
              </table>
            </div>
          </Container>
        </section>

        {/* Geographic Layer component */}
        <section className="pb-16">
          <Container>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Geographic Information</h2>
            <div className="h-[450px] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm relative">
              <VillageMapWrapper
                                  lat={city.latitude}
                                  lng={city.longitude}
                                  divisionSlug={city.district.toLowerCase()}
                                  placeName={city.name}
                                  mode="single"
                                />
            </div>
          </Container>
        </section>

        {/* Nearby Local Aggregations */}
        <section className="pb-24">
          <Container>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Nearby Cities</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {nearbyCities.map((place) => (
                <NestedCityCard key={place.slug} city={place} />
              ))}
              {nearbyCities.length === 0 && (
                <p className="text-slate-500 italic col-span-3">No other close regional cities mapped in this district.</p>
              )}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}

function AtAGlanceCard({ city }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col justify-between">
      <h2 className="text-2xl font-bold text-slate-900 tracking-tight">At A Glance</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-slate-500 text-sm font-medium">Taluka</span>
          <span className="font-semibold text-slate-800 text-sm">{city.taluka}</span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-slate-500 text-sm font-medium">District</span>
          <span className="font-semibold text-slate-800 text-sm">{city.district}</span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-slate-500 text-sm font-medium">Division</span>
          <span className="font-semibold text-slate-800 text-sm">{city.division}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500 text-sm font-medium">Urban Population</span>
          <span className="font-semibold text-slate-800 text-sm">{city.population?.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-center gap-2 text-slate-700">
        {icon}
        <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
      </div>
      <p className="mt-2 text-center text-sm font-medium text-slate-500">{label}</p>
    </div>
  );
}

function TableRow({ label, value }) {
  return (
    <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
      <td className="p-4 font-semibold text-sm text-slate-700 w-1/3 bg-slate-50/30">{label}</td>
      <td className="p-4 text-sm text-slate-600 font-medium">{value}</td>
    </tr>
  );
}

function NestedCityCard({ city }) {
  return (
    <Link href={`/cities/${city.slug}`} className="block group">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-emerald-300 group-hover:shadow-xl h-full flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors tracking-tight">
            {city.name}
          </h3>
          <p className="text-sm text-slate-500 font-medium mt-1">{city.type}</p>
        </div>
        <p className="mt-6 text-sm font-semibold text-emerald-600 inline-flex items-center gap-1">
          View Details &rarr;
        </p>
      </div>
    </Link>
  );
}