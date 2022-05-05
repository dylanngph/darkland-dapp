import tokens from './tokens'
import {blindBoxConfig, ticketBoxConfig} from './blindBox'
import { BoxType } from './types'
import { BOX } from './box'

const blindBoxItems = [
  {
    id: BoxType.COMMON,
    title: 'MYSTERY BOX',
    remainingBoxes: 5243,
    price: 100,
    tokenPrice: tokens.busd,
    boxAddress: BOX.MYSTERY,
    iconImageUrl: '/images/blindbox/common_box.png',
    titleImageurl: '/images/blindbox/Comon-title.png',
    ...ticketBoxConfig,
    percentCHero: 84,
    percentRHero: 13.43,
    percentSRHero: 2.14,
    percentSSRHero: 0.43,
    rate: blindBoxConfig.rate.common,
    balanceOf: 0
  },
  {
    id: BoxType.RARE,
    title: 'PREMIUM BOX',
    remainingBoxes: 3223,
    price: 300,
    tokenPrice: tokens.busd,
    iconImageUrl: '/images/blindbox/premium_box.png',
    boxAddress: BOX.PREMIUM,
    titleImageurl: '/images/blindbox/Rare-title.png',
    ...ticketBoxConfig,
    percentCHero: 0.0,
    percentRHero: 92.96,
    percentSRHero: 5.72,
    percentSSRHero: 1.32,
    rate: blindBoxConfig.rate.premium,
    balanceOf: 0
  }
]

export default blindBoxItems
