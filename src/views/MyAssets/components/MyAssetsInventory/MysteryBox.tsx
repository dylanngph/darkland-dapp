import React, {useState, useEffect, useCallback} from 'react'
import styled from 'styled-components'
import {useTranslation} from 'contexts/Localization'
import Popup from 'reactjs-popup'
import {openBox} from 'config/constants/boxes'
import blindBoxItems from 'config/constants/blindBoxItems'
import '../MyAssetMenu/menuAsset.modules.scss'
import {isMobile} from 'react-device-detect'
import useToast from 'hooks/useToast'
import {useCallWithGasPrice} from 'hooks/useCallWithGasPrice'
import {useApproveMysteryBox, useOpenMysteryBox} from 'hooks/useContract'
import {getAddress} from 'utils/addressHelpers'
import {Text, Button} from '@pancakeswap/uikit'

import {Tooltip} from '@chakra-ui/react'

export function GetBoxId(): any {
  console.log('call')
  return 1
}

const MysteryBox = ({balanceOf, isApprovedForAll, listBoxes, onPeding, pendingTx}) => {
  const [showDropRate, setShowDropRate] = useState(false)
  const [typeBox, setTypeBox] = useState(0)
  const [isShow, setIsShow] = useState(false)
  const {t} = useTranslation()

  const openPurchaseBlindboxToRedux = () => {
    setIsShow(false)
  }
  // const transformVector = {
  //   transform: 'rotate(-90deg)',
  //   transitionDuration: '0.5s',
  // }

  const transformCard = {
    height: '100%',
  }

  // const transformTitle = {
  //   top: '57%',
  // }

  const getOpenBlindBoxData = useCallback(
    (msg: MessageEvent<any>) => {
      if (msg.data === 'GetBoxId') {
        const iframe = document.getElementById('boxIframe') as HTMLIFrameElement
        if (iframe) {
          iframe.contentWindow.postMessage(
            {
              eventName: 'set-box',
              data: typeBox,
            },
            '*',
          )
        }
      } else if (msg.data === 'close') {
        setIsShow(false)
      }
    },
    [typeBox],
  )

  useEffect(() => {
    window.addEventListener('message', getOpenBlindBoxData)
    return () => {
      window.removeEventListener('message', getOpenBlindBoxData)
    }
  }, [getOpenBlindBoxData])

  /// --- Handle Write Contract --- ///
  const {toastSuccess, toastError} = useToast()
  const {callWithGasPrice} = useCallWithGasPrice()
  const approveBoxContract = useApproveMysteryBox()
  const openBoxContract = useOpenMysteryBox()

  const handleApprove = async () => {
    try {
      onPeding(true)
      const tx = await callWithGasPrice(approveBoxContract, 'setApprovalForAll', [
        getAddress(openBox.contractAddress),
        'true',
      ])
      const receipt = await tx.wait()
      toastSuccess('Success', 'You just approved all boxes')
    } catch (e) {
      console.log(e)
      toastError('Error', e?.data?.message)
    } finally {
      onPeding(false)
    }
  }

  const handleOpenBox = async () => {
    try {
      onPeding(true)
      const tx = await callWithGasPrice(openBoxContract, 'claimNFT', [listBoxes[0]], {gasLimit: 500000})
      const receipt = await tx.wait()
      const typeAddresssReturn = receipt?.logs[3]?.address
      const data = blindBoxItems.find(
        (d) => getAddress(d.boxAddress).toLocaleLowerCase() === typeAddresssReturn.toLocaleLowerCase(),
      )
      setTypeBox(Number(data.id))
      setIsShow(true)
      toastSuccess('Success', 'Congratulations, you got a box')
    } catch (e) {
      console.log(e)
      toastError('Error', e?.data?.message)
    } finally {
      onPeding(false)
    }
  }

  return (
    <div>
      <Card style={!showDropRate ? transformCard : {}}>
        <CardIcon
          className="ml-2.5 sm:ml-2.5 md:ml-2 lg:ml-2.5 mr-2.5 sm:mr-2.5 md:mr-2.5 lg:mr-2.5 mt-10"
        >
          <img src="/images/blindbox/Mys_Boxes_image.png" className="w-full" alt="" />
          <img className="margin-center mt-2" src="/images/blindbox/mystery_box_title.png" alt="title" />
        </CardIcon>
        <BlindBoxInfo>
          <CardItem>
            <Text marginRight="2px" fontSize="12px" color="#A7A7A7">
              {' '}
              {t('Amount:')}{' '}
            </Text>
            <Text fontSize="12px" color="#FFAB04">
              {balanceOf}
            </Text>
          </CardItem>
          {isMobile === false ? (
            <Button
              disabled={pendingTx || balanceOf === 0}
              width="100%"
              onClick={() => (isApprovedForAll ? handleOpenBox() : handleApprove())}
            >
              {isApprovedForAll ? 'Open' : 'Approve'}
            </Button>
          ) : null}

          <StyledPopup
            modal
            closeOnDocumentClick
            open={isShow}
            onClose={() => openPurchaseBlindboxToRedux()}
            position="center center"
            trigger={
              isMobile === false ? null : (
                <Button className="btn-purchase" disabled={pendingTx || balanceOf === 0} width="100%">
                  {isApprovedForAll ? 'Open' : 'Approve'}
                </Button>
              )
            }
          >
            {(close) => (
              <>
                <Button
                  className="btn-purchase"
                  scale="sm"
                  style={{right: '-15px', position: 'absolute', top: '-5px', zIndex: '999'}}
                  onClick={close}
                >
                  X
                </Button>
                {isMobile ? (
                  <MobilePopup className="flex flex-row">
                    <PopupLeft>
                      <CardIconPopup
                        className="ml-4 sm:ml-4 md:ml-4 lg:ml-4 mr-2.5 sm:mr-2.5 md:mr-2.5 lg:mr-2.5 mt-0 "
                        // style={{
                        //   background: `url("/images/blindbox/box-mystery.png")`,
                        //   backgroundSize: 'contain',
                        //   backgroundRepeat: 'no-repeat',
                        // }}
                      >
                        <img
                          src={
                            typeBox === 0
                              ? '/images/blindbox/Mys_Boxes_image.png'
                              : typeBox === 1
                              ? '/images/blindbox/Box_Common.png'
                              : typeBox === 2
                              ? '/images/blindbox/Box_Rare.png'
                              : typeBox === 3
                              ? '/images/blindbox/Box_Epic.png'
                              : typeBox === 4 && '/images/blindbox/Box_Legendary.png'
                          }
                          alt=""
                          style={{marginBottom: '10px'}}
                        />
                        <img
                          src={
                            typeBox === 0
                              ? '/images/blindbox/mystery_box_title.png'
                              : typeBox === 1
                              ? '/images/blindbox/blind-title-common-box.png'
                              : typeBox === 2
                              ? '/images/blindbox/blind-title-rare-box.png'
                              : typeBox === 3
                              ? '/images/blindbox/blind-title-epic-box.png'
                              : typeBox === 4 && '/images/blindbox/blind-title-legendary-box.png'
                          }
                          alt="title"
                        />
                      </CardIconPopup>
                      <BlindBoxInfo>
                        <CardItem className="w-full">
                          <Text marginRight="2px" fontSize="12px" color="#A7A7A7">
                            {' '}
                            {t('Mystery Boxes:')}{' '}
                          </Text>
                          <Text fontSize="12px" color="#FFAB04">
                            {balanceOf}
                          </Text>
                        </CardItem>
                        <Button
                          className="btn-purchase"
                          disabled={pendingTx || balanceOf === 0}
                          scale="sm"
                          width="100%"
                          onClick={() => (isApprovedForAll ? handleOpenBox() : handleApprove())}
                        >
                          {isApprovedForAll ? 'Open' : 'Approve'}
                        </Button>
                      </BlindBoxInfo>
                    </PopupLeft>
                    <PopupRight>
                      <TitleReward className="text-xs p-2" style={{textAlign: 'center'}}>
                        Reward: One of four Boxes
                      </TitleReward>
                      <ContainBox style={{backgroundColor: '#111111'}}>
                        <div className="flex flex-row flex-wrap mt-3 justify-center">
                          <img
                            className="ml-5 mt-1 mb-1"
                            src="/images/blindbox/Box_Common.png"
                            alt="common"
                            height="40px"
                            width="40px"
                          />

                          <img
                            className="ml-5 mt-1 mb-1"
                            src="/images/blindbox/Box_Rare.png"
                            alt="common"
                            height="40px"
                            width="40px"
                          />

                          <img
                            className="ml-5 mt-1 mb-1"
                            src="/images/blindbox/Box_Epic.png"
                            alt="common"
                            height="40px"
                            width="40px"
                          />

                          <img
                            className="ml-5 mt-1 mb-1"
                            src="/images/blindbox/Box_Legendary.png"
                            alt="common"
                            height="40px"
                            width="40px"
                          />
                        </div>
                      </ContainBox>
                    </PopupRight>
                  </MobilePopup>
                ) : (
                  <iframe
                    // onLoad={iframeLoadDone}
                    id="boxIframe"
                    title="OpenBox"
                    scrolling="no"
                    style={{width: '100%', height: '100%', overflow: 'hidden'}}
                    src="https://random-box.heroestd.io"
                  />
                )}
              </>
            )}
          </StyledPopup>
          <div className="dash">
            <div
              className="text-sm mt-2 flex flex-row flex-wrap justify-center"
              style={{textAlign: 'center'}}
              role="button"
              tabIndex={0}
            >
              <Tooltip
                placement="bottom"
                trigger={['click']}
                bg="#111111"
                padding={3}
                hasArrow
                border="2px solid #2D2B2B"
                borderRadius="15px"
                arrowShadowColor="#2D2B2B"
                label={
                  <TooltipHover>
                    <TitleReward className="text-md mt-4" style={{textAlign: 'center'}}>
                      REWARD: ONE OF FOUR BOXES
                    </TitleReward>
                    <TooltipContain className=" mt-3" style={{backgroundColor: '#111111'}}>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-row">
                          <img
                            className="ml-5 mt-1 mb-1"
                            src="/images/blindbox/Box_Common.png"
                            alt="common"
                            height="40px"
                            width="40px"
                          />
                          <div className="ml-2">
                            <p style={{color: '#9E9E9E', fontSize: '12px', fontWeight: 'bold'}}>Common</p>
                            <p>50.06%</p>
                          </div>
                        </div>

                        <div className="flex flex-row">
                          <img
                            className="ml-5 mt-1 mb-1"
                            src="/images/blindbox/Box_Rare.png"
                            alt="common"
                            height="40px"
                            width="40px"
                          />
                          <div className="ml-2">
                            <p style={{color: '#8DE1FF', fontSize: '12px', fontWeight: 'bold'}}>Rare</p>
                            <p>30.84%</p>
                          </div>
                        </div>

                        <div className="flex flex-row">
                          <img
                            className="ml-5 mt-1 mb-1"
                            src="/images/blindbox/Box_Epic.png"
                            alt="common"
                            height="40px"
                            width="40px"
                          />
                          <div className="ml-2">
                            <p style={{color: '#92EE97', fontSize: '12px', fontWeight: 'bold'}}>Epic</p>
                            <p>15.54%</p>
                          </div>
                        </div>

                        <div className="flex flex-row">
                          <img
                            className="ml-5 mt-1 mb-1"
                            src="/images/blindbox/Box_Legendary.png"
                            alt="common"
                            height="40px"
                            width="40px"
                          />
                          <div className="ml-2">
                            <p style={{color: '#FF7EE7', fontSize: '12px', fontWeight: 'bold'}}>Legendary</p>
                            <p>3.55%</p>
                          </div>
                        </div>
                      </div>
                    </TooltipContain>
                  </TooltipHover>
                }
              >
                <Text style={{color: '#FFAB04', fontWeight: 'bold', fontSize: '12px'}}>
                  <div className="flex gap-1 items-center">
                    Drop rate
                    <img
                      className="w-4"
                      src="https://cdn.heroestd.io/Images/exclamation.31bd8f3c.svg"
                      alt="Drop rate"
                    />
                  </div>
                </Text>
              </Tooltip>
            </div>
          </div>
          {showDropRate ? (
            <div className="mt-8" style={{height: '100%', backgroundColor: '#111111'}}>
              <p className="text-sm mt-3">Drop Rate:</p>
              <div className="p-2" style={{height: '100%'}}>
                <div
                  style={{color: '#9E9E9E', fontSize: '12px', fontWeight: 'bold'}}
                  className="flex flex-row justify-between text-xs mt-1 border-rate"
                >
                  <span>Common (C)</span>
                  <span>50.06%</span>
                </div>
                <div
                  style={{color: '#8DE1FF', fontSize: '1px', fontWeight: 'bold'}}
                  className="flex flex-row justify-between text-xs mt-1 border-rate"
                >
                  <span>Rare (R)</span>
                  <span>30.84%</span>
                </div>
                <div
                  style={{color: '#92EE97', fontSize: '12px', fontWeight: 'bold'}}
                  className="flex flex-row justify-between text-xs mt-1 border-rate"
                >
                  <span>Super Rare (SR)</span>
                  <span>15.54%</span>
                </div>
                <div
                  style={{color: '#FF7EE7', fontSize: '12px', fontWeight: 'bold'}}
                  className="flex flex-row justify-between text-xs mt-1"
                >
                  <span>Super Super Rare (SSR)</span>
                  <span>3.55%</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-5" style={{height: '10px'}} />
          )}
        </BlindBoxInfo>
      </Card>
    </div>
  )
}

