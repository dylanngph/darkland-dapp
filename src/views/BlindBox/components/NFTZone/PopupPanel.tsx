import {Button, Skeleton} from 'components/Pancake-uikit'
import React, {useEffect, useRef} from 'react'
import styled from 'styled-components'
import {Box} from '@chakra-ui/react'
import CardHero from 'components/CardHero'
import {ReactComponent as CloseIcon} from 'components/close.svg'

export default ({close, onSelect, data}) => {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-h-full overflow-auto">
          {data &&
            data.map((d) => (
              <CardHero onClick={() => selectHero(d.tokenId, d.nftAddress, d.icon, d.type)} data={d} close={close} />
            ))}
        </div>
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
