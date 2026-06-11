"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { navLinks } from "./NavLinks";

export default function MobileMenu({ open, setOpen }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40"
      onClick={() => setOpen(false)}
    >
      <div
        className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="font-semibold text-slate-900">
            Menu
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="text-slate-800"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-5 p-5">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-medium text-slate-700 hover:text-emerald-500"
            >
              {link.title}
            </Link>
          ))}

          <Link
            href="/search"
            onClick={() => setOpen(false)}
            className="font-medium text-slate-700 hover:text-emerald-500"
          >
            Search
          </Link>

          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="mt-4 rounded-xl bg-emerald-500 px-4 py-3 text-center font-medium text-white hover:bg-emerald-600"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
}