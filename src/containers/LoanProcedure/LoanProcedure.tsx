import { useState } from 'react'

import { useRouter } from 'next/router'

import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react'

import Card from '@/components/Card'
import {
  DisclaimerRetrieveParamsEnumType,
  DisclaimerRetrieveParamsKindEnumTypeMap,
} from '@/generated/apis/@types/data-contracts'
import { useDisclaimerRetrieveQuery } from '@/generated/apis/Disclaimer/Disclaimer.query'
import {
  CaretRightIcon,
  Loan1Icon,
  Loan2Icon,
  Loan3Icon,
  SealCheckFillIcon,
} from '@/generated/icons/MyIcons'

import { BUTTON_DATA, CARD_DATA } from './consts'

const listItemStyles = {
  textStyle: 'pre-body-6',
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

function LoanProcedure() {
  const router = useRouter()
  const [activeButtonIndex, setActiveButtonIndex] = useState<number>(0)

  const handleButtonClick = (index: number) => {
    setActiveButtonIndex(index)
  }

  const handleRouteLoanProcedure = () => {
    router.push('/loan/procedure')
  }

  return (
    <>
      <Flex w={'100%'} h={'100%'} py={'60px'} bg={'primary.1'}>
        <Container>
          <VStack alignItems={'flex-start'} spacing={'8px'}>
            <Text textStyle={'pre-display-3'} color={'grey.10'}>
              대출 절차 안내
            </Text>
            <HStack>
              <SealCheckFillIcon boxSize={'24px'} />
              <Text textStyle={'pre-body-4'} color={'grey.10'}>
                대출 승인 여부 및 한도, 금리, 만기 등은 당사의 신용평가 시스템에
                따라 차등 적용됩니다.
              </Text>
            </HStack>
          </VStack>
        </Container>
      </Flex>
      <Container py={'64px'}>
        <Tabs>
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

          <TabPanels>
            <TabPanel>
              <Flex
                p={'24px 24px 28px 24px'}
                borderRadius={'20px'}
                boxShadow={'0 8px 50px 0 rgba(0, 46, 114, 0.10)'}
              >
                <Badge variant={'subtle_primary'}>step.01</Badge>
              </Flex>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  )
}
export default LoanProcedure
