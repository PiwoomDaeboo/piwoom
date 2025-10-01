import { useRef, useState } from 'react'

import { useRouter } from 'next/router'

import {
  Box,
  Center,
  Flex,
  HStack,
  Input,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'

import { useFormContext } from 'react-hook-form'

import { useUploadFilesToS3Mutation } from '@/apis/s3-file-uploader/S3FileUploaderApi.query'
import InputForm from '@/components/InputForm'
import {
  DocumenticonIcon,
  FolderIcon,
  InfoFillIcon,
  XIcon,
} from '@/generated/icons/MyIcons'

export default function AdditionalFileUpload() {
  const router = useRouter()
  const [fileUploadedFileName, setFileUploadedFileName] = useState<
    string[] | null
  >([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleFileUploadButtonClick = () => {
    fileInputRef.current?.click()
  }
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext()
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      handleUploadFile(Array.from(files))
    }
  }

  const { mutate: uploadFile, isPending: isFileUploading } =
    useUploadFilesToS3Mutation({
      options: {
        onSuccess: (data) => {
          const uploadedFileNames =
            data?.fulfilled?.map(
              (file) =>
                file?.fields?.key?.split('/').pop() || file?.fields?.key,
            ) || []

          const uploadedKeys =
            data?.fulfilled?.map(
              (file) =>
                file?.fields?.key?.split('/').pop() || file?.fields?.key,
            ) || []
          const uploadedPaths =
            data?.fulfilled?.map((file) => file?.fields?.key) || []

          // 기존 값 가져오기
          const currentNames = getValues('fileSet.name') as any
          const currentPaths = getValues('fileSet.path') as any

          // 배열로 변환 (단일 값이면 배열로 감싸기)
          const existingNames =
            Array.isArray(currentNames) ? currentNames
            : currentNames ? [currentNames]
            : []
          const existingPaths =
            Array.isArray(currentPaths) ? currentPaths
            : currentPaths ? [currentPaths]
            : []

          setFileUploadedFileName([
            ...(fileUploadedFileName || []),
            ...uploadedFileNames,
          ])
          setValue('fileSet.name', [...existingNames, ...uploadedKeys] as any)
          setValue('fileSet.path', [...existingPaths, ...uploadedPaths] as any)
        },
        onError: (error) => {
          console.error('파일 업로드 실패:', error)
        },
      },
    })

  const handleUploadFile = (files: File[]) => {
    uploadFile(
      files.map((file) => ({
        file,
        fieldChoice: 'loan.File.path',
      })),
    )
  }

  const handleFileDelete = (fileName: string) => {
    const deleteIndex = fileUploadedFileName?.indexOf(fileName) ?? -1

    if (deleteIndex === -1) return

    setFileUploadedFileName(
      fileUploadedFileName?.filter((file) => file !== fileName) || [],
    )

    const currentNames = getValues('fileSet.name') as any
    const currentPaths = getValues('fileSet.path') as any

    const namesArray =
      Array.isArray(currentNames) ? currentNames
      : currentNames ? [currentNames]
      : []
    const pathsArray =
      Array.isArray(currentPaths) ? currentPaths
      : currentPaths ? [currentPaths]
      : []

    const updatedNames = namesArray.filter((_, idx) => idx !== deleteIndex)
    const updatedPaths = pathsArray.filter((_, idx) => idx !== deleteIndex)

    setValue(
      'fileSet.name',
      updatedNames.length > 0 ? updatedNames : ('' as any),
    )
    setValue(
      'fileSet.path',
      updatedPaths.length > 0 ? updatedPaths : ('' as any),
    )
  }

  return (
    <>
      <InputForm label="추가 서류 제출" isOptional w={'100%'}>
        <Flex
          onClick={handleFileUploadButtonClick}
          cursor={'pointer'}
          justifyContent={'center'}
          alignItems={'center'}
          p={'20px 16px'}
          w={'100%'}
          bg={'background.basic.2'}
          gap={'16px'}
        >
          <Input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            multiple
            display="none"
          />
          {isFileUploading ?
            <Flex justifyContent={'center'} alignItems={'center'} gap={'10px'}>
              <Spinner color={'primary.4'} />
              <Text textStyle={'pre-body-6'} color={'grey.8'}>
                업로드 중...
              </Text>
            </Flex>
          : <>
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
            </>
          }
        </Flex>

        {fileUploadedFileName?.length && fileUploadedFileName?.length > 0 && (
          <Flex gap={'8px'} flexWrap={'wrap'}>
            {fileUploadedFileName?.map((fileName) => (
              <Flex
                gap={'12px'}
                p={'8px 12px'}
                key={fileName}
                alignItems={'center'}
              >
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
                    {fileName}
                  </Text>
                </HStack>
                <Box
                  p={0}
                  cursor={'pointer'}
                  onClick={() => handleFileDelete(fileName)}
                >
                  <XIcon boxSize={'16px'} />
                </Box>
              </Flex>
            ))}
          </Flex>
        )}
      </InputForm>

      {router.query.type === 'mortgage' && (
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
          <Text textStyle={'pre-body-68'} color={'grey.8'}>
            신규로 부동산을 매입하시려는 경우 매매계약서 사본을 제출해주시면
            보다 빠른 대출 심사가 가능합니다.
          </Text>
          <Text textStyle={'pre-body-68'} color={'grey.8'}>
            (매매계약서 제출 시 매도인 및 매수인 등의 주민등록번호 뒷자리는 꼭
            가려 주셔야 하며, 만약 가리지 않고 업로드하실 경우 보안 정책에 따라
            해당 자료는 파기됩니다.)
          </Text>
        </VStack>
      )}
    </>
  )
}
