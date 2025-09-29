import React, { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'

import { Select } from 'chakra-react-select'
import DaumPostcodeEmbed from 'react-daum-postcode'
import { useFormContext } from 'react-hook-form'

import ModalBasis from '@/components/@Modal/ModalBasis'

interface AddressModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'normal' | 'real-estate'
}

function AddressModal({ isOpen, onClose, type }: AddressModalProps) {
  const { setValue, getValues } = useFormContext()

  const handleConfirm = () => {}

  const handleClose = () => {
    onClose()
  }

  const handleComplete = (data: any) => {
    const baseAddress = data.address
    let buildingInfo = ''

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        buildingInfo += data.bname
      }
      if (data.buildingName !== '') {
        buildingInfo +=
          buildingInfo !== '' ? `, ${data.buildingName}` : data.buildingName
      }
    }

    if (type === 'normal') {
      setValue('baseAddress', baseAddress)

      const currentDetailAddress = getValues('detailAddress')
      if (!currentDetailAddress && buildingInfo) {
        setValue('detailAddress', buildingInfo)
      }
      setValue('postcode', data.zonecode)
      onClose()
    } else {
      setValue('assetBaseAddress', baseAddress)
      const currentAssetDetailAddress = getValues('assetDetailAddress')
      if (!currentAssetDetailAddress && buildingInfo) {
        setValue('assetDetailAddress', buildingInfo)
      }
      setValue('assetPostcode', data.zonecode)
      onClose()
    }
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
            주소 찾기
          </Text>
        </Box>
      }
      body={<DaumPostcodeEmbed onComplete={handleComplete} />}
    ></ModalBasis>
  )
}

export default AddressModal
