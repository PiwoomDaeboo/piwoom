import { useState } from 'react'

import { useRouter } from 'next/router'

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from '@chakra-ui/react'

import { Pagination } from '@/components/pagination'
import { useFaqListQuery } from '@/generated/apis/Faq/Faq.query'
import { CaretDownIcon, MagnifyingGlassIcon } from '@/generated/icons/MyIcons'

// 공지사항 데이터 타입 정의
interface NoticeItem {
  id: number
  type: 'notice' | 'post'
  title: string
  date: string
  number?: number // 일반 게시글의 경우에만 번호
  answer: string
}

function MyLoan() {
  return (
    <>
      <Flex w={'100%'} h={'100%'} py={'16px'} bg={'background.basic.2'}>
        <Container>
          <Flex gap={'16px'} justifyContent={'center'} alignItems={'center'}>
            <HStack>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                w={'32px'}
                h={'32px'}
                bg={'primary.3'}
                borderRadius={'100%'}
              >
                <Text color="white">1</Text>
              </Box>
              <Text textStyle={'pre-body-4'} color={'primary.4'}>
                본인인증
              </Text>
            </HStack>
            <HStack>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                w={'32px'}
                h={'32px'}
                bg={'background.basic.4'}
                borderRadius={'100%'}
              >
                <Text color="white">2</Text>
              </Box>
              <Text textStyle={'pre-body-4'} color={'grey.5'}>
                전자계약 리스트
              </Text>
            </HStack>
            <HStack>
              <Box
                w={'32px'}
                h={'32px'}
                bg={'background.basic.4'}
                borderRadius={'100%'}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Text color="white">3</Text>
              </Box>
              <Text textStyle={'pre-body-4'} color={'grey.5'}>
                계약정보 확인 및 본인 인증
              </Text>
            </HStack>
            <HStack>
              <Box
                w={'32px'}
                h={'32px'}
                bg={'background.basic.4'}
                borderRadius={'100%'}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Text color="white">4</Text>
              </Box>
              <Text textStyle={'pre-body-4'} color={'grey.5'}>
                전자계약서 확인
              </Text>
            </HStack>
          </Flex>
        </Container>
      </Flex>
      <Container>
        <Flex py={'32px'} flexDir={'column'}>
          <VStack alignItems={'flex-start'}>
            <Text textStyle={'pre-heading-2'} color={'grey.10'}>
              전자계약 작성하기
            </Text>
            <Text textStyle={'pre-body-6'} color={'grey.7'}>
              대출계약 리스트 확인을 위해 아래의 인증을 진행해 주세요.
            </Text>
          </VStack>
          <VStack alignItems={'flex-start'}>
            <Text my={'16px'} textStyle={'pre-body-6'} color={'primary.7'}>
              본인인증
            </Text>
            <Flex
              w={'100%'}
              flexDir={'column'}
              p={'20px'}
              bg={'background.basic.2'}
              borderRadius={'10px'}
              gap={'24px'}
            >
              <VStack alignItems={'flex-start'}>
                <Text textStyle={'pre-heading-4'} color={'primary.4'}>
                  [대출안내]
                </Text>
                <Text>
                  대출 승인이 난 경우, 전자계약서 작성이 완료되어야 대출금
                  송금이 가능합니다.
                  <br />
                  일정 기한 내 전자계약서 작성이 완료되지 않을 경우, 해당 대출
                  건은 취소 처리될 수 있습니다.
                </Text>
              </VStack>
              <VStack alignItems={'flex-start'}>
                <Text textStyle={'pre-heading-4'} color={'primary.4'}>
                  [전자계약 안내]
                </Text>
                <Text>
                  피움대부와의 대출 계약은 국내 1위 전자서명 솔루션 업체인
                  모두싸인을 통해 이루어집니다.
                  <br />
                  전자문서 및 전자서명은 각각 전자문서및전자거래기본법 제4조와
                  전자서명법 제3조 등에 따라 법적 효력을 가집니다.
                  <br />
                  대출 계약서에 입력되는 전자서명은 반드시 당사자의 약정(동의)
                  후 입력됩니다.
                </Text>
              </VStack>
            </Flex>
            <Flex w={'100%'} justifyContent={'center'} mt={'24px'}>
              <Button
                onClick={() => {
                  alert('본인인증 진행 준비중입니다.')
                }}
                variant={'solid-primary'}
              >
                본인인증 진행
              </Button>
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </>
  )
}
export default MyLoan
