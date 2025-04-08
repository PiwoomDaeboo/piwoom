import React, { useEffect, useState } from 'react'

import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'

import ModalBasis from '@/components/@Modal/ModalBasis'

interface LoginInfoModalProps {
  isOpen: boolean
  onClose: () => void
}

function LoginInfoModal({ isOpen, onClose }: LoginInfoModalProps) {
  const handleNext = () => {
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
      body={
        <Box>
          <Text
            textAlign={'center'}
            color="content.1"
            textStyle={'pre-heading-04'}
          >
            알림
          </Text>
          <Box mt="8px" mb="16px">
            <Text
              textAlign={'center'}
              textStyle={'pre-body-07'}
              color="content.2"
            >
              에디터는 브라우저에서만 이용가능해요
            </Text>
            <Text
              textAlign={'center'}
              textStyle={'pre-body-07'}
              color="content.2"
            >
              PC에서 접속해주세요
            </Text>
          </Box>
        </Box>
      }
      footer={
        <Flex w="100%" gap="12px">
          <Button
            borderRadius={'full'}
            w="100%"
            variant={'solid-primary'}
            onClick={handleNext}
          >
            확인
          </Button>
        </Flex>
      }
    ></ModalBasis>
  )
}
export default LoginInfoModal
