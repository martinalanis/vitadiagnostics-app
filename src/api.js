import axios from 'axios'
import store from '@/store'

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

/**
 * Request interceptor para verificar si hay token de sesion
 */
api.interceptors.request.use(
  (config) => {
    const token = store.state.auth.token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(function (response) {
  // status 2xx
  return response
}, function (error) {
  if (error.response.status === 401) {
    store.dispatch('auth/closeSession')
  }
  return Promise.reject(error)
})

export default api
