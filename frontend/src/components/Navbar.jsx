import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/experience', label: 'Experience' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <NavLink to="/" className="font-bold text-lg text-brand-900">Portfolio</NavLink>
        <nav className="hidden md:flex gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => `text-sm font-medium transition ${isActive ? 'text-brand-600' : 'text-gray-600 hover:text-brand-600'}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <button className="md:hidden text-gray-600" onClick={() => setOpen(!open)}>
          {open ? '✕' : '☰'}
        </button>
      </div>
      {open && (
        <nav className="md:hidden flex flex-col px-6 pb-4 gap-3 bg-white">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-sm font-medium text-gray-700">
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
