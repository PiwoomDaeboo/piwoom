import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import {
  Badge,
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

import NonData from '@/components/NonData'
import { Pagination } from '@/components/pagination'
import { useNoticeListQuery } from '@/generated/apis/Notice/Notice.query'
import { MagnifyingGlassIcon } from '@/generated/icons/MyIcons'
import { formatDate } from '@/utils/date-format'

function Notice() {
  const router = useRouter()
  const { page = '1', search_keyword = '' } = router.query
  const [searchInput, setSearchInput] = useState('')

  const currentPage = Number(page)
  const postsPerPage = 5

  const { data: pinnedNoticeList } = useNoticeListQuery({
    variables: {
      query: {
        q: '',
        is_pinned: true,
        limit: postsPerPage,
        offset: (currentPage - 1) * postsPerPage,
      },
    },
  })
  const { data: noticeList } = useNoticeListQuery({
    variables: {
      query: {
        q: String(search_keyword),
        is_pinned: false,
        limit: postsPerPage,
        offset: (currentPage - 1) * postsPerPage,
      },
    },
  })

  useEffect(() => {
    setSearchInput(String(search_keyword))
  }, [search_keyword])

  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage

  const totalPages = Math.ceil((noticeList?.count || 0) / postsPerPage)

  const handlePageChange = (newPage: number) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: newPage,
      },
    })
  }

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push({
        pathname: router.pathname,
        query: {
          page: 1,
          search_keyword: searchInput,
        },
      })
    }
  }

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
              <Input
                placeholder="검색어를 입력해 주세요."
                pl={'48px'}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleSearch}
              />
            </InputGroup>
          </Flex>

          {/* {noticeList?.count === 0 && <NonData />} */}
          <Box w={'100%'} minH={'400px'}>
            {pinnedNoticeList?.results?.map((item, index) => (
              <Flex
                key={item.id}
                borderTop={'1px solid'}
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
                  <Badge bg="primary.4" color={'white'}>
                    공지사항
                  </Badge>
                  {/* <Text
                    display={{ base: 'none', sm: 'block' }}
                    w={'36px'}
                    textStyle={'pre-body-6'}
                    color={'grey.7'}
                  >
                    {index + 1}
                  </Text> */}
                  <Text
                    textStyle={item.title ? 'pre-body-3' : 'pre-body-4'}
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
                  {formatDate({ date: new Date(item.createdAt) })}
                </Text>
              </Flex>
            ))}
            {noticeList?.results?.map((item, index) => (
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
                  <Text
                    display={{ base: 'none', sm: 'block' }}
                    w={'36px'}
                    textStyle={'pre-body-6'}
                    color={'grey.7'}
                  >
                    {index + 1}
                  </Text>

                  <Text
                    textStyle={item.title ? 'pre-body-3' : 'pre-body-4'}
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
                  {formatDate({ date: new Date(item.createdAt) })}
                </Text>
              </Flex>
            ))}
          </Box>
          {(noticeList?.count ?? 0) > 0 && (
            <Flex justifyContent={'center'} mt={'48px'}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </Flex>
          )}
        </Flex>
      </Container>
    </>
  )
}
export default Notice
