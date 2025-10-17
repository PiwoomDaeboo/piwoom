import { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'

import {
  AspectRatio,
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Spinner,
  Text,
  Textarea,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'

import { useFormContext } from 'react-hook-form'

import { useUploadFileToS3Mutation } from '@/apis/s3-file-uploader/S3FileUploaderApi.query'
import ImageAsNext from '@/components/ImageAsNext'
import InputForm from '@/components/InputForm'
import {
  CameraIcon,
  DocumenticonIcon,
  InfoFillIcon,
  XIcon,
} from '@/generated/icons/MyIcons'
import { MY_IMAGES } from '@/generated/path/images'

export default function IdCardUpload() {
  const router = useRouter()
  const idCardInputRef = useRef<HTMLInputElement>(null)
  const [uploadedFileName, setUploadedFileName] = useState<string>('')
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const {
    register,
    formState: { errors },
    setValue,
    clearErrors,
  } = useFormContext()

  const { mutate: uploadIdCard, isPending: isIdCardUploading } =
    useUploadFileToS3Mutation({
      options: {
        onSuccess: (data) => {
          setUploadedFileUrl(`${data.url}/${data?.fields?.key}`)
          setValue('identityCard', `${data?.fields?.key}`)
          setUploadedFileName(
            data?.fields?.key?.split('/').pop() || data?.fields?.key,
          )

          clearErrors('identityCard')
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

  const handleIdCardSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // 기존 미리보기 URL 정리
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }

      // 새로운 미리보기 URL 생성
      const newPreviewUrl = URL.createObjectURL(file)
      setPreviewUrl(newPreviewUrl)

      handleUploadIdCard(file)
    }
  }

  const handleIdCardUploadButtonClick = () => {
    idCardInputRef.current?.click()
  }
  console.log('previewUrl', previewUrl)

  // 컴포넌트 언마운트 시 미리보기 URL 정리
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])
  return (
    <>
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
            ref={idCardInputRef}
            onChange={handleIdCardSelect}
            accept="image/*"
            display="none"
          />
          <ImageAsNext
            w={'100%'}
            h={'100%'}
            fill
            src={MY_IMAGES.ID_CARD.src}
            alt="신분증"
          />
        </Flex>
      </VStack>
      <InputForm label="신분증" isRequired>
        <Button
          variant={'outline-primary'}
          textStyle={'pre-body-5'}
          w={'209px'}
          onClick={handleIdCardUploadButtonClick}
          isLoading={isIdCardUploading}
          loadingText="업로드 중..."
          gap={'8px'}
          isDisabled={!!uploadedFileName?.length}
        >
          <CameraIcon
            boxSize={'24px'}
            color={uploadedFileName?.length ? '#00368640' : 'primary.4'}
          />
          신분증 업로드
        </Button>
        {uploadedFileName?.length && uploadedFileName?.length > 0 && (
          <Flex gap={'8px'} flexWrap={'wrap'}>
            <Flex gap={'12px'} p={'8px 12px'} alignItems={'center'}>
              <HStack gap={'4px'}>
                <Center
                  bg={'primary.1'}
                  borderRadius={'50%'}
                  w={'28px'}
                  h={'28px'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  // p={'4px'}
                >
                  <DocumenticonIcon boxSize={'16px'} />
                </Center>
                <Text textStyle={'pre-body-68'} color={'grey.8'}>
                  {uploadedFileName}
                </Text>
              </HStack>
              <Box
                p={0}
                cursor={'pointer'}
                onClick={() => setUploadedFileName('')}
              >
                <XIcon boxSize={'16px'} />
              </Box>
            </Flex>
          </Flex>
        )}
        {errors?.identityCard && (
          <Text textStyle={'pre-caption-2'} color={'accent.red2'}>
            {errors?.identityCard?.message as string}
          </Text>
        )}
      </InputForm>
    </>
  )
}
