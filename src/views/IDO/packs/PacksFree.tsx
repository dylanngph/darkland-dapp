import React, {useState, useEffect, useMemo} from 'react'
import {useWeb3React} from '@web3-react/core'
import {Button, Skeleton} from 'components/Pancake-uikit'
import {Box} from '@chakra-ui/react'
import styled from '@emotion/styled'
import Popup from 'reactjs-popup'
import {MaxUint256} from '@ethersproject/constants'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Countdown from 'react-countdown'
import CountDownRender from 'components/CountDownRender'
import useToast from 'hooks/useToast'
import {useCallWithGasPrice} from 'hooks/useCallWithGasPrice'
import {useERC20, useIdo} from 'hooks/useContract'
import {formatNumber} from 'utils/formatBalance'
import {useTranslation} from 'contexts/Localization'
import {getAddress} from 'utils/addressHelpers'
import {fetchUserIsLockFree} from '../hooks/fetchIDOFreeZone'
import PopupCheckout from './PopupCheckout'

const Packs = ({isMobile, idoId, data, dataLocked, isLoading, setRefresh}) => {
  const dataMemo = useMemo(() => data, [data])
  const dataIDO = useMemo(() => dataLocked, [dataLocked])
  const {t} = useTranslation()
  const {account} = useWeb3React()
  const [pendingTx, setPendingTx] = useState(false)
  const [currentTime, setCurrentTime] = useState(Date.now())
  // const [dataLocked, setDataLocked] = useState({
  //     isPaid: false,
  //     tokenAllowance: false,
  //     isClaim: false,
  //     balanceOf: 0,
  //     timeClaimIDO: 0,
  //     startTime: 0,
  //     endTime: 0,
  //     maxHardCap: 0,
  //     nowCap: 0,
  //     nowTotalUser: 0
  // })
  const {toastSuccess, toastError} = useToast()
  const {callWithGasPrice} = useCallWithGasPrice()
  const idoContract = useIdo(Number(idoId))
  const tokenPriceContract = useERC20(getAddress(dataMemo.tokenPrice.address))
  const timeClaimIDO = dataIDO.timeClaimIDO * 1000
  const timeStartIDO = dataIDO.startTime * 1000
  const timeEndIDO = dataIDO.endTime * 1000
  const checkTimeCanClaimIDO = timeClaimIDO > currentTime
  const checkTimeStartIDO = timeStartIDO > currentTime
  const checkTimeEndIDO = timeEndIDO < currentTime
  const isFullCap = dataIDO.nowCap >= dataIDO.maxHardCap
  const balanceNotEnough = dataIDO.balanceOf < dataMemo.priceBuy

  const handleApproveToken = async () => {
    try {
      setPendingTx(true)
      const tx = await callWithGasPrice(tokenPriceContract, 'approve', [
        getAddress(dataMemo.contractAddress),
        MaxUint256,
      ])
      const receipt = await tx.wait()
      toastSuccess('Success', t(`Approved ${dataMemo.tokenPrice.symbol} to IDO`))
      setRefresh(Date.now())
    } catch (e) {
      console.log(e)
      toastError('Error', e?.data?.message)
    } finally {
      setPendingTx(false)
    }
  }

  const handlePayIdo = async () => {
    try {
      setPendingTx(true)
      const tx = await callWithGasPrice(idoContract, 'userPayIDO', [])
      const receipt = await tx.wait()
      toastSuccess('Success', t(`Your transaction was successful`))
      setRefresh(Date.now())
    } catch (e) {
      console.log(e)
      toastError('Error', e?.data?.message)
    } finally {
      setPendingTx(false)
    }
  }

  const handleClaimIDO = async () => {
    try {
      setPendingTx(true)
      const tx = await callWithGasPrice(idoContract, 'userClaimIDO', [])
      const receipt = await tx.wait()
      toastSuccess('Success', t(`Your transaction was successful`))
      setRefresh(Date.now())
    } catch (e) {
      console.log(e)
      toastError('Error', e?.data?.message)
    } finally {
      setPendingTx(false)
    }
  }

  const handleComplete = () => {
    setCurrentTime(Date.now())
  }

  // useEffect(() => {
  //     const fetchLocked = async() => {
  //         // console.log("fetching...")
  //         setIsLoading(true)
  //         // const dataUser = await fetchUserIsLockFree(account, dataMemo.contractAddress, Number(idoId))
  //         // setDataLocked(dataUser)
  //         setIsLoading(false)
  //     }
  //     fetchLocked()
  // }, [account, dataLocked, idoId])

  if (isLoading)
    return (
      <div className="w-full md:w-3/3 flex flex-col gap-5">
        <Skeleton width="100%" />
        <Skeleton width="70%" />
        <Skeleton width="50%" />
      </div>
    )

  const ComponentStart = () => {
    if (checkTimeStartIDO) {
      return (
        <Button className="w-full" disabled>
          <div className="flex flex-col gap-1">
            <p>Start in</p>
            <Countdown date={timeStartIDO} onComplete={handleComplete} renderer={CountDownRender} />
          </div>
        </Button>
      )
    }
    return null
  }

  const ComponentEnd = () => {
    if ((!checkTimeCanClaimIDO && !dataIDO.isPaid) || isFullCap || checkTimeEndIDO)
      return (
        <Button disabled className="w-full">
          Ended
        </Button>
      )
    return null
  }

  const ComponentPurchase = () => {
    if (!isFullCap) {
      if (!checkTimeStartIDO && checkTimeCanClaimIDO && (!isFullCap || !checkTimeEndIDO)) {
        if (balanceNotEnough && !dataIDO.isPaid) {
          return (
            <Button disabled className="w-full">
              Not enough balance !
            </Button>
          )
        }
        return (
          !dataIDO.isPaid &&
          dataIDO.tokenAllowance && (
            <div className="w-full">
              <Popup
                className="w-full"
                modal
                trigger={
                  <Button className="w-full" disabled={pendingTx}>
                    Purchase
                  </Button>
                }
              >
                {(close) => (
                  <PopupCheckout
                    close={close}
                    dataIdo={dataMemo}
                    pendingTx={pendingTx}
                    balanceToken={dataIDO.balanceOf}
                    onPay={handlePayIdo}
                  />
                )}
              </Popup>
            </div>
          )
        )
      }
    }
    return null
  }

  const ComponentApprove = () => {
    if (!checkTimeStartIDO && checkTimeCanClaimIDO && !isFullCap && !balanceNotEnough) {
      return (
        !dataIDO.tokenAllowance && (
          <Button className="w-full" disabled={pendingTx} onClick={handleApproveToken}>
            Enable {dataMemo.tokenPrice.symbol}
          </Button>
        )
      )
    }
    return null
  }

  const ComponentClaim = () => {
    return dataIDO.isClaim ? (
      <Button disabled={dataIDO.isClaim} className="w-full">
        Claimed
      </Button>
    ) : (
      dataIDO.isPaid && (
        <Button className="w-full" onClick={handleClaimIDO} disabled={pendingTx || checkTimeCanClaimIDO}>
          <div className="flex flex-col">
            <p>{pendingTx ? 'Claiming...' : 'Claim'}</p>
            {checkTimeCanClaimIDO && <Countdown className="text-xs" date={timeClaimIDO} renderer={CountDownRender} />}
          </div>
        </Button>
      )
    )
  }

  return (
    <Wrapper className="flex flex-col md:flex-row shadow gap-10">
      {account ? (
        <>
          <div className="w-full md:w-2/5">
            <img src="/images/ido/free_pack.jpg" alt="Free Zone" />
          </div>
          <div className="w-full md:w-3/5 flex flex-col justify-between">
            <div>
              <Flex>
                <div>Amount:</div>
                <BoldBox>{formatNumber(dataMemo.priceBuy / dataMemo.priceSale, 0)} HTD</BoldBox>
              </Flex>
              <Flex>
                <div>Price:</div>
                <BoldBox>
                  {dataMemo.priceBuy} {dataMemo.tokenPrice.symbol}
                </BoldBox>
              </Flex>
            </div>
            <div>
              <Flex>
                <div>Your Balance:</div>
                <BoldBox>
                  {formatNumber(dataIDO.balanceOf)} {dataMemo.tokenPrice.symbol}
                </BoldBox>
              </Flex>
              <Flex>
                <div>Your {dataMemo.tokenEarn.symbol}:</div>
                <BoldBox>
                  {formatNumber(dataIDO.balanceOfEarn ?? 0)} {dataMemo.tokenEarn.symbol}
                </BoldBox>
              </Flex>
              <hr className="my-3" />
              <ComponentStart />
              <ComponentEnd />
              <ComponentPurchase />
              <ComponentApprove />
              <ComponentClaim />
            </div>
          </div>
        </>
      ) : (
        <ConnectWalletButton className="w-full">Connect Wallet</ConnectWalletButton>
      )}
      {/* <img src="/images/packs.png" alt="" width="100%" /> */}
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  border: 1px solid #424243;
  border-radius: 8px;
  padding: 20px;
  background: #000;
  font-weight: 400;
  font-size: 14px;

  img {
    border-radius: 8px;
  }
`

const Flex = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const BoldBox = styled(Box)`
  font-weight: 700;
`
const AddBox = styled(Box)`
  height: 100px;
  border-radius: 5px;
  border: 1px solid #424243;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #272727;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`
const StyledButton = styled(Button)`
  background: linear-gradient(127deg, rgba(253, 71, 106, 1) 0%, rgba(224, 61, 68, 1) 37%);
  color: #fff;
  width: 100%;
  font-weight: 400;
  margin-top: 20px;
  &:hover {
    background: linear-gradient(127deg, rgba(253, 71, 106, 1) 0%, rgba(224, 61, 68, 1) 37%);
    opacity: 0.8;
  }
  &:focus {
    border: none;
    box-shadow: none;
  }
`
export default Packs
