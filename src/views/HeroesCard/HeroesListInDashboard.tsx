import bnbIcon from 'assets/icons/bnb-usd-icon.svg'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import history from 'routerHistory'
import { formatNumber, getBalanceNumber } from 'utils/formatBalance'
import { AppState, useAppDispatch } from 'state'
import { Tooltip } from '@chakra-ui/react'
import GenC from 'assets/images/C.png'
import GenR from 'assets/images/R.png'
import GenSR from 'assets/images/SR.png'
import GenSSR from 'assets/images/SSR.png'
import './heroesListInDashboard.modules.scss'
import { useSelector } from 'react-redux'
import heroConfig from 'config/constants/gameConfig/heroConfig.json'
import { useWeb3React } from '@web3-react/core'

const HeroesListInDashboard = ({ hero, size = 'large', idHero, tokenPrice }) => {
  const path = useHistory()
  const { t } = useTranslation()

  const {account} = useWeb3React()
  const { itemConfig, runeConfig } = useSelector((state: AppState) => state.common)

  const getId = () => {
    if (hero) {
      return hero?.tokenId
    }
    return ''
  }

  const getOriginBG = () => {
    if (hero) {
      const number = (hero?.heroOrigin).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })
      return `cardElement-Origin${number}`
    }
    return ''
  }

  // const getRuneImg = (index: number) => {
  //   if (hero?.runes) {
  //     return `cardElement-rune${hero?.runes[index]}`
  //   }
  //   return ''
  // }

  const getRuneName = (index: number) => {
    if (hero?.runes) {
      if (runeConfig && runeConfig[hero?.runes[index] - 1]) {
        return runeConfig[hero?.runes[index] - 1].name
      }
    }
    return ''
  }

  const getItemStat1 = (index: number) => {
    if (hero && hero?.items) {
      if (itemConfig && itemConfig[hero?.items[index] - 1]) {
        return `+ ${itemConfig[hero?.items[index] - 1].stat1}`
      }
    }
    return ''
  }

  const getItemStat2 = (index: number) => {
    if (hero && hero?.items) {
      if (itemConfig && itemConfig[hero?.items[index] - 1]) {
        if (itemConfig[hero?.items[index] - 1].stat2 !== '') {
          return `+ ${itemConfig[hero?.items[index] - 1].stat2}`
        }
      }
    }
    return ''
  }

  const getRuneDes1 = (index: number) => {
    if (hero && hero?.runes) {
      if (runeConfig && runeConfig[hero?.runes[index] - 1]) {
        return `${runeConfig[hero?.runes[index] - 1].des}`
      }
    }
    return ''
  }

  const getRuneDes2 = (index: number) => {
    if (hero && hero?.runes) {
      if (runeConfig && runeConfig[hero?.runes[index] - 1]) {
        return `${runeConfig[hero?.runes[index] - 1].des2}`
      }
    }
    return ''
  }

  const getHeroImg = () => {
    return `heroes-${hero?.heroId}`
  }

  const getItemImg = (index: number) => {
    if (hero) {
      return `cardElement-item${hero.items[index]}`
    }
    return ''
  }

  const getItemBorder = () => {
    return `itemDecor-item_decor${hero?.heroClass}`
  }

  const getRuneBorder = () => {
    return `runeDecor-rune_decor${hero?.heroClass}`
  }

  const getRuneImg = (index: number) => {
    if (hero) {
      return `cardElement-rune${hero.runes[index]}`
    }
    return ''
  }

  const getLevelDecor = () => {
    return `cardElement-level_decor${hero?.heroClass}`
  }

  const getClassName = () => {
    if (hero) {
      switch (hero?.heroClass) {
        case 1:
          return 'Assassin'
        case 2:
          return 'Slayer'
        case 3:
          return 'Warlord'
        case 4:
          return 'Elderwood'
        case 5:
          return 'Hunter'
        case 6:
          return 'Warlock'
        case 7:
          return 'Duelist'
        case 8:
          return 'Wizard'
        case 9:
          return 'Enlightened'
        case 10:
          return 'Fortune'
        default:
          return 'Unknown'
      }
    }
    return ''
  }

  const getOriginName = () => {
    if (hero) {
      switch (hero?.heroOrigin - 1) {
        case 1:
          return 'Brawler'
        case 2:
          return 'Vanguard'
        case 3:
          return 'Ninja'
        case 4:
          return 'Dragon Soul'
        case 5:
          return 'Divine'
        case 6:
          return 'Reviver'
        case 7:
          return 'Dazzler'
        case 8:
          return 'Mystic'
        case 9:
          return 'Guardian'
        case 10:
          return 'Fabled'
        default:
          return 'Unknown'
      }
    }
    return ''
  }

  const getHeroName = () => {
    if (hero) {
      return hero?.name?.toUpperCase()
    }
    return ''
  }

  const getHeroShortDesc = () => {
    if (hero) {
      return hero?.quote?.toUpperCase()
    }
    return ''
  }

  const getOriginImg = () => {
    return `cardElement-Origin_Icon_${hero?.heroOrigin}`
  }

  const getOriginDecorLine = () => {
    return `cardElement-line_decor${hero?.heroClass}`
  }

  const getHeroAttackType = () => {
    return `attackType-${hero?.targetType}`
  }

  const listItemName = [
    'Dirk',
    'Wooden Bow',
    'Voodoo Wand',
    "Shiira's Teardrop",
    'Leather Armor',
    "Ancestor's Gift",
    'Belt of Pirates',
    'Gloves of Loyalty',
    'Destiny Blade',
    'Bone Crusher',
    'Jambiya',
    'Restorer',
    'Medallium',
    'Pyke',
    'Moment of Courage',
    'Heartbreaker',
    'Alphatic Firepower',
    'Zeal blade',
    'Discipline',
    'Dragon Band',
    'Balista',
    'Gem of Memories',
    'Wingfield',
    'Magician Cape',
    'Fortune Striker',
    'Gigamesh',
    'Merlini Scepter',
    'Sacred Tome',
    'Vasterclaw',
    'Aeon Duster',
    'Lotus Sphere',
    'Heavenly Grace',
    "Hero's Pendant",
    'Pawist',
    'Bloodborn',
    'Fairy Slasher',
    'Defiance',
    'Horn Soul',
    "Ancestor's Faith",
    'Wind Dancer',
    'Cloak of Invincibility',
    'Void Cuirass',
    'Void Harmony',
    'Void Gauntlet',
  ]

  const getItemName = (index: number) => {
    if (hero) {
      return listItemName[hero.items[index] - 1]
    }
    return ''
  }

  const getAttackTypeName = () => {
    if (hero) {
      switch (hero?.targetType - 1) {
        case 0:
          return 'Front Enemy'
        case 1:
          return 'Strong Enemy'
        case 2:
          return 'Weak Enemy'
        case 3:
          return 'Random Enemy'
        default:
          return 'Unknown'
      }
    }
    return ''
  }

  const getClassImg = () => {
    return `cardElement-Class_Icon${hero?.heroClass}`
  }

  const getClassBorder = () => {
    if (hero) {
      const number = (hero?.heroClass).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })
      return `cardElement-Class${number}`
    }
    return ''
  }

  const getHeroGenName = () => {
    if (hero) {
      let gen = ''
      switch (hero?.gen) {
        case 0:
          gen = GenC
          break
        case 1:
          gen = GenR
          break
        case 2:
          gen = GenSR
          break
        case 3:
          gen = GenSSR
          break
        default:
          gen = GenC
          break
      }

      return (
        <img src={gen} alt={gen} style={{ display: 'inline', height: '100%', minWidth: '100%' }} />
      )
    }
    return ''
  }

  return (
    <div
      aria-hidden="true"
      onClick={() => {
        history.push({ pathname: `/heroes-order/${hero?.tokenId}`, state: `${path.location.pathname}` })
      }}
      className="flex flex-row flex-wrap cursor-pointer heroColumnList"
    >
      <div
        className="w-full flex flex-wrap"
        style={{
          borderTop: '1px solid #434344',
          height: 'auto',
          padding: 15,
        }}
      >
        <div className="flex flex-row flex-wrap justify-between w-full">
          {/* Image */}
          <div className="w-3/6 xl:w-1/4 grid" style={{ width: '15%', gridTemplateRows: '175px' }}>
            <div
              className="nftCard-column origin-top-left "
              style={{ padding: '0px', background: 'transparent' }}
            >
              <i className={`heroes imgHero pointer-events-none ${getHeroImg()}`} style={{transform: "scale(0.5)", transformOrigin: "top left"}} />
            </div>
          </div>

          {/* Infor */}
          <div className="w-3/6 xl:w-1/4 flex justify-start" style={{ marginLeft: '25px' }}>
            <div className="flex flex-col flex-wrap justify-center items-start h-full lg:ml-4 gap-4">
              <div className="flex flex-row">
                <div className="grow" style={{ width: '30px', height: '40px' }}>
                  {getHeroGenName()}
                </div>
                <div className="flex flex-col gap-0">
                  <div className="ml-2 flex flex-row">
                <div
                  className="grow"
                  style={{
                    width: 'auto',
                    maxWidth: '65px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    height: '20px',
                    lineHeight: '20px'
                  }}
                >
                  {heroConfig[hero.heroId - 1].name}
                  
                </div>
                {hero?.tag === 0 && (
                      <span className="heroOrigin-column">Origin</span>
                    )}
                    </div>
                  <div className="heroID-column ml-2 mt-1">#{hero?.tokenId}</div>
                </div>
              </div>
              
              {/* <IdHeroCard style={{ fontSize: 10 }}>Summon count: 5</IdHeroCard> */}
              <div
                className="shortDesc -ml-1 -mt-2"
                style={{
                  minWidth: 'auto',
                  maxWidth: '120px',
                  backgroundColor: '#00A3FF',
                  color: 'white',
                  borderRadius: '5px',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  padding: '0 5px',
                  fontSize: '13px',
                }}
              >
                Summon Times: {hero.summonTimes || 0}
              </div>
              <div className="flex flex-row flex-wrap justify-center">
                <div className="circle1-column pointer-events-none">
                  <i className={`runeDecor circle1-column-border ${getRuneBorder()}`}>
                    <i className={`classIcon classImg-column ${getClassImg()}`} />
                  </i>
                </div>
                <div className="circle1-column pointer-events-none">
                  <i className={`runeDecor circle1-column-border ${getRuneBorder()}`}>
                    <i className={`originIcon classImg-column ${getOriginImg()}`} />
                  </i>
                </div>
                <div className="circle1-column pointer-events-none">
                  <i className={`runeDecor circle1-column-border ${getRuneBorder()}`}>
                    <i className={`attackType ${getHeroAttackType()}`} />
                  </i>
                </div>
              </div>
              <div style={{ height: '34px' }} />
              <PriceBUSD className="flex flex-row mb-3">
                <img
                  style={{ display: 'inline', verticalAlign: 'middle' }}
                  src={bnbIcon}
                  alt={bnbIcon}
                />
                <span style={{ color: '#FFC247', margin: '0 5px', maxWidth: '95px' }} className='truncate md:text-20 md:leading-24'>
                  {formatNumber(hero.price)}
                </span>
                BUSD
              </PriceBUSD>
              <Text
                style={{
                  marginTop: '-20px',
                  marginLeft: '28px',
                  color: '#9E9E9E',
                  display: 'none',
                }}
              >
                {' '}
                a minute ago
              </Text>
            </div>
          </div>

          {/* Items */}

          <div className="w-3/6 md:pl-3 xl:w-1/4 flex justify-start">
            <div className="itemHolder-column flex flex-col flex-wrap justify-start items-start gap-4">
              {hero.mkstatus === 1 ? (
                <>
                {hero.buyer ? (<div className="flex flex-row">
                  <Text style={{ color: '#9E9E9E', marginRight: '10px' }}>Buyer</Text>
                  <Text
                    style={{
                      width: 'auto',
                      maxWidth: ' 72px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {hero.buyer?.substring(0, 2)}...{hero.buyer.substring(hero.buyer?.length - 4)}
                  </Text>
                </div>): (<div style={{ height: '24px' }} />)}
                </>
              ) : (
                <div style={{ height: '24px' }} />
              )}

              <Tooltip
                placement="bottom"
                bg="#111111"
                padding={3}
                hasArrow
                border="2px solid #2D2B2B"
                borderRadius="15px"
                arrowShadowColor="#2D2B2B"
                label={
                  <CardTooltip>
                    <span className="pl-4" style={{ color: '#FFC247' }}>
                      {' '}
                      {getItemName(0)}:{' '}
                    </span>
                    <span className="pl-4"> {getItemStat1(0)} </span>
                    <span className="pl-4"> {getItemStat2(0)} </span>
                  </CardTooltip>
                }
              >
                <div>
                  <i className={`itemDecor itemDecor-column itemBorder1 ${getItemBorder()}`}>
                    <i className={`item item-dashboard ${getItemImg(0)}`} />
                    <div className="classNameItem">{getItemName(0)}</div>
                  </i>
                </div>
              </Tooltip>
              <Tooltip
                placement="bottom"
                bg="#111111"
                padding={3}
                hasArrow
                border="2px solid #2D2B2B"
                borderRadius="15px"
                arrowShadowColor="#2D2B2B"
                label={
                  <CardTooltip>
                    <span className="pl-4" style={{ color: '#FFC247' }}>
                      {' '}
                      {getItemName(1)}:{' '}
                    </span>
                    <span className="pl-4"> {getItemStat1(1)} </span>
                    <span className="pl-4"> {getItemStat2(1)} </span>
                  </CardTooltip>
                }
              >
                <div>
                  <i className={`itemDecor itemDecor-column itemBorder2 ${getItemBorder()}`}>
                    <i className={`item item-dashboard ${getItemImg(1)}`} />
                    <div className="classNameItem">{getItemName(1)}</div>
                  </i>
                </div>
              </Tooltip>
              <Tooltip
                placement="bottom"
                bg="#111111"
                padding={3}
                hasArrow
                border="2px solid #2D2B2B"
                borderRadius="15px"
                arrowShadowColor="#2D2B2B"
                label={
                  <CardTooltip>
                    <span className="pl-4" style={{ color: '#FFC247' }}>
                      {' '}
                      {getItemName(2)}:{' '}
                    </span>
                    <span className="pl-4"> {getItemStat1(2)} </span>
                    <span className="pl-4"> {getItemStat2(2)} </span>
                  </CardTooltip>
                }
              >
                <div>
                  <i className={`itemDecor itemDecor-column ${getItemBorder()}`}>
                    <i className={`item item-dashboard ${getItemImg(2)}`} />
                    <div className="classNameItem">{getItemName(2)}</div>
                  </i>
                </div>
              </Tooltip>
            </div>
          </div>
          {/* Rune */}
          <div className="w-3/6 md:pl-3 xl:w-1/4 flex justify-start">
            <div className="flex flex-col flex-wrap justify-start items-start gap-4">
              {hero.mkstatus === 1 ? (
                <div className="flex flex-row">
                  <Text style={{ color: '#9E9E9E', marginRight: '10px' }}>Seller</Text>
                  <Text
                    style={{
                      width: 'auto',
                      maxWidth: ' 72px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {hero.seller ? (`${hero.seller.substring(0, 2)}...${hero.seller.substring(hero.seller?.length - 4)}`) : 
                    (`${account.substring(0, 2)}...${account.substring(account?.length - 4)}`)
                    }
                  </Text>
                </div>
              ) : (
                <div style={{ height: '24px' }} />
              )}
              <Tooltip
                placement="bottom"
                trigger={['click']}
                bg="#111111"
                padding={3}
                hasArrow
                border="2px solid #2D2B2B"
                borderRadius="15px"
                arrowShadowColor="#2D2B2B"
                label={
                  <CardTooltip>
                    <span className="pl-4 font-light">
                      {' '}
                      <span className="font-bold">Description:</span> {getRuneDes1(0)}{' '}
                    </span>
                    <span className="pl-4 font-bold"> {getRuneDes2(0)} </span>
                  </CardTooltip>
                }
              >
                <i
                  className={`runeDecor runeDecor-column runeBorder-column ${getRuneBorder()}`}
                  style={{ marginRight: '25px' }}
                >
                  <i className={`rune ${getRuneImg(0)}`} />
                  <div className="className">{getRuneName(0)}</div>
                </i>
              </Tooltip>
              <Tooltip
                placement="bottom"
                trigger={['click']}
                bg="#111111"
                padding={3}
                hasArrow
                border="2px solid #2D2B2B"
                borderRadius="15px"
                arrowShadowColor="#2D2B2B"
                label={
                  <CardTooltip>
                    <span className="pl-4 font-light">
                      {' '}
                      <span className="font-bold">Description:</span> {getRuneDes1(1)}{' '}
                    </span>
                    <span className="pl-4 font-bold"> {getRuneDes2(1)} </span>
                  </CardTooltip>
                }
              >
                <i
                  className={`runeDecor runeDecor-column runeBorder-column ${getRuneBorder()}`}
                  style={{ marginRight: '25px' }}
                >
                  <i className={`rune ${getRuneImg(1)}`} />
                  <div className="className">{getRuneName(1)}</div>
                </i>
              </Tooltip>
              <Tooltip
                placement="bottom"
                trigger={['click']}
                bg="#111111"
                padding={3}
                hasArrow
                border="2px solid #2D2B2B"
                borderRadius="15px"
                arrowShadowColor="#2D2B2B"
                label={
                  <CardTooltip>
                    <span className="pl-4 font-light">
                      {' '}
                      <span className="font-bold">Description:</span> {getRuneDes1(2)}{' '}
                    </span>
                    <span className="pl-4 font-bold"> {getRuneDes2(2)} </span>
                  </CardTooltip>
                }
              >
                <i className={`runeDecor runeDecor-column runeBorder-column ${getRuneBorder()}`}>
                  <i className={`rune ${getRuneImg(2)}`} />
                  <div className="className">{getRuneName(2)}</div>
                </i>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  )
}

const IdHeroCard = styled.span`
  font-family: Shopee Display;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 16px;
  width: fit-content;
  margin: 12px;
  padding: 1px 5px;
  background: #19b911;
  border-radius: 5px;
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Block = styled.div`
  margin-top: 44px;
  margin-bottom: 33px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const Text = styled.div`
  font-size: 16px;
  color: #ffffff;
`

const PriceBUSD = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
`
const CardTooltip = styled.div`
  display: flex;
  flex-direction: column;
`

export default HeroesListInDashboard
