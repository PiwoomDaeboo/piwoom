import { Flex } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'

import ModalBasis from '@/components/@Modal/ModalBasis'

interface AuthAlertModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthAlertModal({
  isOpen,
  onClose,
}: AuthAlertModalProps) {
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
            일시적인 서비스 점검으로 인해 신분증 인증하기 절차는 생략됩니다.
          </Text>
        </Flex>
      }
      footer={
        <Flex w="100%">
          <Button
            w="100%"
            variant={'solid-primary'}
            onClick={() => {
              onClose()
            }}
          >
            확인
          </Button>
        </Flex>
      }
    ></ModalBasis>
  )
}
