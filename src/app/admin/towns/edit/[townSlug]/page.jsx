import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { towns } from "@/data/towns";
import EntityForm from "@/components/forms/EntityForm";

export default async function EditTownPage({
  params,
}) {
  const { townSlug } = await params;

  const town = towns.find(
    (t) => t.slug === townSlug
  );

  if (!town) {
    return <div>Town not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href={`/admin/towns/${town.slug}`}
          className="rounded-lg border p-2"
        >
          <ArrowLeft size={18} />
        </Link>

        <div>
          <h1 className="text-2xl font-bold">
            Edit Town
          </h1>

          <p className="text-slate-500">
            Update town information
          </p>
        </div>
      </div>

      <EntityForm
                    title="Town"
                    mode="edit"
                    initialData={town}
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