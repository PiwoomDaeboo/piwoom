import { useLocalStorage } from '@/stores/local/state'

import { useClient } from './useClient'

export const useAuth = () => {
  const token = useLocalStorage((store) => store.token)
  const isClient = useClient()
  const isLogin: boolean | null = isClient ? !!token?.access_token : null

  // 디버깅을 위한 로그
  if (isClient) {
    console.log('useAuth - 토큰 상태:', token)
    console.log('useAuth - 로그인 상태:', isLogin)
  }

  return { isLogin, token }
}
