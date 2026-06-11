"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation"; 
import toast from "react-hot-toast"; 
import { geoService } from "@/services/geoService"; 
import AdminMapCard from "./AdminMapCard";
import { Plus, ArrowRight } from "lucide-react";

export default function HierarchyPage({
  title,
  description,
  stats,
  createTitle,
  createHref,
  entities = [],
  entityViewBasePath,
  mapProps,
  editHref,
  showActions = false,
  deleteId,
  deleteType,
  hideCreateCard = false, // Defaults to false so existing pages don't break
}) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm(`Are you absolutely sure you want to permanently delete this ${deleteType}?`)) return;

    try {
      if (deleteType === "division") {
        await geoService.deleteDivision(deleteId);
        toast.success("Division removed completely");
        router.push("/admin/divisions");
      } else if (deleteType === "district") {
        await geoService.deleteDistrict(deleteId);
        toast.success("District data purged successfully");
        router.back();
      } else if (deleteType === "taluka") {
        await geoService.deleteTaluka(deleteId);
        toast.success("Taluka records dropped successfully");
        router.back();
      }
      router.refresh();
    } catch (err) {
      toast.error(err.message || "Deletion sequence failed");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      {showActions && (
        <div className="flex gap-3">
          <Link
            href={editHref}
            className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
          >
            Edit
          </Link>

          <button
            onClick={handleDelete}
            className="rounded-xl bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      )}

      {/* Stats Panel */}
      <div className="grid gap-6 md:grid-cols-3">
        {stats?.map((stat) => (
          <div
            key={stat.label}
            className="rounded-3xl border border-slate-200 bg-white p-6"
          >
            <p className="text-sm text-slate-500">
              {stat.label}
            </p>
            <h3 className="mt-2 text-3xl font-bold">
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Map Segment */}
      {mapProps && (
        <AdminMapCard
          title={title}
          lat={mapProps.lat}
          lng={mapProps.lng}
          slug={mapProps.slug}
          placeName={mapProps.placeName}
          mode={mapProps.mode}
        />
      )}
      
      {/* Cards Display Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {/* Dynamic Condition check to safely toggle the standard creation box visibility */}
        {!hideCreateCard && (
          <Link href={createHref} className="group">
            <div className="relative h-[130px] rounded-2xl border-2 border-dashed border-slate-200 bg-white p-5 flex flex-col justify-between transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-50/20 hover:shadow-sm">
              <div className="flex justify-between items-start w-full">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Action
                  </p>
                  <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                    Create New
                  </h2>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 transition-transform duration-300 group-hover:scale-105">
                  <Plus className="w-5 h-5 block" strokeWidth={2.5} />
                </div>
              </div>

              <div className="flex items-center justify-between w-full text-xs font-semibold text-slate-400 group-hover:text-emerald-600 transition-colors">
                <span>{createTitle || `Add Entry`}</span>
                <span className="flex items-center gap-1">
                  Open <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Dynamic Loops rendering stored collection entries */}
        {entities?.map((item) => (
          <Link
            key={item.slug}
            href={`${entityViewBasePath}/${item.slug}`}
          >
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              {item.short && (
                <span className="rounded-xl bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                  {item.short}
                </span>
              )}

              <h3 className="mt-4 text-xl font-bold">
                {item.name}
              </h3>

              {item.headquarters && (
                <p className="mt-2 text-sm text-slate-500">
                  Headquarters: {item.headquarters}
                </p>
              )}

              <div className="mt-5 font-semibold text-emerald-600">
                Open →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}