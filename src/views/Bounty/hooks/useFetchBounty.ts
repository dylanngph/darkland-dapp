import {useEffect, useState, useCallback} from 'react'
import useRefresh from 'hooks/useRefresh'
import {multicallv2} from 'utils/multicall'
import {useWeb3React} from '@web3-react/core'
import {bountiesConfig} from 'config/constants'
import {BountyConfig} from 'config/constants/types'
import bountyABI from 'config/abi/farmNftBounty.json'
import {getAddress} from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'

export const useGetPublicBounty = () => {
  const {account} = useWeb3React()
  const {slowRefresh} = useRefresh()
  const [state, setState] = useState<BountyConfig[] | undefined>(bountiesConfig)
  const [isLoading, setIsLoading] = useState(false)

  const fetchBountyData = useCallback(async () => {
    setIsLoading(true)
    try {
      const nftCalls = bountiesConfig.map((d) => ({
        address: getAddress(d.contractAddress),
        name: 'totalSupply',
        params: [],
      }))
      const totalSupply = await multicallv2(bountyABI, nftCalls)

      const result = bountiesConfig.map((d, i, a) => {
        return {
          ...d,
          totalClaimed: Number(new BigNumber(totalSupply[i]).toJSON()),
        }
      })
      setState(result)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBountyData()
  }, [account, slowRefresh, fetchBountyData])
  return {state, isLoading}
}

export const useGetBountyUser = (slug: string) => {
  const bountiesData = bountiesConfig.find((bounty) => bounty.slug === slug)
  const {account} = useWeb3React()
  const {fastRefresh} = useRefresh()
  const [state, setState] = useState<BountyConfig | undefined>(bountiesData)
  const [isLoading, setIsLoading] = useState(false)
  const fetchBountyUserData = useCallback(async () => {
    setIsLoading(true)
    try {
      const calls = [
        {
          address: getAddress(bountiesData.contractAddress),
          name: 'totalSupply',
          params: [],
        },
        {
          address: getAddress(bountiesData.contractAddress),
          name: 'whitelistClaim',
          params: [account],
        },
      ]
      const [[totalSupply], [isWhitelist]] = await multicallv2(bountyABI, calls)

      const result = {...bountiesData, totalClaimed: Number(new BigNumber(totalSupply._hex).toJSON()), isWhitelist}
      setState(result)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }, [account, bountiesData])

  useEffect(() => {
    if (account) fetchBountyUserData()
  }, [account, fastRefresh, fetchBountyUserData])
  return {state, isLoading}
}
