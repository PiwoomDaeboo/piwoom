import { Button, Container, Flex, Text, VStack } from '@chakra-ui/react'

import { SecurityIcon } from '@/generated/icons/MyIcons'

function MyLoanAuthentication() {
  return (
    <Container px={{ base: 0, md: '190px' }}>
      <Flex
        w={'100%'}
        h={'100%'}
        p={{
          base: '28px 32px 40px 32px',
          sm: '28px 64px 40px 64px',
          md: '28px 64px 48px 64px',
        }}
        justifyContent={'center'}
        alignItems={'center'}
        flexDir={'column'}
        gap={'32px'}
        borderRadius={'32px'}
        bg={'grey.0'}
        boxShadow={'0 8px 50px 0 rgba(0, 46, 114, 0.10)'}
      >
        <VStack alignItems={'center'} spacing={'6px'}>
          <SecurityIcon boxSize={'94px'} />
          <Text textStyle={'pre-heading-1'} color={'grey.10'}>
            나의 대출 조회
          </Text>
          <Text textStyle={'pre-body-6'} color={'grey.9'}>
            고객님의 대출정보를 확인하기 위해 본인인증을 진행해 주세요.
          </Text>
        </VStack>
        <Flex w={'100%'} justifyContent={'center'} mt={'24px'}>
          <Button
            w={'200px'}
            onClick={() => {
              //  TODO : 본인인증모듈 연동
              console.log('본인인증 진행')
            }}
            variant={'solid-primary'}
            size={'lg'}
          >
            본인인증 진행
          </Button>
        </Flex>
      </Flex>
    </Container>
  )
}
export default MyLoanAuthentication
