import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import SectionTitle from '../components/SectionTitle'
import { getAbout, getProjects, getSkills } from '../api/content'
import { resolveUrl } from '../api/client'

export default function Home() {
  const [about, setAbout] = useState(null)
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])

  useEffect(() => {
    getAbout().then(setAbout).catch(() => {})
    getProjects().then((p) => setProjects(p.filter((x) => x.featured).slice(0, 3))).catch(() => {})
    getSkills().then((s) => setSkills(s.slice(0, 10))).catch(() => {})
  }, [])

  return (
    <Layout>
      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-brand-600 font-semibold mb-3">Hi, I'm</p>
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            {about?.fullName || 'Your Name'}
          </h1>
          <p className="text-xl text-gray-600 mb-6">{about?.title || 'Full Stack Developer'}</p>
          <p className="text-gray-500 mb-8">{about?.shortBio}</p>
          <div className="flex gap-4">
            <Link to="/projects" className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-md font-medium">View Projects</Link>
            <Link to="/contact" className="border border-gray-300 hover:border-brand-500 px-6 py-3 rounded-md font-medium">Contact Me</Link>
          </div>
        </div>
        <div className="flex justify-center">
          {about?.profileImageUrl ? (
            <img src={resolveUrl(about.profileImageUrl)} alt={about.fullName} className="w-72 h-72 object-cover rounded-full shadow-xl" />
          ) : (
            <div className="w-72 h-72 rounded-full bg-brand-100 flex items-center justify-center text-brand-500 text-6xl font-bold">
              {(about?.fullName || 'P').charAt(0)}
            </div>
          )}
        </div>
      </section>

      {skills.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <SectionTitle eyebrow="Toolkit" title="Skills & Technologies" />
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((s) => (
              <span key={s.id} className="px-4 py-2 bg-brand-50 text-brand-700 rounded-full text-sm font-medium">{s.name}</span>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <SectionTitle eyebrow="Portfolio" title="Featured Projects" />
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div key={p.id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
                {p.imageUrl && <img src={resolveUrl(p.imageUrl)} alt={p.title} className="h-40 w-full object-cover" />}
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-1">{p.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{p.shortDescription}</p>
                  <div className="flex gap-3 text-sm">
                    {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-brand-600 hover:underline">Live</a>}
                    {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-brand-600 hover:underline">GitHub</a>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </Layout>
  )
}
