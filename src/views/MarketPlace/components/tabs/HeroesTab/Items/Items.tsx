import { Button } from 'components/Pancake-uikit'
import React, { useState } from 'react'
import styled from 'styled-components'
import BasicItem from './BasicItem/BasicItem'
import ComboItem from './ComboItem/ComboItem'
import { BUTTON_LIST } from './constant'

const Items = () => {
  const [groupItem, setGroupItem] = useState(BUTTON_LIST[0])

  const handleChangeGroup = (id: string) => {
    setGroupItem(id)
  }

  const renderGroupFilter = () => {
    const tabs = {
      Basic: <BasicItem />,
      Combo: <ComboItem />,
    }
    return tabs[groupItem]
  }

  const renderGroupFilterButton = () => (
    <GroupButton>
      {BUTTON_LIST?.map((item) => {
        return (
          <ColorButton
            key={item}
            onClick={() => {
              handleChangeGroup(item)
            }}
            style={groupItem === item ? styleActive : styleUnActive}
            className="left-button"
          >
            <span>{item}</span>
          </ColorButton>
        )
      })}
    </GroupButton>
  )

  return (
    <Container>
      {renderGroupFilterButton()}
      {renderGroupFilter()}
    </Container>
  )
}

const styleActive = { background: '#FFC247' }
const styleUnActive = { background: '#2c2a2a' }

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  border-radius: 20px;
  width: 100%;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

const GroupButton = styled.div`
  width: 100%;
  display: flex;
  border-radius: 5px;
  background-color: #2c2a2a;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  height: 30px;
  // @media screen and (max-width: 991px) {
  //   width: 100%;
  // }
  // > .left-button,
  // .right-button {
  //   border-radius: 40px;
  // }
  // > .left-button,
  // .right-button {
  //   flex: 1;
  //   font-size: 15px;
  //   font-weight: 400;
  //   color: #4072d3;
  //   background-color: #fff;
  // }
`

const ColorButton = styled(Button)`
  padding: 0 16px;
  border-radius: 5px;
  width: 50%;
  margin: 0 auto;
  color: #fff;
  height: 30px;
  font-size: 14px;
  font-weight: 500;
  line-height: 19px;
`

export default Items
