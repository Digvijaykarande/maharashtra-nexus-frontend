"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Save, Plus, Loader2 } from "lucide-react";

export default function EntityForm({
  title,
  mode = "create",
  initialData = {},
  redirectPath,
  fields,
  onSubmitAction, // Added callback prop to execute network mutations easily
}) {
  const router = useRouter();
  const [form, setForm] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (onSubmitAction) {
        // Trigger live database write hook
        await onSubmitAction(form);
      } else {
        // Fallback fallback processing simulation loop
        console.log("Mock submit tracking:", form);
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      toast.success(
        `${title} ${mode === "create" ? "created" : "updated"} successfully`,
        { duration: 3000 }
      );
      
      router.push(redirectPath);
      router.refresh(); // Tells Next.js to pull fresh list views
    } catch (err) {
      toast.error(err.message || "Failed to update record details");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-4 animate-fadeIn">
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 md:p-8"
      >
        <div className="mb-6 border-b border-slate-100 pb-4">
          <h1 className="text-2xl font-bold text-slate-900">
            {mode === "create" ? `Create New ${title}` : `Modify ${title} Parameters`}
          </h1>
          <p className="mt-0.5 text-xs text-slate-400">
            Fill out the administrative profile metrics required down below.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {(fields || []).map((field) => {
            const isTextarea = field.type === "textarea";
            return (
              <div key={field.name} className={`space-y-1.5 ${isTextarea ? "md:col-span-2" : ""}`}>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  {field.label}
                  {field.required && <span className="text-red-500"> *</span>}
                </label>

                {isTextarea ? (
                  <textarea
                    name={field.name}
                    value={form[field.name] || ""}
                    onChange={handleChange}
                    rows={4}
                    required={field.required}
                    placeholder={`Provide comprehensive detail regarding this ${title.toLowerCase()}...`}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition duration-200 focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500"
                  />
                ) : (
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={form[field.name] || ""}
                    onChange={handleChange}
                    required={field.required}
                    placeholder={`Enter ${field.label.toLowerCase()}...`}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition duration-200 focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500"
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="cursor-pointer rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition duration-150 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md disabled:pointer-events-none disabled:opacity-75"
          >
            {isSubmitting ? (
              <><Loader2 size={16} className="animate-spin" />Processing...</>
            ) : mode === "create" ? (
              <><Plus size={16} />Create Record</>
            ) : (
              <><Save size={16} />Save Updates</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}