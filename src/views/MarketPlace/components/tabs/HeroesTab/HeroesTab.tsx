/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react-hooks/exhaustive-deps */
import { useWeb3React } from '@web3-react/core'
import FilterIcon from 'assets/icons/Filter_big.svg'
import AutoCompleteCustom from 'components/AutoCompleteCustom/AutoCompleteCustom'
import { Button, Text } from 'components/Pancake-uikit'
import SearchOption from 'components/SearchOption/SearchOption'
import { useTranslation } from 'contexts/Localization'
import useWindowSize from 'hooks/useWindowSize'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppState, useAppDispatch } from 'state'
import styled from 'styled-components'
import countFilter from 'utils/countFilter'
import { setParamSearchHero } from 'views/MarketPlace/marketplaceSlice'
import { GROUP_FILTER, MARKET_FILTER } from '../../../constant'
import General from './General/General'
import Items from './Items/Items'
import MarketHeros from './MarketHeros'
import Runes from './Runes/Runes'

const HeroesTab = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  const { heroConfig } = useSelector((state: AppState) => state.common)
  const { paramFilterHero, pagination } = useSelector((state: AppState) => state.marketplace)

  const { t } = useTranslation()
  const { width } = useWindowSize()
  const [groupFilter, setGroupMenu] = useState(GROUP_FILTER[0])
  const [currentLayout, setCurrentLayout] = useState(0)
  // const [filter, setFilter] = useState(MARKET_FILTER)

  useEffect(() => {
    const elTarget = document.getElementById('filter-container')
    if (!elTarget) return null

    if (width > 768 && elTarget.style.display === 'none') {
      elTarget.style.display = 'block'
    }
    if (width < 768 && elTarget.style.display === 'block') {
      elTarget.style.display = 'none'
    }
    return null
  }, [width])

  // useEffect(() => {
  //   const initialValue = () => {
  //     const newFilter = [...filter]
  //     const index = newFilter?.findIndex((item) => item.name === 'heroId')

  //     if (index !== -1) {
  //       newFilter[index].options = heroConfig?.map((item: { _id: any; name: any }) => {
  //         return {
  //           key: item?._id,
  //           label: item?.name,
  //         }
  //       })
  //     }
  //     console.log(newFilter[index])
  //     setFilter(newFilter)
  //   }
  //   initialValue()
  // }, [heroConfig])

  const handleChangeGroup = (id: string) => {
    setGroupMenu(id)
  }

  const renderGroupFilter = useCallback(() => {
    const tabs = {
      General: <General />,
      Item: <Items />,
      Runes: <Runes />,
    }
    return tabs[groupFilter] || <Text>Not Found</Text>
  }, [groupFilter])

  const countGeneral = () => {
    const compareObject = {
      heroClasses: [],
      heroOrigins: [],
      maxFusisionTime: 7,
      heroGen: undefined,
      targetFilters: [],
      status: [],
    }
    return countFilter(compareObject, paramFilterHero)
  }

  const renderGroupFilterButton = () => (
    <GroupButton>
      {GROUP_FILTER.map((btn) => {
        const countTabFilter = () => {
          switch (btn) {
            case GROUP_FILTER[1]:
              return paramFilterHero?.items?.length
            case GROUP_FILTER[2]:
              return paramFilterHero?.runes?.length
            default:
              return countGeneral()
          }
        }
        return (
          <ColorButton
            key={btn}
            onClick={() => {
              handleChangeGroup(btn)
            }}
            style={groupFilter === btn ? styleActive : styleUnActive}
            className="left-button"
          >
            {t(btn)} {countTabFilter() > 0 && `(${countTabFilter()})`}
          </ColorButton>
        )
      })}
    </GroupButton>
  )

  const clearFilter = () => {
    const defaultParamFilterHero = {
      ...paramFilterHero,
      // name: undefined,
      items: [],
      heroClasses: [],
      heroOrigins: [],
      maxFusisionTime: 7,
      minFusionTime: 0,
      runes: [],
      heroGen: undefined,
      targetFilters: [],
      status: [],
      page: 1,
      limit: 15,
    }
    dispatch(setParamSearchHero(defaultParamFilterHero))
  }

  const countAllFilter = () => {
    const compareObject = {
      items: [],
      heroClasses: [],
      heroOrigins: [],
      maxFusisionTime: 7,
      runes: [],
      heroGen: undefined,
      targetFilters: [],
      status: [],
    }
    return countFilter(compareObject, paramFilterHero)
  }

  const toggleFilterContainer = () => {
    const elTarget = document.getElementById('filter-container')
    if (elTarget.style.display === 'none' || !elTarget.style.display) {
      elTarget.style.display = 'block'
    } else {
      elTarget.style.display = 'none'
    }
    return null
  }

  const handleChangeFilter = useCallback(
    (key: string | number, value: any = undefined) => {
      const filterParams = { ...paramFilterHero }
      filterParams[key] = Array.isArray(value) ? value : value ?? undefined
      filterParams.page = 1
      filterParams.account = account
      // filterParams.seller = value === 1 ? account : 0
      dispatch(setParamSearchHero(filterParams))
    },
    [dispatch, paramFilterHero, account],
  )

  return (
    <Container>
      <ButtonFilter onClick={toggleFilterContainer}>Filter ({countAllFilter()})</ButtonFilter>

      <LeftContainer>
        <WrapHeader>
          <div className="flex">
            <LayoutMenu
              className={`flex justify-center items-center ${currentLayout === 0 && 'active'}`}
              role="button"
              onClick={() => setCurrentLayout(0)}
            >
              <img src="../images/grid.png" alt="grid" />
            </LayoutMenu>
            <LayoutMenu
              className={`flex justify-center items-center ${currentLayout === 1 && 'active'}`}
              role="button"
              onClick={() => setCurrentLayout(1)}
            >
              <img src="../images/list.png" alt="list" />
            </LayoutMenu>
            <Box>{pagination.total} Heroes</Box>
          </div>
          <WrapSearch>
            <AutoCompleteCustom
              handleOnChange={handleChangeFilter}
              defaultValue={paramFilterHero}
            />
            <SearchOption
              filter={MARKET_FILTER}
              onChange={handleChangeFilter}
              defaultValue={paramFilterHero}
            />
          </WrapSearch>
        </WrapHeader>
        <MarketHeros currentLayout={currentLayout} />
      </LeftContainer>

      <RightContainer id="filter-container">
        {/* Right Header */}
        <RightBlockHeader>
          <TextFilter>
            <img
              style={{ display: 'inline', verticalAlign: 'middle' }}
              src={FilterIcon}
              alt={FilterIcon}
            />
            Filter ({countAllFilter()})
          </TextFilter>

          <ClearFilter onClick={clearFilter}>Clear Filter</ClearFilter>
        </RightBlockHeader>
        {renderGroupFilterButton()}
        {/* End of Right Header */}

        {/* Right Body */}
        <OptionStyle>{renderGroupFilter()}</OptionStyle>
        {/* End of Right Body */}
      </RightContainer>
    </Container>
  )
}

