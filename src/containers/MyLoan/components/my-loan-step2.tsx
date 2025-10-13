import { useState } from 'react'

import { useRouter } from 'next/router'

import {
  AspectRatio,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  SimpleGrid,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'

import { AuthRedirectLoader } from '@/components/AuthRedirectLoader'
import ImageAsNext from '@/components/ImageAsNext'
import {
  LOAN_KIND_OPTIONS,
  LOAN_STATUS,
  REPAYMENT_TYPE,
} from '@/constants/loan'
import { useLoanListQuery } from '@/generated/apis/Loan/Loan.query'
import { MY_IMAGES } from '@/generated/path/images'
import { useAuthRedirect } from '@/hooks/useAuthRedirect'

import CustomerInfoModal from './customer-info-modal'
import ElectronicContractModal from './electronic-contract-modal'

const MyLoanStep2 = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [userId, setUserId] = useState<number | null>(null)
  const router = useRouter()

  const { data: loanList, isLoading } = useLoanListQuery({
    variables: {
      query: {
        limit: 50,
        offset: 0,
        status_in: ['UNDER_REVIEW', 'CONTRACTING'],
      },
    },
  })
  console.log('loanList', loanList)

  return (
    <Container>
      <CustomerInfoModal
        isOpen={isOpen}
        onClose={onClose}
        userId={userId as number}
      />

      <Flex
        pt={{ base: '40px', sm: '48px', md: '80px' }}
        pb={'120px'}
        flexDir={'column'}
      >
        <VStack alignItems={'flex-start'} spacing={'8px'}>
          <Text textStyle={'pre-heading-2'} color={'grey.10'}>
            전자계약 리스트
          </Text>
          <Text textStyle={'pre-body-6'} color={'grey.7'}>
            아래 대출계약 건의 전자계약을 체결하시면 대출 금액이 송금됩니다.
          </Text>
        </VStack>
        <VStack
          mt={'32px'}
          bg={'background.basic.2'}
          borderRadius={'20px'}
          p={{ base: '28px 16px', sm: '32px 40px' }}
        >
          <Text textStyle={'pre-heading-2'} color={'primary.4'}>
            고객님은 총{' '}
            <Box as="span" color={'primary.4'}>
              {loanList?.count}건
            </Box>
            의 대출계약이 있습니다.
          </Text>
          <Text textStyle={'pre-body-6'} color={'grey.7'} textAlign={'center'}>
            전자계약서 작성 버튼을 클릭하여 계약서 작성을 진행해 주세요.
          </Text>
          {loanList?.results &&
            loanList.results.length > 0 &&
            loanList?.results?.map((item, index) => (
              <Flex
                key={item?.no}
                mt={'24px'}
                w={'100%'}
                flexDir={'column'}
                p={{ base: '20px', sm: '20px 32px' }}
                bg={'background.basic.1'}
                borderRadius={'20px'}
                gap={'24px'}
                boxShadow={'0 8px 50px 0 rgba(0, 46, 114, 0.10)'}
              >
                <HStack justifyContent={'space-between'} spacing={'6px'}>
                  <Text textStyle={'pre-heading-4'} color={'primary.3'}>
                    {item.no}
                  </Text>
                  <Button
                    onClick={() => {
                      setUserId(item?.id)
                      onOpen()
                    }}
                    variant={'solid-primary'}
                  >
                    전자계약서 작성
                  </Button>
                </HStack>
                <SimpleGrid
                  columns={{ base: 1, sm: 2 }}
                  p={'10px 20px'}
                  bg={'background.basic.2'}
                  borderRadius={'10px'}
                  gap={'2px'}
                >
                  <HStack justifyContent={'flex-start'} alignItems={'center'}>
                    <Text textStyle={'pre-body-7'} color={'grey.9'}>
                      • 채무자:
                    </Text>
                    <Text textStyle={'pre-body-6'} color={'grey.9'}>
                      {item?.accountHolder || '-'}
                    </Text>
                  </HStack>
                  <HStack justifyContent={'flex-start'} alignItems={'center'}>
                    <Text textStyle={'pre-body-7'} color={'grey.9'}>
                      • 대출원금:
                    </Text>
                    <Text textStyle={'pre-body-6'} color={'grey.9'}>
                      {item.loanAmount?.toLocaleString()}만원
                    </Text>
                  </HStack>
                  <HStack justifyContent={'flex-start'} alignItems={'center'}>
                    <Text textStyle={'pre-body-7'} color={'grey.9'}>
                      • 대출종류:
                    </Text>
                    <Text textStyle={'pre-body-6'} color={'grey.9'}>
                      {LOAN_KIND_OPTIONS.find(
                        (status) => status.value === item?.kind,
                      )?.label + '대출' || '-'}
                    </Text>
                  </HStack>
                  <HStack justifyContent={'flex-start'} alignItems={'center'}>
                    <Text textStyle={'pre-body-7'} color={'grey.9'}>
                      • 대출만기:
                    </Text>
                    <Text textStyle={'pre-body-6'} color={'grey.9'}>
                      {item.loanPeriod}개월
                    </Text>
                  </HStack>
                  <HStack justifyContent={'flex-start'} alignItems={'center'}>
                    <Text textStyle={'pre-body-7'} color={'grey.9'}>
                      • 상환방식:
                    </Text>
                    <Text textStyle={'pre-body-6'} color={'grey.9'}>
                      {REPAYMENT_TYPE.find(
                        (type) => type.value === item?.repaymentType,
                      )?.label || '-'}
                    </Text>
                  </HStack>
                  <HStack justifyContent={'flex-start'} alignItems={'center'}>
                    <Text textStyle={'pre-body-7'} color={'grey.9'}>
                      • 이자율:
                    </Text>
                    <Text textStyle={'pre-body-6'} color={'grey.9'}></Text>
                  </HStack>
                </SimpleGrid>
              </Flex>
            ))}

          {/* <Flex
            w={'100%'}
            justifyContent={'center'}
            pt={'40px'}
            borderTop={'1px solid'}
            borderColor={'border.basic.1'}
          >
            <Button
              variant={'solid-primary'}
              w={'160px'}
              onClick={() => router.push('/my-loan?step=3')}
            >
              다음
            </Button>
          </Flex> */}
        </VStack>
      </Flex>
    </Container>
  )
}

export default MyLoanStep2
