"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import EntityForm from "@/components/forms/EntityForm";
import { geoService } from "@/services/geoService";

export default function CreateVillagePage() {
  const { division, district, taluka } = useParams();

  const handleCreateVillage = async (formData) => {
    // 1. Generate unique URL slug parameter from the Village Name input field
    const generatedSlug = formData.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    // 2. Build the payload matching the fields expected by your villageSchema
    const payload = {
      ...formData,
      slug: generatedSlug,
      division: division,
      district: district,
      taluka: taluka,
      talukaSlug: taluka, // Supports both string formats used in your indexes
      state: "Maharashtra" // Hardcoded application baseline setting
    };

    await geoService.createVillage?.(payload);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href={`/admin/divisions/${division}/${district}/${taluka}/villages`} className="rounded-lg border p-2">
          <ArrowLeft size={18} />
        </Link>

        <div>
          <h1 className="text-2xl font-bold">Create Village</h1>
          <p className="text-slate-500">Register a rural demographic village record profile</p>
        </div>
      </div>

      <EntityForm
        title="Village"
        redirectPath={`/admin/divisions/${division}/${district}/${taluka}/villages`} // Redirects to the list view
        onSubmitAction={handleCreateVillage}
        fields={[
          { name: "name", label: "Village Name", required: true },
          { name: "population", label: "Total Population Count", type: "number" },
          { name: "malePopulation", label: "Male Population Segment", type: "number" },
          { name: "femalePopulation", label: "Female Population Segment", type: "number" },
          { name: "hospitals", label: "Hospitals Count", type: "number" },
          { name: "schools", label: "Schools Count", type: "number" },
          { name: "colleges", label: "Colleges Count", type: "number" },
          { name: "latitude", label: "Latitude Coordinate Position", type: "number" },
          { name: "longitude", label: "Longitude Coordinate Position", type: "number" },
          { name: "address", label: "Detailed Census Post Address", type: "textarea" },
        ]}
      />
    </div>
  );
}