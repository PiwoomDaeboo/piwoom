export const BUTTON_DATA = ['상세 정보', '상환 스케줄 확인하기']

export const CARD_DATA = [
  {
    icon: 'loan1',
    title: '월급 대출',
    description: '월급 직장인을 위한',
    description1: '비상금이 필요할 때',
    description2: '빠르고 간편한 비대면 대출',
    badges: ['#최대 6개월치 월급', '#최저 월 1% ~', '#최대 1500만원 까지'],
    details: {
      sections: [
        {
          title: '상품',
          type: 'list',
          content: [
            '대출 한도 : 최저 300만원 ~ 최대 1,500만원',
            '정상 금리 : 연 20% 이내',
            '연체 금리 : 대출금리 +3%p 이내 연 20% 이내',
            '상환 방법 : 원리금균등분할상환, 만기 일시상환',
            '상환 기간 : 6개월 이내',
            '중도상환 수수료: 3% (단, 대부이자, 연체이자, 중도상환수수료 합계금액은 법정최고금리 연 20%를 초과하지 않습니다.)',
          ],
        },
        {
          title: '구비서류',
          type: 'text',
          content: '주민등록증 / 운전면허증 / 여권 중 택1',
        },
        {
          title: '조건',
          type: 'list',
          content: [
            '만 20세 이상 근로소득자',
            '연체, 부도정보 등 신용도판단정보 등재 사실이 없는 고객 ',
            '회생, 파산, 면책 등 신청 사실이 없는 고객 ',
            '당사 연체대출금을 보유 중이거나 손실을 끼친 이력이 없는 고객 ',
            '금융사기 및 기타 금융거래 제한 관련 기록이 없는 고객',
          ],
        },
        {
          title: '신청방법',
          type: 'text',
          content:
            '온라인으로 대출 신청이 가능합니다. 자세한 대출 절차에 대해서는 [대출 절차 안내] 페이지를 참고 부탁드립니다.',
        },
        {
          title: '유의사항',
          type: 'text',
          content:
            '비대면 서류 제출에 활용되는 공공기관 점검 또는 은행 점검과 같은 사유 발생 시에는 대출 신청 및 송금이 제한될 수 있습니다.',
        },
      ],
    },
  },
  {
    icon: 'loan2',
    title: '신용 대출',
    description: '피움 자체 신용도 평가 시스템으로',
    description1: '성장 자금이 필요할 때',
    description2: '빠르고 간편한 비대면 대출',
    badges: ['#DSR 미적용', '#신용점수 영향X', '#서류 제출X'],
    details: {
      sections: [
        {
          title: '상품',
          type: 'list',
          content: [
            '대출 한도 : 최저 300만원부터 신청 가능하며, 신용도 및 소득 등에 따라 한도 부여',
            '정상 금리 : 연 20% 이내',
            '연체 금리 : 대출금리 +3%p 이내 연 20% 이내',
            '상환 방법 : 원리금균등분할상환, 만기 일시상환',
            '상환 기간 : 36개월 이내',
            '중도상환 수수료: 3% (단, 대부이자, 연체이자, 중도상환수수료 합계금액은 법정최고금리 연 20%를 초과하지 않습니다.)',
          ],
        },
        {
          title: '구비서류',
          type: 'text',
          content: '신분증 / 소득증빙서류 (선택사항)',
        },
        {
          title: '조건',
          type: 'list',
          content: [
            '만 20세 이상',
            '연체, 부도정보 등 신용도판단정보 등재 사실이 없는 고객',
            '회생, 파산, 면책 등 신청 사실이 없는 고객',
            '당사 연체대출금을 보유 중이거나 손실을 끼친 이력이 없는 고객',
            '금융사기 및 기타 금융거래 제한 관련 기록이 없는 고객',
          ],
        },
        {
          title: '신청방법',
          type: 'text',
          content:
            '온라인으로 대출 신청이 가능합니다. 자세한 대출 절차에 대해서는 [대출 절차 안내] 페이지를 참고 부탁드립니다.',
        },
        {
          title: '유의사항',
          type: 'text',
          content:
            '비대면 서류 제출에 활용되는 공공기관 점검 또는 은행 점검과 같은 사유 발생 시에는 대출 신청 및 송금이 제한될 수 있습니다.',
        },
      ],
    },
  },
  {
    icon: 'loan3',
    title: '부동산 담보대출',
    description: '중/후순위 대출',
    description1: '주택 구매 자금이 부족하거나 추가 담보대출이 필요할 때',
    description2: '금융권 대출 한도가 부족한 고객님을 위한 담보대출 상품',
    badges: ['#아파트', '##LTV 최대 90%까지', '#6억원 초과 대출 가능'],
    details: {
      sections: [
        {
          title: '상품',
          type: 'list',
          content: [
            '대출 한도 : 시세에 따라 한도 부여',
            '정상 금리 : 연 20% 이내 ',
            '연체 금리 : 대출금리 +3%p 이내 연 20% 이내 ',
            '상환 방법 : 원리금균등분할상환, 만기 일시상환',
            '상환 기간 : 60개월 이내',
            '중도상환 수수료: 3% (단, 대부이자, 연체이자, 중도상환수수료 합계금액은 법정최고금리 연 20%를 초과하지 않습니다.)',
          ],
        },
        {
          title: '구비서류',
          type: 'list',
          content: [
            '주민등록증 / 운전면허증 / 여권 중 택1',
            '신규 주택을 매입하며 대출을 받으려는 경우 매매계약서 사본',
          ],
        },
        {
          title: '조건',
          type: 'list',
          content: [
            '만 20세 이상 국내 소재의 주택 소유자 또는 소유 예정자',
            '연체, 부도정보 등 신용도판단정보 등재 사실이 없는 고객 ',
            '회생, 파산, 면책 등 신청 사실이 없는 고객',
            '당사 연체대출금을 보유 중이거나 손실을 끼친 이력이 없는 고객 ',
            '금융사기 및 기타 금융거래 제한 관련 기록이 없는 고객',
          ],
        },
        {
          title: '신청방법',
          type: 'text',
          content:
            '온라인으로 대출 신청이 가능합니다. 자세한 대출 절차에 대해서는 [대출 절차 안내] 페이지를 참고 부탁드립니다.',
        },
        {
          title: '기타',
          type: 'list',
          content: [
            '근저당 설정 비용 고객 부담 (등록면허세, 지방교육세, 등기신청수수료, 국민주택채권매입비, 주소변경비용, 확인서면비용, 근저당 말소비용 등)',
            '근저당 설정시 법무사 수수료 : 당사 부담',
            '근저당 말소시 법무사 수수료 : 고객 부담',
          ],
        },
        {
          title: '유의사항',
          type: 'text',
          content:
            '비대면 서류 제출에 활용되는 공공기관 점검 또는 은행 점검과 같은 사유 발생 시에는 대출 신청 및 송금이 제한될 수 있습니다.',
        },
      ],
    },
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
    dataKey: 'borrowedAmount',
    formatter: (value: number) => `${value?.toLocaleString() || 0}원`,
  },
  {
    title: '대출 잔액',
    dataKey: 'loanBalance',
    formatter: (value: number) => `${value?.toLocaleString() || 0}원`,
  },
  {
    title: '금리',
    dataKey: 'interestRate',
    formatter: (value: number) => `연 ${value || 0}%`,
  },
  {
    title: '연체이자율',
    dataKey: 'overdueInterestRate',
    formatter: (value: number) => `연 ${value || 0}%`,
  },
  {
    title: '계약일',
    dataKey: 'contractDate',
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
    dataKey: 'maturityDate',
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
    dataKey: 'repaymentDay',
    formatter: (value: string | number) => {
      if (typeof value === 'number') {
        return `매달 ${value}일`
      }
      return value || '-'
    },
  },
  {
    title: '갚는 방식',
    dataKey: 'repaymentMethod',
    formatter: (value: string) => value || '-',
  },
  {
    title: '상환 입금 계좌',
    dataKey: 'repaymentAccount',
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
    dataKey: 'earlyRepaymentFee',
    formatter: (value: number) => `${value || 0}%`,
  },
  {
    title: '담보 제공 여부',
    dataKey: 'collateralProvided',
    formatter: (value: string) => value || '해당 없음',
  },
  {
    title: '보증 여부',
    dataKey: 'guaranteeProvided',
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
