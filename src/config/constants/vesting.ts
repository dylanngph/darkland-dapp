import tokens from 'config/constants/tokens'

export const VestingTGE = {
  id: 1,
  slug: 'TGE',
  contractAddress: {
    privateSale: {
      56: '0x7ceabe8d40363992012a887a6fedb9bec7fb9266',
      97: '0x95f07fA694002dD5982375Ed795F5b660E7a1eA1',
    },
    strategic: {
      56: '0xe9561cd0d190e78d9953f7b1c80f89983f1b795a',
      97: '0x14eC49aa453967DD6cf728D499DcC1e57b06aD73',
    },
  },
  token: tokens.big,
}

export const VestingStage = []
