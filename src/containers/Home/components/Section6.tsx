import { useEffect, useState } from 'react'

import {
  Box,
  Container,
  Flex,
  HStack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'

import Slider from 'react-slick'

import YoutubeVideoModal from '@/components/@Modal/YoutubeVideoModal'
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
    icon: <Slider1Icon boxSize={{ base: '100px', md: '240px' }} />,
    link: 'https://www.youtube.com/watch?v=qwYIff48Bzw',
  },
  {
    id: 2,
    title: '모두가 알아야 할 보이스피싱 대응요령',
    subtitle: '보이스피싱, 알고 대비하면 막을 수 있어요.',
    contact: '',
    bgColor: '#E4E2FF',
    textColor: 'grey.800',
    icon: <Slider2Icon boxSize={{ base: '100px', md: '240px' }} />,
    link: 'https://www.youtube.com/watch?v=msPbJBlbJxY',
  },
  {
    id: 3,
    title: '보이스피싱 피해 예방법',
    subtitle: '수사기관 사칭 전화, 대면 요구는 의심해보세요.',
    contact: '',
    bgColor: '#F9F2E2',
    textColor: 'grey.800',
    icon: <Slider3Icon boxSize={{ base: '100px', md: '240px' }} />,
    link: 'https://www.youtube.com/watch?v=JSu3um1awPw',
  },
]

const SliderItem = ({ item }: { item: any }) => (
  <Box
    w="100%"
    h={{ base: '260px', md: '200px' }}
    bg={item.bgColor}
    borderRadius="20px"
    p="32px"
    flexShrink={0}
    minW="0"
    position="relative"
  >
    <Flex
      w="100%"
      h="100%"
      flexDir={{ base: 'column', md: 'row' }}
      justifyContent="space-between"
      alignItems="center"
    >
      <VStack alignItems="flex-start" spacing={{ base: '8px', md: '16px' }}>
        <Text textStyle={'pre-heading-1'} color={'grey.9'}>
          {item.title}
        </Text>
        <Text textStyle={'pre-body-4'} color={'grey.8'}>
          {item.subtitle}
        </Text>
      </VStack>

      <Box
        w={'100%'}
        display="flex"
        alignItems="center"
        justifyContent={{ base: 'flex-end', md: 'flex-end' }}
        borderRadius="16px"
      >
        {item.icon}
      </Box>
    </Flex>
  </Box>
)

function Section6() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { isOpen, onOpen, onClose } = useDisclosure()
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
      <YoutubeVideoModal
        isOpen={isOpen}
        onClose={onClose}
        link={sliderData[currentSlide].link}
      />
      <Container>
        <VStack spacing="0" w="100%">
          <Box w="100%" overflow="hidden" position="relative">
            <Slider {...settings}>
              {sliderData.map((item) => (
                <Box
                  key={item.id}
                  w="100%"
                  flexShrink={0}
                  onClick={onOpen}
                  cursor="pointer"
                >
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
