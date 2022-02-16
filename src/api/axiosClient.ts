/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import axios, { AxiosRequestConfig } from 'axios'
import { FIREBASE_API_KEY, REFRESH_TOKEN, TOKEN_ID, VERSION_API } from 'contants'
import queryString from 'query-string'
import { getCookie, setCookie } from 'utils/cookie'

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
  headers: {
    'content-type': 'application/json',
    'Device-Type': 'Webapp',
    version: VERSION_API,
  },
  paramsSerializer: (params) => queryString.stringify(params),
})

axiosClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const token = getCookie(TOKEN_ID) || undefined
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data
    }

    return response
  },
  (error) => {
    // Handle errors
    let errorMessage = error
    if (error.response) {
      const originalRequest = error.config
      if (error.response.status === 403) {
        if (getCookie(REFRESH_TOKEN)) {
          const refreshtoken = getCookie(REFRESH_TOKEN)
          const params = {
            grant_type: 'refresh_token',
            refresh_token: refreshtoken,
          }
          axios
            .post(`https://securetoken.googleapis.com/v1/token?key=${FIREBASE_API_KEY}`, params)
            .then(async (res) => {
              await setCookie(TOKEN_ID, res?.data.id_token)
              await setCookie(REFRESH_TOKEN, res?.data.refresh_token)
              window.location.reload()
              return axios(originalRequest)
            })
            .catch((err) => {
              console.log(err, 'error')
            })
        }
      }
      errorMessage = error.response.data ? error.response.data.error : error.response.data
    }
    throw error
  },
)

export default axiosClient
