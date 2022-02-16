import {useCallback, useEffect, useState} from 'react'
import {multicallv2} from 'utils/multicall'
import BigNumber from 'bignumber.js'
import {getAddress} from 'utils/addressHelpers'
import {useWeb3React} from '@web3-react/core'
import bountyAbi from 'config/abi/farmNftBounty.json'
import useRefresh from 'hooks/useRefresh'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'
import { bountiesConfig } from 'config/constants'
import { fetchPublicNftBounty } from './actions'

export const useFetchUserNftBounty = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {account} = useWeb3React()
  const [data, setData] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const { slowRefresh } = useRefresh()

  const fetchAssetUser = useCallback(async () => {
    try {
      setIsLoaded(true)
      const calls = bountiesConfig.map((bounty) => {
        return {
          address: getAddress(bounty.contractAddress),
          name: 'balanceOf',
          params: [account],
        }
      })

      const totalNfts = await multicallv2(bountyAbi, calls)
      const result: any = bountiesConfig
        .map((d, i) => {
          return {...d, totalNft: Number(new BigNumber(totalNfts[i]).toJSON())}
        })
        .filter((d) => d.totalNft > 0)
      setData(result)
      dispatch(fetchPublicNftBounty(result))
    } finally {
      setIsLoaded(false)
    }
  }, [account, dispatch])

  useEffect(() => {
    if (account) fetchAssetUser()
  }, [account, fetchAssetUser, slowRefresh])

  return {data, isLoaded}
}