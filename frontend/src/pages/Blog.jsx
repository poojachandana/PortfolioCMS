import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import SectionTitle from '../components/SectionTitle'
import { getBlogs } from '../api/content'
import { resolveUrl } from '../api/client'

export default function Blog() {
  const [posts, setPosts] = useState([])

  useEffect(() => { getBlogs().then(setPosts).catch(() => {}) }, [])

  return (
    <Layout>
      <section className="max-w-4xl mx-auto px-6 py-20">
        <SectionTitle eyebrow="Writing" title="Blog" />
        <div className="space-y-8">
          {posts.map((p) => (
            <Link key={p.id} to={`/blog/${p.slug}`} className="block bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden md:flex">
              {p.coverImageUrl && <img src={resolveUrl(p.coverImageUrl)} className="md:w-56 h-40 md:h-auto object-cover" alt={p.title} />}
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-1">{p.title}</h3>
                <p className="text-xs text-gray-400 mb-3">{new Date(p.createdAt).toLocaleDateString()} {p.author && `· ${p.author}`}</p>
                <p className="text-gray-600 text-sm">{p.excerpt}</p>
              </div>
            </Link>
          ))}
          {posts.length === 0 && <p className="text-gray-400 text-center">No blog posts published yet.</p>}
        </div>
      </section>
    </Layout>
  )
}
