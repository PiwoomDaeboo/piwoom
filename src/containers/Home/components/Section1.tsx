import React, { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'

import {
  Badge,
  Box,
  Container,
  Flex,
  HStack,
  Image,
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
  const router = useRouter()
  const [hoverStates, setHoverStates] = useState([false, false, false])

  const cardData = [
    {
      icon: Loan1Icon,
      title: '비상금 대출',
      description: '직장인을 위한 대출',
      badges: ['#최대 6개월치 월급', '#최저 월 1% ~', '#최대 1500만원 까지'],
      href: '/loan?type=salary',
    },
    {
      icon: Loan2Icon,
      title: '신용 대출',
      description: '피움 자체 신용도 평가',
      badges: ['#DSR 미적용', '#신용점수 영향 X', '#서류 제출 X'],
      href: '/loan?type=credit',
    },
    {
      icon: Loan3Icon,
      title: '부동산 담보대출',
      description: '중/후순위 대출',
      badges: ['#아파트', '#LTV 최대 90%까지', '#6억원 초과 대출 가능'],
      href: '/loan?type=mortgage',
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
    <Flex w="100%" justifyContent="center" py={{ base: '24px', sm: '80px' }}>
      <Container>
        <Box mb={{ base: '32px', md: '36px' }}>
          <Text textStyle={'pre-heading-1'}>
            쉽고 빠른{' '}
            <Box as={'span'} color={'primary.4'}>
              비대면 대출 서비스
            </Box>
            를 시작해보세요
          </Text>
        </Box>
        <SimpleGrid
          display={{ base: 'none', sm: 'grid' }}
          columns={3}
          gap={{ sm: '12px', md: '32px' }}
        >
          {cardData.map((card, index) => {
            const IconComponent = card.icon
            return (
              <Card
                key={index}
                cursor={'pointer'}
                onClick={() => router.push(card.href)}
                flexDir={'column'}
                justifyContent={'center'}
                position={{ sm: 'relative', md: 'static' }}
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
                    position={{ sm: 'absolute', md: 'static' }}
                    top={{ sm: '20px', md: 'auto' }}
                    right={{ sm: '20px', md: 'auto' }}
                    bottom={{ sm: 'auto', md: 'auto' }}
                    left={{ sm: 'auto', md: 'auto' }}
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
                  w={'80%'}
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
          display={{ base: 'grid', sm: 'none' }}
          columns={1}
          gap={'12px'}
        >
          {cardData.map((card, index) => {
            return (
              <Card
                key={index}
                onClick={() => router.push(card.href)}
                flexDir={'column'}
                justifyContent={'space-between'}
                alignItems={'stretch'}
              >
                <HStack justifyContent={'space-between'}>
                  <HStack>
                    <Image
                      src={`/icons/loan${index + 1}.svg`}
                      alt={card.title}
                      boxSize={'70px'}
                    />

                    <VStack alignItems={'flex-start'} justifyContent={'center'}>
                      <Text textStyle={'pre-heading-2'} color={'grey.10'}>
                        {card.title}
                      </Text>
                      <Text textStyle={'pre-body-6'} color={'grey.8'}>
                        {card.description}
                      </Text>
                    </VStack>
                  </HStack>
                  <Flex alignItems={'flex-end'} h={'100%'}>
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
