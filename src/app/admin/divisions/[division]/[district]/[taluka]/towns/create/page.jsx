"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import EntityForm from "@/components/forms/EntityForm";
import { geoService } from "@/services/geoService";

export default function CreateTownPage() {
  const { division, district, taluka } = useParams();

  const handleCreateTown = async (formData) => {
    const generatedSlug = formData.name.toLowerCase().trim().replace(/\s+/g, "-");

    const payload = {
      ...formData,
      slug: generatedSlug,
      division: division,
      district: district,
      taluka: taluka,
      talukaSlug: taluka,
      state: "Maharashtra",
      population: Number(formData.population) || 0,
      malePopulation: Number(formData.malePopulation) || 0,
      femalePopulation: Number(formData.femalePopulation) || 0,
      hospitals: Number(formData.hospitals) || 0,
      schools: Number(formData.schools) || 0,
      colleges: Number(formData.colleges) || 0,
      latitude: Number(formData.latitude) || 0,
      longitude: Number(formData.longitude) || 0,
      lastUpdated: new Date()
    };

    await geoService.createTown(payload);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href={`/admin/divisions/${division}/${district}/${taluka}`} className="rounded-lg border p-2">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Add Town Record</h1>
          <p className="text-slate-500">Insert semi-urban census data parameters</p>
        </div>
      </div>

      <EntityForm
        title="Town"
        redirectPath={`/admin/divisions/${division}/${district}/${taluka}`}
        onSubmitAction={handleCreateTown}
        fields={[
          { name: "name", label: "Town Name", required: true },
          { name: "type", label: "Town Type Class", required: false },
          { name: "population", label: "Total Population Count", type: "number", required: true },
          { name: "malePopulation", label: "Male Population Segment", type: "number" },
          { name: "femalePopulation", label: "Female Population Segment", type: "number" },
          { name: "hospitals", label: "Hospitals Count", type: "number" },
          { name: "schools", label: "Schools Count", type: "number" },
          { name: "colleges", label: "Colleges Count", type: "number" },
          { name: "latitude", label: "Latitude Center Point", type: "number" },
          { name: "longitude", label: "Longitude Center Point", type: "number" },
          { name: "address", label: "Structural Address Profile", type: "textarea" },
        ]}
      />
    </div>
  );
}