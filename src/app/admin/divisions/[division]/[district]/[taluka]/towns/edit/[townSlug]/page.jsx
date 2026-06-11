"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import EditEntityForm from "@/components/forms/EditEntityForm";
import { geoService } from "@/services/geoService";

export default function EditTownPage() {
  const router = useRouter();
  const { division, district, taluka, townSlug } = useParams();
  const [townData, setTownData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTownDetails() {
      try {
        const data = await geoService.getTownBySlug?.(townSlug);
        setTownData(data?.data || data);
      } catch (err) {
        toast.error("Unable to gather target town data cluster");
        router.push(`/admin/divisions/${division}/${district}/${taluka}/towns`);
      } finally {
        setLoading(false);
      }
    }
    if (townSlug) fetchTownDetails();
  }, [townSlug, division, district, taluka, router]);

  const handleUpdateTown = async (formData) => {
    await geoService.updateTown?.(townSlug, formData);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center gap-2 text-slate-500">
        <Loader2 className="animate-spin text-emerald-600" size={24} />
        <span>Loading Localized Town Metrics...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href={`/admin/divisions/${division}/${district}/${taluka}/towns`} className="rounded-lg border p-2">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Edit Town Details</h1>
          <p className="text-slate-500">Modify census boundaries and demographic totals</p>
        </div>
      </div>

      <EditEntityForm
        title="Town"
        redirectPath={`/admin/divisions/${division}/${district}/${taluka}/towns`}
        initialData={townData}
        onSubmitAction={handleUpdateTown}
        fields={[
          { name: "name", label: "Town Name", required: true },
          { name: "population", label: "Demographic Population Count", type: "number" },
          { name: "pincode", label: "Postal Index Number (PIN)", required: true },
          { name: "wardCount", label: "Total Administrative Wards", type: "number" },
        ]}
      />
    </div>
  );
}