import {useEffect, useState} from 'react'
import BigNumber from 'bignumber.js'
import {useWeb3React} from '@web3-react/core'
import multicall from 'utils/multicall'
import erc20Abi from 'config/abi/erc20.json'
import useRefresh from 'hooks/useRefresh'
import {DEFAULT_TOKEN_DECIMAL} from 'config'
import {getAddress} from 'utils/addressHelpers'
import tokens from 'config/constants/tokens'

interface PropToken {
  busd: number
  adt: number
}

const useGetYourBalance = (): PropToken => {
  const [token, setToken] = useState<PropToken>({adt: 0, busd: 0})
  const {account} = useWeb3React()
  const {fastRefresh} = useRefresh()

  useEffect(() => {
    const fetchBalances = async () => {
      const calls = [
        {
          address: getAddress(tokens.busd.address),
          name: 'balanceOf',
          params: [account],
        },
        {
          address: getAddress(tokens.adt.address),
          name: 'balanceOf',
          params: [account],
        },
      ]

      const [busd, adt] = await multicall(erc20Abi, calls)
      setToken({
        busd: Number(new BigNumber(busd).div(DEFAULT_TOKEN_DECIMAL)),
        adt: Number(new BigNumber(adt).div(DEFAULT_TOKEN_DECIMAL)),
      })
    }

    if (account) {
      fetchBalances()
    }
  }, [account, fastRefresh])

  return token
}

export default useGetYourBalance
