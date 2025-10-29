import { useEffect, useMemo, useState } from 'react'

import { useRouter } from 'next/router'

import {
  Center,
  Container,
  Flex,
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

import NonData from '@/components/NonData'
import { Pagination } from '@/components/pagination'
import { LoanListParamsStatusInEnumType } from '@/generated/apis/@types/data-contracts'
import { useLoanListQuery } from '@/generated/apis/Loan/Loan.query'
import { useLocalStorage } from '@/stores/local/state'

import MyLoanList from './components/my-loan-list'

function MyLoanStatus() {
  const router = useRouter()
  const postsPerPage = 9
  const { token } = useLocalStorage()

  useEffect(() => {
    if (!token?.access_token && router.isReady) {
      router.replace('/my-loan-auth')
    }
  }, [token, router])

  const selectedTab = useMemo(() => {
    const tabQuery = router.query.tab
    if (typeof tabQuery === 'string') {
      const tab = parseInt(tabQuery, 10)
      return isNaN(tab) ? 0 : Math.max(0, Math.min(2, tab))
    }
    return 0
  }, [router.query.tab])

  const currentPage = useMemo(() => {
    const pageQuery = router.query.page
    if (typeof pageQuery === 'string') {
      const page = parseInt(pageQuery, 10)
      return isNaN(page) ? 1 : Math.max(1, page)
    }
    return 1
  }, [router.query.page])

  const status = useMemo<LoanListParamsStatusInEnumType[]>(() => {
    if (selectedTab === 0) {
      return [
        'UNDER_REVIEW',
        'CONTRACTING',
        'REMITTING',
        'IN_PROGRESS',
        'OVERDUE',
      ]
    } else if (selectedTab === 1) {
      return ['EARLY_REPAYMENT_COMPLETED', 'MATURITY_REPAYMENT_COMPLETED']
    } else {
      return ['REJECTED']
    }
  }, [selectedTab])

  const { data: loanList, isLoading } = useLoanListQuery({
    variables: {
      query: {
        limit: postsPerPage,
        offset: (currentPage - 1) * postsPerPage,
        status_in: status as LoanListParamsStatusInEnumType[],
      },
    },
    options: {
      enabled: !!token?.access_token,
    },
  })
  const totalPages = Math.ceil((loanList?.count || 0) / postsPerPage)

  const handleTabChange = (index: number) => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, tab: index, page: 1 },
      },
      undefined,
      { shallow: true },
    )
  }

  const handlePageChange = (page: number) => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, page },
      },
      undefined,
      { shallow: true },
    )
  }

  useEffect(() => {
    if (router.isReady && !router.query.tab && !router.query.page) {
      router.replace(
        {
          pathname: router.pathname,
          query: { tab: 0, page: 1 },
        },
        undefined,
        { shallow: true },
      )
    }
  }, [router.isReady])

  if (isLoading) {
    return (
      <Center h={'100vh'}>
        <Spinner />
      </Center>
    )
  }

  return (
    <>
      <Flex w={'100%'} h={'100%'} py={'60px'} bg={'primary.1'}>
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
                {loanList?.results && loanList.results.length > 0 ?
                  <MyLoanList loanList={loanList.results} />
                : <NonData variant="loan" />}
              </TabPanel>
              <TabPanel>
                {loanList?.results && loanList.results.length > 0 ?
                  <MyLoanList loanList={loanList.results} />
                : <NonData variant="loan" />}
              </TabPanel>
              <TabPanel>
                {loanList?.results && loanList.results.length > 0 ?
                  <MyLoanList loanList={loanList.results} />
                : <NonData variant="loan" />}
              </TabPanel>
            </TabPanels>
          </Tabs>
          {totalPages > 0 && (
            <Flex
              w={'100%'}
              justifyContent={'center'}
              h={'fit-content'}
              mt={'48px'}
            >
              <Flex justifyContent={'center'}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </Flex>
            </Flex>
          )}
        </>
      </Container>
    </>
  )
}
export default MyLoanStatus
