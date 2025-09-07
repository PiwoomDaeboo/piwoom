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
import {
  PhoneCallFillIcon,
  ScrollFillIcon,
  SealCheckFillIcon,
  ShieldCheckeredFillIcon,
} from '@/generated/icons/MyIcons'
import { MY_IMAGES } from '@/generated/path/images'

function CompanySection3() {
  return (
    <Container>
      <Flex
        flexDirection={'column'}
        py={{ base: '56px', sm: '160px' }}
        gap={'120px'}
      >
        <Flex
          w={'100%'}
          gap={{ base: '24px', md: '40px', lg: '80px' }}
          alignItems={'center'}
          flexDirection={{ base: 'column', md: 'row' }}
        >
          <Box flex={'1'} w={'100%'}>
            <AspectRatio ratio={620 / 400} borderRadius={'20px'} w={'100%'}>
              <ImageAsNext
                src={MY_IMAGES.COMPANYSECTION_1.src}
                alt={MY_IMAGES.COMPANYSECTION_1.alt}
                fill
                objectFit="cover"
              />
            </AspectRatio>
          </Box>
          <Box flex={'1'} w={'100%'}>
            <VStack alignItems={'flex-start'} spacing={'24px'}>
              <Text textStyle={'pre-heading-1'} color={'grey.10'}>
                Mission
              </Text>
              <Text textStyle={'pre-heading-2'} color={'grey.10'}>
                더 나은 내일을 꿈꾸는 이들을 위한 파트너
              </Text>
              <Text textStyle={'pre-body-4'}>
                개인의 삶과 기업의 비즈니스에 찾아오는 소중한 순간들이,
                <br />
                피움의 금융을 만나 더 크게 피어나기를 바랍니다.
              </Text>
            </VStack>
          </Box>
        </Flex>
        <Flex
          w={'100%'}
          gap={{ base: '24px', md: '40px', lg: '80px' }}
          alignItems={'center'}
          flexDirection={{ base: 'column-reverse', md: 'row' }}
        >
          <Box flex={'1'} w={'100%'}>
            <VStack alignItems={'flex-start'} spacing={'24px'}>
              <Text textStyle={'pre-heading-1'} color={'grey.10'}>
                Story
              </Text>
              <Text textStyle={'pre-body-4'}>
                2023년, 피움의 금융은 스타트업을 위한 대출로 시작되었습니다.
                <br />
                2024년, 스타트업들과 성장한 피움은 개인 대출 서비스를
                출시했습니다.
                <br />
                그리고 2025년, 피움은 온라인 비대면 대출 서비스를 시작합니다.
              </Text>
            </VStack>
          </Box>
          <Box flex={'1'} w={'100%'}>
            <AspectRatio ratio={620 / 400} borderRadius={'20px'} w={'100%'}>
              <ImageAsNext
                src={MY_IMAGES.COMPANYSECTION_2.src}
                alt={MY_IMAGES.COMPANYSECTION_2.alt}
                fill
                objectFit="cover"
              />
            </AspectRatio>
          </Box>
        </Flex>
      </Flex>
    </Container>
  )
}
export default CompanySection3
