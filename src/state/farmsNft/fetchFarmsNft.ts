import BigNumber from 'bignumber.js'
import poolsNftConfig from 'config/constants/poolsNFT'
import sousChefABI from 'config/abi/sousChef.json'
import cakeABI from 'config/abi/cake.json'
import wbnbABI from 'config/abi/weth.json'
import multicall from 'utils/multicall'
import {getAddress, getWbnbAddress} from 'utils/addressHelpers'
import {BIG_ZERO} from 'utils/bigNumber'
import {getSouschefV2Contract} from 'utils/contractHelpers'

export const fetchFarmsNftTotalStaking = async () => {
  const nonBnbFarms = poolsNftConfig.filter((p) => p.stakingToken.symbol !== 'BNB')
  const bnbFarm = poolsNftConfig.filter((p) => p.stakingToken.symbol === 'BNB')

  const callsNonBnbFarms = nonBnbFarms.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.stakingToken.address),
      name: 'balanceOf',
      params: [getAddress(poolConfig.contractAddress)],
    }
  })

  const callsBnbFarms = bnbFarm.map((poolConfig) => {
    return {
      address: getWbnbAddress(),
      name: 'balanceOf',
      params: [getAddress(poolConfig.contractAddress)],
    }
  })

  const nonBnbFarmsTotalStaked = await multicall(cakeABI, callsNonBnbFarms)
  const bnbFarmsTotalStaked = await multicall(wbnbABI, callsBnbFarms)

  return [
    ...nonBnbFarms.map((p, index) => ({
      nftId: p.nftId,
      totalStaked: new BigNumber(nonBnbFarmsTotalStaked[index]).toJSON(),
    })),
    ...bnbFarm.map((p, index) => ({
      nftId: p.nftId,
      totalStaked: new BigNumber(bnbFarmsTotalStaked[index]).toJSON(),
    })),
  ]
}

export const fetchFarmNftStakingLimit = async (nftId: number): Promise<BigNumber> => {
  try {
    const sousContract = getSouschefV2Contract(nftId)
    const stakingLimit = await sousContract.poolLimitPerUser()
    return new BigNumber(stakingLimit.toString())
  } catch (error) {
    return BIG_ZERO
  }
}

export const fetchFarmsNftStakingLimits = async (
  poolsWithStakingLimit: number[],
): Promise<{[key: string]: BigNumber}> => {
  const validFarms = poolsNftConfig
    .filter((p) => p.stakingToken.symbol !== 'BNB' && !p.isFinished)
    .filter((p) => !poolsWithStakingLimit.includes(p.nftId))

  // Get the staking limit for each valid pool
  // Note: We cannot batch the calls via multicall because V1 pools do not have "poolLimitPerUser" and will throw an error
  const stakingLimitPromises = validFarms.map((validFarm) => fetchFarmNftStakingLimit(validFarm.nftId))
  const stakingLimits = await Promise.all(stakingLimitPromises)

  return stakingLimits.reduce((accum, stakingLimit, index) => {
    return {
      ...accum,
      [validFarms[index].nftId]: stakingLimit,
    }
  }, {})
}
