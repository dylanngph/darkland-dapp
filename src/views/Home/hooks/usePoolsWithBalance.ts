import {useEffect, useState} from 'react'
import BigNumber from 'bignumber.js'
import {useWeb3React} from '@web3-react/core'
import multicall from 'utils/multicall'
import {getAddress} from 'utils/addressHelpers'
import sousChefABI from 'config/abi/sousChef.json'
import {poolsConfig} from 'config/constants'
import {PoolConfig} from 'config/constants/types'
import useRefresh from 'hooks/useRefresh'
import {DEFAULT_TOKEN_DECIMAL} from 'config'

export interface PoolWithBalance extends PoolConfig {
  balance: BigNumber
}

const usePoolsWithBalance = () => {
  const [poolsWithStakedBalance, setPoolsWithStakedBalance] = useState<PoolWithBalance[]>([])
  const [earningsSum, setEarningsSum] = useState<number>(0)
  const [staked, setStaked] = useState<number>(0)
  const {account} = useWeb3React()
  const {fastRefresh} = useRefresh()

  useEffect(() => {
    const fetchBalances = async () => {
      const calls = poolsConfig.map((farm) => ({
        address: getAddress(farm.contractAddress),
        name: 'pendingReward',
        params: [account],
      }))
      const rawResults = await multicall(sousChefABI, calls)
      const results = poolsConfig.map((farm, index) => ({ ...farm, balance: new BigNumber(rawResults[index]) }))
      const poolsWithBalances = results.filter((balanceType) => balanceType.balance.gt(0))
      const totalEarned = poolsWithBalances.reduce((accum, earning) => {
        const earningNumber = new BigNumber(earning.balance)
        if (earningNumber.eq(0)) {
          return accum
        }
        return accum + earningNumber.div(DEFAULT_TOKEN_DECIMAL).toNumber()
      }, 0)
      setPoolsWithStakedBalance(poolsWithBalances)
      setEarningsSum(totalEarned)
    }

    const fetchStaked = async () => {
      const calls = poolsConfig.map((farm) => ({
        address: getAddress(farm.contractAddress),
        name: 'userInfo',
        params: [account],
      }))
      const rawResults = await multicall(sousChefABI, calls)
      const results = poolsConfig.map((farm, index) => ({ staked: new BigNumber(rawResults[index].amount._hex) }))
      const poolsWithBalances = results.filter((balanceType) => balanceType.staked.gt(0))
      const totalEarned = poolsWithBalances.reduce((accum, earning) => {
        const earningNumber = new BigNumber(earning.staked)
        if (earningNumber.eq(0)) {
          return accum
        }
        return earningNumber.div(DEFAULT_TOKEN_DECIMAL).plus(accum).toNumber()
      }, 0)
      setStaked(totalEarned)
    }

    if (account) {
      fetchBalances()
      fetchStaked()
    }
  }, [account, fastRefresh])
  return {poolsWithStakedBalance, earningsPool: earningsSum, staked }
}

export default usePoolsWithBalance
