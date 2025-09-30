import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { Box, Button, Flex, HStack, Input, Text } from '@chakra-ui/react'

import ModalBasis from '@/components/@Modal/ModalBasis'

interface CustomerInfoModalProps {
  isOpen: boolean
  onClose: () => void
}

function CustomerInfoModal({ isOpen, onClose }: CustomerInfoModalProps) {
  const [code, setCode] = useState('')
  const router = useRouter()
  const handleConfirm = () => {
    router.push('/my-loan?step=3')
  }

  const handleClose = () => {
    router.push('/my-loan')
    window.open('http://pf.kakao.com/_xkxoben/chat', '_blank')
  }

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
            고객정보
          </Text>
        </Box>
      }
      body={
        <Flex flexDir={'column'} gap={'12px'} maxH={'450px'} overflowY={'auto'}>
          <HStack
            p={'12px'}
            bg={'background.basic.2'}
            borderRadius={'10px'}
            spacing={'12px'}
          >
            <Text textStyle={'pre-body-6'} color={'grey.8'}>
              성명
            </Text>
            <Text textStyle={'pre-body-5'} color={'grey.8'}>
              홍길동
            </Text>
          </HStack>
          <HStack
            p={'12px'}
            bg={'background.basic.2'}
            borderRadius={'10px'}
            spacing={'12px'}
          >
            <Text textStyle={'pre-body-6'} color={'grey.8'}>
              생년월일
            </Text>
            <Text textStyle={'pre-body-5'} color={'grey.8'}>
              홍길동
            </Text>
          </HStack>
          <HStack
            p={'12px'}
            bg={'background.basic.2'}
            borderRadius={'10px'}
            spacing={'12px'}
          >
            <Text textStyle={'pre-body-6'} color={'grey.8'}>
              성별
            </Text>
            <Text textStyle={'pre-body-5'} color={'grey.8'}>
              홍길동
            </Text>
          </HStack>
          <HStack
            p={'12px'}
            bg={'background.basic.2'}
            borderRadius={'10px'}
            spacing={'12px'}
          >
            <Text textStyle={'pre-body-6'} color={'grey.8'}>
              휴대폰
            </Text>
            <Text textStyle={'pre-body-5'} color={'grey.8'}>
              홍길동
            </Text>
          </HStack>
          <HStack
            p={'12px'}
            bg={'background.basic.2'}
            borderRadius={'10px'}
            spacing={'12px'}
          >
            <Text textStyle={'pre-body-6'} color={'grey.8'}>
              현재집주소(주민등본상)
            </Text>
            <Text textStyle={'pre-body-5'} color={'grey.8'}>
              홍길동
            </Text>
          </HStack>
          <Text textStyle={'pre-body-6'} color={'grey.6'}>
            * 주민등록 등본 확인을 위해 현재 주소가 맞는지 확인하세요!
          </Text>
        </Flex>
      }
      footer={
        <Flex w="100%" gap="12px">
          <Button
            w="100%"
            onClick={handleClose}
            borderColor="border.basic.2"
            variant={'text-primary'}
          >
            정보 수정 요청
          </Button>

          <Button w="100%" variant={'solid-primary'} onClick={handleConfirm}>
            확인
          </Button>
        </Flex>
      }
    ></ModalBasis>
  )
}

export default CustomerInfoModal
