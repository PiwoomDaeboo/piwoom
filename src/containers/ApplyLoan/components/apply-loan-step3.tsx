import { useState } from 'react'

import { useRouter } from 'next/router'

import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'

import { Select } from 'chakra-react-select'

import LoanTermsModal from '@/components/@Modal/LoanTermsModal'
import ModalBasis from '@/components/@Modal/ModalBasis'
import InputForm from '@/components/InputForm'
import { CaretRightIcon, InfoFillIcon } from '@/generated/icons/MyIcons'

// 소득 카테고리 옵션 데이터
const INCOME_CATEGORIES = [
  { value: 'earned_pension', label: '근로소득 및 연금소득' },
  { value: 'business', label: '사업소득' },
  { value: 'spouse', label: '배우자 소득' },
  { value: 'severance', label: '퇴직금' },
  { value: 'real_estate', label: '부동산 임대 및 양도 소득' },
  { value: 'financial', label: '금융소득(이자 및 배당)' },
  { value: 'inheritance', label: '상속/증여' },
  { value: 'direct_input', label: '직접 입력' },
]

const ApplyLoanStep3 = () => {
  const router = useRouter()
  const [selectedIncome, setSelectedIncome] = useState('')

  return (
    <Container>
      <Flex
        py={{ base: '40px', sm: '48px', md: '84px' }}
        flexDir={'column'}
        gap={'24px'}
      >
        <VStack alignItems={'flex-start'} spacing={'8px'} mb={'32px'}>
          <Text textStyle={'pre-heading-2'} color={'grey.10'}>
            적합성•적정성
          </Text>
          <VStack spacing={'12px'} alignItems={'flex-start'}>
            <Text textStyle={'pre-body-6'} color={'grey.7'}>
              대출심사를 위해 아래 정보를 입력해주세요.
            </Text>
          </VStack>
        </VStack>

        <InputForm label="대출용도">
          <Flex w={'100%'} gap={'16px'}>
            <Box w={'100%'}>
              <Select
                placeholder="선택"
                options={INCOME_CATEGORIES}
                variant="outline"
              />
            </Box>
            <Box w={'100%'}></Box>
          </Flex>
        </InputForm>
        <InputForm label="총 자산 규모" w={'100%'}>
          <SimpleGrid w={'100%'} gap={'16px'} columns={{ base: 2, sm: 4 }}>
            <Button
              variant={'outline-secondary'}
              textStyle={'pre-body-5'}
              color={'grey.8'}
              w={'100%'}
            >
              1억원 미만
            </Button>
            <Button
              variant={'outline-secondary'}
              textStyle={'pre-body-5'}
              color={'grey.8'}
              w={'100%'}
            >
              1억~5억원 미만
            </Button>
            <Button
              variant={'outline-secondary'}
              textStyle={'pre-body-5'}
              color={'grey.8'}
              w={'100%'}
            >
              5억원 이상
            </Button>
            <Button
              variant={'outline-secondary'}
              textStyle={'pre-body-5'}
              color={'grey.8'}
              w={'100%'}
            >
              자산 없음
            </Button>
          </SimpleGrid>
        </InputForm>
        <InputForm label="연 소득">
          <SimpleGrid w={'100%'} gap={'16px'} columns={{ base: 2, sm: 4 }}>
            <Button
              variant={'outline-secondary'}
              textStyle={'pre-body-5'}
              color={'grey.8'}
              w={'100%'}
            >
              5천만원 미만
            </Button>
            <Button
              variant={'outline-secondary'}
              textStyle={'pre-body-5'}
              color={'grey.8'}
              w={'100%'}
            >
              5천만원~1억원 미만
            </Button>
            <Button
              variant={'outline-secondary'}
              textStyle={'pre-body-5'}
              color={'grey.8'}
              w={'100%'}
            >
              1억원 이상
            </Button>
            <Button
              variant={'outline-secondary'}
              textStyle={'pre-body-5'}
              color={'grey.8'}
              w={'100%'}
            >
              소득 없음
            </Button>
          </SimpleGrid>
        </InputForm>
        <Flex gap={'16px'}>
          <InputForm label="월 실수령액 또는 월 수입">
            <InputGroup>
              <Input placeholder="0" />
              <InputRightElement>
                <Text>만원</Text>
              </InputRightElement>
            </InputGroup>
          </InputForm>
          <InputForm label="월 고정 지출">
            <InputGroup>
              <Input placeholder="0" />
              <InputRightElement>
                <Text>만원</Text>
              </InputRightElement>
            </InputGroup>
          </InputForm>
        </Flex>

        <InputForm label="부채규모">
          <SimpleGrid w={'100%'} gap={'16px'} columns={{ base: 2, sm: 4 }}>
            <Button
              variant={'outline-secondary'}
              textStyle={'pre-body-5'}
              color={'grey.8'}
              w={'100%'}
            >
              5천만원 미만
            </Button>
            <Button
              variant={'outline-secondary'}
              textStyle={'pre-body-5'}
              color={'grey.8'}
              w={'100%'}
            >
              5천만원~1억원 미만
            </Button>
            <Button
              variant={'outline-secondary'}
              textStyle={'pre-body-5'}
              color={'grey.8'}
              w={'100%'}
            >
              1억원 이상
            </Button>
            <Button
              variant={'outline-secondary'}
              textStyle={'pre-body-5'}
              color={'grey.8'}
              w={'100%'}
            >
              부채 없음
            </Button>
          </SimpleGrid>
        </InputForm>
        <Flex gap={'16px'}>
          <InputForm label="변제방법 (자금원천)">
            <Box w={'100%'}>
              <Select options={INCOME_CATEGORIES} placeholder="선택" />
            </Box>
          </InputForm>
          <InputForm label="신용평가점수 (NICE 기준)">
            <>
              <Box w={'100%'}>
                <Select options={INCOME_CATEGORIES} placeholder="선택" />
              </Box>
              <Button
                variant={'text-primary'}
                textStyle={'pre-body-5'}
                onClick={() => {
                  window.open('https://campaign.naver.com/credit/', '_blank')
                }}
              >
                신용점수 조회하기
              </Button>
            </>
          </InputForm>
        </Flex>
        <InputForm label="신용정보 제출하기">
          <Button
            variant={'outline-secondary'}
            textStyle={'pre-body-5'}
            color={'grey.8'}
            w={'209px'}
          >
            제출
          </Button>
        </InputForm>
        <VStack
          alignItems={'flex-start'}
          p={'24px 20px'}
          borderRadius={'20px'}
          border={'1px solid'}
          borderColor={'border.basic.1'}
          gap={'24px'}
        >
          <HStack>
            <InfoFillIcon boxSize={'24px'} />
            <Text textStyle={'pre-body-7'} color={'grey.9'}>
              안내사항
            </Text>
          </HStack>
          <Text textStyle={'pre-body-6'} color={'grey.8'}>
            피움대부는 서비스 이행을 위해서 아래와 같이 개인정보를 위탁하여
            운영하고 있습니다.
            <br /> 당사의 개인정보 위탁 처리 기관 및 위탁 업무는 아래와
            같습니다.
          </Text>
          <Box
            p={'10px 20px'}
            textStyle={'pre-body-6'}
            color={'grey.8'}
            bg={'background.basic.2'}
            w={'100%'}
            borderRadius={'10px'}
          >
            가. 위탁기관 : NICE 평가정보주식회사
            <br />
            나. 위탁업무 : 본인인증, 이용약관 및 개인정보/DI
            수집ㆍ이용/제공ㆍ활용/조회 동의
          </Box>
          <Text textStyle={'pre-body-6'} color={'grey.8'}>
            본인은 본 개인정보 처리 업무의 위탁에 동의합니다.
          </Text>
        </VStack>
        <InputForm label="대출 용도 및 상환 계획" w={'100%'}>
          <Flex flexDir={'column'} gap={'12px'} w={'100%'}>
            <Text textStyle={'pre-caption-2'} color={'grey.7'}>
              *대출금 사용 용도 및 예상 상환 방법을 구체적으로 기재하시면 심사에
              도움이 됩니다.
            </Text>
            <Textarea
              w={'100%'}
              h={'200px'}
              p={'10px'}
              placeholder="(예시) 자녀 출산으로 인해 산후 조리원 비용이 예상보다 많이 나왔습니다. <br/>오백만원만 빌리면, 3개월 동안 월급을 모아서 상환할 수 있습니다."
            />
          </Flex>
        </InputForm>
        <Flex
          w={'100%'}
          justifyContent={'center'}
          pt={'40px'}
          borderTop={'1px solid'}
          borderColor={'border.basic.1'}
        >
          <Button
            variant={'solid-primary'}
            w={'160px'}
            onClick={() => router.push('/apply-loan?step=3')}
          >
            다음
          </Button>
        </Flex>
      </Flex>
    </Container>
  )
}

export default ApplyLoanStep3
