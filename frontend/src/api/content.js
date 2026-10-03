import client from './client'

export const getAbout = () => client.get('/about').then((r) => r.data)
export const getSkills = () => client.get('/skills').then((r) => r.data)
export const getProjects = () => client.get('/projects').then((r) => r.data)
export const getExperience = () => client.get('/experience').then((r) => r.data)
export const getEducation = () => client.get('/education').then((r) => r.data)
export const getServices = () => client.get('/services').then((r) => r.data)
export const getTestimonials = () => client.get('/testimonials').then((r) => r.data)
export const getBlogs = () => client.get('/blogs').then((r) => r.data)
export const getBlogBySlug = (slug) => client.get(`/blogs/slug/${slug}`).then((r) => r.data)
export const getSocialLinks = () => client.get('/social-links').then((r) => r.data)
export const sendContactMessage = (payload) => client.post('/contact', payload).then((r) => r.data)
