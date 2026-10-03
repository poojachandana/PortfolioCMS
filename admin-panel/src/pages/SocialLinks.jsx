import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import CrudTable from '../components/CrudTable'
import FormField from '../components/FormField'
import { socialLinksApi } from '../api/content'

export default function SocialLinks() {
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const empty = { platform: '', url: '', iconUrl: '', displayOrder: 0 }

  const load = () => socialLinksApi.list().then(setItems)
  useEffect(() => { load() }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    if (editing.id) await socialLinksApi.update(editing.id, editing)
    else await socialLinksApi.create(editing)
    setEditing(null)
    load()
  }

  const handleDelete = async (row) => {
    if (!confirm(`Delete ${row.platform} link?`)) return
    await socialLinksApi.remove(row.id)
    load()
  }

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Social Links</h1>
          <p className="text-gray-500 text-sm">Links shown in your portfolio's footer/header.</p>
        </div>
        <button onClick={() => setEditing({ ...empty })} className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium px-4 py-2 rounded-md">
          + Add Link
        </button>
      </div>
      <CrudTable
        columns={[{ key: 'platform', label: 'Platform' }, { key: 'url', label: 'URL' }]}
        rows={items}
        onEdit={(r) => setEditing({ ...r })}
        onDelete={handleDelete}
      />
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold mb-4">{editing.id ? 'Edit' : 'New'} Social Link</h2>
            <form onSubmit={handleSave}>
              <FormField label="Platform">
                <input className="w-full border border-gray-300 rounded-md px-3 py-2" value={editing.platform} onChange={(e) => setEditing({ ...editing, platform: e.target.value })} required />
              </FormField>
              <FormField label="URL">
                <input className="w-full border border-gray-300 rounded-md px-3 py-2" value={editing.url} onChange={(e) => setEditing({ ...editing, url: e.target.value })} required />
              </FormField>
              <FormField label="Icon URL">
                <input className="w-full border border-gray-300 rounded-md px-3 py-2" value={editing.iconUrl || ''} onChange={(e) => setEditing({ ...editing, iconUrl: e.target.value })} />
              </FormField>
              <FormField label="Display order">
                <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" value={editing.displayOrder} onChange={(e) => setEditing({ ...editing, displayOrder: Number(e.target.value) })} />
              </FormField>
              <div className="flex justify-end gap-2 mt-6">
                <button type="button" onClick={() => setEditing(null)} className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm rounded-md bg-brand-600 hover:bg-brand-700 text-white font-medium">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  )
}
