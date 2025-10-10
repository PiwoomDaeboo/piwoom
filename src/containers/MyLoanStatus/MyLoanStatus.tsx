import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import * as PortOne from '@portone/browser-sdk/v2'

import NonData from '@/components/NonData'
import { Pagination } from '@/components/pagination'
import { LoanListParamsStatusInEnumType } from '@/generated/apis/@types/data-contracts'
import { paramsSerializerBy } from '@/generated/apis/@utils/param-serializer-by'
import { useLoanListQuery } from '@/generated/apis/Loan/Loan.query'
import {
  useUserIdentityVerificationCreateMutation,
  useUserLoginCreateMutation,
} from '@/generated/apis/User/User.query'
import { CaretRightIcon } from '@/generated/icons/MyIcons'
import { useAuth } from '@/hooks/useAuth'
import { useLocalStorage } from '@/stores/local/state'

import AdditionalDocumentModal from '../../components/@Modal/addtional-document-modal'
import LoanDelayModal from '../../components/@Modal/loan-delay-modal'
import MyLoanAuthentication from './components/my-loan-authentication'

function MyLoanStatus() {
  const router = useRouter()
  const postsPerPage = 10
  const [status, setStatus] = useState<LoanListParamsStatusInEnumType[]>([
    'UNDER_REVIEW',
    'CONTRACTING',
    'IN_PROGRESS',
    'OVERDUE',
  ])
  const [currentPage, setCurrentPage] = useState(1)
  const { isLogin } = useAuth()
  const {
    isOpen: isLoanDelayOpen,
    onOpen: onLoanDelayOpen,
    onClose: onLoanDelayClose,
  } = useDisclosure()
  const {
    isOpen: isAdditionalDocumentOpen,
    onOpen: onAdditionalDocumentOpen,
    onClose: onAdditionalDocumentClose,
  } = useDisclosure()

  const { data: loanList } = useLoanListQuery({
    variables: {
      query: {
        limit: postsPerPage,
        offset: (currentPage - 1) * postsPerPage,
        status_in: status,
      },
      params: {
        paramsSerializer: paramsSerializerBy({ _default: 'comma' }),
      },
    },
    options: {
      enabled: !!isLogin,
    },
  })
  const totalPages = Math.ceil(loanList?.count || 0 / postsPerPage)

  const [selectedTab, setSelectedTab] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handleTabChange = (index: number) => {
    setSelectedTab(index)
    if (index === 0) {
      setStatus(['UNDER_REVIEW', 'CONTRACTING', 'IN_PROGRESS', 'OVERDUE'])
    } else if (index === 1) {
      setStatus(['EARLY_REPAYMENT_COMPLETED', 'MATURITY_REPAYMENT_COMPLETED'])
    } else if (index === 2) {
      setStatus(['REJECTED'])
    }
  }

  const getBadgeStyle = (status: string) => {
    switch (status) {
      case 'IN_PROGRESS':
        return { color: 'accent.yellow2', bg: 'accent.yellow1' }
      case 'OVERDUE':
        return { color: 'accent.red2', bg: 'accent.red1' }
      case 'EARLY_REPAYMENT_COMPLETED':
        return { color: 'accent.green2', bg: 'accent.green1' }
      // case '송금중':
      //   return { color: 'accent.pink2', bg: 'accent.pink1' }
      case 'MATURITY_REPAYMENT_COMPLETED':
        return { color: 'accent.violet2', bg: 'accent.violet1' }
      case 'REJECTED':
        return { color: 'grey.7', bg: 'grey.2' }
    }
  }

  return (
    <>
      <Flex w={'100%'} h={'100%'} py={'60px'} bg={'primary.1'}>
        <LoanDelayModal isOpen={isLoanDelayOpen} onClose={onLoanDelayClose} />
        <AdditionalDocumentModal
          isOpen={isAdditionalDocumentOpen}
          onClose={onAdditionalDocumentClose}
          selectedIndex={selectedIndex}
        />
        <Container>
          <VStack alignItems={'flex-start'} spacing={'8px'}>
            <Text textStyle={'pre-display-3'} color={'grey.10'}>
              대출 현황 조회
            </Text>
            <Text textStyle={'pre-body-4'} color={'grey.10'}>
              나의 대출 현황 정보를 조회해 보세요.
            </Text>
          </VStack>
        </Container>
      </Flex>
      <Container py={'64px'}>
        {isLogin ?
          <>
            <Tabs index={selectedTab} onChange={handleTabChange}>
              <TabList>
                <Tab>
                  <Text
                    textStyle={'pre-body-3'}
                    color={selectedTab === 0 ? 'grey.10' : 'grey.7'}
                  >
                    진행중
                  </Text>
                </Tab>
                <Tab>
                  <Text
                    textStyle={'pre-body-3'}
                    color={selectedTab === 1 ? 'grey.10' : 'grey.7'}
                  >
                    상환완료
                  </Text>
                </Tab>
                <Tab>
                  <Text
                    textStyle={'pre-body-3'}
                    color={selectedTab === 2 ? 'grey.10' : 'grey.7'}
                  >
                    대출거절
                  </Text>
                </Tab>
              </TabList>

              <TabPanels p={'0px'}>
                <TabPanel p={'36px 0px 48px 0px'}>
                  <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={'20px'}>
                    {Array.from({ length: 10 }).map((item: any, index) => (
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
                              style={getBadgeStyle('IN_PROGRESS')}
                            >
                              대출 중
                            </Badge>
                            <Text>
                              계약번호{' '}
                              <Box as="span" ml={'8px'} color={'primary.4'}>
                                12345678
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
                            onClick={() =>
                              router.push(`/my-loan-status/${index}`)
                            }
                          >
                            <CaretRightIcon
                              boxSize={'24px'}
                              color={'primary.4'}
                            />
                          </Flex>
                        </HStack>
                        <Flex
                          flexDirection={'column'}
                          w={'100%'}
                          gap={'6px'}
                          mt={'20px'}
                        >
                          <HStack justifyContent={'space-between'}>
                            <Text textStyle={'pre-body-6'} color={'grey.10'}>
                              대출 금액
                            </Text>
                            <Text textStyle={'pre-body-5'} color={'grey.10'}>
                              100,000,000원
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
                          <Button variant={'outline-secondary'}>
                            <Text textStyle={'pre-body-7'} color={'grey.8'}>
                              상환 스케줄 확인하기
                            </Text>
                          </Button>
                          <Button
                            variant={'outline-secondary'}
                            // onClick={onLoanDelayOpen}
                            onClick={() => {
                              router.push(`/my-loan-status/repayment/${index}`)
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
                          <Button variant={'outline-secondary'}>
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
                            setSelectedIndex(index)
                            router.push(
                              `/my-loan-status/${item?.id || 1}?detailMenu=document`,
                            )
                          }}
                        >
                          <Text textStyle={'pre-body-7'} color={'grey.8'}>
                            추가서류 제출
                          </Text>
                        </Button>
                      </Flex>
                    ))}
                  </SimpleGrid>
                </TabPanel>
                <TabPanel>
                  <NonData variant="loan" />
                </TabPanel>
                <TabPanel></TabPanel>
              </TabPanels>
            </Tabs>

            <Flex w={'100%'} justifyContent={'center'} h={'fit-content'}>
              <Flex justifyContent={'center'}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </Flex>
            </Flex>
          </>
        : <MyLoanAuthentication />}
      </Container>
    </>
  )
}
export default MyLoanStatus
