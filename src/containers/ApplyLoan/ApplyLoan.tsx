import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'

import { FormProvider, useForm } from 'react-hook-form'

import LoanTermsModal from '@/components/@Modal/LoanTermsModal'
import ModalBasis from '@/components/@Modal/ModalBasis'
import { Pagination } from '@/components/pagination'
import { useFaqListQuery } from '@/generated/apis/Faq/Faq.query'
import {
  CaretDownIcon,
  CaretRightIcon,
  MagnifyingGlassIcon,
} from '@/generated/icons/MyIcons'

import ApplyLoanProcess from './components/apply-loan-process'
import ApplyLoanStep1 from './components/apply-loan-step1'
import ApplyLoanStep2 from './components/apply-loan-step2'
import ApplyLoanStep3 from './components/apply-loan-step3'
import ApplyLoanStep4 from './components/apply-loan-step4'

const CHECKBOX_STYLES = {
  '.chakra-checkbox__control': {
    borderRadius: '50%',
    border: '1px solid',
    borderColor: 'border.basic.1',
    _checked: {
      bg: 'primary.3',
      borderColor: 'primary.3',
      borderRadius: '50%',
    },
  },
  '.chakra-checkbox__control[data-checked]': {
    bg: 'primary.3',
    borderColor: 'primary.3',
    borderRadius: '50%',
  },
}

const AGREEMENT_ITEMS = [
  {
    key: 'privacy',
    label: '개인(신용)정보 조회 동의',
  },
  {
    key: 'collection',
    label: '개인(신용)정보 수집 · 이용 동의',
  },
  {
    key: 'provision',
    label: '개인(신용)정보 제공 동의서',
  },
]

// 확인사항 데이터
const CONFIRMATION_ITEMS = [
  {
    key: 'question1',
    question:
      '금융회사 직원이라는 사람으로부터 전화나 문자를 받아 대출 신청을 진행하고 계시나요?',
  },
  {
    key: 'question2',
    question:
      '신용등급 상향, 대출보증비 등의 수수료라며 돈을 먼저 입금하라고 요청받으셨습니까?',
  },
  {
    key: 'question3',
    question:
      '고금리 대출을 받고, 상환하면 저금리로 대출이 가능하다는 이야기를 들었습니까?',
  },
  {
    key: 'question4',
    question:
      '개인회생이나 신용회복위원회를 통한 채무조정을 진행하고 있으신가요?',
  },
  {
    key: 'question5',
    question: '햇살론 등 저금리의 서민지원대출로 바꿔준다는 제안을 받으셨나요?',
  },
]

function ApplyLoan() {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const { step } = router.query
  const methods = useForm<any>({
    defaultValues: {
      agreements: {
        all: false,
        privacy: false,
        collection: false,
        provision: false,
      },
      confirmations: {
        question1: null,
        question2: null,
        question3: null,
        question4: null,
        question5: null,
      },
      basicInfo: {
        name: '',
        residentNumber: '',
        phoneNumber: '',
        email: '',
        isPhoneCertified: false,
      },
      suitability: {
        loanPurpose: '',
        totalAssets: '',
        annualIncome: '',
        monthlyIncome: 0,
        monthlyExpenses: 0,
        debtAmount: '',
        repaymentMethod: '',
        creditScore: '',
        loanPurposeAndPlan: '',
      },
      loanApplication: {
        electronicDocumentConsent: false,
        loanAmount: 0,
        repaymentType: '',
        interestPaymentDate: '',
        loanPeriod: 0,
        depositBank: '',
        accountNumber: '',
        accountHolderName: '',
        jobType: '',
        companyName: '',
        employmentType: '',
        employmentStartDate: '',
        address: '',
        residenceType: '',
        residenceStatus: '',
        realEstateInfo: '',
        additionalDocuments: [],
        idCard: null,
      },
    },
    mode: 'onChange',
  })
  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [step])
  if (isLoading) {
    return (
      <Center h={'100vh'}>
        <Spinner />
      </Center>
    )
  }
  return (
    <FormProvider {...methods}>
      <ApplyLoanProcess step={(step as string) || '1'} />
      {step === undefined && <ApplyLoanStep1 />}
      {step === '2' && <ApplyLoanStep2 />}
      {step === '3' && <ApplyLoanStep3 />}
      {step === '4' && <ApplyLoanStep4 />}
    </FormProvider>
  )
}
export default ApplyLoan
