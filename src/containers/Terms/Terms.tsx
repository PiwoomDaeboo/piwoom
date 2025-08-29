import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  Image,
  Link,
  SimpleGrid,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'

import {
  CaretRightIcon,
  ClipboardIcon,
  FineIcon,
  MagnifyingGlassIcon,
} from '@/generated/icons/MyIcons'

import LoanChecklistModal from './components/LoanChecklistModal'

const listItemStyles = {
  textStyle: 'pre-heading-4',
  mb: '6px',
  position: 'relative' as const,
  pl: '20px',
  _before: {
    content: '"·"',
    position: 'absolute' as const,
    left: '0',
    top: '0',
  },
}

const ListItem = ({
  children,
  color = 'grey.8',
}: {
  children: React.ReactNode
  color?: string
}) => (
  <Box as="li" color={color} {...listItemStyles}>
    {children}
  </Box>
)

const List = ({ children }: { children: React.ReactNode }) => (
  <Box as="ul" listStyleType="none" m={0} p={0} w="100%">
    {children}
  </Box>
)

function Terms() {
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <Flex
      w={'100%'}
      h={'100%'}
      py={'64px'}
      flexDirection={'column'}
      alignItems={'flex-start'}
      bg={'background.basic.3'}
    >
      <LoanChecklistModal isOpen={isOpen} onClose={onClose} />
      <Container>
        <Text textStyle={'pre-heading-3'} mb={'12px'}>
          대출금리 연 20%이내 (연체금리는 약정이자율 +3%P 이내, 연 20%이내)
        </Text>
        <VStack gap={'6px'} alignItems={'flex-start'}>
          <List>
            <ListItem>
              단, 2021년 7월 7일부터 신규체결, 갱신, 연장되는 계약에 한함. 해당
              상품은 신용대출과 담보대출 상품입니다.
            </ListItem>
            <ListItem>
              만 20세 이상 고객 대상으로 개인신용평점 등 신용도 및 당사 평가
              기준에 따라 대출 가능 여부 및 이자율 산출
            </ListItem>
            <ListItem>단, 채무 불이행 등록자는 제외</ListItem>
            <ListItem>
              이자는 매월 약정일에 부과하고, 상품에 따라
              원금자유상환(만기일시상환), 원리금균등분할상환 등의 방법으로 상환
            </ListItem>
            <ListItem>
              조기상환 조건: 3년이내 상환 시 최대 3%이내 중도상환수수료 발생
            </ListItem>
          </List>

          <Text ml={'15px'} textStyle={'pre-heading-4'} color={'grey.8'}>
            (단, 대부이자, 연체이자, 중도상환수수료 합계금액은 법정최고금리 연
            20%를 초과하지 않습니다.)
            <br />
            [예시: 중도상환대부금액 x 중도상환수수료율 x (잔여일수 ÷ 대부기간)]
          </Text>
          <List>
            <ListItem>
              대출계약을 체결하기전에 관계법령에 따라 금융상품에 관한 중요사항을
              설명받을 수 있습니다.
            </ListItem>
            <ListItem>
              이자는 매월 약정일에 부과하고, 상품에 따라
              원금자유상환(만기일시상환), 원리금균등분할상환 등의 방법으로 상환
            </ListItem>
          </List>
        </VStack>
        <Text textStyle={'pre-heading-3'} my={'12px'}>
          부대비용 : 신용인증송부 보고서 발급비, 채무확인서 발급비, 부동산
          담보대출의 경우 등록면허세, 지방교육세, 등기신청수수료,
          국민주택채권매입비, 주소변경비용, 확인서면비용, 근저당말소비용 등 발생
          <br />
          부동산담보대출 근저당 말소비용 채무자 부담
        </Text>
        <List>
          <ListItem>수수료 없음</ListItem>
          <ListItem>대출계약 전 약관을 읽어보세요</ListItem>
        </List>
        <VStack alignItems={'flex-start'} gap={'6px'} mt={'28px'}>
          <Text textStyle={'pre-heading-4'} color={'accent.red3'}>
            중개수수료를 요구하거나 받는 것은 불법입니다. 과도한 빚은 당신에게
            큰 불행을 안겨줄 수 있습니다.
            <br />
            대출시 신용등급 또는 개인신용평점 하락으로 다른 금융거래가 제약 받을
            수 있습니다.
          </Text>
          <List>
            <ListItem color="accent.red3">
              일정기간 원리금이 연체될 경우 기한의 이익을 상실할 수 있습니다.
              대출조건을 정확히 확인해주세요.
            </ListItem>
            <ListItem>대출기간 : 1개월 ~ 6개월</ListItem>
            <ListItem>
              총 대출 비용 예시 : 100만원을 연 20%로 12개월 원리금 균등 상환시
              총 납부액 1,111,609원
            </ListItem>
          </List>
        </VStack>
        <SimpleGrid mt={'40px'} columns={{ base: 1, md: 3 }} gap={'12px'}>
          <Link
            href="https://fines.fss.or.kr/fines/plis/moneyLenderSearch/MoneyLenderSearch.getMoneyLenderList.do"
            isExternal
            _hover={{ textDecoration: 'none' }}
          >
            <Flex
              alignItems={'center'}
              justifyContent={'space-between'}
              borderRadius={'12px'}
              p={'24px 28px'}
              bg={'grey.3'}
              h={'100px'}
              cursor={'pointer'}
            >
              <HStack gap={'20px'}>
                <Flex
                  bg={'white'}
                  borderRadius={'99px'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  w={'50px'}
                  h={'50px'}
                >
                  <MagnifyingGlassIcon boxSize={'24px'} />
                </Flex>

                <Text textStyle={'pre-heading-4'} color={'grey.8'}>
                  등록대부업체
                  <br />
                  통합조회
                </Text>
              </HStack>
              <CaretRightIcon boxSize={'24px'} />
            </Flex>
          </Link>
          <Flex
            alignItems={'center'}
            justifyContent={'space-between'}
            borderRadius={'12px'}
            p={'24px 28px'}
            bg={'grey.3'}
            h={'100px'}
            cursor={'pointer'}
            onClick={onOpen}
          >
            <HStack gap={'20px'}>
              <Flex
                bg={'white'}
                borderRadius={'99px'}
                justifyContent={'center'}
                alignItems={'center'}
                w={'50px'}
                h={'50px'}
              >
                <ClipboardIcon boxSize={'24px'} />
              </Flex>
              <Text textStyle={'pre-heading-4'} color={'grey.8'}>
                안전한 대출을 위한
                <br />
                체크리스트
              </Text>
            </HStack>
            <CaretRightIcon boxSize={'24px'} />
          </Flex>
          <Link
            href="https://fine.fss.or.kr/fine/main/main.do?menuNo=900000"
            isExternal
            _hover={{ textDecoration: 'none' }}
          >
            <Flex
              alignItems={'center'}
              justifyContent={'space-between'}
              borderRadius={'12px'}
              p={'24px 28px'}
              bg={'grey.3'}
              h={'100px'}
              cursor={'pointer'}
            >
              <FineIcon boxSize={'95px'} />
              <CaretRightIcon boxSize={'24px'} />
            </Flex>
          </Link>
        </SimpleGrid>
      </Container>
    </Flex>
  )
}
export default Terms
