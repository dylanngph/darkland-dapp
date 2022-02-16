/* eslint-disable react-hooks/exhaustive-deps */
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
import { fetchAttributeHero2 } from 'utils/getAttributeHero'
import { useWeb3React } from '@web3-react/core'
import PaginationCustom from 'components/Pagination/Pagination'
import ListOnSales from './LeftSession/ListOnSales'
import ListSold from './RightSession/ListSold'
import DashboardBanner from './TransactionHistoryBanner'

const TransactionHistory = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { itemConfig, runeConfig } = useSelector((state: AppState) => state.common)
  const [listOnSale, setListOnSale] = useState([])
  const [listHeroesSold, setHeroesSold] = useState([])
  const { account } = useWeb3React()

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 15,
    total: 0
  })

  const fetchGetListHeroMarketSold = useCallback(
    async (params: any = {}) => {
      const { page, limit } = pagination
      const customParams = {
        page: params.page || page,
        limit: params.limit || limit,
        seller: account,
        time: -1
      }
      try {
        const { data } = await heroestdApi.getListHeroMarketSold(customParams)
        const tmp = data.docs.map((item) => ({ ...item, mkstatus: 1 }))
        setPagination((paginationObj) => ({
          page: data.page,
          limit: data.limit,
          total: paginationObj.total < data.totalDocs ? data.totalDocs : paginationObj.total,
        }))
        setListOnSale(tmp)
      } catch (error) {
        console.log(error)
      }
    },
    [account],
  )

  const fetchGetListHeroSalesHistory = useCallback(
    async (params: any = {}) => {
      const { page, limit } = pagination
      const customParams = {
        page: params.page || page,
        limit: params.limit || limit,
        seller: account,
        time: -1
      }
      try {
        const { data } = await heroestdApi.getListHeroSalesHistory(customParams)
        setHeroesSold([])
        data.docs.forEach(async (element) => {
          const res: any = await fetchAttributeHero2(Number(String(element.tokenId).slice(-2)))
          setPagination((paginationObj) => ({
            page: data.page,
            limit: data.limit,
            total: paginationObj.total < data.totalDocs ? data.totalDocs : paginationObj.total,
          }))
          setHeroesSold((h) => [
            ...h,
            { ...res, buyer: element.buyer, price: element.price, mkstatus: 1 },
          ])
        })
      } catch (error) {
        console.log(error)
      }
    },
    [account],
  )

  useEffect(() => {
    if (!runeConfig.length) {
      dispatch(fetchRuneConfig())
    }
    if (!itemConfig.length) {
      dispatch(fetchItemConfig())
    }
  }, [dispatch, itemConfig, runeConfig])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { page, limit } = pagination
  //     const marketSoldParams: any = {
  //       page,
  //       limit,
  //       time: '-1',
  //     }
  //     try {
  //       const { data } = await heroestdApi.getListHeroMarketSold(marketSoldParams)
  //       const tmp = data.docs.map((item) => ({ ...item, mkstatus: 1 }))
  //       setPagination((paginationObj) => ({
  //         page: data.page,
  //         limit: data.limit,
  //         total: paginationObj.total < data.totalDocs ? data.totalDocs : paginationObj.total,
  //       }))
  //       setListOnSale(tmp)
  //     } catch (error) {
  //       console.log('error here', error)
  //     }
  //   }
  //   fetchData()
  // }, [pagination])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { page, limit } = pagination
  //     const marketSoldParams: any = {
  //       page,
  //       limit,
  //       seller: account,
  //     }
  //     try {
  //       const { data } = await heroestdApi.getListHeroSalesHistory(marketSoldParams)
  //       setHeroesSold([])
  //       data.docs.forEach(async (element) => {
  //         const res: any = await fetchAttributeHero2(Number(String(element.tokenId).slice(-2)))
  //         setPagination((paginationObj) => ({
  //           page: data.page,
  //           limit: data.limit,
  //           total: paginationObj.total < data.totalDocs ? data.totalDocs : paginationObj.total,
  //         }))
  //         setHeroesSold((h) => [
  //           ...h,
  //           { ...res, buyer: element.buyer, price: element.price, mkstatus: 1 },
  //         ])
  //       })
  //     } catch (error) {
  //       console.log('error here', error)
  //     }
  //   }
  //   fetchData()
  // }, [account, pagination])

  useEffect(()=>{
    if (account) {
      fetchGetListHeroMarketSold();
      fetchGetListHeroSalesHistory();
    }
  }, [account, fetchGetListHeroMarketSold,fetchGetListHeroSalesHistory])

  const handleChagePage = ({ page }) => {
    const param = {
      page,
    }
    fetchGetListHeroMarketSold(param);
    fetchGetListHeroSalesHistory(param);
  }

  return (
    <Page>
      <Hero>
        <Heading as="h1" size="xl" color="#ffffff">
          {t('My Assets')}
        </Heading>
      </Hero>
      <DashboardBanner />
      <Card className="flex-col md:flex-row">
        <div className="w-full lg:w-1/2 m-2 lg:m-5">
          <ListOnSales listHeroes={listOnSale} />
        </div>
        <div className="w-full lg:w-1/2 m-2 lg:m-5">
          <ListSold listHeroes={listHeroesSold} />
        </div>
      </Card>
      <PaginationCustom
          current={pagination.page}
          total={pagination.total}
          onChange={handleChagePage}
          pageSize={pagination.limit}
        />
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

export default TransactionHistory
