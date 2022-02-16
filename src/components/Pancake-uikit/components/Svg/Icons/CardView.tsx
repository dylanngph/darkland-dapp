import React from 'react'
import Svg from '../Svg'
import {SvgProps} from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg style={{width: 18, height: 18}} viewBox="0 0 18 18" fill="currentColor" {...props}>
      <path d="M3.6 0H0V3.6H3.6V0Z" fill="currentColor" />
      <path d="M3.6 7.20001H0V10.8H3.6V7.20001Z" fill="currentColor" />
      <path d="M3.6 14.4H0V18H3.6V14.4Z" fill="currentColor" />
      <path d="M10.8002 0H7.2002V3.6H10.8002V0Z" fill="currentColor" />
      <path d="M10.8002 7.20001H7.2002V10.8H10.8002V7.20001Z" fill="currentColor" />
      <path d="M10.8002 14.4H7.2002V18H10.8002V14.4Z" fill="currentColor" />
      <path d="M17.9999 0H14.3999V3.6H17.9999V0Z" fill="currentColor" />
      <path d="M17.9999 7.20001H14.3999V10.8H17.9999V7.20001Z" fill="currentColor" />
      <path d="M17.9999 14.4H14.3999V18H17.9999V14.4Z" fill="currentColor" />
    </Svg>
  )
}

export default Icon
