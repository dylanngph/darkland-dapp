import React, {useState} from 'react'
import styled from 'styled-components'
import {useTranslation} from 'contexts/Localization'
import {Skeleton} from 'components/Pancake-uikit'
import LotteriesComponent from './LotteriesComponent'
import HtdHolder from './components/HtdHolder/HtdHolder'
import NFTZone from './components/NFTZone/NFTZone'

export enum ITabTypes {
  LOTTERIES = 2,
  HTD_HOLDERS = 0,
  NFT_ZONES = 1,
}

const PreSaleTicketPanel = ({dataBlindbox}) => {
  const {t} = useTranslation()
  const [currentTab, setCurrentTab] = useState(0)

  const customActiveTab = {
    borderColor: '#505050',
    color: '#FFAB04',
    borderBottom: '4px solid #505050',
  }

  const getCustomActiveTab = (index: number) => (currentTab === index ? customActiveTab : {})

  const onChangeCurrentTab = (index: number) => {
    setCurrentTab(index)
  }

  if (!dataBlindbox) {
    return (
      <div className="w-full flex flex-col gap-3">
        <Skeleton width="100%" />
        <Skeleton width="100%" />
        <Skeleton width="100%" />
      </div>
    )
  }

  const renderBody = () => {
    switch (currentTab) {
      case ITabTypes.LOTTERIES:
        return <LotteriesComponent dataBlindbox={dataBlindbox} />
      case ITabTypes.HTD_HOLDERS:
        return <HtdHolder dataBlindbox={dataBlindbox} />
      case ITabTypes.NFT_ZONES:
        return <NFTZone dataBlindbox={dataBlindbox} />
      default:
        return <div>a</div>
    }
  }

  return (
    <Card className="card text-center flex-col sm:flex-col md:flex-row lg:flex-row">
      <div className="card-header" style={{borderBottom: '1px solid #505050', fontSize: '16px'}}>
        <ul className="flex flex-row justify-start border-b">
          <li className=" lg:ml-20 md:ml-10 sm:ml-5 list-none sm:text-xs md:text-md lg:text-md">
            <NavLink
              key={0}
              className="inline-block sm:text-xs md:text-md lg:text-md"
              style={{color: '#9E9E9E', fontWeight: 'bold', ...getCustomActiveTab(0)}}
              onClick={() => onChangeCurrentTab(0)}
            >
              HTD Holders
            </NavLink>
          </li>
          <li className="list-none">
            <NavLink
              key={1}
              className="inline-block sm:text-xs md:text-md lg:text-md"
              style={{color: '#9E9E9E', fontWeight: 'bold', ...getCustomActiveTab(1)}}
              onClick={() => onChangeCurrentTab(1)}
            >
              NFT Zones
            </NavLink>
          </li>
          <li className="list-none">
            <NavLink
              key={2}
              className="inline-block sm:text-xs md:text-md lg:text-md"
              style={{color: '#9E9E9E', fontWeight: 'bold', ...getCustomActiveTab(2)}}
              onClick={() => onChangeCurrentTab(2)}
            >
              Lotteries
            </NavLink>
          </li>
        </ul>
      </div>
      <CardBody className="card-body">{renderBody()}</CardBody>
    </Card>
  )
}

const CardItem = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  justify-content: start;
  font-weight: 800;
`

const CardBody = styled.div`
  height: auto;
`

const NavLink = styled.div`
  padding: 8px;
  font-size: 16px;

  :hover {
    cursor: pointer;
    color: #0a58ca;
  }
`
const Card = styled.div`
  background-color: #000;
  border: 0.971041px solid #272727;
  box-sizing: border-box;
  border-radius: 10px;
`

export default PreSaleTicketPanel
