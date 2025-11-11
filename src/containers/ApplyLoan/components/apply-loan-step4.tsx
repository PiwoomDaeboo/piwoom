import { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'

import {
  AspectRatio,
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Spinner,
  Text,
  Textarea,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'

import { Controller, useFormContext, useWatch } from 'react-hook-form'

import {
  useUploadFileToS3Mutation,
  useUploadFilesToS3Mutation,
} from '@/apis/s3-file-uploader/S3FileUploaderApi.query'
import CommonSelect from '@/components/CommonSelect'
import ImageAsNext from '@/components/ImageAsNext'
import InputForm from '@/components/InputForm'
import { useAccountVerifyCreateMutation } from '@/generated/apis/Account/Account.query'
import { useGovRetrieveQuery } from '@/generated/apis/Gov/Gov.query'
import { useLoanCreateMutation } from '@/generated/apis/Loan/Loan.query'
import { useSettingRetrieveQuery } from '@/generated/apis/Setting/Setting.query'
import { useUserRetrieveQuery } from '@/generated/apis/User/User.query'
import {
  CaretRightIcon,
  DocumenticonIcon,
  FolderIcon,
  InfoFillIcon,
  XCircleFillIcon,
  XIcon,
} from '@/generated/icons/MyIcons'
import { useLocalStorage } from '@/stores/local/state'
import { extractErrorMessage } from '@/utils/error-handler'

import AddressModal from '../../../components/@Modal/address-modal'
import DocumentAgreeModal from '../../../components/@Modal/document-agree-modal'
import OfficeAddressModal from '../../../components/@Modal/office-address-modal'
import RepaymentMethodModal from '../../../components/@Modal/repayment-method-modal'
import UntactDocumentApplyModal from '../../../components/@Modal/untact-document-apply-modal'
import {
  BANK_DATA,
  CHECKBOX_STYLES,
  DATE_OF_PAYMENT_DATA,
  EMPLOYMENT_TYPE,
  JOP_TYPE,
  REPAYMENT_TYPE,
} from '../../../constants/loan'
import { useSelectButtonGroup } from '../hooks/useSelectButtonGroup'
import AdditionalFileUpload from './additional-file-upload'
import IdcardUpload from './idcard-upload'

interface Company {
  no: string | null
  name: string | null
  businessNo: string | null
  baseAddress: string | null
  detailAddress: string | null
}

const ApplyLoanStep4 = () => {
  const router = useRouter()
  const toast = useToast()
  const {
    register,
    setValue,
    getValues,
    clearErrors,
    trigger,
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useFormContext()

  const watchAll = watch()
  const loanAmount = useWatch({ control, name: 'loanAmount' })
  const loanPeriod = useWatch({ control, name: 'loanPeriod' })
  const residenceType = useWatch({ control, name: 'residenceType' })
  const housingType = useWatch({ control, name: 'housingType' })
  const jobTypeWatchValue = useWatch({ control, name: 'jobType' })

  const baseAddress = useWatch({ control, name: 'baseAddress' })
  const assetBaseAddress = useWatch({ control, name: 'assetBaseAddress' })
  const electronicDocumentConsent = useWatch({
    control,
    name: 'electronicDocumentConsent',
  })
  const {
    isOpen: isOfficeAddressModalOpen,
    onOpen: onOfficeAddressModalOpen,
    onClose: onOfficeAddressModalClose,
  } = useDisclosure()
  const {
    isOpen: isDocumentAgreeModalOpen,
    onOpen: onDocumentAgreeModalOpen,
    onClose: onDocumentAgreeModalClose,
  } = useDisclosure()
  const {
    isOpen: isRepaymentMethodModalOpen,
    onOpen: onRepaymentMethodModalOpen,
    onClose: onRepaymentMethodModalClose,
  } = useDisclosure()
  const {
    isOpen: isAddressModalOpen,
    onOpen: onAddressModalOpen,
    onClose: onAddressModalClose,
  } = useDisclosure()
  const {
    isOpen: isUntactDocumentApplyModalOpen,
    onOpen: onUntactDocumentApplyModalOpen,
    onClose: onUntactDocumentApplyModalClose,
  } = useDisclosure()

  const [isDocumentSubmissionCompleted, setIsDocumentSubmissionCompleted] =
    useState(false)
  const [addressModalType, setAddressModalType] = useState<
    'normal' | 'real-estate' | 'company'
  >('normal')
  const [isCompanyAddressFromSearch, setIsCompanyAddressFromSearch] =
    useState(false)
  const { popup_status: safeKey, reset } = useLocalStorage()
  const [isBankAccountVerified, setIsBankAccountVerified] = useState(false)
  const bankWatchValue = useWatch({ control, name: 'bank' })
  const accountNumberWatchValue = useWatch({ control, name: 'accountNumber' })
  const employmentTypeWatchValue = useWatch({
    control,
    name: 'employmentType',
  })

  const companyName = useWatch({ control, name: 'companyName' })
  const companyAddress = useWatch({ control, name: 'companyAddress' })
  const { data: settingData } = useSettingRetrieveQuery({
    variables: {
      id: 'me',
    },
  })
  const {
    mutate: accountVerifyMutation,
    isPending: isAccountVerifyMutationLoading,
  } = useAccountVerifyCreateMutation({
    options: {
      onSuccess: (data) => {
        // setValue('accountHolderSsn', true)
        clearErrors('accountHolder')
        setIsBankAccountVerified(true)
        setValue('accountHolder', data?.holder)
      },
      onError: (error: any) => {
        toast({
          title: '계좌 검증 실패',
          description:
            error.response.data.nonField[0] ||
            '계좌 검증 중 오류가 발생했습니다.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
        setIsBankAccountVerified(false)
        console.error('ownerNameSearch', error)
      },
    },
  })

  const { SelectButtonGroup: EmploymentTypeButtons } = useSelectButtonGroup({
    name: 'employmentType',
    options: EMPLOYMENT_TYPE,
  })

  const { SelectButtonGroup: RepaymentTypeButtons } = useSelectButtonGroup({
    name: 'repaymentType',
    options: REPAYMENT_TYPE,
  })

  const { mutate: loanCreateMutation, isPending: isLoanCreateMutationPending } =
    useLoanCreateMutation({
      options: {
        onSuccess: (data: any) => {
          reset('popup_status')
          router.replace('/apply-loan-complete?loanId=' + data.id)
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

  const onStep4Submit = (data: any) => {
    const requestData = {
      // identityVerificationToken: identityVerificationToken,
      incomeCertificate: getValues('incomeCertificate') || '',
      residentRegistrationCopy: getValues('residentRegistrationCopy') || '',
      healthInsuranceEligibilityConfirmation:
        getValues('healthInsuranceEligibilityConfirmation') || '',
      healthInsurancePaymentConfirmation:
        getValues('healthInsurancePaymentConfirmation') || '',
      healthInsurancePaymentConfirmation2:
        getValues('healthInsurancePaymentConfirmation2') || '',
      fileSet: getValues('fileSet') || [],
      safeKey: safeKey,
      accountHolder: getValues('accountHolder') || '-',
      accountHolderSsn: getValues('accountHolderSsn') || '-',
      purposeAndRepaymentPlan: getValues('purposeAndRepaymentPlan') || '-',
      companyDetailAddress:
        isCompanyAddressFromSearch ? getValues('companyDetailAddress') : '',
      assetBaseAddress: getValues('assetBaseAddress') || '-',
      assetDetailAddress: getValues('assetDetailAddress') || '-',
      assetPostcode: getValues('assetPostcode') || '-',
      ...data,
    }
    loanCreateMutation({
      data: requestData,
    })
  }

  const onStep4Error = (errors: any) => {
    // 에러가 있는 모든 필드 중 화면 상단에 가장 가까운 요소를 계산해서 스크롤
    const errorKeys = Object.keys(errors || {})
    let topmost = Number.POSITIVE_INFINITY
    let topmostElement: HTMLElement | null = null

    for (const key of errorKeys) {
      const candidate =
        (document.querySelector(`[name="${key}"]`) as HTMLElement | null) ||
        (document.querySelector(`[data-field="${key}"]`) as HTMLElement | null)

      if (candidate) {
        const rect = candidate.getBoundingClientRect()
        const absoluteTop = rect.top + window.scrollY
        if (absoluteTop < topmost) {
          topmost = absoluteTop
          topmostElement = candidate
        }
      }
    }

    // 여유 오프셋 (고정 헤더 등을 고려)
    const offset = 80

    if (topmostElement) {
      window.scrollTo({
        top: Math.max(topmost - offset, 0),
        behavior: 'smooth',
      })
      // 포커스도 함께 이동
      setTimeout(() => {
        topmostElement && topmostElement.focus && topmostElement.focus()
      }, 150)
    } else {
      // 폴백: 맨 위로 이동
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

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
              필수 항목을 입력해주세요
            </Text>
          </HStack>
        </Box>
      ),
      duration: 5000,
      isClosable: true,
    })
  }

  const { data: userData } = useUserRetrieveQuery({
    variables: {
      id: 'me',
    },
  })
  // 대출신청 버튼 클릭 핸들러 (handleSubmit 사용)
  const handleSubmitClick = handleSubmit(onStep4Submit, onStep4Error)

  const handleCompanySelect = (company: Company) => {
    clearErrors('companyAddress')
    clearErrors('companyDetailAddress')
    clearErrors('companyBusinessNumber')

    setValue('companyName', company.name, { shouldValidate: false })
    setValue('companyBusinessNumber', company.businessNo, {
      shouldValidate: false,
    })
    setValue('companyAddress', company.baseAddress, { shouldValidate: false })

    if (company.baseAddress) {
      setIsCompanyAddressFromSearch(true)
    } else {
      setIsCompanyAddressFromSearch(false)
    }

    // 수동으로 validation 실행
    trigger(['companyName', 'companyBusinessNumber'])
  }

  const handleAddressModalOpen = (
    type: 'normal' | 'real-estate' | 'company',
  ) => {
    setAddressModalType(type)
    onAddressModalOpen()
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

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedText = e.clipboardData.getData('text')
    const numbersOnly = pastedText.replace(/[^0-9]/g, '')

    const target = e.target as HTMLInputElement
    const fieldName = target.name

    if (fieldName && numbersOnly) {
      let value = parseInt(numbersOnly) || 0

      if (fieldName === 'loanPeriod') {
        value = Math.min(Math.max(value, 1), 60)
      }

      setValue(fieldName, value)
    }
  }

  const handleLoanPeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0

    const clampedValue =
      router.query.type === 'salary' ? Math.min(Math.max(value, 0), 6)
      : router.query.type === 'credit' ? Math.min(Math.max(value, 0), 30)
      : Math.min(Math.max(value, 0), 60)

    if (value !== clampedValue) {
      setValue('loanPeriod', clampedValue)
    }
  }

  const handleLoanAmountSelect = (amount: string) => {
    setValue('loanAmount', parseInt(amount))
  }

  const handleLoanPeriodSelect = (period: string) => {
    const periodNumber = period.replace('개월', '')
    setValue('loanPeriod', parseInt(periodNumber))
  }

  const handleHousingTypeSelect = (type: string) => {
    setValue('housingType', type)
  }

  const handleResidenceTypeSelect = (ownership: string) => {
    setValue('residenceType', ownership)
  }

  const handleOwnerNameSearch = () => {
    accountVerifyMutation({
      data: {
        bank: bankWatchValue,
        number: accountNumberWatchValue,
        birth: userData?.birth?.slice(2) || '',
      },
    })
  }
  const handleUntactDocumentApplyModalOpen = () => {
    onUntactDocumentApplyModalOpen()
  }

  const handleUntactDocumentSubmissionComplete = () => {
    setIsDocumentSubmissionCompleted(true)
    setValue('untactDocumentSubmission', true)
    clearErrors('untactDocumentSubmission')
    // clearErrors()
  }
  useEffect(() => {
    if (!settingData?.isGov) {
      setValue('untactDocumentSubmission', true)
      clearErrors('untactDocumentSubmission')
    }
  }, [settingData?.isGov])

  useEffect(() => {
    if (
      jobTypeWatchValue === 'HOUSEWIFE' ||
      jobTypeWatchValue === 'UNEMPLOYED'
    ) {
      // 에러 클리어
      clearErrors('companyName')
      clearErrors('companyBusinessNumber')
      clearErrors('companyDetailAddress')
      clearErrors('companyAddress')
      clearErrors('employmentType')
      clearErrors('hireYear')
      clearErrors('hireMonth')

      // 값도 초기화 (선택사항이지만 UX 개선)
      setValue('companyName', '')
      setValue('companyAddress', '')
      setValue('companyDetailAddress', '')
      setValue('companyBusinessNumber', '')
      setValue('employmentType', '')
      setValue('hireYear', undefined)
      setValue('hireMonth', undefined)
    }
  }, [jobTypeWatchValue, clearErrors, setValue])

  return (
    <Container>
      <UntactDocumentApplyModal
        isOpen={isUntactDocumentApplyModalOpen}
        onClose={onUntactDocumentApplyModalClose}
        onComplete={handleUntactDocumentSubmissionComplete}
      />
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={onAddressModalClose}
        type={addressModalType}
      />
      <OfficeAddressModal
        isOpen={isOfficeAddressModalOpen}
        onClose={onOfficeAddressModalClose}
        onSelectCompany={handleCompanySelect}
      />
      <DocumentAgreeModal
        isOpen={isDocumentAgreeModalOpen}
        onClose={onDocumentAgreeModalClose}
        onAgree={() => setValue('electronicDocumentConsent', true)}
      />
      <RepaymentMethodModal
        isOpen={isRepaymentMethodModalOpen}
        onClose={onRepaymentMethodModalClose}
      />
      <Flex
        py={{ base: '40px', sm: '48px', md: '84px' }}
        flexDir={'column'}
        gap={'24px'}
      >
        <VStack alignItems={'flex-start'} spacing={'8px'} mb={'32px'}>
          <Text textStyle={'pre-heading-2'} color={'grey.10'}>
            대출신청 정보
          </Text>
          <VStack spacing={'12px'} alignItems={'flex-start'}>
            <Text textStyle={'pre-body-6'} color={'grey.7'}>
              대출심사를 위해 대출신청 정보를 입력해 주세요.
            </Text>
          </VStack>
        </VStack>
        <Flex
          p={'24px'}
          borderRadius={'20px'}
          border={'1px solid'}
          borderColor={'border.basic.1'}
          gap={'20px'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <HStack alignItems={'center'} spacing={'16px'}>
            <Checkbox
              isChecked={electronicDocumentConsent || false}
              onChange={(e) =>
                setValue('electronicDocumentConsent', e.target.checked)
              }
              sx={CHECKBOX_STYLES}
            />
            <VStack alignItems={'flex-start'}>
              <Text textStyle={'pre-body-6'} color={'primary.3'}>
                <Box as="span" color={'primary.4'}>
                  [선택]
                </Box>{' '}
                전자문서 수신동의
              </Text>
              <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
                전자문서 수신 동의를 하지 않는 경우, 각종 통지문이 자택 주소지로
                우편 발송 됩니다.
              </Text>
            </VStack>
          </HStack>
          <Button
            variant={'none'}
            w={'24px'}
            h={'24px'}
            onClick={onDocumentAgreeModalOpen}
          >
            <CaretRightIcon boxSize={'24px'} />
          </Button>
        </Flex>
        <Text textStyle={'pre-heading-3'} color={'primary.4'}>
          대출 정보
        </Text>

        <InputForm label="대출신청 금액">
          <Controller
            name="loanAmount"
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
                  data-field="loanAmount"
                />
                <InputRightElement>
                  <Text>만원</Text>
                </InputRightElement>
              </InputGroup>
            )}
          />
          {errors?.loanAmount && (
            <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
              {errors?.loanAmount?.message as string}
            </Text>
          )}
        </InputForm>
        <InputForm
          label="상환방식"
          w={'100%'}
          onClickTooltip={onRepaymentMethodModalOpen}
        >
          <RepaymentTypeButtons />
          {errors?.repaymentType && (
            <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
              {errors?.repaymentType?.message as string}
            </Text>
          )}
        </InputForm>
        <InputForm label="이자납입일자">
          <Box w={'100%'}>
            <Controller
              name="interestPaymentDate"
              control={control}
              render={({ field }) => (
                <CommonSelect
                  options={DATE_OF_PAYMENT_DATA}
                  placeholder="선택"
                  value={DATE_OF_PAYMENT_DATA.find(
                    (option) => option.value === field.value,
                  )}
                  onChange={(selectedOption) =>
                    field.onChange(selectedOption?.value || '')
                  }
                  data-field="interestPaymentDate"
                />
              )}
            />
          </Box>
          {errors?.interestPaymentDate && (
            <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
              {errors?.interestPaymentDate?.message as string}
            </Text>
          )}
        </InputForm>
        {router.query.type === 'salary' && (
          <InputForm label="대출기간">
            <VStack alignItems={'flex-start'} spacing={'8px'} w={'100%'}>
              <InputGroup>
                <Input
                  placeholder="0"
                  type="number"
                  min={0}
                  max={6}
                  onKeyDown={(evt) =>
                    ['e', 'E', '+', '-', '.'].includes(evt.key) &&
                    evt.preventDefault()
                  }
                  onPaste={handlePaste}
                  textAlign="right"
                  pr="50px"
                  {...register('loanPeriod', {
                    valueAsNumber: true,
                    onChange: handleLoanPeriodChange,
                  })}
                  data-field="loanPeriod"
                />
                <InputRightElement>
                  <Text>개월</Text>
                </InputRightElement>
              </InputGroup>
              <Text textStyle={'pre-caption-2'} color={'grey.6'}>
                최대 6개월까지 입력 가능해요
              </Text>
            </VStack>
            {errors?.loanPeriod && (
              <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
                {errors?.loanPeriod?.message as string}
              </Text>
            )}
          </InputForm>
        )}
        {router.query.type === 'credit' && (
          <InputForm label="대출기간">
            <VStack alignItems={'flex-start'} spacing={'8px'} w={'100%'}>
              <InputGroup>
                <Input
                  placeholder="0"
                  type="number"
                  min={0}
                  max={36}
                  onKeyDown={(evt) =>
                    ['e', 'E', '+', '-', '.'].includes(evt.key) &&
                    evt.preventDefault()
                  }
                  onPaste={handlePaste}
                  textAlign="right"
                  pr="50px"
                  {...register('loanPeriod', {
                    valueAsNumber: true,
                    onChange: handleLoanPeriodChange,
                  })}
                  data-field="loanPeriod"
                />
                <InputRightElement>
                  <Text>개월</Text>
                </InputRightElement>
              </InputGroup>
              <Text textStyle={'pre-caption-2'} color={'grey.6'}>
                최대 36개월까지 입력 가능해요
              </Text>
            </VStack>
            {errors?.loanPeriod && (
              <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
                {errors?.loanPeriod?.message as string}
              </Text>
            )}
          </InputForm>
        )}
        {router.query.type === 'mortgage' && (
          <InputForm label="대출기간">
            <VStack alignItems={'flex-start'} spacing={'8px'} w={'100%'}>
              <InputGroup>
                <Input
                  placeholder="0"
                  type="number"
                  min={0}
                  max={60}
                  onKeyDown={(evt) =>
                    ['e', 'E', '+', '-', '.'].includes(evt.key) &&
                    evt.preventDefault()
                  }
                  onPaste={handlePaste}
                  textAlign="right"
                  pr="50px"
                  {...register('loanPeriod', {
                    valueAsNumber: true,
                    onChange: handleLoanPeriodChange,
                  })}
                  data-field="loanPeriod"
                />
                <InputRightElement>
                  <Text>개월</Text>
                </InputRightElement>
              </InputGroup>
              <Text textStyle={'pre-caption-2'} color={'grey.6'}>
                최대 60개월까지 입력 가능해요
              </Text>
            </VStack>
            {errors?.loanPeriod && (
              <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
                {errors?.loanPeriod?.message as string}
              </Text>
            )}
          </InputForm>
        )}
        <Flex gap={'8px'}>
          <InputForm label="입금은행">
            <Box w={'100%'}>
              <Controller
                name="bank"
                control={control}
                render={({ field }) => (
                  <CommonSelect
                    isDisabled={isBankAccountVerified}
                    options={BANK_DATA}
                    placeholder="선택"
                    value={BANK_DATA.flatMap((group) => group.options).find(
                      (option) => option.value === field.value,
                    )}
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption?.value || '')
                    }
                    data-field="bank"
                  />
                )}
              />
            </Box>
            {errors?.bank && (
              <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
                {errors?.bank?.message as string}
              </Text>
            )}
          </InputForm>
          <InputForm label="계좌번호">
            <Input
              type="number"
              placeholder="계좌번호"
              maxLength={20}
              disabled={isBankAccountVerified}
              onKeyDown={(evt) =>
                ['e', 'E', '+', '-', '.'].includes(evt.key) &&
                evt.preventDefault()
              }
              onInput={(evt) => {
                const target = evt.target as HTMLInputElement
                if (target.value.length > 20) {
                  target.value = target.value.slice(0, 20)
                  setError('accountNumber', {
                    message: '계좌번호는 최대 20자리까지 입력 가능합니다.',
                  })
                }
              }}
              onPaste={handlePaste}
              {...register('accountNumber')}
              data-field="accountNumber"
            />
            {errors?.accountNumber && (
              <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
                {errors?.accountNumber?.message as string}
              </Text>
            )}
          </InputForm>
        </Flex>
        <InputForm label="예금주 실명조회">
          <Button
            variant={'outline-secondary'}
            textStyle={'pre-body-5'}
            color={'grey.8'}
            isLoading={isAccountVerifyMutationLoading}
            isDisabled={isAccountVerifyMutationLoading || isBankAccountVerified}
            w={'209px'}
            data-field="accountHolder"
            onClick={handleOwnerNameSearch}
          >
            {isBankAccountVerified ? '예금주 실명조회 완료' : '예금주 실명조회'}
          </Button>
          {isBankAccountVerified && (
            <Text textStyle={'pre-body-7'} color={'accent.green2'}>
              예금주 실명조회가 완료됐어요
            </Text>
          )}
          {errors?.accountHolder && (
            <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
              {errors?.accountHolder?.message as string}
            </Text>
          )}
        </InputForm>
        <Box w={'100%'} h={'1px'} bg={'border.basic.1'} my={'48px'} />
        <Text textStyle={'pre-heading-3'} color={'primary.4'}>
          직장 정보
        </Text>
        <Flex flexDir={{ base: 'column', sm: 'row' }} gap={'8px'}>
          <InputForm label="직업구분">
            <Box w={'100%'}>
              <Controller
                name="jobType"
                control={control}
                render={({ field }) => (
                  <CommonSelect
                    options={JOP_TYPE}
                    placeholder="선택해주세요"
                    value={JOP_TYPE.find(
                      (option) => option.value === field.value,
                    )}
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption?.value || '')
                    }
                    data-field="jobType"
                  />
                )}
              />
            </Box>
            {errors?.jobType && (
              <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
                {errors?.jobType?.message as string}
              </Text>
            )}
          </InputForm>
          <InputForm label="직장명">
            <Flex w={'100%'} gap={'8px'}>
              <Input
                placeholder="직장명"
                w={'100%'}
                {...register('companyName')}
                readOnly
                data-field="companyName"
              />
              <Button
                isDisabled={
                  jobTypeWatchValue === 'HOUSEWIFE' ||
                  jobTypeWatchValue === 'UNEMPLOYED'
                }
                variant={'solid-primary'}
                size={'lg'}
                onClick={() => {
                  setIsCompanyAddressFromSearch(false)
                  onOfficeAddressModalOpen()
                }}
              >
                직장명 검색
              </Button>
            </Flex>
            {!companyName && (
              <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
                {errors?.companyName?.message as string}
              </Text>
            )}
          </InputForm>
        </Flex>
        {companyName && (
          <InputForm
            label="직장 사업자등록번호"
            isRequired={isCompanyAddressFromSearch ? true : false}
            isOptional={isCompanyAddressFromSearch ? false : true}
          >
            <Input
              placeholder="직장 사업자등록번호"
              // onPaste={handlePaste}
              {...register('companyBusinessNumber')}
              // readOnly={companyBusinessNumber ? true : false}
              data-field="companyBusinessNumber"
            />
            {errors?.companyBusinessNumber && (
              <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
                {errors?.companyBusinessNumber?.message as string}
              </Text>
            )}
          </InputForm>
        )}

        {companyName && (
          <InputForm label="주소">
            <VStack w={'100%'} gap={'8px'} alignItems={'stretch'}>
              <Flex w={'100%'} gap={'8px'}>
                <Input
                  placeholder="기본주소"
                  w={'100%'}
                  value={companyAddress || ''}
                  readOnly
                  data-field="companyAddress"
                />
                {!isCompanyAddressFromSearch && (
                  <Button
                    variant={'solid-primary'}
                    size={'lg'}
                    onClick={() => handleAddressModalOpen('company')}
                  >
                    주소검색
                  </Button>
                )}
              </Flex>
              {!isCompanyAddressFromSearch && (
                <Input
                  placeholder="상세주소"
                  w={'100%'}
                  {...register('companyDetailAddress')}
                  data-field="companyDetailAddress"
                  onChange={(e) => {
                    register('companyDetailAddress').onChange(e)
                    if (errors?.companyDetailAddress) {
                      clearErrors('companyDetailAddress')
                    }
                  }}
                />
              )}
            </VStack>
            {errors?.companyAddress && (
              <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
                {errors?.companyAddress?.message as string}
              </Text>
            )}
            {errors?.companyDetailAddress && (
              <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
                {errors?.companyDetailAddress?.message as string}
              </Text>
            )}
          </InputForm>
        )}
        {/* {companyAddress && companyName && companyBusinessNumber && (
          <InputForm isRequired label="주소">
            <VStack w={'100%'} gap={'8px'} alignItems={'stretch'}>
              <Flex w={'100%'} gap={'8px'}>
                <Input
                  placeholder="기본주소"
                  w={'100%'}
                  value={companyAddress || ''}
                  readOnly
                  data-field="companyAddress"
                />
              </Flex>
            </VStack>
            {errors?.companyAddress && (
              <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
                {errors?.companyAddress?.message as string}
              </Text>
            )}
          </InputForm>
        )} */}
        <InputForm label="고용구분">
          <EmploymentTypeButtons />
          {errors?.employmentType && (
            <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
              {errors?.employmentType?.message as string}
            </Text>
          )}
        </InputForm>

        <InputForm label="입사년월 또는 창업시기">
          <Flex w={'100%'} flexDir={{ base: 'column', sm: 'row' }} gap={'8px'}>
            <VStack alignItems={'flex-start'} spacing={'4px'} w={'100%'}>
              <InputGroup w={{ base: '100%', sm: '100%' }}>
                <Input
                  placeholder="YYYY"
                  type="number"
                  onPaste={handlePaste}
                  textAlign="right"
                  pr="40px"
                  disabled={
                    jobTypeWatchValue === 'HOUSEWIFE' ||
                    jobTypeWatchValue === 'UNEMPLOYED'
                  }
                  onKeyDown={(evt) =>
                    ['e', 'E', '+', '-', '.'].includes(evt.key) &&
                    evt.preventDefault()
                  }
                  {...register('hireYear', {
                    valueAsNumber: true,
                  })}
                  data-field="hireYear"
                />
                <InputRightElement>
                  <Text>년</Text>
                </InputRightElement>
              </InputGroup>
              {errors?.hireYear && (
                <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
                  {errors?.hireYear?.message as string}
                </Text>
              )}
            </VStack>
            <VStack alignItems={'flex-start'} spacing={'4px'} w={'100%'}>
              <InputGroup w={{ base: '100%', sm: '100%' }}>
                <Input
                  placeholder="MM"
                  type="number"
                  disabled={
                    jobTypeWatchValue === 'HOUSEWIFE' ||
                    jobTypeWatchValue === 'UNEMPLOYED'
                  }
                  onPaste={handlePaste}
                  textAlign="right"
                  onKeyDown={(evt) => {
                    ;['e', 'E', '+', '-', '.'].includes(evt.key) &&
                      evt.preventDefault()
                  }}
                  pr="40px"
                  {...register('hireMonth', {
                    valueAsNumber: true,
                  })}
                  data-field="hireMonth"
                />
                <InputRightElement>
                  <Text>월</Text>
                </InputRightElement>
              </InputGroup>
              {errors?.hireMonth && (
                <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
                  {errors?.hireMonth?.message as string}
                </Text>
              )}
            </VStack>
          </Flex>
        </InputForm>
        {/* ))} */}

        <Box w={'100%'} h={'1px'} bg={'border.basic.1'} my={'48px'} />
        <Text textStyle={'pre-heading-3'} color={'primary.4'}>
          주거 정보
        </Text>

        <InputForm label="주소">
          <VStack w={'100%'} gap={'8px'} alignItems={'stretch'}>
            <Flex w={'100%'} gap={'8px'}>
              <Input
                placeholder="기본주소"
                w={'100%'}
                value={baseAddress || ''}
                readOnly
                data-field="baseAddress"
              />
              <Button
                variant={'solid-primary'}
                size={'lg'}
                onClick={() => handleAddressModalOpen('normal')}
              >
                주소검색
              </Button>
            </Flex>
            <Input
              placeholder="상세주소"
              w={'100%'}
              {...register('detailAddress')}
              data-field="detailAddress"
            />
          </VStack>
          {errors?.baseAddress && (
            <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
              {errors?.baseAddress?.message as string}
            </Text>
          )}
          {errors?.detailAddress && (
            <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
              {errors?.detailAddress?.message as string}
            </Text>
          )}
        </InputForm>

        <InputForm label="주거 종류">
          <SimpleGrid w={'100%'} columns={{ base: 2, sm: 4 }} spacing={'8px'}>
            <Button
              bg={housingType === 'APARTMENT' ? 'primary.1' : 'grey.0'}
              variant={
                housingType === 'APARTMENT' ? 'outline-primary' : (
                  'outline-secondary'
                )
              }
              onClick={() => {
                clearErrors('housingType')
                handleHousingTypeSelect('APARTMENT')
              }}
            >
              아파트/주상복합
            </Button>
            <Button
              bg={housingType === 'MULTI_FAMILY' ? 'primary.1' : 'grey.0'}
              variant={
                housingType === 'MULTI_FAMILY' ? 'outline-primary' : (
                  'outline-secondary'
                )
              }
              onClick={() => {
                clearErrors('housingType')
                handleHousingTypeSelect('MULTI_FAMILY')
              }}
            >
              연립/다세대/다가구
            </Button>
            <Button
              bg={housingType === 'OTHER' ? 'primary.1' : 'grey.0'}
              variant={
                housingType === 'OTHER' ? 'outline-primary' : (
                  'outline-secondary'
                )
              }
              onClick={() => {
                clearErrors('housingType')
                handleHousingTypeSelect('OTHER')
              }}
            >
              그 외
            </Button>
          </SimpleGrid>
          {errors?.housingType && (
            <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
              {errors?.housingType?.message as string}
            </Text>
          )}
        </InputForm>
        <InputForm label="주거 형태">
          <SimpleGrid w={'100%'} columns={{ base: 2, sm: 4 }} spacing={'8px'}>
            <Button
              bg={residenceType === 'OWNED' ? 'primary.1' : 'grey.0'}
              variant={
                residenceType === 'OWNED' ? 'outline-primary' : (
                  'outline-secondary'
                )
              }
              onClick={() => {
                clearErrors('residenceType')
                handleResidenceTypeSelect('OWNED')
              }}
            >
              자가
            </Button>
            <Button
              bg={residenceType === 'JEONSE' ? 'primary.1' : 'grey.0'}
              variant={
                residenceType === 'JEONSE' ? 'outline-primary' : (
                  'outline-secondary'
                )
              }
              onClick={() => {
                clearErrors('residenceType')
                handleResidenceTypeSelect('JEONSE')
              }}
            >
              전세
            </Button>
            <Button
              bg={residenceType === 'MONTHLY_RENT' ? 'primary.1' : 'grey.0'}
              variant={
                residenceType === 'MONTHLY_RENT' ? 'outline-primary' : (
                  'outline-secondary'
                )
              }
              onClick={() => {
                clearErrors('residenceType')
                handleResidenceTypeSelect('MONTHLY_RENT')
              }}
            >
              월세
            </Button>
          </SimpleGrid>
          {errors?.residenceType && (
            <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
              {errors?.residenceType?.message as string}
            </Text>
          )}
        </InputForm>
        <Box w={'100%'} h={'1px'} bg={'border.basic.1'} my={'48px'} />
        <Text textStyle={'pre-heading-3'} color={'primary.4'}>
          자산 정보
        </Text>

        <InputForm
          label="부동산 정보"
          isRequired={router.query.type === 'mortgage' ? true : false}
          isOptional={router.query.type === 'mortgage' ? false : true}
        >
          <VStack w={'100%'} gap={'8px'} alignItems={'stretch'}>
            <Flex w={'100%'} gap={'8px'}>
              <Input
                placeholder="기본주소"
                w={'100%'}
                value={assetBaseAddress || ''}
                readOnly
                data-field="assetBaseAddress"
              />
              <Button
                variant={'solid-primary'}
                size={'lg'}
                onClick={() => handleAddressModalOpen('real-estate')}
              >
                주소검색
              </Button>
            </Flex>
            <Input
              placeholder="상세주소"
              w={'100%'}
              {...register('assetDetailAddress')}
              data-field="assetDetailAddress"
              onChange={(e) => {
                register('assetDetailAddress').onChange(e)
                if (errors?.assetDetailAddress) {
                  clearErrors('assetDetailAddress')
                }
              }}
            />
          </VStack>
          {/* {errors?.assetBaseAddress && (
            <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
              {errors?.assetBaseAddress?.message as string}
            </Text>
          )} */}
          {errors?.assetDetailAddress && (
            <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
              {errors?.assetDetailAddress?.message as string}
            </Text>
          )}
        </InputForm>
        <Box w={'100%'} h={'1px'} bg={'border.basic.1'} my={'48px'} />
        <Text textStyle={'pre-heading-3'} color={'primary.4'}>
          서류 제출
        </Text>
        <InputForm label="비대면 서류제출" isRequired={true}>
          <Button
            variant={'outline-primary'}
            textStyle={'pre-body-5'}
            type="button"
            w={'209px'}
            // disabled={!settingData?.isGov}
            isDisabled={isDocumentSubmissionCompleted || !settingData?.isGov}
            onClick={handleUntactDocumentApplyModalOpen}
          >
            {isDocumentSubmissionCompleted ? '서류제출완료' : '비대면 서류제출'}
          </Button>

          {/* {!settingData?.isGov && (
            <Text textStyle={'pre-body-6'} color={'accent.red2'}>
              비대면 서류제출 기능이 비활성화되어 있어요.
            </Text>
          )} */}
          {errors?.untactDocumentSubmission && (
            <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
              {errors?.untactDocumentSubmission?.message as string}
            </Text>
          )}
          {!settingData?.isGov && (
            <VStack w={'100%'} spacing={'12px'}>
              <VStack w={'100%'} spacing={'12px'}>
                <VStack
                  w={'100%'}
                  alignItems={'flex-start'}
                  p={'16px 20px'}
                  borderRadius={'20px'}
                  border={'1px solid'}
                  borderColor={'border.basic.1'}
                  gap={'24px'}
                >
                  <HStack w={'100%'}>
                    <InfoFillIcon boxSize={'24px'} />
                    <Text textStyle={'pre-body-7'} color={'grey.9'}>
                      유의사항
                    </Text>
                  </HStack>
                  <Text textStyle={'pre-body-6'} color={'grey.8'}>
                    서버 점검 등의 사유로 인해 비대면 서류 제출 기능을 제공하지
                    않을 수 있습니다.
                    <br />
                    추후 [대출 현황 조회] 페이지에서 비대면 서류 제출을 진행
                    부탁드립니다.
                  </Text>
                </VStack>
              </VStack>
            </VStack>
          )}
        </InputForm>
        {settingData?.isGov && (
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
                유의사항
              </Text>
            </HStack>
            <Text textStyle={'pre-body-6'} color={'grey.8'}>
              정부24 회원이 아닌 경우, 먼저 회원가입을 완료하셔야 비대면 서류
              제출이 가능합니다. <br /> 아래 링크를 통해 정부24 회원가입을
              진행하신 뒤 서류 제출을 진행해 주시기 바랍니다.
            </Text>
            <Button
              variant={'text-primary'}
              onClick={() =>
                window.open(
                  'https://plus.gov.kr/member/signUpAgree?awqf=!2f',
                  '_blank',
                )
              }
            >
              정부24 회원가입
            </Button>
          </VStack>
        )}

        <AdditionalFileUpload />
        <Box w={'100%'} h={'1px'} bg={'border.basic.1'} my={'48px'} />
        <IdcardUpload />
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
            isLoading={isLoanCreateMutationPending}
            onClick={handleSubmitClick}
          >
            대출 신청
          </Button>
        </Flex>
      </Flex>
    </Container>
  )
}

export default ApplyLoanStep4
