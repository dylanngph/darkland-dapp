import heroIcon from 'assets/icons/heroIcon.svg'
import nftIcon from 'assets/icons/nftIcon.svg'
import boxIcon from 'assets/icons/boxIcon.svg'

export const GROUP_FILTER = ['General', 'Item', 'Runes']

export const MARKET_FILTER = [
  // {
  //   type: 'select',
  //   label: '',
  //   name: 'heroId',
  //   placeholder: 'Hero Name',
  //   isClearable: true,
  //   isSearchable: true,
  //   defaultValue: 0,
  //   options: [],
  // },
  {
    type: 'select',
    label: '',
    name: 'seller',
    defaultValue: 0,
    isSearchable: false,
    options: [
      { key: 0, label: 'All orders' },
      { key: 1, label: 'My orders' },
    ],
  },
  {
    type: 'select',
    label: '',
    name: 'price',
    defaultValue: 0,
    isSearchable: false,
    options: [
      { key: 0, label: 'Newest' },
      { key: 2, label: 'Highest Price' },
      { key: 1, label: 'Lowest Price' },
    ],
  },
]

export const tabMarket = [
  { index: 0, label: 'Boxes', icon: boxIcon },
  { index: 1, label: 'Heroes', icon: heroIcon },
  { index: 2, label: 'NFT Bounty', icon: nftIcon },
]

export const tabDashboard = [
  { label: 'Heroes', icon: heroIcon },
  // { label: 'Boxes', icon: boxIcon }
]

export const tabTransactionHistory = [
  { label: 'Heroes', icon: heroIcon },
  // { label: 'Boxes', icon: boxIcon }
]
