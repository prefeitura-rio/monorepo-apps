import axios, { type AxiosError } from 'axios'
import { deleteCookie } from 'cookies-next'
import { parseCookies } from 'nookies'

// import { queryClient } from './query-client'
import { redirect } from 'next/navigation'

export const isApiError = axios.isAxiosError

const isServer = () => {
  console.log({window})
  return typeof window === 'undefined'
}

const cookies = parseCookies()

export const api = axios.create({
  baseURL: "https://gw.dados.rio",
})

api.interceptors.request.use((request: axios.InternalAxiosRequestConfig) => {
  const { 'token': accessToken } = cookies
  console.log("DEBUG AXIOS")

  if (accessToken) {
    request.headers.set('Authorization', `Bearer ${accessToken}`)
    // config.headers['Content-Type'] = 'application/json'
  } else {
    if (isServer()) {
      redirect('/auth/sign-in')
    }
    else {
      // window.location.href = '/auth/sign-in'
    }
  }
  return request
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error as AxiosError

    if (response?.data) {
      const { statusCode } = response.data as {
        statusCode: number
      }

      if (statusCode === 401) {
        deleteCookie('token')
        if (isServer()) {
          // redirect('/auth/sign-in')
        }
        else {
          // window.location.href = '/auth/sign-in'
        }
      }
    }
    return Promise.reject(error)
  },
)
