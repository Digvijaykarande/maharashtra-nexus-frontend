"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import HierarchyPage from "@/components/admin/HierarchyPage";
import { geoService } from "@/services/geoService";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function CitiesPage() {
  const { division, district, taluka } = useParams();
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLiveCities() {
      try {
        const response = await geoService.getCitiesByTaluka(taluka);
        const dataPayload = response?.data || response || [];
        
        // Normalize object values right out of the API response array streams
        const normalizedCities = dataPayload.map(city => ({
          ...city,
          // Fallback safely to database '_id' if slug parameters ever break or are missing
          slug: city.slug || city._id, 
          // Ensure name doesn't contain stray spaces from raw input blocks
          name: city.name ? city.name.trim() : "Unnamed Urban Center",
          // Inject a short text badge indicating its administrative class
          short: city.type || "🌆 City"
        }));

        setCities(normalizedCities);
      } catch (err) {
        toast.error("Failed to fetch urban cities cluster data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (taluka) loadLiveCities();
  }, [taluka]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center gap-2 text-slate-500">
        <Loader2 className="animate-spin text-emerald-600" size={24} />
        <span>Loading Stored Cities Array...</span>
      </div>
    );
  }

  return (
    <HierarchyPage
      title="Urban Cities"
      description={`Registered municipal cities inside "${taluka}" jurisdiction.`}
      stats={[
        {
          label: "Total Cities In Taluka",
          value: cities.length,
        },
      ]}
      createTitle="Create City"
      createHref={`/admin/divisions/${division}/${district}/${taluka}/cities/create`}
      entities={cities}
      entityViewBasePath={`/admin/divisions/${division}/${district}/${taluka}/cities`}
      showActions={false}
    />
  );
}