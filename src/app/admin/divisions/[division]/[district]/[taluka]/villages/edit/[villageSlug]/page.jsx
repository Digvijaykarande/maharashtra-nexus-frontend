"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import EditEntityForm from "@/components/forms/EditEntityForm";
import { geoService } from "@/services/geoService";

export default function EditVillagePage() {
  const router = useRouter();
  const { division, district, taluka, villageSlug } = useParams();
  const [villageData, setVillageData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load the existing record parameters from MongoDB on mount
  useEffect(() => {
    async function fetchVillageDetails() {
      try {
        const response = await geoService.getVillageBySlug(villageSlug);
        setVillageData(response?.data || response);
      } catch (err) {
        toast.error("Failed to recover requested village record properties");
        router.push(`/admin/divisions/${division}/${district}/${taluka}`);
      } finally {
        setLoading(false);
      }
    }
    if (villageSlug) fetchVillageDetails();
  }, [villageSlug, division, district, taluka, router]);

  // Handle saving the modified data parameters back to Node.js
  const handleUpdateVillage = async (formData) => {
    await geoService.updateVillage(villageSlug, formData);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center gap-2 text-slate-500">
        <Loader2 className="animate-spin text-emerald-600" size={24} />
        <span>Fetching Localized Demographic Matrices...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Container */}
      <div className="flex items-center gap-3">
        <Link 
          href={`/admin/divisions/${division}/${district}/${taluka}`} 
          className="rounded-lg border p-2"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Modify Village Parameters</h1>
          <p className="text-slate-500">Update administrative metrics and census data boundaries</p>
        </div>
      </div>

      {/* Main Form Sub-Component Integration */}
      <EditEntityForm
        title="Village"
        redirectPath={`/admin/divisions/${division}/${district}/${taluka}`}
        initialData={villageData}
        onSubmitAction={handleUpdateVillage}
        fields={[
          { name: "name", label: "Village Name", required: true },
          { name: "population", label: "Total Population Count", type: "number" },
          { name: "malePopulation", label: "Male Population Segment", type: "number" },
          { name: "femalePopulation", label: "Female Population Segment", type: "number" },
          { name: "hospitals", label: "Hospitals Count", type: "number" },
          { name: "schools", label: "Schools Count", type: "number" },
          { name: "colleges", label: "Colleges Count", type: "number" },
          { name: "latitude", label: "Latitude Center Point Coordinate", type: "number" },
          { name: "longitude", label: "Longitude Center Point Coordinate", type: "number" },
          { name: "address", label: "Detailed Census Post Address", type: "textarea" },
        ]}
      />
    </div>
  );
}