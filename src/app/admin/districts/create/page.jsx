import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import EntityForm from "@/components/forms/EntityForm";

export default function CreateDistrictPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/districts"
          className="rounded-lg border p-2"
        >
          <ArrowLeft size={18} />
        </Link>

        <div>
          <h1 className="text-2xl font-bold">
            Create District
          </h1>

          <p className="text-slate-500">
            Add a new district
          </p>
        </div>
      </div>

      <EntityForm
        title="District"
        redirectPath="/admin/districts"
        fields={[
          {
            name: "name",
            label: "District Name",
          },
          {
            name: "headquarters",
            label: "Headquarters",
          },
          {
            name: "talukas",
            label: "Talukas",
          },
          { name: "latitude", label: "Latitude Coordinate", type: "text", required: false },
          { name: "longitude", label: "Longitude Coordinate", type: "text", required: false },
        ]}
      />
    </div>
  );
}