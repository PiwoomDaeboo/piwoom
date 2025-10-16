import { useState } from 'react'

import { useRouter } from 'next/router'

import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  HStack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'

import LoanTermsModal from '@/components/@Modal/LoanTermsModal'
import ModalBasis from '@/components/@Modal/ModalBasis'
import { CaretRightIcon } from '@/generated/icons/MyIcons'

const CHECKBOX_STYLES = {
  '.chakra-checkbox__control': {
    borderRadius: '50%',
    border: '1px solid',
    borderColor: 'grey.3',
    _checked: {
      bg: 'primary.3',
      borderColor: 'primary.3',
      borderRadius: '50%',
    },
  },
  '.chakra-checkbox__control[data-checked]': {
    bg: 'primary.3',
    borderColor: 'primary.3',
    borderRadius: '50%',
  },
}

const AGREEMENT_ITEMS: {
  key:
    | 'consentToAccessPersonalContent'
    | 'consentToCollectPersonalContent'
    | 'consentToProvidePersonalContent'
  label: string
}[] = [
  {
    key: 'consentToAccessPersonalContent',
    label: '개인(신용)정보 조회 동의',
  },
  {
    key: 'consentToCollectPersonalContent',
    label: '개인(신용)정보 수집 · 이용 동의',
  },
  {
    key: 'consentToProvidePersonalContent',
    label: '개인(신용)정보 제공 동의서',
  },
]

