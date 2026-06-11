import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";

export default function AdminDetailsPage({
  title,
  subtitle,
  data,
  basePath,
  stats = [],
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {title}
          </h1>

          <p className="text-slate-500">
            {subtitle}
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href={basePath}
            className="rounded-xl border px-4 py-2"
          >
            <ArrowLeft size={18} />
          </Link>

          <Link
            href={`${basePath}/villages/edit/${data.slug}`}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-white"
          >
            <Pencil size={18} />
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border bg-white p-5"
          >
            <p className="text-sm text-slate-500">
              {stat.title}
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">
          Information
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(data).map(
            ([key, value]) => (
              <div key={key}>
                <p className="text-sm text-slate-500 capitalize">
                  {key}
                </p>

                <p className="font-medium">
                  {String(value)}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}