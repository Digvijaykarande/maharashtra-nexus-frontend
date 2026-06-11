import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import EntityForm from "@/components/forms/EntityForm";

export default function CreateCityPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/cities"
          className="rounded-lg border p-2"
        >
          <ArrowLeft size={18} />
        </Link>

        <div>
          <h1 className="text-2xl font-bold">
            Create City
          </h1>

          <p className="text-slate-500">
            Add a new city
          </p>
        </div>
      </div>

      <EntityForm
        title="City"
        redirectPath="/admin/cities"
        fields={[
  { name: "name", label: "City Name" },
  { name: "district", label: "District" },
  { name: "population", label: "Population" },
  { name: "latitude", label: "Latitude Coordinate", type: "text", required: false },
  { name: "longitude", label: "Longitude Coordinate", type: "text", required: false },
]}
      />
    </div>
  );
}