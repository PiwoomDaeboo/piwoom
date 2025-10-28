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

import { useFormContext } from 'react-hook-form'

import ModalBasis from '@/components/@Modal/ModalBasis'
import CommonSelect from '@/components/CommonSelect'
import InputForm from '@/components/InputForm'
import { Pagination } from '@/components/pagination'
import { useCompanyListQuery } from '@/generated/apis/Company/Company.query'
import { MagnifyingGlassIcon } from '@/generated/icons/MyIcons'
import { useDebounce } from '@/hooks/useDebounce'

interface Company {
  no: string | null
  name: string | null
  businessNo: string | null
  baseAddress: string | null
  detailAddress: string | null
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
  const { setValue } = useFormContext()
  const [name, setName] = useState('')
  const [no, setNo] = useState('')
  const [searchType, setSearchType] = useState('name')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 5
  const [searchError, setSearchError] = useState('')

  // 500ms 디바운스 적용
  const debouncedName = useDebounce(name, 500)

  // 검색어가 변경될 때 페이지를 1로 리셋
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedName])

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
    onSelectCompany?.({
      no: null,
      name: debouncedName,
      businessNo: null,
      baseAddress: null,
      detailAddress: null,
    })
    setName('')
    setNo('')
    onClose()
  }

  const handleClose = () => {
    // 모달이 닫힐 때 상태 초기화
    setName('')
    setNo('')
    setSearchError('')
    setCurrentPage(1)
    onClose()
  }

  // 사업자등록번호 포맷팅 함수
  const formatBusinessNumber = (businessNo: string) => {
    // 숫자만 추출
    const numbers = businessNo.replace(/\D/g, '')

    // 000-00-00000 형태로 포맷팅
    if (numbers.length >= 10) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(5, 10)}`
    } else if (numbers.length >= 5) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(5)}`
    } else if (numbers.length >= 3) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`
    }
    return numbers
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
          name: searchType === 'name' ? debouncedName : '',
          no: searchType === 'no' ? debouncedName : '',
          limit: postsPerPage,
          offset: (currentPage - 1) * postsPerPage,
        },
      },
      options: {
        enabled: !!isOpen && !!debouncedName.trim(),
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
              <Box w={{ base: '45%', sm: '30%' }}>
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
              <Box w={{ base: '55%', sm: '70%' }}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" pl={'12px'}>
                    <MagnifyingGlassIcon color="grey.8" boxSize={'20px'} />
                  </InputLeftElement>
                  <Input
                    pl={'48px'}
                    placeholder={searchType === 'name' ? '직장명' : '법인번호'}
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
            h={{ base: 'calc(100vh - 200px)', md: '450px' }}
            maxH={{ base: 'calc(100vh - 200px)', md: '600px' }}
            // maxH={{ base: 'calc(100vh - 100px)', md: 'none' }}
          >
            {isCompanyListLoading && (
              <Center
                h={{ base: 'calc(100vh - 200px)', md: '450px' }}
                maxH={{ base: 'calc(100vh - 200px)', md: '600px' }}
              >
                <Spinner />
              </Center>
            )}
            {companyList?.results?.length === 0 &&
              !isCompanyListLoading &&
              debouncedName.trim() && (
                <Center h={'100%'} bg={'background.basic.2'}>
                  <VStack>
                    <Text
                      textAlign={'center'}
                      textStyle={'pre-heading-4'}
                      color={'grey.4'}
                    >
                      검색 결과가 없습니다.
                      <br />
                      입력하신 {debouncedName}을 회사명으로 사용하시겠어요?
                    </Text>
                    <Button
                      variant={'outline-secondary'}
                      onClick={handleConfirm}
                    >
                      사용하기
                    </Button>
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
                      {formatBusinessNumber(company.businessNo)}
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
        companyList?.count &&
        companyList?.count !== 0 && (
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
