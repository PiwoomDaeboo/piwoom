import React, { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Center,
  Checkbox,
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
import { SQUARE_CHECKBOX_STYLES } from '@/containers/MyLoan/const/consts'
import { useCompanyListQuery } from '@/generated/apis/Company/Company.query'
import { MagnifyingGlassIcon } from '@/generated/icons/MyIcons'

interface Company {
  no: string
  name: string
  businessNo: string
  baseAddress: string
  detailAddress: string
}

interface DocumentAgreeModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectCompany?: (company: Company) => void
}

function DocumentAgreeModal({
  isOpen,
  onClose,
  onSelectCompany,
}: DocumentAgreeModalProps) {
  const [name, setName] = useState('1')
  const [no, setNo] = useState('')
  const [searchType, setSearchType] = useState('name')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 5
  const [isAgree, setIsAgree] = useState(false)
  const handleAgree = (checked: boolean) => {
    setIsAgree(checked)
  }
  const handleConfirm = () => {
    onClose()
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <ModalBasis
      isOpen={isOpen}
      visibleCloseButton={true}
      onClose={handleClose}
      size={{ base: 'full', sm: 'md' }}
      header={
        <Box
          pb={'16px'}
          borderBottom={'1px solid'}
          borderColor={'border.basic.2'}
        >
          <Text textStyle={'pre-heading-2'} color={'grey.10'}>
            전자문서 수신 동의
          </Text>
        </Box>
      }
      body={
        <Flex flexDir={'column'} gap={'12px'}>
          <Text textStyle={'pre-body-6'} color={'grey.9'}>
            본 동의는 「개인금융채권의 관리 및 개인금융채무자의 보호에 관한
            법률」제6조, 제8조, 제11조, 동 법 시행령 제5조제2항, 제7조제2항,
            제10조제3항, 동 법 감독규정 제3조제1항에 의거하여 각 통지를 서면을
            대체하여 전자문서(모바일 전자 통지)로 수신 받을 것에 대한
            동의입니다. (전자문서 수신처는 당사에 등록된 고객의 정보를
            활용합니다.)
          </Text>
          <VStack
            p={'12px 20px'}
            borderRadius={'20px'}
            bg={'background.basic.2'}
            alignItems={'flex-start'}
          >
            <Text textStyle={'pre-body-5'} color={'grey.9'}>
              ※주의사항
            </Text>
            <Text textStyle={'pre-body-6'} color={'grey.9'}>
              전자문서 동의를 하더라도
            </Text>
            <VStack alignItems={'flex-start'} spacing={'4px'}>
              <Flex alignItems={'flex-start'} gap={'8px'}>
                <Text textStyle={'pre-body-6'} color={'grey.9'} minW={'20px'}>
                  1.
                </Text>
                <Text textStyle={'pre-body-6'} color={'grey.9'}>
                  각 사유에 의해 통지된{' '}
                  <Box as="span" color={'accent.red2'}>
                    전자문서가 기한 내에 수신 확인이 안된 경우, 서면으로 통지
                  </Box>
                  됩니다.
                </Text>
              </Flex>
              <Flex alignItems={'flex-start'} gap={'8px'}>
                <Text textStyle={'pre-body-6'} color={'grey.9'} minW={'20px'}>
                  2.
                </Text>
                <Text textStyle={'pre-body-6'} color={'grey.9'}>
                  법 상 의무 통지 사항 외의{' '}
                  <Box as="span" color={'accent.red2'}>
                    추심 관련 문서는 서면으로 통지
                  </Box>
                  될 수 있습니다.
                </Text>
              </Flex>
            </VStack>
            <Text textStyle={'pre-body-6'} color={'grey.9'}>
              회사의 각종 통지 사항을 문자 및 카카오톡 등으로 수신하는 것에
              동의하십니까?
            </Text>
          </VStack>
          <HStack w={'100%'} spacing={3}>
            <Checkbox
              isChecked={isAgree}
              sx={SQUARE_CHECKBOX_STYLES}
              onChange={(e) => handleAgree(e.target.checked)}
            />
            <Text textStyle={'pre-body-6'} color={'grey.8'}>
              네, 충분히 이해했어요
            </Text>
          </HStack>
        </Flex>
      }
      footer={
        <>
          <Button
            w="100%"
            variant={'solid-primary'}
            isDisabled={!isAgree}
            onClick={handleConfirm}
          >
            확인
          </Button>
        </>
      }
    ></ModalBasis>
  )
}

export default DocumentAgreeModal
