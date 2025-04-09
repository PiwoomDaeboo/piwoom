import { Link } from '@chakra-ui/next-js'
import {
  Button,
  Container,
  ContainerProps,
  Flex,
  HStack,
  IconButton,
  Text,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

import { MagicubeIcon, MenuIcon } from 'generated/icons/MyIcons'

import InquiryModal from '@/components/@Modal/InquiryModal'
import { ROUTES } from '@/generated/path/routes'

import LoginCodeModal from '../../../../@Modal/LoginCodeModal'
import HomeHeaderDrawer from './components/HomeHeaderDrawer'

const HomeHeader = ({ ...props }: ContainerProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  const {
    isOpen: isLoginCodeOpen,
    onClose: onLoginCodeClose,
    onOpen: onLoginCodeOpen,
  } = useDisclosure()
  const {
    isOpen: isInquiryOpen,
    onClose: onInquiryClose,
    onOpen: onInquiryOpen,
  } = useDisclosure()

  return (
    <Flex
      w="100%"
      h="70px"
      bg="white"
      alignItems="center"
      px={{ base: '16px', sm: '30px', md: '60px' }}
      justifyContent="space-between"
      {...props}
    >
      <LoginCodeModal isOpen={isLoginCodeOpen} onClose={onLoginCodeClose} />
      <InquiryModal isOpen={isInquiryOpen} onClose={onInquiryClose} />
      <Link variant={'unstyled'} href={ROUTES.MAIN}>
        <MagicubeIcon width="45px" height="42px" />
      </Link>
      <HStack spacing="16px">
        <Button
          borderRadius={'full'}
          variant={'outline-primary'}
          display={{ base: 'none', sm: 'block' }}
          onClick={onInquiryOpen}
        >
          <Text textStyle={'pre-heading-05'}>시안 업로드</Text>
        </Button>
        <Button
          borderRadius={'full'}
          variant={'solid-primary'}
          display={{ base: 'none', sm: 'block' }}
          onClick={onLoginCodeOpen}
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
    </Flex>
  )
}

export default HomeHeader
