import Link from "next/link";
import {
  ArrowLeft,
  Pencil,
  School,
  Building2,
} from "lucide-react";

import { schools } from "@/data/schools";

export default async function SchoolDetailsPage({
  params,
}) {
  const { slug } = await params;

  const school = schools.find(
    (s) => s.slug === slug
  );

  if (!school) {
    return (
      <div className="p-6">
        School Not Found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {school.name}
          </h1>

          <p className="text-slate-500">
            School Details
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/admin/schools"
            className="rounded-xl border px-4 py-2"
          >
            <ArrowLeft size={18} />
          </Link>

          <Link
            href={`/admin/schools/edit/${school.slug}`}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-white"
          >
            <Pencil size={18} />
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border p-6">
          <School className="mb-3 text-emerald-600" />

          <h3 className="font-semibold">
            Board
          </h3>

          <p>{school.board}</p>
        </div>

        <div className="rounded-2xl border p-6">
          <Building2 className="mb-3 text-blue-600" />

          <h3 className="font-semibold">
            Medium
          </h3>

          <p>{school.medium}</p>
        </div>
      </div>

      <div className="rounded-2xl border p-6">
        <h2 className="mb-4 text-lg font-semibold">
          Information
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Info
            label="District"
            value={school.district}
          />

          <Info
            label="Taluka"
            value={school.taluka}
          />

          <Info
            label="Village"
            value={school.village}
          />

          <Info
            label="Address"
            value={school.address}
          />
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="font-medium">
        {value}
      </p>
    </div>
  );
}