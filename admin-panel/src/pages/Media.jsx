import { useEffect, useRef, useState } from 'react'
import Layout from '../components/Layout'
import { mediaApi } from '../api/content'

export default function Media() {
  const [items, setItems] = useState([])
  const [uploading, setUploading] = useState(false)
  const fileInput = useRef()

  const load = () => mediaApi.list().then(setItems)
  useEffect(() => { load() }, [])

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      await mediaApi.upload(file)
      load()
    } finally {
      setUploading(false)
      fileInput.current.value = ''
    }
  }

  const copyUrl = (url) => {
    const full = `${(import.meta.env.VITE_API_URL || 'http://localhost:8080/api').replace('/api', '')}${url}`
    navigator.clipboard.writeText(full)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this file?')) return
    await mediaApi.remove(id)
    load()
  }

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
          <p className="text-gray-500 text-sm">Upload images/files, then paste their URL into any content field.</p>
        </div>
        <label className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium px-4 py-2 rounded-md cursor-pointer">
          {uploading ? 'Uploading…' : '+ Upload file'}
          <input ref={fileInput} type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map((m) => (
          <div key={m.id} className="bg-white rounded-lg shadow overflow-hidden">
            {m.contentType?.startsWith('image') ? (
              <img src={`${(import.meta.env.VITE_API_URL || 'http://localhost:8080/api').replace('/api', '')}${m.url}`} className="h-28 w-full object-cover" alt={m.originalName} />
            ) : (
              <div className="h-28 w-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">{m.contentType}</div>
            )}
            <div className="p-2">
              <p className="text-xs truncate text-gray-600" title={m.originalName}>{m.originalName}</p>
              <div className="flex justify-between mt-1">
                <button onClick={() => copyUrl(m.url)} className="text-xs text-brand-600 hover:underline">Copy URL</button>
                <button onClick={() => handleDelete(m.id)} className="text-xs text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-gray-400 col-span-full">No files uploaded yet.</p>}
      </div>
    </Layout>
  )
}
