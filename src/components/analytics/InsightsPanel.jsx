const insights = [
  {
    title: "Largest Division",
    value: "Sambhajinagar",
  },
  {
    title: "Highest Urbanization",
    value: "Konkan",
  },
  {
    title: "Most Talukas",
    value: "Sambhajinagar",
  },
  {
    title: "Most Villages",
    value: "Pune",
  },
];

export default function InsightsPanel() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold">
        Administrative Insights
      </h2>

      <div className="mt-8 grid gap-4">
        {insights.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl bg-slate-50 p-5"
          >
            <p className="text-sm text-slate-500">
              {item.title}
            </p>

            <h3 className="mt-2 text-xl font-bold text-emerald-600">
              {item.value}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}