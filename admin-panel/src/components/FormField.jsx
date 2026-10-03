export default function FormField({ label, children }) {
  return (
    <label className="block mb-4">
      <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>
      {children}
    </label>
  )
}
