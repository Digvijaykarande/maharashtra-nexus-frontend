"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import EntityTable from "@/components/admin/EntityTable";
import { geoService } from "@/services/geoService";
import { Loader2 } from "lucide-react";

export default function DivisionsListPage() {
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDivisions() {
      try {
        const response = await geoService.getDivisions();
        // Fallback checks if your backend wraps response data in an object
        setDivisions(response.data || response);
      } catch (err) {
        toast.error(err.message || "Could not retrieve divisions data");
      } finally {
        setLoading(false);
      }
    }
    loadDivisions();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center gap-2 text-slate-500">
        <Loader2 className="animate-spin text-emerald-600" size={24} />
        <span>Loading Administrative Divisions...</span>
      </div>
    );
  }

  return (
    <EntityTable
      title="Divisions"
      data={divisions}
      createHref="/admin/divisions/create"
      editBasePath="/admin/divisions/edit"
      viewBasePath="/admin/divisions"
    />
  );
}