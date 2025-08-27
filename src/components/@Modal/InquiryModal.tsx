import React, { ChangeEvent, useCallback, useRef, useState } from 'react'

import {
  Box,
  Button,
  HStack,
  Input,
  Radio,
  Text,
  Textarea,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { formatPhoneNumberKR } from '@toktokhan-dev/react-universal'

import { FormProvider, useWatch } from 'react-hook-form'

import {
  uploadFile,
  useUploadFileToS3Mutation,
} from '@/apis/s3-file-uploader/S3FileUploaderApi.query'
import ModalBasis from '@/components/@Modal/ModalBasis'
import InputForm from '@/components/InputForm'
import { useInquiryCreateMutation } from '@/generated/apis/Inquiry/Inquiry.query'
import { usePresignedUrlCreateMutation } from '@/generated/apis/PresignedUrl/PresignedUrl.query'

import PrivateInfoModal from './PrivateInfo'
import useInquiryModalForm, {
  InquiryModalDataType,
} from './hooks/useInquiryModal'

interface InquiryModalProps {
  isOpen: boolean
  onClose: () => void
}

function InquiryModal({ isOpen, onClose }: InquiryModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isAgree, setIsAgree] = useState(false)
  const {
    isOpen: isPrivateInfoOpen,
    onOpen: onPrivateInfoOpen,
    onClose: onPrivateInfoClose,
  } = useDisclosure()
  const methods = useInquiryModalForm()
  const {
    control,
    setValue,
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = methods

  const handleManagerPhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      const v = formatPhoneNumberKR(value)

      setValue('phone', v)
    },
    [],
  )

  const handleClose = () => {
    onClose()
    reset()
  }

  const fileWatchValue = useWatch({ control, name: 'file' })

  const { mutateAsync: createInquiryMutateAsync } = useInquiryCreateMutation({
    options: {
      onSuccess: () => {
        onClose()
        reset()
      },
      // onError: () => {
      //   toast({
      //     title: '문의 전송에 실패했습니다.',
      //     description: '다시 시도해주세요.',
      //     status: 'error',
      //   })
      // },
    },
  })

  const { mutateAsync: uploadFileToS3MutateAsync } =
    usePresignedUrlCreateMutation({})
  const handleFileUpload = useCallback(
    async (file: File) => {
      // setValue('file', fields.key, { shouldDirty: true })
    },
    [uploadFileToS3MutateAsync, setValue],
  )

  const handleFileClick = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        handleFileUpload(file)
      }
    },
    [handleFileUpload],
  )

  const onSubmit = useCallback(
    (data: InquiryModalDataType) => {
      createInquiryMutateAsync({
        data: {
          name: data.name,
          phone: data.phone.replace(/-/g, ''),
          email: data.email,
          item: data.item,
          quantity: data.quantity,
          content: data.content,
          file: data.file.replace('_media/', ''),
        },
      })
    },
    [createInquiryMutateAsync],
  )

  return (
    <FormProvider {...methods}>
      <ModalBasis
        isOpen={isOpen}
        onClose={handleClose}
        size={{ base: 'full', md: 'md' }}
        body={
          <Box overflowY="scroll" maxH={{ base: '80vh', md: '60vh' }} pr="4px">
            <form
              id="inquiry-form"
              onSubmit={handleSubmit((data) => {
                onSubmit(data)
              })}
            >
              <PrivateInfoModal
                isOpen={isPrivateInfoOpen}
                onClose={onPrivateInfoClose}
              />
              <Box
                borderBottom={'1px solid'}
                borderColor="border.basic.2"
                pb="16px"
              >
                <Text color="content.1" textStyle={'pre-heading-01'}>
                  시안 업로드하기
                </Text>
              </Box>

              <VStack mt="28px" mb="16px" gap="20px" alignItems="flex-start">
                <InputForm label="이름/업체명" isRequired={true}>
                  <Input
                    maxLength={20}
                    placeholder="이름/업체명을 입력해 주세요"
                    {...register('name')}
                  />
                  {errors.name && (
                    <Text color="accent.red.2" fontSize="sm">
                      {errors.name.message}
                    </Text>
                  )}
                </InputForm>
                <InputForm label="휴대폰 번호" isRequired={true}>
                  <Input
                    placeholder="휴대폰 번호를 입력해 주세요"
                    {...register('phone', {
                      onChange: handleManagerPhoneChange,
                    })}
                  />
                  {/* {errors.phone && (
                    <Text color="accent.red.2" fontSize="sm">
                      {errors.phone.message}
                    </Text>
                  )} */}
                </InputForm>
                <InputForm label="이메일" isRequired={true}>
                  <Input
                    placeholder="이메일을 입력해 주세요"
                    {...register('email')}
                  />
                  {errors.email && (
                    <Text color="accent.red.2" fontSize="sm">
                      {errors.email.message}
                    </Text>
                  )}
                </InputForm>

                <HStack gap="12px" w="100%">
                  <InputForm label="모델" isRequired={true}>
                    <Input
                      placeholder="모델을 입력해 주세요"
                      {...register('item')}
                    />
                    {errors.item && (
                      <Text color="accent.red.2" fontSize="sm">
                        {errors.item.message}
                      </Text>
                    )}
                  </InputForm>
                  <InputForm label="수량" isRequired={true}>
                    <Input
                      type="number"
                      placeholder="수량을 입력해 주세요"
                      {...register('quantity')}
                    />
                    {errors.quantity && (
                      <Text color="accent.red.2" fontSize="sm">
                        {errors.quantity.message}
                      </Text>
                    )}
                  </InputForm>
                </HStack>
                <InputForm label="문의사항" isRequired={true}>
                  <Textarea
                    resize="none"
                    placeholder="문의사항을 입력해 주세요"
                    height="170px"
                    {...register('content')}
                  />
                  {errors.content && (
                    <Text color="accent.red.2" fontSize="sm">
                      {errors.content.message}
                    </Text>
                  )}
                  <Text textStyle="pre-caption-02" color="content.5">
                    문의사항을 입력해주시면 담당자 확인 후 순차적으로
                    연락드리겠습니다
                  </Text>
                </InputForm>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileClick}
                  style={{ display: 'none' }}
                />
                <Button
                  borderRadius={'full'}
                  type="button"
                  variant={'outline-primary'}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Text textStyle={'pre-heading-05'}>
                    {fileWatchValue ? '파일 업로드 완료' : '파일 업로드'}
                  </Text>
                </Button>
                <HStack>
                  <Radio
                    checked={isAgree}
                    onChange={() => setIsAgree(!isAgree)}
                  />
                  <Text color="content.4" textStyle="pre-body-04">
                    문의사항 처리를 위한{' '}
                    <Text
                      as="span"
                      textDecoration={'underline'}
                      textStyle="pre-body-03"
                      cursor="pointer"
                      onClick={onPrivateInfoOpen}
                    >
                      개인정보 수집 및 이용
                    </Text>{' '}
                    에 동의합니다.
                  </Text>
                </HStack>
              </VStack>
            </form>
          </Box>
        }
        footer={
          <Button
            borderRadius={'full'}
            w="100%"
            variant={'solid-primary'}
            type="submit"
            form="inquiry-form"
            isDisabled={!isAgree || !isValid}
          >
            제출하기
          </Button>
        }
      ></ModalBasis>
    </FormProvider>
  )
}
export default InquiryModal
