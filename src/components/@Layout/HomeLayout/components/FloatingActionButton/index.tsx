import { Flex, Text, VStack, useToast } from '@chakra-ui/react'

import {
  ArrowLineUpIcon,
  KakaotalkIcon,
  PhoneIcon,
} from '@/generated/icons/MyIcons'

export default function FloatingActionButton() {
  const toast = useToast()

  // PC 환경 감지 함수
  const isPC = () => {
    return !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )
  }

  // 전화 연결 처리 함수
  const handlePhoneCall = () => {
    if (isPC()) {
      // PC에서는 전화번호를 클립보드에 복사
      navigator.clipboard
        .writeText('055-266-2686')
        .then(() => {
          alert(
            '현재 PC 환경에서는 전화 연결 기능이 지원되지 않습니다.\n대표번호 [055-266-2686]으로 연락 주시면, 친절히 안내해드리겠습니다.',
          )
        })
        .catch(() => {
          alert(
            '현재 PC 환경에서는 전화 연결 기능이 지원되지 않습니다.\n대표번호 [055-266-2686]으로 연락 주시면, 친절히 안내해드리겠습니다.',
          )
        })
    } else {
      // 모바일에서는 전화 연결
      window.open('tel:055-266-2686', '_blank')
    }
  }
  return (
    <VStack
      zIndex={1000}
      spacing={'20px'}
      position={'fixed'}
      bottom={{ base: '20px', sm: '40px' }}
      right={{ base: '20px', md: '40px' }}
    >
      <Flex
        w={'60px'}
        h={'60px'}
        alignItems={'center'}
        justifyContent={'center'}
        flexDir={'column'}
        borderRadius={'full'}
        cursor={'pointer'}
        bg={'primary.3'}
        onClick={handlePhoneCall}
      >
        <PhoneIcon boxSize={'24px'} />
        <Text textStyle={'pre-caption-3'} color={'grey.0'}>
          전화상담
        </Text>
      </Flex>
      <Flex
        w={'60px'}
        h={'60px'}
        alignItems={'center'}
        justifyContent={'center'}
        flexDir={'column'}
        cursor={'pointer'}
        borderRadius={'full'}
        bg={'primary.4'}
        onClick={() => {
          window.open('http://pf.kakao.com/_xkxoben/chat', '_blank')
        }}
      >
        <KakaotalkIcon boxSize={'24px'} />
        <Text textStyle={'pre-caption-3'} color={'grey.0'}>
          카카오상담
        </Text>
      </Flex>
      <Flex
        w={'60px'}
        h={'60px'}
        alignItems={'center'}
        justifyContent={'center'}
        flexDir={'column'}
        borderRadius={'full'}
        cursor={'pointer'}
        bg={'grey.2'}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      >
        <ArrowLineUpIcon boxSize={'24px'} />
        <Text textStyle={'pre-caption-3'} color={'grey.9'}>
          TOP
        </Text>
      </Flex>
    </VStack>
  )
}
