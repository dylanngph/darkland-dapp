import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import '../../HeroesCard/heroesCard.modules.scss'
import '../heroesDetails.modules.scss'
import { Flex } from '@chakra-ui/react'
import C from '../../HeroesCard/Assets/C.svg'
import R from '../../HeroesCard/Assets/R.svg'
import SR from '../../HeroesCard/Assets/SR.svg'
import SSR from '../../HeroesCard/Assets/SSR.svg'

const HeroesMovement = ({ id, heroesDetails, heroConfig }) => {
  const [heroName, setHeroName] = useState(null)
  const [frame, setFrame] = useState(null)
  const [isFrame, setIsFrame] = useState(false)
  useEffect(() => {
    setHeroName(heroConfig.name)
    setFrame(`https://cdn.heroestd.io/HeroAnims/${heroName}.html`)
    if (frame !== null) {
      setIsFrame(true)
    } 
  }, [heroConfig, heroName, frame, isFrame])

  const getHeroImg = () => {
    return `heroes-${heroesDetails?.heroId}`
  }

  const getHeroGenName = () => {
    if (heroesDetails) {
      switch (heroesDetails?.gen) {
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

  const getHeroGenFullName = () => {
    if (heroesDetails) {
      switch (heroesDetails?.gen) {
        case 0:
          return 'COMMON'
        case 1:
          return 'RARE'
        case 2:
          return 'EPIC'
        case 3:
          return 'LEGENDARY'
        default:
          return 'COMMON'
      }
    }
    return ''
  }

  const getHeroGenImageSrc = () => {
    if (heroesDetails) {
      switch (heroesDetails?.gen) {
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

  const getLevelDecor = () => {
    return `cardElement-level_decor${heroesDetails?.heroClass}`
  }

  return (
    <Card>
      <div className="flex flex-row">
        {/* <i className={`mt-4 levelDecor badge ${getLevelDecor()}`} style={{ marginRight: '25px', marginLeft: '0px' }}>
          <div className="badge-text">{getHeroGenName()}</div>
        </i> */}
        <img
          src={getHeroGenImageSrc()}
          alt="test"
          style={{ width: '43px', height: '55px', marginRight: '12px' }}
        />
        <div>
          <Flex gridGap={2} mb={2} alignItems="center">
            <h1 className='text-xl font-bold' > {heroName} </h1>{(heroesDetails?.tag === 0 || heroesDetails?.author === 'Origin') ? <Origin>Origin</Origin> : null }
          </Flex>
          <Flex>
            <h1 className="text-hero-id text-white">#{heroesDetails?.tokenId || id}</h1>
          </Flex>
        </div>
      </div>
      <Frame >
        {isFrame !== false ? <iframe
          id="hero-frame"
          scrolling="no"
          title="first move"
          width="100%"
          height="400px"
          key={heroName}
          src={`https://cdn.heroestd.io/HeroAnims/${heroConfig?.name}.html`}
          className="ng-star-inserted"
        /> : <LoadingContain  >
          <Loading />
        </LoadingContain>}
      </Frame>
    </Card>
  )
}

const CardBody = styled.div`
  background-color: #242424;
  position: relative;
  border: 2px solid #414145;
  padding: 15px 10px;
`

const Card = styled.div`
  margin: 10px;
  height: auto;
`

const Frame = styled.div`
  border: none;
  width: 100%;
  height: auto;
  z-index: 1;
  margin-top: 15px;
`

const Origin = styled.div`
  min-width: auto;
  max-width: 85px;
  background: linear-gradient(270deg, #FDC747 0%, #FE335B 0.01%, #DF222B 105.1%);
  color: white;
  border-radius: 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 0 10px;
  font-size: 14px;
  line-height: 22px;
  height: 20px;
  text-transform: uppercase;
  font-weight: bold;
`
const LoadingContain = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: center;
  height: 400px;

`

const Loading = styled.div`
  border: 8px solid #f3f3f3;
  border-radius: 50%;
  border-top: 8px solid #ddd;
  border-bottom: 8px solid #ddd;
  width: 100px;
  height: 100px;
  margin-top: 150px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export default HeroesMovement
