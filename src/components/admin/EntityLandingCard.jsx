import Link from "next/link";

export default function EntityLandingCard({
  title,
  description,
  createHref,
  listHref,
  stats,
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-2">

      {/* Create Card */}

      <Link href={createHref}>

        <div className="flex h-[340px] cursor-pointer items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-white hover:border-emerald-500 hover:bg-emerald-50 transition">

          <div className="text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-5xl text-white">
              +
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              Create New {title}
            </h3>

          </div>

        </div>

      </Link>

      {/* Stats Card */}

      <Link href={listHref}>

        <div className="h-[360px] rounded-3xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-lg transition">

          <h2 className="text-4xl font-bold">
            {title}
          </h2>

          <p className="mt-4 text-slate-500">
            {description}
          </p>

          <div className="mt-5 grid grid-cols-3 gap-4">

            {Object.entries(stats).map(([key, value]) => (
              <div
                key={key}
                className="rounded-2xl bg-slate-100 p-4 text-center"
              >
                <h3 className="text-2xl font-bold">
                  {value}
                </h3>

                <p className="text-sm text-slate-500 capitalize">
                  {key}
                </p>
              </div>
            ))}

          </div>

          <div className="mt-4 font-semibold text-emerald-600">
            Explore {title} →
          </div>

        </div>

      </Link>

    </div>
  );
}