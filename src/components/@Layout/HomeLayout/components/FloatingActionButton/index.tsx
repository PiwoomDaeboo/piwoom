import { Flex, Text, VStack } from '@chakra-ui/react'

import {
  ArrowLineUpIcon,
  KakaotalkIcon,
  PhoneIcon,
} from '@/generated/icons/MyIcons'

export default function FloatingActionButton() {
  return (
    <VStack
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
        onClick={() => {
          window.open('tel:055-266-2686', '_blank')
        }}
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
