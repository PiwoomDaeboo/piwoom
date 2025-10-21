import React, { useEffect } from 'react'

import { NextSeo } from 'next-seo'
import { useSearchParams } from 'next/navigation'

import HomeLayout from '@/components/@Layout/HomeLayout'
import { useLocalStorage } from '@/stores/local/state'
import { useSessionStorage } from '@/stores/session/state'

function UsebCallback() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const { set } = useLocalStorage()

  useEffect(() => {
    if (id) {
      set('popup_status', id)

      // setTimeout(() => {
      //   window.close()
      // }, 500)
    }
  }, [id])

  return (
    <>
      {/* output: 똑똑한개발자 | 메인 */}
      {/* titleTemplate는 /configs/seo/config.ts에서 변경 가능합니다. */}
      <div>신분증 진위 여부 확인중...</div>
    </>
  )
}

export default UsebCallback
