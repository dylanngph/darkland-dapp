import {display} from '@mui/system'
import React, {useEffect, useState, useCallback} from 'react'
import {useWeb3React} from '@web3-react/core'
import {blindBoxConfig} from 'config/constants/blindBox'
import styled from 'styled-components'
import {Button, Skeleton, Text} from 'components/Pancake-uikit'
import {Address} from 'config/constants/types'
import {formatNumber} from 'utils/formatBalance'
import Popup from 'reactjs-popup'
import PopupPanel from 'views/BlindBox/components/NFTZone/PopupPanel'
import ConnectWalletButton from 'components/ConnectWalletButton'
import {useBlindBoxContract, useBounty} from 'hooks/useContract'
import {useCallWithGasPrice} from 'hooks/useCallWithGasPrice'
import useToast from 'hooks/useToast'
import {getAddress} from 'utils/addressHelpers'
import {useTranslation} from 'contexts/Localization'
import Loading from 'components/Loading'
import {bountiesConfig} from 'config/constants'
import Countdown from 'react-countdown'
import CountDownRender from 'components/CountDownRender'
import {useBlindBox} from '../../hooks/useBlindBox'
import {fetchAllowance, useNftUser} from '../../hooks/fetchYourNft'

interface PropSelectNFT {
  tokenId: number
  nftAddress: Address
  image: string
  type: string
}

