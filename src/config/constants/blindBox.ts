import blindBoxFreeAbi from 'config/abi/blindBoxFree.json'
import blindBoxWhitelistAbi from 'config/abi/blindBoxWhtielist.json'
import {addressBounty} from './bounties'
import tokens from './tokens'

enum TYPEBOX {
  MYSTERY = 1,
  PREMIUM = 2
}

export const blindBoxConfig = {
  tokenRequire: tokens.big,
  contractAddress: {
    97: '0x3d888D089889d6c1E663760b1B0bF59170Ed0537',
    56: '0xFf6FfD60fa5445cb0e2d647A270D458c9cdb734f',
  },
  rate: {
    common: {
      common: 79,
      rare: 20,
      epic: 1,
      legend: 0
    },
    premium: {
      common: 0,
      rare: 0,
      epic: 75,
      legend: 25
    },
  },
  type: {
    common: TYPEBOX.MYSTERY,
    premium: TYPEBOX.PREMIUM
  }
}

export const lotteryConfig = {
  tokenRequire: tokens.big,
  priceTicket: 200,
  participants: 1025,
  contractAddress: {
    97: '0xc5Ef71Aea5455773fBB37564EC597268BE7aA337',
    56: '0xcbec7b7f7da27eda014eeda1bc407a66fa3d6d95',
  },
}

export const ticketBoxConfig = {
  contractAddress: {
    free: {
      97: '0x85C9439a055d88E472Cd17DBED6A07438DFB187a',
      56: '0xA0A8769fF7C7F92EdCE419F990DbC5ef151c83E4',
    },
    whitelist: {
      97: '0x92faDD02D819B78A466B8b259cD3Ef5024F824C2',
      56: '0xD91f6E0D5f475C074BBa7617Ff6C360b4B00622e',
    },
  },
  abi: {
    free: blindBoxFreeAbi,
    whitelist: blindBoxWhitelistAbi,
  },
}