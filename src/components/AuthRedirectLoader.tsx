import { Container, Flex, Spinner, Text, VStack } from '@chakra-ui/react'

interface AuthRedirectLoaderProps {
  message?: string
}

/**
 * 인증 리다이렉트 중 표시되는 로딩 컴포넌트
 */
export const AuthRedirectLoader = ({
  message = '페이지를 이동하고 있습니다...',
}: AuthRedirectLoaderProps) => {
  return (
    <Container>
      <Flex
        pt={{ base: '40px', sm: '48px', md: '80px' }}
        pb={'120px'}
        justifyContent="center"
        alignItems="center"
        minH="50vh"
      >
        <VStack spacing={4}>
          <Spinner size="lg" color="primary.4" />
        </VStack>
      </Flex>
    </Container>
  )
}
