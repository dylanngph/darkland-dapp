import React, {useEffect, useMemo, useState} from 'react'
import styled from 'styled-components'
import {Button, Text} from 'components/Pancake-uikit'
import CountdownIDO from 'components/CountdownIDO/CoundownIDO'
import Popup from 'reactjs-popup'
import {lotteryConfig} from 'config/constants/blindBox'
import PopupStakeHTD from 'views/IDO/packs/PopupStakeHTD'
import PopupTicketComplete from 'views/IDO/packs/PopupTicketComplete'
import blindBoxItems from 'config/constants/blindBoxItems'
import {useTranslation} from 'contexts/Localization'
import {useCallWithGasPrice} from 'hooks/useCallWithGasPrice'
import useToast from 'hooks/useToast'
import {getAddress} from 'utils/addressHelpers'
import {MaxUint256} from '@ethersproject/constants'
import {useERC20, useLotteryContract} from 'hooks/useContract'
import {useWeb3React} from '@web3-react/core'
import ConnectWalletButton from 'components/ConnectWalletButton'
import {formatNumber} from 'utils/formatBalance'
import './blindBox.modules.scss'
import Countdown from 'react-countdown'
import CountDownRender from 'components/CountDownRender'
import PopupLotteryWinner from './components/PopupLotteryWinner'
import { useLottery } from './hooks/useLottery'

