import { useState } from 'react'
import Layout from '../components/Layout'
import SectionTitle from '../components/SectionTitle'
import { sendContactMessage } from '../api/content'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', body: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'sent' | 'error'

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await sendContactMessage(form)
      setStatus('sent')
      setForm({ name: '', email: '', subject: '', body: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <Layout>
      <section className="max-w-2xl mx-auto px-6 py-20">
        <SectionTitle eyebrow="Let's talk" title="Contact Me" subtitle="Have a project in mind or just want to say hi?" />
        {status === 'sent' && <div className="mb-6 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-4 py-3">Thanks for reaching out! I'll get back to you soon.</div>}
        {status === 'error' && <div className="mb-6 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-4 py-3">Something went wrong — please try again.</div>}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input name="name" required placeholder="Your name" value={form.name} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:outline-none" />
            <input name="email" type="email" required placeholder="Your email" value={form.email} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:outline-none" />
          </div>
          <input name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:outline-none" />
          <textarea name="body" required rows={6} placeholder="Your message" value={form.body} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:outline-none" />
          <button type="submit" disabled={status === 'sending'} className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-md font-medium disabled:opacity-60">
            {status === 'sending' ? 'Sending…' : 'Send Message'}
          </button>
        </form>
      </section>
    </Layout>
  )
}
