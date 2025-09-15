import { Flex, Text } from '@chakra-ui/react'

import { MagnifyingGlassIcon } from '@/generated/icons/MyIcons'

interface NonDataProps {
  variant?: 'search' | 'default' | 'faq'
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
        <>
          <MagnifyingGlassIcon color={'grey.2'} boxSize={'90px'} />
          <Text textStyle={'pre-heading-3'} color={'grey.4'}>
            검색 결과가 없어요
          </Text>
        </>
      )}
      {variant === 'default' && (
        <>
          <MagnifyingGlassIcon color={'grey.2'} boxSize={'90px'} />
          <Text textStyle={'pre-heading-3'} color={'grey.4'}>
            아직 작성된 글이 없어요
          </Text>
        </>
      )}
      {variant === 'faq' && (
        <>
          <MagnifyingGlassIcon color={'grey.2'} boxSize={'90px'} />
          <Text textStyle={'pre-heading-3'} color={'grey.4'}>
            등록된 자주묻는 질문이 없어요
          </Text>
        </>
      )}
      {/* <MagnifyingGlassIcon color={'grey.2'} boxSize={'90px'} />
      <Text textStyle={'pre-heading-3'} color={'grey.4'}>
        검색 결과가 없어요
      </Text> */}
    </Flex>
  )
}
