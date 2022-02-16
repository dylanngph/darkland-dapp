import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Popup from 'reactjs-popup'
import { Tooltip } from '@chakra-ui/react'
import { Button, Text } from 'components/Pancake-uikit'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import blindBoxItems from 'config/constants/blindBoxItems'
import { useFetchClaimedBox, useFetchMyBox } from 'views/MyAssets/hooks/useFetchMysteryBox'
import PopupSellToMarket from 'views/IDO/packs/PopupSellToMarket'
import { useBox, useMarketplaceBox } from 'hooks/useContract'
import { Skeleton } from '@pancakeswap/uikit'
import tokens from 'config/constants/tokens'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { getAddress } from 'utils/addressHelpers'
import LoadingComponent from 'views/LoadingComponent'
import PopupTransferBox from 'components/Popup/PopupTransferBox'
import PopupComplete from 'components/Popup/PopupComplete'
import { BIG_TEN } from 'utils/bigNumber'
import BigNumber from 'bignumber.js'
import { NavLink } from 'react-router-dom'
import { marketplaceConfig } from 'config/constants'
import { MarketplaceType } from 'config/constants/types'
import '../MyAssetMenu/menuAsset.modules.scss'
import { BoxState } from 'state/box/reducer'
import { IBoxUser } from 'state/box/types'
import MysteryBox from './MysteryBox'

const Boxes = () => {
  const [pendingTx, setPendingTx] = useState(false)

  const { mysteryBoxData, boxData } = useSelector((state: AppState) => state.box)

  if (!mysteryBoxData) {
    return (
      <div className="flex gap-3 w-full flex-col mt-5">
        <Skeleton width="90%" />
        <Skeleton width="70%" />
        <Skeleton width="50%" />
      </div>
    )
  }
  const { balanceOf, isApprovedForAll, listBoxes } = mysteryBoxData
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mt-5">
      {pendingTx && (
        <Overlay>
          <LoadingComponent />
        </Overlay>
      )}

      {boxData?.map((entry) => {
        return <BoxesItem box={entry}/>
      })}
      <MysteryBox
        balanceOf={balanceOf}
        isApprovedForAll={isApprovedForAll}
        listBoxes={listBoxes}
        onPeding={setPendingTx}
        pendingTx={pendingTx}
      />

      {/* {currentPurchasedBlindBox && currentPurchasedBlindBox.length > 0 ? (
        currentPurchasedBlindBox.map((item: any) => {
          const blindBoxItem = find(blindBoxItems, (bBItem: any) => bBItem.id === item.boxId)
          const blindBoxItemMapped = {
            ...blindBoxItem,
            amount: item.currentQuantity,
          }
          if (blindBoxItemMapped.amount > 0) {
            return <BoxesItem blindBoxItem={blindBoxItemMapped} />
          }
          return <div />
        })
      ) : (
        <div />
      )} */}
    </div>
  )
}

