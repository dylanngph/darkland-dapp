import BigNumber from 'bignumber.js'
import {Farm, FarmNft, PoolNft} from 'state/types'
import {BIG_ZERO} from 'utils/bigNumber'

type UserData =
  | FarmNft['userData']
  | {
      allowance: boolean
      stakingTokenBalance: number | string
      stakedBalance: number | string
      pointBalance: number | string
      nftsList: []
    }

export const transformUserData = (userData: UserData) => {
  return {
    allowance: userData ? userData.allowance : false,
    stakingTokenBalance: userData ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO,
    stakedBalance: userData ? new BigNumber(userData.stakedBalance) : BIG_ZERO,
    pointBalance: userData ? userData.pointBalance : 0,
    nftsList: userData ? userData.nftsList : [],
  }
}

export const transformFarmNft = (farmNft: FarmNft): FarmNft => {
  const {totalStaked, stakingLimit, userData, ...rest} = farmNft
  return {
    ...rest,
    userData: transformUserData(userData),
    totalStaked: new BigNumber(totalStaked),
    stakingLimit: new BigNumber(stakingLimit),
  } as FarmNft
}
