import {useEffect, useState, useMemo} from 'react'
import BigNumber from 'bignumber.js'
import {useWeb3React} from '@web3-react/core'
import multicall from 'utils/multicall'
import erc20Abi from 'config/abi/erc20.json'
import useRefresh from 'hooks/useRefresh'
import {DEFAULT_TOKEN_DECIMAL} from 'config'
import {getAddress} from 'utils/addressHelpers'
import tokens from 'config/constants/tokens'
import {useBurnedBalance} from 'hooks/useTokenBalance'
import {TEAM_HOLDER_ADDRESS, TOTAL_SUPPLY} from 'config/constants/teamHolders'
import {useHolderBalance} from 'hooks/useHolderBalance'
import {getFullDisplayBalance} from 'utils/formatBalance'

interface PropStats {
  totalSupply: number
  balanceCirculation: number
  maxTotalSupply: number
  totalBurnBalance: number
  totalLocked: number
  tokenAddress: string
}

const useStats = (): PropStats => {
  const htdTokenAddress = getAddress(tokens.htd.address)
  const burnedBalance = useBurnedBalance(htdTokenAddress)

  const teamHolderBalances: any = {}
  teamHolderBalances.marketing = useHolderBalance(htdTokenAddress, TEAM_HOLDER_ADDRESS.marketing)
  teamHolderBalances.liquidity = useHolderBalance(htdTokenAddress, TEAM_HOLDER_ADDRESS.liquidity)
  teamHolderBalances.team = useHolderBalance(htdTokenAddress, TEAM_HOLDER_ADDRESS.team)
  teamHolderBalances.reverse = useHolderBalance(htdTokenAddress, TEAM_HOLDER_ADDRESS.reverse)
  teamHolderBalances.playToEarn = useHolderBalance(htdTokenAddress, TEAM_HOLDER_ADDRESS.playToEarn)
  teamHolderBalances.staking = useHolderBalance(htdTokenAddress, TEAM_HOLDER_ADDRESS.staking)
  teamHolderBalances.privateSale = useHolderBalance(htdTokenAddress, TEAM_HOLDER_ADDRESS.privateSale)

  let totalLockedBalance = new BigNumber(0)
  Object.keys(teamHolderBalances).forEach((key) => {
    totalLockedBalance = totalLockedBalance.plus(teamHolderBalances[key])
  })

  const totalBurnBalance = useMemo(() => {
    return burnedBalance.isGreaterThan(0) ? +getFullDisplayBalance(burnedBalance, 18, 0) : 0
  }, [burnedBalance])

  const totalSupply = TOTAL_SUPPLY - totalBurnBalance
  const balanceCirculation =
    TOTAL_SUPPLY - +getFullDisplayBalance(totalLockedBalance, 18, 0) - +getFullDisplayBalance(burnedBalance, 18, 0)
  const totalLocked = +getFullDisplayBalance(totalLockedBalance, 18, 0) + +getFullDisplayBalance(burnedBalance, 18, 0)

  return {
    totalSupply,
    balanceCirculation,
    maxTotalSupply: TOTAL_SUPPLY,
    totalBurnBalance,
    totalLocked,
    tokenAddress: htdTokenAddress,
  }
}

export default useStats
