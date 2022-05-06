import {createReducer} from '@reduxjs/toolkit'
import { fetchPublicHeroData } from './actions'
import { IBoxUser } from './types'

export interface HeroState {
  heroIds: any
}

const initialState: HeroState = {
	heroIds: []
}

export default createReducer<HeroState>(initialState, (builder) =>
  builder
	.addCase(fetchPublicHeroData, (state, action) => {
		state.heroIds = action.payload
	}),
)
