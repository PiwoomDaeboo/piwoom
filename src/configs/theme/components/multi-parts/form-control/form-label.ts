import { defineStyleConfig } from '@chakra-ui/styled-system'

import { textStyles } from '@/generated/tokens/text-styles'

export const formLabel = defineStyleConfig({
  baseStyle: {
    ...textStyles['pre-body-5'],
    color: 'content.3',
  },
  variants: {
    lined: {
      mb: '8px',
    },
    underlined: {
      m: 0,
    },
  },
  defaultProps: {
    variant: 'lined',
  },
})
