import {
  ChakraProps,
  Divider,
  DrawerProps,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react'

import DrawerBasis from '@/components/@Drawer/DrawerBasis'
import { MY_IMAGES } from '@/generated/path/images'

interface HomeHeaderDrawerProps extends Omit<DrawerProps, 'children'> {
  bodyProps?: ChakraProps
}

const HomeHeaderDrawer = ({ bodyProps, ...props }: HomeHeaderDrawerProps) => {
  return (
    <DrawerBasis //
      header={''}
      body={
        <VStack alignItems={'flex-start'}>
          <Text textStyle={'pre-heading-04'}>시안 업로드</Text>
          <Divider />
          <Text textStyle={'pre-heading-04'}>에디터 코드</Text>
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
