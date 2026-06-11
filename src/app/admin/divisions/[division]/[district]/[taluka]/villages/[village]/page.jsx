"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import AdminDetailsPage from "@/components/admin/AdminDetailsPage";
import { geoService } from "@/services/geoService";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function VillageDetailsPage() {
  const { division, district, taluka, village } = useParams(); // 'village' holds the dynamic slug (e.g., temp-village)
  const [villageData, setVillageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVillageDetails() {
      try {
        // Calling your backend to fetch the specific village record by its slug identifier
        const response = await geoService.getVillageBySlug?.(village) || await geoService.getVillageDetails?.(village);
        setVillageData(response?.data || response);
      } catch (err) {
        toast.error("Failed to load village demographic profile records");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (village) fetchVillageDetails();
  }, [village]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center gap-2 text-slate-500">
        <Loader2 className="animate-spin text-emerald-600" size={24} />
        <span>Syncing Village Infrastructure Profiles...</span>
      </div>
    );
  }

  if (!villageData) return notFound();

  // Clean data structure pass-through to ensure Mongo metrics look great on the dynamic key-value table
  const presentationData = {
    name: villageData.name,
    slug: villageData.slug,
    taluka: villageData.taluka,
    district: villageData.district,
    division: villageData.division,
    address: villageData.address || "Not Specified",
  };

  return (
    <AdminDetailsPage
      title={villageData.name}
      subtitle={`Detailed census and infrastructure metrics for village segment.`}
      data={presentationData}
      basePath={`/admin/divisions/${division}/${district}/${taluka}`} // Return link configuration back to the Taluka matrix
      stats={[
        {
          title: "Total Population",
          value: villageData.population || 0,
        },
        {
          title: "Male Population",
          value: villageData.malePopulation || 0,
        },
        {
          title: "Female Population",
          value: villageData.femalePopulation || 0,
        },
        {
          title: "Schools Built",
          value: villageData.schools || 0,
        },
      ]}
    />
  );
}