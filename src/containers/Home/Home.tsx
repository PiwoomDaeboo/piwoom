import { useEffect, useState } from 'react'

import { Box, Center, Container, Flex, Image, Text } from '@chakra-ui/react'

import { Cube1Icon, Cube2Icon, Cube3Icon } from '@/generated/icons/MyIcons'
import { MY_IMAGES } from '@/generated/path/images'

import Section1 from './components/Section1'
import Section2 from './components/Section2'
import Section3 from './components/Section3'
import Section4 from './components/Section4'
import Section5 from './components/Section5'

function Home() {
  const [cubeIndex, setCubeIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCubeIndex((prevIndex) => (prevIndex + 1) % 3)
    }, 750)

    return () => clearInterval(interval)
  }, [])
  return (
    <Box>
      <Container w="100%" h={'100%'} borderRadius={'8px'} flexDir={'column'}>
        <Flex
          flexDir={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          w="100%"
          h="100%"
          px={{ base: '16px', sm: '30px', md: '60px' }}
        >
          <Text
            textStyle="rubik-regular"
            fontSize={{ base: '80px', md: '150px' }}
            lineHeight="100%"
          >
            MAKE IT
          </Text>
          <Text
            textStyle="rubik-regular"
            fontSize={{ base: '80px', md: '150px' }}
            lineHeight="100%"
          >
            Y
            <Box
              as="span"
              display="inline-block"
              position="relative"
              width="fit-content"
              height="fit-content"
              verticalAlign="middle" // 텍스트 정렬 유지
            >
              {[Cube1Icon, Cube2Icon, Cube3Icon].map((Icon, index) => (
                <Box
                  key={index}
                  as="span"
                  position="absolute"
                  top="-10px"
                  left="0"
                  opacity={cubeIndex === index ? 1 : 0}
                  display="inline-block"
                >
                  <Icon />
                </Box>
              ))}
              {/* 공간 유지를 위한 투명 아이콘 */}
              <Box
                as="span" // span으로 변경
                visibility="hidden"
                display="inline-block"
              >
                <Cube1Icon />
              </Box>
            </Box>
            URS
          </Text>
          <Flex w="100%" justifyContent={'flex-end'}>
            <Text textStyle="pre-heading-01">@MagiCube</Text>
          </Flex>
        </Flex>
        <Box w="100%" h="100%">
          <Section1 />
        </Box>
      </Container>
      <Box
        position="relative"
        w="100vw"
        left="50%"
        right="50%"
        ml="-50vw"
        mr="-50vw"
      >
        <Box maxW="1920px" mx="auto">
          <Box display={{ base: 'none', sm: 'none', md: 'block' }}>
            <Image
              w="100%"
              src={MY_IMAGES.BELT_IMAGE_PC.src}
              alt={MY_IMAGES.BELT_IMAGE_PC.alt}
            />
          </Box>
          <Box display={{ base: 'none', sm: 'block', md: 'none' }}>
            <Image
              w="100%"
              src={MY_IMAGES.BELT_IMAGE_TAB.src}
              alt={MY_IMAGES.BELT_IMAGE_TAB.alt}
            />
          </Box>
          <Box display={{ base: 'block', sm: 'none', md: 'none' }}>
            <Image
              w="100%"
              src={MY_IMAGES.BELT_IMAGE_MO.src}
              alt={MY_IMAGES.BELT_IMAGE_MO.alt}
            />
          </Box>
        </Box>
      </Box>
      <Container w="100%" h="100%">
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
      </Container>
    </Box>
  )
}
export default Home
