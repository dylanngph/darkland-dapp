import React, { useState } from 'react'
import styled from 'styled-components'
import { styled as muiStyled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Box from '@mui/material/Box';
import { useWeb3React } from '@web3-react/core'
import { Stepper , Step, StepLabel } from '@mui/material';
import { IBoxData } from 'config/constants/types';
import { formatNumber } from 'utils/formatBalance';
import { Button, Text } from 'components/Pancake-uikit';
import tokens from 'config/constants/tokens';
import { useERC20, useStakeTokenEarnNFTContract } from 'hooks/useContract';
import { useModal } from '@pancakeswap/uikit';
import ApproveModal from 'components/ApproveModal/ApproveModal';
import TokenModal from 'components/TokenModal/TokenModal';
import { getAddress } from 'utils/addressHelpers';
import Popup from 'reactjs-popup';
import PendingTransactionModal from 'components/PendingTransaction/PendingTransaction';
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice';
import checkAllowance from 'utils/checkAllowance'
import checkBalance from 'utils/checkBalance'
import ConnectWalletButton from 'components/ConnectWalletButton'
import useToast from 'hooks/useToast'
import Countdown from 'react-countdown';
import CountDownRender from 'components/CountDownRender';
import ForceWithdraw from './ForceWithdraw';

export type StepBoxProps = {
    isMobile?: boolean
    boxData: IBoxData
}

enum TYPE_STEP {
  STAKE = 0,
  WAIT = 1,
  CLAIM = 2,
  CLAIMED = 3
}


const StepBox = ({ isMobile, boxData }:StepBoxProps) => {
  const [pendingTx, setPendingTx] = useState(false)
  const [unStakingTx, setUnstakingTx] = useState(false)
  const { account } = useWeb3React()
  const { toastError, toastSuccess } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const tokenContract = useERC20(getAddress(tokens.big.address))
  const contractPoolNFT = useStakeTokenEarnNFTContract(boxData.type)
  const [openModalApprove] = useModal(<ApproveModal 
    contractApprove={tokenContract} 
    contractNeedApprove={getAddress(boxData.contractAddress)}
    title={`Approve Box ${boxData?.type?.toUpperCase()}`}
  />, false)
  const [openModalToken] = useModal(<TokenModal symbol='BIG'/>, false)
  const timeNow = new Date().getTime()
  const isStake = boxData.users.isStake
  const isClaimed = boxData.users.isClaimNFT
  const timeEndWait = (boxData.users.lastUpdateTime + boxData.duration) * 1000
  const timeCanClaim = timeEndWait < timeNow
  const isWaitReceive = isStake && !timeCanClaim
  const canClaim = isStake && timeCanClaim
  const claimed = isClaimed && !isWaitReceive

  const currentStep = claimed ? TYPE_STEP.CLAIMED : canClaim ? TYPE_STEP.CLAIM : isWaitReceive ? TYPE_STEP.WAIT : TYPE_STEP.STAKE
  const isFullSlot = boxData.totalUserStaking === boxData.poolLimitUser

  const handleStake = async() => {
    try {
      const allowance = await checkAllowance(account, tokens.big.address, boxData.contractAddress)
      const balance = await checkBalance(account, tokens.big.address, tokens.big.decimals)
      if (!allowance) {
        openModalApprove()
        return
      } if (!balance) {
        openModalToken()
        return
      }
      setPendingTx(true)
      const tx = await callWithGasPrice(contractPoolNFT, 'stake', [])
      const transaction = await tx.wait()
      toastSuccess("Success", "Staked successfully")
    } catch(error) {
      console.log("error")
      toastError("Error", error?.data?.message)
    } finally {
      setPendingTx(false)
    }
  }

  const handleUnstake = async() => {
    try {
      setUnstakingTx(true)
      const tx = await callWithGasPrice(contractPoolNFT, 'emergencyWithdraw', [])
      const transaction = await tx.wait()
      toastSuccess("Success", "Unstaked successfully")
    } catch(error) {
      console.log("error")
      toastError("Error", error?.data?.message)
    } finally {
      setUnstakingTx(false)
    }
  }
  const [openModalForceWithdraw] = useModal(<ForceWithdraw onConfirm={handleUnstake} symbol="BIG" balance={boxData.requireAmountStaking} />)

  const handleClaim = async() => {
    try {
      setPendingTx(true)
      const tx = await callWithGasPrice(contractPoolNFT, 'claim', [])
      const transaction = await tx.wait()
      toastSuccess("Success", "Claimed successfully")
    } catch(error) {
      console.log("error")
      toastError("Error", error?.data?.message)
    } finally {
      setPendingTx(false)
    }
  }

  return (
    <Box sx={{ 
        width: '100%',
        '.MuiStepIcon-root' : {
          width: '34px',
          height: '34px',
          color: '#747475',
          '&.Mui-completed': {
            color: '#00FB28'
          },
          '&.Mui-active': {
            color: '#00BFD5'
          }
        },
        '.MuiStepLabel-label': {
            color: 'rgba(255,255,255,.5)',
            '&.Mui-completed': {
              color: '#fff'
            },
            '&.Mui-active': {
              color: '#fff'
          }
        }
    }}>
      {/* <StyledBox>
        <Stepper
          activeStep={currentStep}
          alternativeLabel
          connector={<ColorlibConnector/>}
        >
          <Step>
              <StepLabel>
                  <Box textAlign="center">
                      <div style={{fontWeight: '700', fontSize: '16px'}} >Stake</div>
                      <div style={{fontSize: '12px'}} >Deposite tokens</div>
                  </Box>
              </StepLabel>
          </Step>
          <Step>
              <StepLabel>
                <Box textAlign="center">
                    <div style={{fontWeight: '700', fontSize: '16px'}} >Wait</div>
                    <div style={{fontSize: '12px'}} >Waiting to receive</div>
                </Box>
              </StepLabel>
          </Step>
          <Step>
              <StepLabel>
                  <Box textAlign="center">
                    <div style={{fontWeight: '700', fontSize: '16px'}} >Claim</div>
                    <div style={{fontSize: '12px'}} >Claim your box</div>
                  </Box>
              </StepLabel>
          </Step>
        </Stepper>
      </StyledBox> */}
      <StyledBox sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '30px',
        gap: '20px'
      }}>
          <Box sx={{
            fontSize: '28px',
            textTransform: 'uppercase',
            fontWeight: '700'
          }}>
            Stake $BIG
          </Box>
          <Flex>
            <Box>
              $BIG Staking
            </Box>
            <Box color="#FFA800" >
            { formatNumber(boxData.requireAmountStaking, 0, 0) }
            </Box>
          </Flex>
          <Flex>
            <Box>
              Locktime:
            </Box>
            <Box color="#FFA800" >
              30 day(s)
            </Box>
          </Flex>
          <Flex>
            <Box>
              Earn reward(s):
            </Box>
            <Box color="#FFA800" >
              1 { boxData?.type?.toUpperCase() } BOX
            </Box>
          </Flex>
          {
            isWaitReceive && 
            <Flex>
              <Box>
                Claim in: 
              </Box>
              <Box color="#FFA800" >
                <Countdown date={timeEndWait} renderer={CountDownRender} />
              </Box>
            </Flex>
          }
          <Flex justifyContent='center' gap={1} flexWrap='wrap'>
          {
            (isStake && !claimed && isWaitReceive) && <UnstakeButton disabled={unStakingTx || !isWaitReceive} onClick={openModalForceWithdraw}>Force Withdraw</UnstakeButton>
          }
          { 
            account ?
              isWaitReceive ? <StyleButton disabled>Claim Reward</StyleButton>
              : canClaim ?
                  <StyleButton disabled={claimed || pendingTx || isWaitReceive} onClick={handleClaim}>Claim Reward</StyleButton>  
                : <StyleButton disabled={isFullSlot || isStake || claimed} onClick={handleStake}>{claimed ? 'Claimed' : 'Stake'}</StyleButton> 
            : <ConnectWalletButton/>
          }
          </Flex>
      </StyledBox>
      <Popup className="w-full" modal closeOnDocumentClick={false} open={pendingTx || unStakingTx}>
        {(close) => <PendingTransactionModal/> }
        </Popup>
    </Box>
  )
}

// const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
//   [`&.${stepConnectorClasses.alternativeLabel}`]: {
//     top: 17,
//     color: '#747475'
//   },
//   [`&.${stepConnectorClasses.active}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       background: '#00FB28',
//     },
//   },
//   [`&.${stepConnectorClasses.completed}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       background: '#00FB28',
//     },
//   },
//   [`& .${stepConnectorClasses.line}`]: {
//     height: 2,
//     border: 0,
//     backgroundColor: '#747475',
//   },
// }));

const StyledBox = styled(Box)`
  background: rgba(38, 71, 203, 0.5);
  border: 1px solid #00BFD5;
  padding: 20px;
`
const Flex = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
`
const StyleButton = styled(Button)`
  display: flex;
  flex: 2;
  border-bottom: 7px solid #C16000;
`

const UnstakeButton = styled(Button)`
  display: flex;
  flex: 2;
  background-color: #00BFD5;
  border-bottom: 7px solid #0d7c89;
  &.pancake-button--disabled {
    background-color: #058998;
  }
`

export default StepBox