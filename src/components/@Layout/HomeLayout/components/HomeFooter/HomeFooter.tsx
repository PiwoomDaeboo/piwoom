import { useRouter } from 'next/router'

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

// Footer 버튼 데이터 배열
const footerButtons = [
  {
    key: 'PRIVACY_POLICY',
    label: '개인정보처리방침',
  },
  {
    key: 'LOAN_STANDARD_TERMS',
    label: '대부거래 표준약관',
  },
  {
    key: 'TERMS_OF_SERVICE',
    label: '서비스 이용약관',
  },
  {
    key: 'DEBT_COLLECTION_PROCEDURE',
    label: '채권추심 업무처리절차',
  },
  {
    key: 'ILLEGAL_DEBT_COLLECTION_RESPONSE',
    label: '불법 채권추심 대응 요령',
  },
  {
    key: 'DEBT_COLLECTION_SUPPORT_SYSTEM',
    label: '채권추심 관련 지원제도 안내',
  },
  {
    key: 'EXTINCTION_DEBT_COLLECTION_NOTICE',
    label: '소멸시효 완성 채권추심 관련 안내',
  },
  {
    key: 'DEBT_COLLECTOR_OBLIGATIONS',
    label: '채권추심자의 의무와 추심에 관한 개인금융채무자의 권리',
  },
] as const

export default function HomeFooter({ ...props }: ContainerProps) {
  const router = useRouter()

  const handleButtonClick = (key: string) => {
    router.push(`/policy?type=${key.toLowerCase()}`)
  }
  return (
    <Flex
      bg={'grey.8'}
      w={'100%'}
      variant={'base'}
      flexDirection={'column'}
      {...props}
      pt={'40px'}
    >
      <Container pb={'40px'}>
        <LogoIcon w={'160px'} h={'32px'} />

        <VStack alignItems="flex-start" color={'grey.2'}>
          <Flex
            mt={'28px'}
            flexDir={{ base: 'column', md: 'row' }}
            alignItems={{ base: 'flex-start', sm: 'center' }}
            gap={{ base: '4px', md: '10px' }}
          >
            <Text textStyle="pre-body-6">대표이사 : 장윤석</Text>
            <Box w={'1px'} h={'16px'} bg={'grey.7'} />
            <Text textStyle="pre-body-6">대표번호 : 055-266-2686</Text>
            <Box w={'1px'} h={'16px'} bg={'grey.7'} />
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
          <Text mt={'40px'} color={'grey.5'}>
            Copyright(C) 2023 PIWOOM. ALL RIGHTS RESERVED.
          </Text>
        </VStack>
      </Container>
      <Box py={'20px'} borderTop={'1px solid'} borderColor={'grey.600'}>
        <Container>
          <Flex alignItems="center" flexWrap={'wrap'}>
            {footerButtons.map((button, index) => (
              <Box key={button.key} display="flex" alignItems="center">
                <Button
                  variant={'none'}
                  px={'12px'}
                  onClick={() => handleButtonClick(button.key)}
                >
                  <Text textStyle="pre-caption-1" color={'grey.0'}>
                    {button.label}
                  </Text>
                </Button>
                {index < footerButtons.length - 1 && (
                  <Box w={'1px'} h={'16px'} bg={'grey.7'} />
                )}
              </Box>
            ))}
          </Flex>
        </Container>
      </Box>
    </Flex>
  )
}
