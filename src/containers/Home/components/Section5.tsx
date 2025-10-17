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

import { FaqType } from '@/generated/apis/@types/data-contracts'
import { useFaqListQuery } from '@/generated/apis/Faq/Faq.query'
import {
  CaretRightIcon,
  InstagramIcon,
  NaverIcon,
  NoticeIcon,
  Sectionicon1Icon,
} from '@/generated/icons/MyIcons'

// FAQ 아이템 컴포넌트
const FAQItem = ({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqType
  isOpen: boolean
  onToggle: () => void
}) => (
  <Flex
    p="24px 28px"
    bg="grey.0"
    borderRadius="20px"
    w="100%"
    flexDir="column"
    cursor="pointer"
    onClick={onToggle}
    transition="all 0.3s ease"
    overflow="hidden"
    boxShadow="0 4px 24px 0 rgba(0, 46, 114, 0.06)"
  >
    <Flex alignItems="center" gap="8px">
      <Text as="span" color="primary.3" textStyle="pre-heading-3">
        Q.
      </Text>
      <Text color={'grey.10'} textStyle="pre-heading-3" flex="1">
        {item.question}
      </Text>
    </Flex>

    <Box
      h={isOpen ? '138px' : '0'}
      opacity={isOpen ? 1 : 0}
      overflow="hidden"
      transition="all 0.3s ease"
      mt={isOpen ? '16px' : '0'}
      pt={isOpen ? '16px' : '0'}
    >
      <Box ml="28px" textStyle="pre-body-6" color="grey.8">
        <Text noOfLines={2}>{item.answer.slice(0, 74)}</Text>
      </Box>
    </Box>
  </Flex>
)

function Section5() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(14)
  const router = useRouter()
  const handleFAQToggle = (faqId: number) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId)
  }

  const { data: faqList } = useFaqListQuery({
    variables: {
      query: {
        limit: 3,
      },
    },
  })

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
            alignItems={'center'}
            w={'100%'}
          >
            <VStack
              w={'100%'}
              alignItems={'flex-start'}
              gap={'0px'}
              // justifyContent={'space-between'}
              // gap={'28px'}
            >
              <VStack alignItems={'flex-start'}>
                <Text textStyle={'pre-heading-1'}>공지사항</Text>
                <Text textStyle={'pre-body-6'}>
                  중요한 소식과 안내를 빠르게 전해드려요
                </Text>
              </VStack>
              <HStack
                w={'100%'}
                mt={'28px'}
                justifyContent={'flex-end'}
                alignItems={'flex-end'}
              >
                <Button
                  variant={'outline-secondary'}
                  onClick={() => router.push('/notice')}
                  alignItems={'center'}
                >
                  <Text textStyle={'pre-caption-1'}>확인하기</Text>
                  <CaretRightIcon boxSize={'16px'} />
                </Button>
              </HStack>
            </VStack>
            {/* <NoticeIcon boxSize={'100px'} /> */}
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
                onClick={() =>
                  window.open('https://blog.naver.com/piwoomofficial', '_blank')
                }
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
                  window.open(
                    'https://www.instagram.com/piwoom.official?igsh=dmhrcmdweTU4d3J5',
                    '_blank',
                  )
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
          <VStack
            w={'100%'}
            gap={'20px'}
            maxH={'360px'}
            overflowY={'auto'}
            p={'4px'}
            boxShadow="0 4px 24px 0 rgba(0, 46, 114, 0.06)"
          >
            {faqList?.results?.map((item) => (
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
