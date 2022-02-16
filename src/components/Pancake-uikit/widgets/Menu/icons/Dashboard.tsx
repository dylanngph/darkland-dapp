import React from 'react'
import Svg from '../../../components/Svg/Svg'
import { SvgProps } from '../../../components/Svg/types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg
      className="mx-5"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.125 15.25H10.875C14 15.25 15.25 14 15.25 10.875V7.125C15.25 4 14 2.75 10.875 2.75H7.125C4 2.75 2.75 4 2.75 7.125V10.875C2.75 14 4 15.25 7.125 15.25Z"
        stroke="#030000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.25 7.75H2.75"
        stroke="#030000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 7.75V15.25"
        stroke="#030000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Icon
