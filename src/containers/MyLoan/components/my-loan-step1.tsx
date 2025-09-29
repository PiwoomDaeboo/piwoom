import { useRouter } from 'next/router'

import {
  AspectRatio,
  Button,
  Container,
  Flex,
  Text,
  VStack,
} from '@chakra-ui/react'
import * as PortOne from '@portone/browser-sdk/v2'

import ImageAsNext from '@/components/ImageAsNext'
import { ENV } from '@/configs/env'
import {
  useUserIdentityVerificationCreateMutation,
  useUserLoginCreateMutation,
} from '@/generated/apis/User/User.query'
import { MY_IMAGES } from '@/generated/path/images'
import { useLocalStorage } from '@/stores/local/state'
import { cookieStorage } from '@/utils/cookie-storage'

const MyLoanStep1 = () => {
  const router = useRouter()
  const { set } = useLocalStorage()

  const { mutateAsync: userLoginCreate } = useUserLoginCreateMutation({
    options: {
      onSuccess: (data) => {
        set({
          token: {
            access_token: data.accessToken,
            refresh_token: data.refreshToken,
          },
        })
        router.push(`/my-loan?step=2`)
      },
    },
  })
  const handleAuthentication = async () => {
    const response = await PortOne.requestIdentityVerification({
      storeId: ENV.PORTONE_STORE_ID || '',
      identityVerificationId: crypto.randomUUID(),
      channelKey: ENV.PORTONE_CHANNEL_KEY || '',
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
  }
  return (
    <Container>
      <Flex
        pt={{ base: '40px', sm: '48px', md: '80px' }}
        pb={'120px'}
        flexDir={'column'}
      >
        <VStack alignItems={'flex-start'} spacing={'8px'}>
          <Text textStyle={'pre-heading-2'} color={'grey.10'}>
            전자계약 작성하기
          </Text>
          <Text textStyle={'pre-body-6'} color={'grey.7'}>
            대출계약 리스트 확인을 위해 아래의 인증을 진행해 주세요.
          </Text>
        </VStack>
        <VStack alignItems={'flex-start'} mt={'32px'}>
          <Text my={'16px'} textStyle={'pre-heading-3'} color={'primary.4'}>
            본인인증
          </Text>
          <Flex
            w={'100%'}
            flexDir={'column'}
            p={'28px 32px'}
            bg={'background.basic.2'}
            borderRadius={'20px'}
            gap={'24px'}
          >
            <VStack alignItems={'flex-start'} spacing={'6px'}>
              <Text textStyle={'pre-heading-4'} color={'primary.4'}>
                [대출안내]
              </Text>
              <Text>
                대출 승인이 난 경우, 전자계약서 작성이 완료되어야 대출금 송금이
                가능합니다.
                <br />
                일정 기한 내 전자계약서 작성이 완료되지 않을 경우, 해당 대출
                건은 취소 처리될 수 있습니다.
              </Text>
            </VStack>
            <VStack alignItems={'flex-start'} spacing={'6px'}>
              <Text textStyle={'pre-heading-4'} color={'primary.4'}>
                [전자계약 안내]
              </Text>
              <Text>
                피움대부와의 대출 계약은 국내 1위 전자서명 솔루션 업체인
                모두싸인을 통해 이루어집니다.
                <br />
                전자문서 및 전자서명은 각각 전자문서및전자거래기본법 제4조와
                전자서명법 제3조 등에 따라 법적 효력을 가집니다.
                <br />
                대출 계약서에 입력되는 전자서명은 반드시 당사자의 약정(동의) 후
                입력됩니다.
              </Text>
            </VStack>
            <Flex w={'100%'} justifyContent={'flex-end'} mt={'16px'}>
              <AspectRatio ratio={101 / 14} w={'101px'} h={'14px'}>
                <ImageAsNext
                  src={MY_IMAGES.MODUSIGN.src}
                  alt={MY_IMAGES.MODUSIGN.alt}
                  objectFit="cover"
                />
              </AspectRatio>
            </Flex>
          </Flex>
          <Flex w={'100%'} justifyContent={'center'} mt={'24px'}>
            <Button
              w={'200px'}
              onClick={handleAuthentication}
              variant={'solid-primary'}
            >
              본인인증 진행
            </Button>
          </Flex>
        </VStack>
      </Flex>
    </Container>
  )
}

export default MyLoanStep1
