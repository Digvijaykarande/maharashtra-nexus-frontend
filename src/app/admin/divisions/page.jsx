"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import HierarchyPage from "@/components/admin/HierarchyPage";
import { geoService } from "@/services/geoService";
import { Loader2 } from "lucide-react";

export default function DivisionsPage() {
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dynamic counter aggregates
  const [totals, setTotals] = useState({ districts: 0, talukas: 0 });

  useEffect(() => {
    async function loadLiveDivisions() {
      try {
        const response = await geoService.getDivisions();
        const liveData = response.data || response;
        
        setDivisions(liveData);

        // Dynamically compute global metrics across your live database records
        const districtsSum = liveData.reduce((acc, curr) => acc + (Number(curr.districts) || 0), 0);
        const talukasSum = liveData.reduce((acc, curr) => acc + (Number(curr.talukas) || 0), 0);
        
        setTotals({
          districts: districtsSum || 36, // Fallback to standard counts if zeroed out
          talukas: talukasSum || 358
        });
      } catch (err) {
        toast.error(err.message || "Failed to render live administrative layout grid");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadLiveDivisions();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center gap-2 text-slate-500">
        <Loader2 className="animate-spin text-emerald-600" size={24} />
        <span>Loading Maharashtra GIS Divisions Matrix...</span>
      </div>
    );
  }

  // Generate dynamic contextual badges for custom records that might lack short-codes
  const preparedEntities = divisions.map(div => ({
    ...div,
    short: div.short || div.name.trim().split(" ").map(w => w[0]).join("").toUpperCase()
  }));

  return (
    <HierarchyPage
      title="Divisions"
      description="Administrative divisions of Maharashtra State GIS Architecture."
      createTitle="Create Division"
      createHref="/admin/divisions/create"

      entities={preparedEntities} // Live dynamic rows mapped automatically here!
      entityViewBasePath="/admin/divisions"

      stats={[
        {
          label: "Total Divisions",
          value: divisions.length,
        },
        {
          label: "Districts",
          value: totals.districts,
        },
        {
          label: "Talukas",
          value: totals.talukas,
        },
      ]}
    />
  );
}