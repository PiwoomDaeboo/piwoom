import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react'

import { LOAN_STATUS } from '@/constants/loan'
import { useLoanRetrieveQuery } from '@/generated/apis/Loan/Loan.query'
import { CaretLeftIcon } from '@/generated/icons/MyIcons'

import { SAMPLE_LOAN_DATA, getFormattedDetailData } from '../consts'

export default function Detail() {
  const router = useRouter()

  const detailData = getFormattedDetailData(SAMPLE_LOAN_DATA)

  const { data: loanRetrieveData } = useLoanRetrieveQuery({
    variables: {
      id: Number(router.query.id),
    },
    options: {
      enabled: !!router.query.id,
    },
  })
  console.log(loanRetrieveData)
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
                상세정보
              </Text>
            </Flex>
            <Flex justifyContent={'space-between'} w={'100%'}>
              <HStack spacing={'8px'}>
                <Text textStyle={'pre-body-4'} color={'grey.10'}>
                  계약번호
                </Text>
                <Text textStyle={'pre-heading-3'} color={'primary.3'}>
                  {loanRetrieveData?.no || '-'}
                </Text>
              </HStack>
              <Badge variant={'subtle_primary'}>
                {LOAN_STATUS.find(
                  (status) => status.value === loanRetrieveData?.status,
                )?.label || '-'}
              </Badge>
            </Flex>
          </VStack>
        </HStack>

        {/* 동적으로 생성되는 상세 정보 */}
        <Flex w={'100%'} flexDir={'column'} mt={'24px'} gap={'16px'}>
          {detailData.map((item, index) => (
            <HStack
              key={index}
              w={'100%'}
              alignItems={'flex-start'}
              justifyContent={'space-between'}
              pb={'10px'}
            >
              <Text flexShrink={0} textStyle={'pre-body-4'} color={'grey.10'}>
                {item.title}
              </Text>
              <Text
                textStyle={'pre-body-3'}
                color={'grey.10'}
                textAlign={'right'}
                whiteSpace={'pre-line'}
                alignSelf={'flex-end'}
              >
                {item.value}
              </Text>
            </HStack>
          ))}
          <HStack
            w={'100%'}
            alignItems={'flex-start'}
            justifyContent={'space-between'}
            pb={'10px'}
          >
            <Text flexShrink={0} textStyle={'pre-body-4'} color={'grey.10'}>
              특약사항
            </Text>
            <Text
              textStyle={'pre-body-3'}
              color={'grey.10'}
              textAlign={'right'}
              whiteSpace={'pre-line'}
              alignSelf={'flex-end'}
              maxW={{ base: '60%', sm: '70%' }}
            >
              특약사항에 기재된 내용은 띄어쓰기 포함 250자까지 노출되며,250자를
              초과할 경우 하단에 계약서로 확인하라는 문구 추가
            </Text>
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  )
}
