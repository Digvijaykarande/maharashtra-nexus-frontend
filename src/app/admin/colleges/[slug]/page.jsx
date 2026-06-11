import Link from "next/link";
import {
  HeartPulse,
  Pencil,
  ArrowLeft,
  Bed,
} from "lucide-react";

import { colleges } from "@/data/colleges";

export default async function CollegeDetailsPage({
  params,
}) {
  const { slug } = await params;

  const college = colleges.find(
    (c) => c.slug === slug
  );

  if (!college  ) {
    return (
      <div className="p-6">
        College Not Found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {college.name}
          </h1>

          <p className="text-slate-500">
            College Details
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/admin/colleges"
            className="rounded-xl border px-4 py-2"
          >
            <ArrowLeft size={18} />
          </Link>

          <Link
            href={`/admin/colleges/edit/${college.slug}`}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-white"
          >
            <Pencil size={18} />
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border p-6">
          <HeartPulse className="mb-3 text-red-500" />

          <h3 className="font-semibold">
            Hospital Type
          </h3>

          <p>{college.stream}</p>
        </div>

        <div className="rounded-2xl border p-6">
          <Bed className="mb-3 text-blue-500" />

          <h3 className="font-semibold">
            Total Beds
          </h3>

          <p>{college.beds}</p>
        </div>
      </div>

      <div className="rounded-2xl border p-6">
        <h2 className="mb-4 text-lg font-semibold">
          Information
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Info
            label="District"
            value={college.district}
          />

          <Info
            label="Taluka"
            value={college.taluka}
          />

          <Info
            label="Village"
            value={college.village}
          />

          <Info
            label="Address"
            value={college.address}
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