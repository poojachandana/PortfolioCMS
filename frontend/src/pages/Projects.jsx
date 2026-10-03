import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import SectionTitle from '../components/SectionTitle'
import { getProjects } from '../api/content'
import { resolveUrl } from '../api/client'

export default function Projects() {
  const [projects, setProjects] = useState([])

  useEffect(() => { getProjects().then(setProjects).catch(() => {}) }, [])

  return (
    <Layout>
      <section className="max-w-6xl mx-auto px-6 py-20">
        <SectionTitle eyebrow="My Work" title="Projects" subtitle="A selection of things I've built." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div key={p.id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col">
              {p.imageUrl && <img src={resolveUrl(p.imageUrl)} alt={p.title} className="h-44 w-full object-cover" />}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-gray-900 mb-1">{p.title}</h3>
                <p className="text-sm text-gray-500 mb-3 flex-1">{p.shortDescription}</p>
                {p.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {p.technologies.map((t) => (
                      <span key={t} className="text-xs bg-brand-50 text-brand-700 px-2 py-1 rounded">{t}</span>
                    ))}
                  </div>
                )}
                <div className="flex gap-3 text-sm">
                  {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-brand-600 hover:underline">Live demo →</a>}
                  {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-brand-600 hover:underline">Source →</a>}
                </div>
              </div>
            </div>
          ))}
          {projects.length === 0 && <p className="text-gray-400 col-span-full text-center">No projects published yet.</p>}
        </div>
      </section>
    </Layout>
  )
}
