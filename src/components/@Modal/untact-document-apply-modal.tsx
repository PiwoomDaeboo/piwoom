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
import { GOV_REGIONS } from '@/constants/loan'
import {
  GovLoginRequestAgencyEnumType,
  GovLoginRequestMethodEnumType,
} from '@/generated/apis/@types/data-contracts'
import {
  useGovLoginCreateMutation,
  useGovOtpCreateMutation,
  useGovRetrieveQuery,
} from '@/generated/apis/Gov/Gov.query'
import { useUserRetrieveQuery } from '@/generated/apis/User/User.query'
import {
  AuthUserIcon,
  BluecheckIcon,
  CaretRightIcon,
  CheckCircleFillIcon,
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
import { useLocalStorage } from '@/stores/local/state'
import { extractErrorMessage } from '@/utils/error-handler'

interface UntactDocumentApplyModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete?: () => void
}

const passTypes = [
  { label: 'SKT', value: '01' },
  { label: 'KT', value: '02' },
  { label: 'LGU+', value: '03' },
]

const authOptions = [
  { type: 'KAKAO', icon: KakaoAuthenticationIcon, label: '카카오톡' },
  { type: 'TOSS', icon: TossAuthenticationIcon, label: '토스' },
  { type: 'PASS', icon: PassAuthenticationIcon, label: '통신사PASS' },
  { type: 'NAVER', icon: NaverAuthenticationIcon, label: '네이버' },
  { type: 'KB', icon: KbAuthenticationIcon, label: '국민인증서' },
  { type: 'SHINHAN', icon: ShinhanAuthenticationIcon, label: '신한인증서' },
  { type: 'HANA', icon: HanaauthenticationIcon, label: '하나인증서' },
  { type: 'WOORI', icon: WooriauthenticationIcon, label: '우리인증서' },
  { type: 'NH', icon: NhauthenticationIcon, label: 'NH인증서' },
  { type: 'SAMSUNG', icon: SamsungauthenticationIcon, label: '삼성패스' },
]

