import { useState } from 'react'

import { useRouter } from 'next/router'

import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  HStack,
  Input,
  SimpleGrid,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import * as PortOne from '@portone/browser-sdk/v2'

import { useFormContext } from 'react-hook-form'

import LoanTermsModal from '@/components/@Modal/LoanTermsModal'
import ModalBasis from '@/components/@Modal/ModalBasis'
import { ENV } from '@/configs/env'
import { useUserIdentityVerificationCreateMutation } from '@/generated/apis/User/User.query'
import { CaretRightIcon } from '@/generated/icons/MyIcons'
import { useSessionStorage } from '@/stores/session/state'
import { extractUserInfoFromJWT } from '@/utils/jwt'

const ApplyLoanStep2 = () => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext()

  const router = useRouter()

  const [userInfo, setUserInfo] = useState<{
    name?: string
    phone?: string
    birth?: string
    gender_code?: string
  } | null>(null)

  const { set } = useSessionStorage()
  const { mutateAsync: userIdentityVerificationCreate } =
    useUserIdentityVerificationCreateMutation({
      options: {
        onSuccess: (data) => {
          set({
            identityVerificationToken: data.identityVerificationToken,
          })

          const extractedUserInfo = extractUserInfoFromJWT(
            data.identityVerificationToken,
          )
          if (extractedUserInfo) {
            setUserInfo(extractedUserInfo)
            console.log('Extracted user info:', extractedUserInfo)
          }

          setIsPhoneCertification(true)
        },
      },
    })
  const handleAuthentication = async () => {
    const response = await PortOne.requestIdentityVerification({
      storeId: ENV.PORTONE_STORE_ID || '',
      identityVerificationId: crypto.randomUUID(),
      channelKey: ENV.PORTONE_CHANNEL_KEY || '',
      redirectUrl: `${window.location.origin}/apply-loan?step=2`,
    })
    if (response?.code !== undefined) {
      return alert(response?.message)
    }

    userIdentityVerificationCreate({
      data: {
        identityVerificationId: response?.identityVerificationId || '',
      },
    })
  }

  const typeConvert = (type: string) => {
    if (type === 'salary') {
      return 'A'
    } else if (type === 'credit') {
      return 'B'
    } else if (type === 'mortgage') {
      return 'C'
    } else {
      return 'A'
    }
  }

  const [isPhoneCertification, setIsPhoneCertification] = useState(false)
  return (
    <Container>
      <Flex py={{ base: '40px', sm: '48px', md: '84px' }} flexDir={'column'}>
        <VStack
          alignItems={'flex-start'}
          spacing={'32px'}
          mb={isPhoneCertification ? '32px' : '64px'}
        >
          <Text textStyle={'pre-heading-2'} color={'grey.10'}>
            기본정보 입력
          </Text>
          <VStack spacing={'12px'} alignItems={'flex-start'}>
            <Text textStyle={'pre-body-6'} color={'grey.10'}>
              휴대폰 간편인증{' '}
              <Text as="span" color={'primary.4'}>
                •
              </Text>
            </Text>
            <Button
              variant={'outline-primary'}
              w={'209px'}
              onClick={handleAuthentication}
            >
              {isPhoneCertification ?
                '휴대폰 간편인증 완료'
              : '휴대폰 간편인증'}
            </Button>
          </VStack>
        </VStack>
        {isPhoneCertification && (
          <SimpleGrid columns={{ base: 1, sm: 2 }} gap={'24px'} mb={'64px'}>
            <VStack spacing={'15px'} alignItems={'flex-start'}>
              <Text textStyle={'pre-body-7'} color={'grey.10'}>
                이름(한글)
              </Text>
              <Text textStyle={'pre-body-6'} color={'grey.7'}>
                {userInfo?.name || '-'}
              </Text>
            </VStack>
            <VStack spacing={'15px'} alignItems={'flex-start'}>
              <Text textStyle={'pre-body-7'} color={'grey.10'}>
                주민등록번호
              </Text>
              <Text textStyle={'pre-body-6'} color={'grey.7'}>
                {userInfo?.birth && userInfo?.gender_code ?
                  `${userInfo.birth.slice(2, 8)}-${userInfo.gender_code}******`
                : '-'}
              </Text>
            </VStack>
            <VStack spacing={'15px'} alignItems={'flex-start'}>
              <Text textStyle={'pre-body-7'} color={'grey.10'}>
                휴대폰번호
              </Text>
              <Text textStyle={'pre-body-6'} color={'grey.7'}>
                {userInfo?.phone ?
                  `${userInfo.phone.slice(0, 3)}-${userInfo.phone.slice(3, 7)}-${userInfo.phone.slice(7)}`
                : '-'}
              </Text>
            </VStack>
            <VStack spacing={'15px'} alignItems={'flex-start'}>
              <Text textStyle={'pre-body-7'} color={'grey.10'}>
                이메일
                <Text as="span" color={'primary.4'}>
                  •
                </Text>
              </Text>
              <Input {...register('email')} placeholder="이메일" />
              {errors.email && (
                <Text textStyle={'pre-body-6'} color={'red.10'}>
                  {errors.email.message as string}
                </Text>
              )}
            </VStack>
          </SimpleGrid>
        )}

        <Flex
          w={'100%'}
          justifyContent={'center'}
          pt={'40px'}
          borderTop={'1px solid'}
          borderColor={'border.basic.1'}
        >
          <Button
            variant={'solid-primary'}
            w={'160px'}
            isDisabled={!isPhoneCertification}
            onClick={() => {
              setValue('kind', typeConvert(router.query.type as string))
              router.replace('/apply-loan?step=3&type=' + router.query.type)
            }}
          >
            다음
          </Button>
        </Flex>
      </Flex>
    </Container>
  )
}

export default ApplyLoanStep2
