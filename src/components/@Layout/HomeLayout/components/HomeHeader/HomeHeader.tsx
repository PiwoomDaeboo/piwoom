import { Link } from '@chakra-ui/next-js'
import {
  Button,
  Container,
  ContainerProps,
  HStack,
  IconButton,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

import { LogoIcon, MagicubeIcon, MenuIcon } from 'generated/icons/MyIcons'

import ClientOnly from '@/components/ClientOnly'
import { ROUTES } from '@/generated/path/routes'
import { useAuth } from '@/hooks/useAuth'
import { useLocalStorage } from '@/stores/local/state'

import HomeHeaderDrawer from './components/HomeHeaderDrawer'

const HomeHeader = ({ ...props }: ContainerProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { isLogin } = useAuth()
  const resetToken = useLocalStorage((store) => store.reset)

  return (
    <Container
      display="flex"
      w="100%"
      h="70px"
      px="0px"
      bg="white"
      maxW="1400px"
      alignItems="center"
      justifyContent="space-between"
      {...props}
    >
      <Link variant={'unstyled'} href={ROUTES.MAIN}>
        <MagicubeIcon width="45px" height="42px" />
      </Link>
      <HStack spacing="16px">
        <Button
          borderRadius={'full'}
          variant={'outline-primary'}
          display={{ base: 'none', sm: 'block' }}
        >
          <Text textStyle={'pre-heading-05'}>시안 업로드</Text>
        </Button>
        <Button
          borderRadius={'full'}
          variant={'solid-primary'}
          display={{ base: 'none', sm: 'block' }}
        >
          <Text textStyle={'pre-heading-05'}>에디터 코드</Text>
        </Button>

        <IconButton
          display={{ base: 'block', sm: 'none' }}
          size={'xs'}
          icon={<MenuIcon w="24px" h="24px" color={'content.1'} />}
          onClick={onOpen}
          cursor="pointer"
          bg="transparent"
          aria-label="btn-toggle-drawer"
        />
      </HStack>

      <HomeHeaderDrawer isOpen={isOpen} onClose={onClose} />
    </Container>
  )
}

export default HomeHeader
