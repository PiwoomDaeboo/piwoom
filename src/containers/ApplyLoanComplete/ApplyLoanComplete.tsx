import { useState } from 'react'

import { useRouter } from 'next/router'

import { Box, Button, Container, Flex, Text, VStack } from '@chakra-ui/react'

import {
  BluecheckIcon,
  InfoIcon,
  Loan1Icon,
  LoancompletepersonIcon,
} from '@/generated/icons/MyIcons'

function ApplyLoanComplete() {
  const router = useRouter()

  return (
    <Container>
      <Flex
        py={{ base: '48px', sm: '64px', md: '120px' }}
        flexDir={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <VStack alignItems={'center'} w={'100%'}>
          <BluecheckIcon boxSize={'100px'} />
          <Text
            textStyle={'pre-heading-1'}
            color={'grey.10'}
            textAlign={'center'}
          >
            대출 신청이 완료되었습니다.
          </Text>
          <Text textStyle={'pre-body-6'} color={'grey.10'} textAlign={'center'}>
            문자 또는 카카오톡을 통해 심사 결과를 안내해드릴 예정입니다.
          </Text>
          <Box
            w={'100%'}
            h={{ base: '32px', sm: '40px' }}
            borderBottom={'1px dashed'}
            borderColor={'border.basic.1'}
          />
        </VStack>
        <Flex
          pt={'32px'}
          justifyContent={'center'}
          alignItems={'center'}
          flexDir={{ base: 'column', sm: 'row' }}
          position={'relative'}
        >
          <LoancompletepersonIcon boxSize={'100px'} />
          <Box position={'relative'}>
            {/* 말풍선 삼각형 */}
            <Box
              position={'absolute'}
              left={{ base: '50%', sm: '-8px' }}
              top={{ base: '-8px', sm: '50%' }}
              transform={{
                base: 'translateX(-50%)',
                sm: 'translateY(-50%)',
              }}
              width={'0'}
              height={'0'}
              borderLeft={{
                base: '8px solid transparent',
                sm: 'none',
              }}
              borderRight={{
                base: '8px solid transparent',
                sm: '8px solid var(--chakra-colors-primary-1)',
              }}
              borderTop={{
                base: 'none',
                sm: '8px solid transparent',
              }}
              borderBottom={{
                base: '8px solid var(--chakra-colors-primary-1)',
                sm: '8px solid transparent',
              }}
              zIndex={1}
            />
            <VStack
              spacing={'8px'}
              p={'16px'}
              bg={'primary.1'}
              borderRadius={'12px'}
              position={'relative'}
              zIndex={2}
            >
              <Text textStyle={'pre-body-7'} color={'grey.10'}>
                <strong>대출 승인 확률</strong>과 <strong>대출 한도</strong>를
                높이고 싶으신가요?
                <br />
                아래 버튼을 눌러 세금 납부 내역을 제출해보세요!
              </Text>
              <Button variant={'solid-primary'}>세금 납부 내역 제출</Button>
            </VStack>
          </Box>
        </Flex>
      </Flex>
    </Container>
  )
}
export default ApplyLoanComplete
