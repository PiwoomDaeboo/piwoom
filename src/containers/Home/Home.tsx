import { useEffect } from 'react'

import { Box, Button } from '@chakra-ui/react'

import MyLoanTermsModal from '../MyLoan/components/my-loan-terms-modal'
import Terms from '../Terms'
import Section0 from './components/Section0'
import Section1 from './components/Section1'
import Section2 from './components/Section2'
import Section3 from './components/Section3'
import Section4 from './components/Section4'
import Section5 from './components/Section5'
import Section6 from './components/Section6'

function Home() {
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    const isKakaoInApp = userAgent.includes('kakaotalk')

    // 카카오톡 인앱 브라우저일 경우에만 실행
    if (isKakaoInApp) {
      const targetUrl = 'https://piwoom.com/'
      window.location.replace(
        `kakaotalk://web/openExternal?url=${encodeURIComponent(targetUrl)}`,
      )
    }
  }, [])
  return (
    <>
      {/* <Section0 /> */}
      <Box
        w={'100%'}
        background={'linear-gradient(180deg, #FFF 0%, #F1F7FF 100%)'}
      >
        <Section1 />
        <Section2 />
      </Box>
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
    </>
  )
}
export default Home
