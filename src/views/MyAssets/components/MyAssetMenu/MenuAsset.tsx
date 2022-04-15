import React from 'react'
import styled from 'styled-components'
import './menuAsset.modules.scss'

enum MyAssetMenuTab {
  WALLET = 0,
  INVENTORY = 1,
  FUSION = 2,
  SETTINGS = 3,
  ACTIVITIES = 4,
  QR_CODE = 5
}

const myAssetMenuItems = [
  {
    id: MyAssetMenuTab.INVENTORY,
    title: 'Inventory',
    imgIcon: 'inventory-icon.svg',
  },
  {
    id: MyAssetMenuTab.WALLET,
    title: 'Wallet',
    imgIcon: 'wallet-minus.svg',
  },
  // {
  //   id: MyAssetMenuTab.SETTINGS,
  //   title: 'Settings',
  //   imgIcon: 'settings-icon.svg',
  // },
  // {
  //   id: MyAssetMenuTab.ACTIVITIES,
  //   title: 'Activities',
  //   imgIcon: 'QR-code-icon.svg',
  // },
  // {
  //   id: MyAssetMenuTab.QR_CODE,
  //   title: 'QR Code',
  //   imgIcon: 'QR-code-icon.svg',
  // },
]

const MenuAsset = ({setCurrentAssetMenuTab, currentAssetMenuTab}) => {
  return (
    <div>
      {myAssetMenuItems.map((item) => (
        <MenuItem
          key={item.id}
          myAssetMenuItem={item}
          isCurrentMenuTab={currentAssetMenuTab === item.id}
          setCurrentAssetMenuTab={setCurrentAssetMenuTab}
        />
      ))}
    </div>
  )
}

const MenuItem = ({myAssetMenuItem, isCurrentMenuTab, setCurrentAssetMenuTab}) => {
  return (
    <Card
      className={`flex flex-row flex-wrap py-4 px-6 items-center gap-2 ${isCurrentMenuTab ? 'active' : ''}`}
      role="button"
      tabIndex={0}
      onClick={() => setCurrentAssetMenuTab(myAssetMenuItem.id)}
      onKeyDown={(e) => setCurrentAssetMenuTab(myAssetMenuItem.id)}
    >
      <div key={myAssetMenuItem.id} className="">
        <CardIcon className="flex justify-center">
          <img
            className={isCurrentMenuTab && 'currentMenuTab'}
            src={`../images/blindbox/${myAssetMenuItem.imgIcon}`}
            alt="account-info"
            style={{width: "20px", height: "fit-content"}}
          />
        </CardIcon>
      </div>
      <div className="font-bold">
        <Text className={`${isCurrentMenuTab && 'currentMenuTabText'}`}>{myAssetMenuItem.title}</Text>
      </div>
    </Card>
  )
}

// const ChangeAvatarIcon = styled.img`
//   position: absolute;
//   bottom: 0;
//   right: 10px;
// `

const CardIcon = styled.div`

`

const Card = styled.div`
  &.active {
    background-color: #2647CB;
    color: #ffffff;
  }
`

// const AccountDetails = styled.div`
//   margin-top: 20px;
//   font-size: 14px;
// `

// const Card = styled.div`
//   width: 239px;
//   height: 383px;
//   background: #0f0f0f;
//   border: 1px solid #535353;
//   box-sizing: border-box;
//   border-radius: 10px;
// `

// const Block = styled.div`
//   margin-top: 44px;
//   margin-bottom: 33px;
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap;
// `

const Text = styled.div`
  font-size: 14px;
  color: #6c6c6c;
`

// const TextAddress = styled(Text)`
//   margin-top: 20px;
//   font-size: 12px;
//   color: #a0a0a0;
//   text-align: center;
// `

export default MenuAsset
