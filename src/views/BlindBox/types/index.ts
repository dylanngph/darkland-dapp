export interface PropsList {
  countTicketHTD?: number
  maxTicketHTD?: number
  countTicketNFT?: number
  maxTicketNFT?: number
  startTimeStakeNFTAndStakeHTD?: number
  timeEndStakeNFTAndStakeHTD?: number
  timeLockNFTAndHTD?: number
  totalUser?: number
  totalUserStakeNFT?: number
  userNFTDetails?: NFTDetails
  userIsCount?: boolean
  userIsLockNFT?: boolean
  userTickets?: number
  userTierDetails?: TierDetails
  isAllowance?: boolean
  balanceOf?: number
}

export interface BasePropBox {
  common: {
    price: number,
    maxBox: number,
    totalBox: number,
  },
  premium: {
    price: number,
    maxBox: number,
    totalBox: number,
  },
  endTimeWL: number,
  isUserHadBuyBox: boolean,
  percentDiscount: number,
  startTimeWL: number,
  userWhitelist: boolean,
  userWhitelistDiscount: boolean
}

export interface BoxWhitelist extends BasePropBox {
  userAmountTicket?: number
}

export interface NFTDetails {
  user: string
  nft: string
  tokenId: number
  isStake: boolean
}

export interface TierDetails {
  tierId: number
  htdAmount: number
}