function UntactDocumentApplyModal({
  isOpen,
  onClose,
  onComplete,
}: UntactDocumentApplyModalProps) {
  const [selectedAuth, setSelectedAuth] = useState<string | null>(null)
  const [selectedPassType, setSelectedPassType] = useState<string>('')
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [selectedDistrict, setSelectedDistrict] = useState<string>('')
  const [govRetrieveId, setGovRetrieveId] = useState<number | null>(null)
  const { setValue, trigger, clearErrors } = useFormContext()
  const [loadingProcess, setLoadingProcess] = useState<number>(0)
  const { token: accessToken } = useLocalStorage()
  const toast = useToast()

  const [govData, setGovData] = useState<any>(null)
  const [shouldPoll, setShouldPoll] = useState(true)
  const [completedDocuments, setCompletedDocuments] = useState<number>(1)
  const [totalDocuments, setTotalDocuments] = useState<number>(5) // 총 5개 문서
  const [currentStatus, setCurrentStatus] = useState<string>('PENDING')

  const cityOptions = Object.keys(GOV_REGIONS).map((city) => ({
    label: city,
    value: city,
  }))

  const districtOptions =
    selectedCity ?
      GOV_REGIONS[selectedCity as keyof typeof GOV_REGIONS].map((district) => ({
        label: district,
        value: district,
      }))
    : []

  const { data: userData } = useUserRetrieveQuery({
    variables: {
      id: 'me',
    },
    options: {
      enabled: !!isOpen && !!accessToken,
    },
  })

  const { mutate: govMutation, isPending: isGovMutationPending } =
    useGovLoginCreateMutation({
      options: {
        onSuccess: (data) => {
          setLoadingProcess(1)
          setGovRetrieveId(data?.id)
          setGovData(data)
        },
        onError: (error) => {
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
                    {extractErrorMessage(error)}
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

  const govQuery = useGovRetrieveQuery({
    variables: {
      id: govRetrieveId as number,
    },
    options: {
      enabled: govRetrieveId !== null && loadingProcess === 2 && shouldPoll,
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
          clearErrors('untactDocumentSubmission')
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

  useEffect(() => {
    const data = govQuery.data
    if (!data) return

    // 상태 업데이트
    if (data.status) {
      setCurrentStatus(data.status)
    }

    let completedCount = 1

    if (data.logSet && Array.isArray(data.logSet)) {
      // 각 문서 종류별로 완료된 항목 카운트
      const actualCompletedCount = data.logSet.filter((logItem) => {
        switch (logItem.kind) {
          case 'INCOME_CERTIFICATE':
          case 'HEALTH_INSURANCE_ELIGIBILITY_CONFIRMATION':
          case 'HEALTH_INSURANCE_PAYMENT_CONFIRMATION':
          case 'HEALTH_INSURANCE_PAYMENT_CONFIRMATION_2':
            return !!logItem.file // 파일이 있는 경우
          case 'RESIDENT_REGISTRATION_COPY':
            return !!logItem.address // 주소가 있는 경우
          default:
            return false
        }
      }).length

      // 1부터 시작하되, 실제 완료된 문서 개수에 1을 더함
      completedCount = 1 + actualCompletedCount
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
      // 시군구 선택 상태 초기화
      setSelectedCity('')
      setSelectedDistrict('')
      setSelectedAuth(null)
      setSelectedPassType('')

      // 서류제출 완료 콜백 호출
      if (onComplete) {
        onComplete()
      }
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
    setCompletedDocuments(1)
    setCurrentStatus('PENDING')
    // 시군구 선택 상태 초기화
    setSelectedCity('')
    setSelectedDistrict('')
    setSelectedAuth(null)
    setSelectedPassType('')
    onClose()
  }

  const handleAuthSelect = (authType: string) => {
    setSelectedAuth(authType)
    if (authType !== 'pass') {
      setSelectedPassType('')
    }
  }

  const handleCityChange = (selectedOption: any) => {
    setSelectedCity(selectedOption?.value || '')
    setSelectedDistrict('') // 시/도가 변경되면 군/구 선택 초기화
  }

  const handleDistrictChange = (selectedOption: any) => {
    setSelectedDistrict(selectedOption?.value || '')
  }

  const handleLoginGov = () => {
    govMutation({
      data: {
        method: selectedAuth as GovLoginRequestMethodEnumType,
        name: userData?.name || '',
        birth: userData?.birth || '',
        phone: userData?.phone || '',
        agency: selectedPassType as GovLoginRequestAgencyEnumType,
        sido: selectedCity,
        sigungu: selectedDistrict,
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
              spacing={{ base: '0px', sm: '26px' }}
              bg={'grey.1'}
              w={'100%'}
              borderRadius={'10px'}
            >
              {authOptions.map(({ type, icon: Icon, label }) => (
                <Flex
                  key={type}
                  direction={'column'}
                  align={'center'}
                  borderRadius={'10px'}
                  cursor={'pointer'}
                  py={'6px'}
                  gap={'6px'}
                  bg={selectedAuth === type ? 'primary.2' : 'transparent'}
                  border={
                    selectedAuth === type ? '1px solid' : (
                      '1px solid transparent'
                    )
                  }
                  borderColor={
                    selectedAuth === type ? 'primary.2' : 'transparent'
                  }
                  _hover={{
                    bg: selectedAuth === type ? 'primary.1' : 'grey.2',
                  }}
                  onClick={() => handleAuthSelect(type)}
                >
                  <Icon borderRadius={'10px'} boxSize={'40px'} />
                  <Text textStyle={'pre-caption-2'} color={'grey.10'}>
                    {label}
                  </Text>
                </Flex>
              ))}
            </SimpleGrid>

            <InputForm label="주민등록상 주소 확인" isRequired>
              <Flex w={'100%'} gap={'8px'}>
                <Box w={'100%'}>
                  <CommonSelect
                    options={cityOptions}
                    placeholder="시도명 선택"
                    value={cityOptions.find(
                      (option) => option.value === selectedCity,
                    )}
                    onChange={handleCityChange}
                  />
                </Box>
                <Box w={'100%'}>
                  <CommonSelect
                    options={districtOptions}
                    placeholder="시군구 선택"
                    value={districtOptions.find(
                      (option) => option.value === selectedDistrict,
                    )}
                    onChange={handleDistrictChange}
                    isDisabled={!selectedCity}
                  />
                </Box>
              </Flex>
            </InputForm>

            {selectedAuth === 'PASS' && (
              <InputForm label="통신사" isRequired>
                <Box w={'100%'} display={{ base: 'none', sm: 'block' }}>
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
                </Box>
                <Box w={'100%'} display={{ base: 'block', sm: 'none' }}>
                  <CommonSelect
                    menuPlacement="top"
                    options={passTypes}
                    placeholder="선택"
                    value={passTypes.find(
                      (option) => option.value === selectedPassType,
                    )}
                    onChange={(selectedOption) =>
                      setSelectedPassType(selectedOption?.value || '')
                    }
                  />
                </Box>
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
              isDisabled={!selectedAuth || !selectedDistrict}
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
              isDisabled={shouldPoll}
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
        return '서류를 불러오는 중입니다.'
      case 'INCOME_CERTIFICATE':
        return '소득금액증명 발급 중입니다.'
      case 'RESIDENT_REGISTRATION_COPY':
        return '주민등록표 등본 발급 중입니다.'
      case 'HEALTH_INSURANCE_ELIGIBILITY_CONFIRMATION':
        return '건강보험 자격득실 확인서 발급 중입니다.'
      case 'HEALTH_INSURANCE_PAYMENT_CONFIRMATION':
        return '건강보험료 납부확인서(올해) 발급 중입니다.'
      case 'HEALTH_INSURANCE_PAYMENT_CONFIRMATION_2':
        return '건강보험료 납부확인서(작년) 발급 중입니다.'
      case 'SUCCESS':
        return '모든 서류 제출을 완료하였습니다.'
      case 'FAILED':
        return '서류 제출 중 오류가 발생했습니다.'
      default:
        return '서류를 불러오는 중입니다.'
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
        <Text
          textStyle={
            currentStatus === 'SUCCESS' ? 'pre-body-5' : 'pre-heading-3'
          }
          color={getStatusColor()}
        >
          {getStatusText()}
        </Text>
        <Text
          textStyle={'pre-body-6'}
          whiteSpace={'pre-wrap'}
          color={'grey.7'}
          textAlign={'center'}
        >
          {currentStatus === 'SUCCESS' ?
            ''
          : currentStatus === 'FAILED' ?
            '다시 시도해 주세요.'
          : '조금만 기다려주세요!\n최대 3분 가량 소요될 수 있습니다.'}
        </Text>
      </VStack>

      {/* 진행률 표시 */}
      {currentStatus !== 'SUCCESS' && (
        <VStack spacing={'8px'} alignItems={'center'}>
          <Text textStyle={'pre-body-5'} color={'primary.4'}>
            {completedDocuments}/{totalDocuments} 진행 중
          </Text>
        </VStack>
      )}

      {/* 로딩 애니메이션 - 실패 시에는 숨김 */}
      {currentStatus !== 'FAILED' && (
        <Flex
          justifyContent={'center'}
          alignItems={'center'}
          w={'144px'}
          h={'144px'}
        >
          {currentStatus !== 'SUCCESS' ?
            <Lottie
              animationData={loadingLottieData}
              loop={currentStatus !== 'SUCCESS'}
              autoplay={true}
              style={{ width: '100%', height: '100%' }}
            />
          : <BluecheckIcon boxSize={'96px'} />}
        </Flex>
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
