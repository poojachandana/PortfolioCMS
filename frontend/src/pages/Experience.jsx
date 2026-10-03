import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import SectionTitle from '../components/SectionTitle'
import { getExperience, getTestimonials } from '../api/content'

export default function Experience() {
  const [experience, setExperience] = useState([])
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    getExperience().then(setExperience).catch(() => {})
    getTestimonials().then(setTestimonials).catch(() => {})
  }, [])

  return (
    <Layout>
      <section className="max-w-4xl mx-auto px-6 py-20">
        <SectionTitle eyebrow="Career" title="Experience" />
        <div className="space-y-8">
          {experience.map((e) => (
            <div key={e.id} className="relative pl-8 border-l-2 border-brand-200">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-brand-500" />
              <p className="font-bold text-gray-900">{e.role} · {e.company}</p>
              <p className="text-sm text-gray-500 mb-2">
                {e.startDate} – {e.current ? 'Present' : (e.endDate || '')} {e.location && `· ${e.location}`}
              </p>
              <p className="text-gray-600 text-sm whitespace-pre-wrap">{e.description}</p>
            </div>
          ))}
          {experience.length === 0 && <p className="text-gray-400 text-center">No experience entries published yet.</p>}
        </div>

        {testimonials.length > 0 && (
          <div className="mt-24">
            <SectionTitle eyebrow="Kind words" title="Testimonials" />
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-white rounded-lg shadow p-6">
                  <p className="text-gray-600 italic mb-4">"{t.message}"</p>
                  <p className="font-semibold text-gray-900 text-sm">{t.authorName}</p>
                  <p className="text-xs text-gray-400">{t.authorRole}{t.authorCompany ? `, ${t.authorCompany}` : ''}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </Layout>
  )
}
