import {
  Box,
  Container,
  ContainerProps,
  Flex,
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
        <LogoIcon w={'160px'} h={'32px'} />
        <Flex w={'100%'} alignItems={'center'} mt={'35px'}>
          <VStack alignItems="flex-start" color={'grey.2'} w={'50%'}>
            <Text textStyle="pre-body-6">대표이사 : 장윤석</Text>
            <Text textStyle="pre-body-6">대표번호 : 000-000-0000</Text>
            <Text textStyle="pre-body-6">E-mail : webmaster@piwoom.com</Text>
            <Text textStyle="pre-body-6">등록기관 : 금융감독원(1332)</Text>
          </VStack>
          <VStack alignItems="flex-start" color={'grey.2'} w={'50%'}>
            <Text textStyle="pre-body-6">본점</Text>
            <Text textStyle="pre-body-6">
              주소 : 서울특별시 중구 소공로 109 3층(소공동, 소공동 한화빌딩)
            </Text>
            <Text textStyle="pre-body-6">사업자번호 : 213-81-03413</Text>
          </VStack>
        </Flex>
        <Text mt={'48px'} py={'20px'} color={'grey.5'}>
          Copyright(C) 2023 PIWOOM. ALL RIGHTS RESERVED.
        </Text>
      </Container>
    </Flex>
  )
}
