import React, {useState} from 'react'
import styled from 'styled-components'
import HtdHolderBG from 'assets/images/bg_htdholder.png'
import HtdToken from 'assets/images/htd_token.png'
import Exclamation from 'assets/images/exclamation.svg'
import Popup from 'reactjs-popup'
import {useTranslation} from 'contexts/Localization'
import {useWeb3React} from '@web3-react/core'
import {MaxUint256} from '@ethersproject/constants'
import useAuth from 'hooks/useAuth'
import {
  Card,
  CardBody,
  Flex,
  LaurelLeftIcon,
  LaurelRightIcon,
  Button,
  CheckmarkCircleIcon,
  useWalletModal,
  useModal,
} from '@pancakeswap/uikit'
import {blindBoxConfig} from 'config/constants/blindBox'
import ConnectWalletButton from 'components/ConnectWalletButton'
import {getAddress} from 'utils/addressHelpers'
import {useBlindBoxContract, useERC20} from 'hooks/useContract'
import {useCallWithGasPrice} from 'hooks/useCallWithGasPrice'
import {formatNumber} from 'utils/formatBalance'
import useToast from 'hooks/useToast'
import Countdown from 'react-countdown'
import CountDownRender from 'components/CountDownRender'
import HtdHolderSelect from './HtdHolderSelect'
import PopupTicketFail from './PopupTicketFail'
import PopupTicketComplete from './PopupTicketComplete'
import PopupStake from './PopupStakeHTD'
import {PropsList} from '../../types'
// interface Props {}

interface PropHolder {
  dataBlindbox: PropsList
}

