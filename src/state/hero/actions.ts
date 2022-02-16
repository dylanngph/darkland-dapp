import {createAction} from '@reduxjs/toolkit'

export const fetchPublicHeroData = createAction<{ heroData: any }>('hero/fetchPublicHeroData')
