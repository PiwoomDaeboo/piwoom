import { useEffect, useState } from 'react'

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
  InputRightElement,
  Text,
  VStack,
} from '@chakra-ui/react'

import NonData from '@/components/NonData'
import { Pagination } from '@/components/pagination'
import { useFaqListQuery } from '@/generated/apis/Faq/Faq.query'
import { CaretDownIcon, MagnifyingGlassIcon } from '@/generated/icons/MyIcons'

function Faq() {
  const router = useRouter()
  const { page = '1', search_keyword = '' } = router.query
  const [searchInput, setSearchInput] = useState('')

  const currentPage = Number(page)
  const postsPerPage = 10

  const { data: faqList } = useFaqListQuery({
    variables: {
      query: {
        q: String(search_keyword),
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

  const totalPages = Math.ceil((faqList?.count || 0) / postsPerPage)

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
              <Input
                placeholder="검색어를 입력해 주세요."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleSearch}
                pl={'48px'}
              />
              <InputRightElement></InputRightElement>
            </InputGroup>
          </Flex>

          {faqList?.results?.length === 0 && <NonData variant="faq" />}
          <Box w={'100%'} minH={'400px'}>
            {faqList?.results?.map((item, index) => (
              <Accordion key={item.id} allowToggle>
                <AccordionItem
                  borderBottom={
                    index === (faqList?.results?.length || 0) - 1 ?
                      '1px solid'
                    : 'none'
                  }
                  borderColor={'grey.2'}
                >
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

                  <AccordionPanel bg={'background.basic.2'} p={'40px'}>
                    {item.answer}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            ))}
          </Box>
          {faqList?.count !== 0 && (
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
export default Faq
