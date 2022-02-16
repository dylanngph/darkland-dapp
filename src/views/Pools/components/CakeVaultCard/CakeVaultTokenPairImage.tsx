import React from 'react'
import {ImageProps} from '@pancakeswap/uikit'
import {TokenPairImage} from 'components/Pancake-uikit'
import tokens from 'config/constants/tokens'
import {getAddress} from 'utils/addressHelpers'

const CakeVaultTokenPairImage: React.FC<Omit<ImageProps, 'src'>> = (props) => {
  const primaryTokenSrc = `/images/coins/${getAddress(tokens.cake.address)}.png`

  return <TokenPairImage primarySrc={primaryTokenSrc} secondarySrc="/images/tokens/autorenew.svg" {...props} />
}

export default CakeVaultTokenPairImage
