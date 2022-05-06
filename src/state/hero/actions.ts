import {createAction} from '@reduxjs/toolkit'

export const fetchPublicHeroData = createAction<{ heroIds: any[] }>('hero/fetchPublicHeroData')
