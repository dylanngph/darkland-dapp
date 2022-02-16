import React, { useCallback, useEffect, useState } from 'react'
import Page from 'components/Layout/Page'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Hero } from 'components/KShark'
import { Button, Heading, Text } from 'components/Pancake-uikit'
import heroestdApi from 'api/heroestdApi'
import { fetchItemConfig, fetchRuneConfig } from 'state/common/commonSlice'
import { AppState, useAppDispatch } from 'state'
import { useSelector } from 'react-redux'
import useRefresh from 'hooks/useRefresh'
import ListOnSales from './LeftSession/ListOnSales'
import ListSold from './RightSession/ListSold'
import DashboardBanner from './DashboardBanner'

const Dashboard = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { itemConfig, runeConfig } = useSelector((state: AppState) => state.common)
  const [listOnSale, setListOnSale] = useState(undefined)
  const [listHeroesSold, setHeroesSold] = useState(undefined)
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (!runeConfig.length) {
      dispatch(fetchRuneConfig())
    }
    if (!itemConfig.length) {
      dispatch(fetchItemConfig())
    }
  }, [dispatch, itemConfig, runeConfig])

  

  useEffect(() => {
    // const fetchData = async () => {
    //   const marketOnSaleParams: any = {
    //     page: '1',
    //     limit: '10',
    //     time: '1',
    //   }
    //   try {
    //     const { data } = await heroestdApi.getListHeroMarketSold(marketOnSaleParams)
    //     setListOnSale(data.docs)
    //   } catch (error) {
    //     console.log("error here", error)
    //   }
    // }
    // fetchData()

    const fetchData = async () => {
        
      const marketSoldParams: any = {
        page: '1',
        limit: '10',
        time: '-1'
      }
      try {
        const { data } = await heroestdApi.getListHeroMarketSold(marketSoldParams)
        setListOnSale(data.docs)
      } catch (error) {
        console.log("error here", error)
      }
    }
    fetchData()
  }, [fastRefresh])

  useEffect(() => {
    // const fetchData = async () => {
    //   const marketSoldParams: any = {
    //     page: '1',
    //     limit: '10',
    //     time: '1',
    //     q: 'sold'
    //   }
    //   try {
    //     const { data } = await heroestdApi.getListHeroMarketSold(marketSoldParams)
    //     setHeroesSold(data.docs)
    //   } catch (error) {
    //     console.log("error here", error)
    //   }
    // }
    // fetchData()

    const fetchData = async () => {
        
      const marketSoldParams: any = {
        page: '1',
        limit: '10',
        time: '-1',
        q: 'sold'
      }
      try {
        const { data } = await heroestdApi.getListHeroMarketSold(marketSoldParams)
        setHeroesSold(data.docs)
      } catch (error) {
        console.log("error here", error)
      }
    }
    fetchData()

  }, [fastRefresh])

  return (
    <Page>
      <Hero>
        <Heading as="h1" size="xl" color="#ffffff">
          {t('Marketplace')}
        </Heading>
      </Hero>
      <DashboardBanner/>
      <Card className='flex-col md:flex-row' >
        <div className='w-full lg:w-1/2 m-2 lg:m-5' >
          <ListOnSales listHeroes={listOnSale} />
        </div>
        <div className='w-full lg:w-1/2 m-2 lg:m-5' >
          <ListSold listHeroes={listHeroesSold} />
        </div>
      </Card>
    </Page>
  )
}

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Card = styled.div`
display: flex;
justify-content: space-between;
`

export default Dashboard