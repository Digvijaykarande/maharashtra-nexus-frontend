import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import EntityForm from "@/components/forms/EntityForm";
import { districts } from "@/data/districts";

export default async function EditDistrictPage({
  params,
}) {
  const { districtSlug } = await params;

  const district = districts.find(
    (d) => d.slug === districtSlug
  );

  if (!district) {
    return (
      <div className="p-6">
        District not found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href={`/admin/districts/${districtSlug}`}
          className="rounded-lg border p-2"
        >
          <ArrowLeft size={18} />
        </Link>

        <div>
          <h1 className="text-2xl font-bold">
            Edit District
          </h1>

          <p className="text-slate-500">
            Update district information
          </p>
        </div>
      </div>

      <EntityForm
        title="District"
        mode="edit"
        initialData={district}
        redirectPath="/admin/districts"
        fields={[
  { name: "name", label: "District Name" },
  { name: "headquarters", label: "Headquarters" },
  { name: "talukas", label: "Talukas" },
  { name: "latitude", label: "Latitude Coordinate", type: "text", required: false },
  { name: "longitude", label: "Longitude Coordinate", type: "text", required: false },
]}
      />
    </div>
  );
}