import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({
  items,
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
      {items.map((item, index) => (
        <div
          key={item.label}
          className="flex items-center gap-2"
        >
          {index > 0 && (
            <ChevronRight size={14} />
          )}

          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-emerald-600"
            >
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
        </div>
      ))}
    </div>
  );
}