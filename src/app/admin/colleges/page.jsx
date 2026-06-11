"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminManagementPage from "@/components/admin/AdminManagementPage";
import { entityService } from "@/services/entityService";
import { Loader2 } from "lucide-react";

export default function CollegesManagementPage() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadColleges() {
      try {
        const response = await entityService.getColleges();
        setColleges(response.data || response);
      } catch (err) {
        toast.error(err.message || "Failed to load colleges data matrix");
      } finally {
        setLoading(false);
      }
    }
    loadColleges();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center gap-2 text-slate-500">
        <Loader2 className="animate-spin text-emerald-600" size={24} />
        <span>Syncing Higher Education Institutional Data...</span>
      </div>
    );
  }

  // Column definitions matching your MongoDB keys exactly
  const columns = ["name", "slug", "taluka", "district", "universityAffiliation"];

  return (
    <AdminManagementPage
      title="Colleges"
      description="Monitor and manage registered collegiate academic centers across Maharashtra."
      data={colleges}
      columns={columns}
      basePath="/admin/colleges"
      stats={[{ title: "Total Colleges", value: colleges.length }]}
    />
  );
}