import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle({
  w: '100%',
  maxW: {
    base: '100%',
    sm: '768px',
    md: '1280px',
  },
})

const variants = defineStyle({})

const Container = defineStyleConfig({
  baseStyle,
  variants,
})

export default Container
