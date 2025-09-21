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
import { LoanRequestType } from '@/generated/apis/@types/data-contracts'
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

function ApplyLoan() {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const { step, type } = router.query
  const methods = useForm<LoanRequestType>()

  // type query는 현재 화면 렌더링에 영향을 주지 않음
  // step query에 따라 화면이 결정됨
  console.log('Current step:', step, 'Current type:', type)

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
      {/* type query와 관계없이 step에 따라 화면이 결정됨 */}
      {(step === '1' || step === undefined) && <ApplyLoanStep1 />}
      {step === '2' && <ApplyLoanStep2 />}
      {step === '3' && <ApplyLoanStep3 />}
      {step === '4' && <ApplyLoanStep4 />}
    </FormProvider>
  )
}
export default ApplyLoan
