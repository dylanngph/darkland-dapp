import React, { useCallback, useEffect, useState } from 'react'
import Page from 'components/Layout/Page'
import { Flex } from '@chakra-ui/react'
import styled from 'styled-components'
import { Hero } from 'components/KShark'
import { useModal } from '@pancakeswap/uikit'
import { Button, Heading, Text, LogoIcon } from 'components/Pancake-uikit'
import { useTranslation } from 'contexts/Localization'
import { useParams, NavLink, useHistory } from 'react-router-dom'
import './heroesDetails.modules.scss'
import heroestdApi from 'api/heroestdApi'
import { useWeb3React } from '@web3-react/core'
import migrateAttributeHero from 'utils/migrateAttributeHero'
import useIsApprovedForAll from 'hooks/useIsApprovedForAll'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useToast from 'hooks/useToast'
import { getAddress } from 'utils/addressHelpers'
import LinkWallet from 'components/LinkWallet'
import { useHeroContract, useHoldInGameContract } from 'hooks/useContract'
import { heroNftConfig, holdInGameConfig } from 'config/constants'
import { fetchItemConfig, fetchRuneConfig } from 'state/common/commonSlice'
import { useSelector } from 'react-redux'
import { AppState, useAppDispatch } from 'state'
import Sell from './components/Sell'
import HeroDetails from './components/HeroDetails'
import EggDetails from './EggDetails'

const HeroInGame = () => {
  const { id }: any = useParams()
  const [heroesDetail, setHeroesDetail] = useState({
    heroId: 1,
    tokenId: null
  })
  const { account } = useWeb3React()
  const [idHero, setIdHero] = useState(0)
  const history = useHistory()
  const { t } = useTranslation()
  const [resErr, setResErr] = useState(false)
  const dispatch = useAppDispatch()
  const [pendingTx, setPendingTx] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [approveTx, setApproveTx] = useState(false)
  const { callWithGasPrice } = useCallWithGasPrice()
  const { toastSuccess, toastError } = useToast()
  const holdInGameContract = useHoldInGameContract()
  const heroContract = useHeroContract()
  const { state: path, hash }: any = history.location
  const allowanceHold = useIsApprovedForAll(heroNftConfig.contractAddress, holdInGameConfig.contractAddress)
  const userData = useSelector((state: AppState) => state.user.userInfo)
  const walletInGame = userData.walletAddress
  const [openLinkWallet] = useModal(<LinkWallet userData={userData} />)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res
        if (path?.includes('blind-box')) {
          const { data } = await heroestdApi.getHeroDetailsInBlindBox(id)
          res = data
        }
        else {
          const { data } = await heroestdApi.getHeroDetails(id)
          res = data
        }
        setIdHero(id)
        setHeroesDetail(res)
      } catch (error) {
        setResErr(true);
        console.log(error)
      }
    }
    fetchData()
  }, [id, history, path])

  useEffect(() => {
    dispatch(fetchItemConfig())
    dispatch(fetchRuneConfig())
  }, [dispatch])

  useEffect(() => {
    setIsOwner(account === userData?.walletAddress)
  }, [account, userData])

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

  const handleWithdraw = async(tokenId, walletAddress, userId) => {
    try {
      if (!walletInGame) {
        openLinkWallet()
      } else {
        setPendingTx(true)
        const tx = await callWithGasPrice(
          holdInGameContract, 
          'withdrawNFT', 
          [getAddress(heroNftConfig.contractAddress), tokenId, walletAddress, userId]
        )
        const receipt = await tx.wait()
        toastSuccess('Success', 'Add to wallet successful')
        history.push('/my-assets')
      }
    } catch(error) {
      toastError(error?.data?.message)
      console.log(error)
    } finally {
      setPendingTx(false)
    }
  }

  return (
    !resErr
    ?
    <Page>
      <Header className="flex flex-wrap flex-col pt-0 md:pt-10 lg:pt-0">
        <Hero>
          <Heading as="h2" size="xl" color="#ffffff">
            <NavLink to={`${history.location.state ?? '#'}`}>
              <div className="flex btn-back ">
                <img src="/images/marketplace/left-arrow.png" alt="back" className="p-1" />
                <p style={{ fontSize: '20px', paddingLeft: '16px' }}>{t('Back')}</p>
              </div>
            </NavLink>
          </Heading>
        </Hero>
      </Header>
      <Flex justifyContent={{ md: 'flex-end' }}>
      {
        (userData?.userID && Number(heroesDetail?.tokenId) >= 0 && account === userData?.walletAddress) && <Flex alignItems="center" gridGap={2} flexDirection={{ base: 'column', md: 'row' }} width={{ base: '100%', md: 'auto' }}>
        {
          allowanceHold ?
            <Button
              style={{ flex: 1, padding: '0 25px', minWidth: 'fit-content' }}
              scale='sm'
              variant='primaryDark'
              onClick={() => handleWithdraw(heroesDetail.tokenId, userData.walletAddress, userData.userID)}
              disabled={pendingTx}
            >
            { pendingTx ? 'Processing...' : 'Withdraw to wallet' }
            </Button>
          :
          <Button
            style={{ flex: 1, padding: '0 25px', minWidth: 'fit-content' }}
            scale='sm'
            onClick={() => handleApprove(holdInGameConfig.contractAddress)}
            disabled={approveTx}
          >
          { approveTx ? 'Processing...' : 'Approve to game' }
          </Button>
        }
        </Flex>
      }
      </Flex>
      <HeroDetails idHero={idHero} heroesDetail={heroesDetail} />
    </Page>
    :
    <Page>
      <StyledNotFound>
        <LogoIcon width="64px" mb="8px" />
        <Heading scale="xxl">404</Heading>
        <Text mb="16px">{t('Oops, hero not found.')}</Text>
        <Button as="a" href="/my-assets" scale="sm">
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

export default HeroInGame
