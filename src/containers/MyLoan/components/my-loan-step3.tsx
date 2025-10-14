import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import {
  AspectRatio,
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  HStack,
  SimpleGrid,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'

import AuthAlertModal from '@/components/@Modal/auth-alert-modal'
import ImageAsNext from '@/components/ImageAsNext'
import InputForm from '@/components/InputForm'
import { REPAYMENT_TYPE } from '@/constants/loan'
import {
  useLoanRetrieveQuery,
  useLoanSignCreateMutation,
} from '@/generated/apis/Loan/Loan.query'
import { CaretRightIcon } from '@/generated/icons/MyIcons'
import { MY_IMAGES } from '@/generated/path/images'

import {
  AGREEMENT_ITEMS,
  CHECKBOX_STYLES,
  SQUARE_CHECKBOX_STYLES,
} from '../const/consts'
import CustomerInfoModal from './customer-info-modal'
import MyLoanTermsModal from './my-loan-terms-modal'

const MyLoanStep3 = () => {
  const router = useRouter()
  const { userId } = router.query
  const { data: userLoanData } = useLoanRetrieveQuery({
    variables: {
      id: Number(userId),
    },
    options: {
      enabled: !!userId,
    },
  })
  console.log('userLoanData', userLoanData)

  const {
    isOpen: isTermsOpen,
    onOpen: onTermsOpen,
    onClose: onTermsClose,
  } = useDisclosure()
  const {
    isOpen: isAuthAlertOpen,
    onOpen: onAuthAlertOpen,
    onClose: onAuthAlertClose,
  } = useDisclosure()
  const toast = useToast()
  const [isAgree, setIsAgree] = useState(false)
  const [termsNumber, setTermsNumber] = useState(1)
  const [signUrl, setSignUrl] = useState('')
  const [agreements, setAgreements] = useState({
    all: false,
    privacy: false,
    collection: false,
  })
  const handleIndividualAgreement = (key: string, checked: boolean) => {
    const newAgreements = { ...agreements, [key]: checked }

    const allIndividualChecked = AGREEMENT_ITEMS.every(
      (item) => newAgreements[item.key as keyof typeof newAgreements],
    )
    newAgreements.all = allIndividualChecked

    setAgreements(newAgreements)
  }

  const handleAgree = (checked: boolean) => {
    setIsAgree(checked)
  }
  const handleTermsOpen = (termsNumber: number) => {
    onTermsOpen()
    setTermsNumber(termsNumber)
  }
  const { mutate: createContractSignature } = useLoanSignCreateMutation({
    options: {
      onSuccess: (data) => {
        const url = data?.signUrl
        setSignUrl(url)
        if (url) {
          handleApplyCreditInfoSubmit(url)
        } else {
          toast({
            title: '전자계약서 URL 오류',
            description: '전자계약서 URL을 가져오는데 실패했습니다.',
            status: 'error',
            duration: 5000,
          })
        }
      },
      onError: (error) => {
        toast({
          title: '전자계약서 작성 실패',
          description: '전자계약서 작성에 실패했습니다.',
          status: 'error',
          duration: 5000,
        })
        console.error('createContractSignature', error)
      },
    },
  })
  const handleApplyCreditInfoSubmit = (url: string) => {
    if (!url) return

    window.open(
      url,
      'popupChk',
      'width=800, height=600, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no',
    )
  }
  useEffect(() => {
    window.addEventListener('storage', (e) => {
      if (e.key === 'popup_status') {
        console.log(e)
        router.replace('/my-loan?step=4')
      }
    })
  }, [router])

  return (
    <Container>
      <MyLoanTermsModal
        isOpen={isTermsOpen}
        onClose={onTermsClose}
        termsNumber={termsNumber}
      />

      <AuthAlertModal isOpen={isAuthAlertOpen} onClose={onAuthAlertClose} />

      <Flex
        pt={{ base: '40px', sm: '48px', md: '80px' }}
        pb={'120px'}
        flexDir={'column'}
      >
        <VStack alignItems={'flex-start'} spacing={'8px'}>
          <Text textStyle={'pre-heading-2'} color={'grey.10'}>
            계약정보 확인 및 전자서명
          </Text>
          <Text textStyle={'pre-body-6'} color={'grey.7'}>
            고객님의의 대출계약 체결을 위해 전자계약을 진행합니다.
          </Text>
        </VStack>
        <VStack alignItems={'flex-start'} mt={'32px'} spacing={'20px'}>
          <Text textStyle={'pre-heading-3'} color={'primary.4'}>
            계약정보
          </Text>
          <SimpleGrid columns={{ base: 1, sm: 2 }} w={'100%'} gap={'24px'}>
            <VStack spacing={'15px'} alignItems={'flex-start'}>
              <Text textStyle={'pre-body-7'} color={'grey.10'}>
                대부금액
              </Text>
              <Text textStyle={'pre-body-6'} color={'grey.9'}>
                {userLoanData?.loanAmount?.toLocaleString()}원
              </Text>
            </VStack>
            <VStack spacing={'15px'} alignItems={'flex-start'}>
              <Text textStyle={'pre-body-7'} color={'grey.10'}>
                상환방식
              </Text>
              <Text textStyle={'pre-body-6'} color={'grey.9'}>
                {REPAYMENT_TYPE.find(
                  (type) => type.value === userLoanData?.repaymentType,
                )?.label || '-'}
              </Text>
            </VStack>
            <VStack spacing={'15px'} alignItems={'flex-start'}>
              <Text textStyle={'pre-body-7'} color={'grey.10'}>
                이자율
              </Text>
              <Text textStyle={'pre-body-6'} color={'grey.9'}>
                {userLoanData?.contract?.interestRate || 0}%
              </Text>
            </VStack>
            <VStack spacing={'15px'} alignItems={'flex-start'}>
              <Text textStyle={'pre-body-7'} color={'grey.10'}>
                연체 이자율
              </Text>
              <Text textStyle={'pre-body-6'} color={'grey.9'}>
                {userLoanData?.contract?.overdueInterestRate || 0}%
              </Text>
            </VStack>
            <VStack spacing={'15px'} alignItems={'flex-start'}>
              <Text textStyle={'pre-body-7'} color={'grey.10'}>
                대출일자
              </Text>
              <Text textStyle={'pre-body-6'} color={'grey.9'}>
                {userLoanData?.contract?.loanDate || '-'}
              </Text>
            </VStack>
            <VStack spacing={'15px'} alignItems={'flex-start'}>
              <Text textStyle={'pre-body-7'} color={'grey.10'}>
                대출만기일자
              </Text>
              <Text textStyle={'pre-body-6'} color={'grey.9'}>
                {userLoanData?.contract?.maturityDate || '-'}
              </Text>
            </VStack>
            <VStack spacing={'15px'} alignItems={'flex-start'}>
              <Text textStyle={'pre-body-7'} color={'grey.10'}>
                대출 갚는 날
              </Text>
              <Text textStyle={'pre-body-6'} color={'grey.9'}>
                매월 {userLoanData?.interestPaymentDate || '-'}일
              </Text>
            </VStack>
            <VStack spacing={'15px'} alignItems={'flex-start'}>
              <Text textStyle={'pre-body-7'} color={'grey.10'}>
                중도상환수수료
              </Text>
              <Text textStyle={'pre-body-6'} color={'grey.9'}>
                {userLoanData?.contract?.prepaymentRate || 0}%
              </Text>
            </VStack>
            <VStack spacing={'15px'} alignItems={'flex-start'}>
              <Text textStyle={'pre-body-7'} color={'grey.10'}>
                상환금 입금 계좌
              </Text>
              <Text textStyle={'pre-body-6'} color={'grey.9'}>
                {userLoanData?.contract?.repaymentAccountName}
                {userLoanData?.contract?.repaymentAccountNumber}
                {userLoanData?.contract?.repaymentAccountHolder &&
                  `(예금주 : ${userLoanData?.contract?.repaymentAccountHolder})`}
              </Text>
            </VStack>
          </SimpleGrid>
        </VStack>
        <Box w={'100%'} h={'1px'} bg={'background.basic.2'} my={'48px'} />
        <Text textStyle={'pre-body-6'} color={'grey.7'} mb={'24px'}>
          * 아래 상세 내용을 꼭 확인해 주세요.
        </Text>
        <VStack spacing={'12px'} w={'100%'}>
          {AGREEMENT_ITEMS.map((item) => (
            <Flex
              key={item.key}
              w={'100%'}
              p={'24px'}
              justifyContent={'space-between'}
              borderRadius={'20px'}
              border={'1px solid'}
              borderColor={
                agreements[item.key as keyof typeof agreements] ?
                  'border.basic.1'
                : 'border.basic.2'
              }
              bg={
                agreements[item.key as keyof typeof agreements] ?
                  'primary.1'
                : 'transparent'
              }
            >
              <HStack w={'100%'} spacing={3}>
                <Checkbox
                  isChecked={agreements[item.key as keyof typeof agreements]}
                  sx={CHECKBOX_STYLES}
                  onChange={(e) => {
                    handleIndividualAgreement(item.key, e.target.checked)
                  }}
                />
                <Text
                  textStyle={'pre-body-5'}
                  color={'grey.10'}
                  cursor={'pointer'}
                  onClick={() => {
                    handleIndividualAgreement(
                      item.key,
                      !agreements[item.key as keyof typeof agreements],
                    )
                  }}
                >
                  {item.label}
                </Text>
              </HStack>
              <Box
                onClick={() => handleTermsOpen(item.id)}
                cursor={'pointer'}
                p={'4px'}
              >
                <CaretRightIcon boxSize={'24px'} />
              </Box>
            </Flex>
          ))}
        </VStack>
        <InputForm label="신분증 인증" mt={'48px'}>
          <VStack alignItems={'flex-start'} spacing={'12px'}>
            <Text textStyle={'pre-caption-2'} color={'grey.7'}>
              신분증 인증을 위해 신분증(주민등록증, 운전면허증, 여권 중 택1)을
              준비해주세요.
            </Text>
            <Button
              variant={'outline-secondary'}
              textStyle={'pre-body-5'}
              color={'grey.8'}
              w={'209px'}
              onClick={() => {
                onAuthAlertOpen()
              }}
            >
              신분증 인증 진행
            </Button>
          </VStack>
        </InputForm>
        <VStack alignItems={'flex-start'} my={'64px'} spacing={'32px'}>
          <VStack alignItems={'flex-start'} spacing={'8px'}>
            <Text textStyle={'pre-heading-2'} color={'grey.10'}>
              확인사항
            </Text>
            <Text textStyle={'pre-body-6'} color={'grey.7'}>
              확인사항 내용을 확인하시고 체크해 주세요.
              <Box as="span" color={'primary.4'}>
                •
              </Box>
            </Text>
          </VStack>
          <Flex
            p={'20px 24px'}
            flexDir={'column'}
            gap={'12px'}
            bg={'background.basic.2'}
            borderRadius={'20px'}
          >
            <HStack w={'100%'} alignItems={'flex-start'}>
              <Text textStyle={'pre-body-5'} color={'grey.10'}>
                1.
              </Text>
              <Text textStyle={'pre-body-6'} color={'grey.10'}>
                계약 내용과 관련하여 이해되지 않는 부분이 있거나 확인이 필요한
                사항이 있을 경우 전화(055-266-2686) 또는 카카오톡 채널(채널명:
                피움대부 주식회사)을 통한 상담이 가능합니다. 계약 내용을 제대로
                이해하지 못했는데도 이해했다고 확인하는 경우, 추후 해당 내용과
                관련한 권리구제가 어려울 수 있습니다.
              </Text>
            </HStack>
            <HStack w={'100%'} alignItems={'flex-start'}>
              <Text textStyle={'pre-body-5'} color={'grey.10'}>
                2.
              </Text>
              <Text textStyle={'pre-body-6'} color={'grey.10'}>
                본인은 피움대부와 대부거래를 함에 있어 계약 체결 전에 위 계약
                정보를 포함하여 대부거래의 주요 내용 및 대부이용자가 부담하는
                비용에 대하여 충분히 이해하였음을 확인합니다.
              </Text>
            </HStack>
          </Flex>
          <HStack w={'100%'} spacing={3}>
            <Checkbox
              isChecked={isAgree}
              sx={SQUARE_CHECKBOX_STYLES}
              onChange={(e) => handleAgree(e.target.checked)}
            />
            <Text textStyle={'pre-body-6'} color={'grey.8'}>
              네, 충분히 이해했어요
            </Text>
          </HStack>
        </VStack>

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
              !isAgree || !agreements.privacy || !agreements.collection
            }
            onClick={() => createContractSignature({ id: 1 })}
            // onClick={() => router.push('/my-loan?step=4')}
          >
            전자서명 진행
          </Button>
        </Flex>
      </Flex>
    </Container>
  )
}

export default MyLoanStep3
