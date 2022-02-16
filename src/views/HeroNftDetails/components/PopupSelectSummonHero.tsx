/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import Wrapper from 'components/Popup/Wrapper'
import { Text, Box, Flex, Input, InputGroup, InputRightAddon } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { Button } from 'components/Pancake-uikit'
import styled from 'styled-components'
import { formatNumber } from 'utils/formatBalance'
import Fee from 'components/Popup/Fee'
import HeroesCard from 'views/HeroesCard'
import summonCGC from 'assets/images/summonCGC.png'
import CGC from 'assets/images/CGC.png'
import unknownSummonHero from 'assets/images/unknownSummonHero.png'
import HTDSummon from 'assets/images/HTDSummon.png'
import Popup from 'reactjs-popup'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState, useAppDispatch } from 'state'
import { mapHeroData } from 'utils/mapHeroData'
import { fetchHeroConfig } from 'state/common/commonSlice'
import fetchAttributeHero, { fetchAttributeHero2 } from 'utils/getAttributeHero'
import HeroesCardWrapper from 'views/HeroesCard/HeroesCardWrapper'
import HeroesCardWrapperSummon from 'views/HeroesCard/HeroesCardWrapperSummon'
import SearchInput from 'components/SearchInput'
import { filter, remove } from 'lodash'

const SummonCGCCard = () => {
  return (
    <div style={{ position: 'relative' }}>
      <img src={summonCGC} alt="summonCGC" />
      <img style={{ position: 'absolute', top: '56px', left: '120px' }} src={CGC} alt="CGC" />
      <Text style={{ position: 'absolute', top: '140px', left: '140px' }}>
        <Text as="span" fontWeight="bold" textColor="yellow.500">
          0
        </Text>
        /800
      </Text>
    </div>
  )
}

// const mockHeroTokenId = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

const PopupSelectSummonHero = ({ close, onSelectHero, secondHeroDetails, firstHeroDetails, isChangingFirstHero }) => {
  const [heroList, setHeroList] = useState([])
  const [filteredHeroList, setFilteredHeroList] = useState([])
  const [resErr, setResErr] = useState(false)
  const [searchingInput, setSearchingInput] = useState('')
  const { heroData } = useSelector((state: AppState) => state.hero)
  const { heroConfig, isLogin } = useSelector((state: AppState) => state.common)
  
  useEffect(() => {
    const fetchData = async () => {
      const dataHeroMapping = mapHeroData(heroData, heroConfig)
      if (firstHeroDetails) {
        remove(dataHeroMapping, (hero: any) => hero?._id === firstHeroDetails._id)
      }
      setHeroList(dataHeroMapping)
    }
    fetchData()
  }, [heroData, heroConfig])
  
  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    let tmpHeroList = []
    setSearchingInput(value)
    if (Number.isNaN(Number(value))) {
      tmpHeroList = filter(heroList, (hero: any) => hero.name.toLowerCase().includes(value))
    } else {
      tmpHeroList = filter(heroList, (hero: any) => String(hero.tokenId).includes(value))
    }
    setFilteredHeroList(tmpHeroList)
  }

  return (
    <div style={{ background: '#151419', color: 'white', position: 'relative', minWidth: "600px" }}>
      <Container>
        <Flex>
          <Text fontSize={30} fontWeight={700}>
            Please select {isChangingFirstHero ? "first" : "second" } hero
          </Text>
        </Flex>
        <Box
          cursor="pointer"
          sx={{
            '&:hover': {
              opacity: '.8',
            },
          }}
          style={{ position: 'absolute', right: '40px' }}
          onClick={close}
        >
          <CloseIcon />
        </Box>
      </Container>
      <Flex flexDirection="row" gridGap={5} justifyContent="center" alignItems="center" padding={5}>
        <Flex
          flexDirection="column"
          gridGap={5}
          justifyContent="center"
          alignItems="end"
          padding={5}
          style={{ maxWidth: '1000px' }}
        >
          <SearchInput onChange={handleChangeQuery} placeholder="Hero Name, ID" />
          <HeroesCardWrapperSummon
            heroes={filteredHeroList.length > 0 ? filteredHeroList : heroList}
            onSelectHero={onSelectHero}
            secondHeroDetails={secondHeroDetails}
          />
          {/* {heroList?.map(item => 
            <HeroesCard hero={item} summonHero />
          )} */}
          {/* <HeroesCard hero={heroesDetail} summonHero /> */}
          <div style={{ height: '24px' }} />
        </Flex>
      </Flex>
    </div>
  )
}

const WrapperSummonHero = styled(Wrapper)`
  background-color: #111111;
`

const Container = styled(Box)`
  padding: 20px 30px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export default PopupSelectSummonHero
