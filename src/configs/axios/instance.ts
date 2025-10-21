import Router from 'next/router'

import { apiLogger, styledConsole } from '@toktokhan-dev/react-universal'

import axios, { AxiosError } from 'axios'

import { ENV } from '@/configs/env'
import { UserApi } from '@/generated/apis/User/User.api'
import { ROUTES } from '@/generated/path/routes'
import { useGlobalStore } from '@/stores/global/state'
import { useLocalStorage } from '@/stores/local/state'

import { retryRequestManager } from './retry-request-manager'

const isDev = ENV.NODE_ENV === 'development'

const instance = axios.create({
  baseURL: ENV.API_BASE_URL || 'http://localhost:5001',
  timeout: 29000,
  headers: {
    'Content-Type': 'application/json',
  },
})

const retry = retryRequestManager({ cleanupTimeOut: 29000 })

// refresh token 요청용 별도 instance (interceptor 없음)
const refreshInstance = axios.create({
  baseURL: ENV.API_BASE_URL || 'http://localhost:5001',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

const userApi = new UserApi({ instance })
const refreshUserApi = new UserApi({ instance: refreshInstance })

instance.interceptors.request.use(
  (config) => {
    const token = useLocalStorage.getState().token
    const isAccess = !!token && !!token.access_token
    if (isAccess) {
      config.headers.setAuthorization(`Bearer ${token.access_token}`)
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (res) => {
    const { status, config: reqData, data: resData } = res
    if (isDev) apiLogger({ status, reqData, resData })
    return res
  },
  async (error: AxiosError) => {
    try {
      const { response: res, config: reqData } = error || {}
      console.log('res', res)
      if (!res?.status) {
        throw new Error('response status is not exist')
      }

      const { status } = res
      const isUnAuthError = status === 401
      const isExpiredToken = status === 444

      if (isDev) apiLogger({ status, reqData, resData: error, method: 'error' })

      if (isExpiredToken) {
        // throw new Error('expired token: please set refresh token logic')
        return retry({
          getToken: async () => {
            const refresh_token =
              useLocalStorage.getState().token?.refresh_token

            if (!refresh_token) throw new Error('refresh token is not exist')
            if (!reqData) throw new Error('reqData is not exist')

            // 별도의 refresh instance를 사용하여 무한 루프 방지
            const { accessToken, refreshToken } =
              await refreshUserApi.userRefreshCreate({
                data: {
                  refreshToken: refresh_token,
                },
              })
            console.log('accessToken', accessToken)
            useLocalStorage.getState().set({
              token: {
                access_token: accessToken,
                refresh_token: refreshToken,
              },
            })

            return accessToken
          },
          onRefetch: (token) => {
            if (!reqData) throw new Error('reqData is not exist')
            // 새로운 access token으로 Authorization 헤더 설정
            reqData.headers.Authorization = `Bearer ${token}`
            return instance.request(reqData)
          },
          onError: () => {
            useLocalStorage.getState().reset('token')
            return Promise.reject(error)
          },
        })
      }

      if (isUnAuthError) {
        useLocalStorage.getState().reset('token')
        alert('다시 로그인해주세요.')
        Router.push(window.location.origin)
        return Promise.reject(error)
      }
      return Promise.reject(error)
    } catch (e) {
      styledConsole({
        //
        method: 'error',
        topic: 'UN_HANDLED',
        title: 'axios-interceptor',
        data: e,
      })
      return Promise.reject(error)
    }
  },
)

export default instance
