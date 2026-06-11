"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import AdminDetailsPage from "@/components/admin/AdminDetailsPage";
import { geoService } from "@/services/geoService";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function TownDetailsPage() {
  // CRITICAL: Must be destructured as 'townSlug' to match your folder name '[townSlug]'
  const { division, district, taluka, townSlug } = useParams(); 
  const [townData, setTownData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTownDetails() {
      try {
        // Fetch the record by passing the clean slug string parameter
        const response = await geoService.getTownBySlug(townSlug);
        setTownData(response?.data || response);
      } catch (err) {
        toast.error("Failed to load town demographic metrics");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (townSlug) fetchTownDetails();
  }, [townSlug]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center gap-2 text-slate-500">
        <Loader2 className="animate-spin text-emerald-600" size={24} />
        <span>Syncing Semi-Urban Town Profiles...</span>
      </div>
    );
  }

  if (!townData) return notFound();

  const presentationData = {
    name: townData.name,
    slug: townData.slug,
    type: townData.type || "Town Council",
    taluka: townData.taluka,
    district: townData.district,
    division: townData.division,
    address: townData.address || "Semi-Urban Sector Block",
  };

  return (
    <AdminDetailsPage
      title={townData.name}
      subtitle="Detailed census and semi-urban locality parameters profile."
      data={presentationData}
      basePath={`/admin/divisions/${division}/${district}/${taluka}`} // Clean navigation back to Taluka hub
      stats={[
        { title: "Total Population", value: townData.population || 0 },
        { title: "Hospitals Count", value: townData.hospitals || 0 },
        { title: "Schools Built", value: townData.schools || 0 },
        { title: "Colleges Active", value: townData.colleges || 0 },
      ]}
    />
  );
}