import {Button, Skeleton} from 'components/Pancake-uikit'
import React, {useEffect, useRef} from 'react'
import styled from '@emotion/styled'
import {Box} from '@chakra-ui/react'
import {formatNumber} from 'utils/formatBalance'
import {ReactComponent as CloseIcon} from 'assets/icons/CloseIcon.svg'
import SuccessImage from 'assets/images/SuccessImage.png'

export default ({close, clearPurchasedTx, currentSlots}) => {
  const onClosePopupCheckOut = () => {
    clearPurchasedTx()
    close()
  }
  return (
    <Wrapper>
      <ContainerPopupComplete>
        <CardIcon>
          <img src="/images/Checkout.svg" alt={SuccessImage} />
        </CardIcon>
        <Title>Transaction Successful !</Title>
      </ContainerPopupComplete>
      <ContainerPopupComplete style={{alignItems: 'center', padding: '0'}} flexDirection="column">
        <div className="text-gray text-sm">
          {/* <p>YYou have staked HTD for {currentSlots} slots</p> */}
          <p>You have claim 4 tickets</p>
          <div className="w-full">
            <Button
              onClick={onClosePopupCheckOut}
              variant="primary"
              className="w-full"
              style={{position: 'relative', top: '65px'}}
              scale="sm"
            >
              Close
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
