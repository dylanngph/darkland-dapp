import React from 'react'
import {
  TokenPairImage as UIKitTokenPairImage,
  TokenPairImageProps as UIKitTokenPairImageProps,
  TokenImage as UIKitTokenImage,
  ImageProps,
} from '@pancakeswap/uikit'
import tokens from 'config/constants/tokens'
import {Token} from 'config/constants/types'
import {getAddress} from 'utils/addressHelpers'
import styled from 'styled-components'

interface TokenPairImageProps extends Omit<UIKitTokenPairImageProps, 'primarySrc' | 'secondarySrc'> {
  primaryToken: Token
  secondaryToken: Token
}

const getImageUrlFromToken = (token: Token) => {
  const address = getAddress(token.symbol === 'BNB' ? tokens.wbnb.address : token.address)
  return `/images/coins/${address}.png`
}

export const TokenPairImage: React.FC<TokenPairImageProps> = ({primaryToken, secondaryToken, ...props}) => {
  return (
    <StyledUIKitTokenPairImage
      primarySrc={getImageUrlFromToken(primaryToken)}
      secondarySrc={getImageUrlFromToken(secondaryToken)}
      {...props}
    />
  )
}


// fix with new design....
const StyledUIKitTokenPairImage = styled(UIKitTokenPairImage)`
  & > div:last-child {
    z-index: 10;
  }
`

interface TokenImageProps extends ImageProps {
  token: Token
}

export const TokenImage: React.FC<TokenImageProps> = ({token, ...props}) => {
  return <UIKitTokenImage src={getImageUrlFromToken(token)} {...props} />
}
