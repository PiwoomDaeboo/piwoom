import { Box, Container, Flex, HStack, Text } from '@chakra-ui/react'

const MyLoanProcess = ({ step }: { step: string }) => {
  return (
    <Flex w={'100%'} h={'100%'} py={'16px'} bg={'background.basic.2'}>
      <Container>
        <Flex gap={'16px'} justifyContent={'center'} alignItems={'center'}>
          <HStack>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              w={'20px'}
              h={'20px'}
              bg={step === '1' ? 'primary.3' : 'background.basic.4'}
              borderRadius={'100%'}
            >
              <Text textStyle={'pre-caption-1'} color="white">
                1
              </Text>
            </Box>
            <Text
              display={{ base: 'none', sm: 'block' }}
              textStyle={'pre-caption-1'}
              color={step === '1' ? 'primary.4' : 'grey.5'}
            >
              본인인증
            </Text>
          </HStack>
          <HStack>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              w={'20px'}
              h={'20px'}
              bg={step === '2' ? 'primary.3' : 'background.basic.4'}
              borderRadius={'100%'}
            >
              <Text textStyle={'pre-caption-1'} color="white">
                2
              </Text>
            </Box>
            <Text
              display={{ base: 'none', sm: 'block' }}
              textStyle={'pre-caption-1'}
              color={step === '2' ? 'primary.4' : 'grey.5'}
            >
              전자계약 리스트
            </Text>
          </HStack>
          <HStack>
            <Box
              w={'20px'}
              h={'20px'}
              bg={step === '3' ? 'primary.3' : 'background.basic.4'}
              borderRadius={'100%'}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Text textStyle={'pre-caption-1'} color="white">
                3
              </Text>
            </Box>
            <Text
              display={{ base: 'none', sm: 'block' }}
              textStyle={'pre-caption-1'}
              color={step === '3' ? 'primary.4' : 'grey.5'}
            >
              계약정보 확인 및 본인인증
            </Text>
          </HStack>
          <HStack>
            <Box
              w={'20px'}
              h={'20px'}
              bg={step === '4' ? 'primary.3' : 'background.basic.4'}
              borderRadius={'100%'}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Text textStyle={'pre-caption-1'} color="white">
                4
              </Text>
            </Box>
            <Text
              display={{ base: 'none', sm: 'block' }}
              textStyle={'pre-caption-1'}
              color={step === '4' ? 'primary.4' : 'grey.5'}
            >
              전자계약서 확인
            </Text>
          </HStack>
        </Flex>
      </Container>
    </Flex>
  )
}

export default MyLoanProcess
