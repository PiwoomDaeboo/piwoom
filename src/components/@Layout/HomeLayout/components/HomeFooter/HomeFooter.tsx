import {
  Box,
  Button,
  Container,
  ContainerProps,
  Divider,
  Flex,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'

import { LogoIcon } from '@/generated/icons/MyIcons'

export default function HomeFooter({ ...props }: ContainerProps) {
  return (
    <Flex
      bg={'grey.8'}
      w={'100%'}
      variant={'base'}
      flexDirection={'column'}
      {...props}
      pt={'40px'}
    >
      <Container>
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <LogoIcon w={'160px'} h={'32px'} />

          <HStack alignItems="center" display={{ base: 'none', md: 'flex' }}>
            <Button variant={'none'}>
              <Text textStyle="pre-body-5" color={'grey.0'}>
                개인정보처리방침
              </Text>
            </Button>
            <Button variant={'none'}>
              <Text textStyle="pre-body-5" color={'grey.0'}>
                약관
              </Text>
            </Button>
          </HStack>
        </Flex>
        <Flex w={'100%'} mt={'35px'}>
          <VStack alignItems="flex-start" color={'grey.2'}>
            <Flex
              flexDir={{ base: 'column', md: 'row' }}
              alignItems="flex-start"
              gap={{ base: '4px', md: '10px' }}
            >
              <Text textStyle="pre-body-6">대표이사 : 장윤석</Text>
              <Divider orientation="vertical" bg={'grey.2'} />
              <Text textStyle="pre-body-6">대표번호 : 055-266-2686</Text>
              <Divider orientation="vertical" bg={'grey.2'} />
              <Text textStyle="pre-body-6">E-mail : official@piwoom.com</Text>
            </Flex>
            <Text>
              등록기관: 창원시 의창구청 경제교통과 생활경제팀(055-212-4414)
            </Text>
            <VStack mt={'28px'} alignItems="flex-start" color={'grey.2'}>
              <Text textStyle="pre-body-6">본점</Text>
              <Text textStyle="pre-body-6">
                주소 : 경상남도 창원시 의창구 용지로293번길 28, 304호
              </Text>
              <Text textStyle="pre-body-6">사업자번호 : 774-81-02942</Text>
            </VStack>
          </VStack>
        </Flex>
      </Container>
      <Box
        mt={'48px'}
        py={'20px'}
        borderTop={'1px solid'}
        borderColor={'grey.600'}
      >
        <Container>
          <Text color={'grey.5'}>
            Copyright(C) 2023 PIWOOM. ALL RIGHTS RESERVED.
          </Text>
        </Container>
      </Box>
    </Flex>
  )
}
