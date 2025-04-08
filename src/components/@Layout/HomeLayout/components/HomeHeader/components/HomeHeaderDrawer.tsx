import {
  ChakraProps,
  Divider,
  DrawerProps,
  Image,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'

import DrawerBasis from '@/components/@Drawer/DrawerBasis'
import InquiryModal from '@/components/@Modal/InquiryModal'
import LoginCodeModal from '@/components/@Modal/LoginCodeModal'
import LoginInfoModal from '@/components/@Modal/LoginInfoModal'
import { MY_IMAGES } from '@/generated/path/images'

interface HomeHeaderDrawerProps extends Omit<DrawerProps, 'children'> {
  bodyProps?: ChakraProps
}

const HomeHeaderDrawer = ({ bodyProps, ...props }: HomeHeaderDrawerProps) => {
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
    <DrawerBasis //
      header={''}
      body={
        <VStack alignItems={'flex-start'}>
          <LoginInfoModal isOpen={isLoginCodeOpen} onClose={onLoginCodeClose} />
          <InquiryModal isOpen={isInquiryOpen} onClose={onInquiryClose} />

          <Text onClick={onInquiryOpen} textStyle={'pre-heading-04'}>
            시안 업로드
          </Text>
          <Divider />
          <Text onClick={onLoginCodeOpen} textStyle={'pre-heading-04'}>
            에디터 코드
          </Text>
          <Divider />
        </VStack>
      }
      footer={
        <Image
          src={MY_IMAGES.MOBILE_FOOTER_IMAGE.src}
          alt={MY_IMAGES.MOBILE_FOOTER_IMAGE.alt}
        />
      }
      styles={{
        content: { bg: 'white' },
        body: { ...bodyProps },
      }}
      {...props}
    />
  )
}

export default HomeHeaderDrawer
