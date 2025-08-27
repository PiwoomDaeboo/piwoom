import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle({
  w: '100%',
  maxW: {
    base: '360px',
    sm: '768px',
    md: '1280px',
  },
  px: {
    base: '20px',
    sm: '40px',
    md: '260px',
  },
})

const variants = defineStyle({})

const Container = defineStyleConfig({
  baseStyle,
  variants,
})

export default Container
