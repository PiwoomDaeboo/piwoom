import { Box, Center, Flex, Grid, Image, Text, VStack } from '@chakra-ui/react'

import {
  Process1Icon,
  Process2Icon,
  Process3Icon,
} from '@/generated/icons/MyIcons'
import { MY_IMAGES } from '@/generated/path/images'

type IconComponent = React.ComponentType<{
  width?: any
  height?: any
}>

interface ProcessStepItem {
  icon: IconComponent
  title: string
  description: string
}

interface ProcessStepProps {
  icon: IconComponent
  title: string
  description: string
}

const processSteps: ProcessStepItem[] = [
  {
    icon: Process1Icon,
    title: '1. 카카오톡 상담하기',
    description:
      '우측 하단의 카카오톡 버튼을 클릭해 상담을 요청하세요.상담 후 에디터 코드를 보내드립니다.',
  },
  {
    icon: Process2Icon,
    title: '2. 에디터 툴 작업하기',
    description:
      '전달받은 코드를 통해 에디터 툴에 접속하셨다면, 원하는 제품을 선택한 후 컬러, 텍스트, 이미지 등을 자유롭게 디자인해 보세요!',
  },
  {
    icon: Process3Icon,
    title: '3. 이미지 작업 완료',
    description:
      '에디터 툴에서 작업이 완료되셨다면, 카카오톡에 이미지를 전달해 주세요. 전문 디자이너가 마무리 후 제품 작업이 시작됩니다!',
  },
]

const ProcessStep: React.FC<ProcessStepProps> = ({
  icon: Icon,
  title,
  description,
}) => (
  <Flex
    w="100%"
    gap="24px"
    flexDir={{ base: 'column', md: 'row' }}
    justifyContent={{ base: 'flex-start', md: 'center' }}
    alignItems={{ base: 'flex-start', md: 'center' }}
    p="28px"
    boxShadow="0px 2px 35px 0px rgba(44, 45, 80, 0.12)"
  >
    <Icon
      width={{ base: '60px', md: '80px' }}
      height={{ base: '60px', md: '80px' }}
    />
    <Box>
      <Text textStyle="pre-heading-02">{title}</Text>
      <Text textStyle="pre-body-02" color="content.1" mt="8px">
        {description}
      </Text>
    </Box>
  </Flex>
)

const Section3 = () => {
  return (
    <Flex
      gap="55px"
      w="100%"
      h="100%"
      py="80px"
      alignItems="center"
      justifyContent="center"
      flexDirection={{ base: 'column-reverse', md: 'row' }}
    >
      <Flex flexDirection={'column'} w={{ base: '100%', md: '50%' }}>
        <Text
          mb="32px"
          textStyle="pre-heading-01"
          display={{ base: 'none', md: 'block' }}
        >
          어떻게 진행되나요?
        </Text>
        <VStack gap="24px" w="100%">
          {processSteps.map((step, index) => (
            <ProcessStep
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}
        </VStack>
      </Flex>
      <Flex
        flexDirection={'column'}
        w={{ base: '100%', md: '50%' }}
        alignItems="center"
      >
        <Text
          mb="32px"
          textStyle="pre-heading-01"
          display={{ base: 'block', md: 'none' }}
        >
          어떻게 진행되나요?
        </Text>
        <Image
          src={MY_IMAGES.MAGICUBE_PROCESS.src}
          alt={MY_IMAGES.MAGICUBE_PROCESS.alt}
        />
      </Flex>
    </Flex>
  )
}

export default Section3
