import React, {useState} from 'react'
import { Flex } from '@chakra-ui/react'
import styled from 'styled-components'
import NFTBounty from './NFTBounty'
import Boxes from './Boxes'
import Heroes from './Heroes'

export enum ITabTypes {
  BOXES = 0,
  NFT_BOUNTY = 1,
  HEROES = 2,
}

const MyAssetsInventory = () => {
  const [currentTab, setCurrentTab] = useState(2)

  const customActiveTab = {
    // borderColor: '#da3754',
    // color: '#FFFFFF',
    // borderBottom: '4px solid #da3754',
    backgroundColor: 'rgba(0, 191, 213)',
  }

  const getCustomActiveTab = (index: number) => (currentTab === index ? customActiveTab : {})

  const onChangeCurrentTab = (index: number) => {
    setCurrentTab(index)
  }

  const renderBody = () => {
    switch (currentTab) {
      case ITabTypes.BOXES:
        return <Boxes />
      case ITabTypes.NFT_BOUNTY:
        return <NFTBounty />
      case ITabTypes.HEROES:
        return <Heroes currentLayout={0} />
        // return <MarketHeros currentLayout={0} />
      default:
        return <Boxes />
    }
  }

  return (
    <Card className="card text-center mt-3 md:mt-0">
      <div className="card-header" style={{fontSize: '16px'}} >
        <ul className="border-b" style={{textAlign:"left"}} >
          
          <li className="list-none" style={{width: '130px', display: 'inline-block'}}>
            <NavLink
              key={2}
              className="text-xs md:text-lg flex gap-2 p-2 justify-center"
              style={{backgroundColor: '#0D1A4E', color: '#ffffff', fontWeight: 'bold', ...getCustomActiveTab(2)}}
              onClick={() => onChangeCurrentTab(2)}
            >
              <Flex gridGap={1} alignItems="center">
                Hero
              </Flex>
            </NavLink>
          </li>
          <li className="list-none" style={{width: '130px', display: 'inline-block'}}>
            <NavLink
              key={0}
              className="nav-link text-xs md:text-lg flex gap-2 p-2 justify-center"
              style={{backgroundColor: '#0D1A4E', color: '#ffffff', fontWeight: 'bold', ...getCustomActiveTab(0)}}
              onClick={() => onChangeCurrentTab(0)}
            >
              <Flex gridGap={1} alignItems="center">
                Boxes
              </Flex>
            </NavLink>
          </li>
          {/* <li className="list-none text-xs" style={{width: '130px', display: 'inline-block'}}>
            <NavLink
              key={1}
              className="text-xs md:text-lg flex md:gap-2 p-2 justify-center"
              style={{backgroundColor: '#0D1A4E', color: '#ffffff', fontWeight: 'bold', ...getCustomActiveTab(1)}}
              onClick={() => onChangeCurrentTab(1)}
            >
              <Flex gridGap={1} alignItems="center">
                Weapon
              </Flex>
            </NavLink>
          </li> */}
        </ul>
      </div>
      <CardBody className="card-body">{renderBody()}</CardBody>
    </Card>
  )
}

// const CardItem = styled.div`
//   display: flex;
//   flex-direction: row;
//   margin-bottom: 15px;
//   justify-content: start;
//   font-weight: 800;
// `

const CardBody = styled.div`
  height: auto;
  position: relative;
`

const NavLink = styled.div`
  :hover {
    cursor: pointer;
    color: #0a58ca;
  }
`
const Card = styled.div`
  overflow: hidden;
`

export default MyAssetsInventory
