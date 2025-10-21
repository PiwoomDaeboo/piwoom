/**
 * 대출 상태에 따른 배지 스타일을 반환하는 함수
 * @param status - 대출 상태 문자열
 * @returns 배지 스타일 객체 (color, bg)
 */
export const getBadgeStyle = (
  status: string,
): { color: string; bg: string } => {
  switch (status) {
    case 'UNDER_REVIEW':
      return { color: 'accent.yellow3', bg: 'accent.yellow1' }
    case 'CONTRACTING':
      return { color: 'accent.pink2', bg: 'accent.pink1' }
    case 'IN_PROGRESS':
      return { color: 'primary.4', bg: 'primary.1' }
    case 'REMITTING':
      return { color: 'secondary.4', bg: 'secondary.2' }
    case 'OVERDUE':
      return { color: 'accent.red2', bg: 'accent.red1' }
    case 'EARLY_REPAYMENT_COMPLETED':
      return { color: 'accent.green2', bg: 'accent.green1' }
    case 'MATURITY_REPAYMENT_COMPLETED':
      return { color: 'accent.violet2', bg: 'accent.violet1' }
    case 'REJECTED':
      return { color: 'grey.7', bg: 'grey.2' }
    default:
      return { color: 'grey.7', bg: 'grey.2' }
  }
}

/**
 * 대출 상태에 따른 상환 스케줄 확인하기 버튼 가시성을 반환하는 함수
 * @param status - 대출 상태 문자열
 * @returns 'visible' | 'hidden'
 */
export const getScheduleButtonVisibility = (
  status: string,
): 'visible' | 'hidden' => {
  switch (status) {
    case 'IN_PROGRESS':
    case 'OVERDUE':
    case 'CONTRACTING':
    case 'REMITTING':
      return 'visible'
    default:
      return 'hidden'
  }
}

/**
 * 대출 상태에 따른 중도 상환 신청하기 버튼 가시성을 반환하는 함수
 * @param status - 대출 상태 문자열
 * @returns 'visible' | 'hidden'
 */
export const getRepaymentButtonVisibility = (
  status: string,
): 'visible' | 'hidden' => {
  switch (status) {
    case 'IN_PROGRESS':
    case 'OVERDUE':
      return 'visible'
    default:
      return 'hidden'
  }
}

/**
 * 대출 상태에 따른 계약서 다운로드 버튼 가시성을 반환하는 함수
 * @param status - 대출 상태 문자열
 * @returns 'visible' | 'hidden'
 */
export const getContractDownloadButtonVisibility = (
  status: string,
): 'visible' | 'hidden' => {
  switch (status) {
    case 'IN_PROGRESS':
    case 'OVERDUE':
      return 'visible'
    default:
      return 'hidden'
  }
}

/**
 * 대출 상태에 따른 기타서류 발급 요청하기 버튼 가시성을 반환하는 함수
 * @param status - 대출 상태 문자열
 * @returns 'visible' | 'hidden'
 */
export const getDocumentRequestButtonVisibility = (
  status: string,
): 'visible' | 'hidden' => {
  switch (status) {
    case 'IN_PROGRESS':
    case 'OVERDUE':
    case 'CONTRACTING':
    case 'REMITTING':
      return 'visible'
    default:
      return 'hidden'
  }
}

/**
 * 대출 상태에 따른 추가서류 제출 버튼 가시성을 반환하는 함수
 * @param status - 대출 상태 문자열
 * @returns 'visible' | 'hidden'
 */
export const getAdditionalDocumentButtonVisibility = (
  status: string,
): 'visible' | 'hidden' => {
  switch (status) {
    case 'UNDER_REVIEW':
    case 'IN_PROGRESS':
    case 'EARLY_REPAYMENT_COMPLETED':
    case 'MATURITY_REPAYMENT_COMPLETED':
    case 'REJECTED':
    case 'CONTRACTING':
    case 'REMITTING':
      return 'visible'
    default:
      return 'hidden'
  }
}
