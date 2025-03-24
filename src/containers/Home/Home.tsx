import { useEffect, useState } from 'react'

import { Box, Center, Flex, Grid, Image, Text, VStack } from '@chakra-ui/react'

import { Cube1Icon, Cube2Icon, Cube3Icon } from '@/generated/icons/MyIcons'

import Section1 from './components/Section1'
import Section3 from './components/Section3'
import Section4 from './components/Section4'

function Home() {
  const [cubeIndex, setCubeIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCubeIndex((prevIndex) => (prevIndex + 1) % 3)
    }, 2000)

    return () => clearInterval(interval)
  }, [])
  return (
    <Center
      w="100%"
      h={'100%'}
      borderRadius={'8px'}
      flexDir={'column'}
      gap={'20px'}
    >
      <Flex>
        <Flex
          flexDir={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          w="100%"
          h="100%"
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
              position="relative"
              width="fit-content"
              height="fit-content"
              display="inline-block"
            >
              <Box
                position="absolute"
                top="0"
                left="0"
                opacity={cubeIndex === 0 ? 1 : 0}
                transition="opacity 0.5s ease-in-out"
              >
                <Cube1Icon />
              </Box>
              <Box
                position="absolute"
                top="0"
                left="0"
                opacity={cubeIndex === 1 ? 1 : 0}
                transition="opacity 0.5s ease-in-out"
              >
                <Cube2Icon />
              </Box>
              <Box
                position="absolute"
                top="0"
                left="0"
                opacity={cubeIndex === 2 ? 1 : 0}
                transition="opacity 0.5s ease-in-out"
              >
                <Cube3Icon />
              </Box>
              {/* 보이지 않는 공간 유지를 위한 투명 아이콘 */}
              <Box visibility="hidden">
                <Cube1Icon />
              </Box>
            </Box>
            URS
          </Text>
          <Flex w="100%" justifyContent={'flex-end'}>
            <Text textStyle="pre-heading-01">@MagiCube</Text>
          </Flex>
        </Flex>
      </Flex>
      <Section1 />
      <Section3 />
      <Section4 />
    </Center>
  )
}
export default Home
