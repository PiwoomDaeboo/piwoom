import { Flex } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'

import ModalBasis from '@/components/@Modal/ModalBasis'

interface LoanDelayModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoanDelayModal({
  isOpen,
  onClose,
}: LoanDelayModalProps) {
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
            현재 대출이 연체되어 웹사이트를 통한 중도상환 신청이 불가능합니다.
            전화 상담 또는 카카오톡 상담을 통해 문의해 주시기 바랍니다.
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
