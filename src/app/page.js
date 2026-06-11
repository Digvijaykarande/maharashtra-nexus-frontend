import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/home/Hero";
import StatisticsSection from "@/components/home/StatisticsSection";
import DivisionSection from "@/components/home/DivisionSection";
import ShowcaseSection from "@/components/home/ShowcaseSection";
import MapPreviewSection from "@/components/home/MapPreviewSection";  
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatisticsSection />
        <DivisionSection />
        <ShowcaseSection />
        <MapPreviewSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}