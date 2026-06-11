"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import AdminManagementPage from "@/components/admin/AdminManagementPage";
import { geoService } from "@/services/geoService";
import { Loader2 } from "lucide-react";

export default function VillagesPage() {
  const { division, district, taluka } = useParams();
  const [villages, setVillages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVillages() {
      try {
        const data = await geoService.getVillagesByTaluka(taluka);
        setVillages(data.data || data);
      } catch (err) {
        toast.error("Could not sync village matrix layers");
      } finally {
        setLoading(false);
      }
    }
    if (taluka) loadVillages();
  }, [taluka]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center gap-2 text-slate-500">
        <Loader2 className="animate-spin text-emerald-600" size={24} />
        <span>Populating Village Dataset...</span>
      </div>
    );
  }

  const columns = ["name", "slug", "population", "pincode"];

  return (
    <AdminManagementPage
      title="Villages"
      description={`Manage rural demographics inside ${taluka} administrative zone.`}
      data={villages}
      columns={columns}
      basePath={`/admin/divisions/${division}/${district}/${taluka}/villages`}
      stats={[{ title: "Total Villages", value: villages.length }]}
    />
  );
}