import tokens from 'config/constants/tokens'

export const VestingTGE = {
  id: 1,
  slug: 'TGE',
  contractAddress: {
    privateSale: {
      56: '0xd9D9B64CA9DE6e0646138cA5bF55B7De69810933',
      97: '0x95f07fA694002dD5982375Ed795F5b660E7a1eA1',
    },
    strategic: {
      56: '0x98F0D525405a861C0439d6A627dAa13c45FA81D8',
      97: '0x14eC49aa453967DD6cf728D499DcC1e57b06aD73',
    },
  },
  token: tokens.big,
}

export const VestingStage = []
