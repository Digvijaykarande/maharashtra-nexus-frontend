"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import HierarchyPage from "@/components/admin/HierarchyPage";
import { geoService } from "@/services/geoService";
import { Loader2, Plus, Home, Building2, Landmark } from "lucide-react";
import toast from "react-hot-toast";

export default function TalukaPage() {
  const { division, district, taluka } = useParams();
  const [talukaData, setTalukaData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [villages, setVillages] = useState([]);
  const [cities, setCities] = useState([]);
  const [towns, setTowns] = useState([]);

  useEffect(() => {
    async function fetchTalukaDashboard() {
      try {
        const [talukaMeta, villagesList, citiesList, townsList] = await Promise.all([
          geoService.getTalukaBySlug(taluka),
          geoService.getVillagesByTaluka(taluka),
          geoService.getCitiesByTaluka(taluka),
          geoService.getTownsByTaluka(taluka),
        ]);

        setTalukaData(talukaMeta?.data || talukaMeta);
        setVillages(villagesList?.data || villagesList || []);
        setCities(citiesList?.data || citiesList || []);
        setTowns(townsList?.data || townsList || []);
      } catch (err) {
        toast.error("Failed to sync sub-entities from the live database");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (taluka) fetchTalukaDashboard();
  }, [taluka]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center gap-2 text-slate-500">
        <Loader2 className="animate-spin text-emerald-600" size={24} />
        <span>Syncing Live Taluka Workspace...</span>
      </div>
    );
  }

  if (!talukaData) return notFound();

  // Normalized data lists feeding into the central Hierarchy UI grid card loops
  const subEntitiesList = [
    ...villages.map((v) => ({
      name: v.name,
      slug: `villages/${v.slug}`, // Directs to villages/[village]/page.jsx
      short: "🏡 Village",
      headquarters: v.address || "Rural Sector",
    })),
    ...cities.map((c) => ({
      name: c.name,
      slug: `cities/${c.slug}`,   // Directs to cities/[citySlug]/page.jsx
      short: "🌆 City",
      headquarters: c.address || `PIN: ${c.pincode || "N/A"}`,
    })),
    ...towns.map((t) => ({
      name: t.name,
      slug: `towns/${t.slug}`,    // Directs to towns/[townSlug]/page.jsx
      short: "🏡 Town",
      headquarters: t.address || `Wards: ${t.wardCount || 0}`,
    })),
  ];

  return (
    <div className="space-y-10">
      {/* 1. Main Hierarchy View with Dynamic Counts */}
      <HierarchyPage
        title={`${talukaData.name} Taluka`}
        description={talukaData.description || `Administrative overview bounds for ${talukaData.name}.`}
        stats={[
          { label: "Villages", value: villages.length },
          { label: "Cities", value: cities.length },
          { label: "Towns", value: towns.length },
        ]}
        hideCreateCard={true} // Employs our visibility toggle flag cleanly!
        entities={subEntitiesList}
        entityViewBasePath={`/admin/divisions/${division}/${district}/${taluka}`}
        showActions={true}
        editHref={`/admin/divisions/${division}/${district}/edit-taluka/${taluka}`}
        deleteId={taluka}
        deleteType="taluka"
        mapProps={{
          lat: Number(talukaData.latitude || 19.7515),
          lng: Number(talukaData.longitude || 75.7139),
          slug: taluka,
          placeName: talukaData.name,
          mode: "taluka",
        }}
      />

      <hr className="border-slate-200" />

      {/* 2. Unified Creation Gateway Interfaces Grid */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
          Creation Gateways
        </h3>
        <div className="grid gap-6 md:grid-cols-3">
          
          {/* Add Village Gateway Card */}
          <Link href={`/admin/divisions/${division}/${district}/${taluka}/villages/create`}>
            <div className="relative h-[110px] rounded-2xl border border-slate-200 bg-white p-5 flex flex-col justify-between transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-50/20 hover:shadow-sm group">
              <div className="flex justify-between items-start w-full">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Add Village</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Rural sector development node</p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <Home size={18} />
                </div>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-emerald-600 transition-colors">
                <span>Open Form</span>
                <Plus size={14} className="transition-transform group-hover:scale-125" />
              </div>
            </div>
          </Link>

          {/* Add City Gateway Card */}
          <Link href={`/admin/divisions/${division}/${district}/${taluka}/cities/create`}>
            <div className="relative h-[110px] rounded-2xl border border-slate-200 bg-white p-5 flex flex-col justify-between transition-all duration-300 hover:border-blue-500 hover:bg-blue-50/20 hover:shadow-sm group">
              <div className="flex justify-between items-start w-full">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Add City</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Urban municipal boundary profiling</p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                  <Building2 size={18} />
                </div>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-blue-600 transition-colors">
                <span>Open Form</span>
                <Plus size={14} className="transition-transform group-hover:scale-125" />
              </div>
            </div>
          </Link>

          {/* Add Town Gateway Card */}
          <Link href={`/admin/divisions/${division}/${district}/${taluka}/towns/create`}>
            <div className="relative h-[110px] rounded-2xl border border-slate-200 bg-white p-5 flex flex-col justify-between transition-all duration-300 hover:border-amber-500 hover:bg-amber-50/20 hover:shadow-sm group">
              <div className="flex justify-between items-start w-full">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Add Town</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Semi-urban ward classification register</p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
                  <Landmark size={18} />
                </div>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-amber-600 transition-colors">
                <span>Open Form</span>
                <Plus size={14} className="transition-transform group-hover:scale-125" />
              </div>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}