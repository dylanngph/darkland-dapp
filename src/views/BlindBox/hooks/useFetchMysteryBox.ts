import {useCallback, useEffect, useState} from 'react'
import {claimBox} from 'views/BlindBox/Config/config'
import {multicallv2} from 'utils/multicall'
import BigNumber from 'bignumber.js'
import {getAddress} from 'utils/addressHelpers'
import {useWeb3React} from '@web3-react/core'
import useRefresh from 'hooks/useRefresh'

export const useFetchMysteryBox = () => {
  const {account} = useWeb3React()
  const {fastRefresh} = useRefresh()
  const [data, setData] = useState<any>({
    userWhitelist: false,
    userAmountTicket: 0,
  })
  const fetchData = useCallback(async () => {
    try {
      const calls = [
        {
          address: getAddress(claimBox.contractAddress),
          name: 'userWhitelist',
          params: [account],
        },
        {
          address: getAddress(claimBox.contractAddress),
          name: 'userAmountTicket',
          params: [account],
        },
      ]

      const [[userWhiteList], userAmountTicket] = await multicallv2(claimBox.abi, calls)

      const result = {
        userWhiteList,
        userAmountTicket: Number(new BigNumber(userAmountTicket).toJSON()),
      }

      setData(result)
    } catch (e) {
      console.log(e)
    }
  }, [account])

  useEffect(() => {
    if (account) fetchData()
  }, [account, fetchData, fastRefresh])

  return data
}
