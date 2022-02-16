import React from 'react'
import Page from 'components/Layout/Page'
import styled from 'styled-components'
import { Tooltip } from '@chakra-ui/react'
import '../../HeroesCard/heroesCard.modules.scss'
import '../heroesDetails.modules.scss'

const HeroesDetailsProperty = ({ heroesProperties, runeConfig, itemConfig }) => {

  const getId = () => {
    if (heroesProperties) {
      return heroesProperties?._id
    }
    return ''
  }

  const getOriginBG = () => {
    if (heroesProperties) {
      const number = (heroesProperties?.heroOrigin).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
      return `cardElement-Origin${number}`
    }
    return ''
  }

  const getHeroImg = () => {
    return `heroes-${heroesProperties?.heroId}`
  }

  const getItemImg = (index: number) => {
    if (heroesProperties) {
      if (heroesProperties?.items) {
        return `cardElement-item${heroesProperties?.items[index]}`
      }
    }
    return ''
  }

  const getItemBorder = () => {
    return `itemDecor-item_decor${heroesProperties?.heroClass}`
  }

  const getRuneBorder = () => {
    return `runeDecor-rune_decor${heroesProperties?.heroClass}`
  }

  const getRuneImg = (index: number) => {
    if (heroesProperties && heroesProperties?.runes) {
      return `cardElement-rune${heroesProperties?.runes[index]}`
    }
    return ''
  }

  const getRuneName = (index: number) => {
    if (heroesProperties && heroesProperties?.runes) {
      if(runeConfig && runeConfig[heroesProperties?.runes[index] - 1]){
        return runeConfig[heroesProperties?.runes[index] - 1].name
      }
    }
    return ''
  }

  const getItemName = (index: number) => {
    if (heroesProperties && heroesProperties?.items) {
      if(itemConfig && itemConfig[heroesProperties?.items[index] - 1]){
        return itemConfig[heroesProperties?.items[index] - 1].name
      }
    }
    return ''
  }

  const getItemStat1 = (index: number) => {
    if (heroesProperties && heroesProperties?.items) {
      // console.log("here is item", itemConfig[heroesProperties?.items[index] - 1])
      if(itemConfig && itemConfig[heroesProperties?.items[index] - 1]){
        return `+ ${itemConfig[heroesProperties?.items[index] - 1].stat1}`
      }
    }
    return ''
  }

  const getItemStat2 = (index: number) => {
    if (heroesProperties && heroesProperties?.items) {
      if(itemConfig && itemConfig[heroesProperties?.items[index] - 1]){
        if (itemConfig[heroesProperties?.items[index] - 1].stat2 !== '') {
          return `+ ${itemConfig[heroesProperties?.items[index] - 1].stat2}`
        }
      }

    }
    return ''
  }

  const getRuneDes1 = (index: number) => {
    if (heroesProperties && heroesProperties?.runes) {
      if(runeConfig && runeConfig[heroesProperties?.runes[index] - 1]){
        return `${runeConfig[heroesProperties?.runes[index] - 1].des}`
      }
    }
    return ''
  }

  const getRuneDes2 = (index: number) => {
    if (heroesProperties && heroesProperties?.runes) {
      if(runeConfig && runeConfig[heroesProperties?.runes[index] - 1]){
        return `${runeConfig[heroesProperties?.runes[index] - 1].des2}`
      }
    }
    return ''
  }

  const getLevelDecor = () => {
    return `cardElement-level_decor${heroesProperties?.heroClass}`
  }

  const getClassName = () => {
    if (heroesProperties) {
      switch (heroesProperties?.heroClass) {
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

  const getOriginImg = () => {
    return `cardElement-Origin_Icon_${heroesProperties?.heroOrigin}`
  }

  const getOriginDecorLine = () => {
    return `cardElement-line_decor${heroesProperties?.heroClass}`
  }

  const getHeroAttackType = () => {
    return `attackType-${heroesProperties?.targetType}`
  }

  const getClassImg = () => {
    return `cardElement-Class_Icon${heroesProperties?.heroClass}`
  }

  const getAttackTypeImg = () => {
    return `cardElement-Class_Icon${heroesProperties?.targetType}`
  }

  const getClassBorder = () => {
    if (heroesProperties) {
      const number = (heroesProperties?.heroClass).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
      return `cardElement-Class${number}`
    }
    return ''
  }

  const getHeroGenName = () => {
    if (heroesProperties) {
      switch (heroesProperties?.gen) {
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

  const gettargetType = () => {
    if (heroesProperties) {
      switch (heroesProperties?.targetType) {
        case 1:
          return 'Front'
        case 2:
          return 'Strong'
        case 3:
          return 'Weak'
        case 4:
          return 'Random'
        default:
          return 'Enemy'
      }
    }
    return ''
  }

  const getOriginName = () => {
    if (heroesProperties) {
      switch (heroesProperties?.heroOrigin) {
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

  return (
    <Card className="w-full" >
      <h1 className="text-white font-bold text-2xl pb-3">Heroes Properties</h1>
      <CardBody className="w-full" >
        <div className="flex flex-row flex-wrap justify-between p-2" >
          <div>
            <h1 className="font-bold" style={{ color: "#00A3FF" }}>Class</h1>
            <TextPadding className="flex flex-row" style={{ position: "relative"}}>
              <div className="pointer-events-none" style={{ position: "absolute", left:"5px"}} >
                <i style={{ transform: "scale(1)" }}
                  className={`classIcon top-properties-classImg ${getClassImg()}`}
                />
              </div>
              <span className="text-white font-bold ml-16" >{getClassName()}</span>
            </TextPadding>
          </div>
          <div>
            <h1 className="font-bold" style={{ color: "#EB00FF" }} >Origins</h1>
            <TextPadding className="flex flex-row" style={{ position: "relative"}} >
              <div className="top-properties-img pointer-events-none" style={{ position: "absolute"}}>
                <i style={{ transform: "scale(1)" , position: "relative", top: "23px", left: "15px"}}
                  className={`originIcon ${getOriginImg()}`}
                />
              </div>
              <p className="text-white font-bold ml-16"> {getOriginName()} </p>
            </TextPadding>
          </div>
          <div>
            <h1 className="text-header font-bold">Target</h1>
            <TextPadding className="flex flex-row" style={{ position: "relative" }} >
              <div className="pointer-events-none pl-3">
                <i
                  className={`attackType-detail ${getHeroAttackType()}`} />
              </div>
              <p className="text-white font-bold" style={{ position: "absolute", right: "25%", top: "25%" }} >{gettargetType()}</p>
            </TextPadding>
          </div>
        </div>
        <div className="flex flex-row flex-wrap p-2" >
          <div className="w-full sm:w-full md:w-3/6 lg:w-3/6" >
            <div className="flex flex-row" >
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
                    <span className="pl-4" style={{ color: "#FFC247" }} > {getItemName(0)}: </span>
                    <span className="pl-4" > {getItemStat1(0)} </span>
                    <span className="pl-4" > {getItemStat2(0)} </span>
                  </CardTooltip>
                } >
                <i
                  className={`itemDecor itemBorder ${getItemBorder()}`}
                >
                  <i
                    className={`item ${getItemImg(0)}`}
                  />
                </i>
              </Tooltip>
              <span className="pl-4" > {getItemName(0)} </span>
            </div>

            {heroesProperties && heroesProperties?.items && heroesProperties?.items[1] !== 0 && <div className="mt-5 flex flex-row" >
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
                    <span className="pl-4" style={{ color: "#FFC247" }} > {getItemName(1)}: </span>
                    <span className="pl-4" > {getItemStat1(1)} </span>
                    <span className="pl-4" > {getItemStat2(1)} </span>
                  </CardTooltip>
                } >
                <i
                  className={`itemDecor itemBorder ${getItemBorder()}`}
                >
                  <i
                    className={`item ${getItemImg(1)}`}
                  />
                </i>
              </Tooltip>

              <span className="pl-4" > {heroesProperties && heroesProperties?.items && heroesProperties?.items[1] === 0 ? 'no items' : getItemName(1)} </span>
            </div>}
            {heroesProperties && heroesProperties?.items && heroesProperties?.items[2] !== 0 &&
              <div className="mt-5 flex flex-row" >
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
                      <span className="pl-4" style={{ color: "#FFC247" }} > {getItemName(2)}: </span>
                      <span className="pl-4" > {getItemStat1(2)} </span>
                      <span className="pl-4" > {getItemStat2(2)} </span>
                    </CardTooltip>
                  } >
                  <i
                    className={`itemDecor itemBorder ${getItemBorder()}`}
                  >
                    <i
                      className={`item ${getItemImg(2)}`}
                    />
                  </i>
                </Tooltip>
                <span className="pl-4" > {heroesProperties && heroesProperties?.items && heroesProperties?.items[2] === 0 ? 'no items' : getItemName(2)} </span>
              </div>}
          </div>
          <div className="w-full sm:w-full md:w-3/6 lg:w-3/6" >
            <div className="mt-1 flex flex-row">
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
                    <span className="pl-4 font-light" > <span className="font-bold" >Description:</span>  {getRuneDes1(0)} </span>
                    <span className="pl-4 font-bold" > {getRuneDes2(0)} </span>
                  </CardTooltip>
                } >
                <i
                  className={`runeDecor runeBorder ${getRuneBorder()}`}
                  style={{ marginRight: '25px' }}
                >
                  <i
                    className={`rune ${getRuneImg(0)}`}
                  />
                </i>
              </Tooltip>

              <span>
                {getRuneName(0)}
              </span>
            </div>
            {heroesProperties && heroesProperties?.runes && heroesProperties?.runes[1] !== 0 && <div className="mt-6 flex flex-row">
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
                    <span className="pl-4 font-light" > <span className="font-bold" >Description:</span>  {getRuneDes1(1)} </span>
                    <span className="pl-4 font-bold" > {getRuneDes2(1)} </span>
                  </CardTooltip>
                } >
                <i
                  className={`runeDecor runeBorder ${getRuneBorder()}`}
                  style={{ marginRight: '25px' }}
                >
                  <i
                    className={`rune ${getRuneImg(1)}`}
                  />
                </i>
              </Tooltip>
              <span>
                {heroesProperties && heroesProperties?.runes && heroesProperties?.runes[1] === 0 ? 'no runes' : getRuneName(1)}
              </span>
            </div>}
            {heroesProperties && heroesProperties?.runes && heroesProperties?.runes[2] !== 0 && <div className="mt-6 flex flex-row">
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
                    <span className="pl-4 font-light" > <span className="font-bold" >Description:</span>  {getRuneDes1(2)} </span>
                    <span className="pl-4 font-bold" > {getRuneDes2(2)} </span>
                  </CardTooltip>
                } >
                <i
                  className={`runeDecor runeBorder ${getRuneBorder()}`}
                  style={{ marginRight: '25px' }}
                >
                  <i
                    className={`rune ${getRuneImg(2)}`}
                  />
                </i>
              </Tooltip>

              <span>
                {heroesProperties && heroesProperties?.runes && heroesProperties?.runes[2] === 0 ? 'no runes' : getRuneName(2)}
              </span>
            </div>}
          </div>
        </div>
      </CardBody>
    </Card >
  );
};

const CardBody = styled.div`
  background-color: #242424;
  position: relative;
  border: 2px solid #414145;
  padding: 15px 10px;
`

const Card = styled.div`
  margin: 10px;
`

const CardTooltip = styled.div`
  display: flex;
  flex-direction: column;
`

const TextPadding = styled.div`
  background-color: #484848;
  padding: 8px 15px 0px 0px;
  border-radius: 8px;
  height: 40px;
`

export default HeroesDetailsProperty;
