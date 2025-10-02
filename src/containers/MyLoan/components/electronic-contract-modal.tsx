import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { Box, Button, Flex, Text } from '@chakra-ui/react'

import ModalBasis from '@/components/@Modal/ModalBasis'

interface ElectronicContractModalProps {
  isOpen: boolean
  onClose: () => void

  signUrl?: string
}

function ElectronicContractModal({
  isOpen,
  onClose,
  signUrl = '',
}: ElectronicContractModalProps) {
  const router = useRouter()

  return (
    <ModalBasis
      isOpen={isOpen}
      visibleCloseButton={true}
      onClose={onClose}
      size={{ base: 'full', sm: 'xl' }}
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
            src={signUrl || ''}
          ></iframe>
        </Box>
      }
    ></ModalBasis>
  )
}

export default ElectronicContractModal
