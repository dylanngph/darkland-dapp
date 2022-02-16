import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { save, load } from 'redux-localstorage-simple'
import { useDispatch } from 'react-redux'
import marketPlaceReducer from 'views/MarketPlace/marketplaceSlice'
import farmsReducer from './farms'
import poolsReducer from './pools'
import poolsNftReducer from './poolsNft'
import farmsNftReducer from './farmsNft'
import predictionsReducer from './predictions'
import profileReducer from './profile'
import teamsReducer from './teams'
import achievementsReducer from './achievements'
import blockReducer from './block'
import collectiblesReducer from './collectibles'
import votingReducer from './voting'
import lotteryReducer from './lottery'
import referralsReducer from './referrals'
import {updateVersion} from './global/actions'
import user from './user/reducer'
import transactions from './transactions/reducer'
import swap from './swap/reducer'
import mint from './mint/reducer'
import lists from './lists/reducer'
import burn from './burn/reducer'
import multicall from './multicall/reducer'
import common from './common/commonSlice'
import blindbox from './blindbox/reducer'
import box from './box/reducer'
import hero from './hero/reducer'
import nftBounty from './nftBounty/reducer'

const PERSISTED_KEYS: string[] = ['user', 'transactions', 'lists']

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    achievements: achievementsReducer,
    block: blockReducer,
    farms: farmsReducer,
    pools: poolsReducer,
    poolsNft: poolsNftReducer,
    farmsNft: farmsNftReducer,
    predictions: predictionsReducer,
    profile: profileReducer,
    teams: teamsReducer,
    collectibles: collectiblesReducer,
    voting: votingReducer,
    lottery: lotteryReducer,
    referrals: referralsReducer,
    nftBounty, 
    // Exchange
    user,
    transactions,
    swap,
    mint,
    burn,
    multicall,
    lists,
    blindbox,
    marketplace: marketPlaceReducer,
    common,
    box,
    hero
  },
  middleware: [...getDefaultMiddleware({thunk: true}), save({states: PERSISTED_KEYS})],
  preloadedState: load({states: PERSISTED_KEYS}),
})

store.dispatch(updateVersion())

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch()

export default store
