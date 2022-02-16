import {createReducer} from '@reduxjs/toolkit'
import {INITIAL_ALLOWED_SLIPPAGE, DEFAULT_DEADLINE_FROM_NOW} from '../../config/constants'
import {updateVersion} from '../global/actions'
import {
  setHeroesMarketList,
  setBoxData,
  setCommonBoxHeroesList,
  setRareBoxHeroesList,
  setSuperRareBoxHeroesList,
  setSuperSuperRareBoxHeroesList,
  setCurrentBlindBoxPercentageList,
} from './actions'

const currentTimestamp = () => new Date().getTime()

export interface BlindBoxState {
  heroesMarketList: any
  boxData: any
  commonBoxHeroesList: any
  rareBoxHeroesList: any
  superRareBoxHeroesList: any
  superSuperRareBoxHeroesList: any
  currentBlindBoxPercentageList: any
}

function pairKey(token0Address: string, token1Address: string) {
  return `${token0Address};${token1Address}`
}

export const initialState: BlindBoxState = {
  heroesMarketList: {},
  boxData: {},
  commonBoxHeroesList: {},
  rareBoxHeroesList: {},
  superRareBoxHeroesList: {},
  superSuperRareBoxHeroesList: {},
  currentBlindBoxPercentageList: {},
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(setHeroesMarketList, (state, action) => {
      state.heroesMarketList = action.payload
    })
    .addCase(setBoxData, (state, action) => {
      state.boxData = action.payload
    })
    .addCase(setCommonBoxHeroesList, (state, action) => {
      state.commonBoxHeroesList = action.payload
    })
    .addCase(setRareBoxHeroesList, (state, action) => {
      state.rareBoxHeroesList = action.payload
    })
    .addCase(setSuperRareBoxHeroesList, (state, action) => {
      state.superRareBoxHeroesList = action.payload
    })
    .addCase(setSuperSuperRareBoxHeroesList, (state, action) => {
      state.superSuperRareBoxHeroesList = action.payload
    })
    .addCase(setCurrentBlindBoxPercentageList, (state, action) => {
      state.currentBlindBoxPercentageList = action.payload
    }),
)
