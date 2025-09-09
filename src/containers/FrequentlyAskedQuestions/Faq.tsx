import { useState } from 'react'

import { useRouter } from 'next/router'

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
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

// 공지사항 데이터 배열
const noticeData: NoticeItem[] = [
  // 일반 게시글 5개 (1페이지)
  {
    id: 4,
    type: 'post',
    title: '대출 신청 절차 변경 안내',
    date: '2025.01.01',
    number: 5,
    answer: '대출 신청 절차 변경 안내11',
  },
  {
    id: 5,
    type: 'post',
    title: '고객센터 운영시간 변경 안내',
    date: '2024.12.28',
    number: 4,
    answer: '고객센터 운영시간 변경 안내11',
  },
  {
    id: 6,
    type: 'post',
    title: '피움대부 신규 지점 오픈 안내',
    date: '2024.12.25',
    number: 3,
    answer: '피움대부 신규 지점 오픈 안내11',
  },
  {
    id: 7,
    type: 'post',
    title: '대출 금리 변동 안내',
    date: '2024.12.20',
    number: 2,
    answer: '대출 금리 변동 안내11',
  },
  {
    id: 8,
    type: 'post',
    title: '피움대부 홈페이지 리뉴얼 안내',
    date: '2024.12.15',
    number: 1,
    answer: '피움대부 홈페이지 리뉴얼 안내11',
  },
  // 추가 게시글들 (2페이지용)
  {
    id: 9,
    type: 'post',
    title: '개인정보 처리방침 개정 안내',
    date: '2024.12.10',
    number: 6,
    answer: '개인정보 처리방침 개정 안내11',
  },
  {
    id: 10,
    type: 'post',
    title: '대출 상담 예약 시스템 도입',
    date: '2024.12.05',
    number: 7,
    answer: '대출 상담 예약 시스템 도입11',
  },
]

function Faq() {
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

  const { data: faqList } = useFaqListQuery({
    variables: {
      query: {
        q: '',
        limit: (currentPage - 1) * postsPerPage,
        offset: 0,
      },
    },
  })

  return (
    <>
      <Flex w={'100%'} h={'100%'} py={'60px'} bg={'primary.1'}>
        <Container>
          <VStack alignItems={'flex-start'} spacing={'8px'}>
            <Text textStyle={'pre-display-3'} color={'grey.10'}>
              자주하는 질문
            </Text>
            <Text textStyle={'pre-body-4'} color={'grey.10'}>
              고객님들께서 가장 궁금해하시는 내용을 한 곳에 정리했습니다.
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

          {/* 공지사항 목록 렌더링 */}
          {faqList?.results?.map((item) => (
            <Accordion key={item.id} allowToggle>
              <AccordionItem>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <HStack alignItems={'center'} gap={'10px'}>
                      <Flex
                        boxSize={'32px'}
                        bg={'primary.3'}
                        borderRadius={'100%'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        flexShrink={0}
                      >
                        <Text textStyle={'pre-body-3'} color={'grey.0'}>
                          Q
                        </Text>
                      </Flex>
                      <Text textStyle={'pre-body-3'} color={'grey.10'}>
                        {item.question}
                      </Text>
                    </HStack>
                  </Box>
                  <CaretDownIcon
                    boxSize={'24px'}
                    color={'grey.8'}
                    ml={'20px'}
                  />
                </AccordionButton>

                <AccordionPanel>{item.answer}</AccordionPanel>
              </AccordionItem>
            </Accordion>
          ))}
          {faqList?.count !== 0 && (
            <Flex justifyContent={'center'} mt={'48px'}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </Flex>
          )}
        </Flex>
      </Container>
    </>
  )
}
export default Faq
