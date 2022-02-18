import styled from 'styled-components'
import {variant as StyledSystemVariant} from 'styled-system'
import {ImageProps, Variant, variants} from './types'
import TokenImage from './TokenImage'

interface StyledImageProps extends ImageProps {
  variant: Variant
}

export const StyledPrimaryImage = styled(TokenImage)<StyledImageProps>`
  position: absolute;
  border-radius: 50%;
  over-flow: hidden;
  width: ${({variant}) =>
    variant === variants.DEFAULT ? '92%' : '82%'}; // 92, 82 are arbitrary numbers to fit the variant

  ${StyledSystemVariant({
    variants: {
      [variants.DEFAULT]: {
        bottom: 'auto',
        left: 0,
        right: 'auto',
        top: 0,
        zIndex: 1,
      },
      [variants.INVERTED]: {
        bottom: 0,
        left: 'auto',
        right: 0,
        top: 'auto',
        zIndex: 1,
      },
    },
  })}
`

export const StyledSecondaryImage = styled(TokenImage)<StyledImageProps>`
  position: absolute;
  width: 50%;
  border-radius: 50%;
  over-flow: hidden;
  ${StyledSystemVariant({
    variants: {
      [variants.DEFAULT]: {
        bottom: 0,
        left: 'auto',
        right: 0,
        top: 'auto',
        zIndex: 2,
      },
      [variants.INVERTED]: {
        bottom: 'auto',
        left: 0,
        right: 'auto',
        top: 0,
        zIndex: 2,
      },
    },
  })}
`
