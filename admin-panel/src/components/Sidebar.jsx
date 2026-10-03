import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/education', label: 'Education' },
  { to: '/services', label: 'Services' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/blogs', label: 'Blog' },
  { to: '/social-links', label: 'Social Links' },
  { to: '/media', label: 'Media' },
  { to: '/messages', label: 'Messages' },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <aside className="w-64 shrink-0 bg-brand-900 text-white min-h-screen flex flex-col">
      <div className="px-6 py-5 border-b border-brand-700">
        <h1 className="text-lg font-bold">Portfolio CMS</h1>
        <p className="text-xs text-brand-100 mt-1">{user?.email}</p>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-sm font-medium transition ${
                isActive ? 'bg-brand-600 text-white' : 'text-brand-100 hover:bg-brand-700'
              }`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t border-brand-700">
        <button
          onClick={() => { logout(); navigate('/login') }}
          className="w-full text-sm px-3 py-2 rounded-md bg-brand-700 hover:bg-brand-600"
        >
          Log out
        </button>
      </div>
    </aside>
  )
}
