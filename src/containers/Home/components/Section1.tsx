import React, { useEffect, useRef } from 'react'

import { Box, Flex, VStack } from '@chakra-ui/react'

const Section1 = () => {
  return (
    <Flex
      w="100%"
      justifyContent="center"
      h={{ base: '400px', sm: '600px', md: '765px' }}
      pt={{ base: '60px', sm: '60px', md: '80px' }}
      pb={{ base: '0px', sm: '80px', md: '140px' }}
      px={{ base: '0px', sm: '0px', md: '0px' }}
    >
      <Flex w="100%" h="100%" gap={{ base: '10px', md: '30px' }}>
        <VStack
          flex="1"
          // maxW="320px"
          gap={{ base: '10px', md: '30px' }}
          mt={{ base: '40px', sm: '60px', md: '100px' }}
          w="100%"
          alignItems="flex-end"
        >
          <Box
            w="80%"
            h={{ base: '150px', sm: '250px', md: '370px' }}
            bgImage={'/images/img01.gif'}
            bgSize="contain"
            bgRepeat="no-repeat"
            bgPosition="center"
          />
          <Box
            w="100%"
            h="100%"
            // h={{ base: '100px', sm: '180px', md: '260px' }}
            borderRadius="10px"
            bgImage={'/images/img04.png'}
            bgSize="contain"
            bgRepeat="no-repeat"
            bgPosition="center"
          />
        </VStack>
        <VStack flex="2" gap={{ base: '10px', md: '30px' }} w="100%" h="100%">
          <Box
            w="100%"
            h="100%"
            maxH="405px"
            borderRadius="10px"
            bgImage={'/images/img02.png'}
            bgSize="contain"
            bgRepeat="no-repeat"
            bgPosition="center"
          />
          <Flex gap={{ base: '10px', md: '30px' }} w="100%" h="70%">
            <Box
              w="100%"
              h={{ base: '30px', sm: '80%', md: '200px' }}
              bgImage={'/images/img05.gif'}
              bgSize="contain"
              bgRepeat="no-repeat"
              bgPosition="center"
            />
            <Box
              w="100%"
              h={{ base: '80px', sm: '100%', md: '100%' }}
              borderRadius="10px"
              bgImage={'/images/img06.png'}
              bgSize="contain"
              bgRepeat="no-repeat"
              bgPosition="center"
            />
          </Flex>
        </VStack>
        <VStack
          w="100%"
          flex="1"
          // maxW="320px"
          gap={{ base: '10px', md: '30px' }}
          mt={{ base: '40px', sm: '60px', md: '100px' }}
          alignItems="flex-start"
        >
          <Box
            w="100%"
            flex="1"
            h={{ base: '150px', sm: '250px', md: '370px' }}
            borderRadius="10px"
            bgImage={'/images/img03.gif'}
            bgSize={{ base: 'contain', sm: 'contain', md: 'contain' }}
            bgRepeat="no-repeat"
            bgPosition="center"
          />
          <Box
            w="100%"
            flex="1"
            h={{ base: '100px', sm: '180px', md: '260px' }}
            borderRadius="10px"
            bgImage={'/images/img07.png'}
            bgSize="contain"
            bgRepeat="no-repeat"
            bgPosition="center"
          />
        </VStack>
      </Flex>
    </Flex>
  )
}

export default Section1
