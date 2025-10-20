import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { Center, Spinner, useDisclosure } from '@chakra-ui/react'

import SessionExpiredModal from '@/components/@Modal/session-expired-modal'
import { useAuth } from '@/hooks/useAuth'
import { useIdleTimer } from '@/hooks/useIdleTimer'

import MyLoanProcess from './components/my-loan-process'
import MyLoanStep1 from './components/my-loan-step1'
import MyLoanStep2 from './components/my-loan-step2'
import MyLoanStep3 from './components/my-loan-step3'
import MyLoanStep4 from './components/my-loan-step4'

function MyLoan() {
  const [isLoading, setIsLoading] = useState(false)
  const { isLogin } = useAuth()
  const router = useRouter()
  const { isIdle, setIsIdle } = useIdleTimer({ timeout: 10 * 60 * 1000 }) // 5분 테스트
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { step } = router.query
  useEffect(() => {
    if (isIdle) {
      onOpen()
    }
  }, [isIdle, router])
  console.log('isIdle', isIdle)
  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [step])
  // useEffect(() => {
  //   if (isLogin) {
  //     router.push(`/my-loan?step=2`)
  //   }
  // }, [isLogin])
  if (isLoading) {
    return (
      <Center h={'100vh'}>
        <Spinner />
      </Center>
    )
  }
  return (
    <>
      <SessionExpiredModal
        isOpen={isOpen}
        onClose={onClose}
        setIsIdle={setIsIdle}
        routePath={'/my-loan'}
      />
      <MyLoanProcess step={(step as string) || '1'} />
      {(step === undefined || step === '1') && <MyLoanStep1 />}
      {step === '2' && <MyLoanStep2 />}
      {step === '3' && <MyLoanStep3 />}
      {step === '4' && <MyLoanStep4 />}
    </>
  )
}
export default MyLoan
