import React from 'react'
import styled from 'styled-components'
import Svg from '../../../components/Svg/Svg'
import {SvgProps} from '../../../components/Svg/types'

const StyleDiv = styled.div`
  padding-right: 7px;
`
const Icon: React.FC<SvgProps> = (props) => {
  return (
    <StyleDiv>
      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9.99994" cy="10.5" r="7.5" stroke="#030000" strokeWidth={2} />
        <path
          d="M10.4166 6.7487C10.4166 6.97882 10.23 7.16537 9.99992 7.16537C9.7698 7.16537 9.58325 6.97882 9.58325 6.7487C9.58325 6.51858 9.7698 6.33203 9.99992 6.33203C10.23 6.33203 10.4166 6.51858 10.4166 6.7487Z"
          fill="#030000"
          stroke="#030000"
        />
        <path d="M9.99994 14.6654V8.83203" stroke="#030000" strokeWidth={2} />
      </svg>
    </StyleDiv>
  )
}

export default Icon
