import React from 'react'
import styled from 'styled-components'
import {SvgProps} from '../../../components/Svg/types'

const StyleDiv = styled.div`
  padding-right: 5px;
`

const Icon: React.FC<SvgProps> = (_props) => {
  return (
    <StyleDiv>
      <svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14.25 1.5H3.75C2.925 1.5 2.25 2.175 2.25 3V13.5C2.25 14.325 2.925 15 3.75 15H6.75L9 17.25L11.25 15H14.25C15.075 15 15.75 14.325 15.75 13.5V3C15.75 2.175 15.075 1.5 14.25 1.5ZM14.25 13.5H10.6275L10.185 13.9425L9 15.1275L7.8075 13.935L7.3725 13.5H3.75V3H14.25V13.5ZM9 12.75L10.41 9.66L13.5 8.25L10.41 6.84L9 3.75L7.59 6.84L4.5 8.25L7.59 9.66L9 12.75Z"
          fill="black"
        />
      </svg>
    </StyleDiv>
  )
}

export default Icon
