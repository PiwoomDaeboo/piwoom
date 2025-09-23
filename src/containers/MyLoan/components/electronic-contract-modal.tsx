import React, { useEffect, useState } from 'react'

import { Box, Button, Flex, Text } from '@chakra-ui/react'

import ModalBasis from '@/components/@Modal/ModalBasis'
import {
  KakaoAuthenticationIcon,
  KbAuthenticationIcon,
  NaverAuthenticationIcon,
  PassAuthenticationIcon,
  ShinhanAuthenticationIcon,
  TossAuthenticationIcon,
} from '@/generated/icons/MyIcons'

interface ElectronicContractModalProps {
  isOpen: boolean
  onClose: () => void
}

function ElectronicContractModal({
  isOpen,
  onClose,
}: ElectronicContractModalProps) {
  return (
    <ModalBasis
      isOpen={isOpen}
      visibleCloseButton={false}
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
            src={
              'https://app.modusign.co.kr/embedded-participant?di=bc615c10-92d2-11f0-b573-dd5faac0c738&pi=bccf8730-92d2-11f0-b573-dd5faac0c738&ci=MDEwOTc5Nzk3NDY&sm=SECURE_LINK&token=sha256.GjhqbFrTXWZsJ7T9t6OPQTXRIfZHDS1wLlShhRy4Yi4&expiry=1758532991884&redirectUrl=http%3A%2F%2Fapi.piwoom.com%2Fv1%2Floan%2F1%2Fsign_callback%2F'
            }
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
