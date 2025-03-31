import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle({
  w: '100%',
  maxW: '1440px',
  px: '0px',
  // px: {
  //   base: '16px',
  //   sm: '30px',
  //   md: '60px',
  // },
})

const variants = defineStyle({})

const Container = defineStyleConfig({
  baseStyle,
  variants,
})

export default Container
