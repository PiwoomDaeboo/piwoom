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

import { Loan1Icon, Loan2Icon, Loan3Icon } from '@/generated/icons/MyIcons'

import LoanProcedureIntroduction from './components/procedure-introduction'
import { BUTTON_DATA, CARD_DATA } from './consts'

const listItemStyles = {
  textStyle: 'pre-body-6',
  mb: '6px',
  position: 'relative' as const,
  pl: '20px',
  _before: {
    content: '"·"',
    position: 'absolute' as const,
    left: '0',
    top: '0',
  },
}

const ListItem = ({
  children,
  color = 'grey.8',
}: {
  children: React.ReactNode
  color?: string
}) => (
  <Box as="li" color={color} {...listItemStyles}>
    {children}
  </Box>
)

const List = ({ children }: { children: React.ReactNode }) => (
  <Box as="ul" listStyleType="none" m={0} p={0} w="100%">
    {children}
  </Box>
)

// 쿼리스트링과 대출 유형 매핑
const LOAN_TYPE_MAP = {
  salary: 0, // 월급대출
  credit: 1, // 신용대출
  mortgage: 2, // 부동산 담보대출
  procedure: 'procedure', // 대출 절차 안내
}

const LOAN_TYPE_QUERY_MAP = {
  0: 'salary',
  1: 'credit',
  2: 'mortgage',
}

