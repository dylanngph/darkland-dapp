import React, { useMemo, useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import styled from 'styled-components'
import { Flex } from '@chakra-ui/react'
import { useTranslation } from 'contexts/Localization'
import './heroesCard.modules.scss'
import { heroesClassName, heroesOriginName } from 'contants'
import C from './Assets/C.svg'
import R from './Assets/R.svg'
import SR from './Assets/SR.svg'
import SSR from './Assets/SSR.svg'
import EggCard from './EggCard'

const HeroesCard = ({ hero, size = 'large', summonHero = false }) => {
  const { t } = useTranslation()
  const getId = () => {
    if (hero) {
      return hero?._id
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

  const getOriginBorder = () => {
    return `originDecor-Origin_decor${hero?.heroClass}`
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
    if (hero) return heroesClassName[hero?.heroClass - 1]
    return 'Unknown'
  }

  const getOriginName = () => {
    if (hero) return heroesOriginName[hero?.heroOrigin - 1]
    return 'Unknown'
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
    return `lineDecor-line_decor${hero?.heroClass}`
  }

  const getHeroAttackType = () => {
    return `attackType-${hero?.targetType}`
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
      switch (hero?.gen) {
        case 0:
          return 'C'
        case 1:
          return 'R'
        case 2:
          return 'SR'
        case 3:
          return 'SSR'
        default:
          return 'C'
      }
    }
    return ''
  }

  const getHeroGenImageSrc = () => {
    if (hero) {
      switch (hero?.gen) {
        case 0:
          return C
        case 1:
          return R
        case 2:
          return SR
        case 3:
          return SSR
        default:
          return C
      }
    }
    return ''
  }

  const renderSize = (sizeCard: string) => {
    switch (sizeCard) {
      case 'small':
        return 'scale-30'
      case 'medium':
        return 'scale-50'
      case 'large':
        return ''
      default:
        return ''
    }
  }

  return (
    <>
      {hero.eggGen ? (
        <EggCard heroDetails={hero} />
      ) : (
        <div
          key={hero.id}
          style={summonHero ? { border: 'none' } : {}}
          className={`matCard 
      origin-top-left
      transform ${renderSize(size)} m-0 md:mt-1
      `}
        >
          <div className="nftCard" style={{ padding: '0px', background: 'transparent' }}>
            <i className={`cardElement originBG ${getOriginBG()}`} style={{ cursor: 'pointer' }} />

            <i className={`heroes imgHero pointer-events-none ${getHeroImg()}`} />
            <i
              className={`class classBorder pointer-events-none ${getClassBorder()}`}
              style={{ width: '256' }}
            />
            <i className="mask cardElement-Mask cardMask" style={{ width: '256' }} />
            <div className="infoHolder">
              <img
                src={getHeroGenImageSrc()}
                alt="test"
                style={{ width: '33px', height: '43px', marginLeft: '12px' }}
              />

              <div className="heroDescription">
                <div>
                  <Flex alignItems="center" justifyContent="space-between">
                    <div className="-ml-1 heroName">{getHeroName()}</div>
                    {(hero?.tag === 0 || hero?.author === 'Origin') && (
                      <Origin className="shortDesc" style={{ fontSize: '14px' }}>
                        Origin
                      </Origin>
                    )}
                  </Flex>
                  <Flex
                    alignItems="center"
                    gridGap={2}
                    justifyContent="start"
                    className="mt-2"
                    style={{ width: '105%' }}
                  >
                    <div
                      className="shortDesc -ml-1"
                      style={{
                        minWidth: 'auto',
                        maxWidth: '75px',
                        backgroundColor: '#19B911',
                        color: 'white',
                        borderRadius: '5px',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        padding: '0 5px',
                        fontSize: '14px',
                      }}
                    >
                      #{hero.tokenId ?? hero._id}
                    </div>
                    <div
                      className="shortDesc ml-1"
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
                  </Flex>
                </div>
              </div>
            </div>

            <div className="itemHolder">
              <i className={`itemDecor itemBorder1 ${getItemBorder()}`}>
                <i className={`item ${getItemImg(0)}`} />
              </i>
              <i className={`itemDecor itemBorder2 ${getItemBorder()}`}>
                <i className={`item ${getItemImg(1)}`} />
              </i>
              <i className={`itemDecor ${getItemBorder()}`}>
                <i className={`item ${getItemImg(2)}`} />
              </i>
            </div>
            <div
              className="flex flex-row flex-wrap w-full"
              style={{ position: 'relative', top: '-1450px' }}
            >
              <div className="w-3/6">
                <div className="circle1 pointer-events-none flex flex-col justify-center items-center">
                  <i className={`runeDecor circle1-border ${getRuneBorder()}`}>
                    <i className={`originIcon classImg circle3-image ${getOriginImg()}`} />
                  </i>
                  {/* <div style={{ width: '200%', textAlign: 'center' }}>{getOriginName()}</div> */}
                </div>
              </div>
              <div className="w-3/6">
                <div className="circle3 pointer-events-none flex flex-col justify-center items-center">
                  <i className={`originDecor circle1-border ${getOriginBorder()}`}>
                    <i className={`classIcon classImg circle1-image ${getClassImg()}`} />
                  </i>
                  {/* <div style={{ width: '200%', textAlign: 'center' }}>{getClassName()}</div> */}
                </div>
              </div>
            </div>

            <div className="circle2 pointer-events-none">
              {/* <i
              className={`originIcon circle2-image ${getOriginImg()}`}
            /> */}
              <i className={`attackType circle2-image ${getHeroAttackType()}`} />
              <i className={`lineDecor circle2-line ${getOriginDecorLine()}`} />
            </div>
            <div
              className="runeHolder pointer-events-none"
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <i
                className={`runeDecor runeBorder ${getRuneBorder()}`}
                style={{ marginRight: '25px' }}
              >
                <i className={`rune ${getRuneImg(0)}`} />
              </i>
              <i
                className={`runeDecor runeBorder ${getRuneBorder()}`}
                style={{ marginRight: '25px' }}
              >
                <i className={`rune ${getRuneImg(1)}`} />
              </i>
              <i className={`runeDecor runeBorder ${getRuneBorder()}`}>
                <i className={`rune ${getRuneImg(2)}`} />
              </i>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

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

const Origin = styled.div`
  min-width: auto;
  max-width: 85px;
  background: linear-gradient(270deg, #fdc747 0%, #fe335b 0.01%, #df222b 105.1%);
  color: white;
  border-radius: 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 0 10px;
  font-size: 14px;
  line-height: 20px !important;
  height: 20px;
  text-transform: uppercase;
  font-weight: bold;
`

export default HeroesCard
