import tokens from 'config/constants/tokens'

export const VestingTGE = {
  id: 1,
  slug: 'TGE',
  contractAddress: {
    privateSale: {
      56: '0x6d92A8Add425199d90641d1BC3d942031B752Ea4',
      97: '0x14eC49aa453967DD6cf728D499DcC1e57b06aD73',
    },
    strategic: {
      56: '0x6792056B7B6743d3670D9c3F26c80499CBB2F090',
      97: '0x14eC49aa453967DD6cf728D499DcC1e57b06aD73',
    },
  },
  token: tokens.big,
}

export const VestingStage = []
