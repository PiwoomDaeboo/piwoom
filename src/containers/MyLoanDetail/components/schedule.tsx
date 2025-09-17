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

import { CaretLeftIcon } from '@/generated/icons/MyIcons'

import {
  BUTTON_DATA,
  CARD_DATA,
  LoanDetailApiData,
  SAMPLE_LOAN_DATA,
  getFormattedDetailData,
} from '../consts'

export default function Schedule() {
  const router = useRouter()

  const detailData = getFormattedDetailData(SAMPLE_LOAN_DATA)

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

        {/* 동적으로 생성되는 상세 정보 */}
        <Flex w={'100%'} flexDir={'column'} mt={'32px'} gap={'16px'}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Flex
              key={index}
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
                <Text minW={'60px'} textStyle={'pre-body-4'} color={'grey.10'}>
                  {index + 1}회차
                </Text>
                <VStack alignItems={'flex-start'}>
                  <Text textStyle={'pre-caption-2'} color={'primary.3'}>
                    이자
                  </Text>
                  <Text
                    textStyle={'pre-body-3'}
                    color={'grey.10'}
                    textAlign={'right'}
                  >
                    589,000원
                  </Text>
                </VStack>
              </Flex>
              <Text textStyle={'pre-body-6'} color={'grey.7'}>
                2025.12.12
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
}
