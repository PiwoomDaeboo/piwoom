import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'

import { textStyles } from '@/generated/tokens/text-styles'

const baseStyle = defineStyle({
  px: '12px',
  py: '5px',
  borderRadius: '6px',
  color: 'grey.0',
  ...textStyles['pre-caption-1'],
})

const variants = {
  solid: {
    bg: 'primary.4',
  },
  outline: { bg: 'grey.0' },
  solid_grey: { bg: 'grey.6' },
  solid_green: { bg: 'accent.green2' },
  solid_yellow: { bg: 'accent.yellow2' },
  solid_blue: { bg: 'accent.blue2' },
  solid_red: { bg: 'accent.red2' },
  solid_violet: { bg: 'accent.violet2' },
  solid_pink: { bg: 'accent.pink2' },
  subtle_primary: { bg: 'primary.1', color: 'primary.4' },
}

const Badge = defineStyleConfig({
  baseStyle,
  variants,
  defaultProps: {
    variant: 'subtle_primary',
  },
})

export default Badge
