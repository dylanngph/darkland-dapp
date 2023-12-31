import {Text} from 'components/Pancake-uikit'
import React, {useEffect, useRef} from 'react'
import {useCountUp} from 'react-countup'
import styled from 'styled-components'

export interface CardValueProps {
  value: number
  decimals?: number
  fontSize?: string
  lineHeight?: string
  prefix?: string
  bold?: boolean
  color?: string
  fontWeight?: number
  isMoney?: boolean
}

const CardValue: React.FC<CardValueProps> = ({
  value,
  decimals,
  fontSize = '26px',
  lineHeight = '1',
  fontWeight = 800,
  prefix = '',
  bold = true,
  color = 'text',
  isMoney = false,
}) => {
  const {countUp, update} = useCountUp({
    start: 0,
    end: value,
    duration: 1,
    separator: ',',
    decimals:
      // eslint-disable-next-line no-nested-ternary
      decimals !== undefined ? decimals : value < 0 ? 4 : value > 1e5 ? 0 : 3,
  })

  const updateValue = useRef(update)

  useEffect(() => {
    updateValue.current(value)
  }, [value, updateValue])

  return (
    <Text bold={bold} fontSize={fontSize} style={{lineHeight, fontWeight}} color={color}>
      {isMoney ? '$' : null}
      {prefix}
      {countUp}
    </Text>
  )
}

export default CardValue
