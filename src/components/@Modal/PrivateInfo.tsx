import React, { useEffect } from 'react'

import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Radio,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'

import ModalBasis from '@/components/@Modal/ModalBasis'
import InputForm from '@/components/InputForm'

interface PrivateInfoModalProps {
  isOpen: boolean
  onClose: () => void
}

function PrivateInfoModal({ isOpen, onClose }: PrivateInfoModalProps) {
  const handleClose = () => {
    onClose()
  }

  return (
    <ModalBasis
      isOpen={isOpen}
      onClose={handleClose}
      size={'lg'}
      body={
        <Box overflowY="scroll" maxH="640px">
          <Box
            borderBottom={'1px solid'}
            borderColor="border.basic.2"
            pb="16px"
          >
            <Text color="content.1" textStyle={'pre-heading-01'}>
              개인정보 수집·이용 동의서
            </Text>
          </Box>

          <VStack mt="28px" mb="16px" gap="24px" alignItems="flex-start">
            <VStack alignItems="flex-start">
              <Text textStyle="pre-heading-04">
                1. 개인정보 수집·이용 동의서
              </Text>
              <Text textStyle="pre-body-04">
                당사는 서비스 제공, 고객 관리, 마케팅 및 광고 활용을 위해
                개인정보를 수집·이용합니다.
              </Text>
            </VStack>
            <VStack alignItems="flex-start">
              <Text textStyle="pre-heading-04">2. 수집하는 개인정보 항목</Text>
              <Text textStyle="pre-body-04">
                필수: 성명, 휴대전화번호, 이메일, 주소, 결제 정보
              </Text>
            </VStack>
            <VStack alignItems="flex-start">
              <Text textStyle="pre-heading-04">
                3. 개인정보 보유 및 이용 기간
              </Text>
              <Text textStyle="pre-body-04">
                <li>
                  회원: 탈퇴 후 즉시 파기 및 법령에 따라 일정 기간 보관할 수
                  있습니다.
                </li>
                <li>비회원: 거래 완료 후 즉시 파기</li>
              </Text>
            </VStack>
            <VStack alignItems="flex-start">
              <Text textStyle="pre-heading-04">
                4. 개인정보 제공 및 처리 위탁
              </Text>
              <Text textStyle="pre-body-04">
                당사는 원칙적으로 개인정보를 외부에 제공하지 않으며, 서비스
                제공을 위해 배송업체 등에 최소한의 정보만 위탁할 수 있습니다.
              </Text>
            </VStack>
            <VStack alignItems="flex-start">
              <Text textStyle="pre-heading-04">5. 이용자의 권리</Text>
              <Text textStyle="pre-body-04">
                이용자는 개인정보 조회·수정·삭제 요청 및 마케팅 수신 거부가
                가능합니다.
              </Text>
            </VStack>
            <VStack alignItems="flex-start">
              <Text textStyle="pre-heading-04">
                6. 개인정보 파기 절차 및 방법
              </Text>
              <Text textStyle="pre-body-04">
                개인정보는 목적 달성 후 즉시 파기하며, 전자적 정보는 복구
                불가능한 방식으로 삭제됩니다.
              </Text>
            </VStack>
            <VStack alignItems="flex-start">
              <Text textStyle="pre-heading-04">7. 개인정보 보호책임자</Text>
              <Text textStyle="pre-body-04">
                <li>이름: 주영은</li>
                <li>E-mail: create@magicube.co.kr</li>
              </Text>
            </VStack>
            <VStack alignItems="flex-start">
              <Text textStyle="pre-heading-04">8. 개인정보 변경 공지</Text>
              <Text textStyle="pre-body-04">
                법령 및 방침 변경 시, 시행 7 일 전 공지사항을 통해 안내합니다.
              </Text>
            </VStack>
          </VStack>
        </Box>
      }
    ></ModalBasis>
  )
}
export default PrivateInfoModal
