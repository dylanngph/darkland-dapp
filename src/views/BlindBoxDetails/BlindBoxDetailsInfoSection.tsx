import React, {useState, useMemo, useCallback, useEffect} from 'react'
import styled, { keyframes } from 'styled-components'
import {Button, Text} from 'components/Pancake-uikit'
import {useTranslation} from 'contexts/Localization'
import {find, remove} from 'lodash'
import { Box, Flex } from '@pancakeswap/uikit'
import useToast from 'hooks/useToast'
import Popup from 'reactjs-popup'
import blindBoxItems from 'config/constants/blindBoxItems'
import LoadingComponent from 'views/LoadingComponent'
import { isMobile } from 'react-device-detect'
import HeroesCard from 'views/HeroesCard'
import PendingTransactionModal from 'components/PendingTransaction/PendingTransaction'
import { StyleButton } from 'components/StyleDarkLand'
import * as indexDb from '../../utils/services'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import './blindBoxDetails.modules.scss'
import BlindBoxFrame from './BlindBoxFrame'


const BlindBoxDetailsInfoSection = ({
  blindBoxItem, 
  boxId, 
  allowance, 
  onApprove,
  approveTx,
  onOpen,
  pendingTx,
  setPendingTx,
  dataAttr,
  openIframe
}) => {
  const {t} = useTranslation()
  const [isShow, setIsShow] = useState(false)

  const [currentQuantity, setCurrentQuantity] = useState(1)
  const onChangeQuantityNumber = (quantity: number) => {
    setCurrentQuantity(quantity)
  }

  const {toastError, toastSuccess} = useToast()

  const {account} = useActiveWeb3React()


  return (
    <Card>
      <div className="lg:flex lg:flex-row">
        <div className="margin-center sm:w-3/5 md:w-4/5 lg:w-2/5">
          <Block>
            <CardIcon>
              <Box height={320} style={{ position: "relative" }}>
                <BoxAnim src={`${blindBoxItem.iconImageUrl}`} alt="box" />
                <img src='/images/blindbox/conner.png' alt="conner" style={{ position: "absolute", bottom: -20, zIndex: 1 }} />
              </Box>
            </CardIcon>
            <CardAmount className="m-auto">
              <Flex my={2}>
                <Text fontSize='24px' mr={1}>{t('Amount:')}</Text>
                <Text fontSize="24px" color="#FFAB04">{blindBoxItem.balanceOf || 0} </Text>
              </Flex>
            </CardAmount>
          </Block>
        </div>
        <Col style={{ gap: 25 }}>
          <Flex style={{
            alignItems: 'center',
            gap: '10px'
          }}>
            <img src="/images/blindbox/TitleDivider.png" alt='' width="8px" />
            <Col style={{gap: '10px',textTransform: 'uppercase'}}>
              <Box style={{fontSize: '20px'}}>
                Box
              </Box>
              <Box style={{
                fontSize: '48px',
                fontWeight: '700',
              }}>
              { blindBoxItem.title }
              </Box>
            </Col>
          </Flex>
          <Box style={{color: '#C0C0C0', fontSize: '20px', fontWeight: '700'}}>
            Drop rate
          </Box>
          <Flex style={{gap: '20px', flexWrap: 'wrap'}}>
            <RateBox style={{background: '#006CBE'}}>
              <Box>Common</Box>
              <TextRate>{blindBoxItem.rate.common}%</TextRate>
            </RateBox>
            <RateBox style={{background: '#7D44DB'}}>
              <Box>Rare</Box>
              <TextRate>{blindBoxItem.rate.rare}%</TextRate>
            </RateBox>
            <RateBox style={{background: '#E8A500'}}>
              <Box>Epic</Box>
              <TextRate>{blindBoxItem.rate.epic}%</TextRate>
            </RateBox>
            <RateBox style={{background: '#D40060'}}>
              <Box>Legendary</Box>
              <TextRate>{blindBoxItem.rate.legend}%</TextRate>
            </RateBox>
          </Flex>
          <Flex>
          {
            allowance ?
            <StyleButton className="w-full" disabled={account === undefined || blindBoxItem.balanceOf <= 0 || pendingTx} onClick={onOpen}>
              { pendingTx ? `Processing...` : `Open Box` }
            </StyleButton>
            :
            <StyleButton width="100%" onClick={onApprove} disabled={approveTx}>Approve box</StyleButton>
          }
          </Flex>
        </Col>
        <Popup className="w-full" modal closeOnDocumentClick={false} open={pendingTx || approveTx}>
        {(close) => <PendingTransactionModal/> }
        </Popup>
      </div>
    </Card>
  )
}

const Anim = keyframes`
  0% {
    transform: translateY(10px);
  }

  50% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(10px);
  }
`

const BoxAnim = styled.img`
  width: 220px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  animation: ${Anim} 5s linear infinite;
`

const TextRate = styled(Box)`
  font-size: 24px;
  font-weight: 700
`

const Block = styled.div`
  width: 100%;
  padding-left: 48px;
  padding-right: 48px;
`

const CardAmount = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  justify-content: center;
  border-radius: 2px;
  padding: 5px;
`

const Card = styled.div`
  width: 100%;
  height: auto;
  min-height: 487px;
  color: white;
  border-radius: 8px;
  padding-bottom: 29px;
`

const CardIcon = styled.div`
  padding: 15px;
  padding-top: 5px;
  width: 100%;
  display:flex;
  flex-direction: row;
  justify-content: center;
  margin-top:15px;
`

const Col = styled(Box)`
  display: flex;
  flex-direction: column;
`

const RateBox = styled(Box)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
  padding: 10px 25px;
  border-radius: 8px;
  flex: 1 4;
  width: 120px;
`

export default BlindBoxDetailsInfoSection
