import { ChakraProps } from '@chakra-ui/react'

import { textStyles } from '@/generated/tokens/text-styles'

interface ButtonAnatomyProps {
  color: ChakraProps['color']
  bgColor: ChakraProps['color']
  borderColor?: ChakraProps['color']
  otherStyle?: ChakraProps
}

type DefineVariantProps = {
  basic: ButtonAnatomyProps
  hover: Partial<ButtonAnatomyProps>
  active: Partial<ButtonAnatomyProps>
  disabled: Partial<ButtonAnatomyProps>
}

const defineVariant = ({
  basic,
  active,
  disabled,
  hover,
}: DefineVariantProps) => {
  return {
    ...basic,
    ...basic.otherStyle,
    borderWidth: basic?.borderColor ? '1px' : '0px',
    borderRadius: '10px',
    padding: '7px 20px',
    textStyle: 'pre-body-5',
    _hover: {
      ...hover,
      _disabled: {
        ...disabled,
        ...disabled.otherStyle,
      },
    },
    _active: {
      ...active,
      ...active.otherStyle,
    },
    _disabled: {
      ...disabled,
      ...disabled.otherStyle,
    },
  }
}

const solidPrimary = defineVariant({
  basic: {
    bgColor: 'primary.4',
    color: 'grey.0',
    borderColor: 'primary.4',
  },
  hover: { bgColor: 'primary.4' },
  active: { bgColor: 'primary.5' },
  disabled: {
    color: 'content.5',
    bgColor: 'background.basic.4',
    borderColor: 'transparent',
  },
})

const solidSecondary = defineVariant({
  basic: {
    bgColor: 'grey.0',
    color: 'primary.4',
  },
  hover: { bgColor: 'primary.1' },
  active: { bgColor: 'grey.0' },
  disabled: { color: 'content.5', bgColor: 'background.basic.4' },
})

const outlinePrimary = defineVariant({
  basic: {
    color: 'primary.4',
    bgColor: 'grey.0',
    borderColor: 'primary.4',
  },
  hover: { bgColor: 'primary.1' },
  active: { bgColor: 'primary.2' },
  disabled: {
    color: 'primary.2',
    borderColor: 'primary.2',
    bgColor: 'background.basic.1',
  },
})

const outlineSecondary = defineVariant({
  basic: {
    color: 'grey.8',
    bgColor: 'grey.0',
    borderColor: 'grey.3',
  },

  hover: { bgColor: 'primary.1' },
  active: { bgColor: 'primary.2' },
  disabled: {
    color: 'content.6',
    borderColor: 'border.basic.2',
    bgColor: 'background.basic.1',
  },
})

const blackPrimary = defineVariant({
  basic: {
    color: 'grey.0',
    bgColor: 'grey.10',
    borderColor: 'border.basic.2',
  },
  hover: { bgColor: 'grey.8' },
  active: { bgColor: 'grey.10' },
  disabled: {
    color: 'content.6',
    borderColor: 'border.basic.2',
    bgColor: 'background.basic.1',
  },
})

const textPrimary = defineVariant({
  basic: {
    color: 'grey.8',
    bgColor: 'grey.2',
  },
  hover: { color: 'grey.8', bgColor: 'grey.2' },
  active: { color: 'primary.5', bgColor: 'transparent' },
  disabled: { color: 'content.6' },
})

const textSecondary = defineVariant({
  basic: {
    color: 'grey.7',
    bgColor: 'transparent',
    otherStyle: {
      px: '12px',
    },
  },
  hover: { color: 'content.4', bgColor: 'transparent' },
  active: { color: 'grey.10', bgColor: 'rgba(27, 28, 29, 0.05)' },
  disabled: { color: 'grey.5' },
})

const outlineSecondarySelected = defineVariant({
  basic: {
    color: 'grey.8',
    bgColor: 'primary.2', // 선택된 상태의 배경색
    borderColor: 'grey.3',
  },
  hover: { bgColor: 'primary.1' },
  active: { bgColor: 'primary.2' },
  disabled: {
    color: 'content.6',
    borderColor: 'border.basic.2',
    bgColor: 'background.basic.1',
  },
})

export const variants = {
  'solid-primary': solidPrimary,
  'solid-secondary': solidSecondary,
  'outline-primary': outlinePrimary,
  'outline-secondary': outlineSecondary,
  'outline-secondary-selected': outlineSecondarySelected,
  'black-primary': blackPrimary,
  'text-primary': textPrimary,
  'text-secondary': textSecondary,
}
