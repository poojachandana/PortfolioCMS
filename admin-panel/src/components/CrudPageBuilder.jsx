import { useEffect, useState } from 'react'
import Layout from './Layout'
import CrudTable from './CrudTable'
import FormField from './FormField'

/**
 * Generic, reusable CRUD page. Every simple content type (Skills, Projects,
 * Experience, Education, Services, Testimonials, Blog, Social Links) is a
 * thin config object passed into this builder, instead of duplicating
 * table/form boilerplate 8 times.
 *
 * fields: [{ name, label, type: 'text'|'textarea'|'number'|'checkbox'|'select'|'date', options?, tags? }]
 */
export default function CrudPageBuilder({ title, api, fields, columns, emptyItem }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null) // null = closed, {} = new, {...} = edit
  const [error, setError] = useState('')

  const load = () => {
    setLoading(true)
    api.list(true).then(setItems).catch(() => setError('Failed to load data')).finally(() => setLoading(false))
  }

  useEffect(load, [])

  const openNew = () => setEditing({ ...emptyItem })
  const openEdit = (row) => setEditing({ ...row })
  const closeForm = () => { setEditing(null); setError('') }

  const handleChange = (name, value) => setEditing((prev) => ({ ...prev, [name]: value }))

  const handleSave = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const payload = { ...editing }
      if (editing.id) {
        await api.update(editing.id, payload)
      } else {
        await api.create(payload)
      }
      closeForm()
      load()
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed')
    }
  }

  const handleDelete = async (row) => {
    if (!confirm(`Delete "${row.title || row.name || row.company || row.authorName || 'this item'}"?`)) return
    await api.remove(row.id)
    load()
  }

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-500 text-sm">Manage {title.toLowerCase()} shown on the public portfolio.</p>
        </div>
        <button onClick={openNew} className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium px-4 py-2 rounded-md">
          + Add {title.replace(/s$/, '')}
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading…</p>
      ) : (
        <CrudTable columns={columns} rows={items} onEdit={openEdit} onDelete={handleDelete} />
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-lg font-bold mb-4">{editing.id ? 'Edit' : 'New'} {title.replace(/s$/, '')}</h2>
            {error && <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</div>}
            <form onSubmit={handleSave}>
              {fields.map((f) => (
                <FormField key={f.name} label={f.label}>
                  {f.type === 'textarea' ? (
                    <textarea
                      rows={4}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                      value={editing[f.name] ?? ''}
                      onChange={(e) => handleChange(f.name, e.target.value)}
                    />
                  ) : f.type === 'checkbox' ? (
                    <input
                      type="checkbox"
                      checked={!!editing[f.name]}
                      onChange={(e) => handleChange(f.name, e.target.checked)}
                      className="h-4 w-4"
                    />
                  ) : f.type === 'select' ? (
                    <select
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                      value={editing[f.name] ?? ''}
                      onChange={(e) => handleChange(f.name, e.target.value)}
                    >
                      {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : f.type === 'tags' ? (
                    <input
                      type="text"
                      placeholder="Comma-separated, e.g. React, Node.js, PostgreSQL"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                      value={(editing[f.name] || []).join(', ')}
                      onChange={(e) => handleChange(f.name, e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
                    />
                  ) : (
                    <input
                      type={f.type || 'text'}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                      value={editing[f.name] ?? ''}
                      onChange={(e) => handleChange(f.name, f.type === 'number' ? Number(e.target.value) : e.target.value)}
                    />
                  )}
                </FormField>
              ))}
              <div className="flex justify-end gap-2 mt-6">
                <button type="button" onClick={closeForm} className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm rounded-md bg-brand-600 hover:bg-brand-700 text-white font-medium">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  )
}
