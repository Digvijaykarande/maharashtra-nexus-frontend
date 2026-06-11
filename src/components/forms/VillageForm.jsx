"use client";

import { Save } from "lucide-react";

export default function VillageForm({
  initialData = {},
  mode = "create",
}) {
  return (
    <form className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-5 text-lg font-semibold">
          Village Information
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Village Name"
            defaultValue={initialData.name}
          />

          <Field
            label="Division"
            defaultValue={initialData.division}
          />

          <Field
            label="District"
            defaultValue={initialData.district}
          />

          <Field
            label="Taluka"
            defaultValue={initialData.taluka}
          />

          <Field
            label="Population"
            defaultValue={initialData.population}
            type="number"
          />

          <Field
            label="Male Population"
            defaultValue={initialData.malePopulation}
            type="number"
          />

          <Field
            label="Female Population"
            defaultValue={initialData.femalePopulation}
            type="number"
          />

          <Field
            label="Schools"
            defaultValue={initialData.schools}
            type="number"
          />

          <Field
            label="Hospitals"
            defaultValue={initialData.hospitals}
            type="number"
          />

          <Field
            label="Colleges"
            defaultValue={initialData.colleges}
            type="number"
          />

          <Field
            label="Latitude"
            defaultValue={initialData.latitude}
          />

          <Field
            label="Longitude"
            defaultValue={initialData.longitude}
          />
        </div>

        <div className="mt-4">
          <label className="mb-2 block text-sm font-medium">
            Address
          </label>

          <textarea
            rows={4}
            defaultValue={initialData.address}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700"
        >
          <Save size={18} />

          {mode === "edit"
            ? "Update Village"
            : "Create Village"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  defaultValue,
  type = "text",
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-slate-200 px-4 py-2 dark:border-slate-700 dark:bg-slate-800"
      />
    </div>
  );
}