import {useState, useEffect, useMemo} from 'react'
import axios from 'axios'
import BigNumber from 'bignumber.js'
import {BIG_ZERO} from 'utils/bigNumber'
import getTokenPrice from 'utils/getPriceToken'
import useRefresh from './useRefresh'

export const useGetTokenPrice = (tokenAddress: string) => {
  const [tokenPrice, setTokenPrice] = useState(0)
  const {slowRefresh} = useRefresh()

  useEffect(() => {
    const source = axios.CancelToken.source()
    const fetchBalance = async () => {
      try {
        const tokenPriceObject = await getTokenPrice(tokenAddress)
        setTokenPrice(tokenPriceObject?.data?.price)
      } catch (e) {
        if (axios.isCancel(e)) {
          console.log(e)
        } else {
          console.log(e)
        }
      }
    }

    fetchBalance()
    return () => {
      source.cancel()
    }
  }, [tokenAddress, setTokenPrice, slowRefresh])
  return tokenPrice
}
