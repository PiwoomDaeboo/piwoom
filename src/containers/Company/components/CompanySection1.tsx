import {
  AspectRatio,
  Box,
  Container,
  Flex,
  Grid,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'

import Card from '@/components/Card'
import ImageAsNext from '@/components/ImageAsNext'
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
import { MY_IMAGES } from '@/generated/path/images'

const imageData = [
  {
    src: MY_IMAGES.INTROIMAGE_1.src,
    alt: MY_IMAGES.INTROIMAGE_1.alt,
  },
  {
    src: MY_IMAGES.INTROIMAGE_2.src,
    alt: MY_IMAGES.INTROIMAGE_2.alt,
  },
  {
    src: MY_IMAGES.INTROIMAGE_3.src,
    alt: MY_IMAGES.INTROIMAGE_3.alt,
  },
  {
    src: MY_IMAGES.INTROIMAGE_4.src,
    alt: MY_IMAGES.INTROIMAGE_4.alt,
  },
  {
    src: MY_IMAGES.INTROIMAGE_5.src,
    alt: MY_IMAGES.INTROIMAGE_5.alt,
  },
  {
    src: MY_IMAGES.INTROIMAGE_6.src,
    alt: MY_IMAGES.INTROIMAGE_6.alt,
  },
  {
    src: MY_IMAGES.INTROIMAGE_7.src,
    alt: MY_IMAGES.INTROIMAGE_7.alt,
  },
]

function CompanySection1() {
  return (
    <Flex
      w={'100%'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDir={'column'}
      py={{ base: '16px', sm: '40px', md: '120px' }}
    >
      <Flex flexDir={'column'} alignItems={'center'} px={'16px'}>
        <Text textStyle={'pre-display-3'} textAlign={'center'}>
          소중한 순간들이
        </Text>
        <Text textStyle={'pre-display-3'} textAlign={'center'}>
          더 크게 피어날 수 있도록
        </Text>
      </Flex>
      <Text
        mt={'20px'}
        textStyle={'pre-body-4'}
        color={'grey.10'}
        textAlign={'center'}
      >
        피움대부 주식회사는 정부에 등록된 정식 대부업체로서
        <br />더 건강하고, 더 편안한 금융을 제공하고자 합니다.
      </Text>

      <Box w="100%" overflow="hidden" py={'45px'} position="relative">
        <Box
          display="flex"
          gap={'32px'}
          animation={{
            base: 'scrollLeft 5s linear infinite',
            md: 'scrollLeft 30s linear infinite',
          }}
          sx={{
            '@keyframes scrollLeft': {
              '0%': {
                transform: 'translateX(0)',
              },
              '100%': {
                transform: 'translateX(-100%)',
              },
            },
          }}
        >
          {/* 이미지를 두 번 렌더링하여 무한 스크롤 효과 구현 */}
          {[...imageData, ...imageData].map((data, index) => (
            <AspectRatio
              key={`${data.src}-${index}`}
              ratio={512 / 380}
              borderRadius={'20px'}
              minW={{ base: '280px', sm: '320px', md: '400px', lg: '512px' }}
              flexShrink={0}
            >
              <ImageAsNext
                src={data.src}
                alt={data.alt}
                fill
                objectFit="cover"
              />
            </AspectRatio>
          ))}
        </Box>
      </Box>
    </Flex>
  )
}

export default CompanySection1
