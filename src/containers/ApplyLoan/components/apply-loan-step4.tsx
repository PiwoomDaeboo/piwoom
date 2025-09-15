import { useRef, useState } from 'react'

import { useRouter } from 'next/router'

import {
  AspectRatio,
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

import { useUploadFileToS3Mutation } from '@/apis/s3-file-uploader/S3FileUploaderApi.query'
import LoanTermsModal from '@/components/@Modal/LoanTermsModal'
import ModalBasis from '@/components/@Modal/ModalBasis'
import CommonSelect from '@/components/CommonSelect'
import ImageAsNext from '@/components/ImageAsNext'
import InputForm from '@/components/InputForm'
import {
  CaretRightIcon,
  InfoFillIcon,
  Loan1Icon,
} from '@/generated/icons/MyIcons'

import {
  BANK_DATA,
  DATE_OF_PAYMENT_DATA,
  EMPLOYMENT_TYPE,
  JOP_TYPE,
  REPAYMENT_TYPE,
} from '../const/const'
import { useSelectButtonGroup } from '../hooks/useSelectButtonGroup'
import OfficeAddressModal from './office-address-modal'

interface Company {
  no: string
  name: string
  businessNo: string
  baseAddress: string
  detailAddress: string
}

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

const ApplyLoanStep4 = () => {
  const router = useRouter()
  const {
    isOpen: isOfficeAddressModalOpen,
    onOpen: onOfficeAddressModalOpen,
    onClose: onOfficeAddressModalClose,
  } = useDisclosure()

  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null)
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { mutate: uploadIdCard, isPending: isIdCardUploading } =
    useUploadFileToS3Mutation({
      options: {
        onSuccess: (data) => {
          console.log('파일 업로드 성공:', data)
          console.log('S3 URL:', data.url)
          console.log('파일 경로:', data.path)
          console.log('필드 정보:', data.fields)
          setUploadedFileUrl(`${data.url}/${data?.path}`)
        },
        onError: (error) => {
          console.error('파일 업로드 실패:', error)
        },
      },
    })
  const { SelectButtonGroup: EmploymentTypeButtons } = useSelectButtonGroup({
    name: 'employmentType',
    options: EMPLOYMENT_TYPE,
  })

  const { SelectButtonGroup: RepaymentTypeButtons } = useSelectButtonGroup({
    name: 'repaymentType',
    options: REPAYMENT_TYPE,
  })

  const handleUploadIdCard = (file: File) => {
    uploadIdCard({
      file,
      fieldChoice: 'loan.Loan.identity_card',
    })
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleUploadIdCard(file)
    }
  }

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleCompanySelect = (company: Company) => {
    console.log(company)
    // setSelectedCompany(company)
  }
  return (
    <Container>
      <OfficeAddressModal
        isOpen={isOfficeAddressModalOpen}
        onClose={onOfficeAddressModalClose}
        onSelectCompany={handleCompanySelect}
      />
      <Flex
        py={{ base: '40px', sm: '48px', md: '84px' }}
        flexDir={'column'}
        gap={'24px'}
      >
        <VStack alignItems={'flex-start'} spacing={'8px'} mb={'32px'}>
          <Text textStyle={'pre-heading-2'} color={'grey.10'}>
            대출신청 정보
          </Text>
          <VStack spacing={'12px'} alignItems={'flex-start'}>
            <Text textStyle={'pre-body-6'} color={'grey.7'}>
              대출심사를 위해 대출신청 정보를 입력해 주세요.
            </Text>
          </VStack>
        </VStack>
        <Flex
          p={'24px'}
          borderRadius={'20px'}
          border={'1px solid'}
          borderColor={'border.basic.1'}
        >
          {/* <Checkbox
            isChecked={agreements[item.key as keyof typeof agreements]}
            onChange={(e) =>
              handleIndividualAgreement(item.key, e.target.checked)
            }
            colorScheme="blue"
            sx={CHECKBOX_STYLES}
          /> */}
          <VStack alignItems={'flex-start'}>
            <Text textStyle={'pre-body-6'} color={'primary.3'}>
              <Box as="span" color={'primary.4'}>
                [선택]
              </Box>{' '}
              전자문서 수신동의
            </Text>
            <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
              전자문서 수신 동의를 하지 않는 경우, 각종 통지문이 자택 주소지로
              우편 발송 됩니다.
            </Text>
          </VStack>
        </Flex>
        <Text textStyle={'pre-heading-3'} color={'primary.4'}>
          대출 정보
        </Text>

        <InputForm label="대출신청 금액">
          <>
            <InputGroup>
              <Input placeholder="0" />
              <InputRightElement>
                <Text>만원</Text>
              </InputRightElement>
            </InputGroup>
            <Flex gap={'8px'} flexWrap={'wrap'}>
              <Button variant={'outline-secondary'}>300</Button>
              <Button variant={'outline-secondary'}>600</Button>
              <Button variant={'outline-secondary'}>900</Button>
              <Button variant={'outline-secondary'}>1200</Button>
              <Button variant={'outline-secondary'}>1500</Button>
            </Flex>
          </>
        </InputForm>
        <InputForm label="상환방식" w={'100%'}>
          <RepaymentTypeButtons />
        </InputForm>
        <InputForm label="이자납입일자">
          <Box w={'100%'}>
            <CommonSelect options={DATE_OF_PAYMENT_DATA} placeholder="선택" />
          </Box>
        </InputForm>
        <InputForm label="대출기간">
          <VStack alignItems={'flex-start'} spacing={'8px'} w={'100%'}>
            <InputGroup>
              <Input placeholder="0" />
              <InputRightElement>
                <Text>개월</Text>
              </InputRightElement>
            </InputGroup>
            <Text textStyle={'pre-caption-2'} color={'grey.6'}>
              최대 60개월까지 입력 가능해요
            </Text>
            <Flex gap={'8px'} flexWrap={'wrap'}>
              <Button variant={'outline-secondary'}>6개월</Button>
              <Button variant={'outline-secondary'}>12개월</Button>
              <Button variant={'outline-secondary'}>24개월</Button>
              <Button variant={'outline-secondary'}>36개월</Button>
            </Flex>
          </VStack>
        </InputForm>
        <Flex gap={'16px'}>
          <InputForm label="입금은행">
            <Box w={'100%'}>
              <CommonSelect options={BANK_DATA} placeholder="선택" />
            </Box>
          </InputForm>
          <InputForm label="계좌번호">
            <Input placeholder="계좌번호" />
          </InputForm>
        </Flex>
        <InputForm label="예금주 실명조회">
          <Button
            variant={'outline-secondary'}
            textStyle={'pre-body-5'}
            color={'grey.8'}
            w={'209px'}
          >
            예금주 실명조회
          </Button>
        </InputForm>
        <Box w={'100%'} h={'1px'} bg={'border.basic.1'} my={'48px'} />
        <Text textStyle={'pre-heading-3'} color={'primary.4'}>
          직장 정보
        </Text>
        <Flex gap={'16px'} flexWrap={'wrap'}>
          <InputForm label="직업구분">
            <Box w={'100%'}>
              <CommonSelect options={JOP_TYPE} placeholder="선택해주세요" />
            </Box>
          </InputForm>
          <InputForm label="직장명">
            <Flex w={'100%'} gap={'8px'}>
              <Input
                placeholder="직장명"
                w={'100%'}
                value={selectedCompany?.name || ''}
                readOnly
              />
              <Button
                variant={'solid-primary'}
                size={'lg'}
                onClick={onOfficeAddressModalOpen}
              >
                직장명 검색
              </Button>
            </Flex>
          </InputForm>
        </Flex>
        <InputForm label="고용구분">
          <EmploymentTypeButtons />
        </InputForm>
        <InputForm label="입사년월 또는 창업시기">
          <Flex gap={'16px'}>
            <InputGroup>
              <Input placeholder="YYYY" />
              <InputRightElement>
                <Text>년</Text>
              </InputRightElement>
            </InputGroup>
            <InputGroup>
              <Input placeholder="MM" />
              <InputRightElement>
                <Text>월</Text>
              </InputRightElement>
            </InputGroup>
          </Flex>
        </InputForm>

        {/* 주거 정보 */}
        <Box w={'100%'} h={'1px'} bg={'border.basic.1'} my={'48px'} />
        <Text textStyle={'pre-heading-3'} color={'primary.4'}>
          주거 정보
        </Text>

        <InputForm label="주소">
          <Flex w={'100%'} gap={'8px'}>
            <Input placeholder="주소" w={'100%'} />
            <Button variant={'solid-primary'} size={'lg'}>
              주소검색
            </Button>
          </Flex>
        </InputForm>

        <InputForm label="주거종류">
          <Flex flexWrap={'wrap'} gap={'8px'}>
            <Button variant={'outline-secondary'} w={'209px'}>
              아파트/주상복합
            </Button>
            <Button variant={'outline-secondary'} w={'209px'}>
              연립/다세대/다가구
            </Button>
            <Button variant={'outline-secondary'} w={'209px'}>
              그 외
            </Button>
          </Flex>
        </InputForm>
        <InputForm label="주거종류">
          <Flex flexWrap={'wrap'} gap={'8px'}>
            <Button variant={'outline-secondary'} w={'209px'}>
              자가
            </Button>
            <Button variant={'outline-secondary'} w={'209px'}>
              전세
            </Button>
            <Button variant={'outline-secondary'} w={'209px'}>
              월세
            </Button>
          </Flex>
        </InputForm>
        <Box w={'100%'} h={'1px'} bg={'border.basic.1'} my={'48px'} />
        <Text textStyle={'pre-heading-3'} color={'primary.4'}>
          자산 정보
        </Text>

        <InputForm label="부동산 정보">
          <Flex w={'100%'} gap={'8px'}>
            <Input placeholder="주소" w={'100%'} />
            <Button variant={'solid-primary'} size={'lg'}>
              주소검색
            </Button>
          </Flex>
        </InputForm>
        <InputForm label="비대면 서류제출">
          <Button
            variant={'outline-primary'}
            textStyle={'pre-body-5'}
            color={'grey.8'}
            w={'209px'}
          >
            비대면 서류제출
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
              유의사항
            </Text>
          </HStack>
          <Text textStyle={'pre-body-6'} color={'grey.8'}>
            정부24 회원이 아닌 경우, 먼저 회원가입을 완료하셔야 비대면 서류
            제출이 가능합니다. <br /> 아래 링크를 통해 정부24 회원가입을
            진행하신 뒤 서류 제출을 진행해 주시기 바랍니다.
          </Text>
          <Button
            variant={'text-primary'}
            onClick={() =>
              window.open(
                'https://plus.gov.kr/member/signUpAgree?awqf=!2f',
                '_blank',
              )
            }
          >
            정부24 회원가입
          </Button>
          <Text textStyle={'pre-body-6'} color={'grey.8'}>
            서버 점검 등 사유로 인해 비대면 서류 제출을 진행하지 않을 수
            있습니다.
            <br />
            추후 대출 현황 조회에서 서류를 업데이트 부탁드립니다.
          </Text>
        </VStack>
        <InputForm label="추가 서류 제출" w={'100%'}>
          <Flex
            justifyContent={'center'}
            alignItems={'center'}
            p={'20px 16px'}
            w={'100%'}
            bg={'background.basic.2'}
          >
            <Flex
              justifyContent={'center'}
              alignItems={'center'}
              border={'1px solid'}
              borderColor={'border.basic.1'}
              borderRadius={'50%'}
              w={'60px'}
              h={'60px'}
            >
              <Loan1Icon boxSize={'32px'} />
            </Flex>
            <Text textStyle={'pre-body-6'} color={'grey.8'}>
              추가할 서류가 있다면
              <br />
              <Box as="span" color={'primary.4'}>
                업로드
              </Box>
              해 주세요.
            </Text>
          </Flex>
        </InputForm>
        <Box w={'100%'} h={'1px'} bg={'border.basic.1'} my={'48px'} />
        <Text textStyle={'pre-heading-3'} color={'primary.4'}>
          신분증 업로드
        </Text>

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
              유의사항
            </Text>
          </HStack>
          <Text textStyle={'pre-body-6'} color={'grey.8'}>
            고객님의 소중한 개인정보 보호를 위해,{' '}
            <Box as="span" color={'accent.red2'}>
              신분증 촬영 시 주민등록번호 뒤 6자리는 꼭 가려 주세요.
            </Box>
            <br />
            만약 가리지 않고 업로드하실 경우, 보안 정책에 따라 이미지가 파기되며
            대출 신청이 정상적으로 진행되지 않을 수 있습니다. <br /> 또한,
            정상적인 대출 진행을 위해 마스킹 처리된 신분증 사본의 재제출을
            요청드릴 수 있습니다.
          </Text>
          <Flex
            justifyContent={'center'}
            alignItems={'center'}
            p={'20px 16px'}
            w={'100%'}
            h={'200px'}
            borderRadius={'20px'}
            bg={'background.basic.2'}
          >
            <Input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              display="none"
            />
            {uploadedFileUrl ?
              <AspectRatio ratio={237 / 145}>
                <ImageAsNext
                  w={'100%'}
                  h={'100%'}
                  fill
                  src={uploadedFileUrl ?? '-'}
                  alt="신분증"
                />
              </AspectRatio>
            : <Text textStyle={'pre-body-6'} color={'grey.6'}>
                파일을 선택해주세요
              </Text>
            }
          </Flex>
        </VStack>
        <InputForm label="신분증" isRequired>
          <Button
            variant={'outline-primary'}
            textStyle={'pre-body-5'}
            color={'grey.8'}
            w={'209px'}
            onClick={handleUploadButtonClick}
            isLoading={isIdCardUploading}
            loadingText="업로드 중..."
          >
            신분증 업로드
          </Button>
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
            대출신청
          </Button>
        </Flex>
      </Flex>
    </Container>
  )
}

export default ApplyLoanStep4
