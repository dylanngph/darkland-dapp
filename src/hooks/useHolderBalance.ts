import {useEffect, useState} from 'react'
import BigNumber from 'bignumber.js'
import {useWeb3React} from '@web3-react/core'
import {getBep20Contract, getKsharkContract} from 'utils/contractHelpers'
import {BIG_ZERO} from 'utils/bigNumber'
import {simpleRpcProvider} from 'utils/providers'
import useRefresh from './useRefresh'

export const useHolderBalance = (tokenAddress: string, holder: string) => {
  const [balance, setBalance] = useState(BIG_ZERO)
  const {slowRefresh} = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getBep20Contract(tokenAddress)
      const res = await contract.balanceOf(holder)
      setBalance(new BigNumber(res.toString()))
    }

    fetchBalance()
  }, [tokenAddress, holder, slowRefresh])

  return balance
}
