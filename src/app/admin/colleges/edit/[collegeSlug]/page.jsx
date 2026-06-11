import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { colleges } from "@/data/colleges";
import EntityForm from "@/components/forms/EntityForm";

export default async function EditCollegePage({
  params,
}) {
  const { collegeSlug } = await params;

  const college = colleges.find(
    (c) => c.slug === collegeSlug
  );

  if (!college) {
    return (
      <div className="p-6">
        College not found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center gap-3">
        <Link
          href={`/admin/colleges/${collegeSlug}`}
          className="rounded-lg border border-slate-200 p-2 hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
        </Link>

        <div>
          <h1 className="text-2xl font-bold">
            Edit College
          </h1>

          <p className="text-slate-500">
            Update college information
          </p>
        </div>
      </div>

      <EntityForm
        title="College"
        mode="edit"
        initialData={college}
        redirectPath="/admin/colleges"
        fields={[
          {
            name: "name",
            label: "College Name",
          },
          {
            name: "stream",
            label: "Stream",
          },
          {
            name: "district",
            label: "District",
          },
          {
            name: "taluka",
            label: "Taluka",
          },
          {
            name: "village",
            label: "Village",
          },
          {
            name: "address",
            label: "Address",
          },
        ]}
      />
    </div>
  );
}