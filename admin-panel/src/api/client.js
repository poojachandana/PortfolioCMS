import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

const client = axios.create({ baseURL: API_URL })

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Auto-refresh access token on 401 using the stored refresh token
let isRefreshing = false
let queue = []

client.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry) {
      const refreshToken = localStorage.getItem('refreshToken')
      if (!refreshToken) return Promise.reject(error)

      original._retry = true

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject })
        }).then((token) => {
          original.headers.Authorization = `Bearer ${token}`
          return client(original)
        })
      }

      isRefreshing = true
      try {
        const { data } = await axios.post(`${API_URL}/auth/refresh`, { refreshToken })
        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)
        queue.forEach((p) => p.resolve(data.accessToken))
        queue = []
        original.headers.Authorization = `Bearer ${data.accessToken}`
        return client(original)
      } catch (refreshError) {
        queue.forEach((p) => p.reject(refreshError))
        queue = []
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(error)
  }
)

export default client
