import { useCallback, useRef, useState } from 'react'

import { useRouter } from 'next/router'

import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react'

import { debounce } from 'lodash'

import InputForm from '@/components/InputForm'
import { useLoanRetrieveQuery } from '@/generated/apis/Loan/Loan.query'
import {
  useLoanPrepaymentCalculateCreateMutation,
  useLoanPrepaymentCreateMutation,
} from '@/generated/apis/Prepayment/Prepayment.query'
import { useSessionStorage } from '@/stores/session/state'
import { handleErrorToast } from '@/utils/error-handler'

function PrepaymentApplication() {
  const router = useRouter()
  const [prepaymentAmount, setPrepaymentAmount] = useState(0)
  const toast = useToast()
  const { set } = useSessionStorage()
  const { data: loanData } = useLoanRetrieveQuery({
    variables: {
      id: Number(router.query.id),
    },
    options: {
      enabled: !!router.query.id,
    },
  })

  const {
    data: prepaymentCalculateData,
    mutate: handlePrepaymentCalculateCreateMutation,
  } = useLoanPrepaymentCalculateCreateMutation({
    options: {
      onSuccess: (data) => {
        // router.replace('/my-loan-status/prepayment/complete')
      },
      onError: (error) => {
        toast(
          handleErrorToast(error, {
            title: '중도상환 계산 실패',
          }),
        )
      },
    },
  })

  const debouncedCalculate = useCallback(
    debounce((amount: number) => {
      if (amount > 0 && router.query.id) {
        handlePrepaymentCalculateCreateMutation({
          loanId: Number(router.query.id),
          data: {
            amount,
          },
        })
      }
    }, 500),
    [router.query.id, handlePrepaymentCalculateCreateMutation],
  )

  const { mutate: handlePrepaymentCreateMutation } =
    useLoanPrepaymentCreateMutation({
      options: {
        onSuccess: (data) => {
          // Session storage에 prepayment 데이터 저장
          set('prepaymentData', {
            loanId: Number(router.query.id),
            totalAmount:
              (prepaymentCalculateData?.amount || 0) +
              (prepaymentCalculateData?.interestAmount || 0) +
              (prepaymentCalculateData?.feeAmount || 0),
          })
          router.replace('/my-loan-status/prepayment/complete')
        },
        onError: (error) => {
          toast(
            handleErrorToast(error, {
              title: '중도상환 신청 실패',
            }),
          )
        },
      },
    })

  const handleRepaymentAmount = () => {
    handlePrepaymentCreateMutation({
      loanId: Number(router.query.id),
      data: {
        amount: prepaymentAmount,
      },
    })
  }

  return (
    <Container>
      <Flex
        pt={{ base: '40px', sm: '48px', md: '80px' }}
        py={{ base: '83px', sm: '155px', md: '120px' }}
        flexDir={'column'}
        gap={'32px'}
      >
        <VStack alignItems={'flex-start'} spacing={'8px'}>
          <Text textStyle={'pre-heading-2'} color={'grey.10'}>
            중도상환 신청
          </Text>
          <Text textStyle={'pre-body-6'} color={'grey.7'}>
            남은 대출금에서 상환할 금액을 신청합니다.
          </Text>
        </VStack>
        <VStack
          p={{ base: '28px 20px', sm: '40px ', md: '40px 64px' }}
          w={'100%'}
          boxShadow={'0 8px 50px 0 rgba(0, 46, 114, 0.10)'}
          borderRadius={'32px'}
          bg={'grey.0'}
          alignItems={'flex-start'}
        >
          <Box
            w={'100%'}
            pb={'10px'}
            borderBottom={'1px solid'}
            borderColor={'border.basic.1'}
            mb={{ base: '28px', sm: '32px' }}
          >
            <Text textStyle={'pre-heading-2'} color={'grey.10'}>
              얼마를 갚을까요?
            </Text>
          </Box>
          <InputForm label={'금액 입력'} isRequired={true}>
            <InputGroup>
              <Input
                placeholder="0"
                type="number"
                textAlign="right"
                pr="50px"
                onChange={(e) => {
                  const value = Number(e.target.value)
                  setPrepaymentAmount(value)
                  debouncedCalculate(value)
                }}
              />
              <InputRightElement>
                <Text>원</Text>
              </InputRightElement>
            </InputGroup>
          </InputForm>
          <HStack mt={'12px'} w={'100%'} justifyContent={'space-between'}>
            <VStack
              alignItems={'flex-start'}
              justifyContent={'center'}
              gap={'0px'}
            >
              <Text textStyle={'pre-caption-2'} color={'grey.7'}>
                남은 대출금
              </Text>
              <Text textStyle={'pre-heading-2'} color={'grey.10'}>
                <Box as={'span'} color={'primary.3'}>
                  {loanData?.contract?.remainingAmount?.toLocaleString() || 0}
                </Box>
                원
              </Text>
            </VStack>
            <Button
              variant={'text-primary'}
              onClick={() => {
                const remainingAmount = loanData?.contract?.remainingAmount || 0
                setPrepaymentAmount(remainingAmount)
                debouncedCalculate(remainingAmount)
              }}
            >
              <Text textStyle={'pre-body-7'} color={'grey.8'}>
                전액 입력
              </Text>
            </Button>
          </HStack>
          <Flex
            mt={'20px'}
            mb={{ base: '28px', sm: '32px', md: '40px' }}
            p={'20px 32px'}
            w={'100%'}
            borderRadius={'12px'}
            border={'1px solid'}
            borderColor={'border.basic.1'}
            justifyContent={'space-between'}
            flexDir={'row'}
          >
            <VStack alignItems={'flex-start'} spacing={'8px'}>
              <Text textStyle={'pre-body-68'} color={'grey.7'}>
                원금
              </Text>
              <Text textStyle={'pre-body-68'} color={'grey.7'}>
                이자
              </Text>
              <Text textStyle={'pre-body-68'} color={'grey.7'}>
                중도상환 수수료
              </Text>
            </VStack>
            <VStack alignItems={'flex-end'} spacing={'8px'}>
              <Text textStyle={'pre-body-68'} color={'grey.7'}>
                {prepaymentCalculateData?.amount?.toLocaleString() || 0}원
              </Text>
              <Text textStyle={'pre-body-68'} color={'grey.7'}>
                {prepaymentCalculateData?.interestAmount?.toLocaleString() || 0}
                원
              </Text>
              <Text textStyle={'pre-body-68'} color={'grey.7'}>
                {prepaymentCalculateData?.feeAmount?.toLocaleString() || 0}원
              </Text>
            </VStack>
          </Flex>
          <Flex w={'100%'} justifyContent={'center'}>
            <Button variant={'solid-primary'} onClick={handleRepaymentAmount}>
              다음
            </Button>
          </Flex>
        </VStack>
      </Flex>
    </Container>
  )
}
export default PrepaymentApplication
