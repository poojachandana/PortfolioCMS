import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { messagesApi } from '../api/content'

export default function Messages() {
  const [items, setItems] = useState([])

  const load = () => messagesApi.list().then(setItems)
  useEffect(() => { load() }, [])

  const toggleRead = async (m) => {
    await messagesApi.markRead(m.id, !m.read)
    load()
  }

  const remove = async (id) => {
    if (!confirm('Delete this message?')) return
    await messagesApi.remove(id)
    load()
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Contact Messages</h1>
      <p className="text-gray-500 text-sm mb-6">Messages submitted through your portfolio's contact form.</p>
      <div className="space-y-3">
        {items.length === 0 && <p className="text-gray-400">No messages yet.</p>}
        {items.map((m) => (
          <div key={m.id} className={`bg-white rounded-lg shadow p-4 ${!m.read ? 'border-l-4 border-brand-500' : ''}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-900">{m.name} <span className="text-gray-400 font-normal">&lt;{m.email}&gt;</span></p>
                <p className="text-sm text-gray-500">{m.subject || '(no subject)'} · {new Date(m.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex gap-3 text-xs">
                <button onClick={() => toggleRead(m)} className="text-brand-600 hover:underline">{m.read ? 'Mark unread' : 'Mark read'}</button>
                <button onClick={() => remove(m.id)} className="text-red-500 hover:underline">Delete</button>
              </div>
            </div>
            <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">{m.body}</p>
          </div>
        ))}
      </div>
    </Layout>
  )
}
