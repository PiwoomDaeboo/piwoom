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
import {
  useWetaxLoginCreateMutation,
  useWetaxOtpCreateMutation,
  useWetaxRetrieveQuery,
} from '@/generated/apis/Wetax/Wetax.query'
import {
  AuthUserIcon,
  CaretRightIcon,
  DeviceMobile1Icon,
  DeviceMobileIcon,
  KakaoAuthenticationIcon,
  KbAuthenticationIcon,
  Loan1Icon,
  NaverAuthenticationIcon,
  PassAuthenticationIcon,
  ShinhanAuthenticationIcon,
  TossAuthenticationIcon,
} from '@/generated/icons/MyIcons'

interface WetaxModalProps {
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

function WetaxModal({ isOpen, onClose }: WetaxModalProps) {
  const [selectedAuth, setSelectedAuth] = useState<string | null>(null)
  const [selectedPassType, setSelectedPassType] = useState<string>('')
  const [loadingProcess, setLoadingProcess] = useState<number>(0)
  const [wetaxData, setWetaxData] = useState<WetaxLoginType | null>(null)
  const toast = useToast()

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
        name: '',
        birth: '',
        phone: '',
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

  const { data: wetaxRetrieveData } = useWetaxRetrieveQuery({
    variables: {
      id: wetaxData?.id || 0,
    },
    options: {
      enabled: !!wetaxData?.id,
    },
  })

  const handleClose = () => {
    setSelectedAuth(null)
    setSelectedPassType('')
    setLoadingProcess(0)
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
        return <SubmittingProcess />
    }
  }

  useEffect(() => {
    window.addEventListener('message', (event: any) => {
      // event가 true or false.
      // event 값에 따라 성공 실패 처리

      if (event.data.success) {
        console.log('성공')
      } else {
        console.log('실패')
      }
    })
  }, [])

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
              isLoading={isPending}
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
