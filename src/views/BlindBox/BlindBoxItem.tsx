import React, {useState, useMemo, useEffect, useCallback} from 'react'
import Countdown from 'react-countdown'
import styled from 'styled-components'
import {Button, Text} from 'components/Pancake-uikit'
import {useTranslation} from 'contexts/Localization'
import {NavLink} from 'react-router-dom'
import history from 'routerHistory'
import './blindBox.modules.scss'
import {PropToken} from 'config/constants/idos'
import {formatNumber} from 'utils/formatBalance'
import Popup from 'reactjs-popup'
import PopupCheckout from 'views/IDO/packs/PopupCheckout'
import PopupComplete from 'views/IDO/packs/PopupComplete'
import blindBoxItems from 'config/constants/blindBoxItems'
import useToast from 'hooks/useToast'
import {find, remove} from 'lodash'
import PopupCheckoutBlindBox from 'views/IDO/packs/PopupCheckoutBlindBox'
import PopupCompleteBlindBox from 'views/IDO/packs/PopupCompleteBlindBox'
import {Skeleton} from '@pancakeswap/uikit'
import {roundNumber} from 'views/BlindBoxDetails/BlindBoxFrame'
import CountDownRender from 'components/CountDownRender'
import {getAddress} from 'utils/addressHelpers'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import {BoxWhitelist} from './types'
import * as indexDb from '../../utils/services'

export interface IBlindBoxItemProps {
  blindBoxItem: IBlindBoxItemDataProps
  isFreeZone?: boolean
  boxTicketData?: BoxWhitelist
}

export interface IBlindBoxItemDataProps {
  id: number
  title: string
  remainingBoxes: number
  price: number
  tokenPrice: PropToken
  iconImageUrl: string
  titleImageurl: string
}

export enum IBoxType {
  COMMON_BOX = 1,
  RARE_BOX = 2,
  SUPER_RARE_BOX = 3,
  SUPER_SUPER_RARE_BOX = 4,
}

