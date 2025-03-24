import { Box, Center, Flex, Grid, Image, Text, VStack } from '@chakra-ui/react'

import Section1 from './components/Section1'

function Home() {
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
            YOURS
          </Text>
          <Flex w="100%" justifyContent={'flex-end'}>
            <Text textStyle="pre-heading-01">@MagiCube</Text>
          </Flex>
        </Flex>
      </Flex>
      <Section1 />
    </Center>
  )
}
export default Home
