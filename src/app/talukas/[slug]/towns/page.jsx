import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import Breadcrumb from "@/components/navigation/Breadcrumb";

import { talukas } from "@/data/talukas";
import { towns } from "@/data/towns"; // Create and import a shared towns array similar to cities

import { notFound } from "next/navigation";
import Link from "next/link";
import { Landmark, Users, ArrowRight } from "lucide-react";

export default async function TalukaTownsPage({ params }) {
  const { slug } = await params;

  // Verify parent Taluka scope context
  const taluka = talukas.find((t) => t.slug === slug);
  if (!taluka) {
    notFound();
  }

  // Filter towns belonging exclusively to this taluka
  const filteredTowns = towns.filter(
    (town) => town.talukaSlug === slug || town.taluka?.toLowerCase() === slug.toLowerCase()
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50/50">
        {/* Navigation Breadcrumbs */}
        <section className="pt-8">
          <Container>
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Talukas", href: "/talukas" },
                { label: taluka.name, href: `/talukas/${slug}` },
                { label: "Towns" },
              ]}
            />
          </Container>
        </section>

        {/* Header Hero Section */}
        <section className="py-16">
          <Container>
            <span className="rounded-full bg-emerald-50 border border-emerald-100 px-4 py-1 text-sm font-medium text-emerald-700 shadow-sm">
              Semi-Urban Settlements
            </span>
            <h1 className="mt-4 text-5xl font-bold tracking-tight text-slate-900">
              Towns in {taluka.name}
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl leading-relaxed">
              Explore secondary administrative urban centers, local populations, and public service utilities located across the {taluka.name} territory.
            </p>
          </Container>
        </section>

        {/* Directory Card Grid Layout */}
        <section className="pb-24">
          <Container>
            {filteredTowns.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredTowns.map((town) => (
                  <TownCard key={town.slug} town={town} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 max-w-md mx-auto shadow-sm">
                <Landmark className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">No mapped sub-town data models found in {taluka.name} Taluka.</p>
              </div>
            )}
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}

function TownCard({ town }) {
  return (
    <Link href={`/towns/${town.slug}`} className="block group">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-emerald-300 group-hover:shadow-xl h-full flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors tracking-tight">
            {town.name}
          </h3>
          <p className="mt-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {town.type || "Municipal Council / Census Town"}
          </p>

          <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-slate-400" /> Population</span>
              <span className="font-semibold text-slate-800">{town.population?.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>District</span>
              <span className="font-medium text-slate-700">{town.district}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 font-semibold text-sm text-emerald-600">
          Explore Infrastructure
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}