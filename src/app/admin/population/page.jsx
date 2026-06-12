"use client";

import { useState, useEffect } from "react";
import {
  Database,
  Users,
  User,
  Users2,
  Search,
  Eye,
  Pencil,
  Trash2,
  Loader2,
  ArrowUpDown
} from "lucide-react";
import Link from "next/link";
import AdminMiniStatCard from "@/components/admin/AdminMiniStatCard";
import { geoService } from "@/services/geoService";
import toast from "react-hot-toast";

export default function PopulationPage() {
  const [search, setSearch] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  // 1. Fetch live contextual demographics across leaf parameters simultaneously
  useEffect(() => {
    async function hydratePopulationMatrix() {
      try {
        const [vilsRes, citsRes, twnsRes] = await Promise.all([
          geoService.getAllVillages?.() || { data: [] },
          geoService.getAllCities?.() || { data: [] },
          geoService.getAllTowns?.() || { data: [] }
        ]);

        const rawVillages = vilsRes?.data || vilsRes || [];
        const rawCities = citsRes?.data || citsRes || [];
        const rawTowns = twnsRes?.data || twnsRes || [];

        // Normalize distinct schemas down into unified records collection format
        const combined = [
          ...rawVillages.map(v => ({ ...v, type: v.type || "Village" })),
          ...rawCities.map(c => ({ ...c, type: c.type || "City" })),
          ...rawTowns.map(t => ({ ...t, type: t.type || "Town" }))
        ];

        setRecords(combined);
      } catch (err) {
        toast.error("Failed to load regional live population schemas");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    hydratePopulationMatrix();
  }, []);

  // 2. Computed Live Dynamic Mini Stats
  const totalPopulation = records.reduce((sum, item) => sum + (Number(item.population) || 0), 0);
  const totalMalePopulation = records.reduce((sum, item) => sum + (Number(item.malePopulation) || 0), 0);
  const totalFemalePopulation = records.reduce((sum, item) => sum + (Number(item.femalePopulation) || 0), 0);

  // 3. Dynamic Sorting Handler
  const toggleSort = (field) => {
    const isAsc = sortField === field && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortField(field);
  };

  // 4. Combined Filtering & Sorting Mechanics
  const processedRecords = records
    .filter((record) =>
      record.name?.toLowerCase().includes(search.toLowerCase()) ||
      record.district?.toLowerCase().includes(search.toLowerCase()) ||
      record.taluka?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      // Handle strings vs integers safely
      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();

      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  if (loading) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-3 text-slate-500">
        <Loader2 className="animate-spin text-emerald-600" size={32} />
        <span className="text-sm font-semibold tracking-wide">Syncing Micro-Demographic Matrix Logs...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto p-1">
      {/* Header Container */}
      <div className="py-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Population Records</h1>
        <p className="mt-0.5 text-sm font-medium text-slate-500">
          Manage and aggregate live census population statistics distributed across regional hubs.
        </p>
      </div>

      {/* Dynamic Mini Stat Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminMiniStatCard title="Total Records Map" value={records.length} icon={Database} />
        <AdminMiniStatCard title="Aggregated Pop" value={totalPopulation.toLocaleString("en-IN")} icon={Users} />
        <AdminMiniStatCard title="Male Demographics" value={totalMalePopulation.toLocaleString("en-IN")} icon={User} />
        <AdminMiniStatCard title="Female Demographics" value={totalFemalePopulation.toLocaleString("en-IN")} icon={Users2} />
      </div>

      {/* Search Bar Block Wrapper */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search matching names, districts, or talukas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition duration-200 focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 font-medium"
          />
        </div>
      </div>

      {/* Structured Population Layout Data Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500 select-none">
              <tr>
                <th onClick={() => toggleSort("name")} className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-1.5">Name <ArrowUpDown size={12} /></div>
                </th>
                <th onClick={() => toggleSort("type")} className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-1.5">Type <ArrowUpDown size={12} /></div>
                </th>
                <th onClick={() => toggleSort("district")} className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-1.5">District <ArrowUpDown size={12} /></div>
                </th>
                <th onClick={() => toggleSort("taluka")} className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-1.5">Taluka <ArrowUpDown size={12} /></div>
                </th>
                <th onClick={() => toggleSort("population")} className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-1.5">Population <ArrowUpDown size={12} /></div>
                </th>
                <th className="px-6 py-4">Male</th>
                <th className="px-6 py-4">Female</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm">
              {processedRecords.map((record) => {
                const lowerType = record.type?.toLowerCase();
                // Map navigation back to clean dashboard locations dynamically
                const detailsUrl = `/admin/divisions/${record.division || "pune"}/${record.districtSlug || "temp-district"}/${record.talukaSlug || "temp-taluka"}/${lowerType === "village" ? "villages" : lowerType === "city" ? "cities" : "towns"}/${record.slug}`;

                return (
                  <tr key={`${record.type}-${record.slug}`} className="group transition-colors duration-150 hover:bg-slate-50/60">
                    <td className="px-6 py-4 font-bold text-slate-900">{record.name}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center font-bold text-[11px] px-2 py-0.5 rounded-md uppercase tracking-wider border ${
                        lowerType === "city" ? "bg-blue-50 text-blue-700 border-blue-100" :
                        lowerType === "town" ? "bg-amber-50 text-amber-700 border-amber-100" :
                        "bg-emerald-50 text-emerald-700 border-emerald-100"
                      }`}>
                        {record.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-600">{record.district}</td>
                    <td className="px-6 py-4 font-medium text-slate-600">{record.taluka}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">{(Number(record.population) || 0).toLocaleString("en-IN")}</td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{(Number(record.malePopulation) || 0).toLocaleString("en-IN")}</td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{(Number(record.femalePopulation) || 0).toLocaleString("en-IN")}</td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-1">
                        <Link href={detailsUrl} className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-600" title="View Profile Node">
                          <Eye size={15} />
                        </Link>
                        <button type="button" className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-amber-50 hover:text-amber-600" title="Edit Data Fields">
                          <Pencil size={15} />
                        </button>
                        <button type="button" className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600" title="Purge Record">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {processedRecords.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-sm font-semibold text-slate-400">
                    No geographical census records found matching your active criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}