const BoxesItem = ({ box}) => {
  const { t } = useTranslation()
  const { toastError, toastSuccess } = useToast()
  const marketplaceBoxContract = useMarketplaceBox(MarketplaceType.BOX)
  const boxContract = useBox(box.id)
  const { callWithGasPrice } = useCallWithGasPrice()
  // const [amount, setAmount] = useState(blindBoxItem.amount)
  // const [heroesMarketList, setHeroesMarketList] = useState([])
  // const [boxData, setBoxData] = useState([])
  // const [currentBlindBox, setCurrentBlindBox] = useState([])
  // const [currentBoxId, setCurrentBoxId] = useState(blindBoxItem.id)
  // const [heroData, setHeroData] = useState({})
  // const [showDropRate, setShowDropRate] = useState(true)

  // const openPurchaseBlindboxToRedux = async (boxId: number) => {
  //   const currentPurchasedBlindBox = await indexDb.get('currentPurchasedBlindBox')
  //   let newPurchasedBlindbox = {}
  //   let purchasedBlindbox = []

  //   if (currentPurchasedBlindBox) {
  //     const currentPurchasedBlindBoxArray = JSON.parse(currentPurchasedBlindBox)
  //     const currentPurchasedBlindBoxObj = find(currentPurchasedBlindBoxArray, (item: any) => item.boxId === boxId)
  //     if (currentPurchasedBlindBoxObj) {
  //       const newQuantity = --currentPurchasedBlindBoxObj.currentQuantity
  //       if (newQuantity !== 0) {
  //         newPurchasedBlindbox = {
  //           ...currentPurchasedBlindBoxObj,
  //           currentQuantity: newQuantity,
  //         }
  //       }
  //       purchasedBlindbox = [...currentPurchasedBlindBoxArray, newPurchasedBlindbox]
  //     } else {
  //       purchasedBlindbox = [...currentPurchasedBlindBoxArray, newPurchasedBlindbox]
  //     }
  //   } else {
  //     purchasedBlindbox.push(newPurchasedBlindbox)
  //   }
  //   indexDb.set('currentPurchasedBlindBox', JSON.stringify(purchasedBlindbox))
  //   setAmount(amount - 1)
  // }

  // const getMappedHeroesInBox = (heroesListInMarket: any, heroesInListBox: any): any =>
  //   filter(heroesListInMarket, (item: any) => includes(heroesInListBox.heroData, item._id))

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const boxDataListItem = await indexDb.get('boxDataList')
  //     const boxDataListData = await JSON.parse(boxDataListItem)
  //     setBoxData(boxDataListData)
  //     const heroesMarketListItem = await indexDb.get('heroesMarketList')
  //     const heroesMarketListData = await JSON.parse(heroesMarketListItem)
  //     setHeroesMarketList(heroesMarketListData)
  //   }
  //   fetchData()
  // }, [])

  // const getCurrentBlindBox = useCallback(() => {
  //   switch (currentBoxId) {
  //     case IBoxId.COMMON_BOX: {
  //       const heroesInListCommonBox = find(boxData, (item: any) => item.boxType === IBoxType.COMMON_BOX)
  //       const commonBlindBoxHeroes = getMappedHeroesInBox(heroesMarketList, heroesInListCommonBox)
  //       return commonBlindBoxHeroes
  //     }
  //     case IBoxId.RARE_BOX: {
  //       const heroesInListRareBox = find(boxData, (item: any) => item.boxType === IBoxType.RARE_BOX)
  //       const rareBlindBoxHeroes = getMappedHeroesInBox(heroesMarketList, heroesInListRareBox)
  //       return rareBlindBoxHeroes
  //     }
  //     case IBoxId.SUPER_RARE_BOX: {
  //       const heroesInListSuperRareBox = find(boxData, (item: any) => item.boxType === IBoxType.SUPER_RARE_BOX)
  //       const superRareBlindBoxHeroes = getMappedHeroesInBox(heroesMarketList, heroesInListSuperRareBox)
  //       return superRareBlindBoxHeroes
  //     }
  //     case IBoxId.SUPER_SUPER_RARE_BOX: {
  //       const heroesInListSuperSuperRareBox = find(
  //         boxData,
  //         (item: any) => item.boxType === IBoxType.SUPER_SUPER_RARE_BOX,
  //       )
  //       const superSuperRareBlindBoxHeroes = getMappedHeroesInBox(heroesMarketList, heroesInListSuperSuperRareBox)
  //       return superSuperRareBlindBoxHeroes
  //     }
  //     default:
  //       return heroesMarketList
  //   }
  // }, [currentBoxId, heroesMarketList, boxData])

  // useEffect(() => {
  //   const currentBlindBoxList = getCurrentBlindBox()
  //   setCurrentBlindBox(currentBlindBoxList)
  //   if (currentBlindBoxList.length > 0) {
  //     const index = Math.floor(Math.random() * currentBlindBoxList.length)
  //     const item = currentBlindBoxList[index]
  //     setCurrentBlindBox(currentBlindBoxList.splice(index, 1))
  //     const heroesMarketListTmp = filter(heroesMarketList, (i) => i._id !== item._id)
  //     setHeroesMarketList(heroesMarketListTmp)
  //     setHeroData(item)
  //   }
  // }, [getCurrentBlindBox, heroesMarketList])

  // const [numberOfBox, setNumberOfBox] = useState({})
  const [pendingTx, setPendingTx] = useState(false)
  const [purchasedTx, setPurchasedTx] = useState(false)
  const [approveTx, setApproveTx] = useState(false)
  const [transferTx, setTransferTx] = useState(false)
  const onConfirmSell = async (tokenId: number, price) => {
    try {
      setPendingTx(true)
      const tx = await callWithGasPrice(marketplaceBoxContract, 'startSales', [tokenId, new BigNumber(price).multipliedBy(BIG_TEN.pow(tokens.busd.decimals)).toString(), box.boxAddress, getAddress(tokens.busd.address)])
      const receipt = await tx.wait()
      toastSuccess('Success', 'Selling order successful')
      setPurchasedTx(true)
    } catch (error) {
      toastError('Error', error?.data?.message)
      console.log(error)
    }
    finally {
      setPendingTx(false)
    }
  }

  const handleApprove = async () => {
    try {
      setApproveTx(true)
      const tx = await callWithGasPrice(boxContract, 'setApprovalForAll', [getAddress(marketplaceConfig.contractAddress.box), 'true'])
      const receipt = await tx.wait()
      toastSuccess('Success', 'Approved box to marketplace')
    } catch (error) {
      toastError('Error', error?.data?.message)
      console.log(error)
    }
    finally {
      setApproveTx(false)
    }
  }

  const handleTransferNft = async (account: string, accountRecive: string, tokenId: number) => {
    try {
      setPendingTx(true)
      const tx = await callWithGasPrice(boxContract, 'transferFrom', [account, accountRecive, tokenId])
      const receipt = await tx.wait()
      toastSuccess('Success', 'Send successful')
      setTransferTx(true)
    } catch (error) {
      toastError('Error', error?.data?.message)
      console.log(error)
    }
    finally {
      setPendingTx(false)
    }
  }

  // useEffect(() => {
  //   const fetchCommonBoxData = async () => {
  //     const totalBoxApi = await fetch(`https://api.heroestd.com/get-box-config/${blindBoxItem.id}`, {
  //       method: 'GET',
  //       headers: { 'Content-Type': 'application/json' },
  //     })

  //     const totalBox = await totalBoxApi.json()
  //     setNumberOfBox(totalBox)
  //   }

  //   fetchCommonBoxData()
  // }, [blindBoxItem.id])

  // const getOpenBlindBoxData = useCallback(
  //   (msg: MessageEvent<any>) => {
  //     if (msg.data === 'GetBoxId') {
  //       const iframe = document.getElementById('boxIframe') as HTMLIFrameElement
  //       if (iframe) {
  //         iframe.contentWindow.postMessage(
  //           {
  //             eventName: 'set-box',
  //             data: blindBoxItem.id,
  //           },
  //           '*',
  //         )
  //       }
  //     }
  //   },
  //   [blindBoxItem.id],
  // )

  // useEffect(() => {
  //   window.addEventListener('message', getOpenBlindBoxData)
  //   return () => {
  //     window.removeEventListener('message', getOpenBlindBoxData)
  //   }
  // }, [getOpenBlindBoxData])

  const [numberOfBox, setNumberOfBox] = useState({})

  useEffect(() => {
    const fetchCommonBoxData = async () => {
      try {
        const totalBoxApi = await fetch(`https://api.heroestd.com/get-box-config/${box.id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })

        const totalBox = await totalBoxApi.json()
        setNumberOfBox(totalBox)
      } catch (err) {
        console.log(err)
      }
    }

    fetchCommonBoxData()
  }, [box.id])

  // const transformVector = {
  //   transform: 'rotate(-90deg)',
  //   transitionDuration: '0.5s',
  // }

  // const transformCard = {
  //   maxHeight: '391px',
  //   minHeight: '390px',
  // }

  return (
    <>
      <Card>
        <HeaderButton className="w-full flex flex-row flex-wrap justify-between p-2 gap-1">
          <Popup
            className="w-full"
            modal
            trigger={
              <Button
                // onClick={}
                variant="tertiary"
                style={{ flex: 1 }}
                scale="sm"
                className='flex border border-solid border-gray-500'
              >
                <div className="flex flex-row justify-center items-center gap-2">
                  <img src="https://cdn.heroestd.io/Images/sell.png" alt="coin" className="w-5" />
                  <Text style={{ color: 'white', fontWeight: 'nornal', fontSize: '12px' }}>Sell</Text>
                </div>
              </Button>
            }
          >
            {(close) =>
              !purchasedTx ? (
                <PopupSellToMarket close={close} boxInfo={box} onSell={onConfirmSell} onApprove={handleApprove} pendingTx={pendingTx} approveTx={approveTx} />
              ) : (
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
            className='w-full'
            modal
            closeOnDocumentClick
            trigger={
              <Button
                variant="tertiary"
                style={{ flex: 1 }}
                scale="sm"
                className='flex border border-solid border-gray-500'
              >
                <div className="flex flex-row justify-center items-center gap-2">
                  <img src="https://cdn.heroestd.io/Images/transfer.png" alt="transfer" className="w-5" />
                  <Text style={{ color: 'white', fontWeight: 'nornal', fontSize: '12px' }}>Transfer</Text>
                </div>
              </Button>
            }
          >
            {(close) =>
              !transferTx ? (
                <PopupTransferBox close={close} boxInfo={box} pendingTx={pendingTx} onTransfer={handleTransferNft} />
              ) : (
                <PopupComplete
                  close={close}
                  clearPopup={() => setTransferTx(false)}
                  buttonGoto="My Assets"
                  path='/my-assets'
                />
              )
            }
          </Popup>
        </HeaderButton>
        <NavLink to= {`/blind-box/${box.id}`} >
          <CardIcon>
            <img src={box.img} className="w-full" alt="aaa" />
          </CardIcon>
          <BlindBoxTitle>
            <img src={`${box.title}`} width="100%" className="object-contain" alt="bbb" />
          </BlindBoxTitle>
          <BlindBoxInfo>
            <CardItem className="m-auto">
              <Text marginRight="2px" fontSize="12px" color="#A7A7A7">
                {' '}
                {t('Amount:')}{' '}
              </Text>
              <Text fontSize="12px" color="#F7F7F7">
                {box.balanceOf}
              </Text>
            </CardItem>
            <Button style={{ color: 'white', fontWeight: 'nornal' }}>Open</Button>
            <div
              className="text-sm flex flex-row flex-wrap justify-center"
              style={{ textAlign: 'center' }}
              role="button"
              tabIndex={0}
            >
              <div className="dash">
                <Tooltip
                  placement="bottom"
                  trigger={['click']}
                  bg="#111111"
                  hasArrow
                  border="2px solid #2D2B2B"
                  borderRadius="15px"
                  arrowShadowColor="#2D2B2B"
                  label={
                    <TooltipHover>
                      <TitleReward className="text-md mt-4 ml-3">HEROES DROP RATE</TitleReward>
                      <TooltipContain className="mt-3">
                        <div
                          style={{ color: '#9E9E9E', fontSize: '12px', fontWeight: 'bold' }}
                          className="flex flex-row justify-between text-xs m-3 border-rate"
                        >
                          <span>Common (C)</span>
                          <span>{blindBoxItems[box.id - 1].percentCHero}%</span>
                        </div>
                        <div
                          style={{ color: '#8DE1FF', fontSize: '12px', fontWeight: 'bold' }}
                          className="flex flex-row justify-between text-xs m-3 border-rate"
                        >
                          <span>Rare (R)</span>
                          <span>{blindBoxItems[box.id - 1].percentRHero}%</span>
                        </div>
                        <div
                          style={{ color: '#92EE97', fontSize: '12px', fontWeight: 'bold' }}
                          className="flex flex-row justify-between text-xs m-3 border-rate"
                        >
                          <span>Super Rare (SR)</span>
                          <span>{blindBoxItems[box.id - 1].percentSRHero}%</span>
                        </div>
                        <div
                          style={{ color: '#FF7EE7', fontSize: '12px', fontWeight: 'bold' }}
                          className="flex flex-row justify-between text-xs m-3"
                        >
                          <span>Super Super Rare (SSR)</span>
                          <span>{blindBoxItems[box.id - 1].percentSSRHero}%</span>
                        </div>
                      </TooltipContain>
                    </TooltipHover>
                  }
                >
                  <Text style={{ color: '#FFAB04', fontWeight: 'bold', fontSize: '12px' }}>
                    <div className="flex gap-1 items-center justify-center mt-2">
                      Drop rate
                      <img src="https://cdn.heroestd.io/Images/exclamation.31bd8f3c.svg" alt="Drop rate" className="w-4" />
                    </div>
                  </Text>
                </Tooltip>
              </div>
            </div>
          </BlindBoxInfo>
        </NavLink>
      </Card>
    </>
  )
}

// const Vector = styled.img`
//   margin-left: 2px;
// `

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgb(0, 0, 0, 0.5);
  z-index: 16;
  backdrop-filter: blur(5px);
`

const HeaderButton = styled.div``

const StyledPopup = styled(Popup)`
// use your custom style for ".popup-overlay"
&-overlay {
  ...;
}
// use your custom style for ".popup-content"
&-content {
  width: 960px;
  height: 600px;
  padding: 0px !important;
  background: transparent !important;
  border: none !important;
}
`
const TooltipHover = styled.div`
  width: 250px;
  box-sizing: border-box;
  margin-left: 5%;
  flex: 1;
`
const TooltipContain = styled.div`
  box-sizing: border-box;
  width: 90%;
`

const TitleReward = styled.div`
  background: linear-gradient(201.79deg, #fac96b -6.4%, #ffffff 42.02%, #ffd076 85.72%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const BlindBoxTitle = styled.div`
  height: 15px;
  width: 100%;
  display: flex;
  justify-content: center;
  background-size: contain;
`

const BlindBoxInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
`

const CardItem = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  justify-content: between;
  border-radius: 2px;
  padding: 5px;
`

const Card = styled.div`
  min-height: 200px;
  background: #000000;
  border: 1px solid #424243;
  box-sizing: border-box;
  border-radius: 5px;
  position: relative;
  flex: 1;

  :hover {
    cursor: pointer;
  }
`

const CardIcon = styled.div`
  padding: 15px;
  padding-top: 5px;
`

export default Boxes
