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
  CommonRequestType,
  WetaxLoginRequestAgencyEnumType,
  WetaxLoginRequestMethodEnumType,
  WetaxLoginType,
  WetaxType,
} from '@/generated/apis/@types/data-contracts'
import { useLoanPartialUpdateMutation } from '@/generated/apis/Loan/Loan.query'
import { useUserRetrieveQuery } from '@/generated/apis/User/User.query'
import {
  useWetaxLoginCreateMutation,
  useWetaxOtpCreateMutation,
  useWetaxRetrieveQuery,
} from '@/generated/apis/Wetax/Wetax.query'
import {
  AuthUserIcon,
  BluecheckIcon,
  CaretRightIcon,
  DeviceMobile1Icon,
  DeviceMobileIcon,
  KakaoAuthenticationIcon,
  KbAuthenticationIcon,
  NaverAuthenticationIcon,
  PassAuthenticationIcon,
  ShinhanAuthenticationIcon,
  TossAuthenticationIcon,
  XCircleFillIcon,
} from '@/generated/icons/MyIcons'
import { useLocalStorage } from '@/stores/local/state'

interface WetaxModalProps {
  isOpen: boolean
  onClose: () => void
  loanId?: string | number
  shouldSetFormValue?: boolean
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
]

function WetaxModal({
  loanId,
  isOpen,
  onClose,
  shouldSetFormValue = false,
}: WetaxModalProps) {
  const formContext = useFormContext()
  const setValue = shouldSetFormValue ? formContext?.setValue : null
  const [selectedAuth, setSelectedAuth] = useState<string | null>(null)
  const [selectedPassType, setSelectedPassType] = useState<string>('')
  const [loadingProcess, setLoadingProcess] = useState<number>(0)
  const [wetaxData, setWetaxData] = useState<WetaxLoginType | null>(null)
  const [shouldPoll, setShouldPoll] = useState(true)
  const [completedDocuments, setCompletedDocuments] = useState<number>(1)
  const [totalDocuments, setTotalDocuments] = useState<number>(1) // 총 3개 문서 (세금납부내역)
  const [currentStatus, setCurrentStatus] = useState<string>('PENDING')
  const toast = useToast()
  const { token: accessToken } = useLocalStorage()
  const { data: userData } = useUserRetrieveQuery({
    variables: {
      id: 'me',
    },
    options: {
      enabled: !!isOpen && !!accessToken,
    },
  })

  const { mutate: otpWetax, isPending: isOtpPending } =
    useWetaxOtpCreateMutation({
      options: {
        onSuccess: (data) => {
          setLoadingProcess(2)
          console.log(data)
        },
        onError: (error: any) => {
          toast({
            title: '인증 실패',
            description: error.response.data.nonField[0],
            status: 'error',
            duration: 5000,
          })
        },
      },
    })

  const { mutate: loginWetax, isPending } = useWetaxLoginCreateMutation({
    options: {
      onSuccess: (data: any) => {
        console.log(data)
        setLoadingProcess(1)
        setWetaxData(data)
      },
      onError: (error: any) => {
        console.log(error)
        setLoadingProcess(0)

        let errorMessage = '인증 중 오류가 발생했습니다.'

        if (error?.response?.data?.nonField) {
          errorMessage = error.response.data.nonField[0] || errorMessage
        } else if (error?.response?.data?.message) {
          errorMessage = error.response.data.message
        } else if (error?.message) {
          errorMessage = error.message
        }

        toast({
          title: '인증 실패',
          description: errorMessage,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      },
    },
  })

  const handleLoginWetax = () => {
    loginWetax({
      data: {
        method: selectedAuth as WetaxLoginRequestMethodEnumType,
        name: userData?.name || '',
        birth: userData?.birth || '',
        phone: userData?.phone || '',
        agency: selectedPassType as WetaxLoginRequestAgencyEnumType,
      },
    })
  }
  const handleOtpWetax = () => {
    otpWetax({
      id: wetaxData?.id || 0,
      data: {
        common: wetaxData?.common as any,
        sessionId: wetaxData?.sessionId || '',
      },
    })
  }

  const wetaxQuery = useWetaxRetrieveQuery({
    variables: {
      id: wetaxData?.id || 0,
    },
    options: {
      enabled: wetaxData?.id !== null && loadingProcess === 2 && shouldPoll,
      refetchInterval: shouldPoll ? 5000 : false,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
    },
  })
  const { mutate: documentSubmitMutation, isPending: isDocumentSubmitLoading } =
    useLoanPartialUpdateMutation({
      options: {
        onSuccess: () => {},
        onError: (error) => {},
      },
    })

  useEffect(() => {
    const data = wetaxQuery.data
    if (!data) return

    // 상태 업데이트
    if (data.status) {
      setCurrentStatus(data.status)
    }

    let completedCount = 1

    if (data.dataSet && Array.isArray(data.dataSet)) {
      // 각 문서 종류별로 완료된 항목 카운트
      const actualCompletedCount = data.dataSet.filter((dataItem: any) => {
        // 세금 납부 내역 데이터가 있는 경우 완료로 간주
        return !!dataItem.taxNumber && !!dataItem.paymentDate
      }).length

      // 1부터 시작하되, 실제 완료된 문서 개수에 1을 더함
      completedCount = 1 + actualCompletedCount
    }

    setCompletedDocuments(completedCount)

    if (data.status === 'SUCCESS') {
      console.log('[Wetax API] SUCCESS detected, stopping polling')
      setShouldPoll(false)
      if (shouldSetFormValue) {
        setValue?.('localTaxSet', data.dataSet as any)
      } else {
        documentSubmitMutation({
          id: Number(loanId),
          data: {
            localTaxSet: data.dataSet as any,
          },
        })
      }

      toast({
        title: '세금 납부 내역 제출 완료',
        description: '모든 세금 납부 내역이 성공적으로 제출되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } else if (data.status === 'FAILED') {
      console.log('[Wetax API] FAILED detected, stopping polling')
      setShouldPoll(false)
      toast({
        title: '세금 납부 내역 제출 실패',
        description:
          data.failedReason || '세금 납부 내역 제출 중 오류가 발생했습니다.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }, [wetaxQuery.data, toast])

  // 실제 API 에러 처리
  useEffect(() => {
    if (wetaxQuery.error) {
      console.error('[Wetax API onError]:', wetaxQuery.error)
      setShouldPoll(false)
      setCurrentStatus('FAILED')

      toast({
        title: '세금 납부 내역 제출 실패',
        description: '세금 납부 내역 제출 중 오류가 발생했습니다.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }, [wetaxQuery.error, toast])

  const handleClose = () => {
    setSelectedAuth(null)
    setSelectedPassType('')
    setLoadingProcess(0)
    setShouldPoll(true)
    setCompletedDocuments(1)
    setCurrentStatus('PENDING')
    onClose()
  }

  const handleAuthSelect = (authType: string) => {
    setSelectedAuth(authType)
    if (authType !== 'pass') {
      setSelectedPassType('')
    }
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
            세금 납부 내역 제출
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
              onClick={handleLoginWetax}
              isLoading={isPending}
              loadingText="인증 중..."
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
                onClick={onClose}
              >
                취소
              </Button>
              <Button
                variant={'solid-primary'}
                w={'100%'}
                isLoading={isOtpPending}
                loadingText="인증절차 처리중"
                onClick={handleOtpWetax}
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

export default WetaxModal

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
        return '세금 납부 내역을 불러오는 중입니다.'
      default:
        return '세금 납부 내역이 제출되었습니다.'
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
