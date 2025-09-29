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
import Document from './components/document'
import Schedule from './components/schedule'
import {
  BUTTON_DATA,
  LoanDetailApiData,
  SAMPLE_LOAN_DATA,
  getFormattedDetailData,
} from './consts'

// const LOAN_TYPE_MAP = {
//   detail: 0, // detail
//   schedule: 1, // schedule
// }

const LOAN_TYPE_QUERY_MAP = {
  0: 'detail',
  1: 'schedule',
  2: 'document',
}

function MyLoanDetail() {
  const router = useRouter()
  const { detailMenu } = router.query
  const [activeButtonIndex, setActiveButtonIndex] = useState<number>(0)
  const [showProcedure, setShowProcedure] = useState<boolean>(false)
  const [isDetailMenu, setIsDetailMenu] = useState<string>('detail')

  const [loanData, setLoanData] = useState<LoanDetailApiData>(SAMPLE_LOAN_DATA)

  useEffect(() => {
    if (detailMenu) {
      setIsDetailMenu(detailMenu as string)
    }
  }, [detailMenu])

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
              {BUTTON_DATA.map((button, index) => (
                <Button
                  transition={'all 0.2s ease-in-out'}
                  key={index}
                  w={{ base: 'fit-content', md: '260px' }}
                  minW={{ base: '120px', md: '260px' }}
                  flexShrink={0}
                  isActive={isDetailMenu === button.value}
                  variant={'text-secondary'}
                  onClick={() => setIsDetailMenu(button.value)}
                >
                  {button.title}
                </Button>
              ))}
            </Flex>
          </Flex>

          {isDetailMenu === 'detail' && <Detail />}
          {isDetailMenu === 'schedule' && <Schedule />}
          {isDetailMenu === 'document' && <Document />}
        </Flex>
      </Container>
    </>
  )
}
export default MyLoanDetail
