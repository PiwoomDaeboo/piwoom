import { useState } from 'react'

import { useRouter } from 'next/router'

import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from '@chakra-ui/react'

import InputForm from '@/components/InputForm'
import {
  BluecheckIcon,
  LoancompletepersonIcon,
} from '@/generated/icons/MyIcons'

function RepaymentApplication() {
  const router = useRouter()

  return (
    <Container>
      <Flex
        pt={{ base: '40px', sm: '48px', md: '80px' }}
        py={{ base: '83px', sm: '155px', md: '120px' }}
        flexDir={'column'}
        gap={'32px'}
      >
        <VStack alignItems={'flex-start'} spacing={'8px'}>
          <Text textStyle={'pre-heading-2'} color={'grey.10'}>
            중도상환 신청
          </Text>
          <Text textStyle={'pre-body-6'} color={'grey.7'}>
            남은 대출금에서 상환할 금액을 신청합니다.
          </Text>
        </VStack>
        <VStack
          p={{ base: '28px 20px', sm: '40px ', md: '40px 64px' }}
          w={'100%'}
          boxShadow={'0 8px 50px 0 rgba(0, 46, 114, 0.10)'}
          borderRadius={'32px'}
          bg={'grey.0'}
          alignItems={'flex-start'}
        >
          <Box
            w={'100%'}
            pb={'10px'}
            borderBottom={'1px solid'}
            borderColor={'border.basic.1'}
            mb={{ base: '28px', sm: '32px' }}
          >
            <Text textStyle={'pre-heading-2'} color={'grey.10'}>
              얼마를 갚을까요?
            </Text>
          </Box>
          <InputForm label={'금액 입력'} isRequired={true}>
            <InputGroup>
              <Input
                placeholder="0"
                type="number"
                textAlign="right"
                dir="rtl"
                pr="50px"
              />
              <InputRightElement>
                <Text>원</Text>
              </InputRightElement>
            </InputGroup>
          </InputForm>
          <HStack mt={'12px'} w={'100%'} justifyContent={'space-between'}>
            <VStack
              alignItems={'flex-start'}
              justifyContent={'center'}
              gap={'0px'}
            >
              <Text textStyle={'pre-caption-2'} color={'grey.7'}>
                남은 대출금
              </Text>
              <Text textStyle={'pre-heading-2'} color={'grey.10'}>
                <Box as={'span'} color={'primary.3'}>
                  10,000,000
                </Box>
                원
              </Text>
            </VStack>
            <Button variant={'text-primary'}>
              <Text textStyle={'pre-body-7'} color={'grey.8'}>
                전액 입력
              </Text>
            </Button>
          </HStack>
          <Flex
            mt={'20px'}
            mb={{ base: '28px', sm: '32px', md: '40px' }}
            p={'20px 32px'}
            w={'100%'}
            borderRadius={'12px'}
            border={'1px solid'}
            borderColor={'border.basic.1'}
            justifyContent={'space-between'}
            flexDir={'row'}
          >
            <VStack alignItems={'flex-start'} spacing={'8px'}>
              <Text textStyle={'pre-body-68'} color={'grey.7'}>
                원금
              </Text>
              <Text textStyle={'pre-body-68'} color={'grey.7'}>
                이자
              </Text>
              <Text textStyle={'pre-body-68'} color={'grey.7'}>
                중도상환 수수료
              </Text>
            </VStack>
            <VStack alignItems={'flex-end'} spacing={'8px'}>
              <Text textStyle={'pre-body-68'} color={'grey.7'}>
                원금
              </Text>
              <Text textStyle={'pre-body-68'} color={'grey.7'}>
                이자
              </Text>
              <Text textStyle={'pre-body-68'} color={'grey.7'}>
                중도상환 수수료
              </Text>
            </VStack>
          </Flex>
          <Flex w={'100%'} justifyContent={'center'}>
            <Button
              variant={'solid-primary'}
              onClick={() => router.push('/my-loan-status')}
            >
              다음
            </Button>
          </Flex>
        </VStack>
      </Flex>
    </Container>
  )
}
export default RepaymentApplication
