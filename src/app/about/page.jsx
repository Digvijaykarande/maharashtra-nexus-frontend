import Navbar from "@/components/navigation/Navbar";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";

import {
  Target,
  Eye,
  Building2,
  Search,
  MapPinned,
  Database,
  Users,
} from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main>

        {/* Hero */}
        <section className="py-18">
          <Container>
            <div className="mx-auto max-w-4xl text-center">

              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-700">
                About Maharashtra Nexus
              </span>

              <h1 className="mt-6 text-5xl font-bold tracking-tight lg:text-7xl">
                Administrative Intelligence
                Platform for Maharashtra
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600">
                Maharashtra Nexus is a modern platform
                designed to organize, explore and
                visualize Maharashtra's administrative
                hierarchy through structured data and
                intuitive user experiences.
              </p>

            </div>
          </Container>
        </section>

        {/* Mission Vision */}
        <section className="pb-18">
          <Container>
            <div className="grid gap-8 md:grid-cols-2">

              <div className="rounded-3xl border border-slate-200 bg-white p-8">
                <Target className="text-emerald-500" />

                <h2 className="mt-5 text-2xl font-bold">
                  Our Mission
                </h2>

                <p className="mt-4 text-slate-600">
                  To simplify access to Maharashtra's
                  administrative information through a
                  centralized and user-friendly platform.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-8">
                <Eye className="text-emerald-500" />

                <h2 className="mt-5 text-2xl font-bold">
                  Our Vision
                </h2>

                <p className="mt-4 text-slate-600">
                  To become the most comprehensive
                  administrative intelligence platform
                  for Maharashtra's divisions, districts,
                  talukas and villages.
                </p>
              </div>

            </div>
          </Container>
        </section>

        {/* Features */}
        <section className="py-18 bg-slate-50">
          <Container>

            <div className="text-center">
              <h2 className="text-4xl font-bold">
                Platform Features
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-slate-600">
                Everything needed to explore
                Maharashtra's administrative ecosystem.
              </p>
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              <FeatureCard
                icon={<Building2 />}
                title="Administrative Hierarchy"
                description="Explore divisions, districts, talukas and villages."
              />

              <FeatureCard
                icon={<Search />}
                title="Smart Search"
                description="Quickly discover locations and institutions."
              />

              <FeatureCard
                icon={<MapPinned />}
                title="Geographic Insights"
                description="Navigate Maharashtra through structured regions."
              />

              <FeatureCard
                icon={<Database />}
                title="Data Management"
                description="Centralized information architecture."
              />

              <FeatureCard
                icon={<Users />}
                title="Population Insights"
                description="Access demographic and statistical information."
              />

              <FeatureCard
                icon={<Building2 />}
                title="Institution Monitoring"
                description="Schools, hospitals and other institutions."
              />

            </div>

          </Container>
        </section>

        {/* Hierarchy */}
        <section className="py-18">
          <Container>

            <div className="text-center">
              <h2 className="text-4xl font-bold">
                Administrative Structure
              </h2>

              <p className="mt-4 text-slate-600">
                Maharashtra's hierarchy at a glance.
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-4xl">

              <div className="flex flex-col items-center gap-6">

                <HierarchyBox title="Maharashtra" />

                <Arrow />

                <HierarchyBox title="6 Divisions" />

                <Arrow />

                <HierarchyBox title="36 Districts" />

                <Arrow />

                <HierarchyBox title="358 Talukas" />

                <Arrow />

                <HierarchyBox title="43K+ Villages" />

              </div>

            </div>

          </Container>
        </section>

        <CTASection />

      </main>

      <Footer />
    </>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6">
      <div className="text-emerald-500">
        {icon}
      </div>

      <h3 className="mt-4 text-xl font-bold">
        {title}
      </h3>

      <p className="mt-3 text-slate-600">
        {description}
      </p>
    </div>
  );
}

function HierarchyBox({ title }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-8 py-4 shadow-sm">
      <span className="font-semibold">
        {title}
      </span>
    </div>
  );
}

function Arrow() {
  return (
    <div className="h-10 w-[2px] bg-emerald-300" />
  );
}