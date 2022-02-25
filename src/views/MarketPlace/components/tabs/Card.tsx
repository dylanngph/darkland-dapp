import React, {useState, useCallback} from 'react'
import {Text, Button} from 'components/Pancake-uikit'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import {useTranslation} from 'contexts/Localization'
import {PoolNft} from 'state/types'

interface CardProps {
  data: PoolNft
  userDataLoaded?: boolean
  account: string
}

const Card: React.FC<CardProps> = ({data, userDataLoaded, account}) => {
  const {t} = useTranslation()

  return (
    <Container>
      <CardHead>
        <CardImage src="images/marketplace/demo.png" alt="demo" />
        <StyleName>
          <Text>#7327</Text>
          <Text>KShark Knight</Text>
        </StyleName>
      </CardHead>
      <CardBody>
        <StyledPrice>
          <Text fontWeight="200" fontSize="14px">
            Sale Price
          </Text>
          <Text fontWeight="200" fontSize="14px">
            ≈ $102
          </Text>
        </StyledPrice>
        <StyledPrice>
          <Text fontWeight="600">4,551</Text>
          <TokenStyle>
            <img src="images/coins/0x3da69d719ad12eeab2b7031697e84c2c62299c13.png" width="15px" alt="BKS" />
            <Text fontWeight="600">BKS</Text>
          </TokenStyle>
        </StyledPrice>
      </CardBody>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;

  ${({theme}) => theme.mediaQueries.sm} {
    width: 280px;
  }
`

const CardHead = styled.div`
  background-color: #fff;
  border-radius: 0 0 14px 14px;
`

const CardImage = styled.img`
  height: 190px;
  width: 100%;
  object-fit: cover;
`

const StyleName = styled.div`
  display: flex;
  gap: 10px;
  padding: 15px;
  height: 65px;
  align-items: center;
`

const CardBody = styled.div`
  background-color: #fff;
  padding: 15px;
  // border-radius: 14px 14px 0 0;
  border-top: 1px dashed #ddd;
`

const TokenStyle = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`

const StyledPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`
export default Card