const StyledPopup = styled(Popup)`
// use your custom style for ".popup-overlay"
&-overlay {
  ...;
}
// use your custom style for ".popup-content"
&-content {
  width: 960px;
  height: 600px;
  padding: 20px !important;
  background: transparent !important;
  border: none !important;
  @media only screen and (max-width: 600px){
    height: fit-content
  }
}

`

// const BlindBoxTitle = styled.div`
//   height: 15px;
//   position: absolute;
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   background-size: contain;
//   bottom: 58%;
// `

const BlindBoxInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  align-items: center;
`

const CardItem = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  justify-content: space-between;
  border-radius: 2px;
  padding: 5px;
`

const MobilePopup = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(232.96deg, #5e5d5d 1.65%, #3c393a 99.16%);
  border: 1px solid #424243;
  box-sizing: border-box;
  border-radius: 5px;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
`
const TooltipHover = styled.div`
  box-sizing: border-box;
  flex: 1;
`
const TooltipContain = styled.div`
  box-sizing: border-box;
  width: 100%;
`

const PopupLeft = styled.div`
  width: 100%;
  height: fit-content;
  background: #000;
`

const PopupRight = styled.div`
  width: 100%;
  height: fit-content;
  background: #333;
`

const CardIconPopup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`

// const BlindBoxTitlePopup = styled.div`
//   height: 15px;
//   position: absolute;
//   width: 90%;
//   display: flex;
//   justify-content: center;
//   background-size: contain;
//   bottom: 33%;
//   left: 5%;
// `
const TitleReward = styled.div`
  background: linear-gradient(201.79deg, #fac96b -6.4%, #ffffff 42.02%, #ffd076 85.72%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
const ContainBox = styled.div`
  border: 1px solid #9e9e9e;
  box-sizing: border-box;
  border-radius: 19.6111px;
  width: 100%;
`
const Card = styled.div`
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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`

// const Vector = styled.img`
//   margin-left: 2px;
// `

// const HeaderButton = styled.div`
//   top: 0%;
// `

export default MysteryBox
