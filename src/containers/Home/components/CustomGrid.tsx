import React, { useEffect, useRef } from 'react'

import { Box, Flex, VStack } from '@chakra-ui/react'

import gsap from 'gsap'

const MugGallery = () => {
  const boxRefs = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 각 박스에 대해 애니메이션 설정
    if (boxRefs.current) {
      // 무한 반복 애니메이션 생성
      gsap.to(boxRefs.current, {
        rotation: -5, // 15도 회전
        duration: 0.5, // 2초 동안
        // ease: 'power1.inOut', // 부드러운 움직임
        yoyo: true, // 왕복 애니메이션
        repeat: -1, // 무한 반복
      })
    }

    // 컴포넌트 언마운트 시 애니메이션 정리
    return () => {
      if (boxRefs.current) {
        gsap.killTweensOf(boxRefs.current)
      }
    }
  }, [])

  return (
    <Box
      w="100%"
      display="flex"
      justifyContent="center"
      h={{ base: '500px', sm: '600px', md: '765px' }} // 모바일 높이 조정
      pt={{ base: '40px', sm: '60px', md: '80px' }} // 패딩 반응형 조정
      pb={{ base: '40px', sm: '80px', md: '140px' }} // 패딩 반응형 조정
    >
      <Flex w="100%" h="100%" gap={{ base: '10px', md: '30px' }}>
        <VStack
          gap={{ base: '10px', md: '30px' }}
          mt={{ base: '40px', sm: '60px', md: '100px' }} // 상단 마진 반응형
          w="100%"
          alignItems="flex-end"
        >
          <Box
            ref={boxRefs}
            w="80%"
            h={{ base: '150px', sm: '250px', md: '370px' }}
            borderRadius="10px"
            bg="red"
            transformOrigin="center center" // 회전 중심점 설정
          />
          <Box
            w="100%"
            h={{ base: '100px', sm: '180px', md: '260px' }}
            borderRadius="10px"
            bg="blue"
          />
        </VStack>
        <VStack gap={{ base: '10px', md: '30px' }} w="100%" h="100%">
          <Box w="100%" h="100%" borderRadius="10px" bg="red" />
          <Flex gap={{ base: '10px', md: '30px' }} w="100%" h="100%">
            <Box
              w="100%"
              h={{ base: '30px', sm: '80%', md: '200px' }}
              borderRadius="10px"
              bg="blue"
            />
            <Box
              w="100%"
              h={{ base: '80px', sm: '100%', md: '100%' }}
              borderRadius="10px"
              bg="red"
            />
          </Flex>
        </VStack>
        <VStack
          w="100%"
          gap={{ base: '10px', md: '30px' }}
          mt={{ base: '40px', sm: '60px', md: '100px' }}
          alignItems="flex-start"
        >
          <Box
            w="80%"
            h={{ base: '150px', sm: '250px', md: '370px' }}
            borderRadius="10px"
            bg="red"
          />
          <Box
            w="100%"
            h={{ base: '100px', sm: '180px', md: '260px' }}
            borderRadius="10px"
            bg="blue"
          />
        </VStack>
      </Flex>
    </Box>
  )
}

export default MugGallery
