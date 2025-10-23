import { useEffect, useMemo, useRef } from 'react'

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

import { gsap } from 'gsap'

import ImageAsNext from '@/components/ImageAsNext'
import { MY_IMAGES } from '@/generated/path/images'

// 마퀴 애니메이션 초기화 함수
const initMarquee = (marqueeElement: HTMLElement) => {
  const marqueeInner = marqueeElement.querySelector(
    '.marquee__inner',
  ) as HTMLElement

  if (!marqueeInner) return

  // 기존 애니메이션 정리
  gsap.killTweensOf(marqueeInner)

  // 컨텐츠 너비 계산
  const contentWidth = marqueeInner.scrollWidth
  const halfWidth = contentWidth / 2

  // 반응형에 따른 애니메이션 시간 계산
  const getDuration = () => {
    const width = window.innerWidth
    if (width < 480) return 5 // base: 5초
    if (width < 768) return 20 // sm: 20초
    return 30 // md 이상: 30초
  }

  // 초기 위치 설정
  gsap.set(marqueeInner, { x: 0 })

  // 무한 스크롤 애니메이션
  gsap.to(marqueeInner, {
    x: -halfWidth,
    duration: getDuration(),
    ease: 'none',
    repeat: -1,
  })
}

function CompanySection1() {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Timeline | null>(null)

  const imageData = useMemo(
    () => [
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
    ],
    [],
  )

  useEffect(() => {
    if (!marqueeRef.current) return

    const marquee = marqueeRef.current

    // 마퀴 애니메이션 초기화
    initMarquee(marquee)

    // 반응형 대응을 위한 리사이즈 이벤트
    const handleResize = () => {
      initMarquee(marquee)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      gsap.killTweensOf('.marquee__inner')
      window.removeEventListener('resize', handleResize)
    }
  }, [imageData])
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
          {/* 원본 + 복사본으로 끊김 없는 무한 루프 */}
          {[...imageData, ...imageData].map((data, index) => (
            <AspectRatio
              key={`${data.src}-${index}`}
              ratio={512 / 380}
              borderRadius={'20px'}
              w={{ base: '280px', sm: '320px', md: '400px', lg: '512px' }}
              flexShrink={0}
              mr={'32px'}
            >
              <ImageAsNext
                src={data.src}
                alt={data.alt}
                fill
                objectFit="cover"
                priority={index < 3} // 첫 3개 이미지는 우선 로딩
                loading={index < 3 ? 'eager' : 'lazy'}
              />
            </AspectRatio>
          ))}
        </Box>
      </Box>
    </Flex>
  )
}

export default CompanySection1
