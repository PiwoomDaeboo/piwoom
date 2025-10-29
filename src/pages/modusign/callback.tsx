import React, { useEffect } from 'react'

import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

import { useLocalStorage } from '@/stores/local/state'

function ModusignCallback() {
  const router = useRouter()
  const is_sign = router.query.is_sign as string | undefined
  const { set } = useLocalStorage()
  useEffect(() => {
    if (!router.isReady) return

    if (is_sign) {
      set('popup_status', new Date().toISOString())
      setTimeout(() => {
        window.close()
      }, 500)
    } else {
      window.alert('서명정보 제출 실패')
      window.close()
    }
  }, [router.isReady, is_sign])

  return (
    <>
      {/* output: 똑똑한개발자 | 메인 */}
      {/* titleTemplate는 /configs/seo/config.ts에서 변경 가능합니다. */}
      <div>서명정보 제출 중..</div>
    </>
  )
}

export default ModusignCallback
