/* eslint-disable react/no-children-prop */
import { SearchIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { debounce } from 'lodash'
import React, { memo, useEffect } from 'react'
import Select from 'react-select'
import styled from 'styled-components'
import './searchOption.scss'

interface Props {
  filter: any
  onChange?: any
  defaultValue: any
}

const SearchOption = ({ filter, onChange, defaultValue }: Props) => {
  const emitChangeFilter = (key: any, value: any = undefined) => {
    onChange(key, value)
  }

  const emitChangeDebounced = debounce(emitChangeFilter, 300)

  useEffect(() => {
    return () => {
      emitChangeDebounced.cancel()
    }
  }, [emitChangeDebounced])

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    emitChangeDebounced(name, value)
  }

  const handleChangeSelect = (name: string) => (value:any =undefined) => {
    emitChangeDebounced(name, value?.value)
  }

  return (
    <div className="search-wapper">
      {filter && filter.length > 0 && (
        <Container>
          {filter.map((item) => {
            switch (item.type) {
              case 'select':
                return (
                  <WrapSelect key={item.name}>
                    <Select
                      {...item}
                      name={item.name}
                      styles={{
                        menuList: (provided) => ({
                          ...provided,
                          padding: 0,
                          borderRadius: 4,
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          background: '#091749',
                          color: state.isSelected ? '#fff' : '#9e9e9e',
                        }),
                        control: (provided) => ({
                          ...provided,
                          border: '1px solid #00BFD5',
                          background: '#091749',
                          color: '#fff',
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          color: '#fff',
                        }),
                        input: (provided) => ({
                          ...provided,
                          color: '#fff',
                        }),
                      }}
                      onChange={handleChangeSelect(item.name)}
                      defaultValue={item?.options?.filter(
                        (op) => op.key === defaultValue[item.name]
                      )}
                      options={item?.options?.map(({ label, key }) => {
                        return {
                          label,
                          value: key,
                        }
                      })}
                      aria-multiselectable={false}
                    />
                  </WrapSelect>
                )
              case 'input': {
                return (
                  <WrapInput key={item.name} className="form-item">
                    <InputGroup sx={{ margin: '0 auto' }}>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<SearchIcon color="gray.400" />}
                      />
                      <Input
                        {...item}
                        type={item.isNumber ? 'number' : 'text'}
                        defaultValue={defaultValue[item.name] || item.defaultValue}
                        sx={{
                          borderColor: '#00BFD5',
                          backgroundColor: '#091749',
                          borderRadius: 5,
                          padding: '0 35px',
                        }}
                        _hover={{ border: '1px solid #00BFD5' }}
                        _focus={{ border: '1px solid #00BFD5' }}
                        onChange={handleChangeInput}
                        readOnly
                      />
                    </InputGroup>
                  </WrapInput>
                )
              }
              default:
                return null
            }
          })}
        </Container>
      )}
    </div>
  )
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
  // @media screen and (max-width: 839px) {
  //   justify-content: center;
  // }
  // @media screen and (max-width: 768px) {
  //   justify-content: center;
  // }
`

const WrapSelect = styled.div`
  width: 150px;
  > div {
    > div {
      > div {
        font-size: 14px;
      }
    }
  }
`
const WrapInput = styled.div`
  width: 150px;

  > div {
    > Input {
      font-size: 14px;
      ::placeholder {
        font-size: 14px;
      }
    }
  }
`

export default memo(SearchOption)
