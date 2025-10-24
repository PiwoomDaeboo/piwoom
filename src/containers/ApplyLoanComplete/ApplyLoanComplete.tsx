import { useState } from 'react'

import { useRouter } from 'next/router'

import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'

import { useSettingRetrieveQuery } from '@/generated/apis/Setting/Setting.query'
import {
  BluecheckIcon,
  InfoIcon,
  Loan1Icon,
  LoancompletepersonIcon,
  WarningCircleIcon,
} from '@/generated/icons/MyIcons'

import WetaxModal from '../../components/@Modal/wetax-modal'

function ApplyLoanComplete() {
  const router = useRouter()
  const { loanId } = router.query
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data: settingData } = useSettingRetrieveQuery({
    variables: {
      id: 'me',
    },
  })

  return (
    <Container>
      <WetaxModal isOpen={isOpen} onClose={onClose} loanId={Number(loanId)} />
      <Flex
        py={{ base: '48px', sm: '64px', md: '120px' }}
        flexDir={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <VStack alignItems={'center'} w={'100%'}>
          <BluecheckIcon boxSize={{ base: '70px', sm: '80px', md: '96px' }} />
          <Text
            textStyle={'pre-heading-1'}
            color={'grey.10'}
            textAlign={'center'}
          >
            대출 신청이 완료되었습니다.
          </Text>
          <Text textStyle={'pre-body-6'} color={'grey.10'} textAlign={'center'}>
            문자 또는 카카오톡을 통해 심사 결과를 안내해드릴 예정입니다.
          </Text>
          <Box
            w={'100%'}
            h={{ base: '32px', sm: '40px' }}
            borderBottom={'1px dashed'}
            borderColor={'border.basic.1'}
          />
        </VStack>
        <Flex
          pt={{ base: '24px', sm: '32px' }}
          justifyContent={'center'}
          alignItems={'center'}
          flexDir={{ base: 'column', sm: 'row' }}
          position={'relative'}
          gap={'20px'}
        >
          <LoancompletepersonIcon boxSize={'100px'} />
          <Box position={'relative'}>
            {/* 말풍선 삼각형 */}
            <Box
              position={'absolute'}
              left={{ base: '50%', sm: '-8px' }}
              top={{ base: '-8px', sm: '50%' }}
              transform={{
                base: 'translateX(-50%)',
                sm: 'translateY(-50%)',
              }}
              width={'0'}
              height={'0'}
              borderLeft={{
                base: '8px solid transparent',
                sm: 'none',
              }}
              borderRight={{
                base: '8px solid transparent',
                sm: '8px solid var(--chakra-colors-primary-1)',
              }}
              borderTop={{
                base: 'none',
                sm: '8px solid transparent',
              }}
              borderBottom={{
                base: '8px solid var(--chakra-colors-primary-1)',
                sm: '8px solid transparent',
              }}
              zIndex={1}
            />
            <VStack
              spacing={'8px'}
              p={'16px'}
              bg={'primary.1'}
              borderRadius={'12px'}
              position={'relative'}
              zIndex={2}
            >
              <Text textStyle={'pre-body-68'} color={'grey.10'}>
                <Box as="span" textStyle={'pre-body-7'} color={'grey.10'}>
                  대출 승인 확률
                </Box>
                과{' '}
                <Box as="span" textStyle={'pre-body-7'} color={'grey.10'}>
                  대출 한도
                </Box>
                를 높이고 싶으신가요?
                <br />
                아래 버튼을 눌러 세금 납부 내역을 제출해보세요!
              </Text>
              <Button
                variant={'solid-primary'}
                onClick={onOpen}
                isDisabled={!settingData?.isWetax}
              >
                세금 납부 내역 제출
              </Button>
              {!settingData?.isWetax && (
                <Flex
                  p={'12px 14px'}
                  borderRadius={'12px'}
                  justifyContent={'center'}
                  alignItems={'flex-start'}
                  flexDir={'column'}
                  maxW={'262px'}
                  gap={'10px'}
                  bg={'rgba(255, 255, 255, 0.70)'}
                >
                  <HStack>
                    <WarningCircleIcon boxSize={'24px'} />
                    <Text textStyle={'pre-caption-1'} color={'grey.9'}>
                      유의사항
                    </Text>
                  </HStack>
                  <Text
                    wordBreak={'keep-all'}
                    textStyle={'pre-caption-2'}
                    color={'grey.8'}
                  >
                    서버 점검 등의 사유로 인해 세금 납부 내역 제출 기능을
                    제공하지 않을 수 있습니다.
                    <br /> 추후 [대출 현황 조회] 페이지에서 세금 납부 내역을
                    제출 부탁드립니다.
                  </Text>
                </Flex>
              )}
            </VStack>
          </Box>
        </Flex>
      </Flex>
    </Container>
  )
}
export default ApplyLoanComplete
