import {useWeb3React} from '@web3-react/core'
import BigNumber from 'bignumber.js'
import {Text} from 'components/Pancake-uikit'
import useAllEarnings from 'hooks/useAllEarnings'
import React from 'react'
// import { usePriceKSharkBusd , usePriceBabyKSharkBusd} from 'state/hooks'
import styled from 'styled-components'
// import CardBusdValue from './CardBusdValue'
import CardValue from './CardValue'

const Block = styled.div`
  margin-bottom: 24px;
  color: #ffab00;
  font-size: 16px;
`

const CakeHarvestBalance = () => {
  const {account} = useWeb3React()
  const allEarnings = useAllEarnings()
  //   const earningsSum = allEarnings.reduce((accum, earning) => {
  //     // hardcode 16$
  //     // return accum + new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber()
  //     return accum + new BigNumber(earning).div(new BigNumber(10).pow(9)).toNumber()
  //   }, 0)
  //   const earningsBusd = new BigNumber(earningsSum).multipliedBy(usePriceBabyKSharkBusd()).toNumber()
  // const earningsBusd = 0
  //
  if (!account) {
    return (
      <Text color="textDisabled" style={{lineHeight: '76px'}}>
        Locked
      </Text>
    )
  }

  return (
    <Block>
      <CardValue value={0} decimals={2} lineHeight="57px" color="#FFAB00" />
      {/* <CardBusdValue value={earningsBusd} decimals={9} color="#FFAB00" /> */}
    </Block>
  )
}

export default CakeHarvestBalance
