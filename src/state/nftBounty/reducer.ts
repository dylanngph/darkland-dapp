import {createReducer} from '@reduxjs/toolkit'
import { fetchPublicNftBounty } from './actions'

export interface HeroState {
	bountyData: any
}

const initialState: HeroState = {
	bountyData: null
}

export default createReducer<HeroState>(initialState, (builder) =>
  builder
	.addCase(fetchPublicNftBounty, (state, action) => {
		state.bountyData = action.payload
	}),
)
