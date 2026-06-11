
import Link from "next/link";
import { Plus, ArrowRight, Layers } from "lucide-react";

export default function EntityLandingPage({
  title,
  description,
  createHref,
  listHref,
  stats = [],
  shortCode,
  icon: IconComponent,
}) {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="px-1">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {title} Management
        </h1>
        <p className="mt-0.5 text-sm text-slate-500">
          {description}
        </p>
      </div>

      {/* Grid Container matching your dashboard layout card sizes */}
      <div className="max-w-3xl grid gap-4 sm:grid-cols-2">
        
        {/* Compact Create Card */}
        <Link href={createHref} className="group block">
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
              {/* Top Right Icon matching dashboard style */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 transition-transform duration-300 group-hover:scale-105">
                <Plus className="w-5 h-5 block" strokeWidth={2.5} />
              </div>
            </div>

            {/* Bottom Row Links */}
            <div className="flex items-center justify-between w-full text-xs font-semibold text-slate-400 group-hover:text-emerald-600 transition-colors">
              <span>Add {title.toLowerCase()}</span>
              <span className="flex items-center gap-1">
                Open <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </Link>

        {/* Compact Explore Card */}
        <Link href={listHref} className="group block">
          <div className="relative h-[130px] rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm">
            <div className="flex justify-between items-start w-full">
              <div>
                <p className="text-xs font-semibold text-lab(71 -49.4 33.41) uppercase tracking-wider">
                  {shortCode || "SYS"} Data
                </p>
                <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                  Explore {title}
                </h2>
              </div>
              {/* Top Right Icon matching dashboard style */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-lab(43 -4.7 -16.63) text-slate-600">
                {IconComponent ? (
                  <IconComponent className="w-5 h-5 block shrink-0" />
                ) : (
                  <Layers className="w-5 h-5 block shrink-0" />
                )}
              </div>
            </div>

            {/* Bottom Row Links */}
            <div className="flex items-center justify-between w-full text-xs font-semibold text-slate-400 group-hover:text-emerald-600 transition-colors">
              <span>Browse records</span>
              <span className="flex items-center gap-1">
                View <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </Link>

      </div>
    </div>
  );
}