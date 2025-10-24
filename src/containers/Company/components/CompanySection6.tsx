import {
  AspectRatio,
  Button,
  Container,
  Flex,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'

import ImageAsNext from '@/components/ImageAsNext'
import { MY_IMAGES } from '@/generated/path/images'

const CompanySection6 = () => {
  return (
    <>
      <Flex
        w={'100%'}
        h={'100%'}
        bgImage={{
          base: MY_IMAGES.AWS_INTRODUCTION_MO.src,
          sm: MY_IMAGES.AWS_INTRODUCTION_TAB.src,
          md: MY_IMAGES.AWS_INTRODUCTION_PC.src,
        }}
        bgSize={'cover'}
        pt={{ base: '96px', md: '80px' }}
        pb={{ base: '28px', md: '60px' }}
      >
        <Container>
          <Flex
            w={'100%'}
            justifyContent={{ base: 'center', sm: 'flex-end' }}
            alignItems={'flex-end'}
          >
            <VStack alignItems={'flex-start'} w={{ base: '100%', sm: '50%' }}>
              <Text textStyle={'pre-body-6'} color={'grey.10'}>
                본 웹사이트는 AWS(Amazon Web Services) 인프라를 기반으로
                안정적으로 운영되고 있습니다.
                <br />
                <br /> 모든 서비스는 개인정보보호법과 관련 법령을 준수하며,
                <br /> SSL 암호화 통신과 안전한 데이터 관리 절차를 통해 고객님의
                정보를 철저히 보호합니다.
              </Text>
            </VStack>
          </Flex>
        </Container>
      </Flex>
    </>
  )
}

export default CompanySection6
