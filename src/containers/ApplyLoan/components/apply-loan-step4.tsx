import { useRef, useState } from 'react'

import { useRouter } from 'next/router'

import {
  AspectRatio,
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

import { useUploadFileToS3Mutation } from '@/apis/s3-file-uploader/S3FileUploaderApi.query'
import CommonSelect from '@/components/CommonSelect'
import ImageAsNext from '@/components/ImageAsNext'
import InputForm from '@/components/InputForm'
import { useAccountVerifyCreateMutation } from '@/generated/apis/Account/Account.query'
import { useGovRetrieveQuery } from '@/generated/apis/Gov/Gov.query'
import { useLoanCreateMutation } from '@/generated/apis/Loan/Loan.query'
import {
  CaretRightIcon,
  FolderIcon,
  InfoFillIcon,
  XCircleFillIcon,
} from '@/generated/icons/MyIcons'
import { useQueryEffects } from '@/hooks/useQueryEffect'
import { useSessionStorage } from '@/stores/session/state'

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

interface Company {
  no: string
  name: string
  businessNo: string
  baseAddress: string
  detailAddress: string
}

const ApplyLoanStep4 = () => {
  const router = useRouter()
  const toast = useToast()
  const {
    register,
    setValue,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormContext()
  const watchAll = watch()
  console.log('watchAll', watchAll)
  const loanAmount = useWatch({ control, name: 'loanAmount' })
  const loanPeriod = useWatch({ control, name: 'loanPeriod' })
  const residenceType = useWatch({ control, name: 'residenceType' })
  const housingType = useWatch({ control, name: 'housingType' })
  const companyBusinessNumber = useWatch({
    control,
    name: 'companyBusinessNumber',
  })
  const baseAddress = useWatch({ control, name: 'baseAddress' })
  const detailAddress = useWatch({ control, name: 'detailAddress' })
  const assetBaseAddress = useWatch({ control, name: 'assetBaseAddress' })
  const assetDetailAddress = useWatch({ control, name: 'assetDetailAddress' })
  const postcode = useWatch({ control, name: 'postcode' })
  const assetPostcode = useWatch({ control, name: 'assetPostcode' })
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
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null)
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [shouldExecuteGovQuery, setShouldExecuteGovQuery] = useState(false)
  const [isDocumentSubmissionCompleted, setIsDocumentSubmissionCompleted] =
    useState(false)
  const [addressModalType, setAddressModalType] = useState<
    'normal' | 'real-estate'
  >('normal')
  const [isBankAccountVerified, setIsBankAccountVerified] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const bankWatchValue = useWatch({ control, name: 'bank' })
  const accountNumberWatchValue = useWatch({ control, name: 'accountNumber' })

  const { mutate: uploadIdCard, isPending: isIdCardUploading } =
    useUploadFileToS3Mutation({
      options: {
        onSuccess: (data) => {
          setUploadedFileUrl(`${data.url}/${data?.fields?.key}`)
          setValue('identityCard', `${data?.fields?.key}`)
        },
        onError: (error) => {
          console.error('파일 업로드 실패:', error)
        },
      },
    })
  const {
    mutate: accountVerifyMutation,
    isPending: isAccountVerifyMutationLoading,
  } = useAccountVerifyCreateMutation({
    options: {
      onSuccess: (data) => {
        // setValue('accountHolderSsn', true)
        console.log('ownerNameSearch', data)
        setIsBankAccountVerified(true)
      },
      onError: (error) => {
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

  const handleUploadIdCard = (file: File) => {
    uploadIdCard({
      file,
      fieldChoice: 'loan.Loan.identity_card',
    })
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleUploadIdCard(file)
    }
  }

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click()
  }
  console.log('errors', errors)

  const { mutate: loanCreateMutation } = useLoanCreateMutation({
    options: {
      onSuccess: (data) => {
        console.log('loanCreateMutation', data)
      },
      onError: (error) => {
        console.error('loanCreateMutation', error)
      },
    },
  })
  const { identityVerificationToken } = useSessionStorage()

  const { type } = router.query
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

  const onStep4Submit = (data: any) => {
    const requestData = {
      kind: typeConvert(type as string) || 'A',
      identityVerificationToken: identityVerificationToken,
      incomeCertificate: '',
      residentRegistrationCopy: '',
      healthInsuranceEligibilityConfirmation: '',
      healthInsurancePaymentConfirmation: '',
      healthInsurancePaymentConfirmation2: '',
      fileSet: {
        name: 'bb',
        path: 'bb',
      },
      safeKey: 'bbb',
      accountHolder: 'bb',
      accountHolderSsn: 'bb',
      ...data,
    }
    loanCreateMutation({
      data: requestData,
    }) // TODO: API 호출 및 성공 시 formvalues 초기화 및 성공 페이지로 이동
    // router.push('/apply-loan-complete')
  }

  const onStep4Error = (errors: any) => {
    console.log('Step4 폼 에러:', errors)
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

  // 대출신청 버튼 클릭 핸들러 (handleSubmit 사용)
  const handleSubmitClick = handleSubmit(onStep4Submit, onStep4Error)

  const handleCompanySelect = (company: Company) => {
    setValue('companyName', company.name)
    setValue('companyBusinessNumber', company.businessNo)
    setValue('baseAddress', company.baseAddress)
    setValue('detailAddress', company.detailAddress || '')
  }

  const handleAddressModalOpen = (type: 'normal' | 'real-estate') => {
    setAddressModalType(type)
    onAddressModalOpen()
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedText = e.clipboardData.getData('text')
    const numbersOnly = pastedText.replace(/[^0-9]/g, '')

    const target = e.target as HTMLInputElement
    const fieldName = target.name

    if (fieldName && numbersOnly) {
      let value = parseInt(numbersOnly) || 0

      // 대출 기간 필드의 경우 1~60 범위로 제한
      if (fieldName === 'loanPeriod') {
        value = Math.min(Math.max(value, 1), 60)
      }

      setValue(fieldName, value)
    }
  }

  const handleLoanPeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0
    const clampedValue = Math.min(Math.max(value, 0), 60)

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
        bank: '0088',
        // || bankWatchValue,
        number: '110220577207',
        // || accountNumberWatchValue,
        birth: '880814',
      },
    })
  }
  const handleUntactDocumentApplyModalOpen = () => {
    onUntactDocumentApplyModalOpen()
  }

  return (
    <Container>
      <UntactDocumentApplyModal
        isOpen={isUntactDocumentApplyModalOpen}
        onClose={onUntactDocumentApplyModalClose}
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
          <>
            <InputGroup>
              <Input
                placeholder="0"
                type="number"
                onPaste={handlePaste}
                textAlign="right"
                pr="50px"
                {...register('loanAmount', {
                  valueAsNumber: true,
                })}
                data-field="loanAmount"
              />
              <InputRightElement>
                <Text>만원</Text>
              </InputRightElement>
            </InputGroup>
            <Flex gap={'8px'} flexWrap={'wrap'}>
              <Button
                variant={
                  loanAmount === 300 ? 'outline-primary' : 'outline-secondary'
                }
                onClick={() => handleLoanAmountSelect('300')}
              >
                300
              </Button>
              <Button
                variant={
                  loanAmount === 600 ? 'outline-primary' : 'outline-secondary'
                }
                onClick={() => handleLoanAmountSelect('600')}
              >
                600
              </Button>
              <Button
                variant={
                  loanAmount === 900 ? 'outline-primary' : 'outline-secondary'
                }
                onClick={() => handleLoanAmountSelect('900')}
              >
                900
              </Button>
              <Button
                variant={
                  loanAmount === 1200 ? 'outline-primary' : 'outline-secondary'
                }
                onClick={() => handleLoanAmountSelect('1200')}
              >
                1200
              </Button>
              <Button
                variant={
                  loanAmount === 1500 ? 'outline-primary' : 'outline-secondary'
                }
                onClick={() => handleLoanAmountSelect('1500')}
              >
                1500
              </Button>
            </Flex>
          </>
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
        <InputForm label="대출기간">
          <VStack alignItems={'flex-start'} spacing={'8px'} w={'100%'}>
            <InputGroup>
              <Input
                placeholder="0"
                type="number"
                min={0}
                max={60}
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
            <Flex gap={'8px'} flexWrap={'wrap'}>
              <Button
                variant={
                  loanPeriod === 6 ? 'outline-primary' : 'outline-secondary'
                }
                onClick={() => handleLoanPeriodSelect('6개월')}
              >
                6개월
              </Button>
              <Button
                variant={
                  loanPeriod === 12 ? 'outline-primary' : 'outline-secondary'
                }
                onClick={() => handleLoanPeriodSelect('12개월')}
              >
                12개월
              </Button>
              <Button
                variant={
                  loanPeriod === 24 ? 'outline-primary' : 'outline-secondary'
                }
                onClick={() => handleLoanPeriodSelect('24개월')}
              >
                24개월
              </Button>
              <Button
                variant={
                  loanPeriod === 36 ? 'outline-primary' : 'outline-secondary'
                }
                onClick={() => handleLoanPeriodSelect('36개월')}
              >
                36개월
              </Button>
            </Flex>
          </VStack>
          {errors?.loanPeriod && (
            <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
              {errors?.loanPeriod?.message as string}
            </Text>
          )}
        </InputForm>
        <Flex gap={'16px'}>
          <InputForm label="입금은행">
            <Box w={'100%'}>
              <Controller
                name="bank"
                control={control}
                render={({ field }) => (
                  <CommonSelect
                    options={BANK_DATA}
                    placeholder="선택"
                    value={BANK_DATA.find(
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
              placeholder="계좌번호"
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
            disabled={isAccountVerifyMutationLoading || isBankAccountVerified}
            w={'209px'}
            onClick={handleOwnerNameSearch}
          >
            {isBankAccountVerified ? '예금주 실명조회 완료' : '예금주 실명조회'}
          </Button>
          {isBankAccountVerified && (
            <Text textStyle={'pre-body-6'} color={'grey.8'}>
              예금주 실명조회가 완료됐어요
            </Text>
          )}
        </InputForm>
        <Box w={'100%'} h={'1px'} bg={'border.basic.1'} my={'48px'} />
        <Text textStyle={'pre-heading-3'} color={'primary.4'}>
          직장 정보
        </Text>
        <Flex gap={'16px'}>
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
                variant={'solid-primary'}
                size={'lg'}
                onClick={onOfficeAddressModalOpen}
              >
                직장명 검색
              </Button>
            </Flex>
            {errors?.companyName && (
              <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
                {errors?.companyName?.message as string}
              </Text>
            )}
          </InputForm>
        </Flex>
        {companyBusinessNumber && (
          <InputForm label="직장 사업자등록번호">
            <Input
              placeholder="직장 사업자등록번호"
              // onPaste={handlePaste}
              {...register('companyBusinessNumber')}
              readOnly
              data-field="companyBusinessNumber"
            />
            {errors?.companyBusinessNumber && (
              <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
                {errors?.companyBusinessNumber?.message as string}
              </Text>
            )}
          </InputForm>
        )}
        <InputForm isRequired label="주소">
          <VStack w={'100%'} gap={'8px'} alignItems={'stretch'}>
            <Input
              placeholder="기본주소"
              w={'100%'}
              value={baseAddress || ''}
              readOnly
              data-field="baseAddress"
            />
          </VStack>
          {errors?.baseAddress && (
            <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
              {errors?.baseAddress?.message as string}
            </Text>
          )}
        </InputForm>
        <InputForm label="고용구분">
          <EmploymentTypeButtons />
        </InputForm>
        <InputForm label="입사년월 또는 창업시기">
          <Flex gap={'16px'}>
            <InputGroup>
              <Input
                placeholder="YYYY"
                type="number"
                onPaste={handlePaste}
                textAlign="right"
                pr="40px"
                {...register('hireYear', {
                  valueAsNumber: true,
                })}
                data-field="hireYear"
              />
              <InputRightElement>
                <Text>년</Text>
              </InputRightElement>
            </InputGroup>
            <InputGroup>
              <Input
                placeholder="MM"
                type="number"
                onPaste={handlePaste}
                textAlign="right"
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
          </Flex>
          {errors?.hireYear && (
            <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
              {errors?.hireYear?.message as string}
            </Text>
          )}
          {errors?.hireMonth && (
            <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
              {errors?.hireMonth?.message as string}
            </Text>
          )}
        </InputForm>

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
          {errors?.detailAddress && (
            <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
              {errors?.detailAddress?.message as string}
            </Text>
          )}
        </InputForm>

        <InputForm label="주거종류">
          <Flex flexWrap={'wrap'} gap={'8px'}>
            <Button
              variant={
                housingType === 'APARTMENT' ? 'outline-primary' : (
                  'outline-secondary'
                )
              }
              w={'209px'}
              onClick={() => handleHousingTypeSelect('APARTMENT')}
            >
              아파트/주상복합
            </Button>
            <Button
              variant={
                housingType === 'MULTI_FAMILY' ? 'outline-primary' : (
                  'outline-secondary'
                )
              }
              w={'209px'}
              onClick={() => handleHousingTypeSelect('MULTI_FAMILY')}
            >
              연립/다세대/다가구
            </Button>
            <Button
              variant={
                housingType === 'OTHER' ? 'outline-primary' : (
                  'outline-secondary'
                )
              }
              w={'209px'}
              onClick={() => handleHousingTypeSelect('OTHER')}
            >
              그 외
            </Button>
          </Flex>
          {errors?.housingType && (
            <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
              {errors?.housingType?.message as string}
            </Text>
          )}
        </InputForm>
        <InputForm label="주거소유형태">
          <Flex flexWrap={'wrap'} gap={'8px'}>
            <Button
              variant={
                residenceType === 'OWNED' ? 'outline-primary' : (
                  'outline-secondary'
                )
              }
              w={'209px'}
              onClick={() => handleResidenceTypeSelect('OWNED')}
            >
              자가
            </Button>
            <Button
              variant={
                residenceType === 'JEONSE' ? 'outline-primary' : (
                  'outline-secondary'
                )
              }
              w={'209px'}
              onClick={() => handleResidenceTypeSelect('JEONSE')}
            >
              전세
            </Button>
            <Button
              variant={
                residenceType === 'MONTHLY_RENT' ? 'outline-primary' : (
                  'outline-secondary'
                )
              }
              w={'209px'}
              onClick={() => handleResidenceTypeSelect('MONTHLY_RENT')}
            >
              월세
            </Button>
          </Flex>
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

        <InputForm label="부동산 정보">
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
            />
          </VStack>
          {errors?.assetBaseAddress && (
            <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
              {errors?.assetBaseAddress?.message as string}
            </Text>
          )}
          {errors?.assetDetailAddress && (
            <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
              {errors?.assetDetailAddress?.message as string}
            </Text>
          )}
        </InputForm>
        <InputForm label="비대면 서류제출">
          <Button
            textStyle={'pre-body-5'}
            w={'209px'}
            isDisabled={isDocumentSubmissionCompleted}
            onClick={handleUntactDocumentApplyModalOpen}
          >
            {isDocumentSubmissionCompleted ? '서류제출완료' : '비대면 서류제출'}
          </Button>
          {isDocumentSubmissionCompleted && (
            <Text textStyle={'pre-body-6'} color={'grey.8'}>
              비대면 서류제출이 완료됐어요.
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
          <Text textStyle={'pre-body-6'} color={'grey.8'}>
            서버 점검 등 사유로 인해 비대면 서류 제출을 진행하지 않을 수
            있습니다.
            <br />
            추후 대출 현황 조회에서 서류를 업데이트 부탁드립니다.
          </Text>
        </VStack>
        <InputForm label="추가 서류 제출" isOptional w={'100%'}>
          <Flex
            justifyContent={'center'}
            alignItems={'center'}
            p={'20px 16px'}
            w={'100%'}
            bg={'background.basic.2'}
            gap={'16px'}
          >
            <Flex
              justifyContent={'center'}
              alignItems={'center'}
              border={'1px solid'}
              borderColor={'border.basic.1'}
              borderRadius={'50%'}
              w={'60px'}
              h={'60px'}
            >
              <FolderIcon boxSize={'32px'} />
            </Flex>
            <Text textStyle={'pre-body-6'} color={'grey.8'}>
              추가할 서류가 있다면
              <br />
              <Box as="span" color={'primary.4'}>
                업로드
              </Box>
              해 주세요.
            </Text>
          </Flex>
        </InputForm>
        {router.query.type === 'mortgage' && (
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
            <Text textStyle={'pre-body-68'} color={'grey.8'}>
              신규로 부동산을 매입하시려는 경우 매매계약서 사본을 제출해주시면
              보다 빠른 대출 심사가 가능합니다.
            </Text>
            <Text textStyle={'pre-body-68'} color={'grey.8'}>
              (매매계약서 제출 시 매도인 및 매수인 등의 주민등록번호 뒷자리는 꼭
              가려 주셔야 하며, 만약 가리지 않고 업로드하실 경우 보안 정책에
              따라 해당 자료는 파기됩니다.)
            </Text>
          </VStack>
        )}
        <Box w={'100%'} h={'1px'} bg={'border.basic.1'} my={'48px'} />
        <Text textStyle={'pre-heading-3'} color={'primary.4'}>
          신분증 업로드
        </Text>

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
            고객님의 소중한 개인정보 보호를 위해,{' '}
            <Box as="span" color={'accent.red2'}>
              신분증 촬영 시 주민등록번호 뒤 6자리는 꼭 가려 주세요.
            </Box>
            <br />
            만약 가리지 않고 업로드하실 경우, 보안 정책에 따라 이미지가 파기되며
            대출 신청이 정상적으로 진행되지 않을 수 있습니다. <br /> 또한,
            정상적인 대출 진행을 위해 마스킹 처리된 신분증 사본의 재제출을
            요청드릴 수 있습니다.
          </Text>
          <Flex
            justifyContent={'center'}
            alignItems={'center'}
            p={'20px 16px'}
            w={'100%'}
            h={'200px'}
            borderRadius={'20px'}
            bg={'background.basic.2'}
          >
            <Input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              display="none"
            />
            {uploadedFileUrl ?
              <AspectRatio ratio={237 / 145}>
                <ImageAsNext
                  w={'100%'}
                  h={'100%'}
                  fill
                  src={uploadedFileUrl ?? '-'}
                  alt="신분증"
                />
              </AspectRatio>
            : <Text textStyle={'pre-body-6'} color={'grey.6'}>
                파일을 선택해주세요
              </Text>
            }
          </Flex>
        </VStack>
        <InputForm label="신분증" isRequired>
          <Button
            variant={'outline-primary'}
            textStyle={'pre-body-5'}
            color={'grey.8'}
            w={'209px'}
            onClick={handleUploadButtonClick}
            isLoading={isIdCardUploading}
            loadingText="업로드 중..."
          >
            신분증 업로드
          </Button>
          {errors?.identityCard && (
            <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
              {errors?.identityCard?.message as string}
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
            onClick={handleSubmitClick}
          >
            대출신청
          </Button>
        </Flex>
      </Flex>
    </Container>
  )
}

export default ApplyLoanStep4
