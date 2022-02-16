import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import {Text} from 'components/Pancake-uikit'
import {useTranslation} from 'contexts/Localization'

const TransactionHistoryBanner = () => {
  const {t} = useTranslation()

  return (
      <BoxCard>
        <BoxName bold>{t('Transaction History')}</BoxName>
        <Text lineHeight="30px" marginTop="20px" fontSize="14px" color="#fff" maxWidth="275px">
          {t(
            'Hero Marketplace is now available. Get yourself a team before the game release !',
          )}
        </Text>
      </BoxCard>
  )
}

const CardItem = styled.div`
    display: flex;s
    flex-direction: row;
    margin-bottom: 15px
`

const Card = styled.div`
  width: 178px;
  height: 73px;
  background: linear-gradient(180deg, #333333 0%, #1c1c1c 100%);
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin-top: 28px;
`

const BoxCard = styled.div`
  height: 300px;
  width: 100%;
  padding: 30px 37px;
  background: url(/images/blindbox/dashboard.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 14px;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    height: auto;
    padding: 210px;
  }
  @media screen and (max-width: 991px) {
    padding: 20px;
  }
`

const BoxName = styled(Text)`
  font-size: 30px;
  color: #fff;
  line-height: 30px;
  margin-top: 5px;
  @media screen and (max-width: 991px) {
    font-size: 35px;
  }
`

export default TransactionHistoryBanner
