import { useEffect } from 'react'

import { useRouter } from 'next/router'

import {
  Button,
  Container,
  Flex,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react'
import PortOne from '@portone/browser-sdk/v2'

import { ENV } from '@/configs/env'
import { useUserLoginCreateMutation } from '@/generated/apis/User/User.query'
import { SecurityIcon } from '@/generated/icons/MyIcons'
import { useLocalStorage } from '@/stores/local/state'
import { handleErrorToast } from '@/utils/error-handler'

function MyLoanAuthentication() {
  const { set, token } = useLocalStorage()
  const router = useRouter()
  const toast = useToast()

  const { mutateAsync: userLoginCreate } = useUserLoginCreateMutation({
    options: {
      onSuccess: (data) => {
        const tokenData = {
          access_token: data.accessToken,
          refresh_token: data.refreshToken,
        }

        set({
          token: tokenData,
        })

        // 토큰 저장 후 즉시 확인
        setTimeout(() => {
          const savedToken = useLocalStorage.getState().token

          if (savedToken?.access_token) {
            router.replace(`/my-loan-status?tab=0&page=1`)
          } else {
            console.error('토큰 저장 실패, 재시도')
            // 토큰 저장이 실패한 경우 재시도
            set({
              token: tokenData,
            })
            setTimeout(() => {
              router.replace(`/my-loan-status?tab=0&page=1`)
            }, 200)
          }
        }, 100)
      },
      onError: (error: any) => {
        if (error?.response?.data?.status === 400) {
          toast({
            title: error?.response?.data?.nonField[0],
            status: 'error',
            duration: 5000,
          })
        } else {
          console.error('userLoginCreate', error)
        }
        console.error('userLoginCreate', error)
      },
    },
  })
  const handleAuthentication = async () => {
    try {
      const response = await PortOne.requestIdentityVerification({
        storeId: ENV.PORTONE_STORE_ID || '',
        identityVerificationId: crypto.randomUUID(),
        channelKey: ENV.PORTONE_CHANNEL_KEY || '',
        redirectUrl: `${window.location.origin}/my-loan-auth`,
      })

      // PortOne 인증 실패 체크
      if (response?.code !== undefined) {
        return alert(response.message)
      }

      // 인증 성공 시에만 userLoginCreate 실행
      if (response?.identityVerificationId) {
        userLoginCreate({
          data: {
            identityVerificationId: response.identityVerificationId,
          },
        })
      } else {
        console.error('identityVerificationId가 없습니다:', response)
      }
    } catch (error) {
      console.error('PortOne 인증 중 오류:', error)
    }
  }
  useEffect(() => {
    const {
      identityVerificationId,
      identityVerificationTxId,
      transactionType,
    } = router.query

    if (
      identityVerificationId &&
      identityVerificationTxId &&
      transactionType === 'IDENTITY_VERIFICATION'
    ) {
      userLoginCreate({
        data: {
          identityVerificationId: identityVerificationId as string,
        },
      })

      const {
        identityVerificationId: _,
        identityVerificationTxId: __,
        transactionType: ___,
        ...cleanQuery
      } = router.query
      router.replace(
        {
          pathname: router.pathname,
          query: cleanQuery,
        },
        undefined,
        { shallow: true },
      )
    }
  }, [router.query, userLoginCreate])

  return (
    <>
      <Flex w={'100%'} h={'100%'} py={'60px'} bg={'primary.1'}>
        <Container>
          <VStack alignItems={'flex-start'} spacing={'8px'}>
            <Text textStyle={'pre-display-3'} color={'grey.10'}>
              대출 현황 조회
            </Text>
            <Text textStyle={'pre-body-4'} color={'grey.10'}>
              나의 대출 현황 정보를 조회해 보세요.
            </Text>
          </VStack>
        </Container>
      </Flex>
      <Container py={'64px'}>
        <Container px={{ base: 0, md: '190px' }}>
          <Flex
            w={'100%'}
            h={'100%'}
            p={{
              base: '28px 32px 36px 32px',
              sm: '28px 64px 36px 64px',
              md: '28px 64px 48px 64px',
            }}
            justifyContent={'center'}
            alignItems={'center'}
            flexDir={'column'}
            gap={'32px'}
            borderRadius={'32px'}
            bg={'grey.0'}
            boxShadow={'0 8px 50px 0 rgba(0, 46, 114, 0.10)'}
          >
            <VStack alignItems={'center'} spacing={'6px'}>
              <SecurityIcon boxSize={'94px'} />
              <Text textStyle={'pre-heading-1'} color={'grey.10'}>
                나의 대출 조회
              </Text>
              <Text textStyle={'pre-body-6'} color={'grey.9'}>
                고객님의 대출정보를 확인하기 위해 본인인증을 진행해 주세요.
              </Text>
            </VStack>
            <Flex w={'100%'} justifyContent={'center'}>
              <Button
                w={'200px'}
                onClick={handleAuthentication}
                variant={'solid-primary'}
                size={'lg'}
              >
                본인인증 진행
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Container>
    </>
  )
}
export default MyLoanAuthentication
