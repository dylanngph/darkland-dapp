import {Button, Skeleton} from 'components/Pancake-uikit'
import React, {useEffect, useRef} from 'react'
import styled from '@emotion/styled'
import {Box} from '@chakra-ui/react'
import {formatNumber} from 'utils/formatBalance'
import {ReactComponent as CloseIcon} from './close.svg'

export default ({close, onPay, pendingTx, balanceToken, dataIdo}) => {
  return (
    <Wrapper>
      <Container borderBottom="1px solid #525252">
        <Title>Check out</Title>
        <Box
          cursor="pointer"
          sx={{
            '&:hover': {
              opacity: '.8',
            },
          }}
          onClick={close}
        >
          <CloseIcon />
        </Box>
      </Container>
      {/* <Container>
        <Filter/>
      </Container> */}
      <Container style={{height: 270}} flexDirection="column">
        <div className="text-gray text-sm">
          <p>
            You are about to purchase {dataIdo.priceBuy} {dataIdo.tokenPrice.symbol} IDO PACK
          </p>
          <div className="border border-gray-500 border-solid rounded-lg p-2 bg-gray flex justify-between mt-2 text-white">
            <span>Price</span>
            <span>
              {dataIdo.priceBuy} {dataIdo.tokenPrice.symbol}
            </span>
          </div>
          <div className="mt-2 leading-5">
            <div className="flex justify-between mb-2">
              <span>Your balance:</span>
              <span className="font-bold">
                {formatNumber(balanceToken, 2)} {dataIdo.tokenPrice.symbol}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Amount:</span>
              <span className="font-bold">1</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Total price:</span>
              <span className="font-bold">
                {dataIdo.priceBuy} {dataIdo.tokenPrice.symbol}
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-between">
          <Button onClick={close} variant="text">
            Cancel
          </Button>
          {balanceToken >= dataIdo.priceBuy ? (
            <Button variant="primary" disabled={pendingTx} onClick={onPay}>
              {pendingTx ? 'Processing..' : 'Check out'}
            </Button>
          ) : (
            <Button variant="primary" disabled>
              <span className="text-xs">Not enough balance !</span>
            </Button>
          )}
        </div>
      </Container>
    </Wrapper>
  )
}

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
const Container = styled(Box)`
  padding: 20px 30px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`
