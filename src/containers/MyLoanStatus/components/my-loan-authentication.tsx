import { useRouter } from 'next/router'

import { Button, Container, Flex, Text, VStack } from '@chakra-ui/react'
import PortOne from '@portone/browser-sdk/v2'

import { useUserLoginCreateMutation } from '@/generated/apis/User/User.query'
import { SecurityIcon } from '@/generated/icons/MyIcons'
import { useAuth } from '@/hooks/useAuth'
import { useLocalStorage } from '@/stores/local/state'

function MyLoanAuthentication() {
  const { set } = useLocalStorage()
  const router = useRouter()

  const { mutateAsync: userLoginCreate } = useUserLoginCreateMutation({
    options: {
      onSuccess: (data) => {
        set({
          token: {
            access_token: data.accessToken,
            refresh_token: data.refreshToken,
          },
        })
        router.push(`/my-loan-status`)
      },
      onError: (error: any) => {
        if (error?.response?.data?.status === 400) {
          router.push(`/my-loan-status`)
        } else {
          console.error('userLoginCreate', error)
        }
        console.error('userLoginCreate', error)
      },
    },
  })
  const handleAuthentication = async () => {
    const response = await PortOne.requestIdentityVerification({
      storeId: 'store-5fcf48f2-05d3-43e2-9abe-c09b3f461e2d',
      identityVerificationId: crypto.randomUUID(),
      channelKey: 'channel-key-1e7295f0-e634-4e2b-9da5-2402b97e7a63',
      redirectUrl: `${window.location.origin}/my-loan-status`,
    })
    if (response?.code !== undefined) {
      return alert(response?.message)
    }

    userLoginCreate({
      data: {
        identityVerificationId: response?.identityVerificationId || '',
      },
    })
    //TODO: 인증 후 개인정보를 가져와서 사용자 정보 표기하기
  }
  return (
    <Container px={{ base: 0, md: '190px' }}>
      <Flex
        w={'100%'}
        h={'100%'}
        p={{
          base: '28px 32px 40px 32px',
          sm: '28px 64px 40px 64px',
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
        <Flex w={'100%'} justifyContent={'center'} mt={'24px'}>
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
  )
}
export default MyLoanAuthentication
