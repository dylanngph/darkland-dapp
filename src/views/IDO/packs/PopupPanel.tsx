import {Button, Skeleton} from 'components/Pancake-uikit'
import React, {useEffect, useRef} from 'react'
import styled from 'styled-components'
import {Box} from '@chakra-ui/react'
import {useNftUser} from '../hooks/fetchIDO'
import {ReactComponent as CloseIcon} from './close.svg'
import Filter from './filter/Filter'
import CardHero from '../components/CardHero'

export default ({close, idoId, onSelect}) => {
  const {data, isLoaded} = useNftUser(idoId)

  const selectHero = (tokenId, nftAddress, image, type) => {
    onSelect(tokenId, nftAddress, image, type)
    close()
  }
  return (
    <Wrapper>
      <Container borderBottom="1px solid #525252">
        <Title>Bounty</Title>
        <Box
          cursor="pointer"
          sx={{
            '&:hover': {
              opacity: '.8',
            },
          }}
          onClick={close}
        >
          <CloseIcon />
        </Box>
      </Container>
      {/* <Container>
        <Filter/>
      </Container> */}
      <Container>
        {isLoaded ? (
          <div className="flex flex-col w-full gap-3">
            <Skeleton width="100%" />
            <Skeleton width="70%" />
            <Skeleton width="40%" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-h-full overflow-auto">
            {data.map((d) => (
              <CardHero onClick={() => selectHero(d.tokenId, d.nftAddress, d.icon, d.type)} data={d} close={close} />
            ))}
          </div>
        )}
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  background: #0e0e0e;
  border: 1px solid #525252;
  border-radius: 12px;
  color: #fff;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  ${({theme}) => theme.mediaQueries.lg} {
    width: 40vw;
    height: 100vh;
  }
`
const Title = styled(Box)`
  font-size: 21px;
  font-weight: 700;
`
const Container = styled(Box)`
  padding: 20px 40px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`
