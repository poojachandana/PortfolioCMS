import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Experience from './pages/Experience'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  )
}