const NFTZoneForm = ({dataBlindbox}) => {
  const {account} = useWeb3React()
  const {data} = useNftUser()
  const {t} = useTranslation()
  const {callWithGasPrice} = useCallWithGasPrice()
  const {toastSuccess, toastError} = useToast()
  const [currentTime, setCurrentTime] = useState(Date.now())
  const [allowance, setAllowance] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)
  const [nftSelected, setNftSelected] = useState<PropSelectNFT>(null)
  const bountyContract = useBounty(nftSelected?.type ?? 'gold')
  const blindBoxContract = useBlindBoxContract()

  const onStake = async (tokenId, nftAddress, image, type) => {
    setNftSelected({tokenId, nftAddress, image, type})
    await triggerAllowance(nftAddress, blindBoxConfig.contractAddress)
  }

  const triggerAllowance = async (nftAddress: Address, blindBoxNft: Address) => {
    const allowanceData = await fetchAllowance(account, nftAddress, blindBoxNft)
    setAllowance(allowanceData)
  }

  const handleApproveContract = async () => {
    try {
      setPendingTx(true)
      const tx = await callWithGasPrice(bountyContract, 'setApprovalForAll', [
        getAddress(blindBoxConfig.contractAddress),
        'true',
      ])
      const receipt = await tx.wait()
      toastSuccess('Success', t(`You just approve contract NFT`))
      await triggerAllowance(nftSelected.nftAddress, blindBoxConfig.contractAddress)
    } catch (e) {
      console.log(e)
      toastError('Error', t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
    } finally {
      setPendingTx(false)
    }
  }

  const handleStakeNFT = async () => {
    try {
      setPendingTx(true)
      const tx = await callWithGasPrice(blindBoxContract, 'stakeNFTForTicket', [
        getAddress(nftSelected.nftAddress),
        nftSelected.tokenId,
      ])
      const receipt = await tx.wait()
      toastSuccess('Success', t(`Stake NFT success`))
      await triggerAllowance(nftSelected.nftAddress, blindBoxConfig.contractAddress)
    } catch (e) {
      console.log(e)
      toastError('Error', t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
    } finally {
      setPendingTx(false)
    }
  }

  const handleUnStakeNFT = async () => {
    try {
      setPendingTx(true)
      const tx = await callWithGasPrice(blindBoxContract, 'withdrawNFT', [])
      const receipt = await tx.wait()
      toastSuccess('Success', t(`Unstake NFT success`))
      // await triggerAllowance(nftSelected.nftAddress, blindBoxConfig.contractAddress)
    } catch (e) {
      console.log(e)
      toastError('Error', t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
    } finally {
      setPendingTx(false)
    }
  }

  if (!dataBlindbox) {
    return (
      <div className="w-full flex flex-col gap-2 p-3">
        <Skeleton width="90%" height="60px" />
        <Skeleton width="50%" />
        <Skeleton width="30%" />
      </div>
    )
  }

  const {
    startTimeStakeNFTAndStakeHTD,
    timeEndStakeNFTAndStakeHTD,
    timeLockNFTAndHTD,
    userIsLockNFT,
    userNFTDetails,
    userTickets,
    totalUserStakeNFT,
  } = dataBlindbox

  const fromDate = startTimeStakeNFTAndStakeHTD * 1000
  const toDate = timeEndStakeNFTAndStakeHTD * 1000
  const timeUnlockHTD = timeLockNFTAndHTD * 1000

  const checkTimeCanClaimHTD = timeUnlockHTD > currentTime
  const checkTimeStart = fromDate > currentTime
  const checkTimeEnd = toDate < currentTime
  const checkIsOpen = !checkTimeStart && !checkTimeEnd

  const loadNftStaked = bountiesConfig.find((d) => getAddress(d.contractAddress) === userNFTDetails.nft)

  const renderButton = () => {
    if (checkIsOpen && !userIsLockNFT) {
      return (
        <Button className="mt-3" width="100%" disabled={pendingTx} onClick={handleStakeNFT}>
          <div className="flex flex-col">
            <span className="text-sm">Stake NFT</span>
            <span className="text-xs flex gap-1">
              <Countdown date={toDate} renderer={CountDownRender} />
            </span>
          </div>
        </Button>
      )
    }
    if (userIsLockNFT) {
      return (
        <Button className="mt-3" width="100%" disabled={pendingTx || checkTimeCanClaimHTD} onClick={handleUnStakeNFT}>
          <div className="flex flex-col">
            <span className="text-sm">Unstake NFT</span>
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
    <div className="w-full md:w-3/5">
      <div className="flex flex-col">
        <div className="flex gap-3">
          <div className="w-1/5">
            {!userIsLockNFT && (
              <Popup
                className="w-full"
                modal
                trigger={
                  <CardImg className="mt-3 mr-0">
                    {nftSelected ? (
                      <img className="margin-center" src={nftSelected.image} alt="htd" />
                    ) : (
                      <img className="margin-center" src="https://cdn.heroestd.io/Images/Union.svg" alt="htd" />
                    )}
                  </CardImg>
                }
              >
                {(close) => <PopupPanel close={close} onSelect={onStake} data={data} />}
              </Popup>
            )}
            {userIsLockNFT && (
              <CardImg>
                <img className="margin-center" src={loadNftStaked.image} alt="htd" />
              </CardImg>
            )}
          </div>
          <div className="w-4/5">
            <div
              className="text-sm sm:text-sm md:text-sm lg:text-sm "
              style={{textAlign: 'left', color: '#B7B8C2', width: '100%'}}
            >
              Stake-ble NFT ( Gold, Ruby )
            </div>
            <TicketCard>
              <TicketText
                className="mt-3 p-2 text-xs sm:text-xs md:text-xs lg:text-sm text-white"
                style={{textAlign: 'left', width: '100%'}}
              >
                {userIsLockNFT ? (
                  <span className="uppercase">
                    {loadNftStaked.slug} - #{userNFTDetails.tokenId}
                  </span>
                ) : nftSelected ? (
                  <span className="uppercase">
                    {nftSelected.type} - #{nftSelected.tokenId}
                  </span>
                ) : (
                  <span>Add to get 1 ticket</span>
                )}
              </TicketText>
            </TicketCard>
          </div>
        </div>
        <ParticipantCard className="mt-3 p-3">
          <div className="flex justify-between">
            <Text>Total User(s) Staked:</Text>
            <Text>{formatNumber(totalUserStakeNFT, 0)}</Text>
          </div>
          <div className="flex justify-between mt-3">
            <Text>Claimed tickets:</Text>
            <div className="flex flex-row">
              <Text color="#D5B75F">{userTickets}</Text>
              <img src="https://cdn.heroestd.io/Images/Ticket.svg" alt="ticket" />
            </div>
          </div>
        </ParticipantCard>
        {account ? (
          allowance || userIsLockNFT ? (
            renderButton()
          ) : checkIsOpen ? (
            <>
              {nftSelected && (
                <Button disabled={pendingTx} className="mt-3" width="100%" onClick={handleApproveContract}>
                  Approve Contract
                </Button>
              )}
              {!nftSelected && (
                <Button className="mt-3" width="100%" disabled>
                  Please, choose NFT !
                </Button>
              )}
            </>
          ) : checkTimeStart ? (
            <Button className="mt-3" width="100%" disabled>
              <div className="flex flex-col">
                <span className="text-sm">Starts in</span>
                <Countdown date={fromDate} renderer={CountDownRender} />
              </div>
            </Button>
          ) : (
            <Button className="mt-3" width="100%" disabled>
              Ended
            </Button>
          )
        ) : (
          <ConnectWalletButton />
        )}
      </div>
    </div>
  )
}

export default NFTZoneForm

const CardImg = styled.div`
  background: #272727;
  box-sizing: border-box;
  border-radius: 5px;
  position: relative;
  flex: 1;
  :hover {
    cursor: pointer;
  }
`

const TicketCard = styled.div`
  background: #272727;
  box-sizing: border-box;
  border-radius: 5px;
  position: relative;
  flex: 1;
`

const TicketText = styled.div`
  box-sizing: border-box;
  border-radius: 5px;
  position: relative;
  flex: 1;
`
const ParticipantCard = styled.div`
  background: #111111;
  box-sizing: border-box;
  border-radius: 5px;
`
