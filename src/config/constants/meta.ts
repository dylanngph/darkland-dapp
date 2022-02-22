import {ContextApi} from 'contexts/Localization/types'
import {PageMeta} from './types'

export const DEFAULT_META: PageMeta = {
  title: 'DARKLAND SURVIVAL – NFT GAME',
  description:
    'Dark Land Survival is beyond a Zombie Defense Game in blockchain technology, the game is a open world with a huge game scope. Beside Play to Earn with deep content, Dark Land Survival provides top notch experience in endless gameplay modes and various features',
  image: 'https://darkland.io/images/logo.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/home':
      return {
        title: `${t('Home')} | ${t('DARKLAND SURVIVAL – NFT GAME')}`,
      }
    case '/bounty':
      return {
        title: `${t('Bounty')} | ${t('DARKLAND SURVIVAL – NFT GAME')}`,
      }
    case '/vesting':
      return {
        title: `${t('Vesting')} | ${t('DARKLAND SURVIVAL – NFT GAME')}`,
      }
    case '/ido':
      return {
        title: `${t('IDO')} | ${t('DARKLAND SURVIVAL – NFT GAME')}`,
      }
    case '/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('DARKLAND SURVIVAL – NFT GAME')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('DARKLAND SURVIVAL – NFT GAME')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('DARKLAND SURVIVAL – NFT GAME')}`,
      }
    case '/swap':
      return {
        title: `${t('Swap')} | ${t('DARKLAND SURVIVAL – NFT GAME')}`,
      }
    case '/blind-box':
      return {
        title: `${t('Blind Box')} | ${t('DARKLAND SURVIVAL – NFT GAME')}`,
      }
    default:
      return null
  }
}
