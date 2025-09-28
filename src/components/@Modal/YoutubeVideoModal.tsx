import React, { useEffect, useState } from 'react'

import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'

import ModalBasis from '@/components/@Modal/ModalBasis'
import { XIcon } from '@/generated/icons/MyIcons'

interface YoutubeVideoModalProps {
  isOpen: boolean
  onClose: () => void
  link: string
}

function YoutubeVideoModal({ isOpen, onClose, link }: YoutubeVideoModalProps) {
  const handleClose = () => {
    onClose()
  }

  // 유튜브 링크를 embed 형태로 변환하는 함수
  const convertToEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0]
      return `https://www.youtube.com/embed/${videoId}`
    } else if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0]
      return `https://www.youtube.com/embed/${videoId}`
    }
    return url
  }

  return (
    <ModalBasis
      isOpen={isOpen}
      visibleCloseButton={false}
      onClose={handleClose}
      size={{ base: 'full', md: '4xl' }}
      styles={{
        header: {
          bg: 'transparent',
          border: 'none',
          p: 0,
          m: 0,
          minH: 'auto',
          h: 'auto',
        },
        footer: {
          bg: 'transparent',
          border: 'none',
          p: 0,
          m: 0,
        },
        body: {
          p: 0,
          m: 0,
          bg: 'black',
          minH: 'auto',
          h: 'auto',
        },
      }}
      header={
        <Flex
          justifyContent={'flex-end'}
          position={'absolute'}
          top={{ base: '16px', md: '-40px' }}
          right={{ base: '16px', md: '0px' }}
          zIndex={10}
        >
          <Box
            cursor={'pointer'}
            onClick={handleClose}
            p={{ base: '8px', md: '4px' }}
            borderRadius={'50%'}
            transition={'background-color 0.2s'}
          >
            <XIcon color={'grey.0'} boxSize={{ base: '28px', md: '24px' }} />
          </Box>
        </Flex>
      }
      footer={null}
      body={
        <Box
          w={'100%'}
          h={{ base: '100vh', md: '550px' }}
          position={'relative'}
          maxH={{ base: '100vh', md: '550px' }}
        >
          <iframe
            src={convertToEmbedUrl(link)}
            width="100%"
            height="100%"
            allowFullScreen
            style={{ border: 'none' }}
            title="YouTube video"
          />
        </Box>
      }
    ></ModalBasis>
  )
}
export default YoutubeVideoModal
