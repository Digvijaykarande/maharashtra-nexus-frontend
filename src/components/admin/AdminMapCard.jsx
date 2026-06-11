"use client";

import {
  MapPinned,
  Navigation,
} from "lucide-react";

import VillageMapWrapper from "@/components/maps/VillageMapWrapper";

export default function AdminMapCard({
  title,
  lat,
  lng,
  slug,
  placeName,
  mode = "single",
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-100 p-5">

        <div>

          <div className="flex items-center gap-2">

            <MapPinned
              size={18}
              className="text-emerald-500"
            />

            <span className="text-sm font-medium text-slate-500">
              Geographic Overview
            </span>

          </div>

          <h2 className="mt-2 text-xl font-bold">
            {title}
          </h2>

        </div>

        <div className="rounded-2xl bg-emerald-50 p-3">
          <Navigation
            size={22}
            className="text-emerald-600"
          />
        </div>

      </div>

      {/* Map */}

      <div className="h-[380px]">

        <VillageMapWrapper
          lat={lat}
          lng={lng}
          divisionSlug={slug}
          placeName={placeName}
          mode={mode}
        />

      </div>

      {/* Footer */}

      <div className="flex items-center justify-between border-t border-slate-100 p-5">

        <div>

          <p className="text-xs uppercase tracking-wider text-slate-400">
            Location
          </p>

          <p className="font-medium text-slate-700">
            {placeName}
          </p>

        </div>

        <div className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600">
          Maharashtra GIS
        </div>

      </div>

    </div>
  );
}