const CONFIRMATION_ITEMS = [
  {
    key: 'question1',
    question:
      '금융회사 직원이라는 사람으로부터 전화나 문자를 받아 대출 신청을 진행하고 계시나요?',
  },
  {
    key: 'question2',
    question:
      '신용등급 상향, 대출보증비 등의 수수료라며 돈을 먼저 입금하라고 요청받으셨습니까?',
  },
  {
    key: 'question3',
    question:
      '고금리 대출을 받고, 상환하면 저금리로 대출이 가능하다는 이야기를 들었습니까?',
  },
  {
    key: 'question4',
    question:
      '개인회생이나 신용회복위원회를 통한 채무조정을 진행하고 있으신가요?',
  },
  {
    key: 'question5',
    question: '햇살론 등 저금리의 서민지원대출로 바꿔준다는 제안을 받으셨나요?',
  },
]
const ApplyLoanStep1 = () => {
  const router = useRouter()
  const [agreements, setAgreements] = useState({
    all: false,
    consentToAccessPersonalContent: false,
    consentToCollectPersonalContent: false,
    consentToProvidePersonalContent: false,
  })
  const {
    isOpen: isTermsOpen,
    onClose: isTermsClose,
    onOpen: onTermsOpen,
  } = useDisclosure()
  const {
    isOpen: isVoicePhishingAlertOpen,
    onClose: isVoicePhishingAlertClose,
    onOpen: onVoicePhishingAlertOpen,
  } = useDisclosure()
  const {
    isOpen: isAgreementAlertOpen,
    onClose: isAgreementAlertClose,
    onOpen: onAgreementAlertOpen,
  } = useDisclosure()
  const {
    isOpen: isConfirmationAlertOpen,
    onClose: isConfirmationAlertClose,
    onOpen: onConfirmationAlertOpen,
  } = useDisclosure()

  const [confirmations, setConfirmations] = useState({
    question1: null as 'yes' | 'no' | null,
    question2: null as 'yes' | 'no' | null,
    question3: null as 'yes' | 'no' | null,
    question4: null as 'yes' | 'no' | null,
    question5: null as 'yes' | 'no' | null,
  })
  const [termsType, setTermsType] = useState<
    | 'consentToAccessPersonalContent'
    | 'consentToCollectPersonalContent'
    | 'consentToProvidePersonalContent'
  >('consentToAccessPersonalContent')
  // 전체 동의 핸들러
  const handleAllAgreement = (checked: boolean) => {
    setAgreements({
      all: checked,
      consentToAccessPersonalContent: checked,
      consentToCollectPersonalContent: checked,
      consentToProvidePersonalContent: checked,
    })
  }
  const handleTermsType = (
    type:
      | 'consentToAccessPersonalContent'
      | 'consentToCollectPersonalContent'
      | 'consentToProvidePersonalContent',
  ) => {
    setTermsType(type)
    onTermsOpen()
  }

  const handleIndividualAgreement = (key: string, checked: boolean) => {
    const newAgreements = { ...agreements, [key]: checked }

    const allIndividualChecked = AGREEMENT_ITEMS.every(
      (item) => newAgreements[item.key as keyof typeof newAgreements],
    )
    newAgreements.all = allIndividualChecked

    setAgreements(newAgreements)
  }

  const handleConfirmation = (key: string, answer: 'yes' | 'no') => {
    setConfirmations((prev) => ({
      ...prev,
      [key]: answer,
    }))
  }

  const handleNextClick = () => {
    // 1. 필수 동의사항 체크
    const allAgreed = agreements.all
    if (!allAgreed) {
      onAgreementAlertOpen()
      return
    }

    // 2. 확인사항이 모두 체크되었는지 확인
    const allConfirmed = CONFIRMATION_ITEMS.every(
      (item) => confirmations[item.key as keyof typeof confirmations] !== null,
    )
    if (!allConfirmed) {
      onConfirmationAlertOpen()
      return
    }

    // 3. 확인사항 체크 (하나라도 "예"가 있으면 보이스피싱 의심)
    const hasYesAnswer = CONFIRMATION_ITEMS.some(
      (item) => confirmations[item.key as keyof typeof confirmations] === 'yes',
    )
    if (hasYesAnswer) {
      onVoicePhishingAlertOpen()
      return
    }

    // 4. 모두 통과하면 다음 페이지로
    router.push('/apply-loan?step=2&type=' + router.query.type)
  }
  return (
    <Container>
      <Flex py={{ base: '40px', sm: '48px', md: '84px' }} flexDir={'column'}>
        <VStack alignItems={'flex-start'} spacing={'8px'} mb={'24px'}>
          <Text textStyle={'pre-heading-2'} color={'grey.10'}>
            개인(신용)정보처리 동의
          </Text>
          <Text textStyle={'pre-body-6'} color={'grey.7'}>
            개인(신용)정보의 조회, 수집·이용 및 제공에 관한 동의사항을 숙지해
            주시기 바라며,
            <Box as="br" display={{ base: 'none', sm: 'block' }} />
            필수적인 사항에 대해 동의하지 않은 경우에는 대출신청이 불가능함을
            알려 드립니다.
          </Text>
        </VStack>
        <VStack
          alignItems={'flex-start'}
          p={'24px 20px'}
          borderRadius={'20px'}
          border={'1px solid'}
          borderColor={'border.basic.1'}
          spacing={'24px'}
        >
          <Flex
            w={'100%'}
            flexDir={'column'}
            //   p={'20px'}
            borderRadius={'20px'}
            gap={'24px'}
          >
            <VStack alignItems={'flex-start'}>
              <HStack
                p={'12px 20px'}
                w={'100%'}
                bg={'background.basic.2'}
                borderRadius={'12px'}
                spacing={3}
              >
                <Checkbox
                  isChecked={agreements.all}
                  onChange={(e) => handleAllAgreement(e.target.checked)}
                  colorScheme="blue"
                  sx={CHECKBOX_STYLES}
                />
                <Text textStyle={'pre-body-3'} color={'grey.10'}>
                  전체 동의하기
                </Text>
              </HStack>
              <VStack spacing={'12px'} w={'100%'}>
                {AGREEMENT_ITEMS.map((item) => (
                  <Flex
                    key={item.key}
                    w={'100%'}
                    justifyContent={'space-between'}
                  >
                    <HStack w={'100%'} spacing={3}>
                      <Checkbox
                        isChecked={
                          agreements[item.key as keyof typeof agreements]
                        }
                        onChange={(e) =>
                          handleIndividualAgreement(item.key, e.target.checked)
                        }
                        colorScheme="blue"
                        sx={CHECKBOX_STYLES}
                      />
                      <Text textStyle={'pre-body-6'} color={'primary.3'}>
                        [필수]
                      </Text>
                      <Text textStyle={'pre-body-3'} color={'grey.10'}>
                        {item.label}
                      </Text>
                    </HStack>
                    <Box
                      onClick={() => handleTermsType(item.key)}
                      cursor={'pointer'}
                      p={'4px'}
                    >
                      <CaretRightIcon boxSize={'24px'} />
                    </Box>
                  </Flex>
                ))}
              </VStack>
            </VStack>
          </Flex>
        </VStack>
        <VStack
          mt={'64px'}
          mb={'24px'}
          alignItems={'flex-start'}
          spacing={'8px'}
        >
          <Text textStyle={'pre-heading-2'} color={'grey.10'}>
            확인사항
          </Text>
          <Text textStyle={'pre-body-6'} color={'grey.7'}>
            안전한 대출 신청을 위해 확인사항 체크를 해주세요.
          </Text>
        </VStack>
        <Flex
          alignItems={'flex-start'}
          p={'20px 24px'}
          borderRadius={'20px'}
          bg={'background.basic.2'}
          gap={'24px'}
          flexDir={'column'}
          mb={'64px'}
        >
          {CONFIRMATION_ITEMS.map((item, index) => (
            <Flex
              key={item.key}
              flexDir={{ base: 'column', sm: 'row' }}
              gap={'12px'}
              justifyContent={'space-between'}
              w={'100%'}
            >
              <HStack flex={1} alignItems={'flex-start'}>
                <Text textStyle={'pre-body-5'} color={'grey.10'}>
                  {index + 1}.
                </Text>
                <Text textStyle={'pre-body-6'} color={'grey.10'}>
                  {item.question}
                </Text>
              </HStack>
              <HStack w={{ base: '100%', sm: 'auto' }} gap={'12px'}>
                <Button
                  w={'100%'}
                  variant={
                    (
                      confirmations[item.key as keyof typeof confirmations] ===
                      'yes'
                    ) ?
                      'solid-primary'
                    : 'outline-secondary'
                  }
                  onClick={() => handleConfirmation(item.key, 'yes')}
                >
                  예
                </Button>
                <Button
                  w={'100%'}
                  variant={
                    (
                      confirmations[item.key as keyof typeof confirmations] ===
                      'no'
                    ) ?
                      'solid-primary'
                    : 'outline-secondary'
                  }
                  onClick={() => handleConfirmation(item.key, 'no')}
                >
                  아니오
                </Button>
              </HStack>
            </Flex>
          ))}
        </Flex>
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
            isDisabled={
              !agreements.all ||
              !CONFIRMATION_ITEMS.every(
                (item) =>
                  confirmations[item.key as keyof typeof confirmations] !==
                  null,
              )
            }
            onClick={handleNextClick}
          >
            다음
          </Button>
        </Flex>
      </Flex>
      <LoanTermsModal
        isOpen={isTermsOpen}
        onClose={isTermsClose}
        type={termsType}
      />
      {/* 필수 동의사항 미체크 알림 모달 */}
      <ModalBasis
        isOpen={isAgreementAlertOpen}
        visibleCloseButton={true}
        onClose={isAgreementAlertClose}
        size={'sm'}
        body={
          <Flex
            flexDir={'column'}
            gap={'12px'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Text textStyle={'pre-heading-4'}>알림</Text>
            <Text textStyle={'pre-body-6'} textAlign={'center'}>
              필수 동의사항을 체크하지 않았기 때문에
              <br />
              대출 신청이 어렵습니다.
            </Text>
          </Flex>
        }
        footer={
          <Flex w="100%" gap="12px">
            <Button
              w="100%"
              variant={'solid-primary'}
              onClick={isAgreementAlertClose}
            >
              확인
            </Button>
          </Flex>
        }
      ></ModalBasis>
      {/* 보이스피싱 의심 알림 모달 */}
      <ModalBasis
        isOpen={isVoicePhishingAlertOpen}
        visibleCloseButton={true}
        onClose={isVoicePhishingAlertClose}
        size={'sm'}
        body={
          <Flex
            flexDir={'column'}
            gap={'12px'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Text textStyle={'pre-heading-4'}>알림</Text>
            <Text textStyle={'pre-body-6'} textAlign={'center'}>
              현재는 보이스피싱이 의심되어
              <br />
              대출 신청이 어렵습니다.
            </Text>
          </Flex>
        }
        footer={
          <Flex w="100%" gap="12px">
            <Button
              w="100%"
              variant={'solid-primary'}
              onClick={isVoicePhishingAlertClose}
            >
              확인
            </Button>
          </Flex>
        }
      ></ModalBasis>
      {/* 확인사항 미체크 알림 모달 */}
      <ModalBasis
        isOpen={isConfirmationAlertOpen}
        visibleCloseButton={true}
        onClose={isConfirmationAlertClose}
        size={'sm'}
        body={
          <Flex
            flexDir={'column'}
            gap={'12px'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Text textStyle={'pre-heading-4'}>알림</Text>
            <Text textStyle={'pre-body-6'} textAlign={'center'}>
              확인사항을 모두 체크해 주세요.
            </Text>
          </Flex>
        }
        footer={
          <Flex w="100%" gap="12px">
            <Button
              w="100%"
              variant={'solid-primary'}
              onClick={isConfirmationAlertClose}
            >
              확인
            </Button>
          </Flex>
        }
      ></ModalBasis>
    </Container>
  )
}

export default ApplyLoanStep1
