import { Tab, TabList, Tabs } from '@chakra-ui/react'
import { Hero } from 'components/KShark'
import Page from 'components/Layout/Page'
import { Heading } from 'components/Pancake-uikit'
import { useTranslation } from 'contexts/Localization'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppState, useAppDispatch } from 'state'
import { fetchItemConfig, fetchRuneConfig } from 'state/common/commonSlice'
import { updateSelected } from 'state/user/actions'
import styled from 'styled-components'
import BoxesTab from './components/tabs/BoxesTab/BoxesTab'
import HeroesTab from './components/tabs/HeroesTab/HeroesTab'
import { tabMarket } from './constant'

const MarketPlace = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { itemConfig, runeConfig } = useSelector((state: AppState) => state.common)
  const tabSelected = useSelector<AppState, AppState['user']['userSelected']>((state: AppState) => state.user.userSelected)
  const [tab, setTab] = useState(tabSelected)

  // useEffect(() => {
  //   return () => {
  //     const defaultParamFilterHero = {
  //       name: undefined,
  //       items: [],
  //       heroClasses: [],
  //       heroOrigins: [],
  //       maxFusisionTime: 7,
  //       minFusionTime: 0,
  //       runes: [],
  //       heroGen: undefined,
  //       targetFilters: [],
  //       status: [],
  //       page: 1,
  //       limit: 15,
  //     }
  //     dispatch(setParamSearchHero(defaultParamFilterHero))
  //   }
  // }, [dispatch])

  useEffect(() => {
    if (!runeConfig.length) {
      dispatch(fetchRuneConfig())
    }
    if (!itemConfig.length) {
      dispatch(fetchItemConfig())
    }
  }, [dispatch, itemConfig, runeConfig])

  useEffect(() => {
    setTab(tabSelected)
  }, [tabSelected])

  
  const handleChangeTab = (index: any) => {
    setTab(index) 
    dispatch(updateSelected(index))
  }

  const renderTabHeader = () => (
    <Tabs
      sx={{
        color: '#9E9E9E',
        borderColor: '#686868',
      }}
      defaultIndex={tabSelected}
    >
      <TabList>
        {tabMarket.map((tabItem, index) => {
          return (
            <TabCustom
              aria-hidden="true"
              key={tabItem.label}
              onClick={() => {
                handleChangeTab(index)
              }}
              sx={{
                width: '150px',
                paddingTop: '0px',
              }}
              style={tab === tabItem.index ? styleActive : {}}
              _focus={{ border: 'unset' }}
              _active={{ border: 'unset' }}
            >
              {tabItem.label}
            </TabCustom>
          )
        })}
      </TabList>
    </Tabs>
  )

  const renderTabContent = useCallback(() => {
    const tabs = {
      0: <BoxesTab />,
      1: <HeroesTab />,
      // NFT: <Runes />,
    }
    return (
      tabs[tab] || (
        <div
          style={{
            fontSize: 30,
            height: 300,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          Coming soon
        </div>
      )
    )
  }, [tab])

  return (
    <Page>
      {renderTabHeader()}
      {renderTabContent()}
    </Page>
  )
}
const styleActive = {
  color: 'white',
  marginBottom: '-2px',
  borderBottom: '4px solid #FE335B',
}

const TabCustom = styled(Tab)`
  margin: 0 50px;
  @media screen and (max-width: 768px) {
    margin: 20px;
  }
  @media screen and (max-width: 440px) {
    margin: 0px;
  }
`

export default MarketPlace
