import React, {useState} from 'react'
import {Text} from 'components/Pancake-uikit'
import {Button} from '@pancakeswap/uikit'
import {useTranslation} from 'contexts/Localization'
import Select, {OptionProps} from 'components/Select/Select'
import SearchInput from 'components/SearchInput'
import styled from 'styled-components'
import Auction from './tabs/Auction'
import Market from './tabs/Market'

const GroupMenu = () => {
  const {t} = useTranslation()
  const [groupMenu, setGroupMenu] = useState(1)

  const handleChangeGroup = (id) => {
    setGroupMenu(id)
  }

  const renderTab = (props) => {
    switch (groupMenu) {
      case 1:
        return <Market {...props} />
        break
      case 2:
        return <Auction {...props} />
        break
      default:
        return <Text>Not Found</Text>
        break
    }
  }

  return (
    <>
      <StyleNavbar>
        <GroupButton>
          <Button
            onClick={() => {
              handleChangeGroup(1)
            }}
            style={groupMenu === 1 ? styleActive : {}}
            className="left-button"
            variant="text"
          >
            {t('Market')}
          </Button>
          <Button
            onClick={() => {
              handleChangeGroup(2)
            }}
            style={groupMenu === 2 ? styleActive : {}}
            className="right-button"
            variant="text"
          >
            {t('Auction')}
          </Button>
        </GroupButton>
        <OptionStyle>
          <Select
            options={[
              {
                label: t('All NFT'),
                value: 'all',
              },
              {
                label: t('Test'),
                value: 'test',
              },
            ]}
          />
          <Select
            options={[
              {
                label: t('Latest Bit'),
                value: 'latest',
              },
              {
                label: t('Highest ID'),
                value: 'highest_id',
              },
              {
                label: t('Lowest Price'),
                value: 'lowest_price',
              },
              {
                label: t('Highest Price'),
                value: 'highest_price',
              },
              {
                label: t('Lowest ID'),
                value: 'lowest_id',
              },
            ]}
          />
          <SearchInput onChange={() => console.log('a')} placeholder="Search NTFs" />
        </OptionStyle>
      </StyleNavbar>
      {renderTab(null)}
    </>
  )
}

const styleActive = {background: '#4072D3', color: '#fff'}

const GroupButton = styled.div`
  width: 350px;
  display: flex;
  border: 1px solid #e7e7eb;
  border-radius: 40px;
  background-color: #fff;
  overflow: hidden;
  @media screen and (max-width: 991px) {
    width: 100%;
  }
  > .left-button,
  .right-button {
    border-radius: 40px;
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

const StyleNavbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: #fff;
  border: 1px solid #e7e7eb;
  padding: 15px 30px;
  border-radius: 8px;
  > div {
    margin-bottom: 5px;
  }
`

const OptionStyle = styled.div`
  display: flex;
  input {
    margin-left: 10px;
  }
  @media screen and (max-width: 600px) {
    flex-direction: column;
    > * {
      width: 100%;
      margin-left: 0;
      margin-bottom: 10px;
    }
    input {
      margin-left: 0;
    }
  }
`

export default GroupMenu
