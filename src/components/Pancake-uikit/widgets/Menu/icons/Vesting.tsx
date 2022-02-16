import React from 'react'
import styled from 'styled-components'
import Svg from '../../../components/Svg/Svg'
import {SvgProps} from '../../../components/Svg/types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7184 12.163C16.0888 15.7634 12.9473 18.5 9.16661 18.5C4.93242 18.5 1.49994 15.0675 1.49994 10.8334C1.49994 7.00267 4.30941 3.82817 7.98025 3.25793C7.98562 3.48716 8.01364 3.74076 8.04342 4.01017C8.08683 4.40305 8.13397 4.82956 8.11996 5.26316C5.49035 5.75419 3.49994 8.06134 3.49994 10.8334C3.49994 13.963 6.03699 16.5 9.16661 16.5C11.7637 16.5 13.9527 14.7529 14.6225 12.3699C15.4049 12.4355 16.1412 12.3628 16.7184 12.163Z"
        fill="#030000"
      />
      <circle cx={8} cy={12} r={2} fill="#030000" />
      <path d="M11 4H13.2727C14.779 4 16 5.22104 16 6.72727V9" stroke="#030000" strokeWidth={2} />
      <path d="M15 5L11 9" stroke="#030000" strokeWidth={2} />
    </Svg>
  )
}

export default Icon
