import React, {useEffect, useState, useCallback} from 'react'
import {Hero} from 'components/KShark'
import Page from 'components/Layout/Page'
import {Button, Heading, Text} from 'components/Pancake-uikit'
import {NavLink} from 'react-router-dom'
import {useTranslation} from 'contexts/Localization'
import styled from 'styled-components'
import Countdown from 'views/BlindBox/components/Countdown'
import {connect, useDispatch} from 'react-redux'
import {AppDispatch} from 'state'
import {find, includes, filter, isEmpty} from 'lodash'
import {
  setBoxData as setBoxDataStore,
  setCommonBoxHeroesList as setCommonBoxHeroesListStore,
  setHeroesMarketList as setHeroesMarketListStore,
  setRareBoxHeroesList as setRareBoxHeroesListStore,
  setSuperRareBoxHeroesList as setSuperRareBoxHeroesListStore,
  setSuperSuperRareBoxHeroesList as setSuperSuperRareBoxHeroesListStore,
} from 'state/blindbox/actions'
import {ThunkDispatch} from 'redux-thunk'
import LoadingComponent from 'views/LoadingComponent'
import fetch from 'isomorphic-unfetch'
import blindBoxItems from 'config/constants/blindBoxItems'
import {DONT_SHOW_AGAIN} from 'views/Vesting/Vesting'
import Popup from 'reactjs-popup'

import PopupTopTier from './components/PopupTopTier'
import BlindBoxBanner from './BlindBoxBanner'

import BlindBoxItem from './BlindBoxItem'
import * as indexDb from '../../utils/services'
import PreSaleTicketPanel from './PreSaleTicketPanel'
import './blindBox.modules.scss'
import {useBlindBox, useBlindBoxFreeZone, useBlindBoxWhitelist} from './hooks/useBlindBox'
import LotteryCard from './components/LotteryCard'
import SliderTicket from './components/SliderTicket'

export enum IBoxType {
  COMMON_BOX = 1,
  RARE_BOX = 2,
  SUPER_RARE_BOX = 3,
  SUPER_SUPER_RARE_BOX = 4,
}

