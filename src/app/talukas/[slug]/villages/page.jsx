import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import Breadcrumb from "@/components/navigation/Breadcrumb";

import { talukas } from "@/data/talukas";
import { villagesByTaluka } from "@/data/villages";

import { notFound } from "next/navigation";
import Link from "next/link";
import { Users, HeartPulse, School, GraduationCap, ArrowRight } from "lucide-react";

export default async function VillagesPage({ params }) {
  const { slug } = await params;

  const taluka = talukas.find((t) => t.slug === slug);
  if (!taluka) {
    notFound();
  }

  const villages = villagesByTaluka[slug] || [];

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
                { label: taluka.name, href: `/talukas/${slug}` },
                { label: "Villages" },
              ]}
            />
          </Container>
        </section>

        <section className="py-16">
          <Container>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-700 shadow-sm">
              Rural Directory
            </span>
            <h1 className="mt-4 text-5xl font-bold tracking-tight text-slate-900">
              Villages of {taluka.name}
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl leading-relaxed">
              Explore structural indicators, population metrics, and administrative frameworks across the {villages.length} registered settlements in {taluka.name}.
            </p>
          </Container>
        </section>

        <section className="pb-24">
          <Container>
            {villages.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {villages.map((village) => (
                  <VillageCard key={village.slug} village={village} talukaSlug={slug} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 max-w-md mx-auto shadow-sm">
                <p className="text-slate-400 italic">No village directory records mapped to this region.</p>
              </div>
            )}
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}

function VillageCard({ village, talukaSlug }) {
  return (
    <Link href={`/talukas/${talukaSlug}/villages/${village.slug}`} className="block group">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-emerald-300 group-hover:shadow-xl h-full flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors tracking-tight">
            {village.name}
          </h3>
          <span className="inline-block mt-1 text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-50 border border-slate-100 rounded-full px-2.5 py-0.5">
            {village.type}
          </span>

          <div className="mt-6 space-y-3">
            <StatRow icon={<Users size={16} className="text-slate-400" />} label="Population" value={village.population?.toLocaleString()} />
            <StatRow icon={<HeartPulse size={16} className="text-blue-500" />} label="Hospitals" value={village.hospitals} />
            <StatRow icon={<School size={16} className="text-purple-500" />} label="Schools" value={village.schools} />
            <StatRow icon={<GraduationCap size={16} className="text-indigo-500" />} label="Colleges" value={village.colleges} />
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-50 flex items-center gap-2 font-semibold text-sm text-emerald-600">
          Explore Infrastructure
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

function StatRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2 text-slate-500 font-medium">
        {icon} {label}
      </div>
      <span className="font-semibold text-slate-800">{value}</span>
    </div>
  );
}