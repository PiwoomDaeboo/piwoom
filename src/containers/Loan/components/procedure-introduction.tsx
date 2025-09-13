import { useState } from 'react'

import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'

import { Select } from 'chakra-react-select'

import {
  LoanStep1Icon,
  LoanStep2Icon,
  LoanStep3Icon,
  LoanStep4Icon,
  LoanStep5Icon,
  LoanStep6Icon,
} from '@/generated/icons/MyIcons'

import ItemGridCard from './item-grid-card'

// 절차 데이터
const PROCEDURE_ITEMS = [
  {
    step: 'step.01',
    title: '피움대부 홈페이지 접속',
    description: 'www.piwoom.com',
    icon: LoanStep1Icon,
  },
  {
    step: 'step.02',
    title: '대출 신청하기',
    description: '필요한 대출 상품을 선택 후, 대출 신청',
    icon: LoanStep2Icon,
  },
  {
    step: 'step.03',
    title: '대출심사 및 추가서류 제출',
    description: '관리자의 대출 심사 및 필요에 따라 추가 서류 제출',
    icon: LoanStep3Icon,
  },
  {
    step: 'step.04',
    title: '대출 승인',
    description: '대출 승인 여부 및 대출 조건 안내 문자 발송',
    icon: LoanStep4Icon,
  },
  {
    step: 'step.05',
    title: '전자계약서 작성',
    description:
      '[나의 대출 조회] - [전자계약 작성하기] 페이지에서 신분증 인증 및 휴대폰 본인인증 후 전자계약 작성',
    icon: LoanStep5Icon,
  },
  {
    step: 'step.06',
    title: '대출금 지급',
    description: '대출금 지급을 위한 최종 연락 후 송금 완료',
    icon: LoanStep6Icon,
  },
]

const MORTGAGE_PROCEDURE_ITEMS = [
  {
    step: 'step.01',
    title: '피움대부 홈페이지 접속',
    description: 'www.piwoom.com',
    icon: LoanStep1Icon,
  },
  {
    step: 'step.02',
    title: '부동산 담보대출 신청하기',
    description: '부동산 담보대출 상품을 선택 후, 대출 신청',
    icon: LoanStep2Icon,
  },
  {
    step: 'step.03',
    title: '대출 상담 및 추가 서류 제출',
    description:
      '담보대출 목적에 대한 자세한 상담 이후, [나의 대출 조회] - [대출 현황 조회] 페이지를 통해 전입세대열람원, 매매계약서, 전세계약서 등 추가 서류 제출',
    icon: LoanStep3Icon,
  },
  {
    step: 'step.04',
    title: '대출심사 및 승인',
    description: '심사 이후 대출 승인 여부 및 대출 조건 안내 문자 발송',
    icon: LoanStep4Icon,
  },
  {
    step: 'step.05',
    title: '전자계약서 작성',
    description:
      '[나의 대출 조회] - [전자계약 작성하기] 페이지에서 신분증 인증 및 휴대폰 본인인증 후 전자계약 작성',
    icon: LoanStep5Icon,
  },
  {
    step: 'step.06',
    title: '담보 설정 및 대출금 지급',
    description: '근저당 설정계약서 작성 후 근저당 설정 완료 시 대출금 지급',
    icon: LoanStep6Icon,
  },
]

const LoanProcedureIntroduction = () => {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (index: number) => {
    setActiveTab(index)
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveTab(parseInt(event.target.value))
  }
  return (
    <Flex
      w={'100%'}
      borderRadius={'32px'}
      bg={'grey.0'}
      flexDir={'column'}
      justifyContent={'center'}
      alignItems={'flex-start'}
    >
      <Box w={'100%'}>
        {/* 모바일 드롭다운 */}
        <Box display={{ base: 'block', sm: 'none' }} p={4}>
          <Select
            value={{
              label:
                activeTab === 0 ? '월급대출 및 신용대출 절차' : (
                  '부동산 담보대출 절차'
                ),
              value: activeTab,
            }}
            onChange={(selectedOption) => {
              if (selectedOption) {
                setActiveTab(selectedOption.value)
              }
            }}
            options={[
              {
                label: '월급대출 및 신용대출 절차',
                value: 0,
              },
              {
                label: '부동산 담보대출 절차',
                value: 1,
              },
            ]}
            placeholder="절차를 선택하세요"
            variant="solid"
          />
        </Box>

        <Tabs
          index={activeTab}
          onChange={handleTabChange}
          display={{ base: 'none', sm: 'block' }}
        >
          <TabList>
            <Tab>
              <Text textStyle={'pre-body-3'} color={'grey.10'}>
                월급대출 및 신용대출 절차
              </Text>
            </Tab>
            <Tab>
              <Text textStyle={'pre-body-3'} color={'grey.10'}>
                부동산 담보대출 절차
              </Text>
            </Tab>
          </TabList>
        </Tabs>

        {/* 공통 컨텐츠 */}
        <Box p={4}>
          {
            activeTab === 0 ?
              // 첫 번째 탭 내용
              <ItemGridCard items={PROCEDURE_ITEMS} />
              // 두 번째 탭 내용
            : <ItemGridCard items={MORTGAGE_PROCEDURE_ITEMS} />
          }
        </Box>
      </Box>
    </Flex>
  )
}

export default LoanProcedureIntroduction
