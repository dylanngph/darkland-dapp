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
  startTime: number
  endTime: number
  totalBoxCM: number
  totalBoxR: number
  totalBoxSR: number
  totalBoxSSR: number
  totalNFT: number
  userLastTimeBuy: number
}

export interface BoxWhitelist extends BasePropBox {
  userAmountTicket?: number
  userWhitelist?: boolean
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
