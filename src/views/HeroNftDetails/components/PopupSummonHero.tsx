import React, { ChangeEvent, useState } from 'react'
import Wrapper from 'components/Popup/Wrapper'
import { Text, Box, Flex, Input, InputGroup, InputRightAddon } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { Button } from 'components/Pancake-uikit'
import heroConfig from 'config/constants/gameConfig/heroConfig.json'
import styled from 'styled-components'
import { formatNumber } from 'utils/formatBalance'
import Fee from 'components/Popup/Fee'
import HeroesCard from 'views/HeroesCard'
import summonCGC from 'assets/images/summonCGC.png'
import CGC from 'assets/images/CGC.png'
import unknownSummonHero from 'assets/images/unknownSummonHero.png'
import HTDSummon from 'assets/images/HTDSummon.png'
import Popup from 'reactjs-popup'
import PopupSelectSummonHero from './PopupSelectSummonHero'

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

const PopupSummonHero = ({ close, heroesDetail }) => {
  const [secondHeroDetails, setSecondHeroDetails] = useState()
  const [firstHeroDetails, setFirstHeroDetails] = useState({...heroesDetail, name: heroConfig[heroesDetail.heroId - 1].name})
  return (
    <div style={{ background: '#111111', color: 'white', position: 'relative' }}>
      <Container>
        <Flex>
          <Text fontSize={30} fontWeight={700}>
            Please select hero
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
          alignItems="center"
          padding={5}
        >
          <HeroesCard hero={firstHeroDetails} summonHero />
          <Popup
            className="w-full"
            modal
            trigger={
              <Text style={{ cursor: 'pointer' }} color="#00A3FF">
                Click to change
              </Text>
            }
          >
            {(closeSummon) => (
              <PopupSelectSummonHero
                close={closeSummon}
                isChangingFirstHero
                onSelectHero={setFirstHeroDetails}
                secondHeroDetails={firstHeroDetails}
                firstHeroDetails={secondHeroDetails}
              />
            )}
          </Popup>
        </Flex>
        <SummonCGCCard />

        {secondHeroDetails ? (
          <Flex
            flexDirection="column"
            gridGap={5}
            justifyContent="center"
            alignItems="center"
            padding={5}
          >
            <HeroesCard hero={secondHeroDetails} summonHero />

            <Popup
              className="w-full"
              modal
              trigger={
                <Text style={{ cursor: 'pointer' }} color="#00A3FF">
                  Click to change
                </Text>
              }
            >
              {(closeSummon) => (
                <PopupSelectSummonHero
                  close={closeSummon}
                  isChangingFirstHero={false}
                  onSelectHero={setSecondHeroDetails}
                  secondHeroDetails={secondHeroDetails}
                  firstHeroDetails={firstHeroDetails}
                />
              )}
            </Popup>
          </Flex>
        ) : (
          <Flex
            flexDirection="column"
            gridGap={5}
            justifyContent="center"
            alignItems="center"
            padding={5}
          >
            <img src={unknownSummonHero} alt="unknownSummonHero" />

            <Popup
              className="w-full"
              modal
              trigger={
                <Text style={{ cursor: 'pointer' }} color="#00A3FF">
                  Click to select hero
                </Text>
              }
            >
              {(closeSummon) => (
                <PopupSelectSummonHero
                  isChangingFirstHero={false}
                  close={closeSummon}
                  onSelectHero={setSecondHeroDetails}
                  secondHeroDetails={secondHeroDetails}
                  firstHeroDetails={firstHeroDetails}
                />
              )}
            </Popup>
          </Flex>
        )}
      </Flex>

      <Text color="#878686" fontSize={16} fontWeight={500}>
        <Flex
          flexDirection="row"
          gridGap={1}
          justifyContent="center"
          alignItems="center"
          padding={5}
        >
          SUMMON FEE: <Text textColor="yellow.500">5</Text> <img src={HTDSummon} alt="HTDSummon" />
        </Flex>
      </Text>
      <Flex flexDirection="row" gridGap={1} justifyContent="center" alignItems="center" padding={5}>
        <Button>Let&rsquo;s Summon</Button>
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

export default PopupSummonHero
