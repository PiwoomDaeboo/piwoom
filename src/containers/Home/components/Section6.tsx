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
  Call1332Icon,
  Slider1Icon,
  Slider2Icon,
  Slider3Icon,
} from '@/generated/icons/MyIcons'

const sliderData = [
  {
    id: 1,
    title: '불법사채, 불법사금융\n 피해 예방',
    subtitle: '급할수록 조심! 급할수록 안전한 금융을\n 선택하세요.',
    contact: '1332',
    bgColor: '#F6E6EA',
    icon: <Slider1Icon boxSize={{ base: '100px', md: '240px' }} />,
    link: 'https://www.youtube.com/watch?v=qwYIff48Bzw',
  },
  {
    id: 2,
    title: '모두가 알아야 할\n 보이스피싱 대응요령',
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

const SliderItem = ({ item, onOpen }: { item: any; onOpen: () => void }) => (
  <Box
    w="100%"
    h={{ base: '260px', md: '200px' }}
    bg={item.bgColor}
    borderRadius="20px"
    p="32px"
    position="relative"
    onClick={(e) => {
      e.preventDefault()
      e.stopPropagation()
      onOpen()
    }}
    cursor="pointer"
    overflow="hidden"
    tabIndex={-1} // 포커스 비활성화
    sx={{
      '&:focus': {
        outline: 'none',
        boxShadow: 'none',
      },
    }}
  >
    <Flex
      w="100%"
      h="100%"
      flexDir={{ base: 'column', sm: 'row' }}
      justifyContent="space-between"
      alignItems={{ base: 'flex-start', sm: 'center' }}
    >
      <VStack alignItems="flex-start" spacing={{ base: '8px', md: '16px' }}>
        <Text
          textStyle={'pre-heading-1'}
          color={'grey.9'}
          whiteSpace={{ base: 'pre-line', sm: 'normal' }}
        >
          {item.title}
        </Text>
        <HStack gap={'12px'} display={{ base: 'none', sm: 'flex' }}>
          <Text
            textStyle={'pre-body-4'}
            color={'grey.8'}
            whiteSpace={{ base: 'pre-line', sm: 'normal' }}
          >
            {item.subtitle}
          </Text>
          {item.id === 1 && <Call1332Icon boxSize={'79px'} h={'28px'} />}
        </HStack>
        <HStack gap={'12px'} display={{ base: 'flex', sm: 'none' }}>
          <Text
            textStyle={'pre-body-4'}
            color={'grey.8'}
            whiteSpace={{ base: 'pre-line', sm: 'normal' }}
          >
            {item.subtitle}{' '}
            {item.id === 1 && <Call1332Icon boxSize={'79px'} h={'28px'} />}
          </Text>
        </HStack>
      </VStack>

      <Box
        display="flex"
        alignItems="center"
        w={{ base: '100%', sm: 'auto' }}
        justifyContent={{ base: 'flex-end', sm: 'center' }}
        flexShrink={0}
        ml={{ base: '0', md: '16px' }}
      >
        {item.icon}
      </Box>
    </Flex>
  </Box>
)

function Section6() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedSlideData, setSelectedSlideData] = useState<
    (typeof sliderData)[0] | null
  >(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isDragging, setIsDragging] = useState(false)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,

    variableWidth: false,
    beforeChange: (oldIndex: number, newIndex: number) => {
      setCurrentSlide(newIndex)
    },
    onSwipe: () => setIsDragging(true),
    onEdge: () => setIsDragging(false),
    afterChange: () => setIsDragging(false),
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

  const handleSlideClick = () => {
    setSelectedSlideData(sliderData[currentSlide])
    onOpen()
  }
  return (
    <Flex
      w="100%"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      pt={{ base: '56px', sm: '40px', md: '96px' }}
      pb={{ base: '56px', sm: '120px', md: '120px' }}
    >
      <YoutubeVideoModal
        isOpen={isOpen}
        onClose={onClose}
        link={selectedSlideData?.link || ''}
      />
      <Container>
        <VStack spacing="0" w="100%">
          <Box w="100%" overflow="hidden" position="relative">
            <Slider {...settings}>
              {sliderData.map((item) => (
                <Box key={item.id} w="100%">
                  <SliderItem item={item} onOpen={handleSlideClick} />
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
