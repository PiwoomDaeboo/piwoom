import { useState } from 'react'

import { useRouter } from 'next/router'

import {
  Badge,
  Container,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from '@chakra-ui/react'

import NonData from '@/components/NonData'
import { Pagination } from '@/components/pagination'
import { MagnifyingGlassIcon } from '@/generated/icons/MyIcons'

// 공지사항 데이터 타입 정의
interface NoticeItem {
  id: number
  type: 'notice' | 'post'
  title: string
  date: string
  number?: number // 일반 게시글의 경우에만 번호
}

// 공지사항 데이터 배열
const noticeData: NoticeItem[] = [
  // 최상단 공지사항 3개
  {
    id: 1,
    type: 'notice',
    title: '피움대부 서비스 이용약관 개정 안내',
    date: '2025.01.15',
  },
  {
    id: 2,
    type: 'notice',
    title: '2025년 신년 대출 이벤트 안내',
    date: '2025.01.10',
  },
  {
    id: 3,
    type: 'notice',
    title: '피움대부 앱 업데이트 안내',
    date: '2025.01.05',
  },
  // 일반 게시글 5개 (1페이지)
  {
    id: 4,
    type: 'post',
    title: '대출 신청 절차 변경 안내',
    date: '2025.01.01',
    number: 5,
  },
  {
    id: 5,
    type: 'post',
    title: '고객센터 운영시간 변경 안내',
    date: '2024.12.28',
    number: 4,
  },
  {
    id: 6,
    type: 'post',
    title: '피움대부 신규 지점 오픈 안내',
    date: '2024.12.25',
    number: 3,
  },
  {
    id: 7,
    type: 'post',
    title: '대출 금리 변동 안내',
    date: '2024.12.20',
    number: 2,
  },
  {
    id: 8,
    type: 'post',
    title: '피움대부 홈페이지 리뉴얼 안내',
    date: '2024.12.15',
    number: 1,
  },
  // 추가 게시글들 (2페이지용)
  {
    id: 9,
    type: 'post',
    title: '개인정보 처리방침 개정 안내',
    date: '2024.12.10',
    number: 6,
  },
  {
    id: 10,
    type: 'post',
    title: '대출 상담 예약 시스템 도입',
    date: '2024.12.05',
    number: 7,
  },
  {
    id: 11,
    type: 'post',
    title: '피움대부 모바일 앱 출시',
    date: '2024.11.30',
    number: 8,
  },
  {
    id: 12,
    type: 'post',
    title: '대출 한도 상향 조정 안내',
    date: '2024.11.25',
    number: 9,
  },
  {
    id: 13,
    type: 'post',
    title: '피움대부 신규 상품 출시',
    date: '2024.11.20',
    number: 10,
  },
  // 추가 게시글들 (3페이지용)
  {
    id: 14,
    type: 'post',
    title: '고객 만족도 조사 결과 공개',
    date: '2024.11.15',
    number: 11,
  },
  {
    id: 15,
    type: 'post',
    title: '피움대부 연말 이벤트 안내',
    date: '2024.11.10',
    number: 12,
  },
  {
    id: 16,
    type: 'post',
    title: '대출 심사 기준 변경 안내',
    date: '2024.11.05',
    number: 13,
  },
  {
    id: 17,
    type: 'post',
    title: '피움대부 신규 지점 오픈',
    date: '2024.10.30',
    number: 14,
  },
  {
    id: 18,
    type: 'post',
    title: '온라인 대출 서비스 개선',
    date: '2024.10.25',
    number: 15,
  },
]

function Notice() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 5

  const notices = noticeData.filter((item) => item.type === 'notice')
  const posts = noticeData.filter((item) => item.type === 'post')

  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = posts.slice(startIndex, endIndex)

  const totalPages = Math.ceil(posts.length / postsPerPage)

  const displayData = [...notices, ...currentPosts]

  return (
    <>
      <Flex w={'100%'} h={'100%'} py={'60px'} bg={'primary.1'}>
        <Container>
          <VStack alignItems={'flex-start'} spacing={'8px'}>
            <Text textStyle={'pre-display-3'} color={'grey.10'}>
              공지사항
            </Text>
            <Text textStyle={'pre-body-4'} color={'grey.10'}>
              피움의 새로운 소식을 알려드려요.
            </Text>
          </VStack>
        </Container>
      </Flex>
      <Container>
        <Flex py={'32px'} flexDir={'column'}>
          <Flex justifyContent={{ base: 'center', sm: 'flex-end' }} mb={'20px'}>
            <InputGroup w={{ base: '100%', sm: '240px' }}>
              <InputLeftElement pointerEvents="none" pl={'12px'}>
                <MagnifyingGlassIcon color="grey.8" boxSize={'20px'} />
              </InputLeftElement>
              <Input placeholder="검색어를 입력해 주세요." pl={'48px'} />
            </InputGroup>
          </Flex>
          {/* <NonData /> */}

          {/* 공지사항 목록 렌더링 */}
          {displayData.map((item, index) => (
            <Flex
              key={item.id}
              borderTop={index === 0 ? '1px solid' : 'none'}
              borderBottom={'1px solid'}
              borderColor={'grey.2'}
              px={{ base: '0px', sm: '28px', md: '40px' }}
              py={{ base: '27px', sm: '30px' }}
              w={'100%'}
              justifyContent={'space-between'}
              _hover={{ bg: 'grey.1' }}
              cursor={'pointer'}
              onClick={() => router.push(`/notice/${item.id}`)}
            >
              <HStack gap={'32px'}>
                {item.type === 'notice' ?
                  <Badge variant={'solid'}>공지사항</Badge>
                : <Text
                    display={{ base: 'none', sm: 'block' }}
                    w={'36px'}
                    textStyle={'pre-body-6'}
                    color={'grey.7'}
                  >
                    {item.number}
                  </Text>
                }
                <Text
                  textStyle={
                    item.type === 'notice' ? 'pre-body-3' : 'pre-body-4'
                  }
                  color={'grey.10'}
                >
                  {item.title}
                </Text>
              </HStack>
              <Text
                display={{ base: 'none', sm: 'block' }}
                textStyle={'pre-body-8'}
                color={'grey.10'}
              >
                {item.date}
              </Text>
            </Flex>
          ))}
          <Flex justifyContent={'center'} mt={'48px'}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </Flex>
        </Flex>
      </Container>
    </>
  )
}
export default Notice
