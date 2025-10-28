import React from 'react'

import { NextSeo } from 'next-seo'

import HomeLayout from '@/components/@Layout/HomeLayout'
import MyLoanStatus from '@/containers/MyLoanStatus'

function MyLoanStatusPage() {
  return (
    <>
      {/* output: 똑똑한개발자 | 메인 */}
      {/* titleTemplate는 /configs/seo/config.ts에서 변경 가능합니다. */}
      <NextSeo title="대출 현황 조회" />
      <HomeLayout content={<MyLoanStatus />} />
    </>
  )
}

export default MyLoanStatusPage
