import {ContextApi} from 'contexts/Localization/types'
import {PageMeta} from './types'

export const DEFAULT_META: PageMeta = {
  title: 'Dot Arcade - Arcade and Moba game genre',
  description:
    'The most popular AMM on BSC by user count! Earn CAKE through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by KShark), NFTs, and more, on a platform you can trust.',
  image: 'https://dapp.kshark.io/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/home':
      return {
        title: `${t('Home')} | ${t('Dot Arcade - Arcade and Moba game genre')}`,
      }
    case '/bounty':
      return {
        title: `${t('Bounty')} | ${t('Dot Arcade - Arcade and Moba game genre')}`,
      }
    case '/vesting':
      return {
        title: `${t('Vesting')} | ${t('Dot Arcade - Arcade and Moba game genre')}`,
      }
    case '/ido':
      return {
        title: `${t('IDO')} | ${t('Dot Arcade - Arcade and Moba game genre')}`,
      }
    case '/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('Dot Arcade - Arcade and Moba game genre')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('Dot Arcade - Arcade and Moba game genre')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('Dot Arcade - Arcade and Moba game genre')}`,
      }
    case '/swap':
      return {
        title: `${t('Swap')} | ${t('Dot Arcade - Arcade and Moba game genre')}`,
      }
    case '/blind-box':
      return {
        title: `${t('Blind Box')} | ${t('Dot Arcade - Arcade and Moba game genre')}`,
      }
    default:
      return null
  }
}
