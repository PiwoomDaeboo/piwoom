/**
 * JWT 토큰을 파싱하여 payload를 반환하는 유틸리티 함수
 * @param token JWT 토큰 문자열
 * @returns 파싱된 payload 객체 또는 null
 */
export const parseJWT = (token: string): any | null => {
  try {
    // JWT는 header.payload.signature 형태로 구성됨
    const parts = token.split('.')

    if (parts.length !== 3) {
      console.error('Invalid JWT format')
      return null
    }

    // payload 부분을 디코딩 (base64url)
    const payload = parts[1]

    // base64url 디코딩을 위해 패딩 추가
    const paddedPayload = payload + '='.repeat((4 - (payload.length % 4)) % 4)

    // base64url을 base64로 변환
    const base64Payload = paddedPayload.replace(/-/g, '+').replace(/_/g, '/')

    // 디코딩
    const decodedPayload = atob(base64Payload)

    // JSON 파싱
    return JSON.parse(decodedPayload)
  } catch (error) {
    console.error('JWT parsing error:', error)
    return null
  }
}

/**
 * JWT 토큰에서 사용자 정보를 추출하는 함수
 * @param token JWT 토큰 문자열
 * @returns 사용자 정보 객체 (ci 제외)
 */
export const extractUserInfoFromJWT = (token: string) => {
  const payload = parseJWT(token)

  if (!payload) {
    return null
  }

  // ci를 제외한 사용자 정보만 반환
  const { ci, ...userInfo } = payload

  return userInfo
}
