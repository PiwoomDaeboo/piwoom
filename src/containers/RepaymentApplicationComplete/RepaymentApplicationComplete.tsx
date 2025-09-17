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
import { BluecheckIcon } from '@/generated/icons/MyIcons'

function RepaymentApplicationComplete() {
  const router = useRouter()

  return (
    <Container>
      <Flex
        // px={'160px'}
        pt={{ base: '48px', sm: '64px', md: '132px' }}
        py={{ base: '80px', sm: '91 px', md: '120px' }}
        flexDir={'column'}
        gap={'32px'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <BluecheckIcon boxSize={'96px'} />
        <Text textStyle={'pre-heading-1'} color={'grey.10'}>
          중도상환 신청 완료
        </Text>
        <Box w={'100%'} px={{ base: 0, sm: '74px', md: '160px' }}>
          <Flex
            p={{ base: '28px 20px', sm: '40px ', md: '24px 32px' }}
            w={'100%'}
            bg={'grey.1'}
            borderRadius={'12px'}
            flexDir={'column'}
            gap={'16px'}
          >
            <HStack
              pb={'16px'}
              borderBottom={'1px solid'}
              borderColor={'border.basic.1'}
              w={'100%'}
              justifyContent={'space-between'}
            >
              <Text textStyle={'pre-body-4'} color={'grey.10'}>
                입급은행
              </Text>
              <Text textStyle={'pre-body-3'} color={'grey.10'}>
                10,000,000원
              </Text>
            </HStack>
            <HStack
              pb={'16px'}
              borderBottom={'1px solid'}
              borderColor={'border.basic.1'}
              w={'100%'}
              justifyContent={'space-between'}
            >
              <Text textStyle={'pre-body-4'} color={'grey.10'}>
                예금주
              </Text>
              <Text textStyle={'pre-body-3'} color={'grey.10'}>
                10,000,000원
              </Text>
            </HStack>
            <HStack
              pb={'16px'}
              borderBottom={'1px solid'}
              borderColor={'border.basic.1'}
              w={'100%'}
              justifyContent={'space-between'}
            >
              <Text textStyle={'pre-body-4'} color={'grey.10'}>
                계좌번호
              </Text>
              <Text textStyle={'pre-body-3'} color={'grey.10'}>
                10,000,000원
              </Text>
            </HStack>
            <HStack
              pb={'16px'}
              borderBottom={'1px solid'}
              borderColor={'border.basic.1'}
              w={'100%'}
              justifyContent={'space-between'}
            >
              <Text textStyle={'pre-body-4'} color={'grey.10'}>
                납입금액
              </Text>
              <Text textStyle={'pre-body-3'} color={'grey.10'}>
                10,000,000원
              </Text>
            </HStack>
            <HStack
              borderColor={'border.basic.1'}
              w={'100%'}
              justifyContent={'space-between'}
            >
              <Text textStyle={'pre-body-4'} color={'grey.10'}>
                계약번호
              </Text>
              <Text textStyle={'pre-body-3'} color={'grey.10'}>
                10,000,000원
              </Text>
            </HStack>
          </Flex>
        </Box>
        <Flex
          p={{ base: '24px 20px', sm: '24px 64px' }}
          borderRadius={'12px'}
          border={'1px solid'}
          borderColor={'border.basic.1'}
        >
          <Text textStyle={'pre-body-6'} color={'grey.9'} textAlign={'center'}>
            피움대부 주식회사의 계좌로 중도상환 금액을 입금 부탁드립니다.
            <br /> 입금 확인이 끝난 이후, [나의 대출 조회 – 대출 정보 조회]
            페이지를 통해 대출금 잔액이 바뀐 걸 확인하실 수 있습니다.
          </Text>
        </Flex>
      </Flex>
    </Container>
  )
}
export default RepaymentApplicationComplete
