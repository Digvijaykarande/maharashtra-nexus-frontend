"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import EntityForm from "@/components/forms/EntityForm";
import { geoService } from "@/services/geoService";

export default function CreateTownPage() {
  const { division, district, taluka } = useParams();

  const handleCreateTown = async (formData) => {
    const payload = { 
      ...formData, 
      talukaSlug: taluka,
      districtSlug: district,
      divisionSlug: division
    };
    await geoService.createTown?.(payload);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href={`/admin/divisions/${division}/${district}/${taluka}/towns`} className="rounded-lg border p-2">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Add Town Record</h1>
          <p className="text-slate-500">Insert a semi-urban town center register profile</p>
        </div>
      </div>

      <EntityForm
        title="Town"
        redirectPath={`/admin/divisions/${division}/${district}/${taluka}/towns`}
        onSubmitAction={handleCreateTown}
        fields={[
          { name: "name", label: "Town Name", required: true },
          { name: "slug", label: "Unique Town Slug (Optional)" },
          { name: "population", label: "Demographic Population Count", type: "number" },
          { name: "pincode", label: "Postal Index Number (PIN)", required: true },
          { name: "wardCount", label: "Total Administrative Wards", type: "number" },
          { name: "description", label: "General Structural Description", type: "textarea" },
        ]}
      />
    </div>
  );
}