function Loan() {
  const router = useRouter()
  const [activeButtonIndex, setActiveButtonIndex] = useState<number>(0)
  const [showProcedure, setShowProcedure] = useState<boolean>(false)

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

    // 쿼리스트링 업데이트
    const queryType =
      LOAN_TYPE_QUERY_MAP[index as keyof typeof LOAN_TYPE_QUERY_MAP]
    router.push(`/loan?type=${queryType}`, undefined, { shallow: true })
  }

  const handleProcedureClick = () => {
    setShowProcedure(true)
    setActiveButtonIndex(0)

    // 쿼리스트링 업데이트
    router.push('/loan?type=procedure', undefined, { shallow: true })
  }
  const handleApplyLoanClick = () => {
    router.push('/apply-loan')
  }

  return (
    <>
      <Flex w={'100%'} h={'100%'} py={'60px'} bg={'primary.1'}>
        <Container>
          <VStack alignItems={'flex-start'} spacing={'8px'}>
            <Text textStyle={'pre-display-3'} color={'grey.10'}>
              {showProcedure ?
                '대출 절차 안내'
              : CARD_DATA[activeButtonIndex]?.title || '대출'}
            </Text>
            <Text textStyle={'pre-body-4'} color={'grey.10'}>
              {showProcedure ?
                '피움의 간편한 대출 신청 절차를 확인해보세요'
              : CARD_DATA[activeButtonIndex]?.description || ''}
            </Text>
          </VStack>
        </Container>
      </Flex>
      <Container py={'64px'}>
        <Flex
          flexDir={{ base: 'column', md: 'row' }}
          gap={{ base: '24px', md: '100px' }}
        >
          <Flex
            maxW={{ base: '100%', md: '260px' }}
            flexDirection={{ base: 'row', md: 'column' }}
            gap={'24px'}
          >
            <Text
              display={{ base: 'none', md: 'block' }}
              textStyle={'pre-heading-2'}
            >
              대출
            </Text>
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
                  isActive={!showProcedure && activeButtonIndex === index}
                  variant={'text-secondary'}
                  onClick={() => handleButtonClick(index)}
                >
                  {buttonText}
                </Button>
              ))}
              <Button
                w={{ base: 'fit-content', md: '260px' }}
                minW={{ base: '120px', md: '260px' }}
                flexShrink={0}
                isActive={showProcedure}
                variant={'text-secondary'}
                onClick={handleProcedureClick}
              >
                대출 절차 안내
              </Button>
            </Flex>
          </Flex>
          <Flex flexDir={'column'} w={'100%'}>
            {showProcedure ?
              <LoanProcedureIntroduction />
            : CARD_DATA.map((card, index) => {
                if (index !== activeButtonIndex) return null
                return (
                  <Flex
                    w={'100%'}
                    borderRadius={'32px'}
                    boxShadow={'0 8px 50px 0 rgba(0, 46, 114, 0.10)'}
                    p={{ base: '20px 28px', sm: '20px 48px', md: '40px 64px' }}
                    bg={'grey.0'}
                    key={index}
                    flexDir={'column'}
                    justifyContent={'center'}
                    alignItems={'flex-start'}
                  >
                    <HStack
                      mt={'16px'}
                      w={'100%'}
                      justifyContent={'space-between'}
                    >
                      <VStack w={'100%'} alignItems={'flex-start'}>
                        <Text textStyle={'pre-heading-1'} color={'grey.10'}>
                          {card.title}
                        </Text>
                        <Text textStyle={'pre-body-6'} color={'grey.8'}>
                          {card.description}
                        </Text>
                        <Flex
                          display={{ base: 'none', sm: 'flex' }}
                          mt={'16px'}
                          justifyContent={'flex-start'}
                          alignItems={'center'}
                          w={'100%'}
                          flexWrap={'wrap'}
                          gap={'8px'}
                        >
                          {card.badges.map((badge, badgeIndex) => (
                            <Badge key={badgeIndex} variant={'subtle_primary'}>
                              {badge}
                            </Badge>
                          ))}
                        </Flex>
                      </VStack>
                      <Flex
                        w={'149px'}
                        h={'149px'}
                        justifyContent={'center'}
                        alignItems={'center'}
                      >
                        {card?.icon === 'loan1' && (
                          <Loan1Icon boxSize={'149px'} />
                        )}
                        {card?.icon === 'loan2' && (
                          <Loan2Icon boxSize={'149px'} />
                        )}
                        {card?.icon === 'loan3' && (
                          <Loan3Icon boxSize={'149px'} />
                        )}
                      </Flex>
                    </HStack>
                    <Flex
                      display={{ base: 'flex', sm: 'none' }}
                      mt={'16px'}
                      justifyContent={'flex-start'}
                      alignItems={'center'}
                      w={'100%'}
                      flexWrap={'wrap'}
                      gap={'8px'}
                    >
                      {card.badges.map((badge, badgeIndex) => (
                        <Badge key={badgeIndex} variant={'subtle_primary'}>
                          {badge}
                        </Badge>
                      ))}
                    </Flex>
                    <Flex
                      flexDir={'column'}
                      mt={'24px'}
                      gap={'10px'}
                      alignItems={'flex-start'}
                      justifyContent={'flex-start'}
                    >
                      <HStack
                        gap={'16px'}
                        w={'100%'}
                        justifyContent={'flex-start'}
                      >
                        <Flex
                          justifyContent={'center'}
                          alignItems={'center'}
                          w={'36px'}
                          h={'36px'}
                          borderRadius={'8px'}
                          border={'1px solid'}
                          borderColor={'border.basic.1'}
                          bg={'background.basic.2'}
                        >
                          <Loan1Icon boxSize={'24px'} />
                        </Flex>
                        <Text textStyle={'pre-body-5'} color={'grey.10'}>
                          {card.description1}
                        </Text>
                      </HStack>
                      <HStack gap={'16px'}>
                        <Flex
                          justifyContent={'center'}
                          alignItems={'center'}
                          w={'36px'}
                          h={'36px'}
                          borderRadius={'8px'}
                          border={'1px solid'}
                          borderColor={'border.basic.1'}
                          bg={'background.basic.2'}
                        >
                          <Loan2Icon boxSize={'24px'} />
                        </Flex>
                        <Text textStyle={'pre-body-5'} color={'grey.10'}>
                          {card.description2}
                        </Text>
                      </HStack>
                    </Flex>
                    <Flex mt={'24px'} w={'100%'} justifyContent={'center'}>
                      <Button
                        onClick={handleApplyLoanClick}
                        bg={'primary.4'}
                        color={'grey.0'}
                        minW={'180px'}
                        minH={'48px'}
                      >
                        대출 신청
                      </Button>
                    </Flex>
                  </Flex>
                )
              })
            }

            {!showProcedure &&
              CARD_DATA[activeButtonIndex]?.details?.sections && (
                <>
                  {CARD_DATA[activeButtonIndex].details.sections.map(
                    (section, sectionIndex) => (
                      <Flex
                        key={sectionIndex}
                        mt={sectionIndex === 0 ? '24px' : '0'}
                        w={'100%'}
                        py={'40px'}
                        gap="20px"
                        borderBottom={'1px solid'}
                        borderColor={'border.basic.1'}
                        flexDir={{ base: 'column', md: 'row' }}
                      >
                        <Text
                          textStyle={'pre-heading-4'}
                          color={'grey.10'}
                          minW={'160px'}
                        >
                          {section.title}
                        </Text>
                        <VStack alignItems={'flex-start'}>
                          {section.type === 'list' ?
                            <List>
                              {Array.isArray(section.content) ?
                                section.content.map((item, index) => (
                                  <ListItem key={index}>{item}</ListItem>
                                ))
                              : <ListItem>{section.content}</ListItem>}
                            </List>
                          : <Text textStyle={'pre-body-6'} color={'grey.8'}>
                              {section.content}
                            </Text>
                          }
                        </VStack>
                      </Flex>
                    ),
                  )}
                </>
              )}
          </Flex>
        </Flex>
      </Container>
    </>
  )
}
export default Loan
