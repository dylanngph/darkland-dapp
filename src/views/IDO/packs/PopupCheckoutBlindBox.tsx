import {Button, Skeleton} from 'components/Pancake-uikit'
import React, {useEffect, useRef, useState} from 'react'
import styled from '@emotion/styled'
import {Box} from '@chakra-ui/react'
import {formatNumber} from 'utils/formatBalance'
import {useERC20, useOpenMysteryBoxTicket} from 'hooks/useContract'
import {getAddress} from 'utils/addressHelpers'
import {MaxUint256} from '@ethersproject/constants'
import {useBalanceOf} from 'views/BlindBox/hooks/useBlindBox'
import {useCallWithGasPrice} from 'hooks/useCallWithGasPrice'
import useToast from 'hooks/useToast'
import {ReactComponent as CloseIcon} from './close.svg'

interface IPopupCheckoutBlindBox {
  close: () => void
  onPay: () => void
  balanceToken: number
  dataIdo: any
  boxTitle: string
  isFreeZone?: boolean
}

const PopupCheckoutBlindBox: React.FC<IPopupCheckoutBlindBox> = ({
  close,
  onPay,
  balanceToken,
  dataIdo,
  boxTitle,
  isFreeZone,
}) => {
  const type = isFreeZone ? 'free' : 'whitelist'
  const {balanceOf, allowance} = useBalanceOf(dataIdo.tokenPrice, dataIdo.contractAddress[type])
  const [pendingApprove, setPendingApprove] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)
  const {callWithGasPrice} = useCallWithGasPrice()
  const tokenPriceContract = useERC20(getAddress(dataIdo.tokenPrice.address))
  const mysteryBoxContract = useOpenMysteryBoxTicket(type)
  const {toastError, toastSuccess} = useToast()
  const hanldeApproveToken = async () => {
    try {
      setPendingApprove(true)
      const tx = await callWithGasPrice(tokenPriceContract, 'approve', [
        getAddress(dataIdo.contractAddress[type]),
        MaxUint256,
      ])
      const receipt = await tx.wait()
      toastSuccess('Success', `Approved success`)
    } catch (err) {
      console.log(err)
      toastError('Error', err?.data?.message)
    } finally {
      setPendingApprove(false)
    }
  }

  const hanldeCheckout = async () => {
    try {
      setPendingTx(true)
      const tx = await callWithGasPrice(mysteryBoxContract, 'userBuyBox', [dataIdo.id])
      const receipt = await tx.wait()
      toastSuccess('Success', `Buy mysterybox success`)
      onPay()
    } catch (err) {
      console.log(err)
      toastError('Error', err?.data?.message)
    } finally {
      setPendingTx(false)
    }
  }

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
          <p>You are about to purchase {boxTitle}</p>
          <div className="border border-gray-500 border-solid rounded-lg p-2 bg-gray flex justify-between mt-2 text-white">
            <span>Price</span>
            <span>
              {dataIdo.price} {dataIdo.tokenPrice.symbol}
            </span>
          </div>
          <div className="mt-2 leading-5">
            <div className="flex justify-between mb-2">
              <span>Your balance:</span>
              <span className="font-bold">
                {formatNumber(balanceOf, 2)} {dataIdo.tokenPrice.symbol}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Total price:</span>
              <span className="font-bold">
                {dataIdo.price} {dataIdo.tokenPrice.symbol}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Remaining {dataIdo.tokenPrice.symbol}:</span>
              <span className="font-bold">
                {formatNumber(balanceOf - dataIdo.price, 2)} {dataIdo.tokenPrice.symbol}
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-between">
          <Button onClick={close} variant="text">
            Cancel
          </Button>
          {allowance ? (
            balanceOf >= dataIdo.price ? (
              <Button variant="primary" disabled={pendingTx} onClick={hanldeCheckout}>
                {pendingTx ? 'Processing..' : 'Check out'}
              </Button>
            ) : (
              <Button variant="primary" disabled>
                <span className="text-xs">Not enough balance !</span>
              </Button>
            )
          ) : (
            <Button onClick={hanldeApproveToken} disabled={pendingApprove}>
              {pendingApprove ? `Approving ${dataIdo.tokenPrice.symbol}...` : `Approve ${dataIdo.tokenPrice.symbol}`}
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
export default PopupCheckoutBlindBox
