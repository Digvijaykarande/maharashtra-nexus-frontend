import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { cities } from "@/data/cities";
import EntityForm from "@/components/forms/EntityForm";

export default async function EditCityPage({
  params,
}) {
  const { citySlug } = await params;

  const city = cities.find(
    (c) => c.slug === citySlug
  );

  if (!city) {
    return <div>City not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href={`/admin/cities/${city.slug}`}
          className="rounded-lg border p-2"
        >
          <ArrowLeft size={18} />
        </Link>

        <div>
          <h1 className="text-2xl font-bold">
            Edit City
          </h1>

          <p className="text-slate-500">
            Update city information
          </p>
        </div>
      </div>
      <EntityForm
              title="City"
              mode="edit"
              initialData={city}
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