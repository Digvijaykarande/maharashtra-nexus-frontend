"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import AdminDetailsPage from "@/components/admin/AdminDetailsPage";
import { geoService } from "@/services/geoService";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function CityDetailsPage() {
  const { division, district, taluka, citySlug } = useParams();
  const [cityData, setCityData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCityDetails() {
      try {
        const response = await geoService.getCityBySlug(citySlug);
        setCityData(response?.data || response);
      } catch (err) {
        toast.error("Failed to load city administrative metrics");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (citySlug) fetchCityDetails();
  }, [citySlug]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center gap-2 text-slate-500">
        <Loader2 className="animate-spin text-emerald-600" size={24} />
        <span>Syncing Urban Civic Infrastructure Profiles...</span>
      </div>
    );
  }

  if (!cityData) return notFound();

  const presentationData = {
    name: cityData.name,
    slug: cityData.slug,
    type: cityData.type || "Municipal Corporation",
    taluka: cityData.taluka,
    district: cityData.district,
    division: cityData.division,
    address: cityData.address || "Urban Civic Sector",
  };

  return (
    <AdminDetailsPage
      title={cityData.name}
      subtitle="Detailed municipal and demographic analytics profile."
      data={presentationData}
      basePath={`/admin/divisions/${division}/${district}/${taluka}`} // Back to Taluka hub
      stats={[
        { title: "Total Population", value: cityData.population || 0 },
        { title: "Hospitals Count", value: cityData.hospitals || 0 },
        { title: "Schools Built", value: cityData.schools || 0 },
        { title: "Colleges Active", value: cityData.colleges || 0 },
      ]}
    />
  );
}