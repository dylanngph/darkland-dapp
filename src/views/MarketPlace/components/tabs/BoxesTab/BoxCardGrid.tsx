/* eslint-disable import/no-named-as-default-member */
import { useWeb3React } from '@web3-react/core'
import bnbIcon from 'assets/icons/bnbIcon.svg'
import { Button, Text } from 'components/Pancake-uikit'
import PopupComplete from 'components/Popup/PopupComplete'
import React from 'react'
import { useTranslation } from 'contexts/Localization'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import { formatNumber } from 'utils/formatBalance'
import PopupCancelOder from './PopupCancelOrder'
import PopupPurchaseBox from './PopupPurchaseBox'

export interface ItemProps {
  item: Props
  pendingTx: boolean
  setPurchasedTx: any
  cancelTx: boolean
  handleCancel: (orderId: number) => Promise<void>
  handleApprove: () => Promise<void>
  setCancelTx: any
  purchasedTx: boolean
  handleBuy: (orderId: number) => Promise<void>
}

export interface Props {
  id: string
  title: string
  remainingBoxes: number
  price: number
  currency: string
  iconImageUrl: string
  titleImageurl: string
  boxType: string
  config: any
  tokenId: number
  seller: string
}

const BoxCardGrid: React.FC<ItemProps> = (
  {
    item,
    pendingTx,
    setPurchasedTx,
    cancelTx,
    handleCancel,
    setCancelTx,
    handleApprove,
    purchasedTx,
    handleBuy,
  },
  ...props
) => {
  const { account } = useWeb3React()
  const isYour = account === item.seller
  // const [fobidden, setFobidden] = useState(true)

  const renderImage = ({ value }) => {
    const boxImages = {
      Common: [
        'https://cdn.heroestd.io/Images/Box_Common.png',
        '/images/blindbox/blind-title-common-box.png',
      ],
      Rare: ['https://cdn.heroestd.io/Images/Box_Rare.png', '/images/blindbox/blind-title-rare-box.png'],
      Epic: ['https://cdn.heroestd.io/Images/Box_Epic.png', '/images/blindbox/blind-title-epic-box.png'],
      Legendary: [
        'https://cdn.heroestd.io/Images/Box_Legendary.png',
        '/images/blindbox/blind-title-legendary-box.png',
      ],
    }

    // const boxImages = {
    //   common: [CommonBoxImage, CommonBoxTitle],
    //   rare: [RareBoxImage, RareBoxTitle],
    //   epic: [EpicBoxImage, EpicBoxTitle],
    //   Legendary: [LegendBoxImage, LegendBoxTitle],
    // }
    return (
      <>
        <CardImage>
          <img src={boxImages[value][0]} alt={boxImages[value][0]} />
        </CardImage>
        <BlindBoxTitle>
          <img src={boxImages[value][1]} alt={boxImages[value][1]} />
        </BlindBoxTitle>
      </>
    )
  }

  return (
    <Card key={item.id}>
      <CardId>#{item.tokenId}</CardId>

      {renderImage(item?.config?.attributes[0])}

      <AmountInfo>
        <img src="images/coins/busd.png" alt="busd" className="w-5 h-5 object-cover" />
        <Text fontSize="16px" fontWeight={700} marginX="5px" color="#FFAB04">
          {formatNumber(item.price)}
        </Text>
        <Text fontSize="16px" color="#fff">
          BUSD
        </Text>
      </AmountInfo>

      {  isYour ? (
        <Popup
          className="w-full"
          modal
          trigger={
            <Button width="90%" scale="sm" margin="0 auto 15px" variant="warning">
              Cancel
            </Button>
          }
        >
          {(close) =>
            !cancelTx ? (
              <PopupCancelOder
                close={close}
                pendingTx={pendingTx}
                box={item}
                onCancel={handleCancel}
              />
            ) : (
              <PopupComplete
                close={close}
                clearPopup={() => setCancelTx(false)}
                buttonGoto="My Assets"
                path="/my-assets"
                description="Please check My assets site"
              />
            )
          }
        </Popup>
      ) : (
        account
        ?
        <Popup
          className="w-full"
          modal
          trigger={
            <Button
              width="90%"
              scale="sm"
              margin="0 auto 15px"
              // disabled={!item.remainingBoxes && fobidden}
            >
              Purchase
            </Button>
          }
        >
          {(close) =>
            !purchasedTx ? (
              <PopupPurchaseBox
                close={close}
                pendingTx={pendingTx}
                balanceToken={undefined}
                amount={item.price}
                boxType={item.config.name}
                boxID={item.tokenId}
                orderId={item.id}
                onBuy={handleBuy}
                onApprove={handleApprove}
              />
            ) : (
              <PopupComplete
                close={close}
                clearPopup={() => setPurchasedTx(false)}
                buttonGoto="My Assets"
                path="/my-assets"
                description="Please check My assets site"
              />
            )
          }
        </Popup>
        : 
        <ConnectWalletButton scale="sm" marginX="10px"/>
      )}
      {/* Case owner orders */}
      {/* <Popup
        className="w-full"
        modal
        trigger={
          <Button width="90%" scale="sm" margin="0 auto 15px">
            Cancel
          </Button>
        }
      >
        {(close) =>
          !purchasedTx ? (
            <PopupCancelOder
              close={close}
              onPurchaseBox={handlePurchaseBox}
              pendingTx={undefined}
              clearPurchasedTx={() => setPurchasedTx(true)}
              boxType={item.boxType}
              boxID={item.id}
            />
          ) : (
            <PopupTransactionsSuccessful
              close={close}
               boxType={item.boxType}
                      boxID={item.id}
              clearPurchasedTx={() => setPurchasedTx(false)}
            />
          )
        }
      </Popup> */}
    </Card>
  )
}

const Card = styled.div`
  background: #000000;
  display: flex;
  flex-direction: column;
  gap: 12px 40px;
  border: 1px solid #424243;
  border-radius: 5px;
  height: 360px;
  max-width: 200px;
  cursor: pointer;
  transition-duration: .2s;
  overflow: hidden;
  &:hover {
    border: 1px solid #787878;
  }
`

const CardId = styled.div`
  background: #19b911;
  border-radius: 3px;
  color: #fff;
  margin-top: 15px;
  margin-left: 10px;
  padding: 0 10px;
  width: fit-content;
  font-size: 12px;
`

const CardImage = styled.div`
  > img {
    max-width: 200px;
    margin: auto;
    padding: 0 10px;
  }
`

const BlindBoxTitle = styled.div`
  > img {
    height: 16px;
    margin: auto;
  }
`

const AmountInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
export default BoxCardGrid
