import {createReducer} from '@reduxjs/toolkit'
import { fetchPublicHeroData } from './actions'
import { IBoxUser } from './types'

export interface HeroState {
  heroData: any
}

const initialState: HeroState = {
	heroData: null
}

export default createReducer<HeroState>(initialState, (builder) =>
  builder
	.addCase(fetchPublicHeroData, (state, action) => {
		state.heroData = action.payload
	}),
)
