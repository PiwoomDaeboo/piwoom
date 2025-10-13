/**
 * API 에러 응답에서 에러 메시지를 추출하는 함수
 * @param error - API 에러 객체
 * @param defaultMessage - 기본 에러 메시지 (선택적)
 * @returns 추출된 에러 메시지
 */
export const extractErrorMessage = (
  error: any,
  defaultMessage: string = '오류가 발생했습니다.',
): string => {
  // nonField 배열에서 메시지 추출
  if (
    error?.response?.data?.nonField &&
    Array.isArray(error.response.data.nonField)
  ) {
    return error.response.data.nonField[0] || defaultMessage
  }

  // message 필드에서 메시지 추출
  if (error?.response?.data?.message) {
    return error.response.data.message
  }

  // error 객체의 message 필드
  if (error?.message) {
    return error.message
  }

  return defaultMessage
}

/**
 * Toast 옵션 타입 정의
 */
export interface ToastErrorOptions {
  title?: string
  description?: string
  duration?: number
  isClosable?: boolean
  status?: 'info' | 'warning' | 'success' | 'error'
}

/**
 * 에러 메시지를 처리하여 Toast 옵션 객체를 반환하는 함수
 * @param error - API 에러 객체
 * @param options - 추가 Toast 옵션 (선택적)
 * @returns Toast 옵션 객체
 */
export const handleErrorToast = (
  error: any,
  options?: ToastErrorOptions,
): Required<ToastErrorOptions> => {
  const errorMessage = extractErrorMessage(error, options?.description)

  return {
    title: options?.title || '오류',
    description: errorMessage,
    status: options?.status || 'error',
    duration: options?.duration ?? 5000,
    isClosable: options?.isClosable ?? true,
  }
}
