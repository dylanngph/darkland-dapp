import React from 'react'
import styled from 'styled-components'
import {Svg} from 'components/Pancake-uikit'
import {SvgProps} from '../../../components/Svg/types'

const StyleDiv = styled.div`
  padding-right: 5px;
`
const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18.3333 7.08366C18.3333 10.0753 15.9083 12.5003 12.9166 12.5003C12.7749 12.5003 12.6249 12.492 12.4833 12.4837C12.2749 9.842 10.1583 7.72532 7.5166 7.51698C7.50826 7.37532 7.49994 7.22533 7.49994 7.08366C7.49994 4.09199 9.92494 1.66699 12.9166 1.66699C15.9083 1.66699 18.3333 4.09199 18.3333 7.08366Z"
        stroke="#030000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 12.9167C12.5 15.9083 10.075 18.3333 7.08329 18.3333C4.09163 18.3333 1.66663 15.9083 1.66663 12.9167C1.66663 9.925 4.09163 7.5 7.08329 7.5C7.22496 7.5 7.37495 7.50832 7.51662 7.51666C10.1583 7.72499 12.275 9.84168 12.4833 12.4833C12.4916 12.625 12.5 12.775 12.5 12.9167Z"
        stroke="#030000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.34993 12.183L7.08327 10.833L7.81661 12.183L9.16661 12.9163L7.81661 13.6497L7.08327 14.9997L6.34993 13.6497L4.99994 12.9163L6.34993 12.183Z"
        stroke="#030000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Icon
