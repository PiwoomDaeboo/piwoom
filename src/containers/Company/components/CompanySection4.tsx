import {
  AspectRatio,
  Box,
  Container,
  Flex,
  Grid,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'

import ImageAsNext from '@/components/ImageAsNext'
import { TimelineIcon, TimelinedotIcon } from '@/generated/icons/MyIcons'
import { MY_IMAGES } from '@/generated/path/images'

function CompanySection4() {
  return (
    <Flex
      pt={{ base: '64px', sm: '80px' }}
      pb={{ base: '80px', sm: '120px' }}
      w={'100%'}
      bg={'linear-gradient(180deg, #FFF 0%, #F1F7FF 100%)'}
    >
      <Container>
        <Flex
          flexDirection={{ base: 'column', md: 'row' }}
          gap={{ base: '80px', md: '0' }}
        >
          <Box flex={'1'} w={'100%'}>
            <VStack alignItems={'flex-start'} spacing={'24px'}>
              <Text textStyle={'pre-heading-1'} color={'grey.10'}>
                History
              </Text>
              <Text textStyle={'pre-body-4'} color={'grey.10'}>
                신뢰와 혁신으로 고객의 더 나은 미래를 향해 걸어온 길, <br />
                그리고 함께 만들어갈 피움대부의 이야기를 만나보세요.
              </Text>
            </VStack>
          </Box>
          <Box flex={'1'} w={'100%'}>
            <Flex
              justifyContent={{ base: 'center', md: 'flex-start' }}
              gap={'20px'}
            >
              <VStack alignItems={'center'} pt={'10px'}>
                <TimelinedotIcon boxSize={'20px'} />
                <TimelineIcon boxSize={'2px'} height={'62px'} />
                <TimelinedotIcon boxSize={'20px'} />
                <TimelineIcon boxSize={'2px'} height={'62px'} />
                <TimelinedotIcon boxSize={'20px'} />
                <TimelineIcon boxSize={'2px'} height={'62px'} />
                <TimelinedotIcon boxSize={'20px'} />
              </VStack>
              <VStack
                alignItems={'flex-start'}
                spacing={{ base: '44px', sm: '34px' }}
              >
                <VStack alignItems={'flex-start'} spacing={'4px'}>
                  <Text textStyle={'pre-heading-2'} color={'primary.4'}>
                    2025.10
                  </Text>
                  <Text textStyle={'pre-heading-3'} color={'grey.10'}>
                    온라인 비대면 대출 서비스 런칭
                  </Text>
                </VStack>
                <VStack alignItems={'flex-start'} spacing={'4px'}>
                  <Text textStyle={'pre-heading-2'} color={'primary.4'}>
                    2025.01
                  </Text>
                  <Text textStyle={'pre-heading-3'} color={'grey.10'}>
                    개인 신용 대출 서비스 출시
                  </Text>
                </VStack>
                <VStack alignItems={'flex-start'} spacing={'4px'}>
                  <Text textStyle={'pre-heading-2'} color={'primary.4'}>
                    2024.01
                  </Text>
                  <Text textStyle={'pre-heading-3'} color={'grey.10'}>
                    개인 담보 대출 서비스 출시
                  </Text>
                </VStack>
                <VStack alignItems={'flex-start'} spacing={'4px'}>
                  <Text textStyle={'pre-heading-2'} color={'primary.4'}>
                    2023.09
                  </Text>
                  <Text textStyle={'pre-heading-3'} color={'grey.10'}>
                    피움대부 주식회사 설립
                    <br />
                    스타트업 대출 서비스 출시
                  </Text>
                </VStack>
              </VStack>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Flex>
  )
}
export default CompanySection4
