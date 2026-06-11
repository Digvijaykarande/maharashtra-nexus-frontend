"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import EntityForm from "@/components/forms/EntityForm";
import { geoService } from "@/services/geoService";

export default function CreateTalukaPage() {
  const { division, district } = useParams(); // Automatically extracts parent slugs from URL strings

  const handleCreateTaluka = async (formData) => {
    // 1. Compute a clean URL-friendly slug value from the Taluka Name input
    const generatedSlug = formData.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // Strip out special characters
      .replace(/\s+/g, "-")         // Collapse multi-spaces to single hyphens
      .replace(/-+/g, "-");         // Deduplicate structural hyphens

    // 2. Formulate the exact payload layout required by your Mongoose model schema
    const payload = {
      ...formData,
      slug: generatedSlug,
      division: division,  // Fulfills required schema path mapping index
      district: district   // Fulfills required schema path mapping index
    };

    await geoService.createTaluka(payload);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href={`/admin/divisions/${division}/${district}`} className="rounded-lg border p-2">
          <ArrowLeft size={18} />
        </Link>

        <div>
          <h1 className="text-2xl font-bold">Create Taluka</h1>
          <p className="text-slate-500">Add a sub-district administrative taluka container</p>
        </div>
      </div>

      <EntityForm
        title="Taluka"
        redirectPath={`/admin/divisions/${division}/${district}`} // Returns seamlessly to target parent view page
        onSubmitAction={handleCreateTaluka}
        fields={[
          { name: "name", label: "Taluka Name", required: true },
          { name: "headquarters", label: "Administrative HQ Town", required: true },
          { name: "description", label: "Taluka Geographic Description", type: "textarea" },
          { name: "villages", label: "Initial Villages Count", type: "number" },
          { name: "cities", label: "Initial Cities Count", type: "number" },
          { name: "towns", label: "Initial Towns Count", type: "number" },
        ]}
      />
    </div>
  );
}