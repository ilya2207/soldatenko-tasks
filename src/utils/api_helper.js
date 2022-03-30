import axios from 'axios'

export const API_URL = 'http://127.0.0.1:8000/api'

export const axiosApi = axios.create({
  baseURL: API_URL,
})

axiosApi.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    config.headers['Content-Type'] = 'application/json'
  }

  return config
})

axiosApi.interceptors.response.use(
  (config) => {
    return config
  },

  async (error) => {
    if (error.response.status === 403 && !error.response.data.success) {
      localStorage.removeItem('token')
      return (window.location.href = '/login')
    }
    throw error.response
    // return Promise.reject(error.response)
  }
)
