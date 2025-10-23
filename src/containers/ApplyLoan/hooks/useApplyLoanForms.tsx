import { useMemo } from 'react'

import { useRouter } from 'next/router'

import { yupResolver } from '@hookform/resolvers/yup'

import { UseFormProps, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { LoanRequestType } from '@/generated/apis/@types/data-contracts'

export const useApplyLoanForm = (options?: UseFormProps<LoanRequestType>) => {
  const router = useRouter()
  const signUpFormSchema = useMemo(() => {
    return yup.object().shape({
      // Step1 fields
      kind: yup.string().optional(),
      email: yup
        .string()
        .email('이메일 양식을 확인해주세요.')
        .required('필수 항목 입니다.'),

      // Step2 fields

      // Step3 fields (required for step3 validation)
      purpose: yup.string().required('필수 항목 입니다.'),
      purposeDetail: yup.string().when('purpose', {
        is: 'DIRECT_INPUT',
        then: (schema) => schema.required('대출 용도를 입력해주세요.'),
        otherwise: (schema) => schema.optional(),
      }),
      totalAsset: yup.string().required('필수 항목 입니다.'),
      annualIncome: yup.string().required('필수 항목 입니다.'),
      monthlyIncome: yup
        .number()
        .typeError('숫자만 입력 가능합니다.')
        .integer('숫자만 입력 가능합니다.')
        .positive()
        .min(0)
        .required('필수 항목 입니다.'),
      monthlyFixedExpense: yup
        .number()
        .typeError('숫자만 입력 가능합니다.')
        .integer('숫자만 입력 가능합니다.')
        .positive()
        .min(0)
        .required('필수 항목 입니다.'),
      debtScale: yup.string().required('필수 항목 입니다.'),
      repaymentMethod: yup.string().required('필수 항목 입니다.'),
      creditScore: yup.string().required('필수 항목 입니다.'),
      purposeAndRepaymentPlan: yup.string().optional(),
      safeKey: yup.string().nullable().optional(),

      // Step4 fields
      loanAmount:
        router.query.type === 'salary' ?
          yup
            .number()
            .typeError('숫자만 입력 가능합니다.')
            .integer('숫자만 입력 가능합니다.')
            .positive()
            .min(300, '300만원 이상 입력 가능합니다.')
            .max(1500, '신청 금액은 최대 1,500만원까지 가능해요')
            .required('필수 항목 입니다.')
        : yup
            .number()
            .typeError('숫자만 입력 가능합니다.')
            .integer('숫자만 입력 가능합니다.')
            .positive()
            .min(300, '300만원 이상 입력 가능합니다.')
            .required('필수 항목 입니다.'),

      repaymentType: yup.string().required('필수 항목 입니다.'),
      interestPaymentDate: yup.string().required('필수 항목 입니다.'),
      loanPeriod: yup
        .number()
        .typeError('숫자만 입력 가능합니다.')
        .integer('숫자만 입력 가능합니다.')
        .positive()
        .min(0)
        .required('필수 항목 입니다.'),
      bank: yup.string().required('필수 항목 입니다.'),
      accountNumber: yup
        .number()
        .typeError('숫자만 입력 가능합니다.')
        .integer('숫자만 입력 가능합니다.')

        .positive()
        .test(
          'min-length',
          '계좌번호는 최소 6자리 이상 입력해주세요.',
          function (value) {
            if (!value) return true // required 검증은 별도로 처리
            return value.toString().length >= 6
          },
        )
        .test(
          'max-length',
          '계좌번호는 최대 20자리까지 입력 가능합니다.',
          function (value) {
            if (!value) return true // required 검증은 별도로 처리
            return value.toString().length <= 20
          },
        )
        .required('필수 항목 입니다.'),
      // accountHolderSsn: yup.string().required('필수 항목 입니다.'),
      accountHolder: yup.string().required('필수 항목 입니다.'),
      accountHolderSsn: yup.string().nullable().optional(),
      jobType: yup.string().required('필수 항목 입니다.'),
      postcode: yup.string().required('필수 항목 입니다.'),
      baseAddress: yup.string().required('필수 항목 입니다.'),
      detailAddress: yup.string().required('필수 항목 입니다.'),
      housingType: yup.string().required('필수 항목 입니다.'),
      residenceType: yup.string().required('필수 항목 입니다.'),
      assetPostcode:
        router.query.type === 'mortgage' ?
          yup.string().required('필수 항목 입니다.')
        : yup.string().nullable().optional(),
      assetBaseAddress:
        router.query.type === 'mortgage' ?
          yup.string().required('필수 항목 입니다.')
        : yup.string().nullable().optional(),
      assetDetailAddress:
        router.query.type === 'mortgage' ?
          yup.string().required('필수 항목 입니다.')
        : yup.string().nullable().optional(),
      incomeCertificate: yup.string().nullable().optional(),
      residentRegistrationCopy: yup.string().nullable().optional(),
      healthInsuranceEligibilityConfirmation: yup
        .string()
        .nullable()
        .optional(),
      employmentType: yup.string().required('필수 항목 입니다.'),
      healthInsurancePaymentConfirmation: yup.string().nullable().optional(),
      healthInsurancePaymentConfirmation2: yup.string().nullable().optional(),
      identityCard: yup.string().required('필수 항목 입니다.'),
      fileSet: yup.mixed().nullable().optional(),
      untactDocumentSubmission: yup
        .boolean()
        .test(
          'untact-document-required',
          '비대면 서류제출을 완료해주세요.',
          function (value) {
            // 정부24 기능이 활성화된 경우에만 필수
            return value === true
          },
        ),

      // Optional fields

      // repaymentDetail: yup.string().optional(),
      repaymentDetail: yup.string().when('repaymentMethod', {
        is: 'DIRECT_INPUT',
        then: (schema) => schema.required('변제방법을 입력해주세요.'),
        otherwise: (schema) => schema.optional(),
      }),
      electronicDocumentConsent: yup.boolean().optional(),
      companyName: yup.string().max(100).required('필수 항목 입니다.'),
      companyAddress: yup.string().nullable().required('필수 항목 입니다.'),
      // companyDetailAddress: yup
      //   .string()
      //   .nullable()
      //   .required('필수 항목 입니다.'),
      companyBusinessNumber: yup.string().max(20).nullable().optional(),
      hireYear: yup
        .number()
        .typeError('숫자만 입력 가능합니다.')
        .integer('네 자리 연도를 입력해주세요')
        .positive()
        .min(1900, '네 자리 연도를 입력해주세요')
        .max(new Date().getFullYear(), '오늘 기준 연도까지만 입력 가능합니다')
        .nullable()
        .optional(),
      hireMonth: yup
        .number()
        .typeError('숫자만 입력 가능합니다.')
        .integer('두 자리 월을 입력해주세요')
        .positive()
        .min(1, '1월부터 12월까지 입력해주세요.')
        .max(12, '1월부터 12월까지 입력해주세요.')
        .nullable()
        .optional(),
      rrcAddress: yup.string().max(500).optional(),
    })
  }, [router.query.type])

  return useForm<LoanRequestType>({
    resolver: yupResolver(signUpFormSchema) as any,
    mode: 'onChange',
    ...options,
  })
}

// Step3 전용 폼 훅
export const useApplyLoanStep3Form = (
  options?: UseFormProps<LoanRequestType>,
) => {
  const step3Schema = useMemo(() => {
    return yup.object().shape({
      // Step3 필드들만 필수로 설정
      purpose: yup.string().required('대출 용도를 선택해주세요.'),
      totalAsset: yup.string().required('총 자산 규모를 선택해주세요.'),
      annualIncome: yup.string().required('연 소득을 선택해주세요.'),
      monthlyIncome: yup.string().required('월 실수령액을 입력해주세요.'),
      monthlyFixedExpense: yup
        .string()
        .required('월 고정 지출을 입력해주세요.'),
      debtScale: yup.string().required('부채규모를 선택해주세요.'),
      repaymentMethod: yup.string().required('변제방법을 선택해주세요.'),
      creditScore: yup.string().required('신용평가점수를 선택해주세요.'),
      purposeAndRepaymentPlan: yup
        .string()
        .required('대출 용도 및 상환 계획을 입력해주세요.'),

      safeKey: yup
        .string()
        .nullable()
        .test(
          'safeKey-required',
          '신용정보 제출이 필요합니다.',
          function (value) {
            return value !== null && value !== undefined && value !== ''
          },
        ),
      // 조건부 필드들
      purposeDetail: yup.string().when('purpose', {
        is: 'DIRECT_INPUT',
        then: (schema) => schema.required('대출 용도를 입력해주세요.'),
        otherwise: (schema) => schema.optional(),
      }),
      repaymentDetail: yup.string().when('repaymentMethod', {
        is: 'DIRECT_INPUT',
        then: (schema) => schema.required('변제방법을 입력해주세요.'),
        otherwise: (schema) => schema.optional(),
      }),
    })
  }, [])

  return useForm<LoanRequestType>({
    resolver: yupResolver(step3Schema) as any,
    mode: 'onChange',
    ...options,
  })
}
