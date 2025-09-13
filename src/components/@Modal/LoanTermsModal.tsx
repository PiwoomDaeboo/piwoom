import React, { useEffect, useState } from 'react'

import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'

import ModalBasis from '@/components/@Modal/ModalBasis'
import InputForm from '@/components/InputForm'

interface LoanTermsModalProps {
  isOpen: boolean
  onClose: () => void
}

function LoanTermsModal({ isOpen, onClose }: LoanTermsModalProps) {
  const [code, setCode] = useState('')

  const handleConfirm = () => {
    onClose()
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <ModalBasis
      isOpen={isOpen}
      visibleCloseButton={false}
      onClose={handleClose}
      size={'xl'}
      header={
        <Box
          pb={'16px'}
          borderBottom={'1px solid'}
          borderColor={'border.basic.2'}
        >
          <Text textStyle={'pre-heading-2'} color={'grey.10'}>
            개인(신용)정보 조회 동의
          </Text>
        </Box>
      }
      body={
        <Box maxH={'450px'} overflowY={'auto'}>
          <Text textStyle={'pre-body-6'}>
            ※필수 동의사항에 대한 동의는 계약의 체결 및 이행을 위하여
            필수적이므로, 아래 사항에 동의하셔야만 대부거래 관계의 설정 또는
            유지가 가능합니다.
          </Text>
          <Text textStyle={'pre-body-6'}>
            ※ 피움대부 주식회사가 금융거래와 관련하여 본인의 개인(신용)정보를
            수집·이용 및 제공하기 위해서는 ⌜신용정보의 이용 및 보호에 관한 법률⌟
            제15조, 제32조 내지 제34조, ⌜개인정보보호법⌟ 제15조, 제17조, 제22조
            등에 따라 본인의 동의가 필요합니다.
          </Text>
          <Text textStyle={'pre-body-6'}>
            ※ 피움대부 주식회사가 금융거래와 관련하여 본인의 개인(신용)정보를
            수집·이용 및 제공하기 위해서는 ⌜신용정보의 이용 및 보호에 관한 법률⌟
            제15조, 제32조 내지 제34조, ⌜개인정보보호법⌟ 제15조, 제17조, 제22조
            등에 따라 본인의 동의가 필요합니다.
          </Text>
          <Text textStyle={'pre-body-6'}>
            ※ 피움대부 주식회사가 금융거래와 관련하여 본인의 개인(신용)정보를
            수집·이용 및 제공하기 위해서는 ⌜신용정보의 이용 및 보호에 관한 법률⌟
            제15조, 제32조 내지 제34조, ⌜개인정보보호법⌟ 제15조, 제17조, 제22조
            등에 따라 본인의 동의가 필요합니다.
          </Text>
          <Text textStyle={'pre-body-6'}>
            ※ 본 동의서는 대부거래 계약의 체결 및 이행을 위한 필수적인 사항으로,
            동의하지 않을 경우 대부거래 계약을 체결할 수 없습니다.
          </Text>
          <Text textStyle={'pre-body-6'}>
            ※ 본 동의서는 대부거래 계약의 체결 및 이행을 위한 필수적인 사항으로,
            동의하지 않을 경우 대부거래 계약을 체결할 수 없습니다.
          </Text>
          <Text textStyle={'pre-body-6'}>
            ※ 본 동의서는 대부거래 계약의 체결 및 이행을 위한 필수적인 사항으로,
            동의하지 않을 경우 대부거래 계약을 체결할 수 없습니다.
          </Text>
          <Text textStyle={'pre-body-6'}>
            ※ 본 동의서는 대부거래 계약의 체결 및 이행을 위한 필수적인 사항으로,
            동의하지 않을 경우 대부거래 계약을 체결할 수 없습니다.
          </Text>
        </Box>
      }
      footer={
        <Flex w="100%" gap="12px">
          {/* <Button
            borderRadius={'full'}
            w="100%"
            onClick={handleClose}
            borderColor="border.basic.2"
            variant={'outline-secondary'}
          >
            취소
          </Button> */}

          <Button w="100%" variant={'solid-primary'} onClick={handleConfirm}>
            확인
          </Button>
        </Flex>
      }
    ></ModalBasis>
  )
}

export default LoanTermsModal
