import React, { useEffect, useState } from 'react'

import { Box, Button, Flex, Text } from '@chakra-ui/react'

import ModalBasis from '@/components/@Modal/ModalBasis'
import { useLoanSignCreateMutation } from '@/generated/apis/Loan/Loan.query'

interface ElectronicContractModalProps {
  isOpen: boolean
  onClose: () => void
  contractId?: number
}

function ElectronicContractModal({
  isOpen,
  onClose,
  contractId = 1,
}: ElectronicContractModalProps) {
  const [contractSignature, setContractSignature] = useState<string | null>(
    null,
  )
  const { mutate: createContractSignature } = useLoanSignCreateMutation({
    options: {
      onSuccess: (data) => {
        setContractSignature(data.signUrl)
        console.log('createContractSignature', data)
      },
      onError: (error) => {
        console.error('createContractSignature', error)
      },
    },
  })
  useEffect(() => {
    createContractSignature({
      id: contractId,
    })
  }, [contractId])

  return (
    <ModalBasis
      isOpen={isOpen}
      visibleCloseButton={true}
      onClose={onClose}
      size={{ base: 'full', sm: 'lg' }}
      header={
        <Box
          pb={'16px'}
          borderBottom={'1px solid'}
          borderColor={'border.basic.2'}
        >
          <Text textStyle={'pre-heading-2'} color={'grey.10'}>
            전자계약서 작성
          </Text>
        </Box>
      }
      body={
        <Box w={'100%'} h={'100%'}>
          <iframe
            style={{
              border: 'none',
              display: 'block',
              margin: 0,
              padding: 0,
              width: '100%',
              height: '600px',
              overflowY: 'scroll',
              maxHeight: '100%',
            }}
            src={contractSignature || ''}
          ></iframe>
        </Box>
      }
      footer={
        <>
          <Flex
            w={'100%'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={'10px'}
          >
            <Button variant={'outline-secondary'} w={'100%'} onClick={onClose}>
              취소
            </Button>
            <Button
              variant={'solid-primary'}
              w={'100%'}
              // onClick={}
              // onClick={handleOtpWetax}
            >
              인증완료
            </Button>
          </Flex>
        </>
      }
    ></ModalBasis>
  )
}

export default ElectronicContractModal
