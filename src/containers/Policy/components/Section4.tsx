import { Button, Container, Flex, Text, VStack } from '@chakra-ui/react'

import { MY_IMAGES } from '@/generated/path/images'

const Section4 = () => {
  return (
    <>
      <Container
        display={{ base: 'none', md: 'block' }}
        pb={{ base: '56px', sm: '64px' }}
      >
        <Flex
          py={'56px'}
          bgImage={MY_IMAGES.CONSULTING_IMAGE.src}
          bgSize={'cover'}
          borderRadius={'20px'}
          px={'80px'}
        >
          <VStack alignItems={'flex-start'}>
            <Text textStyle={'pre-heading-1'}>
              법인 대출 혹은 사업자 대출이 필요한 경우
            </Text>
            <Text textStyle={'pre-body-3'}>
              성장 기회를 포착하셨나요? 지금 바로 상담을 신청해보세요.
            </Text>
            <Button
              mt={'24px'}
              variant={'black-primary'}
              minW={'180px'}
              minH={'48px'}
            >
              상담하기
            </Button>
          </VStack>
        </Flex>
      </Container>
      <Flex
        mb={'56px'}
        w={'100%'}
        display={{ base: 'flex', md: 'none' }}
        bgImage={MY_IMAGES.CONSULTING_IMAGE_MO.src}
        bgSize={'cover'}
        py={'56px'}
      >
        <Container>
          <VStack alignItems={'flex-start'}>
            <Text textStyle={'pre-heading-1'} color={'grey.9'}>
              법인 대출 혹은 사업자 대출이 필요한 경우
            </Text>
            <Text textStyle={'pre-body-3'}>
              성장 기회를 포착하셨나요? 지금 바로 상담을 신청해보세요.
            </Text>
            <Button variant={'black-primary'} minW={'180px'} minH={'48px'}>
              상담하기
            </Button>
          </VStack>
        </Container>
      </Flex>
    </>
  )
}

export default Section4
