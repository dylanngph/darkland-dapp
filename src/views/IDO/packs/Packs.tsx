import React, {useState, useEffect, useMemo} from 'react'
import {useWeb3React} from '@web3-react/core'
import {Button, Skeleton} from 'components/Pancake-uikit'
import {Box} from '@chakra-ui/react'
import {CheckCircleIcon} from '@chakra-ui/icons'
import styled from '@emotion/styled'
import Popup from 'reactjs-popup'
import {MaxUint256} from '@ethersproject/constants'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Countdown from 'react-countdown'
import CountDownRender from 'components/CountDownRender'
import useToast from 'hooks/useToast'
import {useCallWithGasPrice} from 'hooks/useCallWithGasPrice'
import {useBounty, useERC20, useIdo} from 'hooks/useContract'
import {formatNumber} from 'utils/formatBalance'
import {Address} from 'config/constants/types'
import {useTranslation} from 'contexts/Localization'
import {getAddress} from 'utils/addressHelpers'
import {fetchAllowance, fetchUserIsLock} from '../hooks/fetchIDO'
import PopupPanel from './PopupPanel'
import PopupCheckout from './PopupCheckout'
import {ReactComponent as AddIcon} from './plus.svg'

const Packs = ({isMobile, idoId, data, dataLocked, isLoading, setRefresh}) => {
  const dataMemo = useMemo(() => data, [data])
  const dataIDO = useMemo(() => dataLocked, [dataLocked])
  const {t} = useTranslation()
  const {account} = useWeb3React()
  const [allowance, setAllowance] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)
  const [currentTime, setCurrentTime] = useState(Date.now())
  
  // const [dataLocked, setDataLocked] = useState({
  //     isLocked: false,
  //     timeLockNFT: 0,
  //     isPaid: false,
  //     tokenAllowance: false,
  //     isClaim: false,
  //     balanceOf: 0,
  //     timeClaimIDO: 0,
  //     userWhitelist: false
  // })
  const {toastSuccess, toastError} = useToast()
  const {callWithGasPrice} = useCallWithGasPrice()
  const [selected, setSelected] = useState({
    tokenId: null,
    nftAddress: null,
    image: null,
    type: 'ruby',
  })
  const bountyContract = useBounty(selected.type)
  const idoContract = useIdo(Number(idoId))
  const tokenPriceContract = useERC20(getAddress(dataMemo.tokenPrice.address))
  const timeLock = dataIDO.timeLockNFT * 1000
  const timeClaimIDO = dataIDO.timeClaimIDO * 1000
  const endTimeStakeNFT = dataIDO.endTimeStakeNFT * 1000

  const checkTimeUnstakeNFT = timeLock > currentTime
  const checkTimeClaimIDO = timeClaimIDO > currentTime
  const isUserWhiteList = !dataIDO.isLocked && dataIDO.userWhitelist
  const balanceNotEnough = dataIDO.balanceOf < dataMemo.priceBuy
  const checkEndTimeStakeNFT = currentTime > endTimeStakeNFT

  const handleSelect = async (tokenId, nftAddress: Address, image: string, type: string) => {
    setSelected({
      tokenId,
      nftAddress,
      image,
      type,
    })
    await triggerAllowance(nftAddress, dataMemo.contractAddress)
  }

  const triggerAllowance = async (nftAddress: Address, idoAddress: Address) => {
    const allowanceData = await fetchAllowance(account, nftAddress, idoAddress)
    setAllowance(allowanceData)
  }

  const triggerIsLockNFT = async (idoAddress: Address) => {
    const lock = await fetchUserIsLock(account, idoAddress, idoId)
    // setDataLocked(lock)
  }

  const handleApproveContract = async () => {
    try {
      setPendingTx(true)
      const tx = await callWithGasPrice(bountyContract, 'setApprovalForAll', [
        getAddress(dataMemo.contractAddress),
        'true',
      ])
      const receipt = await tx.wait()
      toastSuccess('Success', t(`You just approve contract NFT`))
      await triggerAllowance(selected.nftAddress, dataMemo.contractAddress)
      setRefresh(Date.now())
    } catch (e) {
      console.log(e)
      toastError('Error', t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
    } finally {
      setPendingTx(false)
    }
  }

  const handleStakeNft = async () => {
    try {
      setPendingTx(true)
      const tx = await callWithGasPrice(idoContract, 'stakeNFTForWhitelist', [
        getAddress(selected.nftAddress),
        selected.tokenId,
      ])
      const receipt = await tx.wait()
      toastSuccess('Success', t(`Staked NFT`))
      await triggerAllowance(selected.nftAddress, dataMemo.contractAddress)
      setRefresh(Date.now())
    } catch (e) {
      console.log(e)
      toastError('Error', e?.data?.message)
    } finally {
      setPendingTx(false)
    }
  }

  const handleWithdrawNFT = async () => {
    try {
      setPendingTx(true)
      const tx = await callWithGasPrice(idoContract, 'claimNFT', [])
      const receipt = await tx.wait()
      toastSuccess('Success', t(`You just withdraw a NFT`))
      setRefresh(Date.now())
    } catch (e) {
      console.log(e)
      toastError('Error', e?.data?.message)
    } finally {
      setPendingTx(false)
    }
  }

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
  //         setIsLoading(true)
  //         // const dataUser = await fetchUserIsLock(account, dataMemo.contractAddress, Number(idoId))
  //         // setDataLocked(dataUser)
  //         setIsLoading(false)
  //     }
  //     fetchLocked()
  // }, [account, dataLocked, idoId])

  const {nftRequire} = data

  if (isLoading)
    return (
      <div className="w-full md:w-3/3 flex flex-col gap-5">
        <Skeleton width="100%" />
        <Skeleton width="70%" />
        <Skeleton width="50%" />
      </div>
    )

  const ComponentEnd = () => {
    if (!checkTimeClaimIDO && !dataIDO.isPaid && checkEndTimeStakeNFT)
      return (
        <Button disabled={!checkTimeClaimIDO} className="w-full">
          Ended
        </Button>
      )
    return null
  }

  const ComponentPurchase = () => {
    if (checkTimeClaimIDO) {
      if (balanceNotEnough && !dataIDO.isPaid) {
        return (
          <Button disabled className="w-full">
            Not enough balance !
          </Button>
        )
      }
      return (
        !dataIDO.isPaid &&
        dataIDO.tokenAllowance &&
        dataIDO.userWhitelist && (
          <div className="w-full">
            <Popup
              className="w-full overflow-auto"
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
    return null
  }

  const ComponentApprove = () => {
    if (checkTimeClaimIDO) {
      return (
        dataIDO.userWhitelist &&
        !dataIDO.tokenAllowance &&
        !balanceNotEnough && (
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
        <Button className="w-full" onClick={handleClaimIDO} disabled={pendingTx || checkTimeClaimIDO}>
          <div className="flex flex-col">
            <p>{pendingTx ? 'Claiming...' : 'Claim'}</p>
            {checkTimeClaimIDO && (
              <Countdown
                className="text-xs"
                date={timeClaimIDO}
                onComplete={handleComplete}
                renderer={CountDownRender}
              />
            )}
          </div>
        </Button>
      )
    )
  }

  const ComponentNotify = () => {
    if (
      !isUserWhiteList &&
      !selected.tokenId &&
      !dataIDO.isLocked &&
      checkTimeClaimIDO &&
      !balanceNotEnough &&
      !checkEndTimeStakeNFT
    ) {
      return (
        <Button disabled className="w-full">
          Please choose NFT & Stake
        </Button>
      )
    }
    return null
  }

  const ComponentStatusStake = () => {
    if (checkTimeClaimIDO) {
      if (checkEndTimeStakeNFT) {
        return 'IDO Whitelist Ended'
      }
      return 'Please choose NFT'
    }
    return 'IDO Ended'
  }

  return (
    <Wrapper className="flex flex-col md:flex-row shadow gap-10">
      {account ? (
        <>
          <div className="w-full md:w-2/5">
            <div className="flex flex-col gap-3">
              {!dataIDO.userWhitelist ? (
                <Popup
                  contentStyle={{overflow: 'auto', height: '100%'}}
                  className="w-full"
                  disabled={dataIDO.isLocked || !checkTimeClaimIDO || dataIDO.isClaim || checkEndTimeStakeNFT}
                  modal
                  trigger={
                    <AddBox className="w-full">
                      {selected.tokenId ? <img src={selected.image} alt="NFT" className="h-full" /> : <AddIcon />}
                    </AddBox>
                  }
                >
                  {(close) => <PopupPanel close={close} idoId={idoId} onSelect={handleSelect} />}
                </Popup>
              ) : (
                <img src="/images/ido/free_pack.jpg" alt="Whitelist Zone" />
              )}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                }}
              >
                {!isUserWhiteList && !dataIDO.isLocked && !selected.tokenId && (
                  <div className="text-yellow-400 text-sm">{ComponentStatusStake()}</div>
                )}
                {!isUserWhiteList && <div className="text-gray text-sm">Stake-able NFTs:</div>}
                {!isUserWhiteList && (
                  <div className="uppercase font-bold">{nftRequire.map((d) => d.name).join(', ')}</div>
                )}
                <div className="w-full">
                  {!isUserWhiteList && dataIDO.isLocked ? (
                    <Button
                      variant="warning"
                      height="40px"
                      className="w-full"
                      disabled={pendingTx || checkTimeUnstakeNFT || !dataIDO.isClaim}
                      onClick={handleWithdrawNFT}
                    >
                      <div className="flex flex-col">
                        <span className="text-sm">Unstake NFT</span>
                        {checkTimeUnstakeNFT && (
                          <Countdown
                            className="text-xs"
                            date={timeLock}
                            onComplete={handleComplete}
                            renderer={CountDownRender}
                          />
                        )}
                      </div>
                    </Button>
                  ) : null}
                  {allowance
                    ? !dataIDO.isLocked && (
                        <Button
                          variant="warning"
                          className="w-full"
                          height="26px"
                          disabled={pendingTx || !selected.tokenId || !checkTimeClaimIDO}
                          onClick={handleStakeNft}
                        >
                          <span className="text-sm">Stake</span>
                        </Button>
                      )
                    : selected.tokenId && (
                        <Button
                          disabled={pendingTx || !checkTimeClaimIDO}
                          className="w-full"
                          variant="warning"
                          height="26px"
                          onClick={handleApproveContract}
                        >
                          <span className="text-sm">Enable contract</span>
                        </Button>
                      )}
                </div>
              </Box>
            </div>
          </div>
          <div className="w-full md:w-3/5 flex flex-col justify-between">
            <div>
              {isUserWhiteList && (
                <Flex>
                  <div className="text-green-400 font-bold">You are in whitelist</div>
                  <CheckCircleIcon color="green.400" />
                </Flex>
              )}
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
            <div className="mt-2">
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
              <ComponentEnd />
              <ComponentPurchase />
              <ComponentApprove />
              <ComponentClaim />
              <ComponentNotify />
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
