import React, { useCallback, useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'

import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'

import ModalBasis from '@/components/@Modal/ModalBasis'
import { REPAYMENT_TYPE } from '@/constants/loan'
import { useLoanRetrieveQuery } from '@/generated/apis/Loan/Loan.query'

interface MyLoanTermsModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
  termsNumber: number
}

function MyLoanTermsModal({
  isOpen,
  onClose,
  onConfirm,
  termsNumber = 1,
}: MyLoanTermsModalProps) {
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm()
    } else {
      onClose()
    }
  }

  const handleClose = () => {
    onClose()
  }

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10 // 10px 여유
      console.log('Scroll debug:', {
        scrollTop,
        scrollHeight,
        clientHeight,
        isAtBottom,
      })
      setIsScrolledToBottom(isAtBottom)
    }
  }, [])

  useEffect(() => {
    if (isOpen && (termsNumber === 1 || termsNumber === 2)) {
      // termsNumber가 1인 경우에만 스크롤 이벤트 추가
      let retryCount = 0
      const maxRetries = 10

      const tryAddScrollListener = () => {
        const container = scrollContainerRef.current
        if (container) {
          console.log('Adding scroll listener to container:', container)
          container.addEventListener('scroll', handleScroll)
          // 초기 상태 확인
          handleScroll()
          return true
        } else {
          retryCount++
          console.log(
            `Container not found, retrying... (${retryCount}/${maxRetries})`,
          )
          if (retryCount < maxRetries) {
            setTimeout(tryAddScrollListener, 100)
          }
          return false
        }
      }

      const timer = setTimeout(tryAddScrollListener, 100)

      return () => {
        clearTimeout(timer)
        const container = scrollContainerRef.current
        if (container) {
          console.log('Removing scroll listener from container:', container)
          container.removeEventListener('scroll', handleScroll)
        }
      }
    }
  }, [isOpen, termsNumber, handleScroll])

  // 모달이 열릴 때마다 스크롤 상태 초기화
  useEffect(() => {
    if (isOpen) {
      console.log('Modal opened, termsNumber:', termsNumber)
      setIsScrolledToBottom(termsNumber !== 1) // termsNumber가 1이 아닌 경우는 항상 true
    } else {
      console.log('Modal closed, resetting scroll state')
      setIsScrolledToBottom(false)
    }
  }, [isOpen, termsNumber])

  // 모달이 닫힐 때 모든 이벤트 리스너 정리
  useEffect(() => {
    if (!isOpen) {
      const container = scrollContainerRef.current
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [isOpen])

  const getTitle = () => {
    switch (termsNumber) {
      case 1:
        return '대부거래 계약 주요 조건 (요약본)'
      case 2:
        return '대부거래 표준약관'
      case 3:
        return '채권양도(담보제공) 승낙서'
      default:
        return '대부거래 계약 주요 조건 (요약본)'
    }
  }

  const getBodyContent = () => {
    switch (termsNumber) {
      case 1:
        return <LoanTermsTable isOpen={isOpen} termsNumber={termsNumber} />
      case 2:
        return <LoanStandardTerms />
      case 3:
        return <LoanAssignment />
    }
  }

  return (
    <ModalBasis
      isOpen={isOpen}
      visibleCloseButton={true}
      onClose={handleClose}
      size={{ base: 'full', sm: 'xl' }}
      header={
        <Box
          pb={'16px'}
          borderBottom={'1px solid'}
          borderColor={'border.basic.1'}
        >
          <Text textStyle={'pre-heading-2'} color={'grey.10'}>
            {getTitle()}
          </Text>
        </Box>
      }
      body={
        <Flex
          ref={scrollContainerRef}
          flexDir={'column'}
          gap={'12px'}
          maxH={'450px'}
          pr={'12px'}
          overflowY={'auto'}
        >
          {getBodyContent()}
        </Flex>
      }
      footer={
        <Flex w="100%">
          <Button
            w="100%"
            variant={isScrolledToBottom ? 'solid-primary' : 'outline-primary'}
            onClick={handleConfirm}
            isDisabled={!isScrolledToBottom}
          >
            확인
          </Button>
        </Flex>
      }
    ></ModalBasis>
  )
}

export default MyLoanTermsModal

const LoanTermsTable = ({
  isOpen,
  termsNumber,
}: {
  isOpen: boolean
  termsNumber: number
}) => {
  const router = useRouter()
  const { data: loanData } = useLoanRetrieveQuery({
    variables: {
      id: Number(router.query.userId),
    },
    options: {
      enabled: !!router.query.userId && !!isOpen && termsNumber === 1,
    },
  })
  return (
    <>
      <Flex
        borderBottom={'1px solid'}
        borderColor={'border.basic.1'}
        mb={'12px'}
      >
        <Box
          w={'30%'}
          p={'12px'}
          bg={'background.basic.2'}
          borderRight={'1px solid'}
          borderColor={'border.basic.1'}
        >
          <Text textStyle={'pre-body-68'} color={'grey.10'} fontWeight={'500'}>
            계약 번호
          </Text>
        </Box>
        <Box w={'70%'} p={'12px'}>
          <Text textStyle={'pre-body-68'} color={'grey.10'}>
            {loanData?.no}
          </Text>
        </Box>
      </Flex>

      <Box
        border={'1px solid'}
        borderColor={'border.basic.1'}

        //   overflow={'hidden'}
      >
        {/* 대부금액 */}
        <Flex borderBottom={'1px solid'} borderColor={'border.basic.1'}>
          <Box
            w={'120px'}
            p={'12px'}
            bg={'background.basic.2'}
            borderRight={'1px solid'}
            borderColor={'border.basic.1'}
          >
            <Text
              textStyle={'pre-body-68'}
              color={'grey.10'}
              fontWeight={'500'}
            >
              대부금액
            </Text>
          </Box>
          <Box w={'70%'} p={'12px'}>
            <Text textStyle={'pre-body-68'} color={'grey.10'}>
              {loanData?.loanAmount?.toLocaleString()}
            </Text>
          </Box>
        </Flex>

        {/* 이자율 */}
        <Flex
          flexDir={'column'}
          // border={'1px solid'}
          // borderColor={'border.basic.1'}
        >
          {/* 이자율 섹션 */}
          <Flex
            flexDir={'column'}
            borderBottom={'1px solid'}
            borderColor={'border.basic.1'}
          >
            {/* 이자율 헤더 */}
            <Flex
              justifyContent={'center'}
              w={'100%'}
              p={'12px'}
              bg={'background.basic.2'}
              borderBottom={'1px solid'}
              borderColor={'border.basic.1'}
            >
              <Text textStyle={'pre-body-68'} color={'grey.9'}>
                이자율
              </Text>
            </Flex>
            {/* 이자율 내용 */}
            <Flex justifyContent={'space-between'} w={'100%'}>
              <Flex w={'100%'}>
                <Flex w={'100%'} justifyContent={'space-between'}>
                  <Box
                    minW={'120px'}
                    bg={'background.basic.2'}
                    borderRight={'1px solid'}
                    borderColor={'border.basic.1'}
                  >
                    <Text
                      py={'8px'}
                      px={'12px'}
                      textStyle={'pre-body-68'}
                      color={'grey.10'}
                    >
                      월이율
                    </Text>
                  </Box>
                  <Box
                    w={'100%'}
                    borderRight={'1px solid'}
                    borderColor={'border.basic.1'}
                  >
                    <Text
                      py={'8px'}
                      px={'12px'}
                      textStyle={'pre-body-68'}
                      color={'grey.10'}
                    >
                      -
                    </Text>
                  </Box>
                </Flex>
                <Flex w={'100%'}>
                  <Box
                    minW={'120px'}
                    borderRight={'1px solid'}
                    bg={'background.basic.2'}
                    borderColor={'border.basic.1'}
                  >
                    <Text
                      py={'8px'}
                      px={'12px'}
                      textStyle={'pre-body-68'}
                      color={'grey.10'}
                    >
                      연이율
                    </Text>
                  </Box>
                  <Box w={'100%'}>
                    <Text
                      py={'8px'}
                      px={'12px'}
                      textStyle={'pre-body-68'}
                      color={'grey.10'}
                    >
                      {loanData?.contract?.interestRate || 0}%
                    </Text>
                  </Box>
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          {/* 연체이율 섹션 */}
          <Flex flexDir={'column'}>
            {/* 연체이율 헤더 */}
            <Flex
              justifyContent={'center'}
              w={'100%'}
              p={'12px'}
              bg={'background.basic.2'}
              borderBottom={'1px solid'}
              borderColor={'border.basic.1'}
            >
              <Text textStyle={'pre-body-68'} color={'grey.9'}>
                연체이율
              </Text>
            </Flex>
            {/* 연체이율 내용 */}
            <Flex
              borderBottom={'1px solid'}
              borderColor={'border.basic.1'}
              justifyContent={'space-between'}
              w={'100%'}
            >
              <Flex w={'100%'}>
                <Flex w={'100%'} justifyContent={'space-between'}>
                  <Box
                    minW={'120px'}
                    bg={'background.basic.2'}
                    borderRight={'1px solid'}
                    borderColor={'border.basic.1'}
                  >
                    <Text
                      py={'8px'}
                      px={'12px'}
                      textStyle={'pre-body-68'}
                      color={'grey.10'}
                    >
                      월이율
                    </Text>
                  </Box>
                  <Box
                    w={'100%'}
                    borderRight={'1px solid'}
                    borderColor={'border.basic.1'}
                  >
                    <Text
                      py={'8px'}
                      px={'12px'}
                      textStyle={'pre-body-68'}
                      color={'grey.10'}
                    >
                      -
                    </Text>
                  </Box>
                </Flex>
                <Flex w={'100%'}>
                  <Box
                    minW={'120px'}
                    borderRight={'1px solid'}
                    bg={'background.basic.2'}
                    borderColor={'border.basic.1'}
                  >
                    <Text
                      py={'8px'}
                      px={'12px'}
                      textStyle={'pre-body-68'}
                      color={'grey.10'}
                    >
                      연이율
                    </Text>
                  </Box>
                  <Box w={'100%'}>
                    <Text
                      py={'8px'}
                      px={'12px'}
                      textStyle={'pre-body-68'}
                      color={'grey.10'}
                    >
                      {loanData?.contract?.overdueInterestRate || 0}%
                    </Text>
                  </Box>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        {/* 이자계산방법 */}
        <Flex borderBottom={'1px solid'} borderColor={'border.basic.1'}>
          <Box
            w={'120px'}
            p={'12px'}
            bg={'background.basic.2'}
            borderRight={'1px solid'}
            borderColor={'border.basic.1'}
          >
            <Text textStyle={'pre-body-68'} color={'grey.9'}>
              이자계산방법
            </Text>
          </Box>
          <Box w={'70%'} p={'12px'}>
            <VStack spacing={'4px'} align={'stretch'}>
              <Text textStyle={'pre-body-68'} color={'grey.10'}>
                * 현행 대부업 등의 등록 및 금융이용자 보호에 관한 법률에 따른
                최고이자율은 연 20%입니다.
              </Text>
              <Text textStyle={'pre-body-68'} color={'grey.10'}>
                * 이자계산방법 예시
              </Text>
              <Text textStyle={'pre-body-68'} color={'grey.10'}>
                (대부잔액×연 이자율÷365(윤년의 경우 366))×이용일 수
              </Text>
              <Text textStyle={'pre-body-68'} color={'grey.10'}>
                (대부잔액×연 이자율÷12)×이용 개월 수
              </Text>
            </VStack>
          </Box>
        </Flex>

        {/* 계약일자 */}
        <Flex borderBottom={'1px solid'} borderColor={'border.basic.1'}>
          <Box
            w={'120px'}
            p={'12px'}
            bg={'background.basic.2'}
            borderRight={'1px solid'}
            borderColor={'border.basic.1'}
          >
            <VStack spacing={'2px'} align={'stretch'}>
              <Text textStyle={'pre-body-68'} color={'grey.9'}>
                계약일자
              </Text>
              <Text textStyle={'pre-body-68'} color={'grey.9'}>
                (대부일자)
              </Text>
            </VStack>
          </Box>
          <Box w={'70%'} p={'12px'}>
            <Text textStyle={'pre-body-68'} color={'grey.10'}>
              {loanData?.contract?.loanDate || '-'}
            </Text>
          </Box>
        </Flex>

        {/* 대부기간 만료일 */}
        <Flex borderBottom={'1px solid'} borderColor={'border.basic.1'}>
          <Box
            w={'120px'}
            p={'12px'}
            bg={'background.basic.2'}
            borderRight={'1px solid'}
            borderColor={'border.basic.1'}
          >
            <Text textStyle={'pre-body-68'} color={'grey.9'}>
              대부기간 만료일
            </Text>
          </Box>
          <Box w={'70%'} p={'12px'}>
            <Text textStyle={'pre-body-68'} color={'grey.9'}>
              {loanData?.contract?.maturityDate || '-'}
            </Text>
          </Box>
        </Flex>

        {/* 연대보증 계약여부 */}
        <Flex borderBottom={'1px solid'} borderColor={'border.basic.1'}>
          <Box
            w={'120px'}
            p={'12px'}
            bg={'background.basic.2'}
            borderRight={'1px solid'}
            borderColor={'border.basic.1'}
          >
            <VStack spacing={'2px'} align={'stretch'}>
              <Text textStyle={'pre-body-68'} color={'grey.9'}>
                연대보증 계약여부
              </Text>
              <Text textStyle={'pre-body-68'} color={'grey.9'}>
                (연대보증인)
              </Text>
            </VStack>
          </Box>
          <Box w={'70%'} p={'12px'}>
            <Text textStyle={'pre-body-68'} color={'grey.10'}>
              {loanData?.contract?.guarantorName || '-'}
            </Text>
          </Box>
        </Flex>

        {/* 은행계좌번호 */}
        <Flex borderBottom={'1px solid'} borderColor={'border.basic.1'}>
          <Box
            w={'120px'}
            p={'12px'}
            bg={'background.basic.2'}
            borderRight={'1px solid'}
            borderColor={'border.basic.1'}
          >
            <VStack spacing={'2px'} align={'stretch'}>
              <Text textStyle={'pre-body-68'} color={'grey.9'}>
                은행계좌번호
              </Text>
              <Text textStyle={'pre-body-68'} color={'grey.9'}>
                (상환 입금 계좌)
              </Text>
            </VStack>
          </Box>
          <Box w={'70%'} p={'12px'}>
            <Text textStyle={'pre-body-68'} color={'grey.10'}>
              {loanData?.contract?.repaymentAccountName}{' '}
              {loanData?.contract?.repaymentAccountNumber} (
              {loanData?.contract?.repaymentAccountHolder})
            </Text>
          </Box>
        </Flex>

        {/* 변제방법 */}
        <Flex borderBottom={'1px solid'} borderColor={'border.basic.1'}>
          <Box
            w={'120px'}
            p={'12px'}
            bg={'background.basic.2'}
            borderRight={'1px solid'}
            borderColor={'border.basic.1'}
          >
            <Text textStyle={'pre-body-68'} color={'grey.9'}>
              변제방법
            </Text>
          </Box>
          <Box w={'70%'} p={'12px'}>
            <VStack spacing={'4px'} align={'stretch'}>
              <Text textStyle={'pre-body-68'} color={'grey.10'}>
                1. 대출금의 상환 및 이자의 지급은 은행송금(채권자 입금계좌)
                방법에 의한다.
              </Text>
              <Text textStyle={'pre-body-68'} color={'grey.10'}>
                2. 채무자는 약정 이자(원리금균등분할상환 방식의 경우 원리금)를
                매월 {loanData?.contract?.interestPaymentDate || '-'}일에
                납부하며, 해당일이 없는 경우 그 달 말일에 납부한다.
              </Text>
              <Text textStyle={'pre-body-68'} color={'grey.10'}>
                3. 대출원금은{' '}
                {REPAYMENT_TYPE.find(
                  (type) => type.value === loanData?.contract?.repaymentType,
                )?.label || '-'}
                방법에 의해 상환하며, 대출금의 상환 및 이자의 지급은 비용, 이자,
                원금순으로 충당한다.
              </Text>
            </VStack>
          </Box>
        </Flex>

        {/* 조기상환조건 */}
        <Flex borderBottom={'1px solid'} borderColor={'border.basic.1'}>
          <Box
            w={'120px'}
            p={'12px'}
            bg={'background.basic.2'}
            borderRight={'1px solid'}
            borderColor={'border.basic.1'}
          >
            <VStack spacing={'2px'} align={'stretch'}>
              <Text textStyle={'pre-body-68'} color={'grey.9'}>
                조기상환조건
              </Text>
              <Text textStyle={'pre-body-68'} color={'grey.9'}>
                (중도상환수수료율)
              </Text>
            </VStack>
          </Box>
          <Box w={'70%'} p={'12px'}>
            <VStack spacing={'4px'} align={'stretch'}>
              <Text textStyle={'pre-body-68'} color={'grey.10'}>
                1. 계약 체결 후 3년이내 조기상환 시{' '}
                {loanData?.contract?.prepaymentRate || 0}%의 중도상환 수수료가
                발생합니다.
              </Text>
              <Text textStyle={'pre-body-68'} color={'grey.10'}>
                • (단, 대부이자, 연체이자, 중도상환수수료 합계금액은
                법정최고금리 연20%를 초과하지 않습니다.)
              </Text>
              <Text textStyle={'pre-body-68'} color={'grey.10'}>
                • 중도상환수수료=중도상환대부금액 X 중도상환수수료율 X (잔여일수
                ÷ 대부기간)
              </Text>
            </VStack>
          </Box>
        </Flex>

        {/* 부대비용의 내용 및 금액 */}
        <Flex borderBottom={'1px solid'} borderColor={'border.basic.1'}>
          <Box
            w={'120px'}
            p={'12px'}
            bg={'background.basic.2'}
            borderRight={'1px solid'}
            borderColor={'border.basic.1'}
          >
            <Text textStyle={'pre-body-68'} color={'grey.9'}>
              부대비용의 내용 및 금액
            </Text>
          </Box>
          <Box w={'70%'} p={'12px'}>
            <VStack spacing={'4px'} align={'stretch'}>
              <Text textStyle={'pre-body-68'} color={'grey.10'}>
                1. 신용정보조회비용(
                {loanData?.contract?.creditInquiryFee.toLocaleString() || 0}원)
              </Text>
              <Text textStyle={'pre-body-68'} color={'grey.10'}>
                • 부동산 담보대출의 경우 담보권설정비용(등록면허세, 지방교육세,
                국민주택채권매입비 등) 발생
              </Text>
              <Text textStyle={'pre-body-68'} color={'grey.10'}>
                • 부대비용은 채무자가 부담하며, 대출금에서 해당 비용을 공제한
                나머지 금액만 채무자의 계좌로 입금됩니다. 이 경우 대부금액
                자체에는 변동이 없습니다.
              </Text>
            </VStack>
          </Box>
        </Flex>

        {/* 특약사항 */}
        <Flex>
          <Box
            w={'120px'}
            p={'12px'}
            bg={'background.basic.2'}
            borderRight={'1px solid'}
            borderColor={'border.basic.1'}
          >
            <Text textStyle={'pre-body-68'} color={'grey.9'}>
              특약사항
            </Text>
          </Box>
          <Box w={'70%'} p={'12px'}>
            <Text textStyle={'pre-body-68'} color={'grey.10'}>
              {loanData?.contract?.specialTerms || '-'}
            </Text>
          </Box>
        </Flex>
      </Box>
    </>
  )
}

const LoanStandardTerms = () => {
  return (
    <VStack w={'100%'} spacing={'16px'} alignItems={'flex-start'}>
      <Text textStyle={'pre-body-68'}>
        <strong>제1조(목적)</strong> 이 약관은 대부업자와 채무자간의 대부거래에
        있어서 권리와 의무를 명확히 하고 공정하며 건전한 금전소비대차를 하는
        것을 목적으로 한다.
      </Text>
      <Text textStyle={'pre-body-68'}>
        <strong>제2조(적용범위)</strong> 이 약관은 대부업자와 채무자 사이의 가계
        또는 기업의 자금대부 또는 그 중개 및 어음할인 등의 금전의 대부와 관련된
        대부업자와 채무자 사이의 모든 거래에 적용된다.
      </Text>
      <VStack w={'100%'} spacing={'10px'} alignItems={'flex-start'}>
        <Text textStyle={'pre-body-68'}>
          <strong>제3조(용어의 정의)</strong> 이 약관에서 사용하는 용어의 정의는
          다음과 같다.
        </Text>
        <Text textStyle={'pre-body-68'}>
          1. “대부업”이라 함은 금전의 대부 또는 그 중개, 금전의 대부와 관련한
          어음의 할인 및 이와 유사한 방법에 의한 금전의 교부와 관련된 사항을 그
          업으로 행하는 사업을 말한다.
        </Text>
        <Text textStyle={'pre-body-68'}>
          2. “대부업자”라 함은 관할관청에 등록여부를 불문하고 대부업을 영위하는
          개인 및 법인으로 한다.
        </Text>
        <Text textStyle={'pre-body-68'}>
          3. “채무자”라 함은 대부계약의 체결로 인하여 대부업자에 대하여 채무를
          부담하는 자를 말한다.
        </Text>
        <Text textStyle={'pre-body-68'}>
          4. “보증인”이라 함은 채무자가 채무를 이행하지 않는 경우에 그 채무를
          대신 이행할 종(從)된 채무를 부담하는 자를 말한다.
        </Text>
      </VStack>
      <VStack w={'100%'} spacing={'10px'} alignItems={'flex-start'}>
        <Text textStyle={'pre-body-68'}>
          <strong>제4조(실명거래)</strong> 1 대부업자와 채무자 사이의 거래는
          실명으로 한다. 2 대부업자는 채무자가 본인임을 확인할 의무가 있다. 3
          대부업자와 채무자 사이의 계약은 채무자 본인이 직접 체결하는 것을
          원칙으로 하되, 채무자의 대리인과 계약을 체결하는 경우에는 채무자가
          발급받은 인감증명서 또는 본인서명사실확인서(또는
          전자본인서명사실확인서 발급증)를 첨부한 위 임장에 의하여야 한다.
        </Text>
        <Text textStyle={'pre-body-68'}>
          <strong>제5조(약관의 명시.설명.교부)</strong> 1 대부업자는 이 약관을
          영업장에 비치하고, 채무자는 영업시간 중 언제든지 이를 열람하거나 그
          교부를 청구할 수 있다. 2 대부업자는 계약체결 전에 이 약관 제7조를
          포함한 중요내용을 채무자가 이해할 수 있도록 설명하고 약관을 교부한다.
        </Text>
        <Text textStyle={'pre-body-68'}>
          <strong>제6조(계약의 성립)</strong> 대부업자가 약관의 내용을 설명하고
          채무자가 본 계약서에 의하여 이의 적용을 동의한 경우 계약은 성립한다.
        </Text>
        <Text textStyle={'pre-body-68'}>
          <strong>제7조(계약서 필수기재사항)</strong>
          <br />
          대부거래 표준계약서에는 다음의 사항을 반드시 기재한다.
          <br /> 1. 대부업자(그 영업소를 포함한다)의 성명 또는 상호, 주소,
          전화번호, 생년월일(성별) 또는 사업자등록번호
          <br />
          2. 대부업등록번호
          <br />
          3. 채무자의 성명 또는 상호, 주소, 전화번호, 생년월일(성별) 또는
          사업자등록번호
          <br />
          4. 계약일자
          <br />
          5. 대부금액
          <br />
          6. 이자율(이자율의 세부내역 및 연이자율로 환산한 것을 포함)
          <br />
          7. 연체이자율
          <br />
          8. 변제기간 및 변제방법
          <br />
          9. 대부금을 변제받을 은행계좌번호
          <br />
          10. 채무의 조기상환조건
          <br />
          11. 부대비용이 있는 경우 그 내용 및 금액
          <br />
          12. 보증인이 있는 경우 보증인의 성명 또는 상호, 주소, 생년월일(성별)
          또는 사업자등록번호, 보증의 내용
        </Text>
        <Text textStyle={'pre-body-68'}>
          <strong>제8조(이자율 등의 제한)</strong>
          <br />
          1. 대부업자는 관계법령이 정하는 이자율(연체이자율 포함)의 범위 내에서
          계약을 체결하기로 한다.
          <br /> 2. 제1항의 규정에 의한 이자율을 산정함에 있어 사례금, 할인금,
          수수료, 공제금, 연체이자, 체당금, 그밖에 그 명칭에 불구하고 대부와
          관련하여 대부업자가 받는 것은 이를 이자로 본다. 다만 당해 거래의
          계약체결과 변제에 관한 부대비용으로서 관련 법령이 정한 사항은 그러하지
          아니하다.
          <br />
          3. 대부업자가 제1항의 규정에 의하지 않은 대부계약을 체결한 경우
          제1항에 따른 이자율을 초과하는 부분에 대한 이자계약은 무효로 한다.
          <br /> 4. 채무자가 대부업자에게 제1항에 따른 이자율을 초과하는 이자를
          지급한 경우 그 초과 지급된 이자 상당금액은 원본에 충당되고, 원본에
          충당되고 남은 금액이 있으면 그 반환을 청구할 수 있다.
          <br /> 5. 대부업자가 선이자를 사전에 공제하는 경우에는 그 공제액을
          제외하고 채무자가 실제로 받은 금액을 원본으로 하여 제1항에 따른
          이자율을 산정한다.
        </Text>
        <Text textStyle={'pre-body-68'}>
          <strong>제9조(비용의 부담)</strong>
          <br /> 다음 각 호의 비용은 채무자가 부담한다.
        </Text>
      </VStack>
      <VStack w={'100%'} spacing={'10px'} alignItems={'flex-start'}>
        <Text textStyle={'pre-body-68'}>
          1. 채무자ᆞ보증인에 대한 대부업자의 채권ᆞ담보권 등의 권리의
          행사ᆞ보전(해지 포함)에 관한 비용 2. 채무이행 지체에 따른 독촉 및
          통지비용 3. 채무 및 보증채무와 관련된 증명서의 발급 비용
        </Text>
        <Text textStyle={'pre-body-68'}>
          2. 대부업자나 대부업자가 지정하는 자가 제1항 각 호의 업무를 처리하고
          그 비용을 채무자에게 청구하는 경우에는 실비를 초과할 수 없으며
          소요비용이 최소화되도록 하여야 한다.
        </Text>
        <Text textStyle={'pre-body-68'}>
          3. 제1항에 의한 비용을 대부업자가 대신 지급한 경우에는, 대부업자는
          이를 즉시 채무자에게 통지하여 채무자가 이를 곧 변제하도록 하고 만일
          채무자가 그러하지 아니하는 경우에는 대부업자가 대신 지급한 금액에
          대하여, 대신 지급한 날부터 다 갚는 날까지의 날짜수 만큼, 상법
          제54조(상사법정이율)에 의한 연 6푼의 범위 내에서 약정금리로, 1년을
          365일로 보고 1일 단위로 계산한 금액을 더하여 갚기로 한다.
        </Text>
        <Text textStyle={'pre-body-68'}>
          4. 대부업자는 대부계약 약정 시 채무자가 사전에 알 수 있도록, 약정이자
          외에 담보대출에 소요되는 부대비용의 항목과 금액을 알려주어야 한다.
        </Text>
        <Text textStyle={'pre-body-68'}>
          <strong>제10조(계약서의 교부 등)</strong>
          <br /> 1. 계약내용을 명확히 하기 위하여 계약서는 2부를 작성하여
          대부업자와 채무자가 각각 보관하는 것으로 한다.
          <br /> 2. 상환 완료 후 채무자는 대부계약서 및 계약관계서류의 반환을
          서면으로 요구할 수 있고, 이의 반환 요청이 있는 경우 대부업자는
          대부계약서 및 계약관계서류를 즉시 반환하기로 한다.
          <br /> 3. 인터넷을 통해 전자적인 형태로 대부거래 약정을 체결하는 경우
          대부업자는 지체없이 계약서를 전자우편 등으로 채무자에게 송부하고,
          계약기간 동안 홈페이지에서 당해 계약사항의 열람, 인쇄가 가능하도록
          조치하여야 한다. 다만, 채무자의 요청이 있는 경우에는 계약서를 서면으로
          교부한다.
        </Text>
        <Text textStyle={'pre-body-68'}>
          <strong>제11조(담보의 제공)</strong> <br />
          채무자 또는 보증인의 신용악화, 제공한 담보의 가치감소의 사유가
          발생하여 대부업자가 채권보전상 필요하다고 인정되는 경우에는 채무자는
          대부업자의 청구에 의하여 대부업자가 인정하는 담보를 제공하거나
          보증인을 세 우기로 한다. 다만, 담보의 제공이나 보증인을 세울 때에는
          반드시 채권보전의 범위 내 이어야 한다.
        </Text>
        <Text textStyle={'pre-body-68'}>
          <strong>제12조(기한의 이익의 상실)</strong>
          <br />
          ① 채무자에게 다음 각 호의 사유가 발생한 경우에는 대부업자로부터의
          독촉ᆞ통지 등이 없어도, 채무자는 기한의 이익을 상실한다.
          <br />
          1. 채무자가 제공한 담보재산에 대하여 압류명령이나 체납처분 압류 통지가
          발송된 때 또는 기타의 방법에 의한 강제집행개시나 체납처분착수가 있는
          때 <br />
          2. 채무불이행자명부 등재 신청이 있는 때 <br />
          3. 어음교환소의 거래정지처분이 있을 때 <br />
          4. 도피 또는 기타의 사유로 금융기관에서 채무자에 대한 지급을 정지한
          것으로 인정된 때 5. 파산신청이 있는 때
        </Text>
        <Text textStyle={'pre-body-68'}>
          ② 채무자에게 다음 각 호의 사유가 발생한 경우에는 기한의 이익을
          상실한다. 다만, 대부업자는 기한의 이익상실일 7영업일전까지 다음 각
          호의 채무이행지체사실과 이에 따라 기한의 이익이 상실된다는 사실을
          채무자에게 통지하여야 하며, 기 한의 이익상실일 7영업일전까지 통지하지
          않은 경우에는 채무자는 실제통지가 도달한 날부터 7영업일이 경과한 날에
          기한의 이익을 상실한다.
          <br /> 1. 이자를 지급하여야 할 때부터 2개월간 지체한 때<br /> 2.
          분할상환금 또는 분할상환원리금의 지급을 2회 이상 연속하여 지체하고 그
          금액이 대출금의 10분의1을 초과하는 경우
        </Text>
        <Text textStyle={'pre-body-68'}>
          ③ 채무자에 관하여 다음 각 호에서 정한 사유중 하나라도 발생하여
          대부업자의 채권보전에 현저한 위험이 예상될 경우, 대부업자는 서면으로
          당해 위험 및 신용의 회복 등을 독촉하고, 그 통지의 도달일부터 10영업일
          이상으로 대부업자가 정한 기간이 경과하면, 채무자는 대부업자에 대한
          당해 채무의 기한의 이익을 상실하여 곧 이를 갚아야 할 의무를 진다.
          <br /> 1. 채무자와 그의 보증인이 대출금을 수령한 후 당초 제출하기로
          약속한 대부계약에 필요한 중요서류(대출계약서, 보증계약서 등)를 30일
          이내에 제출하지 않을 때 <br />
          2. 채무자가 채무의 상환을 거부하는 의사를 명시적으로 표시할 때 <br />
          3. 채무자 및 보증인이 계약서의 주요한 내용을 허위로 기재하거나 제출한
          증빙서류가 위변조된 것으로 확인된 때
        </Text>
        <Text textStyle={'pre-body-68'}>
          ④ 제1항 내지 제3항에 의하여 채무자가 대부업자에 대한 채무의 기한의
          이익을 상실한 경우라도, 대부업자의 명시적 의사표시가 있거나,
          대부업자가 분할상환금ᆞ이자ᆞ지연배상금을 받는 등 정상적인 거래의 계속이
          있는 때에는, 그 채무 또는 대부업자가 지정하는 채무의 기한의 이익은 그
          때부터 부활되는 것으로 본다.
        </Text>
        <Text textStyle={'pre-body-68'}>
          <strong>제13조(기한전의 임의 상환 등)</strong>
          <br /> 채무자는 약정한 상환기일이 도래하기 전이라도 미리 아무런 부담
          없이 원금의 전부 또는 일부를 상환할 수 있다. 그러나 대부계약 체결 시
          채무자와 기한전의 임의 변제로 대부업자가 받을 손해에 대하여 미리 약정
          한 경우에 한하여 수수료 등을 채무자가 부담한다.
        </Text>
        <Text textStyle={'pre-body-68'}>
          <strong>제14조(채무의 변제 등의 충당)</strong>
          <br />① 채무자의 채무변제시 채무 전액을 소멸시키기에 부족한 때에는
          비용, 이자, 원금의 순서로 충당하기로 한다. 그러나 대부업자는
          채무자에게 불리하지 않은 범위 내에서 충당순서를 달리할 수 있으나
          채무자에게 이러한 사실을 서면으로 통지하 여야 한다.
        </Text>
        <Text textStyle={'pre-body-68'}>
          ② 변제될 채무가 수개인 경우로서 채무전액이 변제되지 않을 경우 강제집행
          또는 담보권 실행경매에 의한 회수금에 대하여는 민법 기타 법률이 정하는
          바에 따른다.
        </Text>
        <Text textStyle={'pre-body-68'}>
          ③ 변제될 채무가 수개인 경우로서 제2항에 해당되지 않는 임의의
          상환금으로 채무자의 채무전액을 없애기에 부족한 때에는 채무자가
          지정하는 순서에 따라 변제에 충당하기로 한다. 이 경우, 채무자가
          지정하는 순서에 따를 경우, 대부업자의 채 권보전에 지장이 생길 염려가
          있는 때에는 대부업자는 지체없이 이의를 표시하고, 물적담보나 보증의
          유무, 그 경중이나 처분의 난이, 변제기의 장단 등을 고려하여 대부업자가
          변제에 충당할 채무를 바꾸어 지정할 수 있으나 채무자에게 이러한 사실을
          서면으로 통지하여야 한다.
        </Text>
        <Text textStyle={'pre-body-68'}>
          ④ 대부업자가 변제충당순서를 제3항에 따라 민법 기타 법률이 정하는바와
          달리할 경우에는 대부업자의 채권보전에 지장이 없는 범위 내에서 채무자와
          담보제공자 및 보증인의 정당한 이익을 고려하여야 한다.
        </Text>
        <Text textStyle={'pre-body-68'}>
          <strong>제15조(영수증 등 서면교부)</strong>
          <br /> 대부업자는 채무자로부터 이자, 원금 등을 수령한 경우에는 영수증
          및 대출잔액 확인서를 서면 또는 전자우편 등으로 교부하여야 한다.
        </Text>
        <Text textStyle={'pre-body-68'}>
          <strong>제16조(통지사항 및 효력)</strong>
          <br /> ① 채무자는 주소, 전화번호, 근무처가 변경된(휴.퇴직 또는
          해고되거나 전.폐업한 경우포함) 경우 서면으로 대부업자에게 곧
          통지하여야 한다.
        </Text>
        <Text textStyle={'pre-body-68'}>
          ② 채무자가 제1항에 의한 통지를 게을리 하여 대부업자가 발송한 서면통지
          또는 기타서류가 채무자에게 연착하거나 도달되지 않은 때에는 보통의
          우송기간이 경과한 때에 도달한 것으로 본다. 이 경우 상계통지나 기한전의
          채무변제 청구 등 중 요한 의사표시는 반드시 배달증명부 내용증명에
          의하여야 하며, 배달증명부 내용증명이 아닌 경우에는 도달한 것으로 보지
          않고 다만 추정한다.
        </Text>
        <Text textStyle={'pre-body-68'}>
          ③ 대부업자는 주소 및 전화번호가 변경된 경우 이를 채무자에게 서면으로
          통지하여야 한다.
        </Text>
        <Text textStyle={'pre-body-68'}>
          <strong>제17조(채권양도)</strong> 대부업자는 본 계약서상의 채권을
          제3자에게 양도할 수는 있으나, 채권양도에 관하여는 반드시 사전에 채무자
          및 보증인에게 동의를 얻어야 한다.
        </Text>
        <Text textStyle={'pre-body-68'}>
          <strong>제18조(신용정보)</strong>
          <br />① 채무자가 제공한 신용정보(성명, 생년월일, 주소 등 본인의
          특정정보 및 차입내용, 상환사항, 연체 등의 객관적 정보)는 이 계약에
          의한 법적인 권리행사를 위해서만 이용할 수 있다. <br />② 채무자 및
          보증인은 그 주소지의 확인을 위하여 대부업자의 채권보전 등의 목적에
          따라 개인별 주민등록표의 열람을 승낙하기로 한다.
          <br />③ 대부업자는 채무자 본인과 보증인에 대하여만 개인정보를 요구할
          수 있다.
        </Text>
        <Text textStyle={'pre-body-68'}>
          <strong>제19조(이행장소ᆞ준거법)</strong>
          <br /> ① 채무의 이행장소는 다른 약정이 없는 한 거래 영업점으로 하고,
          송금방법은 대부업자의 은행계좌에 입금하는 것을 원칙으로 한다. 다만,
          부실채권의 관리 등 상당한 사유로 채권관리업무를 대부업자의
          본점ᆞ지역본부 또는 다른 영업점으로 이 관한 경우에는, 이관 받은
          본점ᆞ지역본부 또는 다른 영업점을 그 이행장소로 한다.
          <br /> ② 채무자가 내국인이 아닌 경우라도, 이 약관에 의한 대부거래에
          관하여 적용될 법률은 국내법을 적용한다.
        </Text>
        <Text textStyle={'pre-body-68'}>
          <strong>제20조(불법적 채권추심 행위의 금지)</strong>
          <br /> ① 대부업자(대부업자로부터 대부계약에 따른 채권을 양도 받거나
          채권의 추심을 위탁받은 자를 포함한다)는 대부거래 계약에 따른 채권을
          추심함에 있어서 다음 각 호의 방법을 사용하지 않기로 한다.
          <br />
          1. 채무자 또는 관계인을 폭행.협박.체포 또는 감금하거나 그에게 위계나
          위력을 사용하는 행위 <br />
          2. 정당한 사유없이 반복적으로 또는 야간(오후 9시 이후부터 다음날 오전
          8시까지를 말한다)에 채무자나 관계인을 방문함으로써 공포심이나 불안감을
          유발하여 사생활 또는 업무의 평온을 심하게 해치는 행위 <br />
          3. 정당한 사유없이 반복적으로 또는 야간에 전화하는 등 말.글.음향.영상
          또는 물건을 채무자나 관계인에게 도달하게 함으로써 공포심이나 불안감을
          유발하여 사생활 또는 업무의 평온을 심하게 해치는 행위
          <br /> 4. 채무자 외의 사람(보증인을 포함한다)에게 채무에 관한 거짓
          사실을 알리는 행위 <br />
          5. 채무자 또는 관계인에게 금전의 차용이나 그 밖의 이와 유사한 방법으로
          채무의 변제자금을 마련할 것을 강요함으로써 공포심이나 불안감을
          유발하여 사생활 또는 업무의 평온을 심하게 해치는 행위 <br />
          6. 채무를 변제할 법률상 의무가 없는 채무자 외의 사람에게 채무자를
          대신하여 채무를 변제할 것을 반복적으로 요구함으로써 공포심이나
          불안감을 유발하여 사생활 또는 업무의 평온을 심하게 해치는 행위
          <br /> 7. 엽서에 의한 채무변제요구 등 채무자 외의 자가 채무사실을 알
          수 있게 하는 행위
          <br /> 8. 채무자의 연락두절 등 소재파악이 곤란한 경우가 아님에도
          채무자의 관계인에게 채무자의 소재, 연락처 또는 소재를 알 수 있는 방법
          등을 문의하는 행위
        </Text>
        <Text textStyle={'pre-body-68'}>
          ② 대부업자는 기타 「채권의 공정한 추심에 관한 법률」에서 채권추심과
          관련하여 금지하고 있는 행위를 하여서는 아니 된다.
        </Text>
        <Text textStyle={'pre-body-68'}>
          <strong>제21조(담보물 처분 전 사전통지)</strong> 대부업자는 약정
          대부기간이 만료되거나 계약이 종료된 이후 담보물을 처분하고자 하는
          경우에는 채무자 또는 소유자에게 미리 그 사항을 통지하여야 한다. 단,
          법원의 경매절차가 개시되어 채무자 또는 소유자에 게 별도의 통지가
          이루어진 경우에는 이로 갈음할 수 있다.
        </Text>
        <Text textStyle={'pre-body-68'}>
          <strong>제22조(약관의 변경)</strong>
          <br /> ① 대부업자가 이 약관을 변경하고자 할 경우, 채무자에게 불리한
          내용이 될 때에는 서면통지의 방법으로 이를 알리고, 채무자에게 불리한
          내용이 아닌 경우에는 거래영업점에 게시함으로써 이를 알려야 한다.
          그러나 서면통지나 게시의 경우에는 반드시 제2항의 뜻을 명시하여야 한다.{' '}
          <br />② 통지가 도달한 때 또는 게시한 때부터 1개월 이내에 채무자의
          서면에 의한 이의가 대부업자에게 도달하지 않은 때에는, 약관의 변경을
          승인한 것으로 본다.
        </Text>
        <Text textStyle={'pre-body-68'}>
          <strong>제23조(규정의 준용)</strong> 이 약관에서 정하지 아니한 사항에
          관하여는 「대부업 등의 등록 및 금융이용자 보호에 관한 법률」 및 동법
          시행령 등 관계 법령에 따른다.
        </Text>
        <Text textStyle={'pre-body-68'}>
          <strong>제24조(관할법원의 합의)</strong> 이 약관에 의한 대부거래
          계약에 관하여 대부업자와 채무자 사이에 소송의 필요가 생긴 때에는 법이
          정하는 관할법원과 아울러 대부업자의 거래영업점 소재지 지방법원을
          관할법원으로 하기로 한다. 다만, 채무자의 책임 있는 사유로 부실채권이
          발생되어 그 채권의 관리를 위하여 대부업자가 본점, 지역본부 또는 다른
          영업점으로 그 채권관리업무를 이관한 경우에는 법이 정하는 관할법원과
          아울러 이관 받은 본점, 지역본부 또는 다른 영업점 소재지 지방법원을 관
          할법원으로 하기로 한다.
        </Text>
      </VStack>
    </VStack>
  )
}

const LoanAssignment = () => {
  return (
    <VStack w={'100%'} spacing={'10px'} alignItems={'flex-start'}>
      <Text textStyle={'pre-body-68'}>
        본인은 오늘 귀사와 체결한 대출거래약정(이하 &quot;대출거래약정&quot;이라
        함)에 따라 신청한 대출금의 차입자로서 대부거래표준약관 제17조에 따라,
        귀사가 대출거래약정에 따라 본인에 대하여 가지거나 가지게 될 현재 및
        장래의 일체의 권리(계약해제권을 포함한 계약자로서 갖는 모든 권리, 이하
        &apos;본 건 대출채권&apos;이라 함)를 금융기관 또는 기타
        제3자(&quot;담보권자 또는 채권양수인&quot;)에게 귀사의 자금조달, 기타
        목적을 위하여 양도(양도담보 및 근질권 설정 등 담보제공을 포함하며 이하
        같음)함에 아무런 이의없이 승낙합니다.
      </Text>
      <Text textStyle={'pre-body-68'}>
        이와 관련하여 본인은 귀사가 본인을 대리하여 본건 대출채권 양도를 승낙할
        수 있는 권한(아래 채권양도 및 담보제공 내용의 백지부분을 보충할 수 있는
        권한을 포함)을 위임합니다. 귀사는 본인에 대한 별도의 통지나 승낙 없이
        담보권자 또는 채권양수인으로부터 본건 대출채권을 반환 받을 수 있으며 그
        후 다시 다른 제3자에게 양도하거나 담보제공할 수 있음에 동의합니다.
      </Text>
      <Text textStyle={'pre-body-68'}>
        이와 관련하여 귀사가 본인의 개인정보를 위 담보권자 또는 채권양수인에게
        제공하여 귀사의 자금조달기간 동안 담보목적으로 활용하거나 채권양도의
        목적으로 활용할 수 있도록 하는데 대하여도 신용정보 이용 및 보호에 관한
        법률 및 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 모든 관련
        법령에 따라 동의합니다.
      </Text>
      <Text textStyle={'pre-body-68'}>
        다만 위 양도담보제공 또는 채권양도에도 불구하고 담보권자 또는
        채권양수인이 본인에 대하여 별도로 통지(인터넷통지 포함)를 하기 전까지는
        본인은 대출거래약정에 따라 지급하여야 할 모든 금액을 귀사명의의 계좌로
        지급하며 추후 담보권자 또는 채권양수인으로부터 본인에 대한 별도 통 지를
        받은 후에만 담보권자 또는 채권양수인이 별도로 지정하는 계좌로
        지급하겠습니다.
      </Text>
    </VStack>
  )
}
