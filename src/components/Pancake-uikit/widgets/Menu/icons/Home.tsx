import {Svg} from 'components/Pancake-uikit'
import React from 'react'
import styled from 'styled-components'
import {SvgProps} from '../../../components/Svg/types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width={20} height={15} viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.18179 14.6667V9.66667H11.8181V14.6667H16.3636V8H19.0909L9.99997 0.5L0.909058 8H3.63633V14.6667H8.18179Z"
        fill="#202224"
      />
    </Svg>
  )
}

export default Icon
