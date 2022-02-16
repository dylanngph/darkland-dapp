import React from 'react'
import styled from 'styled-components'
import StatsNumber from './StatsNumber'
import StatsChart from './StatsChart'

const HeroesDetailsStats = ({ itemConfig, heroBaseStat }) => {

  const getStatType = (statName) => {
    if (statName) {
      switch (statName) {
        case 'ad':
          return heroBaseStat?.attackDamage
        case 'as':
          return heroBaseStat?.attackSpeed
        case 'ap':
          return heroBaseStat?.abilityPower
        case 'mana':
          return heroBaseStat?.mana
        case 'hp':
          return heroBaseStat?.heath
        case 'armor':
          return heroBaseStat?.armor
        case 'mr':
          return heroBaseStat?.magicResist
        case 'dc':
          return heroBaseStat?.dodgeChance
        case 'crit':
          return heroBaseStat?.critChance
        case 'msp':
          return heroBaseStat?.moveSpeed
        default:
          return heroBaseStat?.mana
      }
    }
    return heroBaseStat?.mana
  }


  const calStat = (statName) => {
    const filterItem = itemConfig.filter((item) => item !== false)
    const baseStats = getStatType(statName)
    let item1Stat1 = 0;
    let item1Stat2 = 0;
    let item2Stat1 = 0;
    let item2Stat2 = 0;
    let item3Stat1 = 0;
    let item3Stat2 = 0;
    if (filterItem && filterItem[0] && filterItem[0]?.codeStat1 === statName) {
      item1Stat1 = filterItem[0].valueStat1
    }
    if (filterItem && filterItem[0] && filterItem[0]?.codeStat2 === statName) {
      item1Stat2 = filterItem[0].valueStat2
    }
    if (filterItem.length > 1) {
      if (filterItem && filterItem[1] && filterItem[1].codeStat1 === statName) {
        item2Stat1 = filterItem[1].valueStat1
      }
      if (filterItem && filterItem[1] && filterItem[1].codeStat2 === statName) {
        item2Stat2 = filterItem[1].valueStat2
      }
    }
    if (filterItem.length > 2) {
      if (filterItem && filterItem[2] && filterItem[2].codeStat1 === statName) {
        item3Stat1 = filterItem[2].valueStat1
      }
      if (filterItem && filterItem[2] && filterItem[2].codeStat2 === statName) {
        item3Stat2 = filterItem[2].valueStat2
      }
    }
    return baseStats + item1Stat1 + item1Stat2 + item2Stat1 + item2Stat2 + item3Stat1 + item3Stat2
  }

  const calStat2 = (statName) => {
    const filterItem = itemConfig.filter((item) => item !== false)
    const baseStats = getStatType(statName)
    let item1Stat1 = 0;
    let item1Stat2 = 0;
    let item2Stat1 = 0;
    let item2Stat2 = 0;
    let item3Stat1 = 0;
    let item3Stat2 = 0;
    if (filterItem && filterItem[0] && filterItem[0]?.codeStat1 === statName) {
      item1Stat1 = filterItem[0].valueStat1
    }
    if (filterItem && filterItem[0] && filterItem[0]?.codeStat2 === statName) {
      item1Stat2 = filterItem[0].valueStat2
    }
    if (filterItem.length > 1) {
      if (filterItem && filterItem[1] && filterItem[1].codeStat1 === statName) {
        item2Stat1 = filterItem[1].valueStat1
      }
      if (filterItem && filterItem[1] && filterItem[1].codeStat2 === statName) {
        item2Stat2 = filterItem[1].valueStat2
      }
    }
    if (filterItem.length > 2) {
      if (filterItem && filterItem[2] && filterItem[2].codeStat1 === statName) {
        item3Stat1 = filterItem[2].valueStat1
      }
      if (filterItem && filterItem[2] && filterItem[2].codeStat2 === statName) {
        item3Stat2 = filterItem[2].valueStat2
      }
    }
    return baseStats * (1 + (item1Stat1 + item1Stat2 + item2Stat1 + item2Stat2 + item3Stat1 + item3Stat2)/100)
  }

  const data = [
    heroBaseStat ? (calStat("ad")/150 * 100) : 70,
    heroBaseStat ? (calStat2("as")/2.5 * 100) : 59,
    heroBaseStat ? (calStat("ap")/160 * 100) : 90,
    heroBaseStat ? (calStat("hp")/300 * 100) : 56,
    heroBaseStat ? (calStat("mr")/150 * 100) : 81,
    heroBaseStat ? (calStat("armor")/150	* 100) : 81
    ]


  return (
    <Card >
      <h1 className="text-white font-bold text-2xl pb-3" > Stats </h1>
      <CardBody className="flex flex-col sm:flex-col md:flex-col xl:flex-row " >
        <StatsChart data={data} />
        <StatsNumber ad={calStat("ad")} ap={calStat("ap")} asp={calStat2("as")} hp={calStat("hp")} mr={calStat("mr")} arm={calStat("armor")} />
      </CardBody>
    </Card>
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
  width: 100%;
  @media screen and (max-width: 1100px) {
    width: 95%;
  }
  @media screen and (max-width: 1280px) {
    width: 96%;
  }
`

export default HeroesDetailsStats;