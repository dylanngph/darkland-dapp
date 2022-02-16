import React, {useEffect, useState, useCallback} from 'react'
import {Button, Heading, Text} from 'components/Pancake-uikit'
import {useTranslation} from 'contexts/Localization'
import styled from 'styled-components'

const SingleDetail = () => {
  const {t} = useTranslation()
  return (
    <ItemContainer>
      <Item>
        <ItemImage src="https://via.placeholder.com/64x64" width="64px" alt="nft" />
        <Text>KShark Farmer</Text>
      </Item>
      <Item>
        <ItemImage src="https://via.placeholder.com/64x64" width="64px" alt="nft" />
        <Text>KShark Chef</Text>
      </Item>
      <Item>
        <ItemImage src="https://via.placeholder.com/64x64" width="64px" alt="nft" />
        <Text>KShark Doctor</Text>
      </Item>
      <Item>
        <ItemImage src="https://via.placeholder.com/64x64" width="64px" alt="nft" />
        <Text>KShark Engineer</Text>
      </Item>
      <Item>
        <ItemImage src="https://via.placeholder.com/64x64" width="64px" alt="nft" />
        <Text>KShark Knight</Text>
      </Item>
      <Item>
        <ItemImage src="https://via.placeholder.com/64x64" width="64px" alt="nft" />
        <Text>KShark Scientist</Text>
      </Item>
    </ItemContainer>
  )
}

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 22px;
  column-gap: 10%;
  row-gap: 20px;
  justify-content: center;
  align-items: center;
`

const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  width: 120px;
`

const ItemImage = styled.img`
  width: 64px;
  border-radius: 14px;
`

const ItemDescription = styled.div`
  flex-grow: 1;
`

const ItemCountDown = styled.div`
  display: flex;
  margin-top: 25px;
  gap: 12px;
  align-items: center;
`

const ItemsNft = styled.div`
  background-color: #fff;
  border-radius: 14px;
  padding: 22px;
  flex: 4;
`

export default SingleDetail
