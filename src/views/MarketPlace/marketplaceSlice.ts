/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit'
import { useWeb3React } from '@web3-react/core'
import heroestdApi from 'api/heroestdApi'
import { marketplaceConfig } from 'config/constants'
import { getAddress } from 'utils/addressHelpers'
import { mapHeroData } from 'utils/mapHeroData'
import { multicallv2 } from 'utils/multicall'
import BigNumber from 'bignumber.js'
import * as indexDb from '../../utils/services'

export interface marketPlaceState {
  paramFilterHero: any
  filterBoxes: any
  heroList: any
  boxesList: any
  loading: true | false
  pagination: any
  totalBox: number
  minPrices: any
}

const initialState: marketPlaceState = {
  paramFilterHero: {
    name: undefined,
    items: [],
    heroClasses: [],
    heroOrigins: [],
    maxFusisionTime: 7,
    minFusionTime: 0,
    runes: [],
    heroGen: undefined,
    targetFilters: [],
    status: [],
    page: 1,
    limit: 15,
    seller: 0,
    price: 0,
  },
  heroList: [],
  pagination: {
    page: 1,
    limit: 15,
    total: 0,
  },
  filterBoxes: {
    params: {
      boxTypes: [],
      seller: 0,
      price: 0,
      page: 1,
      limit: 10,
    },
    pagination: {
      page: 1,
      limit: 10,
      total: 1,
    },
    totalBox: 0,
  },
  boxesList: [],
  loading: false,
  totalBox: 0,
  minPrices: [0,0,0,0]
}

export const fetchListHero = createAsyncThunk(
  '/marketplace/fetchListHero',
  async (params: any, { getState }) => {
    try {
      const temp = { ...params }
      if (temp.seller === 1) {
        temp.seller = temp.account
      }
      if (temp.price === 0) {
        temp.time = -1
        delete temp.price
      }
      if (temp.price === 1) {
        temp.price = 1
        delete temp.time
      } else if (temp.price === 2) {
        temp.price = -1
        delete temp.time
      }
      // @ts-ignore
      const { common } = getState()
      const { data } = await heroestdApi.getHeroList(temp)
      const heros = mapHeroData(data.docs, common?.heroConfig)

      // const containerEl = document.getElementById('market-hero-id')
      // if (containerEl) {
      //   containerEl.scrollTo({ top: 0, behavior: 'smooth' })
      // }

      return { heros, data }
    } catch (error) {
      console.log(error)
    }
  },
)

export const fetchListHeroForBlindBox = createAsyncThunk(
  '/marketplace/fetchListHeroForBlindBox',
  async (params: any, { getState }) => {
    try {
      const temp = { ...params }
      if (temp.seller === 1) {
        temp.seller = temp.account
      }
      if (temp.price === 0) {
        temp.time = -1
        delete temp.price
      }
      if (temp.price === 1) {
        temp.price = 1
        delete temp.time
      } else if (temp.price === 2) {
        temp.price = -1
        delete temp.time
      }
      // @ts-ignore
      const { common } = getState()
      const { data } = await heroestdApi.getHeroListForBlindBox(temp)
      const heros = mapHeroData(data.docs, common?.heroConfig)
      await indexDb.set('heroesMarketList', heros)

      // const containerEl = document.getElementById('market-hero-id')
      // if (containerEl) {
      //   containerEl.scrollTo({ top: 0, behavior: 'smooth' })
      // }

      return { heros, data }
    } catch (error) {
      console.log(error)
    }
  },
)

export const fetchListBoxes = createAsyncThunk(
  '/marketplace/fetchListBoxes',
  async (params: any) => {
    try {
      const temp = { ...params }
      if (temp.seller === 1) {
        temp.seller = temp.account
      }
      if (temp.price === 0) {
        temp.time = -1
        delete temp.price
      }
      if (temp.price === 1) {
        temp.price = 1
        delete temp.time
      } else if (temp.price === 2) {
        temp.price = -1
        delete temp.time
      }
      const { data } = await heroestdApi.getBoxMarketData(temp)
      const containerEl = document.getElementById('market-box-id')
      if (containerEl) {
        containerEl.scrollTo({ top: 0, behavior: 'smooth' })
      }

      return data
    } catch (error) {
      console.log(error)
    }
  },
)

export const fetchMinPrice = createAsyncThunk(
  '/marketplace/fetchMinPrice',
  async() => {
  const calls = [{
    address: getAddress(marketplaceConfig.contractAddress.hero),
    name: 'genCommonMinPrice',
    params: []
  },
  {
    address: getAddress(marketplaceConfig.contractAddress.hero),
    name: 'genRareMinPrice',
    params: []
  },
  {
    address: getAddress(marketplaceConfig.contractAddress.hero),
    name: 'genEpicMinPrice',
    params: []
  },
  {
    address: getAddress(marketplaceConfig.contractAddress.hero),
    name: 'genLegendMinPrice',
    params: []
  }]
  const [gen0, gen1, gen2, gen3] = await multicallv2(marketplaceConfig.abi.hero, calls)
  const result = [Number(new BigNumber(gen0).toJSON()), Number(new BigNumber(gen1).toJSON()), Number(new BigNumber(gen2).toJSON()), Number(new BigNumber(gen3).toJSON())]
  return result
})

export const marketplaceSlice = createSlice({
  name: 'marketplace',
  initialState,
  reducers: {
    setParamSearchHero: (state, { payload }) => {
      return { ...state, paramFilterHero: payload }
    },
    setParamSearchBox: (state, { payload }) => {
      return {
        ...state,
        filterBoxes: {
          ...state.filterBoxes,
          params: payload,
        },
      }
    },
  },
  extraReducers: (builder) => {
    // fetchListHero
    builder.addCase(fetchListHero.pending, (state) => {
      return { ...state, loading: true }
    })
    builder.addCase(fetchListHero.fulfilled, (state, { payload }) => {
      if (payload) {
        return {
          ...state,
          loading: false,
          heroList: [...payload.heros],
          pagination: {
            page: payload?.data?.page,
            limit: payload?.data?.limit,
            total: payload?.data?.totalDocs,
          },
        }
      }
    })
    builder.addCase(fetchListHero.rejected, (state) => {
      return { ...state, loading: false }
    })
    // End of fetchListHero

    // fetchListBoxes
    builder.addCase(fetchListBoxes.pending, (state) => {
      return { ...state, loading: true }
    })
    builder.addCase(fetchListBoxes.fulfilled, (state, { payload }) => {
      if (payload) {
        return {
          ...state,
          loading: false,
          boxesList: [...payload?.docs],
          totalBox: payload?.totalDocs,
          filterBoxes: {
            ...state.filterBoxes,
            pagination: {
              page: payload?.page,
              limit: payload?.limit,
              total: payload?.totalDocs,
            },
            totalBox: payload?.totalDocs,
          },
        }
      }
    })
    builder.addCase(fetchListBoxes.rejected, (state) => {
      return { ...state, loading: false }
    })
    builder.addCase(fetchMinPrice.fulfilled, (state, action) => {
      state.minPrices = action.payload
    })
    // End of fetchListBoxes
  },
})

// Action creators are generated for each case reducer function
export const { setParamSearchHero, setParamSearchBox } = marketplaceSlice.actions

export default marketplaceSlice.reducer
