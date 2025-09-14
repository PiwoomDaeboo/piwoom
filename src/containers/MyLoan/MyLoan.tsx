import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { Center, Spinner } from '@chakra-ui/react'

import MyLoanProcess from './components/my-loan-process'
import MyLoanStep1 from './components/my-loan-step1'
import MyLoanStep2 from './components/my-loan-step2'
import MyLoanStep3 from './components/my-loan-step3'
import MyLoanStep4 from './components/my-loan-step4'

function MyLoan() {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const { step } = router.query
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
    <>
      <MyLoanProcess step={'4'} />
      {step === undefined && <MyLoanStep1 />}
      {step === '2' && <MyLoanStep2 />}
      {step === '3' && <MyLoanStep3 />}
      {step === '4' && <MyLoanStep4 />}
      <MyLoanStep4 />
    </>
  )
}
export default MyLoan