const BlindBox = (props) => {
  const {t} = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const dataBlindbox = useBlindBox()
  const dataBlindboxWhitelist = useBlindBoxWhitelist()
  // const dataBlindBoxFreeZone = useBlindBoxFreeZone()
  // const dataBlindboxWhitelist = {
  //   endTime: 1639285200,
  //   startTime: 1639234800,
  //   totalBoxCM: 1,
  //   totalBoxR: 1,
  //   totalBoxSR: 1,
  //   totalBoxSSR: 1,
  //   totalNFT: 7,
  //   userAmountTicket: 0,
  //   userLastTimeBuy: 0,
  //   userWhitelist: false,
  // }
  // const dataBlindBoxFreeZone = {
  //   endTime: 1670943600,
  //   startTime: 1639321200,
  //   totalBoxCM: 1,
  //   totalBoxR: 1,
  //   totalBoxSR: 1,
  //   totalBoxSSR: 1,
  //   totalNFT: 7,
  //   userLastTimeBuy: 0,
  // }
  const dataBlindBoxFreeZone = useBlindBoxFreeZone()
  const [currentTiming, setCurrentTiming] = useState(3)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const reslistHeroes = await fetch(`https://api.heroestd.com/get-hero-market-list/page=1&limit=14680`, {
  //       method: 'GET',
  //       headers: { 'Content-Type': 'application/json' },
  //     })

  //     const listHeroesJson = await reslistHeroes.json()
  //     const listHeroes = listHeroesJson.data.docs

  //     const resListHeroesConfig = await fetch(`https://api.heroestd.com/get-hero-config`, {
  //       method: 'GET',
  //       headers: { 'Content-Type': 'application/json' },
  //     })

  //     const configList = await resListHeroesConfig.json()
  //     const configListData = await configList.data

  //     listHeroes.map((item) => {
  //       const data = find(configListData, (itemConfig) => itemConfig.heroID === item.heroId)
  //       const heroConfig = {
  //         name: data?.name || '',
  //         quote: data?.quote || '',
  //         story: data?.story || '',
  //         title: data?.title || '',
  //       }
  //       return Object.assign(item, heroConfig)
  //     })

  //     const resListBoxData = await fetch(`https://api.heroestd.com/get-box-data`, {
  //       method: 'GET',
  //       headers: { 'Content-Type': 'application/json' },
  //     })
  //     const listBoxData = await resListBoxData.json()
  //     const boxDatalist = await listBoxData.data

  //     const listHeroesJsonStringify = JSON.stringify(listHeroes)
  //     const boxDataListJsonStringify = JSON.stringify(boxDatalist)
  //     await indexDb.set('heroesMarketList', listHeroesJsonStringify)
  //     await indexDb.set('boxDataList', boxDataListJsonStringify)
  //     dispatch(setHeroesMarketListStore(listHeroes))
  //     dispatch(setBoxDataStore(boxDatalist))
  //   }
  //   try {
  //     fetchData()
  //   }
  //   catch(error) {
  //     console.log("error")
  //   }
  // }, [dispatch])

  // if (!dataBlindBoxFreeZone) {

  // }

  const renderPurchaseLayout = () => {
    switch (currentTiming) {
      case 1:
        // return (<Popup modal defaultOpen={!dataSession}>
        //   {(close) => }
        // </Popup>)
        return <PopupTopTier />
      case 2:
        return (
          blindBoxItems.map((item) => (
            <BlindBoxItem key={item.id} blindBoxItem={item} boxTicketData={dataBlindboxWhitelist} />
          ))
        )
      case 3:
        return (
          blindBoxItems.map((item) => (
            <BlindBoxItem key={item.id} blindBoxItem={item} boxTicketData={dataBlindBoxFreeZone} isFreeZone />
          ))
        )
      default:
        return <div />
    }
  }

  const verifyMappingLightBox = () => {
    const {blindbox} = props
    return !isEmpty(blindbox.heroesMarketList) && !isEmpty(blindbox.boxData)
  }

  return (
    <Page>
      <Header>
        <Hero>
          <Heading as="h2" size="xl" color="#ffffff">
            {t('Blind Box')}
          </Heading>
        </Hero>
      </Header>
      <BlindBoxBanner />
      {/* {!verifyMappingLightBox() && (
        <div className="overlay">
          <LoadingComponent />
        </div>
      )} */}
      <div className="w-full relative rounded-xl">
        <div className="flex flex-col md:flex-row gap-3 mt-5">
          <div className="w-full md:w-2/6 h-90 margin-center">
            <LotteryCard dataBlindbox={dataBlindbox} />
          </div>
          <div className="w-full md:w-4/5 h-90">
            <div className="w-full">
              <PreSaleTicketPanel dataBlindbox={dataBlindbox} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full relative rounded-xl">
        <SliderTicket currentTiming={currentTiming} setCurrentTiming={setCurrentTiming} />
      </div>
      { currentTiming === 2 && <Tickets className='text-yellow-400 flex gap-1 shadow'>
        Your ticket(s): { dataBlindboxWhitelist?.userAmountTicket ?? 0 }
        <img src="https://cdn.heroestd.io/Images/Ticket.svg" alt="Your tickets" />
      </Tickets> }
      <Block className={`block-blind-box ${ currentTiming === 1 ? `flex` : `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5`}`}>
        {renderPurchaseLayout()}
      </Block>
    </Page>
  )
}

const PreSaleTicketRightPanel = styled.div`
  border: 0.971041px solid #272727;
  box-sizing: border-box;
  border-radius: 10px;
`

const Overlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Block = styled.div`
  margin-top: 45px;
`

const Phase = styled.div`
  background: rgba(0, 0, 0, 0.3);
  padding: 7px;
  font-style: normal;
  font-size: 20px;
  line-height: 15px;
  border-radius: 10px;
  color: #fff;
  width: 120px;
  height: 30px;
  text-align: center;
`

const Tickets = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  margin-top: 20px;
  width: fit-content;
  padding: 10px;
  border-radius: 14px;
`

const mapStateToProps = (state) => {
  const {blindbox} = state
  return {
    blindbox,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
  saveHeroesMarketListToStore: (heroesMarketList: any) => dispatch(setHeroesMarketListStore(heroesMarketList)),
  saveBoxDataListToStore: (boxData: any) => dispatch(setBoxDataStore(boxData)),
  saveCommonBoxHeroesListToStore: (commonBoxHeroesList: any) =>
    dispatch(setCommonBoxHeroesListStore(commonBoxHeroesList)),
  saveRareBoxHeroesListToStore: (rareBoxHeroesList: any) => dispatch(setRareBoxHeroesListStore(rareBoxHeroesList)),
  saveSuperRareBoxHeroesListToStore: (superRareBoxHeroesList: any) =>
    dispatch(setSuperRareBoxHeroesListStore(superRareBoxHeroesList)),
  saveSuperSuperRareBoxHeroesListToStore: (superSuperRareBoxHeroesList: any) =>
    dispatch(setSuperSuperRareBoxHeroesListStore(superSuperRareBoxHeroesList)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BlindBox)
