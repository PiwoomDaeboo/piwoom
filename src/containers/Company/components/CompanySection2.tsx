import {
  Container,
  Flex,
  Grid,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'

import {
  HeaderlogoIcon,
  LogoIcon,
  PhoneCallFillIcon,
  ScrollFillIcon,
  SealCheckFillIcon,
  ShieldCheckeredFillIcon,
} from '@/generated/icons/MyIcons'

function CompanySection2() {
  return (
    <Flex
      bg={'background.basic.2'}
      w={'100%'}
      py={{ base: '56px', sm: '80px' }}
    >
      <Container>
        <Flex
          flexDir={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={'40px'}
        >
          <HeaderlogoIcon boxSize={'223px'} h={'44px'} />
          <Text
            textStyle={{ base: 'pre-body-6', sm: 'pre-body-2' }}
            color={'grey.10'}
          >
            피움대부 주식회사는 국내 사모펀드 출신의 대표이사가
            <br />
            2023년에 설립한 지자체 등록 대부업체입니다.
          </Text>
          <Text
            textStyle={{ base: 'pre-body-6', sm: 'pre-body-2' }}
            color={'grey.10'}
          >
            공공정보 API, 스크래핑 기술, 피움만의 신용평가시스템(CCS)을 활용해
            <br />
            고객님이 안심하고 편안하게 이용하실 수 있는 금융 서비스를
            마련했습니다.
          </Text>
        </Flex>
      </Container>
    </Flex>
  )
}
export default CompanySection2
