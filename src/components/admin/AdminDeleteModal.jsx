"use client";

import { AlertTriangle } from "lucide-react";

export default function AdminDeleteModal({
  open,
  title,
  onClose,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        {/* Icon */}

        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle
              size={32}
              className="text-red-600"
            />
          </div>
        </div>

        {/* Title */}

        <h2 className="text-center text-2xl font-bold text-slate-900">
          Delete Record
        </h2>

        {/* Message */}

        <p className="mt-3 text-center text-slate-600">
          This action cannot be undone.
        </p>

        <p className="mt-2 text-center text-sm text-slate-500">
          Are you sure you want to delete
        </p>

        <div className="mt-3 rounded-xl bg-slate-100 p-3 text-center font-semibold text-slate-900">
          {title}
        </div>

        {/* Buttons */}

        <div style={{display:"flex",justifyContent:"space-around",marginTop:"20px"}}>
          <button
            onClick={onClose}
            style={{border:"2px solid rgba(0, 0, 0, 0.31)", borderRadius:"10px",padding:"10px",cursor:"pointer"}}
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            style={{color:"black",border:"2px solid #0000004f",borderRadius:"10px ",padding:"10px",cursor:"pointer"}}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}