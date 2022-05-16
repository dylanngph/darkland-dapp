import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import { Flex, Box } from '@chakra-ui/react'
import { Skeleton } from '@pancakeswap/uikit'
import { RARITY_CODE } from 'components/CardHero/config'
import heroConfig from 'config/constants/gameConfig/heroConfig.json'
import heroBaseStat from 'config/constants/gameConfig/heroBaseStat.json'
import HeroesDetailsRightSession from '../RightSession/HeroesDetailsRightSession'
import HeroesDetailsLeftSession from '../LeftSession/HeroesDetailsLeftSession'
import EggDetailsLeftSession from '../LeftSession/EggDetailsLeftSession'
import EggDetailsRightSession from '../RightSession/EggDetailsRightSession'

interface Props {
  idHero: any
  heroesDetail: any
  isNFT?: boolean
}

const HeroDetails: React.FC<Props> = ({ idHero, heroesDetail, isNFT }) => {
  // const { itemConfig, runeConfig } = useSelector((state: AppState) => state.common)
  if (!heroesDetail.owner)
    return (
      <Flex gridGap={5}>
        <div className="w-full md:w-3/6">
          <Skeleton mb={1} />
          <Skeleton mb={1} />
          <Skeleton />
        </div>
        <div className="w-full md:w-3/6">
          <Skeleton mb={1} />
          <Skeleton mb={1} />
          <Skeleton />
        </div>
      </Flex>
    )

  return (
    <Flex flexWrap='wrap'>
      <Flex flexDirection='column' className='w-full md:w-1/2'>
        <Flex>
          <Flex flexDirection='column' gridGap={10}>
            <Box style={{ fontSize: 20 }}>{ RARITY_CODE[heroesDetail.rarity] } #{idHero}</Box>
            <Box style={{ fontSize: 48, fontWeight: 'bold', textTransform: 'uppercase' }}>{ heroesDetail.name }</Box>
          </Flex>
        </Flex>
        <Box backgroundImage={`url(${heroesDetail.image})`} backgroundRepeat='no-repeat' backgroundPosition='center' backgroundSize='cover' style={{ maxWidth: '500px', width: '100%', height: 500 }} />
      </Flex>
      <Flex flexDirection='column' gridGap={20} className='w-full md:w-2/6'>
        <Flex flexDirection='column' gridGap={20}>
          <BaseTitle>About</BaseTitle>
          <BlockBody>
            <Title>
              Class
            </Title>
            <Title>
              Earning point
            </Title>
          </BlockBody>
        </Flex>
        <Flex flexDirection='column' gridGap={20}>
          <BaseTitle>Base stats</BaseTitle>
          <BlockBody>
            <Flex flex='0 50%'>
              <Title>Hp</Title>
            </Flex>
            <Flex flex='0 50%'>
              <Title>Dmg</Title>
            </Flex>
            <Flex flex='0 50%'>
              <Title>Dps</Title>
            </Flex>
            <Flex flex='0 50%'>
              <Title>Fire rate</Title>
            </Flex>
          </BlockBody>
        </Flex>
        <Flex flexDirection='column' gridGap={20}>
          <BaseTitle>Skill</BaseTitle>
          <BlockBody>asjdaskldjadlk</BlockBody>
        </Flex>
      </Flex>
    </Flex>
  )
}

HeroDetails.defaultProps = {
  isNFT: false,
}

const BlockBody = styled(Flex)`
  background-color: #091749;
  padding: 15px;
  gap: 20px;
  justify-content: space-between;
`

const Title = styled(Box)`
  color: #BCBCBC;
`

const BaseTitle = styled(Box)`
  font-weight: bold;
  font-size: 1.5rem;
`


export default React.memo(HeroDetails)
