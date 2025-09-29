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
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'

import { Controller, useFormContext, useWatch } from 'react-hook-form'

import ModalBasis from '@/components/@Modal/ModalBasis'
import CommonSelect from '@/components/CommonSelect'
import InputForm from '@/components/InputForm'
import { InfoFillIcon, XCircleFillIcon } from '@/generated/icons/MyIcons'
import { useSessionStorage } from '@/stores/session/state'
import { extractUserInfoFromJWT } from '@/utils/jwt'

import {
  ANNUAL_INCOME_OPTIONS,
  CREDIT_SCORE_OPTIONS,
  DEBT_SCALE_OPTIONS,
  LOAN_PURPOSE_OPTIONS,
  REPAYMENT_METHOD_OPTIONS,
  TOTAL_ASSET_OPTIONS,
} from '../../../constants/loan'

const ApplyLoanStep3 = () => {
  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useFormContext()
  const router = useRouter()
  const toast = useToast()
  console.log('errors', errors)
  const [userInfo, setUserInfo] = useState<{
    name?: string
    phone?: string
    birth?: string
    gender_code?: string
  } | null>(null)
  const { identityVerificationToken } = useSessionStorage()
  const totalAsset = useWatch({ control, name: 'totalAsset' })
  const annualIncome = useWatch({ control, name: 'annualIncome' })
  const debtScale = useWatch({ control, name: 'debtScale' })
  const repaymentMethod = useWatch({ control, name: 'repaymentMethod' })
  const loanPurpose = useWatch({ control, name: 'purpose' })
  const monthlyIncome = useWatch({ control, name: 'monthlyIncome' })
  const creditScore = useWatch({ control, name: 'creditScore' })
  const safeKey = useWatch({ control, name: 'safeKey' })
  const [popupWindow, setPopupWindow] = useState<Window | null>(null)

  const handleApplyCreditInfoSubmit = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const popup = window.open(
      `https://api.piwoom.com/v1/nice/?name=${userInfo?.name}&birth=${userInfo?.birth}&gender=${userInfo?.gender_code}`,
      'popupChk',
      'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no',
    )
  }
  const {
    isOpen: isLoanAlertOpen,
    onOpen: onLoanAlertOpen,
    onClose: onLoanAlertClose,
  } = useDisclosure()
  const {
    isOpen: isLoanRejectOpen,
    onOpen: onLoanRejectOpen,
    onClose: onLoanRejectClose,
  } = useDisclosure()

  const handleButtonSelect = (field: string, value: string) => {
    setValue(`${field}`, value)
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedText = e.clipboardData.getData('text')

    const numbersAndDecimal = pastedText.replace(/[^0-9.]/g, '')
    const cleanNumber = numbersAndDecimal.replace(/\.(?=.*\.)/g, '') // 중복 소수점 제거

    const target = e.target as HTMLInputElement
    const fieldName = target.name

    if (fieldName && cleanNumber) {
      const numericValue = parseFloat(cleanNumber) || 0
      setValue(fieldName, numericValue)
    }
  }

  const checkLoanEligibility = () => {
    const isNoIncome = annualIncome === 'NO_INCOME'

    const isZeroMonthlyIncome =
      monthlyIncome === 0 ||
      monthlyIncome === null ||
      monthlyIncome === undefined

    const isLowCreditScore = creditScore === 'UNDER_650'

    if (isNoIncome || isZeroMonthlyIncome || isLowCreditScore) {
      onLoanRejectOpen()
      return false
    }

    return true
  }

  // handleSubmit을 사용하므로 수동 검증 함수는 더 이상 필요하지 않음

  // Step3 성공 시 실행될 함수
  const onStep3Submit = (data: any) => {
    console.log('Step3 폼 데이터:', data)

    if (!checkLoanEligibility()) {
      return
    }

    router.replace('/apply-loan?step=4&type=' + router.query.type)
  }

  const onStep3Error = (errors: any) => {
    console.log('Step3 폼 에러:', errors)
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
              필수 항목을 입력해주세요.
            </Text>
          </HStack>
        </Box>
      ),
      duration: 5000,
      isClosable: true,
    })
    const firstErrorField = Object.keys(errors)[0]
    const errorElement =
      document.querySelector(`[name="${firstErrorField}"]`) ||
      document.querySelector(`[data-field="${firstErrorField}"]`)

    if (errorElement) {
      errorElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
      if (errorElement instanceof HTMLElement) {
        errorElement.focus()
      }
    }
  }

  // 다음 버튼 클릭 핸들러 (handleSubmit 사용)
  const handleNextClick = handleSubmit(onStep3Submit, onStep3Error)

  console.log('Form errors:', errors)

  const getUserInfo = () => {
    const extractedUserInfo = extractUserInfoFromJWT(
      identityVerificationToken as string,
    )
    if (extractedUserInfo) {
      setUserInfo(extractedUserInfo)
      console.log('Extracted user info:', extractedUserInfo)
    }
  }

  // const handleApplyCreditInfoSubmit = (e: React.MouseEvent) => {
  //   e.preventDefault()
  //   e.stopPropagation()

  //   window.open(
  //     `https://api.piwoom.com/v1/nice/?name=${userInfo?.name}&birth=${userInfo?.birth}&gender=${userInfo?.gender_code}`,
  //     'popupChk',
  //     'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no',
  //   )
  // }

  useEffect(() => {
    const extractedUserInfo = extractUserInfoFromJWT(
      identityVerificationToken as string,
    )
    if (extractedUserInfo) {
      setUserInfo(extractedUserInfo)
      console.log('Extracted user info:', extractedUserInfo)
    }
  }, [])

  // useEffect(() => {
  //   const handleMessage = (event: MessageEvent) => {
  //     console.log('=== Message Event Received ===')
  //     console.log('Origin:', event.origin)

  //     console.log('Data:', event.data)
  //     console.log('Data type:', typeof event.data)
  //     console.log('Data length:', event.data?.length)
  //     console.log('Data constructor:', event.data?.constructor?.name)

  //     // Origin 검증 없이 모든 메시지 처리
  //     if (typeof event.data === 'string' && event.data.trim()) {
  //       console.log('✅ safeKey received:', event.data)
  //       setValue('safeKey', event.data)
  //     } else if (
  //       event.data &&
  //       typeof event.data === 'object' &&
  //       event.data.safeKey
  //     ) {
  //       console.log('✅ safeKey from object:', event.data.safeKey)
  //       setValue('safeKey', event.data.safeKey)
  //     } else {
  //       console.log('❌ No valid safeKey found')
  //       console.log('Raw data:', JSON.stringify(event.data))
  //     }
  //   }

  //   console.log('Adding message event listener...')
  //   window.addEventListener('message', handleMessage)

  //   return () => {
  //     console.log('Removing message event listener...')
  //     window.removeEventListener('message', handleMessage)
  //   }
  // }, [setValue])

  return (
    <Container>
      <Flex
        py={{ base: '40px', sm: '48px', md: '84px' }}
        flexDir={'column'}
        gap={'24px'}
      >
        <VStack alignItems={'flex-start'} spacing={'8px'} mb={'32px'}>
          <Text textStyle={'pre-heading-2'} color={'grey.10'}>
            적합성•적정성
          </Text>
          <VStack spacing={'12px'} alignItems={'flex-start'}>
            <Text textStyle={'pre-body-6'} color={'grey.7'}>
              대출심사를 위해 아래 정보를 입력해주세요.
            </Text>
          </VStack>
        </VStack>

        <InputForm label="대출용도">
          <Flex w={'100%'} gap={'16px'}>
            <VStack w={'49%'}>
              <Box w={'100%'}>
                <Controller
                  name="purpose"
                  control={control}
                  render={({ field }) => (
                    <CommonSelect
                      placeholder="선택"
                      options={LOAN_PURPOSE_OPTIONS}
                      variant="outline"
                      value={LOAN_PURPOSE_OPTIONS.find(
                        (option) => option.value === field.value,
                      )}
                      onChange={(selectedOption) =>
                        field.onChange(selectedOption?.value || '')
                      }
                      data-field="purpose"
                    />
                  )}
                />
              </Box>

              {loanPurpose === 'DIRECT_INPUT' && (
                <Input
                  placeholder="대출 용도 직접입력"
                  {...register('purposeDetail')}
                  data-field="purposeDetail"
                />
              )}
            </VStack>
            <Box />
          </Flex>
          {errors?.purpose && (
            <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
              {errors?.purpose?.message as string}
            </Text>
          )}
        </InputForm>
        <InputForm label="총 자산 규모" w={'100%'}>
          <SimpleGrid w={'100%'} gap={'16px'} columns={{ base: 2, sm: 4 }}>
            {TOTAL_ASSET_OPTIONS.map((option) => (
              <Button
                key={option.value}
                variant={
                  totalAsset === option.value ?
                    'outline-primary'
                  : 'outline-secondary'
                }
                textStyle={'pre-body-5'}
                color={totalAsset === option.value ? 'primary.3' : 'grey.8'}
                w={'100%'}
                onClick={() => handleButtonSelect('totalAsset', option.value)}
              >
                {option.label}
              </Button>
            ))}
          </SimpleGrid>
          {errors.totalAsset && (
            <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
              {errors?.totalAsset?.message as string}
            </Text>
          )}
        </InputForm>
        <InputForm label="연 소득">
          <SimpleGrid w={'100%'} gap={'16px'} columns={{ base: 2, sm: 4 }}>
            {ANNUAL_INCOME_OPTIONS.map((option) => (
              <Button
                key={option.value}
                variant={
                  annualIncome === option.value ?
                    'outline-primary'
                  : 'outline-secondary'
                }
                textStyle={'pre-body-5'}
                color={annualIncome === option.value ? 'primary.3' : 'grey.8'}
                w={'100%'}
                onClick={() => handleButtonSelect('annualIncome', option.value)}
              >
                {option.label}
              </Button>
            ))}
          </SimpleGrid>
          {errors?.annualIncome && (
            <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
              {errors?.annualIncome?.message as string}
            </Text>
          )}
        </InputForm>
        <Flex gap={'16px'}>
          <InputForm label="월 실수령액 또는 월 수입">
            <InputGroup>
              <Input
                placeholder="0"
                type="number"
                textAlign="right"
                pr="50px"
                onPaste={handlePaste}
                {...register('monthlyIncome', {
                  setValueAs: (value) => {
                    if (value === '' || value === null || value === undefined) {
                      return undefined
                    }
                    const num = Number(value)
                    return isNaN(num) ? undefined : num
                  },
                })}
                data-field="monthlyIncome"
              />
              <InputRightElement>
                <Text>만원</Text>
              </InputRightElement>
            </InputGroup>
            {errors?.monthlyIncome && (
              <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
                {errors?.monthlyIncome?.message as string}
              </Text>
            )}
          </InputForm>
          <InputForm label="월 고정 지출">
            <InputGroup>
              <Input
                placeholder="0"
                type="number"
                onPaste={handlePaste}
                textAlign="right"
                pr="50px"
                {...register('monthlyFixedExpense', {
                  setValueAs: (value) => {
                    if (value === '' || value === null || value === undefined) {
                      return undefined
                    }
                    const num = Number(value)
                    return isNaN(num) ? undefined : num
                  },
                })}
                data-field="monthlyFixedExpense"
              />
              <InputRightElement>
                <Text>만원</Text>
              </InputRightElement>
            </InputGroup>
            {errors?.monthlyFixedExpense && (
              <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
                {errors?.monthlyFixedExpense?.message as string}
              </Text>
            )}
          </InputForm>
        </Flex>

        <InputForm label="부채규모">
          <SimpleGrid w={'100%'} gap={'16px'} columns={{ base: 2, sm: 4 }}>
            {DEBT_SCALE_OPTIONS.map((option) => (
              <Button
                key={option.value}
                variant={
                  debtScale === option.value ?
                    'outline-primary'
                  : 'outline-secondary'
                }
                textStyle={'pre-body-5'}
                color={debtScale === option.value ? 'primary.3' : 'grey.8'}
                w={'100%'}
                onClick={() => handleButtonSelect('debtScale', option.value)}
              >
                {option.label}
              </Button>
            ))}
          </SimpleGrid>
          {errors?.debtScale && (
            <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
              {errors?.debtScale?.message as string}
            </Text>
          )}
        </InputForm>
        <Flex gap={'16px'}>
          <InputForm label="변제방법 (자금원천)">
            <Box w={'100%'}>
              <Controller
                name="repaymentMethod"
                control={control}
                render={({ field }) => (
                  <CommonSelect
                    options={REPAYMENT_METHOD_OPTIONS}
                    placeholder="선택"
                    value={REPAYMENT_METHOD_OPTIONS.find(
                      (option) => option.value === field.value,
                    )}
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption?.value || '')
                    }
                  />
                )}
              />
            </Box>
            {/* DIRECT_INPUT 선택 시 추가 인풋 표시 */}
            {repaymentMethod === 'DIRECT_INPUT' && (
              <Box w={'100%'}>
                <Input
                  placeholder="변제방법(자급원천) 입력"
                  {...register('repaymentDetail')}
                  data-field="repaymentDetail"
                />
              </Box>
            )}
            {errors?.repaymentMethod && (
              <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
                {errors?.repaymentMethod?.message as string}
              </Text>
            )}
          </InputForm>
          <InputForm label="신용평가점수 (NICE 기준)">
            <>
              <Box w={'100%'}>
                <Controller
                  name="creditScore"
                  control={control}
                  render={({ field }) => (
                    <CommonSelect
                      options={CREDIT_SCORE_OPTIONS}
                      placeholder="선택"
                      value={CREDIT_SCORE_OPTIONS.find(
                        (option) => option.value === field.value,
                      )}
                      onChange={(selectedOption) =>
                        field.onChange(selectedOption?.value || '')
                      }
                    />
                  )}
                />
              </Box>
              <Button
                variant={'text-primary'}
                textStyle={'pre-body-5'}
                size={'lg'}
                onClick={() => {
                  window.open('https://campaign.naver.com/credit/', '_blank')
                }}
              >
                신용점수 조회하기
              </Button>
            </>
            {errors?.creditScore && (
              <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
                {errors?.creditScore?.message as string}
              </Text>
            )}
          </InputForm>
        </Flex>
        <InputForm
          label="신용정보 제출하기"
          tooltipLabel="대출 심사를 위해 고객님의 신용정보 확인이 필수입니다. [제출] 버튼을 누르시면 NICE평가정보의 ‘신용인증송부 서비스’를 통해 본인인증과 정보 확인을 거친 뒤, 고객님이 동의하신 신용정보만 심사 목적으로 안전하게 당사에 제공됩니다."
        >
          <Button
            type="button"
            variant={'outline-secondary'}
            textStyle={'pre-body-5'}
            color={'grey.8'}
            onClick={handleApplyCreditInfoSubmit}
            w={'209px'}
          >
            제출
          </Button>
          {errors?.safeKey && (
            <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
              {errors?.safeKey?.message as string}
            </Text>
          )}
        </InputForm>
        <VStack
          alignItems={'flex-start'}
          p={'24px 20px'}
          borderRadius={'20px'}
          border={'1px solid'}
          borderColor={'border.basic.1'}
          gap={'24px'}
        >
          <HStack>
            <InfoFillIcon boxSize={'24px'} />
            <Text textStyle={'pre-body-7'} color={'grey.9'}>
              안내사항
            </Text>
          </HStack>
          <Text textStyle={'pre-body-6'} color={'grey.8'}>
            피움대부는 서비스 이행을 위해서 아래와 같이 개인정보를 위탁하여
            운영하고 있습니다.
            <br /> 당사의 개인정보 위탁 처리 기관 및 위탁 업무는 아래와
            같습니다.
          </Text>
          <Box
            p={'10px 20px'}
            textStyle={'pre-body-6'}
            color={'grey.8'}
            bg={'background.basic.2'}
            w={'100%'}
            borderRadius={'10px'}
          >
            가. 위탁기관 : NICE 평가정보주식회사
            <br />
            나. 위탁업무 : 본인인증, 이용약관 및 개인정보/DI
            수집ㆍ이용/제공ㆍ활용/조회 동의
          </Box>
          <Text textStyle={'pre-body-6'} color={'grey.8'}>
            본인은 본 개인정보 처리 업무의 위탁에 동의합니다.
          </Text>
        </VStack>
        <InputForm label="대출 용도 및 상환 계획" w={'100%'}>
          <Flex flexDir={'column'} gap={'12px'} w={'100%'}>
            <Text textStyle={'pre-caption-2'} color={'grey.7'}>
              *대출금 사용 용도 및 예상 상환 방법을 구체적으로 기재하시면 심사에
              도움이 됩니다.
            </Text>
            <Textarea
              w={'100%'}
              h={'200px'}
              p={'10px'}
              maxLength={2000}
              // placeholder="(예시) 자녀 출산으로 인해 산후 조리원 비용이 예상보다 많이 나왔습니다. <br/>오백만원만 빌리면, 3개월 동안 월급을 모아서 상환할 수 있습니다."
              placeholder="(예시) 서울시 성동구에 위치한 10억원짜리 아파트를 사게 되었습니다. 잔금이 2개월 후라, 잔금일에 아파트 2순위 담보로 2억원을 빌리고 싶습니다. 참고로 1순위 은행 대출은 4억원입니다. 연 소득이 6000만원이기 때문에 매월 대출 이자 납부에는 문제가 없으며, 대출 기간 3년 동안 월급을 열심히 모아서 원금 일부는 상환하고 나머지는 은행 신용대출로 대환할 계획입니다."
              {...register('purposeAndRepaymentPlan')}
              data-field="purposeAndRepaymentPlan"
            />
          </Flex>
          {errors?.purposeAndRepaymentPlan && (
            <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
              {errors?.purposeAndRepaymentPlan?.message as string}
            </Text>
          )}
        </InputForm>
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
            onClick={handleNextClick}
          >
            다음
          </Button>
        </Flex>
      </Flex>
      <ModalBasis
        isOpen={isLoanAlertOpen}
        visibleCloseButton={true}
        onClose={onLoanAlertClose}
        size={'sm'}
        body={
          <Flex
            flexDir={'column'}
            gap={'12px'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Text textStyle={'pre-heading-4'}>알림</Text>
            <Text textStyle={'pre-body-6'}>
              현재는 보이스피싱이 의심되어
              <br />
              대출 신청이 어렵습니다.
            </Text>
          </Flex>
        }
        footer={
          <Flex w="100%" gap="12px">
            <Button
              w="100%"
              variant={'solid-primary'}
              onClick={onLoanAlertClose}
            >
              확인
            </Button>
          </Flex>
        }
      ></ModalBasis>

      <ModalBasis
        isOpen={isLoanRejectOpen}
        visibleCloseButton={true}
        onClose={onLoanRejectClose}
        size={'sm'}
        body={
          <Flex
            flexDir={'column'}
            gap={'12px'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Text textStyle={'pre-heading-4'} color={'grey.10'}>
              대출 진행 불가
            </Text>
            <Text
              textAlign={'center'}
              textStyle={'pre-body-68'}
              color={'grey.7'}
            >
              당사 대출 심사 기준에 부합하지 않아,
              <br /> 대출 진행이 불가함을 알려드립니다.
              <br /> 담보 제공 또는 연대보증 등을 통한 추가적인 대출 상담을
              원하실 경우 상담하기 버튼을 눌러주세요.
            </Text>
          </Flex>
        }
        footer={
          <Flex w="100%" gap="12px">
            <Button
              w="100%"
              variant={'text-primary'}
              onClick={onLoanRejectClose}
            >
              취소
            </Button>
            <Button
              w="100%"
              variant={'solid-primary'}
              onClick={() => {
                window.open('http://pf.kakao.com/_xkxoben/chat', '_blank')
              }}
            >
              상담하기
            </Button>
          </Flex>
        }
      ></ModalBasis>
    </Container>
  )
}

export default ApplyLoanStep3
