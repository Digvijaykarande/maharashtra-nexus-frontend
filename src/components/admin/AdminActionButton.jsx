export default function AdminActionButton({
  title,
}) {
  return (
    <button
      className="
        rounded-xl
        border
        border-slate-200
        bg-white
        px-4
        py-3
        text-sm
        font-medium
        transition
        hover:border-emerald-300
        hover:bg-emerald-50
      "
    >
      {title}
    </button>
  );
}