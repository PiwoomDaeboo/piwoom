import { Button, Container, Flex, Text, VStack } from '@chakra-ui/react'

import { MY_IMAGES } from '@/generated/path/images'

const Section4 = () => {
  return (
    <>
      <Container
        display={{ base: 'none', md: 'block' }}
        pb={{ base: '56px', sm: '96px' }}
      >
        <Flex
          py={'56px'}
          bgImage={MY_IMAGES.CONSULTING_IMAGE.src}
          objectFit={'contain'}
          bgSize={'cover'}
          bgPosition={'center'}
          borderRadius={'20px'}
          px={'80px'}
        >
          <VStack alignItems={'flex-start'}>
            <Text textStyle={'pre-heading-1'} color={'grey.9'}>
              법인 대출 혹은 사업자 대출이 필요한 경우
            </Text>
            <Text textStyle={'pre-body-3'} color={'grey.8'}>
              성장 기회를 포착하셨나요? 지금 바로 상담을 신청해보세요.
            </Text>
            <Button
              mt={'24px'}
              variant={'black-primary'}
              minW={'180px'}
              minH={'48px'}
              onClick={() => {
                window.open('http://pf.kakao.com/_xkxoben/chat', '_blank')
              }}
            >
              상담하기
            </Button>
          </VStack>
        </Flex>
      </Container>
      <Flex
        mb={'56px'}
        w={'100%'}
        display={{ base: 'none', sm: 'flex', md: 'none' }}
        bgImage={MY_IMAGES.CONSULTING_IMAGE_TAB.src}
        bgSize={'cover'}
        bgRepeat={'no-repeat'}
        bgPosition={'right'}
        py={'56px'}
      >
        <Container>
          <VStack alignItems={'flex-start'} gap={'4px'}>
            <Text textStyle={'pre-heading-1'} color={'grey.9'}>
              법인 대출 혹은 사업자 대출이 필요한 경우
            </Text>
            <Text textStyle={'pre-body-3'} color={'grey.8'}>
              성장 기회를 포착하셨나요? 지금 바로 상담을 신청해보세요.
            </Text>
            <Button
              mt={'24px'}
              onClick={() => {
                window.open('http://pf.kakao.com/_xkxoben/chat', '_blank')
              }}
              variant={'black-primary'}
              minW={'180px'}
              minH={'48px'}
            >
              상담하기
            </Button>
          </VStack>
        </Container>
      </Flex>
      <Flex
        mb={'56px'}
        w={'100%'}
        display={{ base: 'flex', sm: 'none' }}
        bgImage={MY_IMAGES.CONSULTING_IMAGE_MO.src}
        bgSize={'cover'}
        bgPosition={'center'}
        py={'56px'}
      >
        <Container>
          <VStack gap={'0px'} alignItems={'flex-start'}>
            <Text textStyle={'pre-heading-1'} color={'grey.9'}>
              법인 대출 혹은
              <br /> 사업자 대출이 필요한 경우
            </Text>
            <Text mt={'12px'} textStyle={'pre-body-3'} color={'grey.8'}>
              성장 기회를 포착하셨나요?
              <br />
              지금 바로 상담을 신청해보세요.
            </Text>
            <Button
              mt={'36px'}
              onClick={() => {
                window.open('http://pf.kakao.com/_xkxoben/chat', '_blank')
              }}
              variant={'black-primary'}
              minW={'180px'}
              minH={'48px'}
            >
              상담하기
            </Button>
          </VStack>
        </Container>
      </Flex>
    </>
  )
}

export default Section4
