import { useMemo } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'

import { UseFormProps, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { LoanRequestType } from '@/generated/apis/@types/data-contracts'

export const useApplyLoanForm = (options?: UseFormProps<LoanRequestType>) => {
  const signUpFormSchema = useMemo(() => {
    return yup.object().shape({
      // Step1 fields
      kind: yup.string().optional(),
      email: yup.string().email().required('필수 항목 입니다.'),

      // Step2 fields

      // Step3 fields (required for step3 validation)
      purpose: yup.string().required('필수 항목 입니다.'),
      totalAsset: yup.string().required('필수 항목 입니다.'),
      annualIncome: yup.string().required('필수 항목 입니다.'),
      monthlyIncome: yup
        .number()
        .typeError('숫자만 입력 가능합니다.')
        .integer()
        .positive()
        .min(0)
        .required('필수 항목 입니다.'),
      monthlyFixedExpense: yup
        .number()
        .typeError('숫자만 입력 가능합니다.')
        .integer()
        .positive()
        .min(0)
        .required('필수 항목 입니다.'),
      debtScale: yup.string().required('필수 항목 입니다.'),
      repaymentMethod: yup.string().required('필수 항목 입니다.'),
      creditScore: yup.string().required('필수 항목 입니다.'),
      purposeAndRepaymentPlan: yup.string().optional(),
      safeKey: yup.string().nullable().optional(),

      // Step4 fields
      loanAmount: yup
        .number()
        .typeError('숫자만 입력 가능합니다.')
        .integer()
        .positive()
        .min(0)
        .required('필수 항목 입니다.'),
      repaymentType: yup.string().required('필수 항목 입니다.'),
      interestPaymentDate: yup.string().required('필수 항목 입니다.'),
      loanPeriod: yup.string().required('필수 항목 입니다.'),
      bank: yup.string().required('필수 항목 입니다.'),
      accountNumber: yup.string().required('필수 항목 입니다.'),
      // accountHolder: yup.string().required('필수 항목 입니다.'),
      // accountHolderSsn: yup.string().required('필수 항목 입니다.'),
      accountHolder: yup.string().nullable().optional(),
      accountHolderSsn: yup.string().nullable().optional(),
      jobType: yup.string().required('필수 항목 입니다.'),
      postcode: yup.string().required('필수 항목 입니다.'),
      baseAddress: yup.string().required('필수 항목 입니다.'),
      detailAddress: yup.string().required('필수 항목 입니다.'),
      housingType: yup.string().required('필수 항목 입니다.'),
      residenceType: yup.string().required('필수 항목 입니다.'),
      assetPostcode: yup.string().required('필수 항목 입니다.'),
      assetBaseAddress: yup.string().required('필수 항목 입니다.'),
      assetDetailAddress: yup.string().required('필수 항목 입니다.'),
      incomeCertificate: yup.string().nullable().optional(),
      residentRegistrationCopy: yup.string().nullable().optional(),
      healthInsuranceEligibilityConfirmation: yup
        .string()
        .nullable()
        .optional(),
      employmentType: yup.string().required('필수 항목 입니다.'),
      healthInsurancePaymentConfirmation: yup.string().nullable().optional(),
      healthInsurancePaymentConfirmation2: yup.string().nullable().optional(),
      identityCard: yup.string().nullable().optional(),
      fileSet: yup.mixed().nullable().optional(),

      // Optional fields
      purposeDetail: yup.string().optional(),
      repaymentDetail: yup.string().optional(),
      electronicDocumentConsent: yup.boolean().optional(),
      companyName: yup.string().max(100).optional(),
      companyAddress: yup.string().optional(),
      companyBusinessNumber: yup.string().max(20).optional(),
      hireYear: yup
        .number()
        .typeError('숫자만 입력 가능합니다.')
        .min(0)
        .nullable()
        .optional(),
      hireMonth: yup
        .number()
        .typeError('숫자만 입력 가능합니다.')
        .min(1, '1월부터 12월까지 입력해주세요.')
        .max(12, '1월부터 12월까지 입력해주세요.')
        .nullable()
        .optional(),
      rrcAddress: yup.string().max(500).optional(),
    })
  }, [])

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
      purpose: yup.string().required('대출용도를 선택해주세요.'),
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
      // safeKey: yup
      //   .string()
      //   .min(1, '신용정보 제출이 필요합니다.')
      //   .required('신용정보 제출이 필요합니다.'),
      safeKey: yup.string().nullable().optional(),
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
