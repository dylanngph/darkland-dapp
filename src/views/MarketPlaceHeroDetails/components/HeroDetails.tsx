import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import { Flex, Box } from '@chakra-ui/react'
import { Skeleton } from '@pancakeswap/uikit'
import { RARITY_CODE, CLASS_IMG } from 'components/CardHero/config'
import { formatNumber } from 'utils/formatBalance'
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
          <Flex flexDirection='column'>
            <Box style={{ fontSize: 20 }}>{ RARITY_CODE[heroesDetail.rarity] } #{idHero}</Box>
            <Box style={{ fontSize: 48, fontWeight: 'bold', textTransform: 'uppercase' }}>{ heroesDetail.name }</Box>
          </Flex>
        </Flex>
        <Box backgroundImage={`url(${heroesDetail.image})`} backgroundRepeat='no-repeat' backgroundPosition='center' backgroundSize='cover' style={{ maxWidth: '500px', width: '100%', height: 500 }} />
      </Flex>
      <Flex flexDirection='column' gridGap={2} className='w-full md:w-1/2'>
        <Flex flexDirection='column' gridGap={3}>
          <BaseTitle>About</BaseTitle>
          <BlockBody>
            <Flex flexDirection='column' gridGap={1}>
              <Title>Class</Title>
              <Box>{ CLASS_IMG[heroesDetail.classType] }</Box>
            </Flex>
            <Flex flexDirection='column' gridGap={1}>
              <Title>Level</Title>
              <Box>{ heroesDetail.level }</Box>
            </Flex>
            <Flex flexDirection='column' gridGap={1}>
              <Title>Earning point</Title>
              <Box>---</Box>
            </Flex>
          </BlockBody>
        </Flex>
        <Flex flexDirection='column' gridGap={3}>
          <BaseTitle>Base stats</BaseTitle>
          <BlockBody>
            <Flex flex='0 50%' flexDirection='column' gridGap={1}>
              <Title>Hp</Title>
              <Box>{formatNumber(heroesDetail.hp)}</Box>
            </Flex>
            <Flex flex='0 50%' flexDirection='column' gridGap={1}>
              <Title>Dmg</Title>
              <Box>{heroesDetail.dame}</Box>
            </Flex>
            <Flex flex='0 50%' flexDirection='column' gridGap={1}>
              <Title>Dps</Title>
              <Box>{formatNumber(heroesDetail.atkSpeed)}</Box>
            </Flex>
            <Flex flex='0 50%' flexDirection='column' gridGap={1}>
              <Title>Fire rate</Title>
              <Box>{formatNumber(heroesDetail.critDame)}</Box>
            </Flex>
          </BlockBody>
        </Flex>
        <Flex flexDirection='column' gridGap={3}>
          <BaseTitle>Skill</BaseTitle>
          <BlockBody>---</BlockBody>
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
