import { inputAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

import { textStyles } from '@/generated/tokens/text-styles'

import { variants } from './variants'

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys)

const Input = defineMultiStyleConfig({
  baseStyle: {
    field: {
      bg: '#F9F9FA',
      padding: '12px',
      _placeholder: {
        textStyle: 'pre-body-6',
        color: 'grey.5',
      },
      _focus: {
        borderColor: 'border.basic.1',
      },
    },
    element: {
      pr: '12px',
      color: 'content.2',
      ...textStyles['pre-body-6'],
      _disabled: {
        color: 'content.6',
      },
    },
  },
  defaultProps: {
    variant: 'outline',
  },
  variants,
})

export default Input
