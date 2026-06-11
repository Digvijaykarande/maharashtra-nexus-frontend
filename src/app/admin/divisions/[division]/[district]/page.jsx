"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import HierarchyPage from "@/components/admin/HierarchyPage";
import { geoService } from "@/services/geoService";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function DistrictPage() {
  const { division, district } = useParams(); // Pulls context parameters from URL
  const [districtData, setDistrictData] = useState(null);
  const [talukas, setTalukas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDistrictAndTalukas() {
      try {
        // Fetch district data profile and its child talukas in parallel
        const [distResponse, talukasResponse] = await Promise.all([
          geoService.getDistrictBySlug(district),
          geoService.getTalukasByDistrict(district)
        ]);

        setDistrictData(distResponse.data || distResponse);
        setTalukas(talukasResponse.data || talukasResponse);
      } catch (err) {
        toast.error("Error communicating with regional data endpoints");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (district) fetchDistrictAndTalukas();
  }, [district]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center gap-2 text-slate-500">
        <Loader2 className="animate-spin text-emerald-600" size={24} />
        <span>Loading Sub-District Data Clusters...</span>
      </div>
    );
  }

  if (!districtData) return notFound();

  return (
    <HierarchyPage
      title={districtData.name}
      description={districtData.description || `Administrative overview of the talukas in ${districtData.name} district.`}
      stats={[
        { label: "Talukas", value: talukas.length },
        { label: "Villages", value: districtData.villagesCount || 0 },
        { label: "Towns/Cities", value: districtData.townsCount || 0 },
      ]}
      createTitle="Create Taluka"
      createHref={`/admin/divisions/${division}/${district}/create-taluka`} 
      
      entities={talukas} // Live entries injected directly into cards
      entityViewBasePath={`/admin/divisions/${division}/${district}`}
      showActions={true}
      editHref={`/admin/districts/edit/${district}`}
      deleteId={district}
      deleteType="district"
      
      mapProps={{
        lat: Number(districtData.latitude || 19.7515),
        lng: Number(districtData.longitude || 75.7139),
        slug: district,
        placeName: districtData.name,
        mode: "district",
      }}
    />
  );
}