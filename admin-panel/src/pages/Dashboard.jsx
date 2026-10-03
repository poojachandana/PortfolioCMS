import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import {
  skillsApi, projectsApi, experienceApi, blogsApi, testimonialsApi, messagesApi,
} from '../api/content'

export default function Dashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    Promise.all([
      skillsApi.list(), projectsApi.list(), experienceApi.list(),
      blogsApi.list(), testimonialsApi.list(), messagesApi.list(),
    ]).then(([skills, projects, experience, blogs, testimonials, messages]) => {
      setStats({
        skills: skills.length,
        projects: projects.length,
        experience: experience.length,
        blogs: blogs.length,
        testimonials: testimonials.length,
        messages: messages.length,
        unread: messages.filter((m) => !m.read).length,
      })
    }).catch(() => setStats({}))
  }, [])

  const cards = stats ? [
    { label: 'Projects', value: stats.projects },
    { label: 'Skills', value: stats.skills },
    { label: 'Experience entries', value: stats.experience },
    { label: 'Blog posts', value: stats.blogs },
    { label: 'Testimonials', value: stats.testimonials },
    { label: 'Unread messages', value: stats.unread, highlight: true },
  ] : []

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
      <p className="text-gray-500 mb-6">Overview of your portfolio content.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.label} className={`bg-white rounded-lg shadow p-5 ${c.highlight && c.value > 0 ? 'ring-2 ring-brand-500' : ''}`}>
            <p className="text-sm text-gray-500">{c.label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{c.value ?? '—'}</p>
          </div>
        ))}
      </div>
    </Layout>
  )
}
