"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import EntityForm from "@/components/forms/EntityForm";
import { geoService } from "@/services/geoService";

export default function CreateCityPage() {
  const { division, district, taluka } = useParams();

  const handleCreateCity = async (formData) => {
    // 1. Generate clean URL slug parameter
    const generatedSlug = formData.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    // 2. Format numbers explicitly to match Mongoose 'Number' type constraints
    const payload = {
      ...formData,
      slug: generatedSlug,
      division: division,
      district: district,
      taluka: taluka,      // Matches 'Haveli', 'Karad' etc format
      talukaSlug: taluka,  // Matches lowercase path parameter format
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

    await geoService.createCity(payload);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href={`/admin/divisions/${division}/${district}/${taluka}`} className="rounded-lg border p-2">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Add City</h1>
          <p className="text-slate-500">Register a new urban city area and census profile metrics</p>
        </div>
      </div>

      <EntityForm
        title="City"
        redirectPath={`/admin/divisions/${division}/${district}/${taluka}`} 
        onSubmitAction={handleCreateCity}
        // Fields mapped explicitly to match your schema keys
        fields={[
          { name: "name", label: "City Name", required: true },
          { name: "type", label: "Administrative Type (e.g., Municipal Corporation)", required: true },
          { name: "population", label: "Total Population", type: "number", required: true },
          { name: "malePopulation", label: "Male Population Segment", type: "number" },
          { name: "femalePopulation", label: "Female Population Segment", type: "number" },
          { name: "hospitals", label: "Hospitals Count", type: "number" },
          { name: "schools", label: "Schools Count", type: "number" },
          { name: "colleges", label: "Colleges Count", type: "number" },
          { name: "latitude", label: "Latitude Coordinate Position", type: "number" },
          { name: "longitude", label: "Longitude Coordinate Position", type: "number" },
          { name: "address", label: "Detailed Postal Address Description", type: "textarea" },
        ]}
      />
    </div>
  );
}