import React from 'react'

import { NextSeo } from 'next-seo'

import HomeLayout from '@/components/@Layout/HomeLayout'
import MyLoanDetail from '@/containers/MyLoanDetail'
import RepaymentApplicationComplete from '@/containers/RepaymentApplicationComplete'

function RepaymentApplicationCompletePage() {
  return (
    <>
      {/* output: 똑똑한개발자 | 메인 */}
      {/* titleTemplate는 /configs/seo/config.ts에서 변경 가능합니다. */}
      <NextSeo title="중도상환 신청 완료" />
      <HomeLayout content={<RepaymentApplicationComplete />} />
    </>
  )
}

export default RepaymentApplicationCompletePage
