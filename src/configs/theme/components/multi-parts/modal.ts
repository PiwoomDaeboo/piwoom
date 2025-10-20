import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  dialogContainer: {
    alignItems: 'center',
    px: '16px',
  },
})

const variants = {
  alert: definePartsStyle({
    dialog: {
      w: '311px', // fixed
      borderRadius: '16px',
      p: '24px',
      bg: `white`,
    },
    header: {
      display: 'flex',
      justifyContent: 'center',
      p: '0',
      mb: '8px',
      textStyle: 'pre-heading-04',
    },
    body: {
      display: 'flex',
      justifyContent: 'center',
      p: '0',
      mb: '24px',
      textStyle: 'pre-body-06',
      color: 'content.2',
    },
    footer: {
      justifyContent: 'center',
      p: '0',
      gap: '12px',
      bg: 'grey.0',
    },
  }),
  modal: definePartsStyle({
    dialog: {
      my: { base: 0, sm: 'auto' },
      borderTopRadius: { base: '0px', sm: '16px' },
      borderBottomRadius: { base: '0px', sm: '16px' },
    },
    dialogContainer: {
      alignItems: ['center'],
    },
  }),
}

const sizes = {
  full: definePartsStyle({
    dialog: {
      borderRadius: '0px',
      maxW: '100vw',
      // maxH: '100%',
      h: '100%',
      bg: 'white',
      m: 0,
    },
    dialogContainer: {
      px: '0px',
      py: '0px',
      borderRadius: '0px',
    },
  }),
}

export const Modal = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: 'modal',
  },
})

export default Modal
