import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import FormField from '../components/FormField'
import { aboutApi } from '../api/content'

export default function About() {
  const [data, setData] = useState(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => { aboutApi.get().then(setData) }, [])

  const handleChange = (name, value) => setData((prev) => ({ ...prev, [name]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const updated = await aboutApi.update(data)
    setData(updated)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (!data) return <Layout><p className="text-gray-400">Loading…</p></Layout>

  const fields = [
    ['fullName', 'Full name'], ['title', 'Title / headline'], ['location', 'Location'],
    ['email', 'Email'], ['phone', 'Phone'], ['profileImageUrl', 'Profile image URL'],
    ['resumeUrl', 'Resume URL'], ['githubUrl', 'GitHub URL'], ['linkedinUrl', 'LinkedIn URL'],
    ['twitterUrl', 'Twitter URL'], ['websiteUrl', 'Website URL'],
  ]

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">About</h1>
      <p className="text-gray-500 text-sm mb-6">Your profile info, shown on the portfolio's Home/About pages.</p>
      {saved && <div className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2">Saved.</div>}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-3xl">
        <div className="grid grid-cols-2 gap-x-4">
          {fields.map(([name, label]) => (
            <FormField key={name} label={label}>
              <input
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                value={data[name] || ''}
                onChange={(e) => handleChange(name, e.target.value)}
              />
            </FormField>
          ))}
        </div>
        <FormField label="Short bio (tagline)">
          <textarea rows={2} className="w-full border border-gray-300 rounded-md px-3 py-2" value={data.shortBio || ''} onChange={(e) => handleChange('shortBio', e.target.value)} />
        </FormField>
        <FormField label="Full bio">
          <textarea rows={6} className="w-full border border-gray-300 rounded-md px-3 py-2" value={data.bio || ''} onChange={(e) => handleChange('bio', e.target.value)} />
        </FormField>
        <button type="submit" className="mt-2 px-5 py-2 text-sm rounded-md bg-brand-600 hover:bg-brand-700 text-white font-medium">Save changes</button>
      </form>
    </Layout>
  )
}
