import { useRouter } from 'next/router'

import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'

import { PaperclipIcon } from '@/generated/icons/MyIcons'

const displayData = [
  {
    id: 9,
    title: '개인정보 처리방침 개정 안내',
    date: '2024.12.10',
    number: 6,
  },
  {
    id: 10,
    title: '대출 상담 예약 시스템 도입',
    date: '2024.12.05',
    number: 7,
  },
]

function NoticeDetail() {
  const router = useRouter()
  return (
    <>
      <Container>
        <Flex
          pt={{ base: '34px', sm: '72px', md: '80px' }}
          pb={{ base: '49px', sm: '102px' }}
          flexDir={'column'}
        >
          {/* 공지사항 목록 렌더링 */}
          <VStack
            borderBottom={'1px solid'}
            borderColor={'border.basic.1'}
            pb={'40px'}
            alignItems={'center'}
            spacing={'16px'}
          >
            <Text textStyle={'pre-body-6'}>2021.02.02</Text>
            <Text textStyle={'pre-display-4'}>불법사금융 피해 예방 안내</Text>
          </VStack>
          <Box py={'56px'} minH={'473px'}></Box>
          <Flex pb={'56px'} gap={'40px'}>
            <Text textStyle={'pre-body-5'} color={'grey.10'}>
              첨부파일
            </Text>
            <HStack
              gap={'8px'}
              as={'a'}
              cursor={'pointer'}
              onClick={() => alert('첨부파일 다운로드')}
            >
              <PaperclipIcon boxSize={'16px'} />
              <Text>파일명.mp4</Text>
            </HStack>
          </Flex>
          {displayData.map((item, index) => (
            <Flex
              key={item.id}
              borderTop={index === 0 ? '1px solid' : 'none'}
              borderBottom={'1px solid'}
              borderColor={'grey.2'}
              py={{ base: '27px', sm: '27px' }}
              w={'100%'}
              justifyContent={'space-between'}
              _hover={{ bg: 'grey.1' }}
              cursor={'pointer'}
            >
              <HStack gap={'56px'}>
                <Text
                  display={{ base: 'none', sm: 'block' }}
                  textStyle={'pre-body-5'}
                  color={'grey.10'}
                >
                  {item.number > 6 ? '이전글' : '다음글'}
                </Text>

                <Text textStyle={'pre-body-4'} color={'grey.10'}>
                  {item.title}
                </Text>
              </HStack>
            </Flex>
          ))}
          <Flex justifyContent={'center'} mt={'40px'}>
            <Button
              variant={'solid-primary'}
              w={'160px'}
              size={'lg'}
              onClick={() => router.back()}
            >
              목록
            </Button>
          </Flex>
        </Flex>
      </Container>
    </>
  )
}
export default NoticeDetail
