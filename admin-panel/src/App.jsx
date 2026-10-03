import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Experience from './pages/Experience'
import Education from './pages/Education'
import Services from './pages/Services'
import Testimonials from './pages/Testimonials'
import Blogs from './pages/Blogs'
import SocialLinks from './pages/SocialLinks'
import Media from './pages/Media'
import Messages from './pages/Messages'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
      <Route path="/skills" element={<ProtectedRoute><Skills /></ProtectedRoute>} />
      <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
      <Route path="/experience" element={<ProtectedRoute><Experience /></ProtectedRoute>} />
      <Route path="/education" element={<ProtectedRoute><Education /></ProtectedRoute>} />
      <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
      <Route path="/testimonials" element={<ProtectedRoute><Testimonials /></ProtectedRoute>} />
      <Route path="/blogs" element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
      <Route path="/social-links" element={<ProtectedRoute><SocialLinks /></ProtectedRoute>} />
      <Route path="/media" element={<ProtectedRoute><Media /></ProtectedRoute>} />
      <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
    </Routes>
  )
}
