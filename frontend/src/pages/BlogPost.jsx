import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { getBlogBySlug } from '../api/content'
import { resolveUrl } from '../api/client'

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    getBlogBySlug(slug).then(setPost).catch(() => setNotFound(true))
  }, [slug])

  if (notFound) return <Layout><div className="py-24 text-center text-gray-400">Post not found.</div></Layout>
  if (!post) return <Layout><div className="py-24 text-center text-gray-400">Loading…</div></Layout>

  return (
    <Layout>
      <article className="max-w-3xl mx-auto px-6 py-20">
        <Link to="/blog" className="text-sm text-brand-600 hover:underline">← Back to blog</Link>
        <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">{post.title}</h1>
        <p className="text-sm text-gray-400 mb-8">{new Date(post.createdAt).toLocaleDateString()} {post.author && `· ${post.author}`}</p>
        {post.coverImageUrl && <img src={resolveUrl(post.coverImageUrl)} className="w-full rounded-lg mb-8" alt={post.title} />}
        <div className="prose max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">{post.content}</div>
      </article>
    </Layout>
  )
}
