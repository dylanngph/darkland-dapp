import {createReducer} from '@reduxjs/toolkit'
import { fetchPublicMysteryBoxData,  fetchPublicBoxData } from './actions'
import { IBoxUser } from './types'

export interface BoxState {
  mysteryBoxData: any
	boxData: any
}

const initialState: BoxState = {
	mysteryBoxData: null,
	boxData: null
}

export default createReducer<BoxState>(initialState, (builder) =>
  builder
	.addCase(fetchPublicMysteryBoxData, (state, action) => {
		state.mysteryBoxData = action.payload
	})
	.addCase(fetchPublicBoxData, (state, action) => {
		state.boxData = action.payload
	})
)
