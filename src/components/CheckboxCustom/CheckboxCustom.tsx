import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { debounce } from 'lodash'
import React, { memo, useEffect } from 'react'
import styled from 'styled-components'
import './checkboxCustom.scss'

interface Props {
  list: any
  onChange?: any
  defaultValue?: any
}

const CheckBoxCustom = ({ list, onChange, defaultValue }: Props) => {
  const emitChangeFilter = (key: string | number, value: any = undefined) => {
    onChange(key, value)
  }

  const handleChangeCheckbox = (name: string) => (value: any) => {
    emitChangeFilter(name, value)
  }

  const handleChangeRadio = (name: string, value: string) => (e) => {
    const { checked } = e.target
    const data = checked ? value : undefined
    emitChangeFilter(name, data)
  }

  const emitChangeDebounced = debounce(emitChangeFilter, 300)

  useEffect(() => {
    return () => {
      emitChangeDebounced.cancel()
    }
  }, [emitChangeDebounced])

  const renderContent = (content: any) => {
    switch (content.type) {
      case 'checkbox': {
        return (
          <CheckboxGroup
            colorScheme="orange"
            value={defaultValue[content.name]}
            onChange={handleChangeCheckbox(content.name)}
          >
            <Row>
              {content?.data.map(({ name, label, icon, color }) => (
                <Col key={name}>
                  <Checkbox
                    value={name}
                    sx={{
                      boxShadow: 'none',
                      borderColor: '#686868',
                      outline: 'none',
                      color: 'orange',
                    }}
                  >
                    <LabelText
                      style={{ color: `${color}` }}
                      className={defaultValue[content.name]?.includes(name) && 'checkbox-active'}
                    >
                      {/* {icon && (
                        <img
                          src={icon}
                          alt={icon}
                          className={
                            defaultValue[content.name]?.includes(name) && 'checkbox-active'
                          }
                          style={{
                            width: 20,
                            height: 20,
                            display: 'inline',
                            marginRight: 5,
                            verticalAlign: 'middle',
                          }}
                        />
                      )} */}
                      {label}
                    </LabelText>
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </CheckboxGroup>
        )
      }
      case 'radio': {
        return (
          <Row>
            {content?.data.map(({ label, name, icon, color }) => (
              <Col key={name}>
                <Checkbox
                  colorScheme="orange"
                  isChecked={defaultValue[content.name] === name}
                  onChange={handleChangeRadio(content.name, name)}
                  _focus={{ boxShadow: 'unset' }}
                  sx={{
                    borderColor: '#686868',
                    outline: 'orange',
                    color: 'red',
                  }}
                >
                  <LabelText
                    style={{ color: `${color}` }}
                    className={defaultValue[content.name] === name && 'checkbox-active'}
                  >
                    {icon && (
                      <img
                        src={icon}
                        alt={icon}
                        className={defaultValue[content.name] === name && 'checkbox-active'}
                        style={{
                          width: 20,
                          height: 20,
                          display: 'inline',
                          marginRight: 5,
                          verticalAlign: 'middle',
                        }}
                      />
                    )}
                    {label}
                  </LabelText>
                </Checkbox>
              </Col>
            ))}
          </Row>
        )
      }

      default:
        return null
    }
  }

  return <>{renderContent(list)}</>
}

const LabelText = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: #9e9e9e;
  flex: none;
  order: 2;
  flex-grow: 0;
`

const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
`
const Col = styled.div`
  flex 0 0 50%  
`

export default memo(CheckBoxCustom)
