import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { Center, Spinner } from '@chakra-ui/react'

import { FormProvider } from 'react-hook-form'

import ApplyLoanProcess from './components/apply-loan-process'
import ApplyLoanStep1 from './components/apply-loan-step1'
import ApplyLoanStep2 from './components/apply-loan-step2'
import ApplyLoanStep3 from './components/apply-loan-step3'
import ApplyLoanStep4 from './components/apply-loan-step4'
import { useApplyLoanForm } from './hooks/useApplyLoanForms'

function ApplyLoan() {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const { step, type } = router.query
  const methods = useApplyLoanForm()

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