const LotteriesComponent = ({dataBlindbox}) => {
  const {t} = useTranslation()
  const {
    endTime,
    startTime,
    timeLock,
    amountHTDRequired,
    userAmountStakeHTD,
    totalUser,
    totalTicket,
    isAllowance,
    balanceOf,
    userIsCount,
  } = useLottery()

  const [currentTime, setCurrentTime] = useState(Date.now())
  const fromDate = startTime * 1000
  const toDate = endTime * 1000
  const timeUnlockHTD = timeLock * 1000

  const checkTimeCanClaimHTD = timeUnlockHTD > currentTime
  const checkTimeStart = fromDate > currentTime
  const checkTimeEnd = toDate < currentTime
  const checkIsOpen = !checkTimeStart && !checkTimeEnd

  const {account} = useWeb3React()
  const {callWithGasPrice} = useCallWithGasPrice()
  const [isCountingDown, setIsCountingDown] = useState(true)
  const [isWaitingForChecking, setIsWaitingForChecking] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [isWinner, setIsWinner] = useState(undefined)
  const [pendingTx, setPendingTx] = useState(false)
  const [purchasedTx, setPurchasedTx] = useState(false)
  const currentSlots = Math.round(userAmountStakeHTD / amountHTDRequired)
  const {toastError, toastSuccess} = useToast()
  const tokenPriceContract = useERC20(getAddress(lotteryConfig.tokenRequire.address))
  const lotteryContract = useLotteryContract()
  const setStatusCoundown = (status: boolean) => {
    setIsCountingDown(status)
  }

  useEffect(() => {
    if (!isCountingDown) {
      setIsWaitingForChecking(true)
    }
  }, [isCountingDown])

  useEffect(() => {
    if (isChecking) {
      setIsWinner(false)
    }
  }, [isChecking])

  const onStakeClick = async (slots, close) => {
    try {
      setPendingTx(true)
      const tx = await callWithGasPrice(lotteryContract, 'stakeForGetTicket', [slots])
      const receipt = await tx.wait()
      toastSuccess('Success', t(`Staked success`))
      await close()
    } catch (e) {
      console.log(e)
      toastError('Error', e?.data?.message)
    } finally {
      setPendingTx(false)
    }
  }

  const handleApproveToken = async () => {
    // console.log("aaaa")
    try {
      setPendingTx(true)
      const tx = await callWithGasPrice(tokenPriceContract, 'approve', [
        getAddress(lotteryConfig.contractAddress),
        MaxUint256,
      ])
      const receipt = await tx.wait()
      toastSuccess('Success', t(`Approved ${lotteryConfig.tokenRequire.symbol} to Lottery`))
    } catch (e) {
      console.log(e)
      toastError('Error', e?.data?.message)
    } finally {
      setPendingTx(false)
    }
  }

  const handleUnstake = async () => {
    // console.log("aaaa")
    try {
      setPendingTx(true)
      const tx = await callWithGasPrice(lotteryContract, 'withdrawHTD', [])
      const receipt = await tx.wait()
      toastSuccess('Success', t(`Unstake success`))
    } catch (e) {
      console.log(e)
      toastError('Error', e?.data?.message)
    } finally {
      setPendingTx(false)
    }
  }

  const renderButton = () => {
    if (checkTimeStart) {
      return (
        <Button width="100%" disabled>
          <div className="flex flex-col">
            <span className="text-sm">Starts in</span>
            <Countdown date={fromDate} renderer={CountDownRender} />
          </div>
        </Button>
      )
    }
    if (checkIsOpen) {
      return (
        <Popup
          className="w-full"
          modal
          trigger={
            <Button width="100%">
              <div className="flex flex-col gap-1">
                <span>Get Slot(s)</span>
                <p className="text-xs">
                  <Countdown date={toDate} renderer={CountDownRender} />
                </p>
              </div>
            </Button>
          }
        >
          {(close) =>
            !purchasedTx ? (
              <PopupStakeHTD
                close={close}
                dataLottery={lotteryConfig}
                pendingTx={pendingTx}
                balanceToken={balanceOf}
                onStake={onStakeClick}
                slotAmount={currentSlots}
              />
            ) : (
              <PopupTicketComplete
                close={close}
                currentSlots={currentSlots}
                clearPurchasedTx={() => setPurchasedTx(false)}
              />
            )
          }
        </Popup>
      )
    }
    if (!checkIsOpen && userAmountStakeHTD) {
      return (
        <Button width="100%" disabled={pendingTx || checkTimeCanClaimHTD} onClick={handleUnstake}>
          <div className="flex items-center gap-1 flex-col">
            <span>Unstake</span>
            <span className="text-xs">
              <Countdown className="text-xs" date={timeUnlockHTD} renderer={CountDownRender} />
            </span>
          </div>
        </Button>
      )
    }
    return (
      <Button width="100%" disabled>
        Ended
      </Button>
    )
  }

  return (
    <div className="w-full flex flex-wrap flex-col sm:flex-col md:flex-row lg:flex-row lotteries-container">
      <div className="w-full sm:w-full md:w-3/6 lg:w-3/6 h-auto">
        <LotteriesLeftPanelComponent>
          <LotteriesLeftPanelComponentHeader className="flex flex-row flex-wrap justify-between items-center">
            <Text
              className="flex flex-row flex-wrap justify-start"
              style={{
                marginLeft: '18px',
                color: 'white',
                fontWeight: 'normal',
                fontSize: '16px',
              }}
            >
              <img
                src="https://cdn.heroestd.io/Images/prize-pools-icon.svg"
                alt="prize pools icon"
                style={{width: '16px', height: '16px', marginRight: '5px'}}
              />
              PRIZE POOLS
            </Text>
            <Text
              style={{
                marginRight: '18px',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '18px',
              }}
            >
              1025 TICKETS
            </Text>
          </LotteriesLeftPanelComponentHeader>
          <LotteriesLeftPanelComponentContent>
            {/* {isCountingDown && (
              <CountdownIDO
                fromDate={fromDate}
                toDate={toDate}
                description="Random starts in"
                setStatusCoundown={() => setStatusCoundown}
              />
            )} */}
            
              <div style={{width: '70%', display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <Text
                  style={{
                    
                    color: '#ffab04',
                    fontWeight: 'bold',
                    fontSize: '18px',
                  }}
                >
                  Are you the winner ?
                </Text>
                <Popup
                  className="w-full"
                  modal
                  trigger={
                    <WinnerListButton
                      width="100%"
                    >
                      Winner List
                    </WinnerListButton>
                  }
                >
                  {(close) => 
                    <PopupLotteryWinner close={close} />
                  }
                </Popup>
                <div>
                  The reward will return to the winner before 15:00 UTC Dec 11
                </div>
              </div>
            

            {isWinner && (
              <>
                <Text
                  style={{
                    paddingTop: '35px',
                    color: '#ffab04',
                    fontWeight: 'bold',
                    fontSize: '16px',
                  }}
                >
                  You have won 5 tickets !
                </Text>

                <Button
                  className="mt-4"
                  width="80%"
                  onClick={() => {
                    setIsWaitingForChecking(false)
                    setIsChecking(true)
                  }}
                >
                  Claim Now
                </Button>
              </>
            )}

            {isWinner === false && isChecking && (
              <>
                <Text
                  style={{
                    paddingTop: '35px',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '16px',
                  }}
                >
                  No prize to claim ...
                </Text>
              </>
            )}
          </LotteriesLeftPanelComponentContent>
        </LotteriesLeftPanelComponent>
      </div>
      <div className="w-full p-3 md:w-3/6 h-auto flex flex-col gap-2">
        <Text
          style={{
            color: 'white',
            fontWeight: 'normal',
            fontSize: '16px',
            textAlign: 'left',
          }}
        >
          1025 luckiest participants will get tickets , get yourself a few slots to claim !
        </Text>
        <LotteryInfo className="flex flex-row flex-wrap justify-between p-1">
          <Text
            style={{
              color: 'white',
              fontWeight: 'normal',
              fontSize: '12px',
            }}
          >
            HTD Stake per slot:
          </Text>
          <Text
            style={{
              color: 'white',
              fontWeight: 'normal',
              fontSize: '12px',
            }}
          >
            {amountHTDRequired} HTD
          </Text>
        </LotteryInfo>
        <LotteryInfo className="flex flex-row flex-wrap justify-between p-1">
          <Text
            style={{
              color: 'white',
              fontWeight: 'normal',
              fontSize: '12px',
            }}
          >
            HTD Staked:
          </Text>
          <Text
            style={{
              color: 'white',
              fontWeight: 'normal',
              fontSize: '12px',
            }}
          >
            {formatNumber(userAmountStakeHTD)} HTD
          </Text>
        </LotteryInfo>
        <LotteryInfo className="flex flex-row flex-wrap justify-between">
          <Text
            style={{
              margin: '5px',
              color: 'white',
              fontWeight: 'normal',
              fontSize: '12px',
            }}
          >
            Your slots:
          </Text>
          <Text
            style={{
              margin: '5px',
              color: '#ffab04',
              fontWeight: 'normal',
              fontSize: '12px',
            }}
          >
            You have {currentSlots} slots
          </Text>
        </LotteryInfo>
        {account ? (
          isAllowance ? (
            renderButton()
          ) : (
            <Button width="100%" disabled={pendingTx} onClick={handleApproveToken}>
              Approve Contract
            </Button>
          )
        ) : (
          <ConnectWalletButton width="100%" />
        )}
        <p className="text-red-400 text-xs italic">Unstake fee is 0.5% of the staking amount.</p>
      </div>
    </div>
  )
}

const LotteryInfo = styled.div`
  background-color: #272727;
  border-radius: 5px;
`

const LotteriesLeftPanelComponentContent = styled.div`
  background: url(/images/blindbox/dots.svg);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px
`
const LotteriesLeftPanelComponentHeader = styled.div`
  height: 54px;
  background: linear-gradient(180deg, #E8A639 0%, #EBB340 50.84%, #F2CA4C 100%);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`

const LotteriesLeftPanelComponent = styled.div`
  height: 100%;
  background-color: transparent;
  margin: 10px;
`
const WinnerListButton = styled(Button)`
  background: linear-gradient(270deg, #FD476A 0%, #FE335B 0.01%, #DF222B 105.1%);
  
`


export default LotteriesComponent
