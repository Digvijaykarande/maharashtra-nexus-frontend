import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";

import AnalyticsStats from "@/components/analytics/AnalyticsStats";
import DivisionComparisonChart from "@/components/analytics/DivisionComparisonChart";
import PopulationDistributionChart from "@/components/analytics/PopulationDistributionChart";
import InsightsPanel from "@/components/analytics/InsightsPanel";

export default function AnalyticsPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section className="py-24">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-700">
                Administrative Intelligence
              </span>

              <h1 className="mt-6 text-5xl font-bold lg:text-7xl">
                Maharashtra Analytics Dashboard
              </h1>

              <p className="mt-6 text-lg text-slate-600">
                Explore administrative, demographic and
                infrastructure insights across Maharashtra.
              </p>
            </div>
          </Container>
        </section>

        <AnalyticsStats />

        <section className="pb-12">
          <Container>
            <DivisionComparisonChart />
          </Container>
        </section>

        <section className="pb-12">
          <Container>
            <div className="grid gap-8 lg:grid-cols-2">
              <PopulationDistributionChart />
              <InsightsPanel />
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}