import openMysteryBox from 'config/abi/openMysteryBox.json'
import AssetBlindBox from 'config/abi/AssetBlindBox.json'

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
    label: 'HeroesTD Common Box',
    boxAddress: {
      56: '0x07490ee4d03f81c89bf4f360093b59cf77c8a564',
      97: '0xC68E28e9f3C237c1dEBa9eD60E0994c2F61B5D95',
    },
    abi: AssetBlindBox,
    img: 'https://cdn.heroestd.io/Images/Box_Common.png',
    title: '/images/blindbox/blind-title-common-box.png',
  },
  {
    id: 2,
    label: 'HeroesTD Rare Box',
    boxAddress: {
      56: '0x59925c887f0203c4712536718ef9273300295d72',
      97: '0xED3c5Ec93d46bFe5EAce34E0100c7A7190B7705F',
    },
    abi: AssetBlindBox,
    img: 'https://cdn.heroestd.io/Images/Box_Rare.png',
    title: '/images/blindbox/blind-title-rare-box.png',
  },
  {
    id: 3,
    label: 'HeroesTD Epic Box',
    boxAddress: {
      56: '0x6a571c005870aa0f89176c2227abba71b4bc03b6',
      97: '0x36b435970A861cA4384f0dcF925E15094f88d781',
    },
    abi: AssetBlindBox,
    img: 'https://cdn.heroestd.io/Images/Box_Epic.png',
    title: '/images/blindbox/blind-title-epic-box.png',
  },
  {
    id: 4,
    label: 'HeroesTD Legendary Box',
    boxAddress: {
      56: '0x7fbc0ed604873058da63127dd3a16cbccb16fe06',
      97: '0xEFeeaD12fCb7C13eDf58bC5e67DcDeb6Ccbe8cd7',
    },
    abi: AssetBlindBox,
    img: 'https://cdn.heroestd.io/Images/Box_Legendary.png',
    title: '/images/blindbox/blind-title-legendary-box.png',
  },
]