const styleActive = { background: 'linear-gradient(270deg, #fd476a 0%, #e03d44 100%)' }
const styleUnActive = { background: '#2c2a2a' }

const MenuWrap = styled.div`
  background: #272727;
  border: 1px solid #464646;
  box-sizing: border-box;
  border-radius: 5px;
`

const LayoutMenu = styled.div`
  height: 40px;
  color: #fff;
  border: 1px solid #464646;
  position: relative;
  top: 0;
  border-radius: 0;
  padding: 10px;
  > img {
    width: 18px;
    height: 18px;
  }
  &:hover {
    background-color: #f08800;
  }
  &.active {
    background-color: #bd6b00;
    &:hover {
      background-color: #f08800;
    }
  }
`

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 50px;
  border-radius: 20px;
  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
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
  margin-bottom: 15px;
  height: 40px;
`

const ColorButton = styled(Button)`
  padding: 0 16px;
  border-radius: 5px;
  width: 33%;
  margin: 0 auto;
  color: #fff;
  height: 40px;
  font-size: 14px;
  font-weight: 500;
  line-height: 19px;
`

const LeftContainer = styled.div`
  margin-top: 15px;
  width: 100%;
  border-radius: 8px;
`

const RightContainer = styled.div`
  background-color: #000;
  padding: 0 10px;
  border-radius: 8px;
  min-width: 340px;
  max-width: 340px;
  height: calc(100vh - 80px);
  overflow-y: scroll;
  position: relative;
  display: block;

  @media screen and (max-width: 768px) {
    display: none;
    max-width: 100%;
    height: 300px;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`
const RightBlockHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const OptionStyle = styled.div`
  display: flex;
  width: 100%;
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

const ClearFilter = styled(Button)`
  float: left;
  background: transparent;

  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;
  color: #9e9e9e;
`

const TextFilter = styled(Text)`
  font-size: 16px;
  color: #fff;
`
const ButtonFilter = styled(Button)`
  position: absolute;
  top: -120px;
  right: 0;
  height: 40px;
  background: linear-gradient(270deg, #fd476a 0%, #e03d44 100%);
  padding: 0 8px;
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
`
const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: transparent;
  border-radius: 5px;
  margin-left: 10px;

  width: 150px;
  height: 40px;
  font-weight: 400;
  font-size: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #ffc247;
`
const WrapHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 10px;
  @media screen and (max-width: 1180px) {
    // justify-content: center;
    margin-top: 5px;
  }
`
const WrapSearch = styled.div`
  // width: calc(100% - 240px);
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
  @media screen and (max-width: 992px) {
    // justify-content: center;
    margin-top: 5px;
  }
`
export default HeroesTab
