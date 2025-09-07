import { accordionAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    bg: 'white', // change the backgroundColor of the container
  },
  item: {},
  button: {
    p: '29px 40px',
    _hover: {
      bg: 'transparent',
    },
  },
  panel: {
    borderTop: '1px solid',
    borderColor: 'border.basic.1',
    p: '40px',
    bg: 'background.basic.2',
    textStyle: 'pre-body-4',
    color: 'grey.10',
  },
  icon: {
    marginLeft: '20px',
    color: 'grey.8',
    boxSize: '24px',
  },
})

const Accordion = defineMultiStyleConfig({
  baseStyle,

  defaultProps: {
    size: 'md',
  },
})
export default Accordion
