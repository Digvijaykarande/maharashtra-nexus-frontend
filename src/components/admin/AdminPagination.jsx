export default function AdminPagination({
  page,
  totalPages,
  setPage,
}) {
  return (
    <div className="flex items-center justify-end gap-2">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="rounded-lg border px-3 py-1"
      >
        Previous
      </button>

      <span className="text-sm">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="rounded-lg border px-3 py-1"
      >
        Next
      </button>
    </div>
  );
}