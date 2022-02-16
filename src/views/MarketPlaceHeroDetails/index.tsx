import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Page from 'components/Layout/Page'
import { Box, Flex, Spinner } from '@chakra-ui/react'
import styled from 'styled-components'
import { Hero } from 'components/KShark'
import { Button, Heading, Text, LogoIcon } from 'components/Pancake-uikit'
import { useTranslation } from 'contexts/Localization'
import { useParams, NavLink, useHistory } from 'react-router-dom'
import './heroesDetails.modules.scss'
import heroestdApi from 'api/heroestdApi'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { fetchItemConfig, fetchRuneConfig } from 'state/common/commonSlice'
import { updateUserMarketplace } from 'state/user/actions'
import useToast from 'hooks/useToast'
import { useSelector } from 'react-redux'
import { marketplaceConfig } from 'config/constants'
import useRefresh from 'hooks/useRefresh'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useERC20, useMarketplaceBox } from 'hooks/useContract'
import { MarketplaceType } from 'config/constants/types'
import { fetchAllowance } from 'views/MarketPlace/hooks/useMarketplace'
import {MaxUint256} from '@ethersproject/constants'
import { getAddress } from 'utils/addressHelpers'
import tokens from 'config/constants/tokens'
import { AppState, useAppDispatch } from 'state'
import { formatNumber } from 'utils/formatBalance'
import HeroDetails from './components/HeroDetails'

const MarketPlaceHeroDetails = () => {
  const { id }: any = useParams()
  const [heroesDetail, setHeroesDetail] = useState({
    heroId: 1,
    seller: null,
    price: 0,
    id: null,
    mkstatus: -1
  })
  const history = useHistory()
  const [idHero, setIdHero] = useState(0)
  const { fastRefresh } = useRefresh()
  const [pendingTx, setPendingTx] = useState(false)
  const [resErr, setResErr] = useState(false)
  const dataUser = useSelector<AppState, AppState['user']['userMarketplace']>(state => state.user.userMarketplace)
  const { state: path }: any = history.location
  
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { account } = useActiveWeb3React()
  const { toastError, toastSuccess } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const marketplaceContract = useMarketplaceBox(MarketplaceType.HERO)
  const tokenContract = useERC20(getAddress(tokens.busd.address))
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const IS_NFT = /\W|_/
        // const match = id.match(IS_NFT)
        // let res
        // if (path.includes('blind-box')) {
        //   const { data } = await heroestdApi.getHeroDetailsInBlindBox(id)
        //   res = data
        //   setIdHero(id)
        // }
        // else if (path.includes('marketplace')) {
        //   const { data } = await heroestdApi.getHeroDetailsMarketPlace(id)
        //   res = data
        //   setIdHero(id)
        // }
        // else {
        //   // console.log('.')
        //   // if (match?.length === undefined) {
        //   //   const { data } = await heroestdApi.getHeroDetails(id)
        //   //   res = data
        //   //   setIdHero(id)
        //   // } else {
        //   //   const attr = id.split('-')
        //   //   res = migrateAttributeHero(attr[0])
        //   //   setIdHero(Number(attr[1]))
        //   // }
        //   const { data } = await heroestdApi.getHeroDetailsMarketPlace(id)
        //   res = data
        //   setIdHero(id)
        // }
        const { data } = await heroestdApi.getHeroDetailsMarketPlace(id)
        const res = data
        setIdHero(id)
        setHeroesDetail(res)
      } catch (error) {
        setResErr(true);
        console.log(error)
      }
    }
    fetchData()
  }, [id, history, path])

  const fetchUser = useCallback(async() => {
    const tokenAllowance: any = await fetchAllowance(account, marketplaceConfig.contractAddress.hero, tokens.busd.address)
    dispatch(updateUserMarketplace({...tokenAllowance, isLoaded: true }))
  }, [account, dispatch])

  useEffect(() => {
    if (account) fetchUser()
  }, [account, fetchUser, fastRefresh])

  useEffect(() => {
    dispatch(fetchItemConfig())
    dispatch(fetchRuneConfig())
  }, [dispatch])

  const handleCancel = async() => {
    try {
      setPendingTx(true)
      const tx = await callWithGasPrice(marketplaceContract, 'cancelSales', [heroesDetail.id])
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
      const tx = await callWithGasPrice(marketplaceContract, 'buy', [heroesDetail.id])
      const receipt = await tx.wait()
      toastSuccess('Success', 'You\'ve successfully bought the NFT')
      history.push('/marketplace')
    } catch (error) {
      toastError("Error", error?.data?.message)
    } finally {
      setPendingTx(false)
    }
  }

  const handleApprove = async () => {
    try {
      setPendingTx(true)
      const tx = await callWithGasPrice(tokenContract, 'approve', [
        getAddress(marketplaceConfig.contractAddress.hero),
        MaxUint256,
      ])
      const receipt = await tx.wait()
      toastSuccess('Success', 'Approval successful')
      await fetchUser()
    } catch(err) {
      toastError('Error', err?.data?.message)
      console.log(err)
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
      {(heroesDetail && heroesDetail.price && heroesDetail?.mkstatus === 0) ? <Box display={{ md: 'flex' }} alignItems="center" justifyContent="flex-end">
        <Flex gridGap={{ base: 1, md: 5 }} flexDirection={{ base: 'column', md: 'row' }} height={16} alignItems={{ md: "center" }}>
          <Flex alignItems="center" gridGap={1}>
            <img src='/images/coins/busd.png' alt='busd' width="25px" />
            <Text color='#fff' fontSize='24px' fontWeight="bold"><span className='text-yellow-400'>{heroesDetail && heroesDetail.price ? formatNumber(heroesDetail.price) : '0' }</span> BUSD</Text>
          </Flex>
          {
          account === heroesDetail.seller
          ?
          <Button
            onClick={handleCancel}
            disabled={pendingTx}
            variant="warning"
            style={{ flex: 1 }}
          >
          { pendingTx ? 'Canceling...' : 'Cancel'}
          </Button>
          :
          account ?
            dataUser?.isLoaded
            ?
            <Button
              onClick={ dataUser.allowance ? handleBuy : handleApprove }
              disabled={pendingTx || (dataUser.allowance && dataUser.balanceOf < heroesDetail.price)}
              style={{ flex: 1 }}
            >
            {
              dataUser.allowance
              ?
              pendingTx ? 'Processing...' : dataUser.balanceOf < heroesDetail.price ? 'Not enough balance !' : 'Purchase'
              :
              pendingTx ? 'Approving...' : 'Approve BUSD'
            }
            </Button>
            : <Spinner />
          : null
          }
        </Flex>
      </Box> : null }
      <HeroDetails idHero={idHero} heroesDetail={heroesDetail} />
    </Page>
    :
    <Page>
      <StyledNotFound>
        <LogoIcon width="64px" mb="8px" />
        <Heading scale="xxl">404</Heading>
        <Text mb="16px">{t('Oops, hero not found.')}</Text>
        <Button as="a" href="/marketplace" scale="sm">
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

export default MarketPlaceHeroDetails
