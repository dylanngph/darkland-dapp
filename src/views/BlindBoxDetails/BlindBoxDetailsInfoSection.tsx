import React, {useState, useMemo, useCallback, useEffect} from 'react'
import styled from 'styled-components'
import {Button, Text} from 'components/Pancake-uikit'
import {useTranslation} from 'contexts/Localization'
import {find, remove} from 'lodash'
import useToast from 'hooks/useToast'
import Popup from 'reactjs-popup'
import blindBoxItems from 'config/constants/blindBoxItems'
import LoadingComponent from 'views/LoadingComponent'
import { isMobile } from 'react-device-detect'
import HeroesCard from 'views/HeroesCard'
import * as indexDb from '../../utils/services'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import './blindBoxDetails.modules.scss'
import BlindBoxFrame from './BlindBoxFrame'


const BlindBoxDetailsInfoSection = ({
  blindBoxItem, 
  boxId, 
  allowance, 
  onApprove,
  approveTx,
  onOpen,
  pendingTx,
  setPendingTx,
  dataAttr,
  openIframe
}) => {
  const {t} = useTranslation()
  const [isShow, setIsShow] = useState(false)

  const [currentQuantity, setCurrentQuantity] = useState(1)
  const onChangeQuantityNumber = (quantity: number) => {
    setCurrentQuantity(quantity)
  }

  const {toastError, toastSuccess} = useToast()

  const {account} = useActiveWeb3React()

  const savePurchaseBlindboxToRedux = async () => {
    setPendingTx(true)
    const currentPurchasedBlindBox = await indexDb.get('currentPurchasedBlindBox')
    let newPurchasedBlindbox = {
      boxId,
      currentQuantity,
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
  }

  const getOpenBlindBoxData = useCallback(
      (msg: MessageEvent<any>) => {
        if (msg.data === 'OpenBox') {
          setIsShow(true)
          const iframe = document.getElementById('boxIframe') as HTMLIFrameElement
          if (iframe) {
            iframe.contentWindow.postMessage(
              {
                eventName: 'open-box',
                data: {
                  boxId,
                  heroData: JSON.stringify(dataAttr)
                },
              },
              '*',
              )
            }
        } else if (msg.data === 'close') {
          setIsShow(false)
        }
      },
      [boxId, dataAttr],
    )
  
    useEffect(() => {
      setIsShow(openIframe)
      window.addEventListener('message', getOpenBlindBoxData)
      return () => {
        window.removeEventListener('message', getOpenBlindBoxData)
      }
    }, [getOpenBlindBoxData, openIframe])

  return (
    <Card>
      <div className="lg:flex lg:flex-row">
        {pendingTx && (
          <Overlay>
            <LoadingComponent />
          </Overlay>
        )}
        <div className="margin-center sm:w-3/5 md:w-4/5 lg:w-2/5">
          <Block>
            <CardIcon
              // className="margin-center"
              // style={{background: `url(${blindBoxItem.iconImageUrl})`, backgroundSize: 'contain'}}
            >
              <img src={`${blindBoxItem.iconImageUrl}`} alt="box" style={{width:"90%", height:"90%"}} />
              </CardIcon>
            <BlindBoxTitle>
              <img className="margin-center" src={`${blindBoxItem.titleImageurl}`} alt={blindBoxItem.title} />
            </BlindBoxTitle>
            <CardAmount className="m-auto">
              <Text marginTop="10px" marginRight="2px" fontSize="24px" color="#A7A7A7">
                {' '}
                {t('Amount:')}{' '}
              </Text>
              <Text marginTop="10px" fontSize="24px" color="#FFAB04">
                {blindBoxItem.balanceOf || 0} 
              </Text>
            </CardAmount>
            {/* <CardItem>
              <SelectQuantityComponent quantity={currentQuantity} onChangeQuantityNumber={onChangeQuantityNumber} />
            </CardItem>
            <CardItem>
              <Text marginRight="2px" fontSize="12px" color="#A7A7A7">
                {' '}
                {t('Remaining Boxes:')}{' '}
              </Text>
              <Text fontSize="12px" color="#F7F7F7">
                {blindBoxItem.remainingBoxes}
              </Text>
            </CardItem>
            <CardItem>
              <Text marginRight="10px" paddingTop="2px" fontSize="12px" color="#A7A7A7">
                {' '}
                {t('Total Price:')}{' '}
              </Text>
              <Text fontSize="12px" color="#FFC247">
                {blindBoxItem.price * currentQuantity} {blindBoxItem.tokenPrice.symbol}
              </Text>
            </CardItem> */}
            {
              allowance ?
              <Button className="btn-purchase w-full" style={{marginTop:"18px"}} disabled={account === undefined || blindBoxItem.balanceOf <= 0 || pendingTx} onClick={onOpen}>
                { pendingTx ? `Processing...` : `Open Box` }
              </Button>
              :
              <Button width="100%" onClick={onApprove} disabled={approveTx}>Approve box</Button>
            }
            
            <Popup
                closeOnDocumentClick
                open={isShow}
                onClose={() => setIsShow(false)}
                onOpen={() => setIsShow(true)}
                position="center center"
                modal
              >
              {(close) => (
                  <>
                    <Button
                      className="btn-purchase"
                      scale="sm"
                      style={{ right: '20px', position: 'absolute', top: '20px' }}
                      onClick={close}
                    >
                      X
                    </Button>
                    {isMobile ?
                        <HeroesCard hero={dataAttr} />
                      :
                        <iframe
                        id="boxIframe"
                        title="OpenBox"
                        scrolling="no"
                        style={{ minWidth: '100vw', maxWidth: '100%', minHeight: '100vh', maxHeight: '100%', overflow: 'hidden' }}
                        src="https://box.heroestd.io"
                      />
                    }
                  </>
                )}
              </Popup>
          </Block>
        </div>
        <div className="ml-5 mr-5 sm:ml-5 sm:mr-5 sm:w-5/5 md:w-5/5 md:ml-10 md:mr-10 lg:w-3/5 lg:mr-10">
          <BlindBoxFrame boxId={boxId} />
        </div>
      </div>
    </Card>
  )
}

const Block = styled.div`
  width: 100%;
  padding-left: 48px;
  padding-right: 48px;
`

const CardItem = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  justify-content: space-between;
`
const CardAmount = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  justify-content: center;
  border-radius: 2px;
  padding: 5px;
`

const Card = styled.div`
  width: 100%;
  height: auto;
  min-height: 487px;
  color: white;
  background: #000000;
  border-radius: 8px;
  padding-bottom: 29px;
`

const BlindBoxTitle = styled.div`
  height: 22px;
  margin-top:10px;
  margin-bottom: 18px;
`

const CardIcon = styled.div`
  padding: 15px;
  padding-top: 5px;
  width: 100%;
  display:flex;
  flex-direction: row;
  justify-content: center;
  margin-top:15px;
`
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
export default BlindBoxDetailsInfoSection
