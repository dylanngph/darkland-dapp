import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import farmsNftConfig from 'config/constants/farmsNFT'
import {BIG_ZERO} from 'utils/bigNumber'
import {CakeVault, VaultFees, VaultUser, AppThunk, FarmsNftState, FarmNft} from 'state/types'
import {getAddress} from 'utils/addressHelpers'
import {fetchFarmsNftStakingLimits, fetchFarmsNftTotalStaking} from './fetchFarmsNft'

import {
  fetchFarmsNftAllowance,
  fetchUserBalances,
  fetchUserStakeBalances,
  fetchUserPendingRewards,
  fetchUserNftOfAccount,
} from './fetchFarmsNftUser'
import {fetchPublicVaultData, fetchVaultFees} from './fetchVaultPublic'
import fetchVaultUser from './fetchVaultUser'
// eslint-disable-next-line import/named

const initialState: FarmsNftState = {
  data: [...farmsNftConfig],
  userDataLoaded: false,
  cakeVault: {
    totalShares: null,
    pricePerFullShare: null,
    totalCakeInVault: null,
    estimatedCakeBountyReward: null,
    totalPendingCakeHarvest: null,
    fees: {
      performanceFee: null,
      callFee: null,
      withdrawalFee: null,
      withdrawalFeePeriod: null,
    },
    userData: {
      isLoading: true,
      userShares: null,
      cakeAtLastUserAction: null,
      lastDepositedTime: null,
      lastUserActionTime: null,
    },
  },
}

// Thunks
export const fetchFarmsNftPublicDataAsync = (currentBlock: number) => async (dispatch, getState) => {
  const totalStakings = await fetchFarmsNftTotalStaking()
  // lấy data từ src\config\constants\farms.ts
  // const prices = await getTokenPricesFromFarm(getState().pools.data)
  // eslint-disable-next-line no-restricted-syntax
  // @ts-ignore

  //
  //

  const liveData = poolsNftConfig.map((pool) => {
    const totalStaking = totalStakings.find((entry) => entry.nftId === pool.nftId)

    const stakingTokenAddress = pool.stakingToken.address ? getAddress(pool.stakingToken.address).toLowerCase() : null
    const stakingTokenPrice = stakingTokenAddress ? 0 : 0

    const earningTokenAddress = pool.earningNft.address ? getAddress(pool.earningNft.address).toLowerCase() : null
    const earningTokenPrice = earningTokenAddress ? 0 : 0

    return {
      ...totalStaking,
      stakingTokenPrice,
      earningTokenPrice,
    }
  })

  dispatch(setFarmsNftPublicData(liveData))
}

export const fetchFarmsNftStakingLimitsAsync = () => async (dispatch, getState) => {
  const poolsWithStakingLimit = getState()
    .pools.data.filter(({stakingLimit}) => stakingLimit !== null && stakingLimit !== undefined)
    .map((pool) => pool.nftId)

  const stakingLimits = await fetchFarmsNftStakingLimits(poolsWithStakingLimit)

  const stakingLimitData = farmsNftConfig.map((pool) => {
    if (poolsWithStakingLimit.includes(pool.nftId)) {
      return {nftId: pool.nftId}
    }
    const stakingLimit = stakingLimits[pool.nftId] || BIG_ZERO
    return {
      nftId: pool.nftId,
      stakingLimit: stakingLimit.toJSON(),
    }
  })

  dispatch(setFarmsNftPublicData(stakingLimitData))
}

export const fetchFarmsNftUserDataAsync =
  (account: string): AppThunk =>
  async (dispatch) => {
    const allowances = await fetchFarmsNftAllowance(account)
    const stakingTokenBalances = await fetchUserBalances(account)
    const stakedBalances = await fetchUserStakeBalances(account)
    const pointBalances = await fetchUserPendingRewards(account)
    const nftsList = await fetchUserNftOfAccount(account, stakingTokenBalances)
    const userData = farmsNftConfig.map((pool) => {
      return {
        nftId: pool.nftId,
        allowance: allowances[pool.nftId],
        stakingTokenBalance: stakingTokenBalances[pool.nftId],
        stakedBalance: stakedBalances[pool.nftId],
        pointBalance: pointBalances[pool.nftId],
        nftsList: nftsList[pool.nftId],
      }
    })

    dispatch(setFarmsNftUserData(userData))
  }

