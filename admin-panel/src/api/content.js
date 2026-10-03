import client from './client'

// Generic REST helpers reused by every content-type CRUD page.
export const makeResource = (path) => ({
  list: (all = true) => client.get(`/${path}`, { params: { all } }).then((r) => r.data),
  get: (id) => client.get(`/${path}/${id}`).then((r) => r.data),
  create: (payload) => client.post(`/${path}`, payload).then((r) => r.data),
  update: (id, payload) => client.put(`/${path}/${id}`, payload).then((r) => r.data),
  remove: (id) => client.delete(`/${path}/${id}`),
})

export const aboutApi = {
  get: () => client.get('/about').then((r) => r.data),
  update: (payload) => client.put('/about', payload).then((r) => r.data),
}

export const skillsApi = makeResource('skills')
export const projectsApi = makeResource('projects')
export const experienceApi = makeResource('experience')
export const educationApi = makeResource('education')
export const servicesApi = makeResource('services')
export const testimonialsApi = makeResource('testimonials')
export const blogsApi = makeResource('blogs')

export const socialLinksApi = {
  list: () => client.get('/social-links').then((r) => r.data),
  create: (payload) => client.post('/social-links', payload).then((r) => r.data),
  update: (id, payload) => client.put(`/social-links/${id}`, payload).then((r) => r.data),
  remove: (id) => client.delete(`/social-links/${id}`),
}

export const messagesApi = {
  list: () => client.get('/messages').then((r) => r.data),
  markRead: (id, read = true) => client.patch(`/messages/${id}/read`, null, { params: { read } }).then((r) => r.data),
  remove: (id) => client.delete(`/messages/${id}`),
}

export const mediaApi = {
  list: () => client.get('/media').then((r) => r.data),
  upload: (file) => {
    const form = new FormData()
    form.append('file', file)
    return client.post('/media/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } }).then((r) => r.data)
  },
  remove: (id) => client.delete(`/media/${id}`),
}
