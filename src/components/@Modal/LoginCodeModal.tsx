import React, { useEffect, useState } from 'react'

import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'

import ModalBasis from '@/components/@Modal/ModalBasis'
import InputForm from '@/components/InputForm'

interface LoginCodeModalProps {
  isOpen: boolean
  onClose: () => void
}

function LoginCodeModal({ isOpen, onClose }: LoginCodeModalProps) {
  const handleNext = () => {
    onClose()
  }
  const handleClose = () => {
    onClose()
  }

  useEffect(function clear() {}, [isOpen])

  return (
    <ModalBasis
      isOpen={isOpen}
      visibleCloseButton={false}
      onClose={handleClose}
      size={'sm'}
      body={
        <Box>
          <Text
            textAlign={'center'}
            color="content.1"
            textStyle={'pre-heading-04'}
          >
            에디터 코드
          </Text>
          <Box mt="8px" mb="16px">
            <Text
              textAlign={'center'}
              textStyle={'pre-body-07'}
              color="content.2"
            >
              전달받은 에디터 코드를 입력해 주세요.
            </Text>
            <Text
              textAlign={'center'}
              textStyle={'pre-body-07'}
              color="content.2"
            >
              입력이 완료되면 에디터로 이동됩니다!
            </Text>
          </Box>
          <Box>
            <InputForm label="" isRequired={false}>
              <Input
                placeholder="에디터 코드"
                // value={optionName}
                // onChange={handleOptionNameChange}
              />
            </InputForm>
          </Box>
        </Box>
      }
      footer={
        <Flex w="100%" gap="12px">
          <Button
            borderRadius={'full'}
            w="100%"
            onClick={handleClose}
            borderColor="border.basic.2"
            variant={'outline-primary'}
          >
            취소
          </Button>

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
export default LoginCodeModal
