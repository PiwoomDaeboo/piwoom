import { useEffect, useState } from 'react'

import { useToast } from '@chakra-ui/react'

import { useUsebAccessTokenCreateMutation } from '@/generated/apis/Useb/Useb.query'
import { useUserRetrieveQuery } from '@/generated/apis/User/User.query'

const Ekyc = () => {
  const [usebAccessToken, setUsebAccessToken] = useState('')
  const { data: userData } = useUserRetrieveQuery({
    variables: {
      id: 'me',
    },
  })
  const { mutate: usebAccessTokenCreate } = useUsebAccessTokenCreateMutation({
    options: {
      onSuccess: (data) => {
        setUsebAccessToken(data.accessToken)
        console.log('usebAccessToken', data)
      },
    },
  })
  const toast = useToast()

  useEffect(() => {
    if (!userData) return

    usebAccessTokenCreate({})
  }, [userData, usebAccessTokenCreate])

  useEffect(() => {
    if (!usebAccessToken || !userData) return

    const KYC_TARGET_ORIGIN = 'https://kyc.useb.co.kr'
    const KYC_URL = 'https://kyc.useb.co.kr/auth'
    const params = {
      access_token: usebAccessToken,
      name: userData.name || '',
      birthday: `${userData.birth.slice(0, 4)}-${userData.birth.slice(4, 6)}-${userData.birth.slice(6, 8)}`,
      phone_number: userData.phone || '',
      email: userData.email || '',
    }

    const encodedParams = btoa(encodeURIComponent(JSON.stringify(params)))
    const kycIframe = document.getElementById('kyc_iframe') as HTMLIFrameElement

    if (!kycIframe) return

    const handleMessage = (e: MessageEvent) => {
      try {
        let decodedData
        try {
          decodedData = decodeURIComponent(atob(e.data))
          const json = JSON.parse(decodedData)
          console.log('Direct JSON parse result:', json)
          console.log(window.opener, json)
          if (json.result === 'success') {
            console.log(window.opener, json)
            window.opener.postMessage(json, '*')
            if (
              json?.review_result?.result_type &&
              json?.review_result?.result_type === 5
            ) {
              window.alert('심사가 필요합니다. 관리자에게 문의해주세요.')
            }
            // setTimeout(() => {
            //   window.close()
            // }, 1000)
          } else if (json.result === 'failed') {
            window.opener.postMessage(json, '*')
            toast({
              title: '신분증 인증 실패',
              description: '신분증 인증에 실패했습니다. 다시 시도해주세요.',
              status: 'error',
              duration: 5000,
            })
            // setTimeout(() => {
            //   window.close()
            // }, 1000)
          } else if (json.result === 'complete') {
            window.close()
          } else if (json.result === 'close') {
            window.close()
          }
          return
        } catch (atobError) {
          console.log('atob error, trying direct JSON parse:', atobError)
        }
      } catch (error) {
        console.log('wrong data', error)
        console.log('Raw message data:', e.data)
      }
    }

    window.addEventListener('message', handleMessage)

    // URL에 파라미터를 직접 포함시키는 방법도 시도
    const urlWithParams = `${KYC_URL}?data=${encodeURIComponent(encodedParams)}`

    kycIframe.onload = function () {
      try {
        // postMessage 방식
        kycIframe.contentWindow?.postMessage(encodedParams, KYC_TARGET_ORIGIN)

        // URL 파라미터 방식도 시도
        setTimeout(() => {
          if (kycIframe.contentWindow) {
            kycIframe.contentWindow.postMessage(encodedParams, '*')
          }
        }, 1000)
      } finally {
        kycIframe.onload = null // 한 번만 전송
      }
    }

    kycIframe.src = KYC_URL

    // cleanup 함수
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [usebAccessToken, userData])
  return (
    <div style={{ width: '100%', height: '100%', margin: 0, padding: 0 }}>
      <iframe
        id="kyc_iframe"
        style={{
          width: '100%',
          height: '100vh',
          overflowY: 'scroll',
          border: 'none',
          margin: 0,
          padding: 0,
        }}
        allow="camera"
        src="https://kyc.useb.co.kr/auth"
      ></iframe>
    </div>
  )
}

export default Ekyc
