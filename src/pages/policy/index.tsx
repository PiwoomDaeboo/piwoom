import React from 'react'

import { NextSeo } from 'next-seo'

import HomeLayout from '@/components/@Layout/HomeLayout'
import Policy from '@/containers/Policy'

function PolicyPage() {
  return (
    <>
      {/* output: 똑똑한개발자 | 메인 */}
      {/* titleTemplate는 /configs/seo/config.ts에서 변경 가능합니다. */}
      <NextSeo title="메인" />
      <HomeLayout content={<Policy />} />
    </>
  )
}

export default PolicyPage
