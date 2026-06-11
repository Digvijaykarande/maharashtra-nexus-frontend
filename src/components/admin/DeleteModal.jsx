"use client";

export default function DeleteModal({
  open,
  title,
  onClose,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-bold text-slate-900">
          Delete Record
        </h2>

        <p className="mt-3 text-slate-600">
          Are you sure you want to delete
          <span className="font-semibold">
            {" "}
            {title}
          </span>
          ?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            style={{border:"2px solid rgba(0, 0, 0, 0.31)", borderRadius:"10px",padding:"10px"}}
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}