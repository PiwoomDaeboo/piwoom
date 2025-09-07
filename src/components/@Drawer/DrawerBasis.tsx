import { ReactNode } from 'react'

import {
  ChakraProps,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
} from '@chakra-ui/react'

interface DrawerBasisProps extends Omit<DrawerProps, 'children'> {
  header?: ReactNode
  body?: ReactNode
  footer?: ReactNode
  styles?: {
    content?: ChakraProps
    header?: ChakraProps
    body?: ChakraProps
    footer?: ChakraProps
  }
  visibleCloseButton?: boolean
}

export default function DrawerBasis({
  header,
  body,
  footer,
  styles,
  visibleCloseButton = true,
  ...props
}: DrawerBasisProps) {
  return (
    <>
      <Drawer size="sm" placement="right" {...props}>
        <DrawerOverlay />
        <DrawerContent bg="white" {...styles?.content}>
          {visibleCloseButton && (
            <DrawerCloseButton //
              w="40px"
              h="40px"
              onClick={props.onClose}
            />
          )}
          <DrawerHeader {...styles?.header}>{header}</DrawerHeader>
          <DrawerBody {...styles?.body}>{body}</DrawerBody>
          <DrawerFooter {...styles?.footer}>{footer}</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
