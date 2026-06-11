import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import EntityForm from "@/components/forms/EntityForm";

export default function CreateTownPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/towns"
          className="rounded-lg border p-2"
        >
          <ArrowLeft size={18} />
        </Link>

        <div>
          <h1 className="text-2xl font-bold">
            Create Town
          </h1>

          <p className="text-slate-500">
            Add a new town
          </p>
        </div>
      </div>

      <EntityForm
        title="Town"
        redirectPath="/admin/towns"
        fields={[
  { name: "name", label: "Town Name" },
  { name: "district", label: "District" },
  { name: "population", label: "Population" },
  { name: "latitude", label: "Latitude Coordinate", type: "text", required: false },
  { name: "longitude", label: "Longitude Coordinate", type: "text", required: false },
]}
      />
    </div>
  );
}