const BlindBoxItem: React.FC<IBlindBoxItemProps> = ({blindBoxItem, isFreeZone, boxTicketData}) => {
  const {t} = useTranslation()
  const [fobidden, setFobidden] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)
  const [purchasedTx, setPurchasedTx] = useState(false)
  // const [currentTime, setCurrentTime] = useState(Date.now())
  const [isShow, setIsShow] = useState(false)
  const [idoDetails, setIdoDetails] = useState({
    isPaid: false,
    tokenAllowance: false,
    isClaim: false,
    balanceOf: 1000,
    timeClaimIDO: 0,
    startTime: 0,
    endTime: 0,
    maxHardCap: 0,
    nowCap: 0,
    nowTotalUser: 0,
    endTimeStakeNFT: 0,
  })
  const redirectToBlindBoxDetail = () => {
    const path = `/blind-box/${blindBoxItem.id}`
    history.push(path)
  }
  const boxId = blindBoxItem.id

  const remaingBox = useCallback(() => {
    if (!boxTicketData) return 0
    let totalRemaing = 0
    switch (Number(boxId)) {
      case IBoxType.COMMON_BOX:
        totalRemaing = boxTicketData.totalBoxCM
        break
      case IBoxType.RARE_BOX:
        totalRemaing = boxTicketData.totalBoxR
        break
      case IBoxType.SUPER_RARE_BOX:
        totalRemaing = boxTicketData.totalBoxSR
        break
      case IBoxType.SUPER_SUPER_RARE_BOX:
        totalRemaing = boxTicketData.totalBoxSSR
        break
      default:
        totalRemaing = 0
        break
    }
    return totalRemaing
  }, [boxTicketData, boxId])

  const idoData = blindBoxItems.find((ido) => ido.id === boxId)
  const dataMemo = useMemo(() => idoData, [idoData])
  const dataIDO = useMemo(() => idoDetails, [idoDetails])

  const {toastError, toastSuccess} = useToast()
  const {account} = useActiveWeb3React()

  const savePurchaseBlindboxToRedux = async () => {
    setPendingTx(true)
    const currentPurchasedBlindBox = await indexDb.get('currentPurchasedBlindBox')
    let newPurchasedBlindbox = {
      boxId,
      currentQuantity: 1,
      account,
    }

    let purchasedBlindbox = []

    if (currentPurchasedBlindBox) {
      const currentPurchasedBlindBoxArray = JSON.parse(currentPurchasedBlindBox)
      const currentPurchasedBlindBoxObj = find(currentPurchasedBlindBoxArray, (item: any) => item.boxId === boxId)
      if (currentPurchasedBlindBoxObj) {
        newPurchasedBlindbox = {
          ...newPurchasedBlindbox,
          currentQuantity: newPurchasedBlindbox.currentQuantity + currentPurchasedBlindBoxObj.currentQuantity,
        }
        remove(currentPurchasedBlindBoxArray, (currentObject: any) => currentObject.boxId === boxId)
        purchasedBlindbox = [...currentPurchasedBlindBoxArray, newPurchasedBlindbox]
      } else {
        purchasedBlindbox = [...currentPurchasedBlindBoxArray, newPurchasedBlindbox]
      }
    } else {
      purchasedBlindbox.push(newPurchasedBlindbox)
    }
    indexDb.set('currentPurchasedBlindBox', JSON.stringify(purchasedBlindbox))

    const toast = toastSuccess
    toast('Purchased success')
    setPendingTx(false)
    setPurchasedTx(true)
  }

  const [numberOfBox, setNumberOfBox] = useState({})

  useEffect(() => {
    const fetchCommonBoxData = async () => {
      try {
        const totalBoxApi = await fetch(`https://api.heroestd.com/get-box-config/${blindBoxItem.id}`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        })

        const totalBox = await totalBoxApi.json()
        setNumberOfBox(totalBox)
      } catch (err) {
        console.log(err)
      }
    }

    fetchCommonBoxData()
  }, [blindBoxItem.id])

  if (!boxTicketData) {
    return (
      <div className="flex gap-3 w-full flex-col mt-5">
        <Skeleton width="100%" />
      </div>
    )
  }

  const startTime = boxTicketData.startTime * 1000
  const endTime = boxTicketData.endTime * 1000

  let currentTime = Date.now()
  let checkTimeStart = startTime > currentTime
  let checkTimeEnd = endTime < currentTime
  let checkIsOpen = !checkTimeStart && !checkTimeEnd

  const hanldeComplete = () => {
    currentTime = Date.now()
    checkTimeStart = startTime > currentTime
    checkTimeEnd = endTime < currentTime
    checkIsOpen = !checkTimeStart && !checkTimeEnd
  }

  const LogicButton = () => {
    if (boxTicketData.userWhitelist !== undefined) {
      return <ButtonPurchase />
    }
    return <ButtonPurchase />
  }

  const ButtonPurchase = () => {
    hanldeComplete()
    if (!boxTicketData.userWhitelist && !isFreeZone) {
      return <Button scale="sm" disabled width="100%">You not in whitelist</Button>
    }
    if (checkTimeEnd) {
      return (
        <Button scale="sm" disabled width="100%">
          Ended
        </Button>
      )
    }
    if (checkTimeStart) {
      return (
        <Button height={35} disabled width="100%" padding={0}>
          <div className="flex gap-2">
            <span className="text-xs">Starts in: </span>
            <Countdown date={startTime} onComplete={hanldeComplete} renderer={CountDownRender} />
          </div>
        </Button>
      )
    }
    if (checkIsOpen) {
      if (remaingBox() === 0)
        return (
          <Button scale="sm" disabled width="100%">
            Sold out
          </Button>
        )
      return (
        <div className="text-center">
          <Button scale="sm" onClick={() => setIsShow(true)} width="100%">
            Purchase
          </Button>
          {/* <div className="flex flex-wrap text-xs gap-1 mt-2 justify-center">
            End in: <Countdown date={endTime} renderer={CountDownRender} onComplete={hanldeComplete} />
          </div> */}
        </div>
      )
    }
    return null
  }

  return (
    <CardBlindBoxItem key={blindBoxItem.id} className="margin-center">
      {remaingBox() === 0 && (
        <SoldOut>
          <img src="/images/blindbox/sold_out.png" alt="sold out" />
        </SoldOut>
      )}
      <CardIcon
        style={{
          background: `url(${blindBoxItem.iconImageUrl})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />
      <BlindBoxTitle>
        <img className="margin-center object-contain " src={`${blindBoxItem.titleImageurl}`} alt={blindBoxItem.title} />
      </BlindBoxTitle>
      <BlindBoxInfo>
        {
          checkIsOpen && <CardItem>
            <Text marginRight="2px" fontSize="12px" color="#A7A7A7">
              {' '}
              {t('Remaining Boxes:')}{' '}
            </Text>
            <Text fontSize="12px" color="#F7F7F7">
              { remaingBox() }
            </Text>
        </CardItem>
        }
        <CardItem>
          <Text marginRight="10px" paddingTop="2px" fontSize="14px" color="#A7A7A7">
            {' '}
            {t('Price:')}{' '}
          </Text>
          <div className="flex gap-1 items-center">
            <Text fontSize="14px" color="#D5B75F" bold>
              {blindBoxItem.price} {blindBoxItem.tokenPrice.symbol}
            </Text>
            <img
              className="h-5 w-5"
              src={`/images/coins/${blindBoxItem.tokenPrice.symbol.toLowerCase()}.png`}
              alt={blindBoxItem.tokenPrice.symbol}
            />
          </div>
        </CardItem>

        <Popup className="w-full" modal open={isShow} onClose={() => setIsShow(false)} trigger={<ButtonPurchase />}>
          {(close) =>
            !purchasedTx ? (
              <PopupCheckoutBlindBox
                close={close}
                dataIdo={dataMemo}
                balanceToken={dataIDO.balanceOf}
                onPay={() => savePurchaseBlindboxToRedux()}
                boxTitle={blindBoxItem.title}
                isFreeZone={isFreeZone}
              />
            ) : (
              <PopupCompleteBlindBox
                close={close}
                clearPurchasedTx={() => setPurchasedTx(false)}
                boxTitle={blindBoxItem.title}
              />
            )
          }
        </Popup>

        <div className="dash">
          <h4 className="text-sm mt-2" style={{textAlign: 'center'}}>
            Drop rate
          </h4>
        </div>
        <div className="mt-5" style={{height: '115px'}}>
          <div
            style={{color: '#9E9E9E', fontSize: '10px', fontWeight: 'bold'}}
            className="flex flex-row justify-between text-xs mt-1 border-rate"
          >
            <span>Common (C)</span>
            <span>{blindBoxItems[Number(boxId) - 1].percentCHero}%</span>
          </div>
          <div
            style={{color: '#8DE1FF', fontSize: '10px', fontWeight: 'bold'}}
            className="flex flex-row justify-between text-xs mt-1 border-rate"
          >
            <span>Rare (R)</span>
            <span>{blindBoxItems[Number(boxId) - 1].percentRHero}%</span>
          </div>
          <div
            style={{color: '#92EE97', fontSize: '10px', fontWeight: 'bold'}}
            className="flex flex-row justify-between text-xs mt-1 border-rate"
          >
            <span>Super Rare (SR)</span>
            <span>{blindBoxItems[Number(boxId) - 1].percentSRHero}%</span>
          </div>
          <div
            style={{color: '#FF7EE7', fontSize: '10px', fontWeight: 'bold'}}
            className="flex flex-row justify-between text-xs mt-1"
          >
            <span>Super Super Rare (SSR)</span>
            <span>{blindBoxItems[Number(boxId) - 1].percentSSRHero}%</span>
          </div>
        </div>
      </BlindBoxInfo>
    </CardBlindBoxItem>
  )
}
const BlindBoxTitle = styled.div`
  height: 22px;
  width: 100%;
  display: flex;
  justify-content: center;
  bottom: 0px;
  background-size: contain;
  bottom: 30%;
  > img {
    width: 90%;
  }
`

const BlindBoxInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding 20px;
`

const CardItem = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  justify-content: space-between;
`

const CardBlindBoxItem = styled.div`
  position: relative;
  background: #000000;
  border: 1px solid #424243;
  box-sizing: border-box;
  border-radius: 5px;
  position: relative;
  margin-right: 39px;
  width: 100%;
  flex: 1;
  overflow: hidden;
  :hover {
    cursor: pointer;
  }
`

const CardIcon = styled.div`
  margin: 20px;
  height: 200px;
  animation: float_box 3s linear infinite;
  @keyframes float_box {
    0%,
    100% {
      transform: rotate(3deg) translateY(2%);
    }

    50% {
      transform: rotate(-3deg) translateY(1%);
    }
  }
`

const SoldOut = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 100px;
  text-align: center;
  height: 30px;
  line-height: 30px;
`
export default BlindBoxItem
