import { useRouter } from 'next/router'

import { Box, Button, Container, Flex, Text, VStack } from '@chakra-ui/react'

import Admonition from '@/components/@Templates/Admonition'
import TemplateLayout from '@/components/@Templates/TemplateLayout'
import { ENV } from '@/configs/env'
import { LogoIcon } from '@/generated/icons/MyIcons'
import { MY_IMAGES } from '@/generated/path/images'

import { OauthCallback } from '../Social/types/oauth'

function Login() {
  const router = useRouter()

  return (
    <Flex
      w={'100%'}
      h={'100vh'}
      justifyContent={'center'}
      alignItems={'center'}
      bgImage={MY_IMAGES.INTRO.src}
      bgSize={'cover'}
      bgPosition={'center'}
      bgRepeat={'no-repeat'}
    >
      <Container
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        w={'100%'}
        h={'100%'}
      >
        <VStack w={'480px'} justifyContent={'center'} alignItems={'center'}>
          <LogoIcon boxSize={'100px'} />
          <VStack p={'28px'} bg={'white'} w={'100%'} borderRadius={'20px'}>
            <Button variant={'solid-primary'} w={'100%'}>
              <Text textStyle={'pre-body-5'}>휴대폰 간편 로그인</Text>
            </Button>
            <Button variant={'none'} w={'100%'}>
              <Text>회원가입</Text>
            </Button>
          </VStack>
        </VStack>
      </Container>
    </Flex>
  )
}

export default Login
