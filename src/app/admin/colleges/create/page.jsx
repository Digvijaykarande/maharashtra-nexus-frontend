"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import EntityForm from "@/components/forms/EntityForm";
import { entityService } from "@/services/entityService";

export default function CreateCollegePage() {
  const handleCreateCollege = async (formData) => {
    await entityService.createCollege(formData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/colleges" className="rounded-lg border p-2">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Add College</h1>
          <p className="text-slate-500">Register a new higher learning institution</p>
        </div>
      </div>

      <EntityForm
        title="College"
        redirectPath="/admin/colleges"
        onSubmitAction={handleCreateCollege}
        fields={[
          { name: "name", label: "College Name", required: true },
          { name: "universityAffiliation", label: "Affiliated University", required: true },
          { name: "taluka", label: "Taluka Location", required: true },
          { name: "district", label: "District Location", required: true },
          { name: "intakeCapacity", label: "Student Intake Capacity", type: "number" },
          { name: "description", label: "Institutional Details", type: "textarea" }
        ]}
      />
    </div>
  );
}