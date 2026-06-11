import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import EntityForm from "@/components/forms/EntityForm";

export default function CreateTalukaPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/talukas"
          className="rounded-lg border p-2"
        >
          <ArrowLeft size={18} />
        </Link>

        <div>
          <h1 className="text-2xl font-bold">
            Create Taluka
          </h1>

          <p className="text-slate-500">
            Add a new taluka
          </p>
        </div>
      </div>

      <EntityForm
        title="Taluka"
        redirectPath="/admin/talukas"
        fields={[
  { name: "name", label: "Taluka Name" },
  { name: "headquarters", label: "Headquarters" },
  { name: "district", label: "District" },
  { name: "villages", label: "Villages" },
  { name: "cities", label: "Cities" },
  { name: "towns", label: "Towns" },
  { name: "population", label: "Population" },
  { name: "latitude", label: "Latitude Coordinate", type: "text", required: false },
  { name: "longitude", label: "Longitude Coordinate", type: "text", required: false },
]}
      />
    </div>
  );
}