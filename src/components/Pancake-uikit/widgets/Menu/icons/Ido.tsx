import React from 'react'
import styled from 'styled-components'
import Svg from '../../../components/Svg/Svg'
import {SvgProps} from '../../../components/Svg/types'

const StyleDiv = styled.div`
  padding-right: 5px;
`

const Icon: React.FC<SvgProps> = (_props) => {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3.33337" y="3.33337" width="13.3333" height="4.16667" rx="0.621951" stroke="#030000" strokeWidth="1.5" />
      <path
        d="M3.33337 13.7439C3.33337 13.1575 3.33337 12.8643 3.51554 12.6822C3.6977 12.5 3.9909 12.5 4.57728 12.5H7.50004V15.4228C7.50004 16.0091 7.50004 16.3023 7.31788 16.4845C7.13571 16.6667 6.84252 16.6667 6.25614 16.6667H4.57728C3.9909 16.6667 3.6977 16.6667 3.51554 16.4845C3.33337 16.3023 3.33337 16.0091 3.33337 15.4228V13.7439Z"
        stroke="#030000"
        strokeWidth="1.5"
      />
      <path
        d="M12.5 12.5H15.4228C16.0091 12.5 16.3023 12.5 16.4845 12.6822C16.6667 12.8643 16.6667 13.1575 16.6667 13.7439V15.4228C16.6667 16.0091 16.6667 16.3023 16.4845 16.4845C16.3023 16.6667 16.0091 16.6667 15.4228 16.6667H13.7439C13.1575 16.6667 12.8643 16.6667 12.6822 16.4845C12.5 16.3023 12.5 16.0091 12.5 15.4228V12.5Z"
        stroke="#030000"
        strokeWidth="1.5"
      />
    </Svg>
  )
}

export default Icon
