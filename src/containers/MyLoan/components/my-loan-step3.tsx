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
import { useUsebAccessTokenCreateMutation } from '@/generated/apis/Useb/Useb.query'
import { useUserRetrieveQuery } from '@/generated/apis/User/User.query'
import { CaretRightIcon } from '@/generated/icons/MyIcons'
import { MY_IMAGES } from '@/generated/path/images'
import { useSessionStorage } from '@/stores/session/state'
import { extractUserInfoFromJWT } from '@/utils/jwt'

import {
  AGREEMENT_ITEMS,
  CHECKBOX_STYLES,
  SQUARE_CHECKBOX_STYLES,
} from '../const/consts'
import CustomerInfoModal from './customer-info-modal'
import MyLoanTermsModal from './my-loan-terms-modal'

const MyLoanStep3 = () => {
  const router = useRouter()
  const [ekycData, setEkycData] = useState<any>(null)
  const { userId } = router.query
  const { data: userLoanData } = useLoanRetrieveQuery({
    variables: {
      id: Number(userId),
    },
    options: {
      enabled: !!userId,
    },
  })

  const {
    isOpen: isTermsOpen,
    onOpen: onTermsOpen,
    onClose: onTermsClose,
  } = useDisclosure()
  const toast = useToast()
  const [usebAccessToken, setUsebAccessToken] = useState('')
  const [isAgree, setIsAgree] = useState(false)
  const [termsNumber, setTermsNumber] = useState(1)
  const [signUrl, setSignUrl] = useState('')
  const [agreements, setAgreements] = useState({
    all: false,
    privacy: false,
    collection: false,
  })
  const { data: userData } = useUserRetrieveQuery({
    variables: {
      id: 'me',
    },
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

  const handleTermsConfirm = () => {
    const currentItem = AGREEMENT_ITEMS.find((item) => item.id === termsNumber)
    if (currentItem) {
      handleIndividualAgreement(currentItem.key, true)
    }
    onTermsClose()
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

  const { mutate: usebAccessTokenCreate } = useUsebAccessTokenCreateMutation({
    options: {
      onSuccess: (data) => {
        setUsebAccessToken(data.accessToken)
        console.log('usebAccessToken', data)
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

  const openUsebKycPopup = () => {
    const popup = window.open(
      '/ekyc',
      'ekycPopup',
      'width=800, height=640, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no',
    )

    if (!popup) {
      toast({
        title: '팝업 차단됨',
        description: '팝업이 차단되었습니다. 팝업을 허용해주세요.',
        status: 'error',
        duration: 3000,
      })
    }
  }

  useEffect(() => {
    if (usebAccessToken) {
      openUsebKycPopup()
    }
  }, [usebAccessToken])

  useEffect(() => {
    const handleStorageChange = (e: MessageEvent) => {
      if (
        e.data.result === 'success' &&
        (e.data.review_result.result_type === 1 ||
          e.data.review_result.result_type === 5)
      ) {
        console.log(e)
        setEkycData(e.data)
      } else {
        return
        // toast({
        //   title: '신분증 인증 실패',
        //   description: '신분증 인증에 실패했습니다.',
        //   status: 'error',
        //   duration: 3000,
        // })
      }
    }

    window.addEventListener('message', handleStorageChange)

    return () => {
      window.removeEventListener('message', handleStorageChange)
    }
  }, [])

  return (
    <Container>
      <MyLoanTermsModal
        isOpen={isTermsOpen}
        onClose={onTermsClose}
        onConfirm={handleTermsConfirm}
        termsNumber={termsNumber}
      />

      {/* <AuthAlertModal isOpen={isAuthAlertOpen} onClose={onAuthAlertClose} /> */}

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
                {userLoanData?.contract?.amount?.toLocaleString() || 0}원
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
                {userLoanData?.contract?.repaymentAccountHolder &&
                  `${userLoanData?.contract?.repaymentAccountName} ${userLoanData?.contract?.repaymentAccountNumber} (예금주 : ${userLoanData?.contract?.repaymentAccountHolder})`}
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
              cursor={'pointer'}
              onClick={() => handleTermsOpen(item.id)}
            >
              <HStack w={'100%'} spacing={3}>
                <Checkbox
                  isChecked={agreements[item.key as keyof typeof agreements]}
                  sx={CHECKBOX_STYLES}
                  onChange={(e) => {
                    e.stopPropagation()
                    handleIndividualAgreement(item.key, e.target.checked)
                  }}
                />
                <Text textStyle={'pre-body-5'} color={'grey.10'}>
                  {item.label}
                </Text>
              </HStack>
              <Box p={'4px'}>
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
              isDisabled={!!ekycData}
              onClick={() => {
                openUsebKycPopup()
              }}
            >
              신분증 인증 진행
            </Button>
          </VStack>
          {ekycData && (
            <Text textStyle={'pre-body-7'} color={'accent.green2'}>
              신분증 인증이 완료되었어요.
            </Text>
          )}
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
              !isAgree ||
              !agreements.privacy ||
              !agreements.collection ||
              !agreements.all
            }
            onClick={() =>
              createContractSignature({
                id: Number(userId),
                data: { ekycData },
              })
            }
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
