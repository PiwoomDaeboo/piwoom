import React from 'react'

import { NextSeo } from 'next-seo'

import HomeLayout from '@/components/@Layout/HomeLayout'
import Company from '@/containers/Company/Company'

function CompanyPage() {
  return (
    <>
      {/* output: 똑똑한개발자 | 메인 */}
      {/* titleTemplate는 /configs/seo/config.ts에서 변경 가능합니다. */}
      <NextSeo title="회사소개" />
      <HomeLayout content={<Company />} />
    </>
  )
}

export default CompanyPage
