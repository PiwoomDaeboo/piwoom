import { useEffect, useState } from 'react'

import { Button, Container, Flex, Text, VStack } from '@chakra-ui/react'

import { BluecheckIcon } from '@/generated/icons/MyIcons'

function MyLoanStep4() {
  useEffect(() => {
    const is_sign = localStorage.getItem('is_sign')
    if (is_sign) {
      localStorage.removeItem('is_sign')
    }
  }, [])

  return (
    <Container maxW={'768px'}>
      <Flex
        py={{ base: '48px', sm: '64px', md: '120px' }}
        flexDir={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={'36px'}
      >
        <VStack alignItems={'center'} w={'100%'}>
          <BluecheckIcon boxSize={'100px'} />
          <Text
            textStyle={'pre-heading-1'}
            color={'grey.10'}
            textAlign={'center'}
          >
            전자계약서 작성 완료
          </Text>
        </VStack>
        <Flex
          w={'100%'}
          p={'20px 24px'}
          justifyContent={'center'}
          alignItems={'center'}
          flexDir={'column'}
          gap={'24px'}
          borderRadius={'20px'}
          border={'1px solid'}
          borderColor={'border.basic.1'}
        >
          <Text textStyle={'pre-body-6'} color={'grey.9'} textAlign={'center'}>
            전자계약서 작성이 완료되었습니다.
            <br />
            피움대부에서 확인 후 고객님께 대출금액 송금을 위해 연락드릴
            예정입니다.
          </Text>
          <Button variant={'solid-primary'}>전자계약서 다운로드</Button>
        </Flex>
      </Flex>
    </Container>
  )
}
export default MyLoanStep4
