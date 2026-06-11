"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import EntityForm from "@/components/forms/EntityForm";
import { geoService } from "@/services/geoService";

export default function CreateDistrictPage() {
  const { division } = useParams(); // e.g., 'pune' or 'nashik'

  const handleCreateDistrict = async (formData) => {
    // 1. Automatically generate the clean slug from the inputted District Name
    const generatedSlug = formData.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    // 2. Build the exact object format required by your Mongoose schema fields
    const payload = { 
      ...formData, 
      slug: generatedSlug,
      division: division // Matches the 'division' string expected in your schema
    };

    await geoService.createDistrict(payload);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href={`/admin/divisions/${division}`} className="rounded-lg border p-2">
          <ArrowLeft size={18} />
        </Link>

        <div>
          <h1 className="text-2xl font-bold">Create District</h1>
          <p className="text-slate-500">Add an administrative sub-district container</p>
        </div>
      </div>

      <EntityForm
        title="District"
        redirectPath={`/admin/divisions/${division}`} // Redirects to parent dynamic division view
        onSubmitAction={handleCreateDistrict}
        fields={[
          { name: "name", label: "District Name", required: true },
          { name: "headquarters", label: "Headquarters / HQ Town", required: true },
          { name: "short", label: "Short Registration Code (e.g., MH-15)" },
          { name: "description", label: "Regional Description", type: "textarea" },
          { name: "talukas", label: "Initial Talukas Count", type: "number" },
          { name: "villages", label: "Initial Villages Count", type: "number" },
        ]}
      />
    </div>
  );
}