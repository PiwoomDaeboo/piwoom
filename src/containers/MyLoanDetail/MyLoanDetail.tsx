import { useEffect, useRef, useState } from 'react'

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

import { useLoanRetrieveQuery } from '@/generated/apis/Loan/Loan.query'
import { useAuth } from '@/hooks/useAuth'
import { useLocalStorage } from '@/stores/local/state'

import Detail from './components/detail'
import Document from './components/document'
import Schedule from './components/schedule'
import { BUTTON_DATA, LoanDetailApiData, SAMPLE_LOAN_DATA } from './consts'

function MyLoanDetail() {
  const router = useRouter()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const { detailMenu } = router.query
  const [isDetailMenu, setIsDetailMenu] = useState<string>('detail')

  const { data: loanRetrieveData, isLoading: isLoading } = useLoanRetrieveQuery(
    {
      variables: {
        id: Number(router.query.id),
      },
      options: {
        enabled: !!router.query.id,
      },
    },
  )

  useEffect(() => {
    if (detailMenu) {
      setIsDetailMenu(detailMenu as string)
      router.push(`/my-loan-status/${router.query.id}?detailMenu=${detailMenu}`)
    }
  }, [detailMenu])

  // isDetailMenu 변경 시 해당 버튼으로 스크롤
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const buttons = container.querySelectorAll('button')

      // 현재 활성화된 메뉴에 해당하는 버튼 찾기
      const activeButtonIndex = BUTTON_DATA.findIndex(
        (button) => button.value === isDetailMenu,
      )
      const targetButton = buttons[activeButtonIndex]

      if (targetButton) {
        const containerRect = container.getBoundingClientRect()
        const buttonRect = targetButton.getBoundingClientRect()

        // 버튼이 컨테이너 중앙에 오도록 스크롤
        const scrollLeft =
          buttonRect.left -
          containerRect.left -
          containerRect.width / 2 +
          buttonRect.width / 2

        container.scrollTo({
          left: container.scrollLeft + scrollLeft,
          behavior: 'smooth',
        })
      }
    }
  }, [isDetailMenu])

  const handleDetailMenuChange = (menu: string) => {
    setIsDetailMenu(menu)
    router.push(`/my-loan-status/${router.query.id}?detailMenu=${menu}`)
  }

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
                {loanRetrieveData?.no}
              </Text>
            </HStack>
            <Flex
              ref={scrollContainerRef}
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
              {BUTTON_DATA.filter((button) => {
                if (
                  loanRetrieveData?.status === 'REJECTED' ||
                  loanRetrieveData?.status === 'UNDER_REVIEW'
                ) {
                  return button.value === 'document'
                }

                return true
              }).map((button, index) => (
                <Button
                  bg={
                    isDetailMenu === button.value ? '#1B1C1D0D' : 'transparent'
                  }
                  _hover={{
                    bg:
                      isDetailMenu === button.value ?
                        '#1B1C1D0D'
                      : 'transparent',
                    color: isDetailMenu === button.value ? 'grey.10' : 'grey.7',
                  }}
                  color={isDetailMenu === button.value ? 'grey.10' : 'grey.7'}
                  transition={'all 0.2s ease-in-out'}
                  key={index}
                  w={{ base: 'fit-content', md: '260px' }}
                  minW={{ base: '120px', md: '260px' }}
                  flexShrink={0}
                  isActive={isDetailMenu === button.value}
                  variant={'text-secondary'}
                  onClick={() => handleDetailMenuChange(button.value)}
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