const HtdHolder: React.FC<PropHolder> = ({dataBlindbox}) => {
  const {startTimeStakeNFTAndStakeHTD, timeEndStakeNFTAndStakeHTD, timeLockNFTAndHTD, isAllowance, userTierDetails} =
    dataBlindbox

  const [currentTime, setCurrentTime] = useState(Date.now())
  const {t} = useTranslation()
  const {account} = useWeb3React()
  const {login, logout} = useAuth()
  const {callWithGasPrice} = useCallWithGasPrice()
  const {onPresentConnectModal} = useWalletModal(login, logout)
  const [isWaitingForChecking, setIsWaitingForChecking] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [isWinner, setIsWinner] = useState(undefined)
  const [pendingTx, setPendingTx] = useState(false)
  const [purchasedTx, setPurchasedTx] = useState(false)
  const [htdShaked, setHtdShaked] = useState({
    index: 0,
    newAmountHTD: '',
    newTicket: 0,
  })
  const {toastError, toastSuccess} = useToast()
  const [awaitingTicketClaim, setAwaitingTicketClaim] = useState(0)
  const [ticketClaimed, setTicketClaimed] = useState(0)
  const tokenPriceContract = useERC20(getAddress(blindBoxConfig.tokenRequire.address))
  const blindBoxContract = useBlindBoxContract()

  const fromDate = startTimeStakeNFTAndStakeHTD * 1000
  const toDate = timeEndStakeNFTAndStakeHTD * 1000
  const timeUnlockHTD = timeLockNFTAndHTD * 1000

  const checkTimeCanClaimHTD = timeUnlockHTD > currentTime
  const checkTimeStart = fromDate > currentTime
  const checkTimeEnd = toDate < currentTime
  const checkIsOpen = !checkTimeStart && !checkTimeEnd

  const handleApproveToken = async () => {
    try {
      setPendingTx(true)
      const tx = await callWithGasPrice(tokenPriceContract, 'approve', [
        getAddress(blindBoxConfig.contractAddress),
        MaxUint256,
      ])
      const receipt = await tx.wait()
      toastSuccess('Success', t(`Approved ${blindBoxConfig.tokenRequire.symbol} to HTD Holders`))
    } catch (e) {
      console.log(e)
      toastError('Error', e?.data?.message)
    } finally {
      setPendingTx(false)
    }
  }

  const handleStakeHTD = async () => {
    try {
      setPendingTx(true)
      const tx = await callWithGasPrice(blindBoxContract, 'stakeHTDForTicket', [htdShaked.index])
      const receipt = await tx.wait()
      toastSuccess('Success', t(`Stake successful !`))
    } catch (e) {
      console.log(e)
      toastError('Error', e?.data?.message)
    } finally {
      setPendingTx(false)
    }
  }

  const handleUnstakeHTD = async () => {
    try {
      setPendingTx(true)
      const tx = await callWithGasPrice(blindBoxContract, 'withdrawHTD', [])
      const receipt = await tx.wait()
      toastSuccess('Success', t(`Unstake successful !`))
    } catch (e) {
      console.log(e)
      toastError('Error', e?.data?.message)
    } finally {
      setPendingTx(false)
    }
  }

  const getValueSelectChange = (data) => {
    setHtdShaked(data)
    setAwaitingTicketClaim(data.newTicket - ticketClaimed)
  }

  const renderButton = () => {
    if (checkTimeStart) {
      return (
        <Button width="100%" disabled={pendingTx || checkTimeCanClaimHTD}>
          <div className="flex flex-col">
            <span className="text-sm">Starts in</span>
            <Countdown date={fromDate} renderer={CountDownRender} />
          </div>
        </Button>
      )
    }
    if (checkIsOpen && userTierDetails.tierId < 6) {
      return (
        <Button
          className="w-full"
          disabled={pendingTx || htdShaked.index === 0 || userTierDetails.tierId === 6}
          onClick={handleStakeHTD}
        >
          <div className="flex flex-col">
            {userTierDetails.htdAmount > 0 ? (userTierDetails.tierId === 6 ? 'Max Upgrade' : 'Upgrade') : 'Stake HTD'}
            <Countdown date={toDate} renderer={CountDownRender} />
          </div>
        </Button>
      )
    }
    if (userTierDetails.htdAmount > 0) {
      return (
        <Button className="mt-3" width="100%" disabled={pendingTx || checkTimeCanClaimHTD} onClick={handleUnstakeHTD}>
          <div className="flex flex-col">
            <span className="text-sm">Unstake HTD</span>
            <Countdown date={timeUnlockHTD} renderer={CountDownRender} />
          </div>
        </Button>
      )
    }
    return (
      <Button className="mt-3" width="100%" disabled>
        Ended
      </Button>
    )
  }

  return (
    <Container className="flex flex-col md:flex-row w-full p-3 gap-3">
      <LeftContainer className="w-full md:w-2/5">
        <img className="w-full object-cover rounded-xl" src={HtdHolderBG} alt={HtdHolderBG} />
      </LeftContainer>

      <RighhtContainer className="w-full md:w-3/5">
        <Header>
          <Logo>
            <img src={HtdToken} alt={HtdToken} />
          </Logo>
          <WrapHead>
            <div style={{width: '100%'}}>
              <span>HTD requirement</span>
              <img src="https://cdn.heroestd.io/Images/exclamation.31bd8f3c.svg" alt={Exclamation} />
            </div>
            <HtdHolderSelect
              ticketClaimed={userTierDetails.tierId}
              htdStaked={userTierDetails.htdAmount}
              getValueSelectChange={getValueSelectChange}
            />
          </WrapHead>
        </Header>

        <StakeInfoContainer>
          <StakeItem>
            <span>HTD Staked:</span>
            <span>{formatNumber(userTierDetails.htdAmount)} HTD</span>
          </StakeItem>
          {/* <StakeItem>
            <span>Claimed tickets (Maximum 12):</span>
            <span>{ticketClaimed}</span>
          </StakeItem> */}
        </StakeInfoContainer>
        {account ? (
          isAllowance ? (
            renderButton()
          ) : (
            <Button className="w-full" disabled={pendingTx} onClick={handleApproveToken}>
              Approve HTD
            </Button>
          )
        ) : (
          <ConnectWalletButton />
        )}
      </RighhtContainer>
    </Container>
  )
}

const Container = styled.div`
  background: #000000;
  height: 100%;
  border-radius: 5px;
  margin-right: 39px;
  flex: 1;
`
const LeftContainer = styled.div`
  background: #000000;
  border-radius: 5px;
`
const RighhtContainer = styled.div`
  background: #000000;
  border-radius: 5px;
  border-radius: 5px;
  padding: 5px;
`
const Header = styled.div`
  border-radius: 5px;
  display: flex;
  gap: 5px;
`
const Logo = styled.div`
  border-radius: 5px;
  // width: 70px;
  // height: 70px;
`
const WrapHead = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  > div {
    display: flex;
    justify-content: space-between;
    > img {
      display: inline;
      vertical-align: bottom;
    }
  }
`
const StakeInfoContainer = styled.div`
  margin: 15px 0;
  padding: 5px;
  background: #111111;
  border-radius: 5px;
  font-size: 12px;
  width: 100%;
`
const StakeItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  background: #111111;
  border-radius: 5px;
  font-size: 12px;
`
const ButtonStake = styled(Button)`
  background: linear-gradient(270deg, #fd476a 0%, #fe335b 0.01%, #df222b 105.1%);
  border-radius: 5px;
  margin: 0px 0px;
  height: 30px;
  width: 100%;
`

export default HtdHolder
