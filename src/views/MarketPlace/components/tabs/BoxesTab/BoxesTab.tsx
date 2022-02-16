import { useWeb3React } from '@web3-react/core'
import FilterIcon from 'assets/icons/Filter_big.svg'
import CheckBoxCustom from 'components/CheckboxCustom/CheckboxCustom'
import { Button, Text } from 'components/Pancake-uikit'
import SearchOption from 'components/SearchOption/SearchOption'
import useRefresh from 'hooks/useRefresh'
import useWindowSize from 'hooks/useWindowSize'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppState, useAppDispatch } from 'state'
import styled from 'styled-components'
import countFilter from 'utils/countFilter'
import { formatNumber } from 'utils/formatBalance'
import { fetchListBoxes, setParamSearchBox } from 'views/MarketPlace/marketplaceSlice'
import { BOXES_CHECKBOX, BOXES_FILTER } from './contants'
import MarketBox from './MarketBox'

const BoxesTab = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  const { fastRefresh } = useRefresh()
  const { filterBoxes, totalBox } = useSelector((state: AppState) => state.marketplace)
  const [currentLayout, setCurrentLayout] = useState(0)

  const { width } = useWindowSize()

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

  useEffect(() => {
    dispatch(fetchListBoxes(filterBoxes?.params))
  }, [dispatch, filterBoxes?.params, fastRefresh])

  const clearFilter = () => {
    const defaultParamFilterBoxes = {
      ...filterBoxes.params,
      boxTypes: [],
      page: 1,
      limit: 10,
    }
    dispatch(setParamSearchBox(defaultParamFilterBoxes))
  }

  const countAllFilter = () => {
    const compareObject = {
      boxTypes: [],
    }

    return countFilter(compareObject, filterBoxes.params)
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
      const filterParams = { ...filterBoxes.params }
      filterParams[key] = Array.isArray(value) ? value : value ?? undefined
      filterParams.page = 1
      filterParams.account = account
      // if (key === 'seller') filterParams.seller = value ? account : 0
      dispatch(setParamSearchBox(filterParams))
    },
    [dispatch, filterBoxes.params, account],
  )

  return (
    <Container>
      <ButtonFilter onClick={toggleFilterContainer}>Filter ({countAllFilter()})</ButtonFilter>

      <LeftContainer>
        <div className="flex flex-wrap justify-between px-5">
          <div className="flex">
            {/* <MenuWrap className="flex"> */}
            {/* <LayoutMenu
              className={`flex justify-center items-center ${currentLayout === 0 && 'active'}`}
              role="button"
              onClick={() => setCurrentLayout(0)}
            >
              <img src="./images/grid.png" alt="grid" />
            </LayoutMenu>
            <LayoutMenu
              className={`flex justify-center items-center ${currentLayout === 1 && 'active'}`}
              role="button"
              onClick={() => setCurrentLayout(1)}
            >
              <img src="./images/list.png" alt="list" />
            </LayoutMenu> */}
            {/* </MenuWrap> */}
            <Box>{ formatNumber(totalBox, 0) } Boxes</Box>
          </div>

          <SearchOption
            filter={BOXES_FILTER}
            onChange={handleChangeFilter}
            defaultValue={filterBoxes.params}
          />
        </div>
        <MarketBox currentLayout={currentLayout} />
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
            Filter {countAllFilter()}
          </TextFilter>
          <ClearFilter onClick={clearFilter}>Clear Filter</ClearFilter>
        </RightBlockHeader>
        {/* End of Right Header */}

        {/* Right Body */}
        {BOXES_CHECKBOX.map(({ label, value }) => (
          <WrapCheckboxCustom key={label} className="custom-checkbox">
            <h1>{label}</h1>
            <CheckBoxCustom
              list={value}
              onChange={handleChangeFilter}
              defaultValue={filterBoxes.params}
            />
          </WrapCheckboxCustom>
        ))}
        {/* End of Right Body */}
      </RightContainer>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 50px;
  border-radius: 20px;
  margin-top: 15px;
  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
  }
`

const WrapCheckboxCustom = styled.div`
  width: 100%;
  > h1 {
    font-size: 16px;
    line-height: 20px;
    color: #9e9e9e;
    // margin: 5px 0;
  }
  > div {
    padding: 10px;
    width: 100%;
    background: linear-gradient(180deg, #2a2a2a 0%, #262424 100%);
    border: 1px solid;
    border-image-source: linear-gradient(180deg, #464646 0%, rgba(224, 224, 224, 0) 100%);
    border-radius: 5px;
    margin: 10px 0px;
    > div {
      > div {
        padding: 5px;
      }
    }
  }
`

const LeftContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  border-radius: 8px;
`

const RightContainer = styled.div`
  background-color: #000;
  padding: 0 10px;
  border-radius: 8px;
  min-width: 300px;
  max-width: 300px;
  height: calc(100vh - 200px);
  overflow-y: scroll;
  position: relative;
  display: block;

  @media screen and (max-width: 768px) {
    display: none;
    max-width: 100%;
    height: auto;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`
const RightBlockHeader = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ClearFilter = styled(Button)`
  float: left;
  background: #3f3f3f;
  height: 40px;
  width: 100px;
  padding: 0 10px;

  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  color: #fff;

  border: 1px solid #424243;
  border-radius: 5px;
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

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: transparent;
  border-radius: 5px;

  width: 150px;
  height: 40px;
  font-weight: 400;
  font-size: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #ffc247;
`

export default BoxesTab
