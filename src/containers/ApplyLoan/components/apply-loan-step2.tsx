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
  SimpleGrid,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import * as PortOne from '@portone/browser-sdk/v2'

import { useFormContext } from 'react-hook-form'

import LoanTermsModal from '@/components/@Modal/LoanTermsModal'
import ModalBasis from '@/components/@Modal/ModalBasis'
import { useUserIdentityVerificationCreateMutation } from '@/generated/apis/User/User.query'
import { CaretRightIcon } from '@/generated/icons/MyIcons'
import { useSessionStorage } from '@/stores/session/state'

const CHECKBOX_STYLES = {
  '.chakra-checkbox__control': {
    borderRadius: '50%',
    border: '1px solid',
    borderColor: 'border.basic.1',
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

const AGREEMENT_ITEMS = [
  {
    key: 'privacy',
    label: '개인(신용)정보 조회 동의',
  },
  {
    key: 'collection',
    label: '개인(신용)정보 수집 · 이용 동의',
  },
  {
    key: 'provision',
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
const ApplyLoanStep2 = () => {
  const methods = useFormContext()
  console.log(methods.getValues())
  const router = useRouter()
  const [agreements, setAgreements] = useState({
    all: false,
    privacy: false,
    collection: false,
    provision: false,
  })

  // 확인사항 상태 관리
  const [confirmations, setConfirmations] = useState({
    question1: null as 'yes' | 'no' | null,
    question2: null as 'yes' | 'no' | null,
    question3: null as 'yes' | 'no' | null,
    question4: null as 'yes' | 'no' | null,
    question5: null as 'yes' | 'no' | null,
  })

  // 전체 동의 핸들러
  const handleAllAgreement = (checked: boolean) => {
    setAgreements({
      all: checked,
      privacy: checked,
      collection: checked,
      provision: checked,
    })
  }
  const { set } = useSessionStorage()
  const { mutateAsync: userIdentityVerificationCreate } =
    useUserIdentityVerificationCreateMutation({
      options: {
        onSuccess: (data) => {
          set({
            identityVerificationToken: data.identityVerificationToken,
          })
          setIsPhoneCertification(true)
          // router.push(`/apply-loan?step=2`)
        },
      },
    })
  const handleAuthentication = async () => {
    const response = await PortOne.requestIdentityVerification({
      storeId: 'store-5fcf48f2-05d3-43e2-9abe-c09b3f461e2d',
      identityVerificationId: crypto.randomUUID(),
      channelKey: 'channel-key-1e7295f0-e634-4e2b-9da5-2402b97e7a63',
      redirectUrl: `${window.location.origin}/my-loan?step=2`,
    })
    if (response?.code !== undefined) {
      return alert(response?.message)
    }

    userIdentityVerificationCreate({
      data: {
        identityVerificationId: response?.identityVerificationId || '',
      },
    })
    //TODO: 인증 후 개인정보를 가져와서 사용자 정보 표기하기
  }

  // 개별 동의 핸들러
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

  const isButtonEnabled = () => {
    const allAgreed = agreements.all

    const allAnsweredNo = CONFIRMATION_ITEMS.every(
      (item) => confirmations[item.key as keyof typeof confirmations] === 'no',
    )

    return allAgreed && allAnsweredNo
  }
  const [isPhoneCertification, setIsPhoneCertification] = useState(false)
  return (
    <Container>
      <Flex py={{ base: '40px', sm: '48px', md: '84px' }} flexDir={'column'}>
        <VStack
          alignItems={'flex-start'}
          spacing={'32px'}
          mb={isPhoneCertification ? '32px' : '64px'}
        >
          <Text textStyle={'pre-heading-2'} color={'grey.10'}>
            기본정보 입력
          </Text>
          <VStack spacing={'12px'} alignItems={'flex-start'}>
            <Text textStyle={'pre-body-6'} color={'grey.10'}>
              휴대폰 간편인증{' '}
              <Text as="span" color={'primary.4'}>
                •
              </Text>
            </Text>
            <Button
              variant={'outline-primary'}
              w={'209px'}
              onClick={handleAuthentication}
            >
              {isPhoneCertification ?
                '휴대폰 간편인증 완료'
              : '휴대폰 간편인증'}
            </Button>
          </VStack>
        </VStack>
        {isPhoneCertification && (
          <SimpleGrid columns={{ base: 1, sm: 2 }} gap={'24px'} mb={'64px'}>
            <VStack spacing={'15px'} alignItems={'flex-start'}>
              <Text textStyle={'pre-body-7'} color={'grey.10'}>
                이름(한글)
              </Text>
              <Text textStyle={'pre-body-6'} color={'grey.7'}>
                김이름
              </Text>
            </VStack>
            <VStack spacing={'15px'} alignItems={'flex-start'}>
              <Text textStyle={'pre-body-7'} color={'grey.10'}>
                주민등록번호
              </Text>
              <Text textStyle={'pre-body-6'} color={'grey.7'}>
                900101-1234567
              </Text>
            </VStack>
            <VStack spacing={'15px'} alignItems={'flex-start'}>
              <Text textStyle={'pre-body-7'} color={'grey.10'}>
                휴대폰번호
              </Text>
              <Text textStyle={'pre-body-6'} color={'grey.7'}>
                010-1234-5678
              </Text>
            </VStack>
            <VStack spacing={'15px'} alignItems={'flex-start'}>
              <Text textStyle={'pre-body-7'} color={'grey.10'}>
                이메일
                <Text as="span" color={'primary.4'}>
                  •
                </Text>
              </Text>
              <Input disabled placeholder="이메일" />
            </VStack>
          </SimpleGrid>
        )}

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
            isDisabled={!isPhoneCertification}
            onClick={() => router.push('/apply-loan?step=3')}
          >
            다음
          </Button>
        </Flex>
      </Flex>
    </Container>
  )
}

export default ApplyLoanStep2
