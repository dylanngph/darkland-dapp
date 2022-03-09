import tokens from './tokens'
import {FarmConfig} from './types'

const farms: FarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
  // {
  //     pid: 0,12
  //     lpSymbol: 'BKS',
  //     lpAddresses: {
  //         97: '',
  //         56: '0x6D810eB08FC6852b4a0e524944149154DAdba2b6',
  //     },
  //     token: tokens.babykshark,
  //     quoteToken: tokens.wbnb,
  // },
  {
    pid: 1,
    lpSymbol: 'DAK-BUSD',
    lpAddresses: {
      97: '',
      56: '0x1471f69c24a9bba486c2a23bf9f55ffc64376bed',
    },
    token: tokens.adt,
    quoteToken: tokens.busd,
  },
  // {
  //     pid: 1,
  //     lpSymbol: 'BUSD-KSC',
  //     lpAddresses: {
  //         97: '',
  //         56: '0xD33E50e444EC22998365AA443D1998e851FC5594',
  //     },
  //     token: tokens.kshark,
  //     quoteToken: tokens.busd,
  // }
  // {
  //     pid: 251,
  //     lpSymbol: 'CAKE-BNB LP',
  //     lpAddresses: {
  //         97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
  //         56: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',
  //     },
  //     token: tokens.cake,
  //     quoteToken: tokens.wbnb,
  // },
  // {
  //     pid: 252,
  //     lpSymbol: 'BUSD-BNB LP',
  //     lpAddresses: {
  //         97: '',
  //         56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
  //     },
  //     token: tokens.busd,
  //     quoteToken: tokens.wbnb,
  // },
]

export default farms
