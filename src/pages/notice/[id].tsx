import React from 'react'

import { NextSeo } from 'next-seo'

import HomeLayout from '@/components/@Layout/HomeLayout'
import NoticeDetail from '@/containers/NoticeDetail'

function NoticeDetailPage() {
  return (
    <>
      {/* output: 똑똑한개발자 | 메인 */}
      {/* titleTemplate는 /configs/seo/config.ts에서 변경 가능합니다. */}
      <NextSeo title="공지사항 상세" />
      <HomeLayout content={<NoticeDetail />} />
    </>
  )
}

export default NoticeDetailPage
