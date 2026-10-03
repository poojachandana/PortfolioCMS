import { useEffect, useState } from 'react'
import { getSocialLinks, getAbout } from '../api/content'

export default function Footer() {
  const [links, setLinks] = useState([])
  const [about, setAbout] = useState(null)

  useEffect(() => {
    getSocialLinks().then(setLinks).catch(() => {})
    getAbout().then(setAbout).catch(() => {})
  }, [])

  return (
    <footer className="border-t border-gray-100 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} {about?.fullName || 'Portfolio'}. Built with a custom CMS.
        </p>
        <div className="flex gap-5">
          {links.map((l) => (
            <a key={l.id} href={l.url} target="_blank" rel="noreferrer" className="text-sm text-gray-500 hover:text-brand-600">
              {l.platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
