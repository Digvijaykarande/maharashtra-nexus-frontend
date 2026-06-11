import { Database } from "lucide-react";

export default function AdminEmptyState({
  title = "No Data Found",
  description = "There are no records available.",
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 py-16 text-center">
      <Database className="mb-3 h-10 w-10 text-slate-400" />

      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
        {title}
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
}