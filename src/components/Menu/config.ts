import { MenuEntry } from 'components/Pancake-uikit'
import { ContextApi } from 'contexts/Localization/types'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Home'),
    icon: 'HomeIcon',
    href: '/home',
  },
  // {
  //   label: t('Marketplace'),
  //   icon: 'MarketIcon',
  //   href: '/marketplace',
  //   // items: [
  //   //   {
  //   //     label: t('Dashboard'),
  //   //     icon: 'Dashboard',
  //   //     href: '/dashboard-market',
  //   //   },
  //   //   {
  //   //     label: t('Marketplace'),
  //   //     icon: 'SubMarketIcon',
  //   //     href: '/marketplace',
  //   //   },
  //   // ],
  // },
  // {
  //   label: t('My Assets'),
  //   icon: 'ProfileCircle',
  //   href: '/my-assets',
  //   items: [
  //     {
  //       label: t('Wallet'),
  //       icon: 'WalletIcon',
  //       href: '/my-assets/wallet',
  //     },
  //     {
  //       label: t('Inventory'),
  //       icon: 'InventoryIcon',
  //       href: '/my-assets/inventory',
  //     },
  //     {
  //       label: t('Transaction History'),
  //       icon: 'Dashboard',
  //       href: '/transaction-history',
  //     }
  //   ],
  // },
  // {
  //   label: t('IDO'),
  //   icon: 'IdoIcon',
  //   href: '/ido',
  // },
  // {
  //   label: t('Leaderboard'),
  //   icon: 'RankingIcon',
  //   items: [
  //     {
  //       label: t('Top Farmers'),
  //       icon: 'RankingFamers',
  //       href: '/leaderboard',
  //     },
  //     {
  //       label: t('Top Poolers'),
  //       icon: 'RankingPoolers',
  //       href: '/leaderboardpooling',
  //     },
  //     {
  //       label: t('AlphaTest Ranking'),
  //       icon: 'AlphaTestIcon',
  //       href: '/leaderboardalphatest',
  //     },
  //   ],
  // },
  // {
  //   label: t('Bounty NFT'),
  //   icon: 'AirdropIcon',
  //   href: '/bounty',
  // },
  // {
  //   label: t('Blind Box'),
  //   icon: 'BlindIcon',
  //   href: '/blind-box',
  // },
  // {
  //   label: t('Farms'),
  //   icon: 'FarmIcon',
  //   href: '/farms',
  // },
  // {
  //   label: t('Rewards'),
  //   icon: 'VestingIcon',
  //   href: '/rewards',
  // },
  {
    label: t('Liquidity'),
    icon: 'TradeIcon',
    href: '/liquidity',
  },
  {
    label: t('Pools'),
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
    label: t('Vesting'),
    icon: 'VestingIcon',
    href: '/vesting',
  },
  {
    label: t('Stake NFT'),
    icon: 'VestingIcon',
    href: '/nft-staking',
  },
  {
    label: t('Beta Test'),
    icon: 'VestingIcon',
    href: '/play-game',
  },
  // {
  //   label: t('NFT Staking'),
  //   icon: 'VestingIcon',
  //   href: '/nft-staking',
  // },
  // {
  //   label: t('Info'),
  //   icon: 'InfoIcon',
  //   href: '/#',
  // },
  // {
  //   label: t('Pool NFT'),
  //   icon: 'InfoIcon',
  //   href: '/pool-nft',
  // },
  // {
  //   label: t('MONI Maket'),
  //   icon: 'TradeIcon',
  //   items: [
  //     {
  //       label: t('NFT Market'),
  //       href: '#',
  //     },
  //     {
  //       label: t('NFT Aution'),
  //       href: '#',
  //     },
  //     {
  //       label: t('NFT Blink Box'),
  //       href: '#',
  //     }
  //   ],
  // },
  // {
  //   label: t('MONI Pool'),
  //   icon: 'TradeIcon',
  //   items: [
  //     {
  //       label: t('MONI Mining'),
  //       href: '/pools',
  //     },
  //     {
  //       label: t('Farm'),
  //       href: '/farms',
  //     }
  //   ],
  // },
  // {
  //   label: t('MONI NFT Pool'),
  //   icon: 'TradeIcon',
  //   items: [
  //     {
  //       label: t('NFT Mining'),
  //       href: '#',
  //     },
  //     {
  //       label: t('NFT Farm'),
  //       href: '#',
  //     }
  //   ],
  // },
  // {
  //   label: t('MONI NFT Action'),
  //   icon: 'TradeIcon',
  //   items: [
  //     {
  //       label: t('Mint'),
  //       href: '#',
  //     },
  //     {
  //       label: t('Bag'),
  //       href: '#',
  //     }
  //   ],
  // },
  // {
  //   label: t('MONI Bouty'),
  //   icon: 'TradeIcon',
  //   items: [
  //     {
  //       label: t('Moni airdrop'),
  //       href: '#',
  //     },
  //     {
  //       label: t('NFT airdrop'),
  //       href: '#',
  //     },
  //     {
  //       label: t('quest'),
  //       href: '#',
  //     }
  //   ],
  // },
  // {
  //   label: t('More'),
  //   icon: 'MoreIcon',
  //   items: [
  //     {
  //       label: t('Github'),
  //       href: '#',
  //     },
  //     {
  //       label: t('Docs'),
  //       href: '#',
  //     },
  //     {
  //       label: t('Blog'),
  //       href: 'https://pancakeswap.medium.com',
  //     },
  //   ],
  // },
]

export default config
