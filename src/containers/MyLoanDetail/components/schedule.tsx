import { useCallback, useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'

import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  Skeleton,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'

import { REPAYMENT_TYPE } from '@/constants/loan'
import { useLoanRetrieveQuery } from '@/generated/apis/Loan/Loan.query'
import { useLoanScheduleListQuery } from '@/generated/apis/Schedule/Schedule.query'
import { CaretLeftIcon } from '@/generated/icons/MyIcons'

export default function Schedule() {
  const router = useRouter()

  const { data: scheduleData, isLoading } = useLoanScheduleListQuery({
    variables: {
      loanId: Number(router.query.id),
    },
    options: {
      enabled: !!router.query.id,
    },
  })
  const { data: loanRetrieveData } = useLoanRetrieveQuery({
    variables: {
      id: Number(router.query.id),
    },
    options: {
      enabled: !!router.query.id && !isLoading,
    },
  })

  const repaymentType = loanRetrieveData?.contract?.repaymentType
  if (isLoading) {
    return (
      <Center h={'100vh'}>
        <Spinner />
      </Center>
    )
  }

  return (
    <Flex flexDir={'column'} w={'100%'}>
      <Flex
        w={'100%'}
        borderRadius={'32px'}
        boxShadow={'0 8px 50px 0 rgba(0, 46, 114, 0.10)'}
        p={{ base: '20px 28px', sm: '20px 48px', md: '40px 64px' }}
        bg={'grey.0'}
        flexDir={'column'}
        justifyContent={'center'}
        alignItems={'flex-start'}
      >
        <HStack
          pb={'20px'}
          borderBottom={'1px solid'}
          borderColor={'border.basic.1'}
          w={'100%'}
          justifyContent={'space-between'}
        >
          <VStack w={'100%'} alignItems={'flex-start'}>
            <Flex alignItems={'center'} gap={'8px'}>
              <Button
                variant={'none'}
                p={'8px'}
                onClick={() => router.push('/my-loan-status')}
              >
                <CaretLeftIcon boxSize={'24px'} />
              </Button>
              <Text textStyle={'pre-heading-2'} color={'grey.10'}>
                상환 스케줄
              </Text>
            </Flex>
            <Text textStyle={'pre-body-6'} color={'grey.7'}>
              선납, 중도상환, 금리 변경 등에 따라 보여지는 금액과 다를 수
              있어요.
            </Text>
          </VStack>
        </HStack>

        <Box w={'100%'} mt={'32px'}>
          <VStack gap={'16px'} alignItems={'stretch'}>
            {scheduleData?.map((item, index) => (
              <Flex
                key={item.repaymentDate}
                w={'100%'}
                justifyContent={'space-between'}
                alignItems={{ base: 'flex-end', sm: 'center' }}
                borderRadius={'12px'}
                bg={'background.basic.2'}
                p={{ base: '16px 20px', sm: '14.5px 24px', md: '14.5px 40px' }}
              >
                <Flex
                  flexDir={{ base: 'column', sm: 'row' }}
                  gap={{ base: '10px', sm: '80px' }}
                  alignItems={{ base: 'flex-start', sm: 'center' }}
                >
                  <Text
                    minW={'60px'}
                    textStyle={'pre-body-4'}
                    color={'grey.10'}
                  >
                    {item.month || 0}회차
                  </Text>
                  <Flex flexDir={'column'} alignItems={'flex-start'}>
                    <Text textStyle={'pre-caption-2'} color={'primary.3'}>
                      {repaymentType === 'EQUAL_INSTALLMENT' ?
                        '원리금'
                      : index === (scheduleData?.length || 0) - 1 ?
                        '원금 및 이자'
                      : '이자'}
                    </Text>
                    <Text
                      textStyle={'pre-body-3'}
                      color={'grey.10'}
                      textAlign={'right'}
                    >
                      {item?.monthlyAmount?.toLocaleString() || 0}원
                    </Text>
                  </Flex>
                </Flex>
                <Text textStyle={'pre-body-6'} color={'grey.7'}>
                  {item.repaymentDate || '-'}
                </Text>
              </Flex>
            ))}
          </VStack>
        </Box>
      </Flex>
    </Flex>
  )
}
