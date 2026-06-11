export default function AdminStatusBadge({ status }) {
  const styles = {
    Active:
      "bg-emerald-100 text-emerald-700",
    Inactive:
      "bg-red-100 text-red-700",
    Pending:
      "bg-amber-100 text-amber-700",
  };

  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-medium ${
        styles[status] || "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}