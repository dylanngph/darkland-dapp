import {createAction} from '@reduxjs/toolkit'
import { IBoxUser } from './types'

export const fetchPublicBoxData = createAction<{ boxData: IBoxUser }>('box/fetchPublicBoxData')

export const fetchPublicMysteryBoxData = createAction<{ boxData: IBoxUser }>('box/fetchPublicMysteryBoxData')