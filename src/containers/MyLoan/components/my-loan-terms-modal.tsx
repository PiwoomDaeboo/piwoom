import React, { useEffect, useState } from 'react'

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

interface MyLoanTermsModalProps {
  isOpen: boolean
  onClose: () => void
  termsNumber: number
}

function MyLoanTermsModal({
  isOpen,
  onClose,
  termsNumber = 1,
}: MyLoanTermsModalProps) {
  const handleConfirm = () => {
    onClose()
  }

  const handleClose = () => {
    onClose()
  }

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
        return <LoanTermsTable />
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
        <Flex flexDir={'column'} gap={'12px'} maxH={'450px'} overflowY={'auto'}>
          {getBodyContent()}
        </Flex>
      }
      footer={
        <Flex w="100%">
          <Button w="100%" variant={'solid-primary'} onClick={handleConfirm}>
            확인
          </Button>
        </Flex>
      }
    ></ModalBasis>
  )
}

export default MyLoanTermsModal

const LoanTermsTable = () => {
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
            000000000
          </Text>
        </Box>
      </Flex>

      <Box
        border={'1px solid'}
        borderColor={'border.basic.1'}

        //   overflow={'hidden'}
      >
        {/* 계약 번호 */}

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
              금 일억원정(100,000,000)
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
                      0.0%
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
                      0.0%
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
                      0.0%
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
                      0.0%
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
              2025년 00월 00일
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
              2025년 00월 00일
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
              000
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
              농협은행 301-0336-5678-01 (피움대부 주식회사)
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
                매월 00일에 납부하며, 해당일이 없는 경우 그 달 말일에 납부한다.
              </Text>
              <Text textStyle={'pre-body-68'} color={'grey.10'}>
                3. 대출원금은 0000방법에 의해 상환하며, 대출금의 상환 및 이자의
                지급은 비용, 이자, 원금순으로 충당한다.
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
                1. 계약 체결 후 3년이내 조기상환 시 3%의 중도상환 수수료가
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
                1. 신용정보조회비용(00원)
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
              {/* 빈 셀 */}
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
    </VStack>
  )
}

const LoanAssignment = () => {
  return (
    <Text textStyle={'pre-body-68'}>
      본인은 오늘 귀사와 체결한 대출거래약정(이하 “대출거래약정”이라 함)에 따라
      신청한 대출금의 차입자로서 대부거래표준약관 제17조에 따라, 귀사가
      대출거래약정에 따라 본인에 대하여 가지거나 가지게 될 현재 및 장래의 일체의
      권리(계약해제권을 포함한 계약자로서 갖는 모든 권리, 이하 ‘본 건
      대출채권’이라 함)를 금융기관 또는 기타 제3자(“담보권자 또는
      채권양수인”)에게 귀사의 자금조달, 기타 목적을 위하여 양도(양도담보 및
      근질권 설정 등 담보제공을 포함하며 이하 같음)함에 아무런 이의없이
      승낙합니다. 이와 관련하여 본인은 귀사가 본인을 대리하여 본건 대출채권
      양도를 승낙할 수 있는 권한(아래 채권양도 및 담보제공 내용의 백지부분을
      보충할 수 있는 권한을 포함)을 위임합니다. 귀사는 본인에 대한 별도의 통지나
      승낙 없이 담보권자 또는 채권양수인으로부터 본건 대출채권을 반환 받을 수
      있으며 그 후 다시 다른 제3자에게 양도하거나 담보제공할 수 있음에
      동의합니다. 이와 관련하여 귀사가 본인의 개인정보를 위 담보권자 또는
      채권양수인에게 제공하여 귀사의 자금조달기간 동안 담보목적으로 활용하거나
      채권양도의 목적으로 활용할 수 있도록 하는데 대하여도 신용정보 이용 및
      보호에 관한 법률 및 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 모든
      관련 법령에 따라 동의합니다. 다만 위 양도담보제공 또는 채권양도에도
      불구하고 담보권자 또는 채권양수인이 본인에 대하여 별도로 통지(인터넷통지
      포함)를 하기 전까지는 본인은 대출거래약정에 따라 지급하여야 할 모든 금액을
      귀사명의의 계좌로 지급하며 추후 담보권자 또는 채권양수인으로부터 본인에
      대한 별도 통 지를 받은 후에만 담보권자 또는 채권양수인이 별도로 지정하는
      계좌로 지급하겠습니다.
    </Text>
  )
}
