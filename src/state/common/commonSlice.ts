/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import blindBoxAPI from 'api/blindboxApi'
import heroestdApi from 'api/heroestdApi'
import { getCookie } from 'utils/cookie'
import { TOKEN_ID } from 'contants'

export interface commonState {
  runeConfig: any
  itemConfig: any
  heroConfig: any
  boxData: any
  loading: boolean
  isLogin: boolean
}

const initialState: commonState = {
  runeConfig: [],
  itemConfig: [],
  heroConfig: [],
  boxData: [],
  loading: false,
  isLogin: !!getCookie(TOKEN_ID),
}

export const fetchHeroConfig = createAsyncThunk('/common/fetchHeroConfig', async () => {
  try {
    const { data } = await heroestdApi.getHeroConfig()
    return data
  } catch (error) {
    console.log(error)
  }
})

export const fetchItemConfig = createAsyncThunk('/common/fetchItemConfig', async () => {
  try {
    const { data } = await heroestdApi.getItemConfig()
    return data
  } catch (error) {
    console.log(error)
  }
})

export const fetchRuneConfig = createAsyncThunk('/common/fetchRuneConfig', async () => {
  try {
    const { data } = await heroestdApi.getRuneConfig()
    return data
  } catch (error) {
    console.log(error)
  }
})

export const fetchBoxData = createAsyncThunk('/common/fetchBoxData', async () => {
  try {
    const { data } = await blindBoxAPI.getBoxData()
    return data
  } catch (error) {
    console.log(error)
  }
})

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLogin: (state, { payload }) => {
      return { ...state, isLogin: payload }
    },
  },
  extraReducers: (builder) => {
    // fetchHeroConfig
    builder.addCase(fetchHeroConfig.pending, (state) => {
      return { ...state, loading: true }
    })
    builder.addCase(fetchHeroConfig.fulfilled, (state, { payload }) => {
      if (payload) {
        return {
          ...state,
          loading: false,
          heroConfig: [...payload],
        }
      }
    })
    builder.addCase(fetchHeroConfig.rejected, (state) => {
      return { ...state, loading: false }
    })
    // End of fetchHeroConfig

    builder.addCase(fetchItemConfig.pending, (state) => {
      return { ...state, loading: true }
    })
    builder.addCase(fetchItemConfig.fulfilled, (state, { payload }) => {
      if (payload) {
        return {
          ...state,
          loading: false,
          itemConfig: [...payload],
        }
      }
    })
    builder.addCase(fetchItemConfig.rejected, (state) => {
      return { ...state, loading: false }
    })

    builder.addCase(fetchRuneConfig.pending, (state) => {
      return { ...state, loading: true }
    })
    builder.addCase(fetchRuneConfig.fulfilled, (state, { payload }) => {
      if (payload) {
        return {
          ...state,
          loading: false,
          runeConfig: [...payload],
        }
      }
    })
    builder.addCase(fetchRuneConfig.rejected, (state) => {
      return { ...state, loading: false }
    })

    builder.addCase(fetchBoxData.pending, (state) => {
      return { ...state, loading: true }
    })
    builder.addCase(fetchBoxData.fulfilled, (state, { payload }) => {
      if (payload) {
        return {
          ...state,
          loading: false,
          boxData: [...payload],
        }
      }
    })
    builder.addCase(fetchBoxData.rejected, (state) => {
      return { ...state, loading: false }
    })
    // End of fetchBoxData
  },
})

// Action creators are generated for each case reducer function
export const { setLogin } = commonSlice.actions

export default commonSlice.reducer
