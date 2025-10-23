import { REPAYMENT_TYPE } from '@/constants/loan'

export const BUTTON_DATA = [
  {
    title: '상세 정보',
    value: 'detail',
  },
  {
    title: '상환 스케줄 확인',
    value: 'schedule',
  },
  {
    title: '추가 서류 제출',
    value: 'document',
  },
]

// 대출 상세 정보 필드 설정
export interface DetailField {
  title: string
  dataKey: string // API 데이터의 키
  formatter?: (value: any, allData?: any) => string // 데이터 포맷팅 함수
}

export const DETAIL_FIELDS: DetailField[] = [
  {
    title: '빌린 금액',
    dataKey: 'contract.amount',
    formatter: (value: number) => `${value?.toLocaleString() || 0}원`,
  },
  {
    title: '대출 잔액',
    dataKey: 'loanBalance',
    formatter: (value: number) => `${value?.toLocaleString() || 0}원`,
  },
  {
    title: '금리',
    dataKey: 'contract.interestRate',
    formatter: (value: number) => `연 ${value || 0}%`,
  },
  {
    title: '연체이자율',
    dataKey: 'contract.overdueInterestRate',
    formatter: (value: number) => `연 ${value || 0}%`,
  },
  {
    title: '계약일',
    dataKey: 'contract.loanDate',
    formatter: (value: string) => {
      if (!value) return '-'
      const date = new Date(value)
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },
  },
  {
    title: '만기일',
    dataKey: 'contract.maturityDate',
    formatter: (value: string) => {
      if (!value) return '-'
      const date = new Date(value)
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },
  },
  {
    title: '대출 갚는 날',
    dataKey: 'contract.interestPaymentDate',
    formatter: (value: string | number) => {
      if (typeof value === 'number') {
        return `매달 ${value}일`
      }
      return value || '-'
    },
  },
  {
    title: '갚는 방식',
    dataKey: 'contract.repaymentType',
    formatter: (value: string) =>
      REPAYMENT_TYPE.find((item) => item.value === value)?.label || '-',
  },
  {
    title: '상환 입금 계좌',
    dataKey: 'contract.repaymentType',
    formatter: (value: any, allData: any) => {
      // API에서 bank, accountNumber, accountHolder로 분리된 데이터를 받는 경우
      if (allData.bank && allData.accountNumber && allData.accountHolder) {
        return `${allData.bank}\n${allData.accountNumber}\n${allData.accountHolder}`
      }

      // 기존 방식 (문자열로 받는 경우) - 호환성을 위해 유지
      if (typeof value === 'string' && value) {
        // 정규식을 사용하여 금융기관명, 계좌번호, 예금주명을 분리
        const match = value.match(
          /^([가-힣\s]+?)\s+(\d{3,4}-\d{3,4}-\d{3,4}-\d{2,4})\s*(.+)$/,
        )

        if (match) {
          const [, bankName, accountNumber, accountHolder] = match
          return `${bankName}\n${accountNumber}\n${accountHolder}`
        }

        // 정규식 매치가 안되면 공백으로 분리 시도
        const parts = value.split(' ')
        if (parts.length >= 3) {
          const bankName = parts[0]
          const accountNumber = parts[1]
          const accountHolder = parts.slice(2).join(' ')
          return `${bankName}\n${accountNumber}\n${accountHolder}`
        }

        return value
      }

      return '-'
    },
  },
  {
    title: '중도상환수수료',
    dataKey: 'contract.prepaymentRate',
    formatter: (value: number) => `${value || 0}%`,
  },
  {
    title: '담보 제공 여부',
    dataKey: 'collateralProvided',
    formatter: (value: string) => value || '해당 없음',
  },
  {
    title: '보증 여부',
    dataKey: 'contract.isJointGuarantee',
    formatter: (value: string) => value || '해당 없음',
  },
]

// API 데이터를 받아서 포맷팅된 상세 정보를 반환하는 함수
export const getFormattedDetailData = (apiData: any) => {
  return DETAIL_FIELDS.map((field) => ({
    title: field.title,
    value:
      field.formatter ?
        field.formatter(apiData[field.dataKey], apiData)
      : apiData[field.dataKey] || '-',
  }))
}

// 샘플 API 데이터 구조
export interface LoanDetailApiData {
  borrowedAmount: number
  loanBalance: number
  interestRate: number
  overdueInterestRate: number
  contractDate: string
  maturityDate: string
  repaymentDay: number
  repaymentMethod: string
  repaymentAccount: string // 기존 방식 (호환성)
  bank?: string // 새로운 방식: 입금은행
  accountNumber?: string // 새로운 방식: 계좌번호
  accountHolder?: string // 새로운 방식: 예금주
  earlyRepaymentFee: number
  collateralProvided: string
  guaranteeProvided: string
  contractNumber: string
}

// 샘플 데이터
export const SAMPLE_LOAN_DATA: LoanDetailApiData = {
  borrowedAmount: 10000000,
  loanBalance: 5000000,
  interestRate: 15,
  overdueInterestRate: 18,
  contractDate: '2025-08-25',
  maturityDate: '2025-08-25',
  repaymentDay: 25,
  repaymentMethod: '만기 일시상환',
  repaymentAccount: '농협은행 301-0336-5676-01(피움대부주식회사)', // 기존 방식
  bank: '농협은행', // 새로운 방식
  accountNumber: '301-0336-5676-01', // 새로운 방식
  accountHolder: '(피움대부주식회사)', // 새로운 방식
  earlyRepaymentFee: 3,
  collateralProvided: '해당 없음',
  guaranteeProvided: '해당 없음',
  contractNumber: '1111111111111',
}

// 기존 DETAIL_DATA (호환성을 위해 유지)
const DETAIL_DATA = [
  {
    title: '빌린 금액',
    value: '100,000,000원',
  },
  {
    title: '대출 갚는날',
    value: '100,000,000원',
  },
  {
    title: '대출 갚을 금액',
    value: '100,000,000원',
  },
]
