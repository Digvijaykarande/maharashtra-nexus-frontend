"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import DeleteModal from "./AdminDeleteModal";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

export default function AdminManagementPage({
  title,
  description,
  data,
  columns,
  stats = [],
  basePath,
}) {
  const [search, setSearch] = useState("");
  const [deleteItem, setDeleteItem] = useState(null);
  
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, data]);

  return (
    <div className="space-y-6">
      {/* Header Container */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-1 py-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {title}
          </h1>
          <p className="mt-0.5 text-sm text-slate-500">
            {description}
          </p>
        </div>

        <Link
          href={`${basePath}/create`}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2.5 text-sm font-semibold text-emerald-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-100 hover:shadow"
        >
          <Plus size={16} />
          Add {title.endsWith("s") ? title.slice(0, -1) : title}
        </Link>
      </div>

      {/* Dynamic Banner Stats Layout */}
      {stats.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-xs font-medium text-slate-500">
                {stat.title}
              </p>
              <h3 className="mt-1 text-2xl font-bold text-slate-900">
                {stat.value}
              </h3>
            </div>
          ))}
        </div>
      )}

      {/* Filter and Search Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder={`Search ${title.toLowerCase()}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-900 outline-none transition duration-200 focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Unified Table Module */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-semibold uppercase tracking-wider text-slate-500">
                {columns.map((column) => (
                  <th key={column} className="px-6 py-3.5">
                    {column}
                  </th>
                ))}
                <th className="px-6 py-3.5 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredData.map((item) => (
                <tr
                  key={item.slug || item.id}
                  className="group transition-colors duration-150 hover:bg-slate-50/60"
                >
                  {columns.map((column, index) => (
                    <td key={column} className="px-6 py-4 text-slate-700">
                      {index === 0 ? (
                        <Link
                          href={`${basePath}/${item.slug}`}
                          className="font-semibold text-slate-900 hover:text-emerald-600 hover:underline transition-colors"
                        >
                          {item[column]}
                        </Link>
                      ) : (
                        item[column]
                      )}
                    </td>
                  ))}

                  {/* Actions Column Controls */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-1.5">
                      <Link
                        href={`${basePath}/${item.slug}`}
                        className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-blue-50 hover:text-blue-600"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </Link>

                      <Link
                        href={`${basePath}/edit/${item.slug}`}
                        className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-amber-50 hover:text-amber-600"
                        title="Edit Record"
                      >
                        <Pencil size={16} />
                      </Link>

                      <button
                        onClick={() => setDeleteItem(item)}
                        className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 cursor-pointer"
                        title="Delete Record"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {/* Zero-State Layout Flag */}
              {!filteredData.length && (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="py-12 text-center text-sm text-slate-400"
                  >
                    No records found matching your current layout filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Item Handle Sheet */}
      <DeleteModal
        open={!!deleteItem}
        title={`${
          title.endsWith("s") ? title.slice(0, -1) : title
        }: ${deleteItem?.name || ""}`}
        onClose={() => setDeleteItem(null)}
        onConfirm={async () => {
  const itemSlug = deleteItem?.slug || deleteItem?.id;
  try {
    if (title.toLowerCase().includes("college")) {
      await entityService.deleteCollege(itemSlug);
    } else if (title.toLowerCase().includes("hospital")) {
      await entityService.deleteHospital(itemSlug);
    } else if (title.toLowerCase().includes("school")) {
      await entityService.deleteSchool(itemSlug);
    }
    
    toast.success(`${deleteItem?.name || 'Record'} deleted successfully`);
    setDeleteItem(null);
    window.location.reload(); // Refresh the list layout view safely
  } catch (err) {
    toast.error(err.message || "Failed to delete record");
  }
}}
      />
    </div>
  );
}