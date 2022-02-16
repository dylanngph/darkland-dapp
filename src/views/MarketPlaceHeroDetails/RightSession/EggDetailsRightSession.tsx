import React from 'react'
import styled from 'styled-components'
import Popup from 'reactjs-popup'
import { Button, Heading, Text, LogoIcon } from 'components/Pancake-uikit'
import PopupSummonHero from 'views/HeroNftDetails/components/PopupSummonHero'
import HeroesDetailsAbout from './HeroesDetailsAbout'
import HeroesDetailsProperty from './HeroesDetailsProperty'
import HeroesDetailsStats from './HeroesDetailsStats'
import SalesHistory from './SalesHistory'
import EggDetailsAbout from './EggDetailsAbout'
import EggParents from './EggParents'

const EggDetailsRightSession = ({ id, heroesDetails }) => {
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
        <EggDetailsAbout detailsAbout={heroesDetails} />
        <EggParents heroesDetails={heroesDetails} />
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

const CardBody = styled.div`
  background-color: #242424;
  position: relative;
  border: 2px solid #414145;
  padding: 15px 10px;
`

const Card = styled.div`
  margin: 10px;
`

export default EggDetailsRightSession
