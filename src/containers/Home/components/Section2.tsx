import {
  Container,
  Flex,
  Grid,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'

import {
  PhoneCallFillIcon,
  ScrollFillIcon,
  SealCheckFillIcon,
  ShieldCheckeredFillIcon,
} from '@/generated/icons/MyIcons'

function Section2() {
  return (
    <Flex w={'100%'}>
      <Container>
        <Flex
          flexDirection={{ base: 'column', md: 'row' }}
          pt={'48px'}
          pb={{ base: '64px', sm: '64px', md: '96px' }}
          justifyContent={{ base: 'space-between', md: 'space-between' }}
          alignItems={{ base: 'flex-start', md: 'center' }}
        >
          <VStack
            mb={{ base: '48px', sm: '48px', md: '0px' }}
            alignItems={'flex-start'}
          >
            <Text textStyle={'pre-display-4'} color={'grey.10'}>
              피움만의 비대면 대출
            </Text>
            <Text textStyle={'pre-display-4'} color={'primary.3'}>
              더 쉽게, 더 유연하게
            </Text>
          </VStack>
          <SimpleGrid
            w={{ base: '100%', md: 'auto' }}
            columns={{ base: 1, sm: 2 }}
            rowGap={'20px'}
          >
            <Flex
              flex={{ base: 1, md: 'none' }}
              gap={'16px'}
              alignItems={'center'}
            >
              <Flex
                bg={'background.basic.1'}
                borderRadius={'99px'}
                justifyContent={'center'}
                alignItems={'center'}
                p={'8px'}
                boxShadow="0 4px 6px 0 rgba(0, 54, 134, 0.12);"
              >
                <ShieldCheckeredFillIcon boxSize={'24px'} />
              </Flex>
              <Text textStyle={'pre-heading-2'}>신용점수에 영향없는 대출</Text>
            </Flex>
            <Flex
              flex={{ base: 1, md: 'none' }}
              gap={'16px'}
              alignItems={'center'}
            >
              <Flex
                bg={'background.basic.1'}
                borderRadius={'99px'}
                justifyContent={'center'}
                alignItems={'center'}
                p={'8px'}
                boxShadow="0 4px 6px 0 rgba(0, 54, 134, 0.12);"
              >
                <ScrollFillIcon boxSize={'24px'} />
              </Flex>
              <Text textStyle={'pre-heading-2'}>
                귀찮은 서류 발급 필요 없어요
              </Text>
            </Flex>
            <Flex
              flex={{ base: 1, md: 'none' }}
              gap={'16px'}
              alignItems={'center'}
            >
              <Flex
                bg={'background.basic.1'}
                borderRadius={'99px'}
                justifyContent={'center'}
                alignItems={'center'}
                p={'8px'}
                boxShadow="0 4px 6px 0 rgba(0, 54, 134, 0.12);"
              >
                <PhoneCallFillIcon boxSize={'24px'} />
              </Flex>
              <Text textStyle={'pre-heading-2'}>전화상담은 원할 경우에만</Text>
            </Flex>
            <Flex
              flex={{ base: 1, md: 'none' }}
              gap={'16px'}
              alignItems={'center'}
            >
              <Flex
                bg={'background.basic.1'}
                borderRadius={'99px'}
                justifyContent={'center'}
                alignItems={'center'}
                p={'8px'}
                boxShadow="0 4px 6px 0 rgba(0, 54, 134, 0.12);"
              >
                <SealCheckFillIcon boxSize={'24px'} />
              </Flex>
              <Text textStyle={'pre-heading-2'}>
                DSR 등 규제가 적용되지 않아요
              </Text>
            </Flex>
          </SimpleGrid>
        </Flex>
      </Container>
    </Flex>
  )
}
export default Section2
