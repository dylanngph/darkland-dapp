import CheckBoxCustom from 'components/CheckboxCustom/CheckboxCustom'
import React from 'react'
import { useSelector } from 'react-redux'
import { AppState, useAppDispatch } from 'state'
import styled from 'styled-components'
import { setParamSearchHero } from 'views/MarketPlace/marketplaceSlice'
import { BASIC_ITEM_LIST } from '../constant'

const BasicItem = () => {
  const dispatch = useAppDispatch()
  const { paramFilterHero } = useSelector((state: AppState) => state.marketplace)
  const handleFilter = (key: string | number, value: any = undefined) => {
    const filterParams = JSON.parse(JSON.stringify(paramFilterHero))
    filterParams[key] = Array.isArray(value) ? value : value ?? undefined
    filterParams.page = 1
    dispatch(setParamSearchHero(filterParams))
  }
  return (
    <Container className="custom-checkbox">
      <WrapCheckBoxCustom>
        <CheckBoxCustom
          list={BASIC_ITEM_LIST}
          defaultValue={paramFilterHero}
          onChange={handleFilter}
        />
      </WrapCheckBoxCustom>
    </Container>
  )
}

const Container = styled.div`
  // margin: 10px 0;
  margin-bottom: 10px;
  width: 100%;
  border-radius: 8px;
`
const WrapCheckBoxCustom = styled.div`
  > div {
    margin: 5px 10px;
    img {
      height: 30px !important;
      width: 30px !important;
      vertical-align: middle;
      margin: 10px 0;
    }
  }
  @media screen and (min-width: 768px) {
    > div {
      display: block !important;
      margin: 5px 20px;
      img {
        // height: 30px !important;
        // width: 30px !important;
        vertical-align: middle;
        // margin: 10px 0;
      }
    }
  }
  @media screen and (max-width: 425px) {
    > div {
      display: block !important;
      margin: 0 30px;

      img {
        height: 30px !important;
        width: 30px !important;
        vertical-align: middle;
        margin: 5px 0;
      }
    }
  }
`

export default BasicItem
