import React from 'react'
import {Text, Button} from 'components/Pancake-uikit'
import styled from 'styled-components'
import AttributeBar from './AttributeBar'

export const GameCard = ({id, name, price, level, type, att}) => {
  return (
    <></>
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

const CardImage = styled.div`
  height: 190px;
  width: 100%;
  background-color: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
`

const StyleName = styled.div`
  display: flex;
  gap: 10px;
  padding: 15px;
  height: 65px;
  align-items: center;
  justify-content: center;
`

const CardBody = styled.div`
  background-color: #fff;
  padding: 15px;
  border-radius: 14px 14px 0 0;
  border-top: 1px dashed #ddd;
  display: flex;
  justify-content: space-between;
`

const TokenStyle = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`

const StyledPrice = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    margin-bottom: 10px;
  }
`
const StyledCoin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  & > * {
    margin-bottom: 10px;
  }
`
const SumaryBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background-color: #463203;
  border-radius: 7px;
  width: 123px;
  height: 133px;
`
const LevelBox = styled.div`
  background-image: url('/images/chicken/level-bg.png');
  background-repeat: no-repeat;
  background-size: contain;
  width: 26px;
  height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  & > div {
    margin-bottom: 10px;
  }
`
