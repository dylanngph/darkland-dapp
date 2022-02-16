import { Box } from '@chakra-ui/react'
import styled from '@emotion/styled'
import SuccessImage from 'assets/images/SuccessImage.png'
import { Button } from 'components/Pancake-uikit'
import { useHistory } from 'react-router-dom'
import React from 'react'

export default ({ close, clearPurchasedTx }) => {
  const history = useHistory()
  const onClosePopupCheckOut = () => {
    clearPurchasedTx()
    close()
  }

  const redirecToAccess = () => {
    history.push('/my-assets')
  }

  return (
    <Wrapper>
      <ContainerPopupComplete>
        <CardIcon>
          <img src="https://cdn.heroestd.io/DappUI/Checkout.svg" alt={SuccessImage} />
        </CardIcon>
        <Title>Transaction Successful !</Title>
      </ContainerPopupComplete>
      <ContainerPopupComplete style={{ alignItems: 'center', padding: '0' }} flexDirection="column">
        <div className="text-gray text-sm mb-10">
          <p>Please check My assets site</p>
        </div>
        <div className="flex w-full justify-around">
          <Button onClick={onClosePopupCheckOut} variant="text">
            Cancel
          </Button>
          <Button onClick={redirecToAccess} variant="primary">
            <span className="text-xs">My assets</span>
          </Button>
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
