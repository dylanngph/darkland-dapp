import {createAction} from '@reduxjs/toolkit'

export const setHeroesMarketList = createAction<{heroesMarketList: any}>('blindbox/setHeroesMarketList')
export const setBoxData = createAction<{boxData: any}>('blindbox/setBoxData')
export const setCommonBoxHeroesList = createAction<{commonBoxHeroesList: any}>('blindbox/setCommonBoxHeroesList')
export const setRareBoxHeroesList = createAction<{rareBoxHeroesList: any}>('blindbox/setRareBoxHeroesList')
export const setSuperRareBoxHeroesList = createAction<{superRareBoxHeroesList: any}>(
  'blindbox/setSuperRareBoxHeroesList',
)
export const setSuperSuperRareBoxHeroesList = createAction<{superSuperRareBoxHeroesList: any}>(
  'blindbox/setSuperSuperRareBoxHeroesList',
)
export const setCurrentBlindBoxPercentageList = createAction<{currentBlindBoxPercentageList: any}>(
  'blindbox/setCurrentBlindBoxPercentageList',
)
