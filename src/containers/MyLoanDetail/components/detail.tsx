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

import { LOAN_STATUS, REPAYMENT_TYPE } from '@/constants/loan'
import { useLoanRetrieveQuery } from '@/generated/apis/Loan/Loan.query'
import { CaretLeftIcon } from '@/generated/icons/MyIcons'
import { getBadgeStyle } from '@/utils/style-utils'

import { SAMPLE_LOAN_DATA, getFormattedDetailData } from '../consts'

export default function Detail() {
  const router = useRouter()
  const { data: loanRetrieveData } = useLoanRetrieveQuery({
    variables: {
      id: Number(router.query.id),
    },
    options: {
      enabled: !!router.query.id,
    },
  })

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
              <Badge
                // variant={'subtle_primary'}
                sx={getBadgeStyle(loanRetrieveData?.status || '')}
              >
                {LOAN_STATUS.find(
                  (status) => status.value === loanRetrieveData?.status,
                )?.label || '-'}
              </Badge>
            </Flex>
          </VStack>
        </HStack>

        {/* 동적으로 생성되는 상세 정보 */}
        <Flex w={'100%'} flexDir={'column'} mt={'24px'} gap={'16px'}>
          <HStack
            w={'100%'}
            alignItems={'flex-start'}
            justifyContent={'space-between'}
            pb={'10px'}
          >
            <Text flexShrink={0} textStyle={'pre-body-4'} color={'grey.10'}>
              빌린 금액
            </Text>
            <Text
              textStyle={'pre-body-3'}
              color={'grey.10'}
              textAlign={'right'}
              whiteSpace={'pre-line'}
              alignSelf={'flex-end'}
            >
              {loanRetrieveData?.contract?.amount?.toLocaleString() ||
                loanRetrieveData?.loanAmount?.toLocaleString() ||
                0}
              원
            </Text>
          </HStack>
          <HStack
            w={'100%'}
            alignItems={'flex-start'}
            justifyContent={'space-between'}
            pb={'10px'}
          >
            <Text flexShrink={0} textStyle={'pre-body-4'} color={'grey.10'}>
              대출 잔액
            </Text>
            <Text
              textStyle={'pre-body-3'}
              color={'grey.10'}
              textAlign={'right'}
              whiteSpace={'pre-line'}
              alignSelf={'flex-end'}
            >
              {loanRetrieveData?.contract?.remainingAmount.toLocaleString() ||
                0}
              원
            </Text>
          </HStack>
          <HStack
            w={'100%'}
            alignItems={'flex-start'}
            justifyContent={'space-between'}
            pb={'10px'}
          >
            <Text flexShrink={0} textStyle={'pre-body-4'} color={'grey.10'}>
              금리
            </Text>
            <Text
              textStyle={'pre-body-3'}
              color={'grey.10'}
              textAlign={'right'}
              whiteSpace={'pre-line'}
              alignSelf={'flex-end'}
            >
              연 {loanRetrieveData?.contract?.interestRate || 0}%
            </Text>
          </HStack>
          <HStack
            w={'100%'}
            alignItems={'flex-start'}
            justifyContent={'space-between'}
            pb={'10px'}
          >
            <Text flexShrink={0} textStyle={'pre-body-4'} color={'grey.10'}>
              연체이자율
            </Text>
            <Text
              textStyle={'pre-body-3'}
              color={'grey.10'}
              textAlign={'right'}
              whiteSpace={'pre-line'}
              alignSelf={'flex-end'}
            >
              연 {loanRetrieveData?.contract?.overdueInterestRate || 0}%
            </Text>
          </HStack>
          <HStack
            w={'100%'}
            alignItems={'flex-start'}
            justifyContent={'space-between'}
            pb={'10px'}
          >
            <Text flexShrink={0} textStyle={'pre-body-4'} color={'grey.10'}>
              계약일
            </Text>
            <Text
              textStyle={'pre-body-3'}
              color={'grey.10'}
              textAlign={'right'}
              whiteSpace={'pre-line'}
              alignSelf={'flex-end'}
            >
              {loanRetrieveData?.contract?.loanDate || '-'}
            </Text>
          </HStack>
          <HStack
            w={'100%'}
            alignItems={'flex-start'}
            justifyContent={'space-between'}
            pb={'10px'}
          >
            <Text flexShrink={0} textStyle={'pre-body-4'} color={'grey.10'}>
              만기일
            </Text>
            <Text
              textStyle={'pre-body-3'}
              color={'grey.10'}
              textAlign={'right'}
              whiteSpace={'pre-line'}
              alignSelf={'flex-end'}
            >
              {loanRetrieveData?.contract?.maturityDate || '-'}
            </Text>
          </HStack>
          <HStack
            w={'100%'}
            alignItems={'flex-start'}
            justifyContent={'space-between'}
            pb={'10px'}
          >
            <Text flexShrink={0} textStyle={'pre-body-4'} color={'grey.10'}>
              대출 갚는 날
            </Text>
            <Text
              textStyle={'pre-body-3'}
              color={'grey.10'}
              textAlign={'right'}
              whiteSpace={'pre-line'}
              alignSelf={'flex-end'}
            >
              매월 {loanRetrieveData?.contract?.interestPaymentDate || '-'} 일
            </Text>
          </HStack>
          <HStack
            w={'100%'}
            alignItems={'flex-start'}
            justifyContent={'space-between'}
            pb={'10px'}
          >
            <Text flexShrink={0} textStyle={'pre-body-4'} color={'grey.10'}>
              갚는 방식
            </Text>
            <Text
              textStyle={'pre-body-3'}
              color={'grey.10'}
              textAlign={'right'}
              whiteSpace={'pre-line'}
              alignSelf={'flex-end'}
            >
              {REPAYMENT_TYPE.find(
                (type) =>
                  type.value === loanRetrieveData?.contract?.repaymentType,
              )?.label || '-'}
            </Text>
          </HStack>
          <HStack
            w={'100%'}
            alignItems={'flex-start'}
            justifyContent={'space-between'}
            pb={'10px'}
          >
            <Text flexShrink={0} textStyle={'pre-body-4'} color={'grey.10'}>
              상환 입금 계좌
            </Text>
            <Text
              textStyle={'pre-body-3'}
              color={'grey.10'}
              textAlign={'right'}
              whiteSpace={'pre-line'}
              alignSelf={'flex-end'}
            >
              {loanRetrieveData?.contract?.repaymentAccount || '-'}
            </Text>
          </HStack>
          <HStack
            w={'100%'}
            alignItems={'flex-start'}
            justifyContent={'space-between'}
            pb={'10px'}
          >
            <Text flexShrink={0} textStyle={'pre-body-4'} color={'grey.10'}>
              중도상환수수료
            </Text>
            <Text
              textStyle={'pre-body-3'}
              color={'grey.10'}
              textAlign={'right'}
              whiteSpace={'pre-line'}
              alignSelf={'flex-end'}
            >
              {loanRetrieveData?.contract?.prepaymentRate.toLocaleString() || 0}
              원
            </Text>
          </HStack>
          <HStack
            w={'100%'}
            alignItems={'flex-start'}
            justifyContent={'space-between'}
            pb={'10px'}
          >
            <Text flexShrink={0} textStyle={'pre-body-4'} color={'grey.10'}>
              담보 제공 여부
            </Text>
            <Text
              textStyle={'pre-body-3'}
              color={'grey.10'}
              textAlign={'right'}
              whiteSpace={'pre-line'}
              alignSelf={'flex-end'}
            >
              {loanRetrieveData?.contract?.isCollateralProvided ?
                '해당'
              : '해당 없음'}
            </Text>
          </HStack>
          <HStack
            w={'100%'}
            alignItems={'flex-start'}
            justifyContent={'space-between'}
            pb={'10px'}
          >
            <Text flexShrink={0} textStyle={'pre-body-4'} color={'grey.10'}>
              보증 여부
            </Text>
            <Text
              textStyle={'pre-body-3'}
              color={'grey.10'}
              textAlign={'right'}
              whiteSpace={'pre-line'}
              alignSelf={'flex-end'}
            >
              {loanRetrieveData?.contract?.isJointGuarantee ?
                '해당'
              : '해당 없음'}
            </Text>
          </HStack>

          <HStack
            w={'100%'}
            alignItems={'flex-start'}
            justifyContent={'space-between'}
            pb={'10px'}
          >
            <Text flexShrink={0} textStyle={'pre-body-4'} color={'grey.10'}>
              특약사항
            </Text>
            <VStack alignItems={'flex-end'} maxW={{ base: '60%', sm: '70%' }}>
              <Text
                textStyle={'pre-body-3'}
                color={'grey.10'}
                textAlign={'right'}
                whiteSpace={'pre-line'}
                alignSelf={'flex-end'}
              >
                {(() => {
                  const specialTerms =
                    loanRetrieveData?.contract?.specialTerms || '-'
                  if (specialTerms === '-') return specialTerms

                  const isOverLimit = specialTerms.length > 250
                  const displayText =
                    isOverLimit ?
                      specialTerms.substring(0, 250) + '...'
                    : specialTerms

                  return displayText
                })()}
              </Text>
              {loanRetrieveData?.contract?.specialTerms &&
                loanRetrieveData.contract.specialTerms.length > 250 && (
                  <Text textStyle={'pre-caption-2'} color={'grey.7'} mt={'4px'}>
                    자세한 내용은 계약서를 확인해 주세요.
                  </Text>
                )}
            </VStack>
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  )
}
