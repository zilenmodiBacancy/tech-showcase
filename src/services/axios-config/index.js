import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
})

axiosInstance.interceptors.request.use(
  function (config) {
    return {
      ...config,
      headers: {
        ...config.headers,
      },
    }
  },
  function (error) {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    const { response: { status = null } = {} } = error

    // Handle 500-level errors
    if (status >= 500 && status < 600) {
      return Promise.reject(error?.response?.statusText)
    }

    return Promise.reject(error?.response?.data)
  }
)

export default axiosInstance
