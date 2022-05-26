import React, { useEffect, useState } from 'react'
import Page from 'components/Layout/Page'
import styled from 'styled-components'
import { Hero } from 'components/KShark'
import { useModal }  from '@pancakeswap/uikit'
import { Button, Heading, Text, LogoIcon } from 'components/Pancake-uikit'
import { Flex, Box } from '@chakra-ui/react'
import { useTranslation } from 'contexts/Localization'
import { useParams, NavLink, useHistory } from 'react-router-dom'
import { fetchItemConfig, fetchRuneConfig } from 'state/common/commonSlice'
import fetchAttributeHero, { fetchAttributeHero2 } from 'utils/getAttributeHero'
import { AppState, useAppDispatch } from 'state'
import { useWeb3React } from '@web3-react/core'
import HeroDetails from 'views/MarketPlaceHeroDetails/components/HeroDetails'
import Popup from 'reactjs-popup'
import { holdInGameConfig, marketplaceConfig } from 'config/constants'
import { MarketplaceType } from 'config/constants/types'
import heroNftConfig from 'config/constants/heroNFT'
import { getAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'
import { useSelector } from 'react-redux'
import getBalanceOf from 'utils/getBalanceOf'
import heroestdApi from 'api/heroestdApi'
import { BIG_TEN } from 'utils/bigNumber'
import tokens from 'config/constants/tokens'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useIsApprovedForAll from 'hooks/useIsApprovedForAll'
import getOwner from 'utils/getOwner'
import useToast from 'hooks/useToast'
import { useMarketplaceBox, useHeroContract, useHoldInGameContract, useERC20 } from 'hooks/useContract'
import LinkWallet from 'components/LinkWallet'
import BuyToken from 'components/BuyToken'
import PopupLogin from 'components/Pancake-uikit/widgets/Menu/components/PopupLogin'
import { formatNumber } from 'utils/formatBalance'
import checkBalance from 'utils/checkBalance'
import checkAllowance from 'utils/checkAllowance'
import ApproveModal from 'components/ApproveModal/ApproveModal'
import PopupComplete from 'components/Popup/PopupComplete'
import TokenModal from 'components/TokenModal/TokenModal'
import PopupSellHero from './components/PopupSellHero'
import PopupTransferHero from './components/PopupTransferHero'
import PopupSummonHero from './components/PopupSummonHero'

const HeroNftDetails = () => {
  const { id }: any = useParams()
  const [heroesDetail, setHeroesDetail] = useState({
    owner: null,
    seller: null,
    orderId: null,
    status: -1,
    price: null
  })
  const { account } = useWeb3React()
  const [idHero, setIdHero] = useState(0)
  const history = useHistory()
  const { t } = useTranslation()
  const [resErr, setResErr] = useState(false)
  const dispatch = useAppDispatch()
  const [pendingTx, setPendingTx] = useState(false)
  const [purchasedTx, setPurchasedTx] = useState(false)
  const [approveTx, setApproveTx] = useState(false)
  const [balanceToken, setBalanceToken] = useState(0)
  const { state: path }: any = history.location

  const marketplaceContract = useMarketplaceBox(MarketplaceType.HERO)
  const holdInGameContract = useHoldInGameContract()
  const heroContract = useHeroContract()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { toastSuccess, toastError } = useToast()
  const allowance = useIsApprovedForAll(heroNftConfig.contractAddress, marketplaceConfig.contractAddress.hero)
  const allowanceHold = useIsApprovedForAll(heroNftConfig.contractAddress, holdInGameConfig.contractAddress)
  const userData = useSelector((state: AppState) => state.user.userInfo)
  const minPrices = useSelector((state: AppState) => state.marketplace.minPrices)
  const tokenNeedHold = useSelector((state: AppState) => state.user.tokenNeedHold)
  const minPrice = 0
  const walletInGame = userData.walletAddress
  const tokenContract = useERC20(getAddress(tokens.big.address))
  const [openLinkWallet] = useModal(<LinkWallet userData={userData} />)
  const [openBuyToken] = useModal(<BuyToken tokenNeedHold={tokenNeedHold} />)
  const [openModalToken] = useModal(<TokenModal symbol='BIG'/>, false)
  const [openModalApprove] = useModal(<ApproveModal 
    contractApprove={tokenContract} 
    contractNeedApprove={getAddress(marketplaceConfig.contractAddress.hero)}
    title="Enable NFT Purchase"
  />, false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const balance = await getBalanceOf(account, tokens.big.address)
        const ownerToken = await getOwner(heroNftConfig.contractAddress, id)
        const res: any = await heroestdApi.getHeroAttribuse(id)
        const dataMarket: any = await heroestdApi.getHeroOnMarket(id)
        const newData: any = {...res, owner: ownerToken, ...dataMarket.data}
        console.log("newData", newData)
        setHeroesDetail(newData)
        setBalanceToken(balance)
      } catch (error) {
        setResErr(true);
        console.log(error)
      }
    }
    fetchData()
  }, [id, history, path, account])

  // useEffect(() => {
  //   dispatch(fetchItemConfig())
  //   dispatch(fetchRuneConfig())
  // }, [dispatch])

  const handleApprove = async(contractNeedApprove) => {
    try {
      setApproveTx(true)
      const tx = await callWithGasPrice(heroContract, 'setApprovalForAll', [getAddress(contractNeedApprove), 'true'])
      const receipt = await tx.wait()
      toastSuccess('Success', 'Approval successful !')
    }
    catch(error) {
      toastError("Error", error?.data?.message)
      console.log(error)
    }
    finally {
      setApproveTx(false)
    }
  }

  const handleSell = async(prices: number) => {
    try {
      setPendingTx(true)
      const tx = await callWithGasPrice(
        marketplaceContract, 
        'startSales', 
        [id, new BigNumber(prices).multipliedBy(BIG_TEN.pow(tokens.big.decimals)).toString(), getAddress(heroNftConfig.contractAddress), getAddress(tokens.big.address)]
      )
      const receipt = await tx.wait()
      toastSuccess('Success', 'Selling order successful')
      setPurchasedTx(true)
    } catch(error) {
      toastError(error?.data?.message)
      console.log(error)
    } finally {
      setPendingTx(false)
    }
  }

  const handleSend = async(accountRecive: string) => {
    try {
      setPendingTx(true)
      const tx = await callWithGasPrice(heroContract, 'transferFrom', [account, accountRecive, id])
      const receipt = await tx.wait()
      toastSuccess('Success', 'Send successful')
      history.push('/my-assets')
    }
    catch(error) {
      toastError("Error", error?.data?.message)
      console.log(error)
    }
    finally {
      setPendingTx(false)
    }
  }

  const handleDeposit = async(userId) => {
    try {
      if (!walletInGame) {
        openLinkWallet()
      }
      else if (balanceToken < tokenNeedHold) {
        openBuyToken()
      } else {
        setPendingTx(true)
        const tx = await callWithGasPrice(
          holdInGameContract, 
          'depositNFTIntoGame', 
          [getAddress(heroNftConfig.contractAddress), id, userId]
        )
        const receipt = await tx.wait()
        toastSuccess('Success', 'Add to game successful')
        history.push('/my-assets')
      }
    } catch(error) {
      toastError(error?.data?.message)
      console.log(error)
    } finally {
      setPendingTx(false)
    }
  }

  const handleCancel = async() => {
    try {
      setPendingTx(true)
      const tx = await callWithGasPrice(marketplaceContract, 'cancelSales', [heroesDetail.orderId])
      const receipt = await tx.wait()
      toastSuccess('Success', 'Cancellation successful')
      history.push('/marketplace')
    } catch (error) {
      toastError("Error", error?.data?.message)
    } finally {
      setPendingTx(false)
    }
  }

  const handleBuy = async() => {
    try {
      setPendingTx(true)
      const balance = await checkBalance(account, tokens.big.address, tokens.big.decimals)
      const allowanceToken = await checkAllowance(account, tokens.big.address, marketplaceConfig.contractAddress.hero)
      if (!allowanceToken) {
        openModalApprove()
        return
      }
      if (balance < heroesDetail.price) {
        openModalToken()
        return
      }
      console.log("heroesDetail.orderId", heroesDetail.orderId)
      const tx = await callWithGasPrice(marketplaceContract, 'buy', [heroesDetail.orderId])
      const receipt = await tx.wait()
      toastSuccess('Success', 'You\'ve successfully bought the NFT')
      history.push('/marketplace')
    } catch(error) {
      console.log(error)
    } finally {
      setPendingTx(false)
    }
  }

  const isOwner = account?.toLowerCase() === heroesDetail?.seller?.toLowerCase()

  return (
    !resErr
    ?
    <Page>
      <Header className="flex flex-wrap flex-col pt-0 md:pt-10 lg:pt-0">
        <Hero>
          <Heading as="h2" size="xl" color="#ffffff">
            <NavLink to={`${history.location.state ?? '#'}`}>
              <div className="flex">
                <img src='/images/marketplace/left-arrow.svg' alt='back' className='p-1' />
                <p style={{ fontSize: '20px', paddingLeft: '16px' }}>{t('Back')}</p>
              </div>
            </NavLink>
          </Heading>
        </Hero>
      </Header>
      <Flex justifyContent='flex-end'>
        <Flex>
        {
          isOwner
          ?
          <Button
            onClick={handleCancel}
            disabled={pendingTx}
            variant="warning"
            style={{ flex: 1 }}
          >
            { pendingTx ? 'Canceling...' : 'Cancel' }
          </Button>
          :
            heroesDetail.status === 0
            ?
            <Flex alignItems='center' gridGap={5}>
              <Flex alignItems='center' gridGap={2}>
                <Box><img src='/images/coins/big.png' alt='token' width={30} /></Box>
                <Text fontSize='24px' fontWeight='bold'>{formatNumber(heroesDetail.price ?? 0)} BIG</Text>
              </Flex>
              <Button
                onClick={handleBuy}
                disabled={pendingTx}
                style={{ flex: 1 }}
              >
                { pendingTx ? 'Processing...' : 'Purchase' }
              </Button>
            </Flex>
          : null
        }
        </Flex>
      </Flex>
      {
        account === heroesDetail.owner && <Flex justifyContent='flex-end'>
        <Flex alignItems="center" gridGap={2} justifyContent='flex-end' flexDirection={{ base: 'column', md: 'row' }} width={{ base: '100%', md: 'auto' }}>
          <Flex gridGap={5} width={{ base: '100%' }} justifyContent="flex-end">
            <Popup
              className="w-full"
              modal
              trigger={
                <Button
                  variant="primary"
                  style={{ flex: 1, padding: '0 50px', backgroundColor: '#00BFD5' }}
                  className='flex'
                >
                  <div className="flex flex-row justify-center items-center gap-2">
                    <img src="/images/sell.svg" alt="coin" className="w-5" />
                    <Text style={{ color: 'white', fontWeight: 'nornal', fontSize: '16px' }}>Sell</Text>
                  </div>
                </Button>
              }
            >
              {(close) =>
                !purchasedTx ?
                  <PopupSellHero 
                    close={close} 
                    heroesDetail={heroesDetail} 
                    idHero={id} 
                    isAllowance={allowance}
                    onApprove={() => handleApprove(marketplaceConfig.contractAddress.hero)}
                    approveTx={approveTx}
                    onSell={handleSell}
                    pendingTx={pendingTx}
                    minPrice={minPrice}
                  />
                :
                (
                  <PopupComplete
                    close={close}
                    clearPopup={() => setPurchasedTx(false)}
                    buttonGoto="Marketplace"
                    path='/marketplace'
                    description='Your order listing on marketplace'
                  />
                )
              }
            </Popup>
            <Popup
              className="w-full"
              modal
              trigger={
                <Button
                  style={{ flex: 1, padding: '0 50px', backgroundColor: '#00BFD5' }}
                  className='flex'
                >
                  <div className="flex flex-row justify-center items-center gap-2">
                    <img src="/images/transfer.svg" alt="coin" className="w-5" />
                    <Text style={{ color: 'white', fontWeight: 'nornal', fontSize: '16px' }}>Transfer</Text>
                  </div>
                </Button>
              }
            >
              {(close) =>
                !purchasedTx ?
                  <PopupTransferHero 
                    close={close} 
                    heroesDetail={heroesDetail} 
                    idHero={id} 
                    pendingTx={pendingTx}
                    onSend={handleSend}
                  />
                :
                (
                  <PopupComplete
                    close={close}
                    clearPopup={() => setPurchasedTx(false)}
                    buttonGoto="My assets"
                    path='/my-assets'
                    description='Transfer successful !'
                  />
                )
              }
            </Popup>
            {/* <Popup
              className="w-full"
              modal
              trigger={
                <Button
                  variant="tertiary"
                  style={{ flex: 1, padding: '0 25px' }}
                  scale="sm"
                  className="flex border border-solid border-gray-500"
                >
                  <div className="flex flex-row justify-center items-center gap-2">
                    <img src="https://cdn.heroestd.io/Images/sell.png" alt="summon" className="w-5" />
                    <Text style={{ color: 'white', fontWeight: 'nornal', fontSize: '12px' }}>Summon</Text>
                  </div>
                </Button>
              }
            >
              {(close) => <PopupSummonHero close={close} heroesDetail={heroesDetail} />}
            </Popup> */}
            {/* {
              allowanceHold ?
                userData?.userID
                ?
                  <Button
                    style={{ flex: 1, padding: '0 25px', minWidth: 'fit-content' }}
                    scale='sm'
                    variant='primaryDark'
                    onClick={() => handleDeposit(userData.userID)}
                    disabled={pendingTx}
                  >
                  { pendingTx ? 'Processing...' : 'Add to game' }
                  </Button>
                :
                  <Popup
                    className="w-full"
                    modal
                    trigger={
                      <Button
                        style={{ backgroundColor: '#202020', width: '136px', textOverflow: 'ellipsis' }}
                        variant="text"
                        scale="sm"
                        className="flex border border-solid border-gray-500"
                      >
                        <img
                          src="/logo.svg"
                          height="12px"
                          style={{
                            paddingLeft: '30px',
                            transform: 'translateX(-15px)',
                            height: '24px',
                            width: 'auto',
                          }}
                          alt="DarkLand"
                        />
                        Login
                      </Button>
                    }
                  >
                    {(close) => <PopupLogin close={close} setToken={() => null} />}
                  </Popup>
              :
                <Button
                  style={{ flex: 1, padding: '0 25px', minWidth: 'fit-content' }}
                  scale='sm'
                  onClick={() => handleApprove(holdInGameConfig.contractAddress)}
                  disabled={approveTx}
                >
                { approveTx ? 'Processing...' : 'Approve to game' }
                </Button>
            } */}
          </Flex>
        </Flex>
      </Flex>
      }
      <HeroDetails idHero={id} heroesDetail={heroesDetail} isNFT />
    </Page>
    :
    <Page>
      <StyledNotFound>
        <LogoIcon width="64px" mb="8px" />
        <Heading scale="xxl">404</Heading>
        <Text mb="16px">{t('Oops, hero not found.')}</Text>
        <Button as="a" href='/my-assets' scale="sm">
          {t('Go Back')}
        </Button>
      </StyledNotFound>
    </Page>
  )
}


const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
`

export default React.memo(HeroNftDetails)
