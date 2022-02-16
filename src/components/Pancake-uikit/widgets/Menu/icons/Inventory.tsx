import React from 'react'
import Svg from '../../../components/Svg/Svg'
import {SvgProps} from '../../../components/Svg/types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg className='mx-5' width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="2.5" y="2.5" width="5.83333" height="5.83333" rx={1} stroke="#030000" strokeWidth="1.46" strokeLinecap="round" />
      <rect x="2.5" y="11.6665" width="5.83333" height="5.83333" rx={1} stroke="#030000" strokeWidth="1.46" strokeLinecap="round" />
      <rect x="11.6667" y="2.5" width="5.83333" height="5.83333" rx={1} stroke="#030000" strokeWidth="1.46" strokeLinecap="round" />
      <rect x="11.6667" y="11.6665" width="5.83333" height="5.83333" rx={1} stroke="#030000" strokeWidth="1.46" strokeLinecap="round" />
  </Svg>
  
  )
}

export default Icon
