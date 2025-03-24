import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'

const baseStyle = defineStyle({
  wordBreak: 'keep-all',
})

const Text = defineStyleConfig({
  baseStyle,
})

export default Text
