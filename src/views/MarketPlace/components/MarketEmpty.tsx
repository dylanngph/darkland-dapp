import React from 'react'
import MarketEmptyImage from 'assets/images/MarketEmptyImage.png'
import styled from 'styled-components'

// interface Props {

// }

const MarketEmpty = (props) => {
  return (
    <Container>
      <img src={MarketEmptyImage} alt={MarketEmptyImage} />
      <Text> No result found</Text>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const Text = styled.div`
  color: #9e9e9e;
`

export default MarketEmpty
