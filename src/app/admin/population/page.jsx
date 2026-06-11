"use client";

import { useState } from "react";
import {
  Database,
  Users,
  User,
  Users2,
  Search,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import AdminMiniStatCard from "@/components/admin/AdminMiniStatCard";

import { villages } from "@/data/villages";
import { cities } from "@/data/cities";
import { towns } from "@/data/towns";

const populationRecords = [
  ...villages,
  ...cities,
  ...towns,
];

export default function PopulationPage() {
  const [search, setSearch] = useState("");

  const totalPopulation = populationRecords.reduce(
    (sum, item) => sum + item.population,
    0
  );

  const totalMalePopulation = populationRecords.reduce(
    (sum, item) => sum + item.malePopulation,
    0
  );

  const totalFemalePopulation = populationRecords.reduce(
    (sum, item) => sum + item.femalePopulation,
    0
  );

  const filteredRecords = populationRecords.filter((record) =>
    record.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Container */}
      <div className="px-1 py-2">
        <h1 className="text-2xl font-bold text-slate-900">
          Population Records
        </h1>
        <p className="mt-0.5 text-sm text-slate-500">
          Manage population data across Maharashtra
        </p>
      </div>

      {/* Dynamic Mini Stat Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminMiniStatCard
          title="Records"
          value={populationRecords.length}
          icon={Database}
        />

        <AdminMiniStatCard
          title="Population"
          value={totalPopulation.toLocaleString()}
          icon={Users}
        />

        <AdminMiniStatCard
          title="Male Population"
          value={totalMalePopulation.toLocaleString()}
          icon={User}
        />

        <AdminMiniStatCard
          title="Female Population"
          value={totalFemalePopulation.toLocaleString()}
          icon={Users2}
        />
      </div>

      {/* Search Bar Block Wrapper */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search population records..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition duration-200 focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Structured Population Layout Data Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="bg-slate-50/70 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-3.5">Name</th>
                <th className="px-6 py-3.5">Type</th>
                <th className="px-6 py-3.5">District</th>
                <th className="px-6 py-3.5">Taluka</th>
                <th className="px-6 py-3.5">Population</th>
                <th className="px-6 py-3.5">Male</th>
                <th className="px-6 py-3.5">Female</th>
                <th className="px-6 py-3.5">Updated</th>
                <th className="px-6 py-3.5 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredRecords.map((record) => (
                <tr
                  key={record.slug}
                  className="group transition-colors duration-150 hover:bg-slate-50/60"
                >
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    {record.name}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {record.type}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {record.district}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {record.taluka}
                  </td>

                  <td className="px-6 py-4 font-medium text-slate-700">
                    {record.population.toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {record.malePopulation.toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {record.femalePopulation.toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-slate-500 text-xs">
                    {record.lastUpdated}
                  </td>

                  {/* Operational Action Column Controls */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-1.5">
                      <button 
                        className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>

                      <button 
                        className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-amber-50 hover:text-amber-600 cursor-pointer"
                        title="Edit Record"
                      >
                        <Pencil size={16} />
                      </button>

                      <button 
                        className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 cursor-pointer"
                        title="Delete Record"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {/* Zero-State Layout Configuration */}
              {filteredRecords.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="py-12 text-center text-sm text-slate-400"
                  >
                    No population records found matching your layout filters.
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