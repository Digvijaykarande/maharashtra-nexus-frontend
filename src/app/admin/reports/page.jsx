"use client";

import { useState } from "react";
import {
  FileText,
  FileSpreadsheet,
  FileDown,
  Download,
  Calendar,
  BarChart3,
  Loader2
} from "lucide-react";
import { geoService } from "@/services/geoService";
import toast from "react-hot-toast";

export default function ReportsPage() {
  const [downloadingReport, setDownloadingReport] = useState(null);

  const reportConfigs = [
    {
      id: "divisions",
      title: "Division Report",
      description: "Administrative overview and count matrices of Maharashtra divisions.",
      icon: FileText,
      fetchFn: geoService.getAllDivisions
    },
    {
      id: "districts",
      title: "District Report",
      description: "District-wise statistics, layout configurations, and infrastructure nodes.",
      icon: FileText,
      fetchFn: geoService.getAllDistricts
    },
    {
      id: "talukas",
      title: "Taluka Report",
      description: "Taluka administrative clusters and aggregate management parameters.",
      icon: FileText,
      fetchFn: geoService.getAllTalukas
    },
    {
      id: "villages",
      title: "Village Population Report",
      description: "Micro-demographic population and census breakdowns across rural zones.",
      icon: BarChart3,
      fetchFn: geoService.getAllVillages
    },
    {
      id: "cities",
      title: "City Infrastructure Report",
      description: "Urban development demographics and municipality parameters.",
      icon: FileSpreadsheet,
      fetchFn: geoService.getAllCities
    },
    {
      id: "towns",
      title: "Town Layout Report",
      description: "Semi-urban infrastructure node statistics and populations.",
      icon: FileSpreadsheet,
      fetchFn: geoService.getAllTowns
    },
  ];

  // 🛠️ The Core Engine: Client-side CSV Builder & Downloader
  const executeExport = async (report, format) => {
    if (!report.fetchFn) {
      return toast.error(`${report.title} query gateway is not wired in geoService.`);
    }

    const loaderKey = `${report.id}-${format}`;
    setDownloadingReport(loaderKey);
    toast.loading(`Querying live production datasets for ${report.title}...`, { id: loaderKey });

    try {
      // 1. Fetch live collection array from Render cloud backend
      const response = await report.fetchFn();
      const rawData = response?.data || response || [];

      if (!Array.isArray(rawData) || rawData.length === 0) {
        throw new Error("No database records found in this targeted infrastructure cluster.");
      }

      // 2. Clean up Mongoose inner descriptors (__v, _id) for a professional spreadsheet
      const sanitizedData = rawData.map(({ _id, __v, password, ...rest }) => rest);

      // 3. Extract safe structured headers
      const headers = Object.keys(sanitizedData[0]);
      
      // 4. Transform records array into standard CSV row structures
      const csvRows = [
        headers.join(","), // Header row
        ...sanitizedData.map(row => 
          headers.map(headerField => {
            const val = row[headerField] === null || row[headerField] === undefined ? "" : row[headerField];
            // Escape inner commas or quotation marks to keep spreadsheet parsing valid
            const stringified = typeof val === "object" ? JSON.stringify(val) : String(val);
            return `"${stringified.replace(/"/g, '""')}"`;
          }).join(",")
        )
      ].join("\n");

      // 5. Convert text block to a secure download trigger Blob URL
      const blob = new Blob([csvRows], { type: "text/csv;charset=utf-8;" });
      const dlLink = document.createElement("a");
      const url = URL.createObjectURL(blob);
      
      const fileExtension = format === "excel" ? "csv" : "csv"; // Both stream natively into spreadsheet software
      const dateString = new Date().toISOString().slice(0, 10);

      dlLink.setAttribute("href", url);
      dlLink.setAttribute("download", `${report.id}_report_${dateString}.${fileExtension}`);
      dlLink.style.visibility = "hidden";
      
      document.body.appendChild(dlLink);
      dlLink.click();
      document.body.removeChild(dlLink);

      toast.success(`${report.title} exported to your downloads folder!`, { id: loaderKey });
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Cloud pipeline aggregation timeout", { id: loaderKey });
    } finally {
      setDownloadingReport(null);
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto p-1">
      {/* Header Container */}
      <div className="py-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Reports</h1>
        <p className="mt-0.5 text-sm font-medium text-slate-500">
          Query live database layers and export structured datasets for localized analysis.
        </p>
      </div>

      {/* Export Format Highlights */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5">
          <FileDown className="mb-3 text-blue-600" size={24} />
          <h3 className="font-bold text-slate-900 text-base">On-Demand Stream</h3>
          <p className="mt-1 text-xs font-medium text-slate-400 leading-relaxed">
            Direct read-pipe pulling from live production Atlas shards without overhead caches.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5">
          <FileSpreadsheet className="mb-3 text-emerald-600" size={24} />
          <h3 className="font-bold text-slate-900 text-base">Excel Ready</h3>
          <p className="mt-1 text-xs font-medium text-slate-400 leading-relaxed">
            Pre-escaped column parameters designed to auto-parse inside Office sheets flawlessly.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5">
          <Download className="mb-3 text-amber-600" size={24} />
          <h3 className="font-bold text-slate-900 text-base">Raw CSV Delivery</h3>
          <p className="mt-1 text-xs font-medium text-slate-400 leading-relaxed">
            Lightweight raw data configurations perfectly optimized for GIS mapping software imports.
          </p>
        </div>
      </div>

      {/* Structured Reports Control Cards Grid */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {reportConfigs.map((report) => {
          const Icon = report.icon;
          const isPdfLoading = downloadingReport === `${report.id}-pdf`;
          const isExcelLoading = downloadingReport === `${report.id}-excel`;

          return (
            <div key={report.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between hover:border-emerald-300 transition-all duration-200">
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-slate-600">
                  <Icon size={18} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg tracking-tight">{report.title}</h3>
                <p className="mt-1.5 text-xs font-medium text-slate-400 leading-relaxed min-h-[36px]">
                  {report.description}
                </p>
              </div>

              {/* Action Buttons Tray */}
              <div className="mt-6 flex gap-2">
                <button
                  onClick={() => executeExport(report, "pdf")}
                  disabled={downloadingReport !== null}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-3 py-2.5 text-xs font-bold text-white transition duration-150 hover:bg-slate-800 disabled:opacity-50 cursor-pointer"
                >
                  {isPdfLoading ? <Loader2 size={13} className="animate-spin" /> : <FileDown size={13} />}
                  CSV File
                </button>

                <button
                  onClick={() => executeExport(report, "excel")}
                  disabled={downloadingReport !== null}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-700 transition duration-150 hover:bg-slate-50 disabled:opacity-50 cursor-pointer"
                >
                  {isExcelLoading ? <Loader2 size={13} className="animate-spin" /> : <FileSpreadsheet size={13} />}
                  Excel Sheet
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Backend Action Schedule Notice Block */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <Calendar className="text-emerald-600" size={18} />
          <h2 className="font-bold text-slate-900 text-base">Automated Chrono Scheduling</h2>
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs font-semibold text-slate-500 leading-relaxed">
          Daily administrative spreadsheet backups sync systematically to cloud storage storage channels automatically at 00:00 IST.
        </div>
      </div>
    </div>
  );
}