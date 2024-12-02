import axios, { type AxiosError } from 'axios'
import { deleteCookie } from 'cookies-next'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export const isApiError = axios.isAxiosError

const isServer = () => {
  return typeof window === 'undefined'
}

// const cookies = parseCookies()

export const api = axios.create({
  baseURL: "https://gw.dados.rio",
})

api.interceptors.request.use(async (request: axios.InternalAxiosRequestConfig) => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('token')?.value

  if (accessToken) {
    request.headers.set('Authorization', `Bearer ${accessToken}`)
  } else {
    if (isServer()) {
      redirect('/auth/sign-in')
    }
    else {
      window.location.href = '/auth/sign-in'
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
          redirect('/auth/sign-in')
        }
        else {
          window.location.href = '/auth/sign-in'
        }
      }
    }
    return Promise.reject(error)
  },
)
