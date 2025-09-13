import React from 'react'

import { NextSeo } from 'next-seo'

import HomeLayout from '@/components/@Layout/HomeLayout'
import ApplyLoanComplete from '@/containers/ApplyLoanComplete'

function ApplyLoanPage() {
  return (
    <>
      {/* output: 똑똑한개발자 | 메인 */}
      {/* titleTemplate는 /configs/seo/config.ts에서 변경 가능합니다. */}
      <NextSeo title="대출 신청 완료" />
      <HomeLayout content={<ApplyLoanComplete />} />
    </>
  )
}

export default ApplyLoanPage
