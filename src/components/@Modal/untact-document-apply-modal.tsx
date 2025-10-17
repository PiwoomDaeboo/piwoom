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
import { useUserRetrieveQuery } from '@/generated/apis/User/User.query'
import {
  AuthUserIcon,
  CaretRightIcon,
  DeviceMobile1Icon,
  DeviceMobileIcon,
  HanaauthenticationIcon,
  KakaoAuthenticationIcon,
  KbAuthenticationIcon,
  NaverAuthenticationIcon,
  NhauthenticationIcon,
  PassAuthenticationIcon,
  SamsungauthenticationIcon,
  ShinhanAuthenticationIcon,
  TossAuthenticationIcon,
  WooriauthenticationIcon,
  XCircleFillIcon,
} from '@/generated/icons/MyIcons'
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

// KAKAO - 카카오톡
// SAMSUNG - 삼성패스
// KB - 국민인증서
// PASS - 통신사PASS
// SHINHAN - 신한인증서
// NAVER - 네이버
// TOSS - 토스
// NH - NH인증서
// WOORI - 우리인증서
// HANA - 하나인증서

const authOptions = [
  { type: 'KB', icon: KbAuthenticationIcon, label: '국민인증서' },
  { type: 'NH', icon: NhauthenticationIcon, label: 'NH인증서' },
  { type: 'PASS', icon: PassAuthenticationIcon, label: '통신사PASS' },
  { type: 'WOORI', icon: WooriauthenticationIcon, label: '우리인증서' },
  { type: 'NAVER', icon: NaverAuthenticationIcon, label: '네이버' },
  { type: 'SAMSUNG', icon: SamsungauthenticationIcon, label: '삼성패스' },
  { type: 'KAKAO', icon: KakaoAuthenticationIcon, label: '카카오톡' },
  { type: 'TOSS', icon: TossAuthenticationIcon, label: '토스' },
  { type: 'SHINHAN', icon: ShinhanAuthenticationIcon, label: '신한인증서' },
  { type: 'HANA', icon: HanaauthenticationIcon, label: '하나인증서' },
]

