/* eslint-disable react/no-children-prop */
// import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
// import React from 'react'
// import { useSelector } from 'react-redux'
// import { AppState, useAppDispatch } from 'state'
// import styled from 'styled-components'
// import { setParamSearchHero } from 'views/MarketPlace/marketplaceSlice'
// import { COMBO_ITEM_LIST } from '../constant'

// const ComboItem = () => {
//   const dispatch = useAppDispatch()
//   const { paramFilterHero } = useSelector((state: AppState) => state.marketplace)

//   const handleClick = (value) => {
//     const filterParams = { ...paramFilterHero }
//     const index = filterParams?.items?.findIndex((item) => item === value)
//     const newFilter = [...filterParams.items]
//     if (index === -1) {
//       newFilter.push(value)
//     } else {
//       newFilter.splice(index, 1)
//     }
//     filterParams.items = newFilter
//     dispatch(setParamSearchHero(filterParams))
//   }

//   const handleUnCheck = (e) => {
//     const { value } = e.target
//     const filterParams = { ...paramFilterHero }
//     filterParams.items = paramFilterHero.items.filter((item) => item !== value)
//     dispatch(setParamSearchHero(filterParams))
//   }

//   return (
//     <Container className="custom-checkbox">
//       <WrapItems>
//         {COMBO_ITEM_LIST.map(({ icon, name }) => (
//           <img
//             style={{
//               display: 'inline',
//               filter: `${
//                 paramFilterHero.items.includes(name) ? 'brightness(1.5)' : 'brightness(0.6)'
//               }`,
//             }}
//             src={icon}
//             alt={icon}
//             onClick={() => handleClick(name)}
//             aria-hidden="true"
//           />
//         ))}
//       </WrapItems>

//       {paramFilterHero.items.length > 0 && (
//         <WrapCheckBox>
//           <CheckboxGroup colorScheme="red" value={paramFilterHero.items}>
//             {paramFilterHero.items.map((item) => {
//               const find: any = COMBO_ITEM_LIST.find((it) => it.name === item)
//               if (!find) return null
//               return (
//                 <Row style={{ padding: 5 }}>
//                   <Checkbox value={item} onChange={handleUnCheck}>
//                     <img style={{ display: 'inline' }} src={find.icon} alt={find.icon} />
//                   </Checkbox>
//                 </Row>
//               )
//             })}
//           </CheckboxGroup>
//         </WrapCheckBox>
//       )}
//     </Container>
//   )
// }

// const Container = styled.div`
//   margin: 10px 0;
//   // width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   border-radius: 8px;
//   > img {
//     cursor: pointer;
//   }
// `
// const WrapItems = styled.div`
//   // margin: 10px auto;
//   // padding: 0 20px;
//   width: 100%;
//   border-radius: 8px;
//   > img {
//     cursor: pointer;
//   }
// `
// const WrapCheckBox = styled.div`
//   // margin: 10px auto;
//   // padding: 0 20px;
//   width: 100%;
//   display: flex;
//   flex-wrap: wrap;
//   gap: 20px;
//   border-radius: 8px;
//   > img {
//     cursor: pointer;
//   }
// `

// const Row = styled.div`
//   display: flex;
//   flex-flow: row wrap;
// `

// export default ComboItem

import { SearchIcon } from '@chakra-ui/icons'
import CheckBoxCustom from 'components/CheckboxCustom/CheckboxCustom'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { AppState, useAppDispatch } from 'state'
import styled from 'styled-components'
import { setParamSearchHero } from 'views/MarketPlace/marketplaceSlice'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { COMBO_ITEM_LIST } from '../constant'

const BasicItem = () => {
  const dispatch = useAppDispatch()
  const { paramFilterHero } = useSelector((state: AppState) => state.marketplace)
  const [listItem, setListItem] = useState(COMBO_ITEM_LIST)

  const handleFilter = (key: string | number, value: any = undefined) => {
    const filterParams = JSON.parse(JSON.stringify(paramFilterHero))
    filterParams[key] = Array.isArray(value) ? value : value ?? undefined
    filterParams.page = 1
    dispatch(setParamSearchHero(filterParams))
  }

  const handleChangeInput = (e) => {
    const { value } = e.target
    const newList = {
      ...COMBO_ITEM_LIST,
      data: COMBO_ITEM_LIST?.data.filter((item) =>
        item?.label.toLowerCase().includes(value.toLowerCase().trim()),
      ),
    }

    setListItem(newList)
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
          placeholder='Search Items'
        />
      </InputGroup>
      <WrapCheckBoxCustom>
        <CheckBoxCustom list={listItem} defaultValue={paramFilterHero} onChange={handleFilter} />
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

export default BasicItem
