import { useEffect, useState } from 'react'

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
  useToast,
} from '@chakra-ui/react'
import * as PortOne from '@portone/browser-sdk/v2'

import { Controller, useFormContext, useWatch } from 'react-hook-form'

import { ENV } from '@/configs/env'
import {
  useUserLoginCreateMutation,
  useUserRetrieveQuery,
} from '@/generated/apis/User/User.query'
import { useLocalStorage } from '@/stores/local/state'

const ApplyLoanStep2 = () => {
  const {
    register,
    formState: { errors },
    setValue,
    control,
  } = useFormContext()
  const toast = useToast()
  const { token: accessToken, reset, set } = useLocalStorage()

  const emailValue = useWatch({ control, name: 'email' })
  const { mutateAsync: userLoginCreate } = useUserLoginCreateMutation({
    options: {
      onSuccess: (data) => {
        set({
          token: {
            access_token: data.accessToken,
            refresh_token: data.refreshToken,
          },
        })
        // 사용자가 이미 입력한 이메일이 있으면 덮어쓰지 않음
        if (!emailValue && userData?.email) {
          setValue('email', userData.email)
        }
        router.replace(`/apply-loan?step=2&type=${router.query.type}`)
        setIsPhoneCertification(true)
      },
      onError: (error: any) => {
        toast({
          title: error?.response?.data?.nonField[0],
          status: 'error',
          duration: 5000,
        })
      },
    },
  })

  const router = useRouter()

  const handleAuthentication = async () => {
    const response = await PortOne.requestIdentityVerification({
      storeId: ENV.PORTONE_STORE_ID || '',
      identityVerificationId: crypto.randomUUID(),
      channelKey: ENV.PORTONE_CHANNEL_KEY || '',
      redirectUrl: `${window.location.origin}/apply-loan?type=${router.query.type}`,
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

  const { data: userData } = useUserRetrieveQuery({
    variables: {
      id: 'me',
    },
    options: {
      enabled: !!accessToken,
    },
  })
  useEffect(() => {
    if (accessToken) {
      setIsPhoneCertification(true)
      if (!emailValue && userData?.email) {
        setValue('email', userData.email)
      }
    }
  }, [accessToken, userData?.email, setValue, emailValue])

  // useEffect(() => {
  //   const {
  //     identityVerificationId,
  //     identityVerificationTxId,
  //     transactionType,
  //   } = router.query

  //   if (
  //     identityVerificationId &&
  //     identityVerificationTxId &&
  //     transactionType === 'IDENTITY_VERIFICATION'
  //   ) {
  //     userLoginCreate({
  //       data: {
  //         identityVerificationId: identityVerificationId as string,
  //       },
  //     })

  //     const {
  //       identityVerificationId: _,
  //       identityVerificationTxId: __,
  //       transactionType: ___,
  //       ...cleanQuery
  //     } = router.query
  //     router.replace(
  //       {
  //         pathname: router.pathname,
  //         query: cleanQuery,
  //       },
  //       undefined,
  //       { shallow: true },
  //     )
  //   }
  // }, [router.query])

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
              휴대폰 본인인증{' '}
              <Text as="span" color={'primary.4'}>
                •
              </Text>
            </Text>
            <Button
              variant={'outline-primary'}
              isDisabled={isPhoneCertification}
              w={'209px'}
              onClick={handleAuthentication}
            >
              {isPhoneCertification ?
                '휴대폰 본인인증 완료'
              : '휴대폰 본인인증'}
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
                {userData?.name || '-'}
              </Text>
            </VStack>
            <VStack spacing={'15px'} alignItems={'flex-start'}>
              <Text textStyle={'pre-body-7'} color={'grey.10'}>
                주민등록번호
              </Text>
              <Text textStyle={'pre-body-6'} color={'grey.7'}>
                {userData?.birth && userData?.genderCode ?
                  `${userData.birth.slice(2, 8)}-${userData.genderCode}******`
                : '-'}
              </Text>
            </VStack>
            <VStack spacing={'15px'} alignItems={'flex-start'}>
              <Text textStyle={'pre-body-7'} color={'grey.10'}>
                휴대폰번호
              </Text>
              <Text textStyle={'pre-body-6'} color={'grey.7'}>
                {userData?.phone ?
                  `${userData.phone.slice(0, 3)}-${userData.phone.slice(3, 7)}-${userData.phone.slice(7)}`
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
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="이메일"
                    value={field.value || ''}
                  />
                )}
              />
              {errors.email && (
                <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
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
            isDisabled={!isPhoneCertification || !!errors.email || !emailValue}
            onClick={() => {
              if (emailValue) {
                setValue('email', emailValue)
              }
              setValue('kind', typeConvert(router.query.type as string))
              reset('popup_status')
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
