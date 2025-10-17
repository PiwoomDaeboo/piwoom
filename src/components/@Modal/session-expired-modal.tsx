import { useRouter } from 'next/router'

import { Flex } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'

import ModalBasis from '@/components/@Modal/ModalBasis'

interface SessionExpiredModalProps {
  isOpen: boolean
  setIsIdle: (isIdle: boolean) => void
  onClose: () => void
  routePath: string
}

export default function SessionExpiredModal({
  isOpen,
  setIsIdle,
  onClose,
  routePath = '/my-loan',
}: SessionExpiredModalProps) {
  const router = useRouter()
  return (
    <ModalBasis
      isOpen={isOpen}
      visibleCloseButton={false}
      onClose={() => {}}
      size={'sm'}
      body={
        <Flex
          flexDir={'column'}
          gap={'12px'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Text textStyle={'pre-heading-4'} color={'grey.10'}>
            세션만료
          </Text>
          <Text textAlign={'center'} textStyle={'pre-body-68'} color={'grey.7'}>
            세션이 만료되었습니다.
            <br />
            대출 신청(조회)을 다시 진행해 주세요!
          </Text>
        </Flex>
      }
      footer={
        <Flex w="100%">
          <Button
            w="100%"
            variant={'solid-primary'}
            onClick={() => {
              router.push(routePath)
              setIsIdle(false)
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
