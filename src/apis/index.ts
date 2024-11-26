import axios, { AxiosResponse } from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'
const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_HOST}/3`,
  params: {
    api_key: import.meta.env.VITE_APP_API_KEY,
    language: 'ko-KR',
  },
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log('Request sent:', config.method, config.url)
    return config
  },
  (error) => {
    console.error('Request Interceptor Error:', error)
    return Promise.reject(error)
  }
)

// Resposne interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('Response received:', response.status, response.statusText)
    return response
  },
  (error) => {
    console.error('Response Interceptor Error:', error)
    return Promise.reject(error)
  }
)

export default axiosInstance
