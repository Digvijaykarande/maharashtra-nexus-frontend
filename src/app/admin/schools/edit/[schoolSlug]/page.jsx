import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { schools} from "@/data/schools";

import VillageForm from "@/components/forms/VillageForm";

export default async function EditSchoolPage({
  params,
}) {
  const { schoolSlug } = await params;

  const school = schools.find(
    (s) => s.slug === schoolSlug
  );

  if (!school) {
    return (
      <div className="p-6">
        School   not found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href={`/admin/schools/${schoolSlug}`}
          className="rounded-lg border p-2"
        >
          <ArrowLeft size={18} />
        </Link>

        <div>
          <h1 className="text-2xl font-bold">
            Edit School
          </h1>

          <p className="text-slate-500">
            Update school  information
          </p>
        </div>
      </div>

      <VillageForm
        mode="edit"
        initialData={school}
      />
    </div>
  );
}