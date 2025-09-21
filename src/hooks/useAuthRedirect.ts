import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { useSessionStorage } from '@/stores/session/state'

interface UseAuthRedirectOptions {
  redirectTo?: string
  showLoading?: boolean
  loadingMessage?: string
}

/**
 * 인증 토큰이 없을 때 자동으로 리다이렉트하는 훅
 *
 * @param options - 리다이렉트 옵션
 * @param options.redirectTo - 리다이렉트할 경로 (기본값: '/my-loan?step=1')
 * @param options.showLoading - 로딩 상태 표시 여부 (기본값: true)
 * @param options.loadingMessage - 로딩 메시지 (기본값: '페이지를 이동하고 있습니다...')
 *
 * @returns { isAuthenticated, isRedirecting, redirect }
 */
export const useAuthRedirect = (options: UseAuthRedirectOptions = {}) => {
  const {
    redirectTo = '/my-loan?step=1',
    showLoading = true,
    loadingMessage = '페이지를 이동하고 있습니다...',
  } = options

  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = useState(false)
  const { identityVerificationToken } = useSessionStorage()

  const isAuthenticated = !!identityVerificationToken

  const redirect = (path?: string) => {
    setIsRedirecting(true)
    router.replace(path || redirectTo)
  }

  useEffect(() => {
    if (!isAuthenticated) {
      if (showLoading) {
        setIsRedirecting(true)
      }
      router.replace(redirectTo)
    }
  }, [isAuthenticated, redirectTo, showLoading])

  return {
    isAuthenticated,
    isRedirecting: isRedirecting || (!isAuthenticated && showLoading),
    redirect,
    loadingMessage,
  }
}
