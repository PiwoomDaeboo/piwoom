import React from 'react'

import { NextSeo } from 'next-seo'

import HomeLayout from '@/components/@Layout/HomeLayout'
import Loan from '@/containers/Loan'
import MyLoan from '@/containers/MyLoan'
import Policy from '@/containers/Policy'

function MyLoanPage() {
  return (
    <>
      {/* output: 똑똑한개발자 | 메인 */}
      {/* titleTemplate는 /configs/seo/config.ts에서 변경 가능합니다. */}
      <NextSeo title="나의 대출조회" />
      <HomeLayout content={<MyLoan />} />
    </>
  )
}

export default MyLoanPage
