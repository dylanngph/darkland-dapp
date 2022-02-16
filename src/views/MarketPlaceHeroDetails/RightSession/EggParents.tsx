import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { fetchAttributeHero2 } from 'utils/getAttributeHero'
import HeroesCard from 'views/HeroesCard'
import heroConfig from 'config/constants/gameConfig/heroConfig.json'

const EggParents = ({ heroesDetails }) => {
  const [firstParentsDetails, setFirstParentDetails] = useState(undefined)
  const [secondParentsDetails, setScondParentsDetails] = useState(undefined)

  useEffect(() => {
    const fetchDataFirstParentsDetails = async () => {
      try {
        const res: any = await fetchAttributeHero2(heroesDetails.parent1 || 60)
        setFirstParentDetails({ ...res, name: heroConfig[res.heroId - 1].name, eggGen: undefined })
      } catch (error) {
        console.log('error here', error)
      }
    }

    const fetchDataSecondParentsDetails = async () => {
      try {
        const res: any = await fetchAttributeHero2(heroesDetails.parent2 || 61)
        setScondParentsDetails({ ...res, name: heroConfig[res.heroId - 1].name, eggGen: undefined })
      } catch (error) {
        console.log('error here', error)
      }
    }

    fetchDataFirstParentsDetails()
    fetchDataSecondParentsDetails()
  }, [heroesDetails])

  return (
    <Card className="w-full">
      <h1 className="text-white font-bold text-2xl pb-3">Parents</h1>
      <CardBody className="flex flex-row">
        {firstParentsDetails && (
          <ParentWrapper className="m-2">
            <HeroesCard hero={firstParentsDetails} summonHero />
          </ParentWrapper>
        )}
        {secondParentsDetails && (
          <ParentWrapper className="m-2">
            <HeroesCard hero={secondParentsDetails} summonHero />
          </ParentWrapper>
        )}
      </CardBody>
    </Card>
  )
}

const ParentWrapper = styled.div`
  border: 2px solid #414145;
  border-radius: 4px;
`

const CardBody = styled.div`
  position: relative;
  min-height: 150px;
  max-height: 450px;
`

const Card = styled.div`
  margin: 10px;
`

export default EggParents
