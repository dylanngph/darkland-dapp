import { Svg } from 'components/Pancake-uikit/components/Svg'
import React from 'react'
import styled from 'styled-components'
import {SvgProps} from '../../../components/Svg/types'

const StyleDiv = styled.div`
  padding-right: 5px;
`

const Icon: React.FC<SvgProps> = (_props) => {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {..._props}>
      <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 3.11 16.44 3.11 16.44M3.11 16.44H7.63M3.11 16.44V21.44M2 12C2 6.48 6.44 2 12 2C18.67 2 22 7.56 22 7.56M22 7.56V2.56M22 7.56H17.56" stroke="#01AAC4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  )
}

export default Icon
