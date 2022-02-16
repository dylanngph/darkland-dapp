import {Button, Input, Skeleton, Text} from 'components/Pancake-uikit'
import React, {ChangeEvent, useEffect, useRef, useState} from 'react'
import styled from '@emotion/styled'
import {Box} from '@chakra-ui/react'
import {ReactComponent as CloseIcon} from 'assets/icons/CloseIcon.svg'
import useToast from 'hooks/useToast'

export default ({close, onStake, pendingTx, balanceToken, dataIdo, slotAmount, awaitingTicketClaim, htdShaked}) => {
  const [currentSlot, setCurrentSlot] = useState(slotAmount)
  const [balance, setBalance] = useState(2400)
  const [remainingHTD, setRemainingHTD] = useState(2400)

  const HTD_PER_SLOT = 200
  const {toastError, toastSuccess} = useToast()

  const onStakeClick = () => {
    onStake()
    const toast = toastSuccess
    toast('Staked success')
    close()
  }

  return (
    <Wrapper>
      <HeaderContainer>
        <Title>Stake HTD</Title>
        <Box cursor="pointer" onClick={close}>
          <CloseIcon />
        </Box>
      </HeaderContainer>
      <SubTitle>You are about to stake HTD</SubTitle>

      <Container flexDirection="column">
        <div className="text-gray text-sm" style={{width: '316px'}}>
          <div className="border border-gray-500 border-solid rounded-lg p-2 bg-gray flex justify-between mt-2 text-white">
            <BoxAmount>
              <span>Amount</span>
              <span>{htdShaked} HTD</span>
            </BoxAmount>
          </div>
          <div className="mt-6 leading-5">
            <div className="flex justify-between mb-2">
              <span>Your balance:</span>
              <span className="font-bold flex flex-row">
                <TextTitle>{HTD_PER_SLOT}</TextTitle>
                <TextAmount>HTD</TextAmount>
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Remaining HTD:</span>
              <span className="font-bold flex flex-row">
                <TextTitle>{balance}</TextTitle>
                <TextAmount>HTD</TextAmount>
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Claimaible Tickets:</span>
              <span className="font-bold flex flex-row">
                <TextTitle>{awaitingTicketClaim}</TextTitle>
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-between">
          <Button onClick={close} variant="text">
            Cancel
          </Button>
          {remainingHTD >= 0 ? (
            <Button variant="primary" disabled={pendingTx} onClick={onStakeClick}>
              {pendingTx ? 'Processing...' : 'Stake'}
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
  border-radius: 10px;
  background: linear-gradient(232.96deg, #5e5d5d 1.65%, #3c393a 99.16%);
  opacity: 0.9;
  border: 1px solid;
  border-image-source: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.51) 0%,
    #686868 66.84%,
    rgba(104, 104, 104, 0) 100%
  );
`
const HeaderContainer = styled(Box)`
  padding: 20px 30px 0;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  color: #fff;
`
const Title = styled(Box)`
  font-size: 21px;
  font-weight: 700;
`
const SubTitle = styled(Box)`
  margin-top: 10px;
  padding-left: 30px;
  color: #a6a6a6;
`

const Container = styled(Box)`
  padding: 10px 30px 20px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  color: #fff;
`
const BoxAmount = styled(Box)`
  padding: 0 15px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  color: #fff;
`
const TextTitle = styled(Text)`
  color: white;
  marginright: 2px;
  fontweight: bold;
  fontsize: 14px;
`
const TextAmount = styled(Text)`
  color: #ffab04;
  fontweight: bold;
  fontsize: 14px;
  margin-left: 5px;
`
