import Link from "next/link";
import { ArrowLeft, MapPin, AlertCircle } from "lucide-react";

import { villages } from "@/data/villages";
import EntityForm from "@/components/forms/EntityForm"; // Swapped to generic form

// ── Define the Dynamic Structural Fields Schema ────────────────
const villageFields = [
  { name: "name", label: "Village Name", type: "text", required: true },
  { name: "slug", label: "Url Slug Identifier", type: "text", required: true },
  { name: "district", label: "Parent District", type: "text", required: true },
  { name: "taluka", label: "Parent Taluka", type: "text", required: true },
  { name: "population", label: "Total Population Count", type: "number", required: true },
  { name: "malePopulation", label: "Male Population Metric", type: "number", required: false },
  { name: "femalePopulation", label: "Female Population Metric", type: "number", required: false },
  { name: "description", label: "Geographical Description & Notes", type: "textarea", required: false },
  { name: "latitude", label: "Latitude Coordinate", type: "text", required: false },
  { name: "longitude", label: "Longitude Coordinate", type: "text", required: false },
];

export default async function EditVillagePage({
  params,
}) {
  const { villageSlug } = await params;

  // Locate the current record matching parameters asynchronously
  const village = villages.find(
    (v) => v.slug === villageSlug
  );

  // Premium Zero-State Display Fallback Handle
  if (!village) {
    return (
      <div className="max-w-md mx-auto my-12 text-center p-8 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-4 animate-fadeIn">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
          <AlertCircle size={24} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">Village Not Found</h3>
          <p className="text-sm text-slate-500 mt-1">
            The database parameters requested for slug "{villageSlug}" do not match any active log records.
          </p>
        </div>
        <Link
          href="/admin/villages"
          className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider text-emerald-600 hover:text-emerald-700 underline pt-2"
        >
          Return to Village Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Block Context */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center px-1 py-2">
        <Link
          href={`/admin/villages`}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition duration-150 hover:bg-slate-50 hover:text-slate-900 group"
          title="Back to Directory"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
        </Link>

        <div className="flex items-start gap-2.5">
          <div className="mt-1 hidden sm:flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-200/50 text-emerald-600">
            <MapPin size={16} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Edit {village.name || "Village"}
            </h1>
            <p className="mt-0.5 text-sm text-slate-500">
              Modify demographic profiles, localized metrics, and regional mappings dynamically
            </p>
          </div>
        </div>
      </div>

      {/* Main Generic Form Integration Injection */}
      <EntityForm
        title="Village"
        mode="edit"
        initialData={village}
        fields={villageFields}
        redirectPath="/admin/villages"
      />
    </div>
  );
}