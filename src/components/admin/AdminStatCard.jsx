export default function AdminStatCard({
  title,
  value,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">

      <p className="text-black">
        {title}
      </p>

      <h3 className="mt-3 text-4xl font-bold">
        {value}
      </h3>

    </div>
  );
}