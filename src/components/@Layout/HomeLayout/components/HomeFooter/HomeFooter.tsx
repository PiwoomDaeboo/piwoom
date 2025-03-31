import { Link } from '@chakra-ui/next-js'
import {
  Box,
  Container,
  ContainerProps,
  Divider,
  Flex,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'

import { LogoIcon, MagicubeIcon } from '@/generated/icons/MyIcons'
import { ROUTES } from '@/generated/path/routes'

export default function HomeFooter({ ...props }: ContainerProps) {
  return (
    <Container
      w={'100%'}
      variant={'base'}
      display={'flex'}
      flexDirection={'column'}
      {...props}
      py="40px"
      px={{ base: '16px', sm: '30px', md: '60px' }}
    >
      <Text textStyle="pre-display-00">LET’S PLAY</Text>
      <Box w="100%" bg="content.1" height="3px" my="12px" />
      <Text textStyle={'pre-heading-01'}>Doodle & Create</Text>
      <Text textStyle={'pre-heading-01'}>“Your magicube comes to life!”</Text>
      <Flex
        mt="40px"
        gap={{ base: '32px', md: '80px' }}
        alignItems="flex-start"
        flexDirection={{ base: 'column', md: 'row' }}
      >
        <MagicubeIcon width="126px" height="118px" />
        <VStack gap="6px">
          <Text textStyle="pre-body-01">
            매지큐브 / 셀프 디자인 P.O.D 솔루션{' '}
          </Text>
          <Text textStyle="pre-body-04">Email : create@magicube.co.kr</Text>
        </VStack>
        <VStack alignItems="flex-start" gap="0px">
          <Text mb="6px" textStyle="pre-body-01">
            바림 크래프트 디자인랩{' '}
          </Text>
          <HStack gap="12px">
            <Text textStyle="pre-body-04">대표 : 주영은</Text>
            <Text textStyle="pre-body-04">고객센터 Tel. : 070-8232-4362</Text>
          </HStack>
          <Text textStyle="pre-body-04">사업자 등록 번호 : 341-77-00072</Text>
          <Text textStyle="pre-body-04">
            통신판매업 신고 : 제 2024-수원영통- 1888호 경기도 수원시 영통구
            법조로 38, 102-505
          </Text>
        </VStack>
      </Flex>
    </Container>
  )
}
