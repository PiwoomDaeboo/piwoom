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
import { useSettingRetrieveQuery } from '@/generated/apis/Setting/Setting.query'
import { useUserRetrieveQuery } from '@/generated/apis/User/User.query'
import { XCircleFillIcon } from '@/generated/icons/MyIcons'
import { useLocalStorage } from '@/stores/local/state'

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
    trigger,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext()
  const router = useRouter()
  const toast = useToast()
  console.log('errors', errors)
  console.log('watch', watch())

  const totalAsset = useWatch({ control, name: 'totalAsset' })
  const annualIncome = useWatch({ control, name: 'annualIncome' })
  const debtScale = useWatch({ control, name: 'debtScale' })
  const repaymentMethod = useWatch({ control, name: 'repaymentMethod' })
  const loanPurpose = useWatch({ control, name: 'purpose' })
  const monthlyIncome = useWatch({ control, name: 'monthlyIncome' })
  const creditScore = useWatch({ control, name: 'creditScore' })
  const safeKeyWatchValue = useWatch({ control, name: 'safeKey' })
  const { data: userData } = useUserRetrieveQuery({
    variables: {
      id: 'me',
    },
  })

  register('safeKey')
  const { data: settingData } = useSettingRetrieveQuery({
    variables: {
      id: 'me',
    },
  })
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
    trigger(field)
  }

  const formatNumberWithCommas = (
    value: number | string | undefined,
  ): string => {
    if (!value) return ''
    const numbers = String(value).replace(/[^0-9]/g, '')
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const parseNumberFromFormatted = (value: string): number | undefined => {
    const numbers = value.replace(/[^0-9]/g, '')
    return numbers === '' ? undefined : Number(numbers)
  }

  const getCreditScoreValue = (score: string): number => {
    const scoreMap: { [key: string]: number } = {
      UNDER_650: 0,
      RANGE_650_700: 650,
      RANGE_700_750: 700,
      RANGE_750_800: 750,
      RANGE_800_850: 800,
      RANGE_850_900: 850,
      RANGE_900_950: 900,
      OVER_950: 950,
    }
    return scoreMap[score] || 0
  }

  const checkLoanEligibility = () => {
    const isNoIncome = annualIncome === 'NO_INCOME'

    const isZeroMonthlyIncome =
      monthlyIncome === 0 ||
      monthlyIncome === null ||
      monthlyIncome === undefined

    // settingData의 minCreditScore와 비교
    const minCreditScore = settingData?.minCreditScore || 650
    const currentCreditScore = getCreditScoreValue(creditScore)
    const isLowCreditScore = currentCreditScore < minCreditScore

    if (isNoIncome || isZeroMonthlyIncome || isLowCreditScore) {
      onLoanRejectOpen()
      return false
    }

    return true
  }

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
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    // // safeKey 에러가 있으면 특별한 메시지 표시
    // if (errors?.safeKey) {
    //   toast({
    //     render: () => (
    //       <Box
    //         borderRadius={'10px'}
    //         color="white"
    //         p={'12px'}
    //         bg="rgba(27, 28, 29, 0.80)"
    //       >
    //         <HStack spacing={'24px'} alignItems={'center'}>
    //           <XCircleFillIcon boxSize={'24px'} />
    //           <Text textStyle={'pre-body-68'} color={'grey.0'}>
    //             신용정보 제출이 필요합니다.
    //           </Text>
    //         </HStack>
    //       </Box>
    //     ),
    //     duration: 5000,
    //     isClosable: true,
    //   })
    // } else {
    //   toast({
    //     render: () => (
    //       <Box
    //         borderRadius={'10px'}
    //         color="white"
    //         p={'12px'}
    //         bg="rgba(27, 28, 29, 0.80)"
    //       >
    //         <HStack spacing={'24px'} alignItems={'center'}>
    //           <XCircleFillIcon boxSize={'24px'} />
    //           <Text textStyle={'pre-body-68'} color={'grey.0'}>
    //             필수 항목을 입력해주세요.
    //           </Text>
    //         </HStack>
    //       </Box>
    //     ),
    //     duration: 5000,
    //     isClosable: true,
    //   })
    // }
    const errorFieldPriority = [
      'purpose',
      'purposeDetail',
      'totalAsset',
      'annualIncome',
      'monthlyIncome',
      'monthlyFixedExpense',
      'debtScale',
      'repaymentMethod',
      'repaymentDetail',
      'creditScore',
      'safeKey',
      'purposeAndRepaymentPlan',
    ]

    // 우선순위에 따라 첫 번째 에러 필드 찾기
    const firstErrorField = errorFieldPriority.find((field) => errors[field])
    const errorElement =
      document.querySelector(`[name="${firstErrorField}"]`) ||
      document.querySelector(`[data-field="${firstErrorField}"]`)

    if (errorElement) {
      errorElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      if (errorElement instanceof HTMLElement) {
        errorElement.focus()
      }
    }
  }

  // Step3 관련 필드들만 검증하는 함수
  const validateStep3Fields = async () => {
    const step3Fields = [
      'purpose',
      'totalAsset',
      'annualIncome',
      'monthlyIncome',
      'monthlyFixedExpense',
      'debtScale',
      'repaymentMethod',
      'creditScore',
      'safeKey',
      'purposeAndRepaymentPlan',
    ]

    // 조건부 필드들도 추가
    if (loanPurpose === 'DIRECT_INPUT') {
      step3Fields.push('purposeDetail')
    }
    if (repaymentMethod === 'DIRECT_INPUT') {
      step3Fields.push('repaymentDetail')
    }

    const isValid = await trigger(step3Fields)
    return isValid
  }

  const handleNextClick = async () => {
    const safeKeyValid = await trigger('safeKey')
    const isValid = await validateStep3Fields()

    if (isValid && safeKeyValid) {
      const formData = watch()
      onStep3Submit(formData)
    } else {
      if (!safeKeyWatchValue || !safeKeyValid) {
        setError('safeKey', {
          type: 'required',
          message: '신용정보 제출이 필요합니다.',
        })
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
        return
      }
      onStep3Error(errors)
    }
  }

  const handleApplyCreditInfoSubmit = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const popup = window.open(
      `https://api.piwoom.com/v1/nice/?name=${userData?.name}&birth=${userData?.birth}&gender=${userData?.genderCode}`,
      'popupChk',
      'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no',
    )

    // 팝업이 닫힌 후 검증을 트리거하기 위한 폴링
    if (popup) {
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed)
          // 팝업이 닫힌 후 잠시 대기 후 검증 트리거
          setTimeout(() => {
            trigger('safeKey')
          }, 500)
        }
      }, 1000)
    }
  }

  const placeholderData = {
    mortgage:
      '(예시) 서울시 성동구에 위치한 10억원짜리 아파트를 사게 되었습니다. \n잔금이 2개월 후라, 잔금일에 아파트 2순위 담보로 2억원을 빌리고 싶습니다.\n참고로 1순위 은행 대출은 4억원입니다.\n연 소득이 6000만원이기 때문에 매월 대출 이자 납부에는 문제가 없으며, 대출 기간 3년 동안 월급을 열심히 모아서 원금 일부는 상환하고 나머지는 은행 신용대출로 대환할 계획입니다.',
    normal:
      '(예시) 최근 갑작스러운 수술로 병원비가 많이 발생했습니다.\n500만원을 빌리면, 매달 월급에서 일정 금액을 저축하여 5개월 안에 상환할 수 있습니다.',
  }

  const { popup_status: safeKey } = useLocalStorage()
  console.log('safeKeyWatchValue', safeKey)

  useEffect(() => {
    if (safeKey) {
      setValue('safeKey', safeKey)
      clearErrors('safeKey') // 에러 클리어
      trigger('safeKey') // 폼 검증 트리거
    }
  }, [safeKey, setValue, trigger, clearErrors])

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'popup_status' && e.newValue) {
        console.log('Storage changed:', e.newValue)
        setValue('safeKey', e.newValue)
        clearErrors('safeKey') // 에러 클리어
        trigger('safeKey') // 폼 검증 트리거
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [setValue, trigger, clearErrors])

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

        <InputForm label="대출 용도">
          <Flex w={'100%'} gap={'8px'} flexDir={{ base: 'column', sm: 'row' }}>
            <VStack
              w={{ base: '100%', sm: '50%', md: '50%' }}
              alignItems={'flex-start'}
            >
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
                  placeholder="대출 용도 입력"
                  {...register('purposeDetail')}
                  data-field="purposeDetail"
                />
              )}
              {loanPurpose === 'DIRECT_INPUT' && errors?.purposeDetail && (
                <Text textStyle={'pre-caption-2'} color={'accent.red2'} mt={1}>
                  {errors?.purposeDetail?.message as string}
                </Text>
              )}
            </VStack>
            <Box w={{ base: '0', sm: '50%', md: '50%' }} />
          </Flex>
          {errors?.purpose && (
            <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
              {errors?.purpose?.message as string}
            </Text>
          )}
        </InputForm>
        <InputForm label="총 자산 규모" w={'100%'}>
          <SimpleGrid w={'100%'} gap={'8px'} columns={{ base: 2, sm: 4 }}>
            {TOTAL_ASSET_OPTIONS.map((option) => (
              <Button
                key={option.value}
                variant={
                  totalAsset === option.value ?
                    'outline-primary'
                  : 'outline-secondary'
                }
                textStyle={'pre-body-5'}
                bg={totalAsset === option.value ? 'primary.1' : 'grey.0'}
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
          <SimpleGrid w={'100%'} gap={'8px'} columns={{ base: 2, sm: 4 }}>
            {ANNUAL_INCOME_OPTIONS.map((option) => (
              <Button
                key={option.value}
                variant={
                  annualIncome === option.value ?
                    'outline-primary'
                  : 'outline-secondary'
                }
                bg={annualIncome === option.value ? 'primary.1' : 'grey.0'}
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
        <Flex gap={'8px'}>
          <InputForm label="월 실수령액 또는 월 수입">
            <Controller
              name="monthlyIncome"
              control={control}
              render={({ field }) => (
                <InputGroup>
                  <Input
                    placeholder="0"
                    type="text"
                    textAlign="right"
                    pr="50px"
                    value={formatNumberWithCommas(field.value)}
                    onChange={(e) => {
                      const numericValue = parseNumberFromFormatted(
                        e.target.value,
                      )
                      field.onChange(numericValue)
                    }}
                    data-field="monthlyIncome"
                  />
                  <InputRightElement>
                    <Text>만원</Text>
                  </InputRightElement>
                </InputGroup>
              )}
            />
            {errors?.monthlyIncome && (
              <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
                {errors?.monthlyIncome?.message as string}
              </Text>
            )}
          </InputForm>
          <InputForm label="월 고정 지출">
            <Controller
              name="monthlyFixedExpense"
              control={control}
              render={({ field }) => (
                <InputGroup>
                  <Input
                    placeholder="0"
                    type="text"
                    textAlign="right"
                    pr="50px"
                    value={formatNumberWithCommas(field.value)}
                    onChange={(e) => {
                      const numericValue = parseNumberFromFormatted(
                        e.target.value,
                      )
                      field.onChange(numericValue)
                    }}
                    data-field="monthlyFixedExpense"
                  />
                  <InputRightElement>
                    <Text>만원</Text>
                  </InputRightElement>
                </InputGroup>
              )}
            />
            {errors?.monthlyFixedExpense && (
              <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
                {errors?.monthlyFixedExpense?.message as string}
              </Text>
            )}
          </InputForm>
        </Flex>

        <InputForm label="부채규모">
          <SimpleGrid w={'100%'} gap={'8px'} columns={{ base: 2, sm: 4 }}>
            {DEBT_SCALE_OPTIONS.map((option) => (
              <Button
                key={option.value}
                variant={
                  debtScale === option.value ?
                    'outline-primary'
                  : 'outline-secondary'
                }
                bg={debtScale === option.value ? 'primary.1' : 'grey.0'}
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
        <Flex gap={'8px'}>
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
                {errors?.repaymentDetail && (
                  <Text
                    textStyle={'pre-caption-2'}
                    color={'accent.red2'}
                    mt={1}
                  >
                    {errors?.repaymentDetail?.message as string}
                  </Text>
                )}
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
                onClick={() => {
                  window.open('https://campaign.naver.com/credit/', '_blank')
                }}
              >
                <Text color={'grey.8'} textStyle={'pre-caption-1'}>
                  신용점수 조회하기
                </Text>
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
            isDisabled={!!safeKeyWatchValue}
          >
            {safeKeyWatchValue ? '제출 완료' : '제출'}
          </Button>
          {safeKeyWatchValue && (
            <Text textStyle={'pre-body-7'} color={'accent.green2'}>
              신용정보가 제출되었어요.
            </Text>
          )}
          {errors?.safeKey && (
            <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
              {errors?.safeKey?.message as string}
            </Text>
          )}
        </InputForm>

        <InputForm
          label="대출 용도 및 상환 계획"
          isOptional
          isRequired={false}
          w={'100%'}
        >
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
              placeholder={
                placeholderData[
                  router.query.type === 'mortgage' ? 'mortgage' : 'normal'
                ]
              }
              _placeholder={{
                whiteSpace: 'pre-wrap',
                textStyle: 'pre-body-6',
                color: 'grey.5',
              }}
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
