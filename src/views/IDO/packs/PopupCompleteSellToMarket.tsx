import {Button, Skeleton} from 'components/Pancake-uikit'
import React, {useEffect, useRef} from 'react'
import styled from '@emotion/styled'
import {Box} from '@chakra-ui/react'
import {formatNumber} from 'utils/formatBalance'
import history from 'routerHistory'
import {ReactComponent as CloseIcon} from './close.svg'

export default ({close, clearPurchasedTx}) => {
  const onClosePopupCheckOut = () => {
    clearPurchasedTx()
    close()
  }

  const goToMarketPlace = () => {
    const path = `/marketplace`
    history.push(path)
  }
  return (
    <Wrapper>
      <ContainerPopupComplete>
        <CardIcon>
          <img src="/images/Checkout.svg" alt="complete" />
        </CardIcon>
        <Title>Transaction Successful</Title>
      </ContainerPopupComplete>
      <ContainerPopupComplete style={{alignItems: 'center', padding: '0'}} flexDirection="column">
        <div className="text-gray text-sm">
          <p>Your box is on marketplace</p>
          <p>Please check your My assets site</p>
          <div className="w-full flex flex-row flex-wrap justify-between">
            <Button
              onClick={onClosePopupCheckOut}
              variant="primary"
              className="w-2/6"
              style={{position: 'relative', top: '65px'}}
              scale="sm"
            >
              Close
            </Button>
            <Button
              onClick={() => goToMarketPlace()}
              variant="primary"
              className="w-3/6"
              style={{position: 'relative', top: '65px'}}
              scale="sm"
            >
              Go to Marketplace
            </Button>
          </div>
        </div>
      </ContainerPopupComplete>
    </Wrapper>
  )
}
const CardIcon = styled.div`
  position: relative;
  top: auto;
  left: auto;
`

const Wrapper = styled(Box)`
  background: linear-gradient(270deg, #000000b3 0, #444444c7 0.01%, #424242d1 105.1%);
  border: 1px solid #52525270;
  border-radius: 12px;
  color: #fff;
  width: 360px;
  min-height: 360px;
`
const Title = styled(Box)`
  font-size: 21px;
  font-weight: 700;
`
const ContainerPopupComplete = styled(Box)`
  padding: 40px 30px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
