import { Flex, Text, VStack } from '@chakra-ui/react'

import {
  MagnifyingGlassIcon,
  NoneDocumentIcon,
} from '@/generated/icons/MyIcons'
import { MY_IMAGES } from '@/generated/path/images'

import ImageAsNext from './ImageAsNext'

interface NonDataProps {
  variant?: 'search' | 'default' | 'faq' | 'loan'
}

export default function NonData({ variant = 'default' }: NonDataProps) {
  return (
    <Flex
      h={'400px'}
      w={'100%'}
      bg={'background.basic.2'}
      justifyContent={'center'}
      alignItems={'center'}
      gap={'16px'}
      flexDir={'column'}
    >
      {variant === 'search' && (
        <VStack gap={'20px'}>
          <MagnifyingGlassIcon color={'grey.2'} boxSize={'90px'} />
          <Text textStyle={'pre-heading-3'} color={'grey.4'}>
            검색 결과가 없어요
          </Text>
        </VStack>
      )}
      {variant === 'default' && (
        <VStack gap={'20px'}>
          <MagnifyingGlassIcon color={'grey.2'} boxSize={'90px'} />
          <Text textStyle={'pre-heading-3'} color={'grey.4'}>
            아직 작성된 글이 없어요
          </Text>
        </VStack>
      )}
      {variant === 'faq' && (
        <VStack gap={'20px'}>
          <MagnifyingGlassIcon color={'grey.2'} boxSize={'90px'} />
          <Text textStyle={'pre-heading-3'} color={'grey.4'}>
            등록된 자주묻는 질문이 없어요
          </Text>
        </VStack>
      )}
      {variant === 'loan' && (
        <VStack gap={'20px'}>
          <ImageAsNext
            src={MY_IMAGES.NONE_DOCUMENT.src}
            alt="none_document"
            boxSize={'90px'}
          />
          {/* <NoneDocumentIcon color={'grey.2'} boxSize={'90px'} /> */}
          <Text textStyle={'pre-heading-3'} color={'grey.4'}>
            대출 계약이 없어요
          </Text>
        </VStack>
      )}
      {/* <MagnifyingGlassIcon color={'grey.2'} boxSize={'90px'} />
      <Text textStyle={'pre-heading-3'} color={'grey.4'}>
        검색 결과가 없어요
      </Text> */}
    </Flex>
  )
}
