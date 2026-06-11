import Link from "next/link";
import { ArrowLeft, PlusCircle } from "lucide-react";
import EntityForm from "@/components/forms/EntityForm"; // Swapped to generic dynamic form

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

export default function CreateVillagePage() {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Dynamic Header Block Context */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center px-1 py-2">
        <Link
          href="/admin/villages"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition duration-150 hover:bg-slate-50 hover:text-slate-900 group"
          title="Back to Directory"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
        </Link>

        <div className="flex items-start gap-2.5">
          <div className="mt-1 hidden sm:flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-200/50 text-emerald-600">
            <PlusCircle size={16} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Create Village
            </h1>
            <p className="mt-0.5 text-sm text-slate-500">
              Register a completely new administrative village domain into the regional database
            </p>
          </div>
        </div>
      </div>

      {/* Main Generic EntityForm Injection */}
      <EntityForm
        title="Village"
        mode="create"
        initialData={{}}
        fields={villageFields}
        redirectPath="/admin/villages"
      />
    </div>
  );
}