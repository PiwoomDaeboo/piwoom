import React, { useEffect } from 'react'

import { NextSeo } from 'next-seo'
import Head from 'next/head'
import { useSearchParams } from 'next/navigation'

import HomeLayout from '@/components/@Layout/HomeLayout'
import { useLocalStorage } from '@/stores/local/state'

function NiceCallback() {
  const searchParams = useSearchParams()
  const safe_key = searchParams.get('safe_key')
  const { set } = useLocalStorage()

  useEffect(() => {
    if (safe_key) {
      set('popup_status', safe_key)

      setTimeout(() => {
        window.close()
      }, 500)
    }
    setTimeout(() => {
      window.close()
    }, 1000)
  }, [safe_key])

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      {/* output: 똑똑한개발자 | 메인 */}
      {/* titleTemplate는 /configs/seo/config.ts에서 변경 가능합니다. */}
      <div>
        {safe_key ? '신용정보 제출 중...' : '신용정보 제출에 실패했습니다.'}
      </div>
    </>
  )
}

export default NiceCallback
