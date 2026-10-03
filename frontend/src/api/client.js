import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'
export const ASSET_BASE = API_URL.replace(/\/api$/, '')

const client = axios.create({ baseURL: API_URL })
export default client

export const resolveUrl = (url) => {
  if (!url) return ''
  return url.startsWith('http') ? url : `${ASSET_BASE}${url}`
}
