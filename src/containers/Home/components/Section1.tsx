import { Box, Center, Flex, Grid, Image, Text, VStack } from '@chakra-ui/react'

import { MY_IMAGES } from '@/generated/path/images'

function Section1() {
  return (
    <Grid
      w="100%"
      my="180px"
      // h="100%"
      templateColumns={{
        base: 'repeat(1, 1fr)', // 모바일에서는 1열
        md: 'repeat(3, 1fr)',
      }}
      gap="30px"
    >
      <Flex
        flexDirection="column"
        borderRadius={'20px'}
        bg="#FAC0F9"
        w="100%"
        p="40px"
      >
        <Text textStyle="rubik-regular" textAlign={'center'}>
          01
        </Text>
        <VStack alignItems="flex-start" spacing="0px" mt="40px">
          <Text textStyle="pre-heading-01">기업을 위한</Text>
          <Text textStyle="pre-heading-01">완벽한 브랜드 굿즈</Text>
          <Text textStyle="pre-heading-01">대량 제작부터!</Text>
        </VStack>
        <Text textStyle="pre-body-02" mt="16px">
          기업, 기관 판촉물용 10,000개 이상 대량 주문에도 최적화된 다양한 모델의
          대량 재고 보유와 맞춤형 패키지 제작까지 신속한 공급 시스템을
          운영합니다.
        </Text>
      </Flex>
      <Flex
        flexDirection="column"
        borderRadius={'20px'}
        bg="#B693FC"
        w="100%"
        p="40px"
      >
        <Text textStyle="rubik-regular" textAlign={'center'}>
          02
        </Text>
        <VStack alignItems="flex-start" spacing="0px" mt="40px">
          <Text textStyle="pre-heading-01">전문가처럼 쉽고 빠른</Text>
          <Text textStyle="pre-heading-01">맞춤형 셀프 디자인 소량</Text>
          <Text textStyle="pre-heading-01">제작까지!</Text>
        </VStack>
        <Text textStyle="pre-body-02" mt="16px">
          디자인 경험 없이도 누구나 쉽게 사용 가능한 맞춤형 셀프 디자인 툴로
          완성도있는 개인 굿즈와 답례품 소량 제작에도 적합합니다.
        </Text>
      </Flex>
      <Flex
        flexDirection="column"
        borderRadius={'20px'}
        bg="#F5EFD1"
        w="100%"
        p="40px"
      >
        <Text textStyle="rubik-regular" textAlign={'center'}>
          03
        </Text>
        <VStack alignItems="flex-start" spacing="0px" mt="40px">
          <Text textStyle="pre-heading-01">오직 MagiCube에서만!</Text>
          <Text textStyle="pre-heading-01">고품질 800도 열처리 전사</Text>
          <Text textStyle="pre-heading-01">인쇄&원스톱 머그컵 제작 서비스</Text>
        </VStack>
        <Text textStyle="pre-body-02" mt="16px">
          이미 많은 F&B 프랜차이즈 매장 및 소규모 카페 대표님들께서 만족스러운
          인쇄품질과 내구성을 경험하시고 지속적인 재구매를 요청하고 계십니다.
        </Text>
      </Flex>
    </Grid>
  )
}
export default Section1
