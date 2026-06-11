"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import EditEntityForm from "@/components/forms/EditEntityForm";
import { geoService } from "@/services/geoService";

export default function EditCityPage() {
  const router = useRouter();
  const { division, district, taluka, citySlug } = useParams();
  const [cityData, setCityData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCityDetails() {
      try {
        // Assuming your backend supports fetching a single city configuration
        const data = await geoService.getCityBySlug?.(citySlug);
        setCityData(data?.data || data);
      } catch (err) {
        toast.error("Failed to recover requested city properties");
        router.push(`/admin/divisions/${division}/${district}/${taluka}/cities`);
      } finally {
        setLoading(false);
      }
    }
    if (citySlug) fetchCityDetails();
  }, [citySlug, division, district, taluka, router]);

  const handleUpdateCity = async (formData) => {
    await geoService.updateCity?.(citySlug, formData);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center gap-2 text-slate-500">
        <Loader2 className="animate-spin text-emerald-600" size={24} />
        <span>Fetching City Parametric Matrices...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href={`/admin/divisions/${division}/${district}/${taluka}/cities`} className="rounded-lg border p-2">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Modify City Configurations</h1>
          <p className="text-slate-500">Update localized metadata statistics</p>
        </div>
      </div>

      <EditEntityForm
        title="City"
        redirectPath={`/admin/divisions/${division}/${district}/${taluka}/cities`}
        initialData={cityData}
        onSubmitAction={handleUpdateCity}
        fields={[
          { name: "name", label: "City Name", required: true },
          { name: "population", label: "Current Urban Population", type: "number" },
          { name: "pincode", label: "Primary PIN Code", required: true },
          { name: "areaSqKm", label: "Total Area (Sq Km)", type: "number" },
        ]}
      />
    </div>
  );
}