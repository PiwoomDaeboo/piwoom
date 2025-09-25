import React, { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Flex,
  HStack,
  SimpleGrid,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react'

import Lottie from 'lottie-react'
import { useFormContext } from 'react-hook-form'

import ModalBasis from '@/components/@Modal/ModalBasis'
import CommonSelect from '@/components/CommonSelect'
import InputForm from '@/components/InputForm'
import loadingLottieData from '@/components/loading-lottie.json'
import {
  GovLoginRequestAgencyEnumType,
  GovLoginRequestMethodEnumType,
  WetaxLoginRequestAgencyEnumType,
  WetaxLoginRequestMethodEnumType,
} from '@/generated/apis/@types/data-contracts'
import {
  useGovLoginCreateMutation,
  useGovOtpCreateMutation,
  useGovRetrieveQuery,
} from '@/generated/apis/Gov/Gov.query'
import { useWetaxLoginCreateMutation } from '@/generated/apis/Wetax/Wetax.query'
import {
  CaretRightIcon,
  KakaoAuthenticationIcon,
  KbAuthenticationIcon,
  Loan1Icon,
  NaverAuthenticationIcon,
  PassAuthenticationIcon,
  ShinhanAuthenticationIcon,
  TossAuthenticationIcon,
  XCircleFillIcon,
  XIcon,
} from '@/generated/icons/MyIcons'
import { useQueryEffects } from '@/hooks/useQueryEffect'
import { useSessionStorage } from '@/stores/session/state'
import { extractUserInfoFromJWT } from '@/utils/jwt'

interface UntactDocumentApplyModalProps {
  isOpen: boolean
  onClose: () => void
}

const passTypes = [
  { label: 'SKT', value: '01' },
  { label: 'KT', value: '02' },
  { label: 'LGU+', value: '03' },
]

const authOptions = [
  { type: 'KAKAO', icon: KakaoAuthenticationIcon, label: '카카오' },
  { type: 'KB', icon: KbAuthenticationIcon, label: 'KB' },
  { type: 'PASS', icon: PassAuthenticationIcon, label: 'PASS' },
  { type: 'SHINHAN', icon: ShinhanAuthenticationIcon, label: '신한' },
  { type: 'NAVER', icon: NaverAuthenticationIcon, label: '네이버' },
  { type: 'TOSS', icon: TossAuthenticationIcon, label: '토스' },
]

function UntactDocumentApplyModal({
  isOpen,
  onClose,
}: UntactDocumentApplyModalProps) {
  const [selectedAuth, setSelectedAuth] = useState<string | null>(null)
  const [selectedPassType, setSelectedPassType] = useState<string>('')
  const [govRetrieveId, setGovRetrieveId] = useState<number | null>(null)
  const { setValue } = useFormContext()
  const [loadingProcess, setLoadingProcess] = useState<number>(0)
  const [userInfo, setUserInfo] = useState<{
    name?: string
    phone?: string
    birth?: string
    gender_code?: string
  } | null>(null)
  const { identityVerificationToken } = useSessionStorage()
  // const [shouldExecuteGovQuery, setShouldExecuteGovQuery] = useState(false)
  const toast = useToast()

  const [govData, setGovData] = useState<any>(null)
  useEffect(() => {
    const extractedUserInfo = extractUserInfoFromJWT(
      identityVerificationToken as string,
    )
    if (extractedUserInfo) {
      setUserInfo(extractedUserInfo)
    }
  }, [])
  const { mutate: govMutation, isPending: isGovMutationPending } =
    useGovLoginCreateMutation({
      options: {
        onSuccess: (data) => {
          setLoadingProcess(1)
          setGovRetrieveId(data?.id)
          setGovData(data)
          console.log(data)
        },
        onError: (error) => {
          console.error(error)
        },
      },
    })
  const govQuery = useGovRetrieveQuery({
    variables: {
      id: govRetrieveId || 0,
    },
    options: {
      enabled: !!govRetrieveId && loadingProcess === 2,
    },
  })

  const { mutate: otpGov, isPending: isOtpGovPending } =
    useGovOtpCreateMutation({
      options: {
        onSuccess: (data) => {
          setLoadingProcess(2)
        },
        onError: (error: any) => {
          toast({
            render: () => (
              <Box
                borderRadius={'10px'}
                color="white"
                p={'12px'}
                bg="rgba(27, 28, 29, 0.80)"
              >
                <HStack spacing={'24px'} alignItems={'center'}>
                  <XCircleFillIcon boxSize={'24px'} />
                  <Text textStyle={'pre-body-68'} color={'grey.0'}>
                    {error?.response?.data?.nonField[0]}
                  </Text>
                </HStack>
              </Box>
            ),
            duration: 5000,
            isClosable: true,
          })
        },
      },
    })

  useQueryEffects(govQuery, {
    onSuccess: (data) => {
      // Map each document kind to the corresponding form field with file value
      if (data.logSet && Array.isArray(data.logSet)) {
        data.logSet.forEach((logItem) => {
          switch (logItem.kind) {
            case 'INCOME_CERTIFICATE':
              setValue('incomeCertificate', logItem.file)
              break
            case 'RESIDENT_REGISTRATION_COPY':
              setValue('residentRegistrationCopy', logItem.file)
              break
            case 'HEALTH_INSURANCE_ELIGIBILITY_CONFIRMATION':
              setValue('healthInsuranceEligibilityConfirmation', logItem.file)
              break
            case 'HEALTH_INSURANCE_PAYMENT_CONFIRMATION':
              setValue('healthInsurancePaymentConfirmation', logItem.file)
              break
            case 'HEALTH_INSURANCE_PAYMENT_CONFIRMATION_2':
              setValue('healthInsurancePaymentConfirmation2', logItem.file)
              break
            default:
              console.warn('Unknown document kind:', logItem.kind)
          }
        })
      }
      console.log('[onSuccess]:', data)
    },
    onError: (error: any) => {
      console.error('[onError]:', error)
      // 에러 메시지 추출

      toast({
        title: '서류 제출 실패',
        description:
          error?.response?.data?.nonField[0] ||
          '서류 제출 중 오류가 발생했습니다.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    },
    onSettled: (data, error) => {
      console.log('[onSettled]:', data, error)
    },
  })

  const handleClose = () => {
    setLoadingProcess(0)
    onClose()
  }

  const handleAuthSelect = (authType: string) => {
    setSelectedAuth(authType)
    if (authType !== 'pass') {
      setSelectedPassType('')
    }
  }

  const handleLoginGov = () => {
    govMutation({
      data: {
        method: selectedAuth as GovLoginRequestMethodEnumType,
        name: userInfo?.name || '',
        birth: userInfo?.birth || '',
        phone: userInfo?.phone || '',
        agency: selectedPassType as GovLoginRequestAgencyEnumType,
      },
    })
  }
  const handleOtpGov = () => {
    otpGov({
      id: govData?.id || 0,
      data: {
        common: govData?.common as any,
        sessionId: govData?.sessionId || '',
      },
    })
  }
  const renderBody = () => {
    switch (loadingProcess) {
      case 0:
        return (
          <VStack spacing={'20px'} align={'stretch'}>
            <SimpleGrid
              p={'20px'}
              columns={4}
              spacing={'26px'}
              bg={'grey.1'}
              w={'100%'}
              borderRadius={'10px'}
            >
              {authOptions.map(({ type, icon: Icon, label }) => (
                <Flex
                  key={type}
                  direction={'column'}
                  align={'center'}
                  p={'16px'}
                  borderRadius={'10px'}
                  cursor={'pointer'}
                  bg={selectedAuth === type ? 'primary.1' : 'transparent'}
                  border={
                    selectedAuth === type ? '2px solid' : (
                      '2px solid transparent'
                    )
                  }
                  borderColor={
                    selectedAuth === type ? 'primary.3' : 'transparent'
                  }
                  _hover={{
                    bg: selectedAuth === type ? 'primary.1' : 'grey.2',
                  }}
                  onClick={() => handleAuthSelect(type)}
                >
                  <Icon boxSize={'80px'} />
                </Flex>
              ))}
            </SimpleGrid>

            {selectedAuth === 'pass' && (
              <InputForm label="통신사" isRequired>
                <CommonSelect
                  options={passTypes}
                  placeholder="선택"
                  value={passTypes.find(
                    (option) => option.value === selectedPassType,
                  )}
                  onChange={(selectedOption) =>
                    setSelectedPassType(selectedOption?.value || '')
                  }
                />
              </InputForm>
            )}
          </VStack>
        )
      case 1:
        return <SubmittingAuthProcess />
      case 2:
        return <SubmittingProcess />
    }
  }
  return (
    <ModalBasis
      isOpen={isOpen}
      visibleCloseButton={false}
      onClose={handleClose}
      size={{ base: 'full', sm: 'xl' }}
      header={
        <Box
          pb={'16px'}
          borderBottom={'1px solid'}
          borderColor={'border.basic.2'}
        >
          <Text textStyle={'pre-heading-2'} color={'grey.10'}>
            비대면 서류제출
          </Text>
        </Box>
      }
      body={renderBody()}
      footer={
        <>
          {loadingProcess === 0 && (
            <Button
              variant={'solid-primary'}
              w={'100%'}
              onClick={handleLoginGov}
              isLoading={isGovMutationPending}
              loadingText="인증절차 처리중"
            >
              다음
            </Button>
          )}
          {loadingProcess === 1 && (
            <Flex
              w={'100%'}
              justifyContent={'center'}
              alignItems={'center'}
              gap={'10px'}
            >
              <Button
                variant={'outline-secondary'}
                w={'100%'}
                onClick={handleClose}
              >
                취소
              </Button>
              <Button
                variant={'solid-primary'}
                w={'100%'}
                isLoading={isOtpGovPending}
                loadingText="인증절차 처리중"
                onClick={handleOtpGov}
              >
                인증완료
              </Button>
            </Flex>
          )}
          {loadingProcess === 2 && (
            <Button
              variant={'solid-primary'}
              w={'100%'}
              onClick={handleClose}
              // isLoading={isPending}
            >
              확인
            </Button>
          )}
        </>
      }
    ></ModalBasis>
  )
}

export default UntactDocumentApplyModal

const SubmittingAuthProcess = () => {
  return (
    <VStack
      spacing={'20px'}
      alignItems={'center'}
      p={'40px'}
      bg={'grey.1'}
      w={'100%'}
      borderRadius={'10px'}
    >
      <VStack spacing={'8px'} alignItems={'center'}>
        <Text textStyle={'pre-body-5'} color={'grey.9'}>
          인증을 진행해 주세요
        </Text>
        <Text textStyle={'pre-body-68'} color={'grey.9'} textAlign={'center'}>
          입력하신 휴대폰으로 인증 요청 메시지를 보냈습니다. <br />
          앱에서 인증을 진행해 주세요.
        </Text>
      </VStack>
      <Flex gap={'5px'} alignItems={'center'}>
        <VStack spacing={'6px'} alignItems={'center'}>
          <Flex
            border={'1px solid'}
            borderColor={'primary.2'}
            borderRadius={'10px'}
            p={'16px'}
            justifyContent={'center'}
            alignItems={'center'}
            w={'94px'}
          >
            <Loan1Icon boxSize={'24px'} />
          </Flex>
          <Flex flexDir={'column'} alignItems={'center'}>
            <Text textStyle={'pre-caption-1'} color={'primary.4'}>
              STEP 01
            </Text>
            <Text
              textStyle={'pre-caption-2'}
              color={'grey.9'}
              textAlign={'center'}
            >
              앱에서 인증요청
              <br />
              메시지 확인
            </Text>
            <Text textStyle={'pre-body-68'} color={'grey.9'}></Text>
          </Flex>
        </VStack>
        <CaretRightIcon boxSize={'24px'} />
        <VStack
          spacing={'6px'}
          alignItems={'center'}
          justifyContent={'flex-start'}
        >
          <Flex
            border={'1px solid'}
            borderColor={'primary.2'}
            borderRadius={'10px'}
            p={'16px'}
            justifyContent={'center'}
            alignItems={'center'}
            w={'94px'}
          >
            <Loan1Icon boxSize={'24px'} />
          </Flex>
          <Flex flexDir={'column'} alignItems={'center'}>
            <Text textStyle={'pre-caption-1'} color={'primary.4'}>
              STEP 02
            </Text>
            <Text
              textStyle={'pre-caption-2'}
              color={'grey.9'}
              textAlign={'center'}
            >
              간편인증 (비밀번호 등)
            </Text>
            <Text
              textStyle={'pre-body-68'}
              color={'grey.9'}
              height={'20px'}
            ></Text>
          </Flex>
        </VStack>
        <CaretRightIcon boxSize={'24px'} />
        <VStack spacing={'6px'} alignItems={'center'}>
          <Flex
            border={'1px solid'}
            borderColor={'primary.2'}
            borderRadius={'10px'}
            p={'16px'}
            justifyContent={'center'}
            alignItems={'center'}
            w={'94px'}
          >
            <Loan1Icon boxSize={'24px'} />
          </Flex>
          <Flex flexDir={'column'} alignItems={'center'}>
            <Text textStyle={'pre-caption-1'} color={'primary.4'}>
              STEP 03
            </Text>
            <Text
              textStyle={'pre-caption-2'}
              color={'grey.9'}
              textAlign={'center'}
            >
              인증완료 후,
              <br />
              하단의 인증완료 클릭
            </Text>
          </Flex>
        </VStack>
      </Flex>
    </VStack>
  )
}

const SubmittingProcess = () => {
  return (
    <VStack
      spacing={'20px'}
      alignItems={'center'}
      p={'40px'}
      bg={'grey.1'}
      w={'100%'}
      borderRadius={'10px'}
    >
      <VStack spacing={'8px'} alignItems={'center'}>
        <Text textStyle={'pre-heading-3'} color={'grey.10'}>
          서류를 불러오는 중입니다
        </Text>
        <Text textStyle={'pre-body-6'} color={'grey.7'} textAlign={'center'}>
          조금만 기다려 주세요!
        </Text>
      </VStack>
      <Box w={'144px'} h={'144px'}>
        <Lottie
          animationData={loadingLottieData}
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
        />
      </Box>
    </VStack>
  )
}
