import { Flex } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'

import ModalBasis from '@/components/@Modal/ModalBasis'

interface LoanImpossibleModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoanImpossibleModal({
  isOpen,
  onClose,
}: LoanImpossibleModalProps) {
  return (
    <ModalBasis
      isOpen={isOpen}
      visibleCloseButton={true}
      onClose={onClose}
      size={'sm'}
      body={
        <Flex
          flexDir={'column'}
          gap={'12px'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Text textStyle={'pre-heading-4'} color={'grey.10'}>
            알림
          </Text>
          <Text textAlign={'center'} textStyle={'pre-body-68'} color={'grey.7'}>
            현재 시스템 점검 등으로 인해 일시적으로 대출 신청이 불가능합니다.
            카카오톡 상담하기를 통해 성함과 연락처를 남겨주시면 빠르게
            연락드리겠습니다.
          </Text>
        </Flex>
      }
      footer={
        <Flex w="100%" gap="12px">
          <Button w="100%" variant={'text-primary'} onClick={onClose}>
            취소
          </Button>
          <Button
            w="100%"
            variant={'solid-primary'}
            onClick={() => {
              window.open('http://pf.kakao.com/_xkxoben/chat', '_blank')
            }}
          >
            상담하기
          </Button>
        </Flex>
      }
    ></ModalBasis>
  )
}
