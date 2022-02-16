import CheckBoxCustom from 'components/CheckboxCustom/CheckboxCustom'
import SliderCustom from 'components/SliderCustom/SliderCustom'
import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { AppState, useAppDispatch } from 'state'
import styled from 'styled-components'
import { setParamSearchHero } from 'views/MarketPlace/marketplaceSlice'
import { GENERAL_CHECKBOX, GENERAL_FILTER } from './constant'

const General = () => {
  const dispatch = useAppDispatch()
  const { paramFilterHero } = useSelector((state: AppState) => state.marketplace)
  const handleFilter = (key: string | number, value: any = undefined) => {
    const filterParams = JSON.parse(JSON.stringify(paramFilterHero))
    filterParams[key] = Array.isArray(value) ? value : value ?? undefined
    filterParams.page = 1
    dispatch(setParamSearchHero(filterParams))
  }
  return (
    <Container>
      {GENERAL_CHECKBOX.map(({ label, value, color }) => (
        <WrapCheckboxCustom key={label} className="custom-checkbox">
          <h1 style={{ color: `${color}` }}>{label}</h1>
          <CheckBoxCustom list={value} defaultValue={paramFilterHero} onChange={handleFilter} />
        </WrapCheckboxCustom>
      ))}
      <SliderCustom filter={GENERAL_FILTER} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`
const WrapCheckboxCustom = styled.div`
  width: 100%;
  > h1 {
    font-size: 16px;
    line-height: 20px;
    color: #9e9e9e;
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

export default memo(General)
