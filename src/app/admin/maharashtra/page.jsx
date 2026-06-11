import Link from "next/link";
import AdminMapCard from "@/components/admin/AdminMapCard";
import {
  MapPinned,
  ArrowRight,
  Building2,
  Landmark,
} from "lucide-react";

export default function MaharashtraPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 antialiased">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        
        {/* Compact Compact Header */}
        <header className="mb-8 flex flex-col justify-between gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              <MapPinned size={14} />
              Administrative Network
            </div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Maharashtra
            </h1>
            <p className="mt-1 max-w-xl text-sm text-slate-500">
              Explore divisions, districts, talukas, and infrastructure via a unified platform.
            </p>
          </div>
        </header>

        {/* Main Card */}
        <main className="mx-auto max-w-4xl">
          <Link href="/admin/divisions" className="block group">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md">
              
              {/* Card Top Header */}
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 p-5">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Administrative Entry Point
                  </p>
                  <h2 className="text-xl font-bold text-slate-800">
                    Maharashtra Overview
                  </h2>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <MapPinned size={20} />
                </div>
              </div>

              {/* Map Container - Tighter Height */}
              <div className="p-5">
                <div className="h-[460px] overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                  <AdminMapCard
                    title="Maharashtra"
                    lat={19.7515}
                    lng={75.7139}
                    slug="maharashtra"
                    placeName="Maharashtra State"
                    mode="state"
                  />
                </div>
              </div>

              {/* Footer Stats Grid */}
              <div className="grid divide-y divide-slate-100 border-t border-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                
                {/* Stat 1 */}
                <div className="flex items-center gap-3.5 p-5">
                  <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
                    <Building2 size={18} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-slate-900 leading-tight">6</p>
                    <p className="text-xs font-medium text-slate-400">Divisions</p>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="flex items-center gap-3.5 p-5">
                  <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                    <Landmark size={18} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-slate-900 leading-tight">36</p>
                    <p className="text-xs font-medium text-slate-400">Districts</p>
                  </div>
                </div>

                {/* Navigation Action */}
                <div className="flex items-center justify-between bg-slate-50/30 p-5 transition-colors group-hover:bg-emerald-50/20">
                  <div>
                    <p className="text-xs font-medium text-slate-400">Action</p>
                    <p className="font-semibold text-slate-800 text-sm">
                      Open Management Portal
                    </p>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                    <ArrowRight
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                      size={16}
                    />
                  </div>
                </div>

              </div>

            </div>
          </Link>
        </main>

      </div>
    </div>
  );
}