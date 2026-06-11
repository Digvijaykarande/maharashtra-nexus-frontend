"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import EntityForm from "@/components/forms/EntityForm";
import { geoService } from "@/services/geoService";

export default function CreateDivisionPage() {
  const handleCreateDivision = async (formData) => {
    // Standard slug auto-generator logic
    const generatedSlug = formData.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // Strip special characters
      .replace(/\s+/g, "-")         // Collapse spaces into single hyphens
      .replace(/-+/g, "-");         // Deduplicate structural hyphens

    // Inject the formatted slug directly into the Node.js API dispatch payload
    const payload = { 
      ...formData, 
      slug: generatedSlug 
    };

    await geoService.createDivision(payload);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/divisions/list" className="rounded-lg border p-2">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Create Division</h1>
          <p className="text-slate-500">Add a new administrative division record</p>
        </div>
      </div>
      <EntityForm
        title="Division"
        redirectPath="/admin/divisions" // Fixed: Redirects directly to landing page
        onSubmitAction={handleCreateDivision}
        fields={[
          { name: "name", label: "Division Name", required: true },
          { name: "headquarters", label: "Headquarters", required: true },
          { name: "districts", label: "Initial Districts Count", type: "number" },
          { name: "talukas", label: "Initial Talukas Count", type: "number" },
          { name: "villages", label: "Initial Villages Count", type: "number" },
          { name: "latitude", label: "Latitude Coordinate", required: false },
          { name: "longitude", label: "Longitude Coordinate", required: false },
        ]}
      />
    </div>
  );
}