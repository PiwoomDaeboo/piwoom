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
          <Box>
            <Text
              textStyle="rubik-regular"
              fontSize={{ base: '80px', sm: '150px', md: '200px' }}
              lineHeight="100%"
            >
              MAKE IT
            </Text>
            <Box position="relative">
              <Text
                textAlign="center"
                textStyle="rubik-regular"
                fontSize={{ base: '80px', sm: '150px', md: '200px' }}
                lineHeight="100%"
              >
                Y
                <Box
                  display="inline-block"
                  position="relative"
                  width="fit-content"
                  height="fit-content"
                  verticalAlign="middle"
                >
                  {[Cube1Icon, Cube2Icon, Cube3Icon].map((Icon, index) => (
                    <Box
                      key={index}
                      position="absolute"
                      top="-10px"
                      left="0"
                      opacity={cubeIndex === index ? 1 : 0}
                      display="inline-block"
                    >
                      <Icon />
                    </Box>
                  ))}
                  <Box visibility="hidden" display="inline-block">
                    <Cube1Icon />
                  </Box>
                </Box>
                URS
              </Text>
              <Flex w="100%" justifyContent={'flex-end'}>
                <Text
                  display={{ base: 'none', sm: 'block', md: 'block' }}
                  textStyle="pre-heading-02"
                >
                  @MagiCube
                </Text>
                <Text
                  display={{ base: 'block', sm: 'none', md: 'none' }}
                  textStyle="pre-heading-04"
                >
                  @MagiCube
                </Text>
              </Flex>
            </Box>
          </Box>
          <Box w="100%" h="100%">
            <Section1 />
          </Box>
        </Flex>
      </Container>
      <Box
        position="relative"
        w="100vw"
        left="50%"
        right="50%"
        ml="-51vw"
        mr="-51vw"
      >
        <Box maxW="100%" mx="auto">
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
