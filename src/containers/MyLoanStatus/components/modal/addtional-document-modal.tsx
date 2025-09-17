import { useRef, useState } from 'react'

import { AspectRatio, Box, Flex, HStack, Input, VStack } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'

import { useUploadFileToS3Mutation } from '@/apis/s3-file-uploader/S3FileUploaderApi.query'
import ModalBasis from '@/components/@Modal/ModalBasis'
import ImageAsNext from '@/components/ImageAsNext'
import InputForm from '@/components/InputForm'
import { useGovRetrieveQuery } from '@/generated/apis/Gov/Gov.query'
import { FolderIcon, InfoFillIcon } from '@/generated/icons/MyIcons'

interface AdditionalDocumentModalProps {
  isOpen: boolean
  onClose: () => void
  selectedIndex?: number | null
}

export default function AdditionalDocumentModal({
  isOpen,
  onClose,
  selectedIndex,
}: AdditionalDocumentModalProps) {
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { data: govData } = useGovRetrieveQuery({
    variables: {
      id: 29,
    },
    options: {
      enabled: !!isOpen,
    },
  })

  console.log('govData', govData)

  const { mutate: uploadIdCard, isPending: isIdCardUploading } =
    useUploadFileToS3Mutation({
      options: {
        onSuccess: (data) => {
          console.log('파일 업로드 성공:', data)
          console.log('S3 URL:', data.url)
          console.log('파일 경로:', data.path)
          console.log('필드 정보:', data.fields)
          setUploadedFileUrl(`${data.url}/${data?.fields?.key}`)
        },
        onError: (error) => {
          console.error('파일 업로드 실패:', error)
        },
      },
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

  return (
    <ModalBasis
      isOpen={isOpen}
      visibleCloseButton={false}
      onClose={onClose}
      size={{ base: 'full', sm: 'md' }}
      header={
        <VStack
          alignItems={'flex-start'}
          pb={'16px'}
          borderBottom={'1px solid'}
          borderColor={'border.basic.1'}
        >
          <Text textStyle={'pre-heading-4'} color={'grey.10'}>
            추가 서류 제출
          </Text>
          <Text textStyle={'pre-body-6'} color={'grey.7'}>
            아래 항목들 중 추가 제출 요청 받은 항목을 선택하여, 추가 서류를
            제출해주세요.
          </Text>
        </VStack>
      }
      body={
        <Flex
          flexDir={'column'}
          gap={'24px'}
          alignItems={'center'}
          maxH={'500px'}
          overflowY={'auto'}
          px={'4px'}
          pb={'32px'}
        >
          <InputForm label="신용정보 제출하기" tooltipLabel="신용정보 제출하기">
            <Button
              variant={'outline-primary'}
              textStyle={'pre-body-5'}
              color={'grey.8'}
              w={'209px'}
            >
              제출
            </Button>
          </InputForm>
          <InputForm label="위택스 서류 제출">
            <Button
              variant={'outline-primary'}
              textStyle={'pre-body-5'}
              color={'grey.8'}
              w={'209px'}
            >
              세금 납부 내역 제출
            </Button>
          </InputForm>
          <VStack>
            <InputForm label="비대면 서류제출">
              <Button
                variant={'outline-primary'}
                textStyle={'pre-body-5'}
                color={'grey.8'}
                w={'209px'}
                // onClick={() => {
                //  TODO: 정부24 API 활용
                // }}
              >
                비대면 서류제출
              </Button>
            </InputForm>
            <VStack
              alignItems={'flex-start'}
              p={'16px 20px'}
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
          </VStack>
          <InputForm label="추가 서류 제출" isOptional w={'100%'}>
            <Flex
              justifyContent={'center'}
              alignItems={'center'}
              p={'20px 16px'}
              w={'100%'}
              bg={'background.basic.2'}
              gap={'16px'}
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
                <FolderIcon boxSize={'32px'} />
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
          <VStack w={'100%'} alignItems={'flex-start'}>
            <InputForm label="신분증" isRequired>
              <Button
                variant={'outline-primary'}
                textStyle={'pre-body-5'}
                color={'grey.8'}
                w={'209px'}
                onClick={handleUploadButtonClick}
                isLoading={isIdCardUploading}
              >
                신분증 업로드
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
                고객님의 소중한 개인정보 보호를 위해,{' '}
                <Box as="span" color={'accent.red2'}>
                  신분증 촬영 시 주민등록번호 뒤 6자리는 꼭 가려 주세요.
                </Box>
                <br />
                만약 가리지 않고 업로드하실 경우, 보안 정책에 따라 이미지가
                파기되며 대출 신청이 정상적으로 진행되지 않을 수 있습니다.{' '}
                <br /> 또한, 정상적인 대출 진행을 위해 마스킹 처리된 신분증
                사본의 재제출을 요청드릴 수 있습니다.
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
          </VStack>
        </Flex>
      }
      footer={
        <Flex w="100%" gap="12px">
          <Button w="100%" variant={'solid-primary'}>
            확인
          </Button>
        </Flex>
      }
    ></ModalBasis>
  )
}