export const updateFarmNftUserAllowance =
  (nftId: number, account: string): AppThunk =>
  async (dispatch) => {
    const allowances = await fetchFarmsNftAllowance(account)
    dispatch(updateFarmsUserData({nftId, field: 'allowance', value: allowances[nftId]}))
  }

export const updateFarmNftUserBalance =
  (nftId: number, account: string): AppThunk =>
  async (dispatch) => {
    const tokenBalances = await fetchUserBalances(account)
    dispatch(updateFarmsUserData({nftId, field: 'stakingTokenBalance', value: tokenBalances[nftId]}))
  }

export const updateFarmNftUserStakedBalance =
  (nftId: number, account: string): AppThunk =>
  async (dispatch) => {
    const stakedBalances = await fetchUserStakeBalances(account)
    dispatch(updateFarmsUserData({nftId, field: 'stakedBalance', value: stakedBalances[nftId]}))
  }

export const updateFarmNftUserPendingRewards =
  (nftId: number, account: string): AppThunk =>
  async (dispatch) => {
    const pendingRewards = await fetchUserPendingRewards(account)
    dispatch(updateFarmsUserData({nftId, field: 'pointsBalance', value: pendingRewards[nftId]}))
  }

export const updateNftLists =
  (nftId: number, account: string): AppThunk =>
  async (dispatch) => {
    const stakingTokenBalances = await fetchUserBalances(account)
    const nftLists = await fetchUserNftOfAccount(account, stakingTokenBalances)
    dispatch(updateFarmsUserData({nftId, field: 'nftLists', value: nftLists[nftId]}))
  }

export const fetchCakeVaultPublicData = createAsyncThunk<CakeVault>('cakeVault/fetchPublicData', async () => {
  const publicVaultInfo = await fetchPublicVaultData()
  return publicVaultInfo
})

export const fetchCakeVaultFees = createAsyncThunk<VaultFees>('cakeVault/fetchFees', async () => {
  const vaultFees = await fetchVaultFees()
  return vaultFees
})

export const fetchCakeVaultUserData = createAsyncThunk<VaultUser, {account: string}>(
  'cakeVault/fetchUser',
  async ({account}) => {
    const userData = await fetchVaultUser(account)
    return userData
  },
)

export const FarmsNftSlice = createSlice({
  name: 'FarmsNft',
  initialState,
  reducers: {
    setFarmsNftPublicData: (state, action) => {
      const liveFarmsData: FarmNft[] = action.payload
      state.data = state.data.map((pool) => {
        const liveFarmData = liveFarmsData.find((entry) => entry.nftId === pool.nftId)
        return {...pool, ...liveFarmData}
      })
    },
    setFarmsNftUserData: (state, action) => {
      const userData = action.payload
      state.data = state.data.map((pool) => {
        const userFarmData = userData.find((entry) => entry.nftId === pool.nftId)
        return {...pool, userData: userFarmData}
      })
      state.userDataLoaded = true
    },
    updateFarmsUserData: (state, action) => {
      const {field, value, nftId} = action.payload
      const index = state.data.findIndex((p) => p.nftId === nftId)

      if (index >= 0) {
        state.data[index] = {...state.data[index], userData: {...state.data[index].userData, [field]: value}}
      }
    },
  },
  // extraReducers: (builder) => {
  //     // Vault public data that updates frequently
  //     builder.addCase(fetchCakeVaultPublicData.fulfilled, (state, action: PayloadAction<CakeVault>) => {
  //         state.cakeVault = {...state.cakeVault, ...action.payload}
  //     })
  //     // Vault fees
  //     builder.addCase(fetchCakeVaultFees.fulfilled, (state, action: PayloadAction<VaultFees>) => {
  //         const fees = action.payload
  //         state.cakeVault = {...state.cakeVault, fees}
  //     })
  //     // Vault user data
  //     builder.addCase(fetchCakeVaultUserData.fulfilled, (state, action: PayloadAction<VaultUser>) => {
  //         const userData = action.payload
  //         userData.isLoading = false
  //         state.cakeVault = {...state.cakeVault, userData}
  //     })
  // },
})

// Actions
export const {setFarmsNftPublicData, setFarmsNftUserData, updateFarmsUserData} = FarmsNftSlice.actions

export default FarmsNftSlice.reducer