function UntactDocumentApplyModal({
  isOpen,
  onClose,
}: UntactDocumentApplyModalProps) {
  const [selectedAuth, setSelectedAuth] = useState<string | null>(null)
  const [selectedPassType, setSelectedPassType] = useState<string>('')
  const [govRetrieveId, setGovRetrieveId] = useState<number | null>(null)
  const { setValue, trigger } = useFormContext()
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
  const [shouldPoll, setShouldPoll] = useState(true)
  const [completedDocuments, setCompletedDocuments] = useState<number>(0)
  const [totalDocuments, setTotalDocuments] = useState<number>(5) // 총 5개 문서
  const [currentStatus, setCurrentStatus] = useState<string>('PENDING')

  const { data: userData } = useUserRetrieveQuery({
    variables: {
      id: 'me',
    },
    options: {
      enabled: !!identityVerificationToken,
    },
  })

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
        },
        onError: (error) => {
          console.error(error)
        },
      },
    })

  const govQuery = useGovRetrieveQuery({
    variables: {
      id: govRetrieveId as number,
    },
    options: {
      enabled:
        govRetrieveId !== null &&
        ((loadingProcess === 2 && shouldPoll) || !!isOpen),
      refetchInterval: shouldPoll ? 5000 : false,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
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

  // 실제 API 응답을 처리하는 useEffect
  useEffect(() => {
    const data = govQuery.data
    if (!data) return

    // 상태 업데이트
    if (data.status) {
      setCurrentStatus(data.status)
    }

    let completedCount = 0

    if (data.logSet && Array.isArray(data.logSet)) {
      completedCount = data.logSet.filter((logItem) => logItem.file).length
    }

    setCompletedDocuments(completedCount)

    if (data.logSet && Array.isArray(data.logSet)) {
      data.logSet.forEach((logItem) => {
        console.log(
          '[setValue] Setting field:',
          logItem.kind,
          'value:',
          logItem.file || logItem.address,
        )
        switch (logItem.kind) {
          case 'INCOME_CERTIFICATE':
            setValue('incomeCertificate', logItem.file, {
              shouldValidate: true,
              shouldDirty: true,
            })
            break
          case 'RESIDENT_REGISTRATION_COPY':
            setValue('residentRegistrationCopy', logItem.address, {
              shouldValidate: true,
              shouldDirty: true,
            })
            break
          case 'HEALTH_INSURANCE_ELIGIBILITY_CONFIRMATION':
            setValue('healthInsuranceEligibilityConfirmation', logItem.file, {
              shouldValidate: true,
              shouldDirty: true,
            })
            break
          case 'HEALTH_INSURANCE_PAYMENT_CONFIRMATION':
            setValue('healthInsurancePaymentConfirmation', logItem.file, {
              shouldValidate: true,
              shouldDirty: true,
            })
            break
          case 'HEALTH_INSURANCE_PAYMENT_CONFIRMATION_2':
            setValue('healthInsurancePaymentConfirmation2', logItem.file, {
              shouldValidate: true,
              shouldDirty: true,
            })
            break
          default:
            console.warn('Unknown document kind:', logItem.kind)
        }
      })

      setTimeout(() => {
        trigger()
      }, 100)
    }

    if (data.status === 'SUCCESS') {
      console.log('[Real API] SUCCESS detected, stopping polling')
      setShouldPoll(false)
      toast({
        title: '서류 제출 완료',
        description: '모든 서류가 성공적으로 제출되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } else if (data.status === 'FAILED') {
      console.log('[Real API] FAILED detected, stopping polling')
      setShouldPoll(false)
      toast({
        title: '서류 제출 실패',
        description: data.failedReason || '서류 제출 중 오류가 발생했습니다.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }, [govQuery.data, setValue, trigger, toast])

  // 실제 API 에러 처리
  useEffect(() => {
    if (govQuery.error) {
      console.error('[Real API onError]:', govQuery.error)
      setShouldPoll(false)
      setCurrentStatus('FAILED')

      toast({
        title: '서류 제출 실패',
        description: '서류 제출 중 오류가 발생했습니다.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }, [govQuery.error, toast])

  const handleClose = () => {
    setLoadingProcess(0)
    setShouldPoll(true)
    setCompletedDocuments(0)
    setCurrentStatus('PENDING')
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
        name: userInfo?.name || userData?.name || '',
        birth: userInfo?.birth || userData?.birth || '',
        phone: userInfo?.phone || userData?.phone || '',
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
              columns={{ base: 4, sm: 5 }}
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

            {selectedAuth === 'PASS' && (
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
        return (
          <SubmittingProcess
            completedDocuments={completedDocuments}
            totalDocuments={totalDocuments}
            currentStatus={currentStatus}
          />
        )
    }
  }
  return (
    <ModalBasis
      isOpen={isOpen}
      visibleCloseButton={true}
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
      px={{ base: '10px', sm: '40px' }}
      py={{ base: '32px', sm: '40px' }}
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
      <Flex
        gap={'5px'}
        alignItems={'center'}
        w={'100%'}
        flexDir={{ base: 'column', sm: 'row' }}
      >
        <VStack w={'100%'} spacing={'6px'} alignItems={'center'}>
          <Flex
            border={'1px solid'}
            borderColor={'primary.2'}
            borderRadius={'10px'}
            px={'16px'}
            py={{ base: '9px', sm: '16px' }}
            justifyContent={'center'}
            alignItems={'center'}
            w={{ base: '100%', sm: '94px' }}
          >
            <DeviceMobile1Icon boxSize={'28px'} />
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
        <CaretRightIcon
          boxSize={'24px'}
          display={{ base: 'none', sm: 'block' }}
        />
        <VStack
          w={'100%'}
          spacing={'6px'}
          alignItems={'center'}
          justifyContent={'flex-start'}
        >
          <Flex
            border={'1px solid'}
            borderColor={'primary.2'}
            borderRadius={'10px'}
            px={'16px'}
            py={{ base: '9px', sm: '16px' }}
            justifyContent={'center'}
            alignItems={'center'}
            w={{ base: '100%', sm: '94px' }}
          >
            <AuthUserIcon boxSize={'28px'} />
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
        <CaretRightIcon
          display={{ base: 'none', sm: 'block' }}
          boxSize={'24px'}
        />
        <VStack w={'100%'} spacing={'6px'} alignItems={'center'}>
          <Flex
            border={'1px solid'}
            borderColor={'primary.2'}
            borderRadius={'10px'}
            px={'16px'}
            py={{ base: '9px', sm: '16px' }}
            justifyContent={'center'}
            alignItems={'center'}
            w={{ base: '100%', sm: '94px' }}
          >
            <DeviceMobileIcon boxSize={'28px'} />
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

const SubmittingProcess = ({
  completedDocuments,
  totalDocuments,
  currentStatus,
}: {
  completedDocuments: number
  totalDocuments: number
  currentStatus: string
}) => {
  const getStatusText = () => {
    switch (currentStatus) {
      case 'PENDING':
        return '서류를 불러오는 중입니다'
      case 'INCOME_CERTIFICATE':
        return '소득금액증명서를 처리하는 중입니다'
      case 'RESIDENT_REGISTRATION_COPY':
        return '주민등록표등초본을 처리하는 중입니다'
      case 'HEALTH_INSURANCE_ELIGIBILITY_CONFIRMATION':
        return '건강보험자격득실확인서를 처리하는 중입니다'
      case 'HEALTH_INSURANCE_PAYMENT_CONFIRMATION':
        return '건강보험납부확인서를 처리하는 중입니다'
      case 'HEALTH_INSURANCE_PAYMENT_CONFIRMATION_2':
        return '건강보험납부확인서 2를 처리하는 중입니다'
      case 'SUCCESS':
        return '모든 서류가 성공적으로 제출되었습니다'
      case 'FAILED':
        return '서류 제출 중 오류가 발생했습니다'
      default:
        return '서류를 불러오는 중입니다'
    }
  }

  const getStatusColor = () => {
    switch (currentStatus) {
      case 'SUCCESS':
        return 'green.500'
      case 'FAILED':
        return 'red.500'
      default:
        return 'grey.10'
    }
  }

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
        <Text textStyle={'pre-heading-3'} color={getStatusColor()}>
          {getStatusText()}
        </Text>
        <Text textStyle={'pre-body-6'} color={'grey.7'} textAlign={'center'}>
          {currentStatus === 'SUCCESS' ?
            '모든 서류가 완료되었습니다!'
          : currentStatus === 'FAILED' ?
            '다시 시도해 주세요.'
          : '조금만 기다려 주세요!'}
        </Text>
      </VStack>

      {/* 진행률 표시 */}
      <VStack spacing={'8px'} alignItems={'center'}>
        <Text textStyle={'pre-body-5'} color={'primary.4'}>
          {completedDocuments}/{totalDocuments} 진행중 ..
        </Text>
      </VStack>

      {/* 로딩 애니메이션 - 실패 시에는 숨김 */}
      {currentStatus !== 'FAILED' && (
        <Box w={'144px'} h={'144px'}>
          <Lottie
            animationData={loadingLottieData}
            loop={currentStatus !== 'SUCCESS'}
            autoplay={true}
            style={{ width: '100%', height: '100%' }}
          />
        </Box>
      )}

      {/* 실패 시 에러 아이콘 */}
      {currentStatus === 'FAILED' && (
        <Box
          w={'144px'}
          h={'144px'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <XCircleFillIcon boxSize={'80px'} color={'red.500'} />
        </Box>
      )}
    </VStack>
  )
}
