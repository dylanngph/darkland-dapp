import {Button, Input, Skeleton, Text} from 'components/Pancake-uikit'
import React, {ChangeEvent, useEffect, useRef, useState} from 'react'
import styled from '@emotion/styled'
import {Box} from '@chakra-ui/react'
import {formatNumber} from 'utils/formatBalance'
import {ReactComponent as CloseIcon} from './close.svg'

export default ({close, onStake, pendingTx, balanceToken, dataLottery, slotAmount}) => {
  const {balanceOf} = dataLottery
  const [currentSlot, setCurrentSlot] = useState(slotAmount)
  const [balance, setBalance] = useState(balanceToken)
  const [remainingHTD, setRemainingHTD] = useState(balanceToken)
  const [totalCheckout, setTotalCheckout] = useState(0)
  const [textInput, setTextInput] = useState()

  const HTD_PER_SLOT = 200

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {value} = evt.currentTarget
    // onTextInput(value)

    const currentHTD = Number(value)
    if (!Number.isNaN(currentHTD)) {
      const remaming = balance - Math.floor(currentHTD * HTD_PER_SLOT)
      setRemainingHTD(remaming < 0 ? 0 : remaming)
      setCurrentSlot(currentHTD)
      setTotalCheckout(currentHTD * HTD_PER_SLOT)
    }
  }

  const onStakeClick = () => {
    onStake(currentSlot, close)
  }

  return (
    <Wrapper>
      <Container borderBottom="1px solid #525252">
        <Title>Get Slot(s)</Title>
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
      <Container style={{height: 270, width: '366px'}} flexDirection="column">
        <div className="text-gray text-sm" style={{width: '316px'}}>
          <div className="border border-gray-500 border-solid rounded-lg p-2 bg-gray flex justify-between mt-2 text-white">
            <Input
              type="number"
              style={{border: 'none', backgroundColor: 'transparent'}}
              placeholder="Input slot amount"
              pattern="[0-9]"
              onChange={handleChange}
            />
            <div
              className="-mt-2 -mb-2 -mr-2 p-2"
              style={{display: 'flex', alignItems: 'center', height: '58px', backgroundColor: '#424243'}}
            >
              <Text
                style={{
                  color: '#ffab04',
                  fontWeight: 'bold',
                  fontSize: '14px',
                }}
              >
                {/* {dataIdo.tokenPrice.symbol} */}
                Slot(s)
              </Text>
            </div>
          </div>
          <div className="mt-2 leading-5">
            <div className="flex justify-between mb-2">
              <span>HTD Stake per slot:</span>
              <span className="font-bold flex flex-row">
                <Text
                  style={{
                    color: 'white',
                    marginRight: '2px',
                    fontWeight: 'bold',
                    fontSize: '14px',
                  }}
                >
                  {HTD_PER_SLOT}
                </Text>
                <Text
                  style={{
                    color: '#ffab04',
                    fontWeight: 'bold',
                    fontSize: '14px',
                  }}
                >
                  HTD
                </Text>
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Your balance:</span>
              <span className="font-bold flex flex-row">
                <Text
                  style={{
                    color: 'white',
                    marginRight: '2px',
                    fontWeight: 'bold',
                    fontSize: '14px',
                  }}
                >
                  {formatNumber(balance)}
                </Text>
                <Text
                  style={{
                    color: '#ffab04',
                    fontWeight: 'bold',
                    fontSize: '14px',
                  }}
                >
                  HTD
                </Text>
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Remaining HTD:</span>
              <span className="font-bold flex flex-row">
                <Text
                  style={{
                    color: 'white',
                    marginRight: '2px',
                    fontWeight: 'bold',
                    fontSize: '14px',
                  }}
                >
                  {formatNumber(remainingHTD)}
                </Text>
                <Text
                  style={{
                    color: '#ffab04',
                    fontWeight: 'bold',
                    fontSize: '14px',
                  }}
                >
                  HTD
                </Text>
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Total HTD:</span>
              <span className="font-bold flex flex-row">
                <Text
                  style={{
                    color: 'white',
                    marginRight: '2px',
                    fontWeight: 'bold',
                    fontSize: '14px',
                  }}
                >
                  {formatNumber(totalCheckout)}
                </Text>
                <Text
                  style={{
                    color: '#ffab04',
                    fontWeight: 'bold',
                    fontSize: '14px',
                  }}
                >
                  HTD
                </Text>
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-between">
          <Button onClick={close} variant="text">
            Cancel
          </Button>
          {balanceToken >= HTD_PER_SLOT && totalCheckout < balanceToken ? (
            <Button variant="primary" disabled={pendingTx} onClick={onStakeClick}>
              {pendingTx ? 'Processing...' : 'Buy'}
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
