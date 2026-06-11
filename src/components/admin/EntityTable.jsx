"use client";

import Link from "next/link";
import { useState } from "react";

import DeleteModal from "@/components/admin/AdminDeleteModal";

export default function EntityTable({
  title,
  data,
  createHref,
  editBasePath,
  viewBasePath,
}) {
  const [openDeleteModal, setOpenDeleteModal] =
    useState(false);

  const [selectedItem, setSelectedItem] =
    useState(null);

  const handleDelete = () => {
    console.log("Deleting:", selectedItem);

    setOpenDeleteModal(false);
  };

  return (
    <div>
      {/* Header */}

      <div className="mb-10 flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold">
            {title}
          </h1>

          <p className="mt-2 text-slate-500">
            Manage all {title.toLowerCase()}
          </p>
        </div>
      </div>
      {/* Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Link href={createHref}>
            <div className="rounded-3xl border-2 border-dashed border-emerald-300 bg-white p-8 hover:border-emerald-500">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-3xl text-white">
                  +
                </div>

                <h3 className="mt-4 font-bold">
                  Create New {title.slice(0, -1)}
                </h3>
              </div>
            </div>
          </Link>
        {data.map((item) => (
        <Link
                href={`${viewBasePath}/${item.slug}`}
                className="font-semibold text-emerald-600"
              >
          <div
            key={item.slug}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            
            {/* Top */}

            <div className="flex items-start justify-between">

              <div>

                {item.short && (
                  <span className="rounded-xl bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                    {item.short}
                  </span>
                )}

                <h2 className="mt-4 text-2xl font-bold text-slate-900">
                  {item.name}
                </h2>

                {item.headquarters && (
                  <p className="mt-2 text-sm text-slate-500">
                    Headquarters: {item.headquarters}
                  </p>
                )}

              </div>

              <div className="text-3xl">
                🏢
              </div>

            </div>

            {/* Description */}

            {item.description && (
              <p className="mt-4 line-clamp-3 text-sm text-slate-600">
                {item.description}
              </p>
            )}

            {/* Dynamic Stats */}

            <div className="mt-6 grid grid-cols-3 gap-3">

              {Object.entries(item)
                .filter(
                  ([key]) =>
                    ![
                      "id",
                      "slug",
                      "short",
                      "name",
                      "headquarters",
                      "description",
                    ].includes(key)
                )
                .map(([key, value]) => (
                  
                  <div
                    key={key}
                    className="rounded-2xl bg-slate-100 p-3 text-center"
                  >
                    <div className="text-lg font-bold">
                      {value}
                    </div>

                    <div className="text-xs capitalize text-slate-500">
                      {key}
                    </div>
                  </div>
                ))}
            </div>

            {/* Actions */}

            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-3">

                <Link
                  href={`${editBasePath}/${item.slug}`}
                  className="text-blue-600"
                >
                  Edit
                </Link>

                <button
                  className="text-red-600"
                >
                  Delete
                </button>

              </div>

            </div>
          </div>
          </Link>
        ))}
        
      </div>

      <DeleteModal
        open={openDeleteModal}
        title={selectedItem?.name}
        onClose={() =>
          setOpenDeleteModal(false)
        }
        onConfirm={handleDelete}
      />
      
    </div>
  );
}