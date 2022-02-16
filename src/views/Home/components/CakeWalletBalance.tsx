import {useWeb3React} from '@web3-react/core'
import {Text} from 'components/Pancake-uikit'
import React from 'react'
import useTokenBalance from 'hooks/useTokenBalance'
import {getKSharkAddress} from 'utils/addressHelpers'
import {getBalanceNumber} from 'utils/formatBalance'
// import { usePriceKSharkBusd } from 'state/hooks'
// import { BigNumber } from 'bignumber.js'
// import CardBusdValue from './CardBusdValue'
import CardValue from './CardValue'

const CakeWalletBalance = () => {
  const cakeBalance = useTokenBalance(getKSharkAddress())
  const balance = getBalanceNumber(cakeBalance.balance, 18)
  // const busdBalance = new BigNumber(cakeBalance.balance).multipliedBy(usePriceKSharkBusd()).toNumber()
  // const busdBalance = 0

  const {account} = useWeb3React()

  if (!account) {
    return (
      <Text color="textDisabled" style={{lineHeight: '54px'}}>
        Locked
      </Text>
    )
  }

  return (
    <>
      <CardValue value={balance} decimals={2} lineHeight="57px" />
    </>
  )
}

export default CakeWalletBalance
