import Link from "next/link";

const entities = [
  "Divisions",
  "Districts",
  "Talukas",
  "Villages",
  "Cities",
  "Towns",
  "Hospitals",
  "Schools",
  "Colleges",
];

export default function InsertPage() {
  return (
    <div>

      <h1 className="text-4xl font-bold">
        Insert Data
      </h1>

      <p className="mt-2 text-slate-500">
        Select what you want to create.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {entities.map((entity) => (
          <Link
            key={entity}
            href={`/admin/${entity.toLowerCase()}`}
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-bold">
              {entity}
            </h2>

            <p className="mt-3 text-slate-500">
              Create new {entity.slice(0, -1)}
            </p>
          </Link>
        ))}

      </div>

    </div>
  );
}