import React from 'react'

import { NextSeo } from 'next-seo'

import HomeLayout from '@/components/@Layout/HomeLayout'
import Faq from '@/containers/FrequentlyAskedQuestions'
import Notice from '@/containers/Notice'

function FaqPage() {
  return (
    <>
      {/* output: 똑똑한개발자 | 메인 */}
      {/* titleTemplate는 /configs/seo/config.ts에서 변경 가능합니다. */}
      <NextSeo title="자주하는 질문" />
      <HomeLayout content={<Faq />} />
    </>
  )
}

export default FaqPage
