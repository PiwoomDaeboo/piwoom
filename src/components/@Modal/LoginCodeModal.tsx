import React, { useEffect, useState } from 'react'

import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'

import ModalBasis from '@/components/@Modal/ModalBasis'
import InputForm from '@/components/InputForm'
import { useOrderRetrieveQuery } from '@/generated/apis/Order/Order.query'

interface LoginCodeModalProps {
  isOpen: boolean
  onClose: () => void
}

function LoginCodeModal({ isOpen, onClose }: LoginCodeModalProps) {
  const [code, setCode] = useState('')
  const [shouldQuery, setShouldQuery] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    data,
    isLoading,
    error: queryError,
  } = useOrderRetrieveQuery({
    variables: {
      code: code,
    },
    options: {
      enabled: shouldQuery && !!code,
    },
  })

  useEffect(() => {
    if (shouldQuery) {
      if (data && !queryError) {
        // 성공적으로 데이터를 가져왔을 때
        handleNext()
      } else if (queryError) {
        // 쿼리 에러가 발생했을 때
        setError('유효하지 않은 코드입니다. 다시 확인해주세요.')
        setShouldQuery(false) // 쿼리 상태 초기화
      }
    }
  }, [data, queryError, shouldQuery])

  const handleNext = () => {
    onClose()
    window.open(`https://editor.magicube.co.kr/order/${code}/editor/`, '_blank')
    // MC149615
  }

  const handleConfirm = () => {
    if (code) {
      setError(null) // 에러 초기화
      setShouldQuery(true) // 쿼리 실행
    }
  }

  const handleClose = () => {
    onClose()
    setCode('')
  }

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
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </InputForm>
            {error && (
              <Text color="red.500" fontSize="sm" mt="2">
                {error}
              </Text>
            )}
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
            onClick={handleConfirm}
            isLoading={isLoading}
          >
            확인
          </Button>
        </Flex>
      }
    ></ModalBasis>
  )
}

export default LoginCodeModal
