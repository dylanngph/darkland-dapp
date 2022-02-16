import React, {useEffect, useState, useCallback} from 'react'
import {Button, Heading, Text} from 'components/Pancake-uikit'
import styled from 'styled-components'

interface PriceProps {
  bnbTotal: number
}

const CardPrice: React.FC<PriceProps> = ({bnbTotal}) => {
  return (
    <CardContainer>
      <CardHeading>
        <Text fontSize="16px" fontWeight="100">
          Price
        </Text>
        <CoinsWrap>
          <li>
            <img src="/images/coins/bnb.png" width="15px" height="15px" alt="BNB" /> <span>BNB</span>
          </li>
          <li>
            <img
              src="/images/coins/0x3da69d719ad12eeab2b7031697e84c2c62299c13.png"
              width="15px"
              height="15px"
              alt="BNB"
            />{' '}
            <span>Bitback</span>
          </li>
        </CoinsWrap>
      </CardHeading>
      <CardBody>
        <img src="/images/coins/bnb.png" width="20px" height="20px" alt="bnb" />
        <span style={{fontWeight: 'bold'}}>{bnbTotal}</span>
        <span>≈ $102</span>
      </CardBody>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  height: 80px;
  border-radius: 14px;
  box-shadow: 0px 2px 10px 0px #00000024;
  padding: 10px 14px;
  margin-top: 22px;
`

const CardHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const CoinsWrap = styled.ul`
  list-style: none;
  display: flex;

  li {
    padding: 0 10px;
    display: flex;
    gap: 5px;
  }

  li:first-child {
    border-right: 1px solid #ddd;
  }
`

const CardBody = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 20px;
  margin-top: 14px;
`

export default CardPrice
