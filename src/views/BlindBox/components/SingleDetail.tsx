import React, {useEffect, useState, useCallback} from 'react'
import {Hero} from 'components/KShark'
import Page from 'components/Layout/Page'
import {Button, Heading, Text} from 'components/Pancake-uikit'
import {RouteComponentProps, NavLink} from 'react-router-dom'
import {useWeb3React} from '@web3-react/core'
import {useTranslation} from 'contexts/Localization'
import styled from 'styled-components'
import CardPrice from 'components/CardPrice'
import UnlockButton from 'components/UnlockButton'
import CountDown from './Countdown'
import GirdNfts from './GirdNtfs'

const SingleDetail = () => {
  const {t} = useTranslation()
  const {account} = useWeb3React()
  return (
    <ItemContainer>
      <Item>
        <ItemImage backgroundImage="https://slate.textile.io/ipfs/bafybeigwbvgayxcisudkcruf6pnd7u4upmeecuyhzkibtaedtl4uwftvuu" />
        <ItemDescription>
          <Text fontSize="30px">NFT Blind Box</Text>
          <Text marginTop="15px" fontSize="20px" color="#848E9C" fontWeight="400">
            {t('Remaining Amount: ')}
            <Text display="inline" fontSize="20px">
              0
            </Text>
          </Text>
          <ItemCountDown>
            <Text fontSize="20px" color="#848E9C" fontWeight="400">
              {t('End Time: ')}{' '}
            </Text>
            <CountDown time={1640970000} />
          </ItemCountDown>
          <CardPrice bnbTotal={0.25} />
          {account ? (
            <Button width="100%" marginTop="21px">
              Coming Soon
            </Button>
          ) : (
            <UnlockButton width="100%" marginTop="21px" />
          )}
        </ItemDescription>
      </Item>
      <ItemsNft>
        <Text fontSize="30px">{t('NFT Details')}</Text>
        <GirdNfts />
      </ItemsNft>
    </ItemContainer>
  )
}

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Item = styled.div`
  padding: 22px;
  display: flex;
  background-color: #fff;
  border-radius: 14px;
  flex: 8;
  gap: 26px;
  border-right: 1px dashed #ddd;
  flex-wrap: wrap;
`

const ItemImage = styled.div<{backgroundImage: string}>`
  background-image: url(${({backgroundImage}) =>
    backgroundImage ? `${backgroundImage}` : 'https://via.placeholder.com/250x280'});
  width: 250px;
  height: 280px;
  border-radius: 14px;
  display: block;
  margin: 0 auto;
  background-size: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  @media screen and (max-width: 991px) {
    width: 100%;
  }
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
  @media screen and (max-width: 991px) {
    border-top: 1px dashed #ddd;
  }
`

export default SingleDetail
