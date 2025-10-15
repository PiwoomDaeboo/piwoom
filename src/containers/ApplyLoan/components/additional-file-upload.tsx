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
          const newFiles =
            data?.fulfilled?.map((file) => ({
              name: file?.fields?.key?.split('/').pop() || file?.fields?.key,
              path: file?.fields?.key,
            })) || []

          const currentFileSet = (getValues('fileSet') as any) || []

          const uploadedFileNames = newFiles.map((file) => file.name)

          setFileUploadedFileName([
            ...(fileUploadedFileName || []),
            ...uploadedFileNames,
          ])
          setValue('fileSet', [...currentFileSet, ...newFiles] as any)
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

    const currentFileSet = (getValues('fileSet') as any) || []

    const updatedFileSet = currentFileSet.filter(
      (_: any, idx: number) => idx !== deleteIndex,
    )

    setValue(
      'fileSet',
      updatedFileSet.length > 0 ? updatedFileSet : ([] as any),
    )
  }

  return (
    <>
      <InputForm
        label="추가 서류 제출"
        isOptional
        isRequired={false}
        w={'100%'}
        tooltipLabel="비대면서류제출을 통해 수집되는 각종 서류 및 데이터들은 고객님의 최신 소득 정보를 반영하지 못하고 있을 수 있습니다. 따라서 [갑종근로소득에대한소득세원천징수증명서], [은행급여이체내역] 또는 [근로소득원천징수영수증] 등을 추가로 제출하실 경우 대출 승인 확률 및 한도가 올라갈 수 있습니다. 추가 서류 제출은 대출 신청 이후 [나의 대출 조회 - 대출 현황 조회] 페이지 내에서도 가능합니다."
      >
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
            <br />
            (매매계약서 제출 시 매도인 및 매수인 등의 주민등록번호 뒷자리는 꼭
            가려 주셔야 하며, 만약 가리지 않고 업로드하실 경우 보안 정책에 따라
            해당 자료는 파기됩니다.)
          </Text>
        </VStack>
      )}
    </>
  )
}
