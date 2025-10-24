import { useRouter } from 'next/router'

import { Box, Button, Container, Flex, Text, VStack } from '@chakra-ui/react'

import CommonSelect from '@/components/CommonSelect'
import InputForm from '@/components/InputForm'
import { LOAN_PURPOSE_OPTIONS } from '@/constants/loan'
import { MY_IMAGES } from '@/generated/path/images'
import { ROUTES } from '@/generated/path/routes'

const Section0 = () => {
  const router = useRouter()
  return (
    <>
      {/* <Container>
        <InputForm label="대출 용도">
          <Flex w={'100%'} gap={'8px'} flexDir={{ base: 'column', sm: 'row' }}>
            <VStack
              w={{ base: '100%', sm: '50%', md: '50%' }}
              alignItems={'flex-start'}
            >
              <Box w={'100%'}>
                <CommonSelect
                  placeholder="선택"
                  options={LOAN_PURPOSE_OPTIONS}
                  variant="outline"
                  data-field="purpose"
                />
              </Box>
            </VStack>
          </Flex>
        </InputForm>
      </Container> */}
      <Flex
        w={'100%'}
        bgImage={{
          base: MY_IMAGES.MAIN_IMAGE_MO.src,
          sm: MY_IMAGES.MAIN_IMAGE_TAB.src,
          md: MY_IMAGES.MAIN_IMAGE_PC.src,
        }}
        bgSize={'100% 100%'}
        bgRepeat={'no-repeat'}
        bgPosition={'center'}
        py={{ base: '40px', sm: '80px', md: '73px' }}
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
              mt={{ base: '14px', md: '32px' }}
              variant={'solid-secondary'}
              minW={'180px'}
              minH={'48px'}
              onClick={() => router.push(ROUTES.LOAN_MAIN)}
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
