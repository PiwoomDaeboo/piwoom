import React, { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'

import { Select } from 'chakra-react-select'

import ModalBasis from '@/components/@Modal/ModalBasis'
import CommonSelect from '@/components/CommonSelect'
import InputForm from '@/components/InputForm'
import { Pagination } from '@/components/pagination'
import { useCompanyListQuery } from '@/generated/apis/Company/Company.query'
import { MagnifyingGlassIcon } from '@/generated/icons/MyIcons'

interface Company {
  no: string
  name: string
  businessNo: string
  baseAddress: string
  detailAddress: string
}

interface OfficeAddressModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectCompany?: (company: Company) => void
}

function OfficeAddressModal({
  isOpen,
  onClose,
  onSelectCompany,
}: OfficeAddressModalProps) {
  const [name, setName] = useState('1')
  const [no, setNo] = useState('')
  const [searchType, setSearchType] = useState('name')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 5
  const [searchError, setSearchError] = useState('')

  // 검색 실행 함수
  const handleSearch = () => {
    if (!name.trim()) {
      setSearchError('검색어를 입력해주세요.')
      return
    }
    setSearchError('')
    // 검색 로직 실행
  }

  // 검색어 변경 시 에러 메시지 초기화
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setName(value)
    if (searchError && value.trim()) {
      setSearchError('')
    }
  }

  const handleConfirm = () => {
    onClose()
  }

  const handleClose = () => {
    onClose()
  }

  const handleCompanySelect = (company: Company) => {
    onSelectCompany?.(company)
    setName('')
    onClose()
  }

  const { data: companyList, isLoading: isCompanyListLoading } =
    useCompanyListQuery({
      variables: {
        query: {
          name: searchType === 'name' ? name : '',
          no: searchType === 'no' ? name : '',
          limit: postsPerPage,
          offset: (currentPage - 1) * postsPerPage,
        },
      },
      options: {
        enabled: !!isOpen,
      },
    })
  const totalPages = Math.ceil((companyList?.count || 0) / postsPerPage)
  return (
    <ModalBasis
      isOpen={isOpen}
      visibleCloseButton={true}
      onClose={handleClose}
      size={{ base: 'full', sm: 'xl' }}
      header={
        <Box
          pb={'16px'}
          borderBottom={'1px solid'}
          borderColor={'border.basic.2'}
        >
          <Text textStyle={'pre-heading-2'} color={'grey.10'}>
            직장명 찾기
          </Text>
        </Box>
      }
      body={
        <Flex
          flexDir={'column'}
          gap={'12px'}
          h={{ base: 'calc(100vh - 200px)', md: '450px' }}
          maxH={{ base: 'calc(100vh - 200px)', md: '600px' }}
        >
          <InputForm isRequired label="직장명">
            <HStack w={'100%'}>
              <Box w={{ base: '40%', sm: '30%' }}>
                <CommonSelect
                  options={[
                    { label: '직장명', value: 'name' },
                    { label: '법인번호', value: 'no' },
                  ]}
                  defaultValue={{ label: '직장명', value: 'name' }}
                  onChange={(selectedOption) => {
                    if (selectedOption) {
                      setSearchType(selectedOption.value as string)
                    }
                  }}
                  placeholder="선택"
                />
              </Box>
              <Box w={'70%'}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" pl={'12px'}>
                    <MagnifyingGlassIcon color="grey.8" boxSize={'20px'} />
                  </InputLeftElement>
                  <Input
                    pl={'48px'}
                    placeholder={
                      searchType === 'name' ? '직장명을 입력하세요' : (
                        '법인번호를 입력하세요'
                      )
                    }
                    value={name}
                    onChange={handleNameChange}
                    isInvalid={!!searchError}
                    borderColor={searchError ? 'accent.red.2' : undefined}
                  />
                </InputGroup>
                {searchError && (
                  <Text
                    textStyle={'pre-caption-1'}
                    color={'accent.red.2'}
                    mt={'4px'}
                    ml={'12px'}
                  >
                    {searchError}
                  </Text>
                )}
              </Box>
            </HStack>
          </InputForm>

          <Box
            flex={1}
            overflowY={'auto'}
            minH={0}
            maxH={{ base: 'calc(100vh - 100px)', md: 'none' }}
          >
            {isCompanyListLoading && (
              <Center h={'100%'}>
                <Spinner />
              </Center>
            )}
            {companyList?.results?.length === 0 && !isCompanyListLoading && (
              <Center h={'100%'} bg={'background.basic.2'}>
                <VStack>
                  <Text
                    textAlign={'center'}
                    textStyle={'pre-heading-4'}
                    color={'grey.4'}
                  >
                    검색 결과가 없습니다.
                    <br />
                    입력하신 {name}을 회사명으로 사용하시겠어요?
                  </Text>
                  <Button variant={'outline-secondary'}>사용하기</Button>
                </VStack>
              </Center>
            )}
            {companyList?.results?.map((company, index) => (
              <Flex
                w={'100%'}
                key={company.no + index}
                p={{ base: '16px 19px', sm: '16px 24px' }}
                bg={'background.basic.1'}
                borderRadius={'10px'}
                border={'1px solid'}
                borderColor={'border.basic.1'}
                cursor={'pointer'}
                mb={'12px'}
                _hover={{
                  bg: 'primary.1',
                  borderColor: 'primary.3',
                }}
                onClick={() => handleCompanySelect(company)}
              >
                <VStack alignItems={'flex-start'} spacing={'8px'} w={'100%'}>
                  <Flex gap={'16px'} w={'100%'}>
                    <Text
                      textStyle={'pre-body-7'}
                      color={'grey.10'}
                      minW={'80px'}
                    >
                      직장명
                    </Text>
                    <Text
                      textStyle={'pre-body-6'}
                      color={'grey.9'}
                      wordBreak={'break-word'}
                      whiteSpace={'normal'}
                    >
                      {company.name}
                    </Text>
                  </Flex>
                  <Flex gap={'16px'} w={'100%'}>
                    <Text
                      textStyle={'pre-body-7'}
                      color={'grey.10'}
                      minW={'80px'}
                    >
                      사업자번호
                    </Text>
                    <Text
                      textStyle={'pre-body-6'}
                      color={'grey.9'}
                      wordBreak={'break-word'}
                      whiteSpace={'normal'}
                    >
                      {company.businessNo}
                    </Text>
                  </Flex>
                  <Flex gap={'16px'} w={'100%'}>
                    <Text
                      textStyle={'pre-body-6'}
                      color={'grey.10'}
                      minW={'80px'}
                    >
                      주소
                    </Text>
                    <Text
                      textStyle={'pre-body-6'}
                      color={'grey.9'}
                      wordBreak={'break-word'}
                      whiteSpace={'normal'}
                    >
                      {company.baseAddress} {company.detailAddress}
                    </Text>
                  </Flex>
                </VStack>
              </Flex>
            ))}
          </Box>
        </Flex>
      }
      footer={
        companyList?.count && (
          <Flex w={'100%'} justifyContent={'center'} h={'fit-content'}>
            <Flex justifyContent={'center'}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </Flex>
          </Flex>
        )
      }
    ></ModalBasis>
  )
}

export default OfficeAddressModal
