import tokens from './tokens'
import {ticketBoxConfig} from './blindBox'
import { BoxType } from './types'

const blindBoxItems = [
  {
    id: BoxType.COMMON,
    title: 'COMMON BOX',
    remainingBoxes: 5243,
    price: 100,
    tokenPrice: tokens.busd,
    boxAddress: {
      56: '0x07490Ee4D03F81C89bF4F360093b59CF77c8a564',
      97: '0xC68E28e9f3C237c1dEBa9eD60E0994c2F61B5D95',
    },
    iconImageUrl: 'https://cdn.heroestd.io/Images/Box_Common.png',
    titleImageurl: '/images/blindbox/Comon-title.png',
    ...ticketBoxConfig,
    percentCHero: 84,
    percentRHero: 13.43,
    percentSRHero: 2.14,
    percentSSRHero: 0.43,
    balanceOf: 0
  },
  {
    id: BoxType.RARE,
    title: 'RARE BOX',
    remainingBoxes: 3223,
    price: 300,
    tokenPrice: tokens.busd,
    iconImageUrl: 'https://cdn.heroestd.io/Images/Box_Rare.png',
    boxAddress: {
      56: '0x59925c887F0203c4712536718Ef9273300295D72',
      97: '0xED3c5Ec93d46bFe5EAce34E0100c7A7190B7705F',
    },
    titleImageurl: '/images/blindbox/Rare-title.png',
    ...ticketBoxConfig,
    percentCHero: 0.0,
    percentRHero: 92.96,
    percentSRHero: 5.72,
    percentSSRHero: 1.32,
    balanceOf: 0
  },
  {
    id: BoxType.EPIC,
    title: 'EPIC BOX',
    remainingBoxes: 1620,
    price: 700,
    tokenPrice: tokens.big,
    boxAddress: {
      56: '0x6a571C005870aa0F89176C2227ABBa71B4BC03B6',
      97: '0x36b435970A861cA4384f0dcF925E15094f88d781',
    },
    iconImageUrl: 'https://cdn.heroestd.io/Images/Box_Epic.png',
    titleImageurl: '/images/blindbox/blind-title-epic-box.png',
    ...ticketBoxConfig,
    percentCHero: 0.0,
    percentRHero: 0.0,
    percentSRHero: 92.74,
    percentSSRHero: 7.26,
    balanceOf: 0
  },
  {
    id: BoxType.LEGENDARY,
    title: 'LEGENDARY BOX',
    remainingBoxes: 370,
    price: 1000,
    tokenPrice: tokens.big,
    boxAddress: {
      56: '0x7FbC0ed604873058DA63127dD3a16cbCCB16Fe06',
      97: '0xEFeeaD12fCb7C13eDf58bC5e67DcDeb6Ccbe8cd7',
    },
    iconImageUrl: 'https://cdn.heroestd.io/Images/Box_Legendary.png',
    titleImageurl: '/images/blindbox/blind-title-legendary-box.png',
    ...ticketBoxConfig,
    percentCHero: 0.0,
    percentRHero: 0.0,
    percentSRHero: 0.0,
    percentSSRHero: 100,
    balanceOf: 0
  },
]

export default blindBoxItems
