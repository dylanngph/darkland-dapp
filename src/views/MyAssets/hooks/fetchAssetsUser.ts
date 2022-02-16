import {useCallback, useEffect, useState} from 'react'
import {bountiesConfig} from 'config/constants'
import {multicallv2} from 'utils/multicall'
import bountyABI from 'config/abi/farmNftBounty.json'
import BigNumber from 'bignumber.js'
import {getAddress} from 'utils/addressHelpers'
import {useWeb3React} from '@web3-react/core'

export const useAssetsUser = () => {
  const {account} = useWeb3React()
  const [data, setData] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

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

      const totalNfts = await multicallv2(bountyABI, calls)
      const result = bountiesConfig
        .map((d, i) => {
          return {...d, totalNft: Number(new BigNumber(totalNfts[i]).toJSON())}
        })
        .filter((d) => d.totalNft > 0)
      setData(result)
    } finally {
      setIsLoaded(false)
    }
  }, [account])

  useEffect(() => {
    if (account) fetchAssetUser()
  }, [account, fetchAssetUser])

  return {data, isLoaded}
}
