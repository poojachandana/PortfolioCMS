import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('admin@portfolio.com')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-900 to-brand-600 px-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Portfolio CMS</h1>
        <p className="text-sm text-gray-500 mb-6">Sign in to manage your content</p>
        {error && <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="block text-sm font-medium text-gray-700 mb-1">Email</span>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:outline-none"
              required
            />
          </label>
          <label className="block mb-6">
            <span className="block text-sm font-medium text-gray-700 mb-1">Password</span>
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:outline-none"
              required
            />
          </label>
          <button
            type="submit" disabled={loading}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-2 rounded-md transition disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <p className="text-xs text-gray-400 mt-6">
          Default admin: <code>admin@portfolio.com</code> / <code>Admin@123</code> (set in backend <code>application.yml</code>)
        </p>
      </div>
    </div>
  )
}
