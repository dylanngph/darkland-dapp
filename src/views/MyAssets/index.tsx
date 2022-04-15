import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import { Hero } from 'components/KShark'
import Page from 'components/Layout/Page'
import { Heading } from 'components/Pancake-uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Box } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import MyAssetsInventory from './components/MyAssetsInventory/index'
import MyAssetMenu from './components/MyAssetMenu'
import AssetWallet from './components/AssetWallet'
import Activities from './components/Activities'
import AccountSetting from './components/Setting'

export enum MyAssetMenuTab {
  WALLET = 0,
  INVENTORY = 1,
  SETTINGS = 2,
  ACTIVITIES = 3,
  QR_CODE = 4,
}

const MyAssets = () => {
  const location = useLocation();
  const { isLogin } = useSelector((state: AppState) => state.common)
  const { t } = useTranslation()
  const [currentAssetMenuTab, setCurrentAssetMenuTab] = useState(1)
  const renderBodyMenuTab = () => {
    switch (currentAssetMenuTab) {
      case MyAssetMenuTab.WALLET:
        return <AssetWallet />
      case MyAssetMenuTab.INVENTORY:
        return <MyAssetsInventory />
      case MyAssetMenuTab.SETTINGS:
        return <AccountSetting />
      case MyAssetMenuTab.ACTIVITIES:
        return <Activities />
      case MyAssetMenuTab.QR_CODE:
        return <div />
      default:
        return <MyAssetsInventory />
    }
  }

  // useEffect(() => {
  //   const path = location?.pathname?.split('/')[2]
  //   setCurrentAssetMenuTab(path)
  // }, [location])

  // const [token, setToken] = useState(undefined)
  // const getToken = useCallback(async () => {
  //   const tokenId = await window.localStorage.getItem('_ut')
  //   setToken(tokenId)
  // }, [])

  // useEffect(() => {
  //   getToken()
  // }, [getToken, token])

  // useEffect(() => {
  //   events.on("LOGIN_SUCCESS", () => {
  //     getToken()
  //   });
  //   return events.clear("LOGIN_SUCCESS", () => {
  //     getToken()
  //   });
  // }, [getToken]);

  return (
    <Page>
      {/* <Block>
        <NavLink to="/my-assets"> {`${t('My Assets')} / `} </NavLink>
        <Text style={{ fontWeight: 700, paddingLeft: '2px' }}>{t(` Inventory`)}</Text>
      </Block> */}
      <div className="flex lg:flex-row md:flex-row flex-col flex-wrap">
        <div className="margin-center w-full sm:w-4/4 md:w-1/3 lg:w-3/12 xl:w-3/12">
          {isLogin ? (
            <MyAssetMenu
              setCurrentAssetMenuTab={setCurrentAssetMenuTab}
              currentAssetMenuTab={currentAssetMenuTab}
            />
          ) : (
            <Card className="flex flex-col items-center p-4">
              <CardIcon className="m-4">
                <img src="/logo.png" alt="logo" style={{ height: '44px', width: 'auto' }} />
              </CardIcon>
              <Title className="text-center">Please login to view your assets menu</Title>
            </Card>
          )}
        </div>
        <div className="margin-center w-full sm:mt-7 md:mt-0 sm:w-4/4 md:w-2/3 lg:w-9/12 xl:w-9/12">
          {renderBodyMenuTab()}
        </div>
      </div>
    </Page>
  )
}

const Title = styled(Box)`
  font-size: 21px;
  font-weight: 700;
`

const CardIcon = styled.div`
  position: relative;
  top: auto;
  left: auto;
`

const Card = styled.div`
  width: auto;
  height: auto;
  background: #091749;
  border: 1px solid #091749;
  box-sizing: border-box;
  margin-right: 20px;
`

const Block = styled.div`
  margin-top: 44px;
  margin-bottom: 33px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const Text = styled.div`
  font-size: 16px;
  color: #ffffff;
`

export default MyAssets
