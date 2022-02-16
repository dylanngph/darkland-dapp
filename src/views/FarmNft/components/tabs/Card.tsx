import React, {useState, useCallback} from 'react'
import {NavLink} from 'react-router-dom'
import {useAppDispatch} from 'state'
import {Text, Button} from 'components/Pancake-uikit'
import Balance from 'components/Balance'
import {ethers} from 'ethers'
import {useGetNftContract, useFarmNft} from 'hooks/useContract'
import {useCallWithGasPrice} from 'hooks/useCallWithGasPrice'
import {Skeleton} from '@pancakeswap/uikit'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import useToast from 'hooks/useToast'
import {updateFarmNftUserAllowance, updateFarmNftUserStakedBalance, updateNftLists} from 'state/actions'
import {useTranslation} from 'contexts/Localization'
import {FarmNft} from 'state/types'
import {getAddress} from 'utils/addressHelpers'
import {ToastDescriptionWithTx} from 'components/Toast'
import eggs from 'config/constants/eggs'
import {BIG_ZERO} from 'utils/bigNumber'

interface StatstProps {
  title?: string
  value: string
  userDataLoaded: boolean
  account: string
}

const Stats: React.FC<StatstProps> = ({title, value, userDataLoaded, account}) => {
  return (
    <StatsWrap>
      <Text>{title}</Text>
      {userDataLoaded && account ? (
        <Balance value={Number(value)} decimals={0} />
      ) : (
        <Skeleton width="120px" height="16px" />
      )}
    </StatsWrap>
  )
}

interface CardProps {
  data: FarmNft
  userDataLoaded?: boolean
  account: string
}

