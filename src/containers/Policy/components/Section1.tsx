import React, { useEffect, useRef, useState } from 'react'

import {
  Badge,
  Box,
  Container,
  Flex,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'

import Card from '@/components/Card'
import {
  CaretRightIcon,
  Loan1Icon,
  Loan2Icon,
  Loan3Icon,
} from '@/generated/icons/MyIcons'

const Section1 = () => {
  const [hoverStates, setHoverStates] = useState([false, false, false])

  const cardData = [
    {
      icon: Loan1Icon,
      title: '월급 대출',
      description: '월급 직장인을 위한',
      badges: ['#최대 6개월치 월급', '#최저 월 1% ~', '#최대 1500만원 까지'],
    },
    {
      icon: Loan2Icon,
      title: '신용 대출',
      description: '피움 자체 신용도 평가 시스템으로',
      badges: ['#DSR 미적용', '#신용점수 영향X', '#서류 제출X'],
    },
    {
      icon: Loan3Icon,
      title: '부동산 담보대출',
      description: '중/후순위 대출',
      badges: ['#아파트', '##LTV 최대 90%까지', '#6억원 초과 대출 가능'],
    },
  ]

  const handleMouseEnter = (index: number) => {
    setHoverStates((prev) => {
      const newStates = [...prev]
      newStates[index] = true
      return newStates
    })
  }

  const handleMouseLeave = (index: number) => {
    setHoverStates((prev) => {
      const newStates = [...prev]
      newStates[index] = false
      return newStates
    })
  }

  return (
    <Flex w="100%" justifyContent="center" py={'80px'}>
      <Container>
        <SimpleGrid
          display={{ base: 'none', md: 'grid' }}
          columns={3}
          gap={'36px'}
        >
          {cardData.map((card, index) => {
            const IconComponent = card.icon
            return (
              <Card
                key={index}
                flexDir={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                bg={hoverStates[index] ? 'primary.2' : 'grey.0'}
              >
                <Flex
                  w={'149px'}
                  h={'149px'}
                  justifyContent={'center'}
                  alignItems={'center'}
                >
                  <IconComponent
                    boxSize={hoverStates[index] ? '149px' : '139px'}
                  />
                </Flex>
                <HStack mt={'16px'}>
                  <Text textStyle={'pre-heading-1'} color={'grey.10'}>
                    {card.title}
                  </Text>
                  <Flex
                    bg={'primary.4'}
                    borderRadius={'99px'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    w={'32px'}
                    h={'32px'}
                  >
                    <CaretRightIcon boxSize={'18px'} color={'white'} />
                  </Flex>
                </HStack>
                <Text my={'16px'} textStyle={'pre-body-6'} color={'grey.8'}>
                  {card.description}
                </Text>
                <Flex
                  justifyContent={'center'}
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
              </Card>
            )
          })}
        </SimpleGrid>
        <SimpleGrid
          display={{ base: 'grid', md: 'none' }}
          columns={{ base: 1, sm: 3 }}
          gap={'36px'}
        >
          {cardData.map((card, index) => {
            return (
              <Card
                key={index}
                flexDir={'column'}
                justifyContent={'space-between'}
                alignItems={'stretch'}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                bg={hoverStates[index] ? 'primary.2' : 'grey.0'}
              >
                <HStack
                  justifyContent={'space-between'}
                  alignItems={'flex-start'}
                >
                  <VStack alignItems={'flex-start'}>
                    <Text textStyle={'pre-heading-2'} color={'grey.10'}>
                      {card.title}
                    </Text>
                    <Text textStyle={'pre-body-6'} color={'grey.8'}>
                      {card.description}
                    </Text>
                  </VStack>
                  <Flex
                    bg={'primary.4'}
                    borderRadius={'99px'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    w={'32px'}
                    h={'32px'}
                    minW={'32px'}
                  >
                    <CaretRightIcon boxSize={'18px'} color={'white'} />
                  </Flex>
                </HStack>

                <Flex
                  display={{ base: 'none', sm: 'flex' }}
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
              </Card>
            )
          })}
        </SimpleGrid>
      </Container>
    </Flex>
  )
}

export default Section1
