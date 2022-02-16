import React from 'react'
import MarketEmptyImage from 'assets/images/MarketEmptyImage.png'
import styled from 'styled-components'
import { Text } from '@pancakeswap/uikit'

interface Props {
  message?: string
}

const Empty: React.FC<Props> = ({ message }, ...props) => {
  return (
    <Container>
      <img src={MarketEmptyImage} alt={MarketEmptyImage} />
      <Text color='#9e9e9e' bold fontSize='20px'>{ message }</Text>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

Empty.defaultProps = {
  message: "No result found"
}

export default Empty
