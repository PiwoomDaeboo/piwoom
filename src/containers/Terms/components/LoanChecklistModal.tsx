import React from 'react'

import { AspectRatio, Box, Button, Text, VStack } from '@chakra-ui/react'

import ModalBasis from '@/components/@Modal/ModalBasis'
import ImageAsNext from '@/components/ImageAsNext'
import { MY_IMAGES } from '@/generated/path/images'

interface LoanChecklistModalProps {
  isOpen: boolean
  onClose: () => void
}

function LoanChecklistModal({ isOpen, onClose }: LoanChecklistModalProps) {
  const handleClose = () => {
    onClose()
  }

  return (
    <ModalBasis
      isOpen={isOpen}
      onClose={handleClose}
      size={'xl'}
      body={
        <Box>
          <Box
            borderBottom={'1px solid'}
            borderColor="border.basic.2"
            pb="16px"
          >
            <Text color="content.1" textStyle={'pre-heading-4'}>
              체크리스트 안내
            </Text>
          </Box>
          <AspectRatio ratio={688 / 973}>
            <ImageAsNext
              src={MY_IMAGES.CHECKLIST.src}
              alt={MY_IMAGES.CHECKLIST.alt}
              w={'100%'}
              h={'100%'}
            />
          </AspectRatio>
        </Box>
      }
      footer={
        <Button variant={'solid-primary'} w={'100%'} onClick={handleClose}>
          <Text textStyle={'pre-heading-4'}>확인</Text>
        </Button>
      }
    />
  )
}
export default LoanChecklistModal
