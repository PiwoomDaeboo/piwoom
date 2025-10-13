import { useEffect, useMemo, useState } from 'react'

import { useRouter } from 'next/router'

import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  SimpleGrid,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'

import LoanDelayModal from '@/components/@Modal/loan-delay-modal'
import { Pagination } from '@/components/pagination'
import { LOAN_STATUS } from '@/constants/loan'
import {
  LoanType,
  PaginatedLoanListType,
} from '@/generated/apis/@types/data-contracts'
import { CaretRightIcon } from '@/generated/icons/MyIcons'

interface MyLoanListProps {
  loanList: LoanType[]
}

export default function MyLoanList({ loanList }: MyLoanListProps) {
  const router = useRouter()
  const {
    isOpen: isLoanDelayOpen,
    onClose: onLoanDelayClose,
    onOpen: onDelayOpen,
  } = useDisclosure()
  const getBadgeStyle = (status: string) => {
    switch (status) {
      case 'UNDER_REVIEW':
        return { color: 'accent.blue2', bg: 'accent.blue1' }
      case 'CONTRACTING':
        return { color: 'accent.pink2', bg: 'accent.pink1' }
      case 'IN_PROGRESS':
        return { color: 'accent.yellow2', bg: 'accent.yellow1' }
      case 'OVERDUE':
        return { color: 'accent.red2', bg: 'accent.red1' }
      case 'EARLY_REPAYMENT_COMPLETED':
        return { color: 'accent.green2', bg: 'accent.green1' }
      case 'MATURITY_REPAYMENT_COMPLETED':
        return { color: 'accent.violet2', bg: 'accent.violet1' }
      case 'REJECTED':
        return { color: 'grey.7', bg: 'grey.2' }
    }
  }

  const handleRepayment = (status: string, id: number) => {
    if (status === 'OVERDUE') {
      onDelayOpen()
    } else {
      router.push(`/my-loan-status/repayment/${id}`)
    }
  }

  return (
    <>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={'20px'}>
        <LoanDelayModal isOpen={isLoanDelayOpen} onClose={onLoanDelayClose} />
        {loanList?.map((item, index: number) => (
          <Flex
            key={index}
            flexDirection={'column'}
            p={'24px 32px'}
            borderRadius={'32px'}
            boxShadow={'0 8px 50px 0 rgba(0, 46, 114, 0.10)'}
          >
            <HStack
              w={'100%'}
              justifyContent={'space-between'}
              alignItems={'flex-start'}
            >
              <VStack alignItems={'flex-start'}>
                <Badge
                  variant={'subtle_primary'}
                  style={getBadgeStyle(item.status)}
                >
                  {
                    LOAN_STATUS.find((status) => status.value === item.status)
                      ?.label
                  }
                </Badge>
                <Text>
                  계약번호{' '}
                  <Box as="span" ml={'8px'} color={'primary.4'}>
                    {item.no}
                  </Box>
                </Text>
              </VStack>
              <Flex
                justifyContent={'center'}
                alignItems={'center'}
                w={'40px'}
                h={'40px'}
                borderRadius={'50%'}
                border={'1px solid'}
                borderColor={'primary.4'}
                cursor={'pointer'}
                onClick={() => router.push(`/my-loan-status/${item?.id}`)}
              >
                <CaretRightIcon boxSize={'24px'} color={'primary.4'} />
              </Flex>
            </HStack>
            <Flex flexDirection={'column'} w={'100%'} gap={'6px'} mt={'20px'}>
              <HStack justifyContent={'space-between'}>
                <Text textStyle={'pre-body-6'} color={'grey.10'}>
                  대출 금액
                </Text>
                <Text textStyle={'pre-body-5'} color={'grey.10'}>
                  {item?.loanAmount?.toLocaleString()}원
                </Text>
              </HStack>
              <HStack justifyContent={'space-between'}>
                <Text textStyle={'pre-body-6'} color={'grey.10'}>
                  대출 갚는날
                </Text>
                <Text textStyle={'pre-body-5'} color={'grey.10'}>
                  2025년 9월 25일
                </Text>
              </HStack>
              <HStack justifyContent={'space-between'}>
                <Text textStyle={'pre-body-6'} color={'grey.10'}>
                  대출 갚을 금액
                </Text>
                <Text textStyle={'pre-body-5'} color={'grey.10'}>
                  100,000원
                </Text>
              </HStack>
            </Flex>

            <SimpleGrid
              // visibility={'hidden'}
              visibility={'visible'}
              columns={2}
              gap={'8px'}
              mt={'20px'}
            >
              <Button
                variant={'outline-secondary'}
                onClick={() => {
                  router.push(`/my-loan-status/${item?.id}?detailMenu=schedule`)
                }}
              >
                <Text textStyle={'pre-body-7'} color={'grey.8'}>
                  상환 스케줄 확인하기
                </Text>
              </Button>
              <Button
                variant={'outline-secondary'}
                onClick={() => {
                  handleRepayment(item?.status, item?.id)
                }}
              >
                <Text textStyle={'pre-body-7'} color={'grey.8'}>
                  중도 상환 신청하기
                </Text>
              </Button>
              <Button variant={'outline-secondary'}>
                <Text textStyle={'pre-body-7'} color={'grey.8'}>
                  계약서 다운로드
                </Text>
              </Button>
              <Button
                variant={'outline-secondary'}
                onClick={() => {
                  window.open('http://pf.kakao.com/_xkxoben/chat', '_blank')
                }}
              >
                <Text textStyle={'pre-body-7'} color={'grey.8'}>
                  기타서류 발급 요청하기
                </Text>
              </Button>
            </SimpleGrid>
            <Button
              mt={'10px'}
              variant={'outline-secondary'}
              w={'100%'}
              onClick={() => {
                router.push(`/my-loan-status/${item?.id}?detailMenu=document`)
              }}
            >
              <Text textStyle={'pre-body-7'} color={'grey.8'}>
                추가서류 제출
              </Text>
            </Button>
          </Flex>
        ))}
      </SimpleGrid>
    </>
  )
}
