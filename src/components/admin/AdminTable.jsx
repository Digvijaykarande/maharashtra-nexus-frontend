export default function AdminTable({
  title,
  columns,
  data,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 p-5 bg-white">
        <h2 className="text-xl font-bold text-slate-900">
          {title}
        </h2>

        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-100 hover:shadow">
          Add New
        </button>
      </div>

      {/* Table Layer Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          
          <thead className="bg-slate-50/70 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-6 py-3.5 capitalize"
                >
                  {column}
                </th>
              ))}
              <th className="px-6 py-3.5">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-sm">
            {data.map((item, index) => (
              <tr
                key={index}
                className="transition-colors duration-150 hover:bg-slate-50/60"
              >
                {columns.map((column) => (
                  <td
                    key={column}
                    className="px-6 py-4 text-slate-700"
                  >
                    {item[column]}
                  </td>
                ))}

                {/* Styled Actions Controls Column */}
                <td className="px-6 py-4">
                  <div className="flex gap-1.5">
                    
                    <button className="rounded-lg px-2.5 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-600 cursor-pointer">
                      View
                    </button>

                    <button className="rounded-lg px-2.5 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-amber-50 hover:text-amber-600 cursor-pointer">
                      Edit
                    </button>

                    <button className="rounded-lg px-2.5 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600 cursor-pointer">
                      Delete
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}