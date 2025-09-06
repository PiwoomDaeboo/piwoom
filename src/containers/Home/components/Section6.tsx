import { useEffect, useState } from 'react'

import { Box, Container, Flex, HStack, Text, VStack } from '@chakra-ui/react'

import Slider from 'react-slick'

import {
  Slider1Icon,
  Slider2Icon,
  Slider3Icon,
} from '@/generated/icons/MyIcons'

const sliderData = [
  {
    id: 1,
    title: '불법사채, 불법사금융 피해 예방',
    subtitle: '급할수록 조심! 급할수록 안전한 금융을 선택하세요.',
    contact: '1332',
    bgColor: '#F6E6EA',
    icon: <Slider1Icon boxSize={'240px'} />,
  },
  {
    id: 2,
    title: '모두가 알아야 할 보이스피싱 대응요령',
    subtitle: '보이스피싱, 알고 대비하면 막을 수 있어요.',
    contact: '',
    bgColor: '#E4E2FF',
    textColor: 'grey.800',
    icon: <Slider2Icon boxSize={'240px'} />,
  },
  {
    id: 3,
    title: '보이스피싱 피해 예방법',
    subtitle: '수사기관 사칭 전화, 대면 요구는 의심해보세요.',
    contact: '',
    bgColor: '#F9F2E2',
    textColor: 'grey.800',
    icon: <Slider3Icon boxSize={'240px'} />,
  },
]

const SliderItem = ({ item }: { item: any }) => (
  <Box
    w="100%"
    h="200px"
    bg={item.bgColor}
    borderRadius="20px"
    p="32px"
    flexShrink={0}
    minW="0"
    position="relative"
  >
    <Flex w="100%" h="100%" justifyContent="space-between" alignItems="center">
      <VStack alignItems="flex-start" spacing="16px">
        <Text textStyle={'pre-heading-1'} color={'grey.9'}>
          {item.title}
        </Text>
        <Text textStyle={'pre-body-4'} color={'grey.8'}>
          {item.subtitle}
        </Text>
      </VStack>

      {/* 우측 아이콘 영역 */}
      <Box
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

function Section6() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false,

    variableWidth: false,
    beforeChange: (oldIndex: number, newIndex: number) => {
      setCurrentSlide(newIndex)
    },
    appendDots: (dots: any) => (
      <Box
        position="absolute"
        bottom="20px"
        left="50%"
        transform="translateX(-50%)"
        w="100%"
      >
        <Box
          as="ul"
          display="flex"
          gap="8px"
          justifyContent="center"
          listStyleType="none"
          m="0"
          p="0"
          sx={{
            '& li': {
              listStyle: 'none',
              margin: '0',
              padding: '0',
              display: 'inline-block',
            },
          }}
        >
          {dots}
        </Box>
      </Box>
    ),
    customPaging: (i: number) => (
      <Box
        w="6px"
        h="6px"
        borderRadius="99%"
        bg={i === currentSlide ? '#003686' : 'rgba(255, 255, 255, 0.5)'}
        cursor="pointer"
        transition="all 0.3s"
      />
    ),
  }

  return (
    <Flex
      w="100%"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      py={{ base: '16px', sm: '40px', md: '96px' }}
    >
      <Container>
        <VStack spacing="0" w="100%">
          <Box w="100%" overflow="hidden" position="relative">
            <Slider {...settings}>
              {sliderData.map((item) => (
                <Box key={item.id} w="100%" flexShrink={0}>
                  <SliderItem item={item} />
                </Box>
              ))}
            </Slider>
          </Box>
        </VStack>
      </Container>
    </Flex>
  )
}

export default Section6
