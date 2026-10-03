export default function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-10 text-center">
      {eyebrow && <p className="text-brand-600 text-sm font-semibold uppercase tracking-wide mb-2">{eyebrow}</p>}
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="text-gray-500 mt-2 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}
