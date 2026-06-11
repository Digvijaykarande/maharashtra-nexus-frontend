"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import EditEntityForm from "@/components/forms/EditEntityForm";
import { geoService } from "@/services/geoService";

export default function EditDivisionPage() {
  const router = useRouter();
  const { divisionSlug } = useParams(); // Safely pulls dynamic slug parameters from route URL
  const [division, setDivision] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDivisionDetails() {
      try {
        const data = await geoService.getDivisionBySlug(divisionSlug);
        setDivision(data.data || data);
      } catch (err) {
        toast.error("Failed to load requested division configurations");
        router.push("/admin/divisions/list");
      } finally {
        setLoading(false);
      }
    }
    if (divisionSlug) fetchDivisionDetails();
  }, [divisionSlug, router]);

  const handleUpdateDivision = async (formData) => {
    await geoService.updateDivision(divisionSlug, formData);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center gap-2 text-slate-500">
        <Loader2 className="animate-spin text-emerald-600" size={24} />
        <span>Fetching Division Details...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/divisions/list" className="rounded-lg border p-2">
          <ArrowLeft size={18} />
        </Link>

        <div>
          <h1 className="text-2xl font-bold">Edit Division</h1>
          <p className="text-slate-500">Update division administrative settings</p>
        </div>
      </div>

     <EditEntityForm
        title="Division"
        redirectPath="/admin/divisions" // Fixed: Redirects directly to landing page
        initialData={division}
        onSubmitAction={handleUpdateDivision}
        fields={[
          { name: "name", label: "Division Name", required: true },
          { name: "headquarters", label: "Headquarters", required: true },
          { name: "districts", label: "Districts Count", type: "number" },
          { name: "talukas", label: "Talukas Count", type: "number" },
          { name: "villages", label: "Villages Count", type: "number" },
        ]}
      />
    </div>
  );
}