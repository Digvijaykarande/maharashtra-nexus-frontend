"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import HierarchyPage from "@/components/admin/HierarchyPage";
import { geoService } from "@/services/geoService";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

// Static mapping fallback for coordinates if not returned by your backend yet
const coordinateFallback = {
  pune: { lat: 18.5204, lng: 73.8567 },
  mumbai: { lat: 19.0760, lng: 72.8777 },
};

export default function DivisionPage() {
  const { division } = useParams(); // e.g., 'pune' or 'mumbai'
  const [divisionData, setDivisionData] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDivisionAndDistricts() {
      try {
        // Run lookups in parallel for maximum performance efficiency
        const [divResponse, districtsResponse] = await Promise.all([
          geoService.getDivisionBySlug(division),
          geoService.getDistrictsByDivision(division)
        ]);

        setDivisionData(divResponse.data || divResponse);
        setDistricts(districtsResponse.data || districtsResponse);
      } catch (err) {
        toast.error("Error connecting to geographical data matrix");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (division) fetchDivisionAndDistricts();
  }, [division]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center gap-2 text-slate-500">
        <Loader2 className="animate-spin text-emerald-600" size={24} />
        <span>Loading Regional Infrastructure Matrix...</span>
      </div>
    );
  }

  if (!divisionData) return notFound();

  // Pick coords from API parameters or use the fallback structure
  const lat = divisionData.latitude || coordinateFallback[division]?.lat || 19.7515;
  const lng = divisionData.longitude || coordinateFallback[division]?.lng || 75.7139;

  return (
    <HierarchyPage
      title={divisionData.name}
      description={divisionData.description || `Administrative statistics overview for ${divisionData.name}.`}
      stats={[
        { label: "Districts", value: districts.length },
        { label: "Talukas", value: divisionData.talukas || 0 },
        { label: "Villages", value: divisionData.villages || 0 },
      ]}
      createTitle="Create District"
      createHref={`/admin/divisions/${division}/create-district`} 
      
      entities={districts} // Dynamically fed from backend API response array
      entityViewBasePath={`/admin/divisions/${division}`}
      showActions={true}
      editHref={`/admin/divisions/edit/${division}`}
      deleteId={division}
      deleteType="division"
      
      mapProps={{
        lat: Number(lat),
        lng: Number(lng),
        slug: division,
        placeName: divisionData.name,
        mode: "division",
      }}
    />
  );
}