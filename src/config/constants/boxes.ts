import openMysteryBox from 'config/abi/openMysteryBox.json'
import AssetBlindBox from 'config/abi/AssetBlindBox.json'
import { BOX } from './box'

export const openBox = {
  contractAddress: {
    56: '0x2932673a8e2c0C73dF57b5E37bC94ED6e4CF3ab0',
    97: '0x99b8B6858eB1b2499f2992fCdF02e09135848A33',
  },
  abi: openMysteryBox,
}

export const currentBoxes = [
  {
    id: 1,
    label: 'Common Box',
    boxAddress: BOX.MYSTERY,
    abi: AssetBlindBox,
    img: 'images/blindbox/common_box.png',
    title: '/images/blindbox/blind-title-common-box.png',
  },
  {
    id: 2,
    label: 'Premium Box',
    boxAddress: BOX.PREMIUM,
    abi: AssetBlindBox,
    img: 'images/blindbox/premium_box.png',
    title: '/images/blindbox/blind-title-rare-box.png',
  },
]
