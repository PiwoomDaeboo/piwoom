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

const CompanySection5 = () => {
  return (
    <>
      <Flex
        w={'100%'}
        h={'100%'}
        bgImage={{
          base: MY_IMAGES.BG_CEO_MO.src,
          sm: MY_IMAGES.BG_CEO_TAB.src,
          md: MY_IMAGES.BG_CEO_PC.src,
        }}
        bgSize={'cover'}
        pt={{ base: '64px', md: '80px' }}
        pb={{ base: '80px', md: '120px' }}
      >
        <Container>
          <Flex
            flexDirection={{ base: 'column', md: 'row' }}
            alignItems={{ base: 'flex-start', md: 'flex-end' }}
            gap={'80px'}
          >
            <VStack alignItems={'flex-start'}>
              <Text
                textStyle={{ base: 'pre-display-4', md: 'pre-display-3' }}
                color={'grey.10'}
              >
                CEO
              </Text>

              <AspectRatio
                minW={{ base: '210px', sm: '285px' }}
                ratio={285 / 380}
              >
                <ImageAsNext
                  src={MY_IMAGES.CEO.src}
                  alt={MY_IMAGES.CEO.alt}
                  fill
                  w={'100%'}
                  h={'100%'}
                  objectFit="cover"
                />
              </AspectRatio>
            </VStack>
            <VStack alignItems={'flex-start'} spacing={'24px'}>
              <VStack alignItems={'flex-start'}>
                <Text textStyle={'pre-heading-1'} color={'grey.10'}>
                  장윤석
                </Text>
                <Text textStyle={'pre-heading-1'} color={'grey.10'}>
                  Founder & CEO
                </Text>
              </VStack>
              <VStack spacing={'6px'} alignItems={'flex-start'}>
                <HStack spacing={'12px'}>
                  <Text textStyle={'pre-body-4'} color={'grey.8'}>
                    ∙
                  </Text>
                  <Text textStyle={'pre-body-4'} color={'grey.8'}>
                    경희대학교 경제학 학사
                  </Text>
                </HStack>
                <HStack spacing={'12px'}>
                  <Text textStyle={'pre-body-4'} color={'grey.8'}>
                    ∙
                  </Text>
                  <Text textStyle={'pre-body-4'} color={'grey.8'}>
                    IMM자산운용 투자본부
                  </Text>
                </HStack>
                <HStack spacing={'12px'}>
                  <Text textStyle={'pre-body-4'} color={'grey.8'}>
                    ∙
                  </Text>
                  <Text textStyle={'pre-body-4'} color={'grey.8'}>
                    교보증권 Sales&Trading 본부
                  </Text>
                </HStack>
              </VStack>
            </VStack>
          </Flex>
        </Container>
      </Flex>
    </>
  )
}

export default CompanySection5
