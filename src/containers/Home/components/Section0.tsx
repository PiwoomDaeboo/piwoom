import { Button, Container, Flex, Text, VStack } from '@chakra-ui/react'

import { MY_IMAGES } from '@/generated/path/images'

const Section0 = () => {
  return (
    <>
      <Flex
        w={'100%'}
        bgImage={{
          base: MY_IMAGES.MAIN_IMAGE_MO.src,
          sm: MY_IMAGES.MAIN_IMAGE_TAB.src,
          md: MY_IMAGES.MAIN_IMAGE_PC.src,
        }}
        bgSize={'cover'}
        py={'56px'}
      >
        <Container>
          <VStack alignItems={'flex-start'}>
            <Text
              textStyle={{ base: 'pre-display-4', md: 'pre-display-3' }}
              color={'grey.0'}
            >
              소중한 순간들이
            </Text>
            <Text
              textStyle={{ base: 'pre-display-4', md: 'pre-display-3' }}
              color={'grey.0'}
            >
              더 크게 피어날 수 있도록
            </Text>
            <Button
              variant={'solid-primary'}
              bg={'grey.0'}
              color={'primary.4'}
              minW={'180px'}
              minH={'48px'}
            >
              대출 신청하기
            </Button>
          </VStack>
        </Container>
      </Flex>
    </>
  )
}

export default Section0
