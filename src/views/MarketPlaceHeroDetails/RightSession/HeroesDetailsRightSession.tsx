import React from 'react'
import styled from 'styled-components'
import Popup from 'reactjs-popup'
import { Button, Heading, Text, LogoIcon } from 'components/Pancake-uikit'
import PopupSummonHero from 'views/HeroNftDetails/components/PopupSummonHero'
import HeroesDetailsAbout from './HeroesDetailsAbout'
import HeroesDetailsProperty from './HeroesDetailsProperty'
import HeroesDetailsStats from './HeroesDetailsStats'
import SalesHistory from './SalesHistory'

const HeroesDetailsRightSession = ({
  id,
  heroesDetails,
  heroConfig,
  heroBaseStat,
  runeConfig,
  itemConfig,
}) => {
  const listItems = [
    heroesDetails && heroesDetails?.items && itemConfig[heroesDetails?.items[0] - 1],
    heroesDetails &&
      heroesDetails?.items &&
      heroesDetails?.items[1] !== 0 &&
      itemConfig[heroesDetails?.items[1] - 1],
    heroesDetails &&
      heroesDetails?.items &&
      heroesDetails?.items[2] !== 0 &&
      itemConfig[heroesDetails?.items[2] - 1],
  ]

  return (
    <div>
      {/* <div className="flex flex-row-reverse">
        <Button>
          Purchase Now
        </Button>
        <h1 className="pr-5 text-2xl mt-2" style={{ color: '#FFAB04', fontWeight: 'bold' }}>
          150 BUSD
        </h1>
        <img className="h-8 w-8 mt-2" src="/images/coins/busd.png" alt="BUSD" />
      </div> */}
      <Block>
        <HeroesDetailsAbout detailsAbout={heroesDetails} />
        <HeroesDetailsProperty
          heroesProperties={heroesDetails}
          runeConfig={runeConfig}
          itemConfig={itemConfig}
        />
        <HeroesDetailsStats itemConfig={listItems} heroBaseStat={heroBaseStat} />
        <SalesHistory id={id} />
      </Block>
    </div>
  )
}

// const Header = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
// `

const Block = styled.div`
  margin-top: 10px;
  margin-bottom: 33px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export default HeroesDetailsRightSession
