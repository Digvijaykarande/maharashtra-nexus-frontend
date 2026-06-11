"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminManagementPage from "@/components/admin/AdminManagementPage";
import { entityService } from "@/services/entityService";
import { Loader2 } from "lucide-react";

export default function HospitalsManagementPage() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHospitals() {
      try {
        const response = await entityService.getHospitals();
        setHospitals(response.data || response);
      } catch (err) {
        toast.error(err.message || "Failed to pull public health infrastructure records");
      } finally {
        setLoading(false);
      }
    }
    loadHospitals();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center gap-2 text-slate-500">
        <Loader2 className="animate-spin text-emerald-600" size={24} />
        <span>Fetching Medical and Healthcare Network Status...</span>
      </div>
    );
  }

  const columns = ["name", "slug", "taluka", "type", "bedCapacity"];

  return (
    <AdminManagementPage
      title="Hospitals"
      description="Overview and capacity management of medical infrastructure."
      data={hospitals}
      columns={columns}
      basePath="/admin/hospitals"
      stats={[{ title: "Total Medical Centers", value: hospitals.length }]}
    />
  );
}