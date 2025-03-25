import { yupResolver } from '@hookform/resolvers/yup'

import { UseFormProps, useForm } from 'react-hook-form'
import * as yup from 'yup'

// TODO: 정규식 분리
export const regex = {
  email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^_])[A-Za-z\d!@#$%^_]{8,}$/,
  phone: /^010-\d{4}-\d{4}$/,
}

export interface InquiryModalDataType {
  name: string
  phone: string
  email: string
  item: string
  quantity: number
  content: string
  file: string
}

export const InquiryModalFormSchema = yup.object().shape({
  name: yup.string().required('이름/업체명을 입력해주세요'),
  phone: yup
    .string()
    .required('휴대폰 번호를 입력해주세요')
    .test(
      'phone',
      '휴대폰 번호는 010-1234-5678 형식이어야 합니다.',
      (value) => {
        return regex.phone.test(value)
      },
    ),
  email: yup
    .string()
    .required('이메일을 입력해주세요')
    .matches(regex.email, '이메일 형식이 올바르지 않습니다'),

  item: yup.string().required('모델을 입력해주세요'),
  quantity: yup.number().required('수량을 입력해주세요'),
  content: yup.string().required('문의사항을 입력해주세요'),
})

const useInquiryModalForm = (options?: UseFormProps<InquiryModalDataType>) => {
  return useForm<InquiryModalDataType>({
    resolver: yupResolver(
      InquiryModalFormSchema as yup.ObjectSchema<InquiryModalDataType>,
    ),
    mode: 'onChange',
    ...options,
  })
}

export default useInquiryModalForm
