"use client";

import {
  FileText,
  FileSpreadsheet,
  FileDown,
  Download,
  Calendar,
  BarChart3,
} from "lucide-react";

const reports = [
  {
    title: "Division Report",
    description:
      "Administrative overview of Maharashtra divisions.",
    icon: FileText,
  },
  {
    title: "District Report",
    description:
      "District-wise statistics and infrastructure.",
    icon: FileText,
  },
  {
    title: "Taluka Report",
    description:
      "Taluka administrative and demographic data.",
    icon: FileText,
  },
  {
    title: "Population Report",
    description:
      "Population records across villages, cities and towns.",
    icon: BarChart3,
  },
  {
    title: "Hospital Report",
    description:
      "Healthcare institutions and capacity analysis.",
    icon: FileSpreadsheet,
  },
  {
    title: "School Report",
    description:
      "Education infrastructure and distribution.",
    icon: FileSpreadsheet,
  },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header Container */}
      <div className="px-1 py-2">
        <h1 className="text-2xl font-bold text-slate-900">
          Reports
        </h1>
        <p className="mt-0.5 text-sm text-slate-500">
          Generate and export administrative reports
        </p>
      </div>

      {/* Export Summary Analytics Layer */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <FileDown className="mb-3 text-emerald-600" size={24} />
          <h3 className="font-semibold text-slate-900">
            PDF Reports
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Download printable reports.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <FileSpreadsheet className="mb-3 text-emerald-600" size={24} />
          <h3 className="font-semibold text-slate-900">
            Excel Export
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Export datasets for analysis.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <Download className="mb-3 text-emerald-600" size={24} />
          <h3 className="font-semibold text-slate-900">
            CSV Export
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Lightweight export format.
          </p>
        </div>
      </div>

      {/* Structured Reports Control Cards Grid */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {reports.map((report) => {
          const Icon = report.icon;

          return (
            <div
              key={report.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Icon size={20} />
              </div>

              <h3 className="font-bold text-slate-900">
                {report.title}
              </h3>

              <p className="mt-1 text-sm text-slate-500 min-h-[40px]">
                {report.description}
              </p>

              {/* Download Trigger Buttons Tray */}
              <div className="mt-5 flex gap-2">
                <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition duration-150 hover:bg-emerald-700 cursor-pointer">
                  <FileDown size={15} />
                  PDF
                </button>

                <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition duration-150 hover:bg-slate-50 cursor-pointer">
                  <FileSpreadsheet size={15} />
                  Excel
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Backend Action Schedule Notice Block */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Calendar className="text-emerald-600" size={20} />
          <h2 className="font-bold text-slate-900">
            Scheduled Reports
          </h2>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
          <p className="text-sm text-slate-600 leading-relaxed">
            Scheduled report generation will be available after backend integration.
          </p>
        </div>
      </div>
    </div>
  );
}