const Card: React.FC<CardProps> = ({data, userDataLoaded, account}) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const [requestedStake, setRequestedStake] = useState(false)
  const [requestedWithdraw, setRequestedWithdraw] = useState(false)
  const [requestedClaim, setRequestedClaim] = useState(false)
  const {media, name, userData, contractAddress, nftId, stakingNft, decimals} = data
  const {pointBalance, allowance, stakingTokenBalance, stakedBalance, nftsList} = userData
  const pointBalanceDisplay = pointBalance ? new BigNumber(pointBalance).div(10 ** decimals) : BIG_ZERO
  const stakedBl = stakedBalance.toNumber()
  const balances = stakingTokenBalance.toNumber()
  const isApprove = allowance
  const {toastSuccess, toastError} = useToast()
  const nftContract = useGetNftContract(nftId)
  const {callWithGasPrice} = useCallWithGasPrice()
  const dispatch = useAppDispatch()
  const {t} = useTranslation()
  const address = getAddress(contractAddress)
  const farmingNftContract = useFarmNft(nftId)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const tx = await callWithGasPrice(nftContract, 'setApprovalForAll', [address, 'true'])
      const receipt = await tx.wait()

      dispatch(updateFarmNftUserAllowance(nftId, account))
      if (receipt.status) {
        toastSuccess(
          t('Contract Enabled'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}>
            {t('You can now stake in the %symbol% pool!', {symbol: stakingNft.symbol})}
          </ToastDescriptionWithTx>,
        )
        setRequestedApproval(false)
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedApproval(false)
      }
    } catch (e) {
      setRequestedApproval(false)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
    }
  }, [account, dispatch, nftContract, address, nftId, stakingNft, t, toastError, toastSuccess, callWithGasPrice])

  const handleStake = useCallback(async () => {
    try {
      setRequestedStake(true)
      const tx = await callWithGasPrice(farmingNftContract, 'stake', [
        nftContract.address,
        nftsList[nftsList.length - 1],
      ])
      const receipt = await tx.wait()

      if (receipt.status) {
        toastSuccess(
          t('Contract Enabled'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}>
            {t('You can now stake in the %symbol% farm!', {symbol: stakingNft.symbol})}
          </ToastDescriptionWithTx>,
        )
        setRequestedStake(false)
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedStake(false)
      }
      dispatch(updateNftLists(nftId, account))
    } catch (e) {
      console.log(e)
      setRequestedStake(false)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
    }
  }, [
    farmingNftContract,
    stakingNft,
    t,
    toastError,
    toastSuccess,
    callWithGasPrice,
    nftContract.address,
    nftsList,
    dispatch,
    nftId,
    account,
  ])

  const handleWithdraw = useCallback(async () => {
    try {
      setRequestedWithdraw(true)
      const tx = await callWithGasPrice(farmingNftContract, 'withdrawNFT', [])
      const receipt = await tx.wait()

      if (receipt.status) {
        toastSuccess(
          t('Withraw successful'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}>
            {t('You just withdraw %symbol% in farm!', {symbol: stakingNft.symbol})}
          </ToastDescriptionWithTx>,
        )
        setRequestedWithdraw(false)
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedWithdraw(false)
      }
      dispatch(updateNftLists(nftId, account))
    } catch (e) {
      console.log(e)
      setRequestedWithdraw(false)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
    }
  }, [farmingNftContract, stakingNft, t, toastError, toastSuccess, callWithGasPrice, dispatch, nftId, account])

  const handleClaim = useCallback(async () => {
    try {
      setRequestedClaim(true)
      const tx = await callWithGasPrice(farmingNftContract, 'claimToken', [
        (pointBalance - 1 * 10 ** decimals).toString(),
      ])
      const receipt = await tx.wait()

      if (receipt.status) {
        toastSuccess(
          t('Claim successful'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}>
            {t('You just claim tokens')}
          </ToastDescriptionWithTx>,
        )
        setRequestedClaim(false)
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedClaim(false)
      }
      dispatch(updateFarmNftUserStakedBalance(nftId, account))
    } catch (e) {
      console.log(e)
      setRequestedClaim(false)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
    }
  }, [
    farmingNftContract,
    t,
    toastError,
    toastSuccess,
    callWithGasPrice,
    pointBalance,
    decimals,
    dispatch,
    account,
    nftId,
  ])

  return (
    <Container>
      <CardImage backgroundImage={media} />
      <CardBody>
        <BodyStats>
          <Stats title="Balances" value={balances.toString()} userDataLoaded={userDataLoaded} account={account} />
          <Stats
            title="Point Balance"
            value={pointBalanceDisplay.toNumber() > 1 ? pointBalanceDisplay.toString() : '0'}
            userDataLoaded={userDataLoaded}
            account={account}
          />
        </BodyStats>
        {/* <Text marginTop="20px" padding="0 20px" marginBottom="10px" color="#e74c3c">19% fee will be charged upon staking and withdrawal.</Text> */}
        <ButtonWrap>
          {account ? (
            isApprove === false ? (
              <Button onClick={handleApprove} disabled={requestedApproval}>
                {t('Enable')}
              </Button>
            ) : balances === 0 && stakedBl === 0 ? (
              <>
                <Text marginTop="20px" color="#e74c3c">
                  If you dont have any NTF, you can collect it in Bounty
                </Text>
                <Button marginTop="10px">
                  <NavLink to="/bounty">Collect NFT</NavLink>
                </Button>
              </>
            ) : (
              <>
                <Button onClick={handleStake} disabled={requestedStake || stakedBl > 0}>
                  {t('Stake')}
                </Button>
                <Button disabled={requestedClaim || pointBalanceDisplay.toNumber() === 0} onClick={handleClaim}>
                  {t('Claim')}
                </Button>
                <Button onClick={handleWithdraw} disabled={requestedWithdraw || stakedBl === 0}>
                  {t('Withdraw')}
                </Button>
              </>
            )
          ) : (
            <Button>{t('Unlock Wallet')}</Button>
          )}
        </ButtonWrap>
      </CardBody>
    </Container>
  )
}

const Container = styled.div`
  flex: 1 0 277px;
`

const CardImage = styled.div<{backgroundImage: string}>`
  background-image: url(${({backgroundImage}) => (backgroundImage ? `${backgroundImage}` : 'none')});
  height: 453px;
  background-color: #fff;
  border-radius: 14px;
  background-position: center;
  background-size: 55%;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  background-size: cover;
  :before {
    content: '';
    background-image: url(/images/watermark.png);
    width: 40px;
    height: 40px;
    position: absolute;
    background-size: contain;
    background-repeat: no-repeat;
    opacity: 0.7;
    right: 5px;
    top: 5px;
  }
`

const CardBody = styled.div`
  height: 275px;
  background-color: #fff;
  border-radius: 14px;
`

const BodyStats = styled.div`
  display: flex;
  position: relative;
  :before {
    content: '';
    height: 96px;
    width: 1px;
    background-color: #d0d0d0;
    position: absolute;
    left: 50%;
    top: 0;
  }
`

const StatsWrap = styled.div`
  flex: 1;
  padding-left: 20px;
  padding-top: 20px;
  height: 96px;
`

const ButtonWrap = styled.div`
  padding: 0 20px;
  > button {
    width: 100%;
    margin-bottom: 10px;
  }
`

export default Card
