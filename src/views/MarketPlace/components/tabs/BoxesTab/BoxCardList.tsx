/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-named-as-default-member */
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import bnbIcon from 'assets/icons/bnbIcon.svg'
import CommonBoxImage from 'assets/images/CommonBoxImage.png'
import CommonBoxTitle from 'assets/images/CommonBoxTitle.png'
import EpicBoxImage from 'assets/images/EpicBoxImage.png'
import EpicBoxTitle from 'assets/images/EpicBoxTitle.png'
import LegendBoxImage from 'assets/images/LegendBoxImage.png'
import LegendBoxTitle from 'assets/images/LegendBoxTitle.png'
import RareBoxImage from 'assets/images/RareBoxImage.png'
import RareBoxTitle from 'assets/images/RareBoxTitle.png'
import BigNumber from 'bignumber.js'
import { Button } from 'components/Pancake-uikit'
import { useTranslation } from 'contexts/Localization'
import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import { formatNumber, getBalanceNumber } from 'utils/formatBalance'
import PopupPurchaseBox from './PopupPurchaseBox'
import PopupCancelOder from './PopupCancelOrder'
import PopupTransactionsSuccessful from './PopupTransactionsSuccessful'

interface Props {
  boxesList: any
  handlePurchaseBox: any
}

const BoxCardList = ({ boxesList, handlePurchaseBox }: Props) => {
  const { t } = useTranslation()
  const [fobidden, setFobidden] = useState(true)
  const [purchasedTx, setPurchasedTx] = useState(false)
  // const redirectToBlindBoxDetail = () => {
  //   const path = `/blind-box/${item.id}`
  //   history.push(path)
  // }

  const renderColumnItem = (item) => {
    const { value } = item?.config?.attributes[0]
    const boxImages = {
      Common: [CommonBoxImage, CommonBoxTitle],
      Rare: [RareBoxImage, RareBoxTitle],
      Epic: [EpicBoxImage, EpicBoxTitle],
      Legendary: [LegendBoxImage, LegendBoxTitle],
    }

    return (
      <span style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
        <img
          style={{ display: 'inline', width: 60, marginRight: 5, borderRadius: 10 }}
          src={boxImages[value][0]}
          alt={boxImages[value][0]}
        />
        <span style={{ display: 'flex', flexDirection: 'column' }}>
          <img
            style={{ display: 'inline', height: 15 }}
            src={boxImages[value][1]}
            alt={boxImages[value][1]}
          />
          <span
            className="text-left"
            style={{
              width: 62,
              background: '#19B911',
              borderRadius: 2,
              fontSize: 12,
              marginTop: 5,
              padding: 2,
            }}
          >
            #{item.id}
          </span>
        </span>
      </span>
    )
  }

  return (
    <Table style={{ borderSpacing: '0 10px', borderCollapse: 'separate', margin: 10 }}>
      <Thead>
        <StyleTr>
          <Th style={{ textAlign: 'left' }}>Item</Th>
          <Th>Price</Th>
          <Th>Action</Th>
        </StyleTr>
      </Thead>
      <Tbody>
        {boxesList.map((item) => (
          <StyleTr>
            <Td className="item-column">{renderColumnItem(item)}</Td>
            <Td style={{ fontSize: 16 }}>
              <img
                style={{ display: 'inline', verticalAlign: 'sub' }}
                src={bnbIcon}
                alt={bnbIcon}
              />
              <span style={{ fontWeight: 700, color: '#FFAB04', margin: '0 5px' }}>
                {formatNumber(getBalanceNumber(new BigNumber(item.price), 18))}
              </span>
              <span>BUSD</span>
            </Td>
            <Td>
              <Popup className="w-full" modal trigger={<StyleButton>Purchase</StyleButton>}>
                {(close) =>
                  !purchasedTx ? (
                    <PopupPurchaseBox
                      close={close}
                      pendingTx={undefined}
                      balanceToken={undefined}
                      amount={item.price}
                      boxType={item.boxType}
                      boxID={item.tokenId}
                      orderId={item.id}
                      onBuy={handlePurchaseBox}
                      onApprove={null}
                    />
                  ) : (
                    <PopupTransactionsSuccessful
                      close={close}
                      clearPurchasedTx={() => setPurchasedTx(false)}
                    />
                  )
                }
              </Popup>
              {/* <Popup
                className="w-full"
                modal
                trigger={<StyleButtonCancel>Cancel</StyleButtonCancel>}
              >
                {(close) =>
                  !purchasedTx ? (
                    <PopupCancelOder
                      close={close}
                      onPurchaseBox={handlePurchaseBox}
                      pendingTx={undefined}
                      clearPurchasedTx={() => setPurchasedTx(true)}
                    />
                  ) : (
                    <PopupTransactionsSuccessful
                      close={close}
                      clearPurchasedTx={() => setPurchasedTx(false)}
                    />
                  )
                }
              </Popup> */}
            </Td>
          </StyleTr>
        ))}
      </Tbody>
    </Table>
  )
}

const StyleTr = styled(Tr)`
  height: 56px;
  line-height: 56px;
  .item-column {
    padding: 0px;
  }
  > th {
    text-align: center;
    border: none;
    color: #c6d4ea;
  }
  > td {
    text-align: center;
    vertical-align: middle;
    padding: 10px;
    border-top: 1px solid #2d2b2b;
    border-bottom: 1px solid #2d2b2b;
    :first-child {
      border-left: 1px solid #2d2b2b;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }
    :last-child {
      border-right: 1px solid #2d2b2b;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
`

const StyleButton = styled(Button)`
  height: 40px;
  width: 110px;

  background: linear-gradient(270deg, #fd476a 0%, #fe335b 0.01%, #df222b 105.1%);
  border: 1px solid #000000;
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
`
const StyleButtonCancel = styled(Button)`
  height: 40px;
  width: 110px;
  background: #ffab04;
  border: 1px solid #000000;
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
`

const Card = styled.div`
  display: flex;
`

const CardImage = styled.div`
  > img {
    max-width: 41px;
    margin: auto;
    padding: 10px 10px 0;
  }
`

const BlindBoxTitle = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  > img {
    height: 22px;
  }
`

export default BoxCardList
