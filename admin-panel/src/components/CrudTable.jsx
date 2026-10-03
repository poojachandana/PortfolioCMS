export default function CrudTable({ columns, rows, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-left text-gray-500 uppercase text-xs">
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="px-4 py-3 font-semibold">{c.label}</th>
            ))}
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.length === 0 && (
            <tr><td colSpan={columns.length + 1} className="px-4 py-6 text-center text-gray-400">No records yet.</td></tr>
          )}
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {columns.map((c) => (
                <td key={c.key} className="px-4 py-3 align-top">{c.render ? c.render(row) : row[c.key]}</td>
              ))}
              <td className="px-4 py-3 text-right whitespace-nowrap">
                <button onClick={() => onEdit(row)} className="text-brand-600 hover:underline mr-3">Edit</button>
                <button onClick={() => onDelete(row)} className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
