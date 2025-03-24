import { Button, Flex, Text, VStack } from '@chakra-ui/react'

import { CheckIcon } from '@/generated/icons/MyIcons'

const Section4 = () => {
  return (
    <Flex
      py={{ base: '80px', sm: '140px', md: '180px' }}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Text textStyle="pre-heading-01" mb="32px">
        MagiCube와 지금 시작해 보세요!
      </Text>
      <Flex
        gap="30px"
        w="100%"
        h="100%"
        alignItems="center"
        justifyContent="center"
        flexDirection={{ base: 'column', md: 'row' }}
      >
        <Flex
          flexDirection={'column'}
          w={{ base: '100%', md: '50%' }}
          p="40px"
          borderRadius="20px"
          bg="secondary.1"
        >
          <Text textStyle="pre-heading-01">
            로고나 시안 없이도{' '}
            <Text as="span" color="secondary.5">
              직접 디자인
            </Text>
            할 수 있나요?
          </Text>
          <Text textStyle="pre-body-01" color="content.1" mt="4px">
            누구나 쉽게 디자인할 수 있는 MagiCube만의 셀프디자인 툴을
            경험해보세요!
          </Text>
          <VStack
            spacing="16px"
            p="16px 20px"
            bg="white"
            mt="24px"
            mb="32px"
            alignItems="flex-start"
            borderRadius="10px"
          >
            <Flex gap="8px" alignItems="flex-start">
              <CheckIcon mt="6px" width="20px" height="20px" />
              <Text textStyle="pre-body-04" color="content.1" mt="4px">
                오직 매지큐브에서만 가능한 800도 식기용 전사인쇄 솔루션에 적합한
                업종별, 테마별 셀프 디자인 편집이 가능합니다.
              </Text>
            </Flex>
            <Flex gap="8px" alignItems="flex-start">
              <CheckIcon mt="6px" width="20px" height="20px" />
              <Text textStyle="pre-body-04" color="content.1" mt="4px">
                주문 확인 후 전달받은 에디터 코드를 입력해 주세요. 입력이
                완료되면 에디터로 이동됩니다!
              </Text>
            </Flex>
          </VStack>
          <Button
            borderRadius={'full'}
            variant={'solid-primary'}
            w="fit-content"
            //   onClick={onLoginCodeOpen}
          >
            <Text textStyle={'pre-heading-05'}>에디터 코드</Text>
          </Button>
        </Flex>
        <Flex
          flexDirection={'column'}
          w={{ base: '100%', md: '50%' }}
          p="40px"
          borderRadius="20px"
          bg="background.inverse.2"
        >
          <Text textStyle="pre-heading-01" color="content.8">
            주문하기 전이라{' '}
            <Text as="span" color="secondary.5">
              시안 확인과 견적
            </Text>
            이 궁금해요!
          </Text>
          <Text textStyle="pre-body-01" color="content.8" mt="4px">
            20개 소량부터 1000개 이상 대량견적이 궁금하다면 시안파일을
            업로드해주세요!
          </Text>
          <VStack
            spacing="16px"
            p="16px 20px"
            bg="white"
            mt="24px"
            mb="32px"
            alignItems="flex-start"
            borderRadius="10px"
          >
            <Flex gap="8px" alignItems="flex-start">
              <CheckIcon mt="6px" width="20px" height="20px" />
              <Text textStyle="pre-body-04" color="content.1" mt="4px">
                세금계산서 발행용 견적 문의 시, 사업자등록증을 첨부해주시면
                수량과 상관없이 우선 상담해드립니다. 네이버 톡톡 및 카카오
                채널로도 언제든지 편하게 문의하세요!
              </Text>
            </Flex>
            <Flex w="100%" gap="8px" alignItems="flex-start">
              <CheckIcon mt="6px" width="20px" height="20px" />
              <Text textStyle="pre-body-04" color="content.1" mt="4px">
                시안파일을 업로드해주시면 담당자 확인 후 연락드립니다.
                <br />
                (jpg. png. pdf. ai. svg 파일 업로드)
              </Text>
            </Flex>
          </VStack>
          <Button
            borderRadius={'full'}
            variant={'outline-primary'}
            width={'fit-content'}
          >
            <Text textStyle={'pre-heading-05'}>시안 업로드</Text>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Section4
