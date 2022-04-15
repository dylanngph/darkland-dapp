import BigNumber from 'bignumber.js'
import poolNftAbi from 'config/abi/poolNft.json'
import { IBoxConfig, IBoxData } from 'config/constants/types'
import chunk from 'lodash/chunk'
import { getAddress, getMasterChefAddress } from 'utils/addressHelpers'
import { BIG_TEN } from 'utils/bigNumber'
import { multicallv2 } from 'utils/multicall'

const fetchFarmCalls = (pool: IBoxConfig, account: string) => {
  const { contractAddress } = pool
  const poolContract = getAddress(contractAddress)
  return [
    // Balance of token in the LP contract
    {
      address: poolContract,
      name: 'duration',
    },
    // Balance of quote token on LP contract
    {
      address: poolContract,
      name: 'poolLimitUser',
    },
    // Balance of LP tokens in the master chef contract
    {
      address: poolContract,
      name: 'requireAmountStaking',
    },
    // Total supply of LP tokens
    {
      address: poolContract,
      name: 'tokenStake',
    },
    // Token decimals
    {
      address: poolContract,
      name: 'totalUserStaking',
    },
    // Quote token decimals
    {
      address: poolContract,
      name: 'users',
			params: [account]
    },
  ]
}

export const fetchPoolNFTUserData = async (farms: IBoxConfig[], account): Promise<any[]> => {
  const farmCalls = farms.flatMap((farm) => fetchFarmCalls(farm, account))
  const chunkSize = farmCalls.length / farms.length
  const farmMultiCallResult = await multicallv2(poolNftAbi, farmCalls)
  return chunk(farmMultiCallResult, chunkSize)
}

export const fetchFarms = async (pools: IBoxConfig[], account: string): Promise<IBoxData[]> => {
	const poolsResult = await fetchPoolNFTUserData(pools, account)

	return pools.map((pool, index) => {
		const [duration, poolLimitUser, requireAmountStaking, [tokenStake], totalUserStaking, users] = poolsResult[index]
		
		return {
			...pool,
			duration: new BigNumber(duration).toNumber(),
			poolLimitUser: new BigNumber(poolLimitUser).toNumber(),
			requireAmountStaking: new BigNumber(requireAmountStaking).div(BIG_TEN.pow(18)).toNumber(),
			tokenStake,
			totalUserStaking: new BigNumber(totalUserStaking).toNumber(),
			users: {
				amount: new BigNumber(users.amount._hex).toNumber(),
				lastUpdateTime: new BigNumber(users.lastUpdateTime._hex).toNumber(),
				isStake: users.isStake,
				isClaimNFT: users.isClaimNFT
			}
		}
	})
}