import React, {useState} from 'react'
import {Text} from 'components/Pancake-uikit'
import {Button} from '@pancakeswap/uikit'
import styled from 'styled-components'
import Genesis from './tabs/Genesis'
import Farms from './tabs/Farms'

const GroupMenu = () => {
  const [groupMenu, setGroupMenu] = useState(1)

  const handleChangeGroup = (id) => {
    setGroupMenu(id)
  }

  const renderTab = () => {
    switch (groupMenu) {
      case 1:
        return <Farms />
        break
      case 2:
        return <Genesis />
        break
      default:
        return <Text>Not Found</Text>
        break
    }
  }

  return (
    <>
      <GroupButtom>
        <Button
          onClick={() => {
            handleChangeGroup(1)
          }}
          style={groupMenu === 1 ? styleActive : {}}
          className="left-button"
          variant="text"
        >
          NFTs Farm
        </Button>
        <Button
          onClick={() => {
            handleChangeGroup(2)
          }}
          style={groupMenu === 2 ? styleActive : {}}
          className="right-button"
          variant="text"
        >
          Genesis NFT Farm
        </Button>
      </GroupButtom>
      {renderTab()}
    </>
  )
}

const styleActive = {background: '#4072D3', color: '#fff'}

const GroupButtom = styled.div`
  width: 350px;
  display: flex;
  margin: 0 auto;
  border-radius: 16px;
  background-color: #fff;
  overflow: hidden;
  @media screen and (max-width: 991px) {
    width: 100%;
  }
  > .left-button {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  > .right-button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  > .left-button,
  .right-button {
    flex: 1;
    font-size: 15px;
    font-weight: 400;
    color: #4072d3;
    background-color: #fff;
  }
`

export default GroupMenu
