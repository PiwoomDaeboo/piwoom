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

import Detail from './components/detail'
import Schedule from './components/schedule'
import {
  BUTTON_DATA,
  LoanDetailApiData,
  SAMPLE_LOAN_DATA,
  getFormattedDetailData,
} from './consts'

const LOAN_TYPE_MAP = {
  detail: 0, // detail
  schedule: 1, // schedule
}

const LOAN_TYPE_QUERY_MAP = {
  0: 'detail',
  1: 'schedule',
}

function MyLoanDetail() {
  const router = useRouter()
  const [activeButtonIndex, setActiveButtonIndex] = useState<number>(0)
  const [showProcedure, setShowProcedure] = useState<boolean>(false)

  const [loanData, setLoanData] = useState<LoanDetailApiData>(SAMPLE_LOAN_DATA)

  useEffect(() => {
    const { type } = router.query

    if (type === 'procedure') {
      setShowProcedure(true)
      setActiveButtonIndex(0)
    } else if (
      type &&
      LOAN_TYPE_MAP[type as keyof typeof LOAN_TYPE_MAP] !== undefined
    ) {
      const index = LOAN_TYPE_MAP[type as keyof typeof LOAN_TYPE_MAP] as number
      setActiveButtonIndex(index)
      setShowProcedure(false)
    } else {
      setActiveButtonIndex(0)
      setShowProcedure(false)
    }
  }, [router.query])

  const handleButtonClick = (index: number) => {
    setActiveButtonIndex(index)
    setShowProcedure(false)

    const queryType =
      LOAN_TYPE_QUERY_MAP[index as keyof typeof LOAN_TYPE_QUERY_MAP]
    router.push(`/my-loan/${router.query.id}?type=${queryType}`, undefined, {
      shallow: true,
    })
  }

  const detailData = getFormattedDetailData(loanData)

  return (
    <>
      <Container
        pt={{ base: '36px', sm: '40px', md: '56px' }}
        pb={{ base: '80px', sm: '120px', md: '114px' }}
      >
        <Flex
          flexDir={{ base: 'column', md: 'row' }}
          gap={{ base: '24px', md: '100px' }}
        >
          <Flex
            maxW={{ base: '100%', md: '260px' }}
            flexDirection={'column'}
            gap={'24px'}
          >
            <HStack
              spacing={'8px'}
              w={'100%'}
              pb={'10px'}
              borderBottom={'1px solid'}
              borderColor={'border.basic.1'}
            >
              <Text textStyle={'pre-body-4'} color={'grey.10'}>
                계약번호
              </Text>
              <Text textStyle={'pre-heading-3'} color={'primary.3'}>
                {loanData.contractNumber}
              </Text>
            </HStack>
            <Flex
              flexDir={{ base: 'row', md: 'column' }}
              w={{ base: '100%', md: 'fit-content' }}
              overflowX={{ base: 'auto', md: 'visible' }}
              gap={{ base: '12px', md: '0' }}
              pb={{ base: '8px', md: '0' }}
              css={{
                '&::-webkit-scrollbar': {
                  height: '4px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'grey.6',
                  borderRadius: '2px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: 'grey.7',
                },
              }}
            >
              {BUTTON_DATA.map((buttonText, index) => (
                <Button
                  transition={'all 0.2s ease-in-out'}
                  key={index}
                  w={{ base: 'fit-content', md: '260px' }}
                  minW={{ base: '120px', md: '260px' }}
                  flexShrink={0}
                  isActive={activeButtonIndex === index}
                  variant={'text-secondary'}
                  onClick={() => handleButtonClick(index)}
                >
                  {buttonText}
                </Button>
              ))}
            </Flex>
          </Flex>
          {/* 컴포넌트 위치 */}
          {router.query.type === 'detail' && <Detail />}
          {router.query.type === 'schedule' && <Schedule />}
        </Flex>
      </Container>
    </>
  )
}
export default MyLoanDetail
