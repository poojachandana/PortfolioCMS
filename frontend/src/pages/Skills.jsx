import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import SectionTitle from '../components/SectionTitle'
import { getSkills, getServices } from '../api/content'

export default function Skills() {
  const [skills, setSkills] = useState([])
  const [services, setServices] = useState([])

  useEffect(() => {
    getSkills().then(setSkills).catch(() => {})
    getServices().then(setServices).catch(() => {})
  }, [])

  const grouped = skills.reduce((acc, s) => {
    const cat = s.category || 'Other'
    acc[cat] = acc[cat] || []
    acc[cat].push(s)
    return acc
  }, {})

  return (
    <Layout>
      <section className="max-w-5xl mx-auto px-6 py-20">
        <SectionTitle eyebrow="What I know" title="Skills" />
        <div className="grid md:grid-cols-2 gap-10">
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat}>
              <h3 className="font-bold text-gray-900 mb-4">{cat}</h3>
              <div className="space-y-3">
                {items.map((s) => (
                  <div key={s.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{s.name}</span>
                      {s.proficiency != null && <span className="text-gray-400">{s.proficiency}%</span>}
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-500 rounded-full" style={{ width: `${s.proficiency || 0}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {services.length > 0 && (
          <div className="mt-20">
            <SectionTitle eyebrow="How I can help" title="Services" />
            <div className="grid md:grid-cols-3 gap-6">
              {services.map((s) => (
                <div key={s.id} className="bg-white rounded-lg shadow p-6">
                  <h4 className="font-bold text-gray-900 mb-2">{s.title}</h4>
                  <p className="text-sm text-gray-500">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </Layout>
  )
}
