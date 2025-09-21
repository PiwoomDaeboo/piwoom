import { useState } from 'react'

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
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 5
  const { data: noticeList } = useNoticeListQuery({
    variables: {
      query: {
        q: '',
        is_pinned: true,
        limit: (currentPage - 1) * postsPerPage,
        offset: 0,
      },
    },
  })

  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage

  const totalPages = Math.ceil(noticeList?.count || 0 / postsPerPage)

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

          {noticeList?.count === 0 && <NonData />}
          <Box w={'100%'} minH={'400px'}>
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
