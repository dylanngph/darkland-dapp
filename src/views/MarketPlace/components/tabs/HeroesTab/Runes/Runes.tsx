/* eslint-disable react/no-children-prop */
import { SearchIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import CheckBoxCustom from 'components/CheckboxCustom/CheckboxCustom'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { AppState, useAppDispatch } from 'state'
import styled from 'styled-components'
import { setParamSearchHero } from 'views/MarketPlace/marketplaceSlice'
import { RUNE_LIST } from './constant'

const Runes = () => {
  const dispatch = useAppDispatch()
  const { paramFilterHero } = useSelector((state: AppState) => state.marketplace)
  const [listRune, setListRune] = useState(RUNE_LIST)

  const handleFilter = (key: string | number, value: any = undefined) => {
    const filterParams = JSON.parse(JSON.stringify(paramFilterHero))
    filterParams[key] = Array.isArray(value) ? value : value ?? undefined
    filterParams.page = 1
    dispatch(setParamSearchHero(filterParams))
  }

  const handleChangeInput = (e) => {
    const { value } = e.target
    const newList = {
      ...RUNE_LIST,
      data: RUNE_LIST?.data.filter((item) =>
        item?.label.toLowerCase().includes(value.toLowerCase().trim()),
      ),
    }

    setListRune(newList)
  }
  return (
    <Container className="custom-checkbox">
      <InputGroup sx={{ margin: '0 auto' }}>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon sx={{ marginLeft: 5 }} color="gray.400" />}
        />
        <Input
          sx={{
            borderColor: 'rgba(151,151,151,0.69)',
            backgroundColor: '#272727',
            borderRadius: 5,
            padding: '0 35px',
          }}
          _hover={{ border: '1px solid rgba(151,151,151,0.69)' }}
          _focus={{ border: '1px solid rgba(151,151,151,0.69)' }}
          onChange={handleChangeInput}
          placeholder="Search Items"
        />
      </InputGroup>
      <WrapCheckBoxCustom>
        <CheckBoxCustom list={listRune} defaultValue={paramFilterHero} onChange={handleFilter} />
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
        // height: 40px !important;
        // width: 40px !important;
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
export default Runes
