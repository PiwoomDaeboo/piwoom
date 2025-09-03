import { useEffect, useState } from 'react'

import { Box, Container, Flex, HStack, Text, VStack } from '@chakra-ui/react'

import {
  Slider1Icon,
  Slider2Icon,
  Slider3Icon,
} from '@/generated/icons/MyIcons'

// 슬라이더 데이터
const sliderData = [
  {
    id: 1,
    title: '불법사채, 불법사금융 피해 예방',
    subtitle: '급할수록 조심! 급할수록 안전한 금융을 선택하세요.',
    contact: '1332',
    bgColor: '#F6E6EA',
    icon: <Slider1Icon boxSize={'60px'} />,
  },
  {
    id: 2,
    title: '모두가 알아야 할 보이스피싱 대응요령',
    subtitle: '보이스피싱, 알고 대비하면 막을 수 있어요.',
    contact: '',
    bgColor: '#E4E2FF',
    textColor: 'grey.800',
    icon: <Slider2Icon boxSize={'60px'} />,
  },
  {
    id: 3,
    title: '보이스피싱 피해 예방법',
    subtitle: '수사기관 사칭 전화, 대면 요구는 의심해보세요.',
    contact: '',
    bgColor: '#F9F2E2',
    textColor: 'grey.800',
    icon: <Slider3Icon boxSize={'60px'} />,
  },
]

const SliderItem = ({ item }: { item: any }) => (
  <Box w="100%" h="200px" bg={item.bgColor} borderRadius="20px" p="32px">
    <Flex w="100%" h="100%" justifyContent="space-between" alignItems="center">
      <VStack alignItems="flex-start" spacing="16px" flex="1" maxW="65%">
        <Text
          fontSize={{ base: '18px', md: '24px' }}
          fontWeight="bold"
          color={item.textColor || 'grey.800'}
          lineHeight="1.3"
        >
          {item.title}
        </Text>
        <Text
          fontSize={{ base: '14px', md: '16px' }}
          color={item.textColor || 'grey.800'}
          opacity="0.8"
        >
          {item.subtitle}
        </Text>
      </VStack>

      {/* 우측 아이콘 영역 */}
      <Box
        flexShrink={0}
        w="80px"
        h="80px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="rgba(255,255,255,0.1)"
        borderRadius="16px"
      >
        {item.icon}
      </Box>
    </Flex>
  </Box>
)

// 도트 인디케이터 컴포넌트
const DotIndicator = ({
  total,
  current,
  onDotClick,
}: {
  total: number
  current: number
  onDotClick: (index: number) => void
}) => (
  <HStack spacing="8px" justifyContent="center" mt="20px">
    {Array.from({ length: total }).map((_, index) => (
      <Box
        key={index}
        w="8px"
        h="8px"
        borderRadius="50%"
        bg={current === index ? 'primary.4' : 'grey.4'}
        cursor="pointer"
        transition="all 0.3s ease"
        onClick={() => onDotClick(index)}
        _hover={{ bg: 'primary.3' }}
      />
    ))}
  </HStack>
)

function Section6() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // 자동 슬라이드 전환
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  // 도트 클릭 시 해당 슬라이드로 이동
  const handleDotClick = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <Flex
      w="100%"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      py={{ base: '16px', sm: '40px', md: '96px' }}
    >
      <Container maxW="1200px">
        <VStack spacing="0" w="100%">
          {/* 슬라이더 컨테이너 */}
          <Box
            w="100%"
            borderRadius="20px"
            overflow="hidden"
            position="relative"
          >
            <Box
              display="flex"
              transform={`translateX(-${currentSlide * 100}%)`}
              transition="transform 0.6s ease-in-out"
              w={`${sliderData.length * 100}%`}
            >
              {sliderData.map((item) => (
                <Box key={item.id} w="100%" flexShrink={0}>
                  <SliderItem item={item} />
                </Box>
              ))}
            </Box>
          </Box>

          {/* 도트 인디케이터 */}
          <DotIndicator
            total={sliderData.length}
            current={currentSlide}
            onDotClick={handleDotClick}
          />
        </VStack>
      </Container>
    </Flex>
  )
}

export default Section6
