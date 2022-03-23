import {OPEN_IDO, CLOSED_IDO, UPCOMING_IDO, PROGRESS_IDO, COMPLETE_IDO, RUBY_NFT, SAPPHIRE_NFT} from 'views/IDO/helpers'
import {addressBounty} from 'config/constants/bounties'
import tokens from 'config/constants/tokens'
import {Address} from './types'

export interface PropToken {
  symbol: string
  address: Address
  decimals: number
  projectLink?: string
}
interface PropsIDO {
  id: number
  title: string
  description: string
  contractAddress: Address
  totalCap: number
  priceSale: number
  startTime: number
  endTime: number
  tokenPrice: PropToken
  tokenEarn: PropToken
  idoDescription?: string
  priceBuy: number
  status: number
  logo: string
  banner: string
  nftRequire: any[]
  allowance?: boolean
  allowanceNFT?: boolean
  type: string
}

const idos: PropsIDO[] = [
  {
    id: 1,
    title: 'HTD IDO - WHITELIST',
    description:
      "Participants can earn IDO bounty and get whitelisted by completing missions on HeroesTD DApp or joining Friendster campaigns held by HeroesTD's partnering communities and influencers.",
    contractAddress: {
      97: '0x1ED5800ca9EC31f3d295A5077e54D201a3845F74',
      56: '0x8a25d708fe1e74a783b0878e311b0e45a0efd025',
    },
    totalCap: 0,
    priceSale: 0.06,
    startTime: 1637938800,
    endTime: 1638086400,
    tokenPrice: tokens.busd,
    tokenEarn: tokens.big,
    idoDescription: `✨ In the IDO on https://heroestd.io, everyone must buy $HTD with $BUSD. 
        Max cap/whitelist person: $50
        Max cap/freezone person: $50/purchase, no limit on number of purchases
        Max Freezone Pool: Depends on the remaining HTD pool after whitelist. Minimum 232 slots.
        Please prepare $BNB for gas fee in your metamask wallet.`,
    priceBuy: 50,
    status: OPEN_IDO,
    logo: '/images/sample-ido.png',
    banner: 'https://cdn.heroestd.io/Images/banner.jpg',
    nftRequire: [addressBounty.sapphire, addressBounty.ruby],
    allowance: false,
    allowanceNFT: false,
    type: 'vip',
  },
  {
    id: 2,
    title: 'HTD IDO - FREEZONE',
    description: 'Anyone can participate.',
    contractAddress: {
      97: '0xf68af76c25fDDF86FA02B99b243D61b55760bdBc',
      56: '0x728335b5Ce67c09C61Ab06E4d1f6486Fa92Aa4aE',
    },
    totalCap: 0,
    priceSale: 0.06,
    startTime: 1638104400,
    endTime: 1638198000,
    tokenPrice: tokens.busd,
    tokenEarn: tokens.big,
    priceBuy: 50,
    status: OPEN_IDO,
    logo: '/images/sample-ido.png',
    nftRequire: [addressBounty.sapphire, addressBounty.ruby],
    banner: 'https://cdn.heroestd.io/Images/banner.jpg',
    allowance: false,
    allowanceNFT: false,
    type: 'free',
  },
]

export default idos
