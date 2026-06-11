export default function AdminPageHeader({
  title,
  description,
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {title}
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>

      <button
        onClick={onAction}
        className="rounded-xl bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700"
      >
        {actionLabel}
      </button>
    </div>
  );
}