import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import SectionTitle from '../components/SectionTitle'
import { getAbout, getEducation } from '../api/content'
import { resolveUrl } from '../api/client'

export default function AboutPage() {
  const [about, setAbout] = useState(null)
  const [education, setEducation] = useState([])

  useEffect(() => {
    getAbout().then(setAbout).catch(() => {})
    getEducation().then(setEducation).catch(() => {})
  }, [])

  if (!about) return <Layout><div className="py-24 text-center text-gray-400">Loading…</div></Layout>

  return (
    <Layout>
      <section className="max-w-4xl mx-auto px-6 py-20">
        <SectionTitle eyebrow="Get to know me" title="About Me" />
        <div className="grid md:grid-cols-3 gap-10 items-start">
          {about.profileImageUrl && (
            <img src={resolveUrl(about.profileImageUrl)} alt={about.fullName} className="rounded-lg shadow-lg w-full" />
          )}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900">{about.fullName}</h3>
            <p className="text-brand-600 font-medium mb-4">{about.title}</p>
            <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">{about.bio}</p>
            <dl className="grid grid-cols-2 gap-4 mt-8 text-sm">
              {about.location && <div><dt className="text-gray-400">Location</dt><dd className="text-gray-800 font-medium">{about.location}</dd></div>}
              {about.email && <div><dt className="text-gray-400">Email</dt><dd className="text-gray-800 font-medium">{about.email}</dd></div>}
              {about.phone && <div><dt className="text-gray-400">Phone</dt><dd className="text-gray-800 font-medium">{about.phone}</dd></div>}
              {about.resumeUrl && <div><dt className="text-gray-400">Resume</dt><dd><a href={resolveUrl(about.resumeUrl)} className="text-brand-600 hover:underline">Download</a></dd></div>}
            </dl>
          </div>
        </div>

        {education.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Education</h3>
            <div className="space-y-6">
              {education.map((e) => (
                <div key={e.id} className="border-l-2 border-brand-200 pl-5">
                  <p className="font-semibold text-gray-900">{e.degree} · {e.fieldOfStudy}</p>
                  <p className="text-sm text-gray-500">{e.institution} · {e.startDate} – {e.endDate || 'Present'}</p>
                  {e.description && <p className="text-sm text-gray-600 mt-1">{e.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </Layout>
  )
}
