import { useCallback, useState } from 'react'

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

import { debounce } from 'lodash'

import NonData from '@/components/NonData'
import { Pagination } from '@/components/pagination'
import { useFaqListQuery } from '@/generated/apis/Faq/Faq.query'
import { CaretDownIcon, MagnifyingGlassIcon } from '@/generated/icons/MyIcons'

function Faq() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 5

  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage

  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  // Debounced search function using lodash
  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      setDebouncedSearch(value)
    }, 300),
    [],
  )

  // Update debounced search when search changes
  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch(value)
      debouncedSetSearch(value)
    },
    [debouncedSetSearch],
  )

  const { data: faqList } = useFaqListQuery({
    variables: {
      query: {
        q: debouncedSearch,
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
              <Input
                placeholder="검색어를 입력해 주세요."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                pl={'48px'}
              />
              <InputRightElement></InputRightElement>
            </InputGroup>
          </Flex>

          {faqList?.results?.length === 0 && <NonData variant="faq" />}
          <Box w={'100%'} minH={'400px'}>
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
          </Box>
          {faqList?.count !== 0 && (
            <Flex justifyContent={'center'} mt={'48px'}>
              <Pagination
                currentPage={currentPage}
                totalPages={faqList?.count ?? 0}
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
