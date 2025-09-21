import { useState } from 'react'

import { useRouter } from 'next/router'

import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'

import {
  CaretRightIcon,
  InstagramIcon,
  NaverIcon,
  Sectionicon1Icon,
} from '@/generated/icons/MyIcons'

interface FAQItem {
  id: number
  question: string
  answer: string
}

interface IconComponent {
  boxSize?: string | number
}

// FAQ 아이템 컴포넌트
const FAQItem = ({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem
  isOpen: boolean
  onToggle: () => void
}) => (
  <Flex
    p="32px 28px"
    bg="grey.0"
    borderRadius="20px"
    boxShadow="0 4px 24px 0 rgba(0, 46, 114, 0.06)"
    w="100%"
    flexDir="column"
    cursor="pointer"
    onClick={onToggle}
    transition="all 0.3s ease"
    overflow="hidden"
  >
    <Flex alignItems="center" gap="8px">
      <Text as="span" color="primary.3" fontSize="18px" fontWeight="bold">
        Q.
      </Text>
      <Text textStyle="pre-heading-3" flex="1">
        {item.question}
      </Text>
    </Flex>

    <Box
      maxH={isOpen ? '200px' : '0'}
      opacity={isOpen ? 1 : 0}
      overflow="hidden"
      transition="all 0.3s ease"
      mt={isOpen ? '16px' : '0'}
      pt={isOpen ? '16px' : '0'}
    >
      <Box ml="28px" textStyle="pre-body-6" color="grey.8">
        {item.answer}
      </Box>
    </Box>
  </Flex>
)

function Section5() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(1)
  const router = useRouter()
  const handleFAQToggle = (faqId: number) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId)
  }

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: '현재 남아있는 잔액 확인을 하고 싶어요.',
      answer:
        "현재 남아있는 대출 잔액은 당사 홈페이지(PC 및 모바일)에서 확인 하실 수 있습니다. 홈페이지에서 '나의대출조회' 메뉴 '대출정보조회' 에서 확인 가능하십니다.",
    },
    {
      id: 2,
      question: '현재 남아있는 잔액 확인을 하고 싶어요.',
      answer:
        "현재 남아있는 대출 잔액은 당사 홈페이지(PC 및 모바일)에서 확인 하실 수 있습니다. 홈페이지에서 '나의대출조회' 메뉴 '대출정보조회' 에서 확인 가능하십니다.",
    },
    {
      id: 3,
      question: '현재 남아있는 잔액 확인을 하고 싶어요.',
      answer:
        "현재 남아있는 대출 잔액은 당사 홈페이지(PC 및 모바일)에서 확인 하실 수 있습니다. 홈페이지에서 '나의대출조회' 메뉴 '대출정보조회' 에서 확인 가능하십니다.",
    },
  ]

  return (
    <Container>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={'56px'}>
        <VStack w={'100%'} justifyContent={'space-between'} gap={'20px'}>
          <Flex
            p={'32px 28px'}
            bg={'grey.0'}
            h={'193px'}
            borderRadius={'20px'}
            boxShadow={'0 8px 50px 0 rgba(0, 46, 114, 0.10)'}
            alignItems={'flex-end'}
            w={'100%'}
          >
            <VStack
              w={'100%'}
              alignItems={'flex-start'}
              justifyContent={'space-between'}
            >
              <VStack alignItems={'flex-start'}>
                <Text textStyle={'pre-heading-1'}>공지사항</Text>
                <Text textStyle={'pre-body-6'}>
                  중요한 소식과 안내를 빠르게 전해드려요
                </Text>
              </VStack>
              <Button variant={'outline-secondary'}>
                <Text textStyle={'pre-caption-1'}>확인하기</Text>
                <CaretRightIcon boxSize={'16px'} />
              </Button>
            </VStack>
            <Sectionicon1Icon boxSize={'100px'} />
          </Flex>
          <Flex
            p={'32px 28px'}
            bg={'grey.0'}
            h={'193px'}
            borderRadius={'20px'}
            boxShadow={'0 8px 50px 0 rgba(0, 46, 114, 0.10)'}
            w={'100%'}
          >
            <VStack w={'100%'} alignItems={'flex-start'}>
              <Text textStyle={'pre-heading-1'}>인사이트</Text>
              <Text textStyle={'pre-body-6'}>
                합리적인 금융 생활을 위한 다양한 콘텐츠
              </Text>
            </VStack>
            <HStack justifyContent={'flex-end'} alignItems={'flex-end'}>
              <Flex
                w={'48px'}
                h={'48px'}
                justifyContent={'center'}
                alignItems={'center'}
                bg={'grey.0'}
                border={'1px solid'}
                borderColor={'grey.3'}
                borderRadius={'100%'}
                cursor={'pointer'}
                onClick={() => window.open('https://blog.naver.com/', '_blank')}
              >
                <NaverIcon boxSize={'24px'} />
              </Flex>
              <Flex
                w={'48px'}
                h={'48px'}
                justifyContent={'center'}
                alignItems={'center'}
                bg={'grey.0'}
                border={'1px solid'}
                borderColor={'grey.3'}
                borderRadius={'100%'}
                cursor={'pointer'}
                onClick={() =>
                  window.open('https://www.instagram.com/', '_blank')
                }
              >
                <InstagramIcon boxSize={'24px'} />
              </Flex>
            </HStack>
          </Flex>
        </VStack>
        <VStack w={'100%'} h="fit-content">
          <Flex
            w={'100%'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Text color={'grey.10'} textStyle={'pre-heading-1'}>
              자주하는 질문
            </Text>
            <Button
              p={'11px 24px'}
              gap={'8px'}
              variant={'none'}
              onClick={() => router.push('/faq')}
            >
              <Text color={'grey.8'} textStyle={'pre-body-5'}>
                더보기
              </Text>
              <CaretRightIcon boxSize={'24px'} />
            </Button>
          </Flex>
          <VStack w={'100%'} gap={'20px'} maxH={'360px'} overflowY={'auto'}>
            {faqItems.map((item) => (
              <FAQItem
                key={item.id}
                item={item}
                isOpen={openFAQ === item.id}
                onToggle={() => handleFAQToggle(item.id)}
              />
            ))}
          </VStack>
        </VStack>
      </SimpleGrid>
    </Container>
  )
}

export default Section5
