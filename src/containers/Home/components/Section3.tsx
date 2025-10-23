import { useEffect, useRef } from 'react'

import { Box, Flex, Text, VStack } from '@chakra-ui/react'

import { gsap } from 'gsap'

import {
  LeafIcon,
  Sectionicon1Icon,
  Sectionicon2Icon,
  Sectionicon3Icon,
  Sectionicon4Icon,
  Sectionicon5Icon,
  Sectionicon6Icon,
  Sectionicon7Icon,
} from '@/generated/icons/MyIcons'

const sectionData = [
  {
    icon: Sectionicon1Icon,
    description1: '불필요한 상담과 서류 제출 없는',
    description2: '비대면 계약을 원하시는 분',
  },
  {
    icon: Sectionicon2Icon,
    description1: '상환 능력은 충분하지만',
    description2: '일시적으로 자금이 부족한 분',
  },
  {
    icon: Sectionicon3Icon,
    description1: '안정적인 소득 성장 전망에도',
    description2: '​은행 대출이 충분하지 않은 분',
  },
  {
    icon: Sectionicon4Icon,
    description1: '매출은 빠르게 늘어나지만',
    description2: '운전 자금이 부족한 분',
  },
  {
    icon: Sectionicon5Icon,
    description1: '신속하고 편리한 한도 확인으로​',
    description2: ' ​눈 앞의 기회를 붙잡고 싶은 분',
  },
  {
    icon: Sectionicon6Icon,
    description1: '소액 대출이 필요하지만',
    description2: '신용점수를 관리하고 싶은 분',
  },
  {
    icon: Sectionicon7Icon,
    description1: '정식 등록 대부업체로부터',
    description2: '안전한 대출을 받고 싶은 분',
  },
]

const initMarquee = (marqueeElement: HTMLElement) => {
  const marqueeInner = marqueeElement.querySelector(
    '.marquee__inner',
  ) as HTMLElement

  if (!marqueeInner) return

  gsap.killTweensOf(marqueeInner)

  const contentWidth = marqueeInner.scrollWidth
  const halfWidth = contentWidth / 2

  const getDuration = () => {
    const width = window.innerWidth
    if (width < 480) return 5
    if (width < 768) return 20
    return 30
  }

  gsap.set(marqueeInner, { x: 0 })

  gsap.to(marqueeInner, {
    x: -halfWidth,
    duration: getDuration(),
    ease: 'none',
    repeat: -1,
  })
}

function Section3() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!marqueeRef.current) return

    const marquee = marqueeRef.current

    initMarquee(marquee)

    const handleResize = () => {
      initMarquee(marquee)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      gsap.killTweensOf('.marquee__inner')
      window.removeEventListener('resize', handleResize)
    }
  }, [sectionData])

  return (
    <Flex
      w={'100%'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDir={'column'}
      py={{ base: '64px', sm: '96px', md: '160px' }}
    >
      <Flex
        display={{ base: 'none', sm: 'flex' }}
        alignItems={'flex-end'}
        px={'16px'}
      >
        <Text textStyle={'pre-display-4'} textAlign={'center'}>
          피움의 대출, 이런 분들께 도움이 될 거예요
        </Text>
        <LeafIcon boxSize={'24px'} mb={'4px'} />
      </Flex>
      <Flex
        display={{ base: 'flex', sm: 'none' }}
        flexDir={'column'}
        alignItems={'center'}
        px={'16px'}
      >
        <Text textStyle={'pre-display-4'}>피움의 대출, 이런 분들께</Text>
        <Flex alignItems={'flex-end'}>
          <Text textStyle={'pre-display-4'}>도움이 될 거예요</Text>
          <LeafIcon boxSize={'24px'} />
        </Flex>
      </Flex>

      <Box
        ref={marqueeRef}
        className="marquee"
        w="100%"
        overflow="hidden"
        py={'45px'}
        position="relative"
      >
        <Box
          className="marquee__inner"
          display="flex"
          w={'max-content'}
          willChange="transform"
        >
          {[...sectionData, ...sectionData].map((data, index) => (
            <Flex
              mr={'32px'}
              minH={{ base: '200px', sm: '230px', md: '230px' }}
              minW={{ base: '250px', sm: '290px', md: '280px' }}
              p={'32px 28px'}
              bg={'grey.0'}
              borderRadius={'20px'}
              boxShadow={'0 8px 50px 0 rgba(0, 46, 114, 0.10)'}
              key={`${data.description1}-${index}`}
              flexDir={'column'}
              alignItems={'flex-start'}
              justifyContent={'space-between'}
              flexShrink={0}
            >
              <data.icon boxSize={'70px'} />
              <VStack alignItems={'flex-start'} gap={'0px'}>
                <Text textStyle={'pre-body-4'}>{data.description1}</Text>
                <Text textStyle={'pre-body-3'}>{data.description2}</Text>
              </VStack>
            </Flex>
          ))}
        </Box>
      </Box>
    </Flex>
  )
}

export default Section3
