import styled from 'styled-components'
import {ToggleProps, HandleProps, InputProps, ScaleKeys, scales} from './types'

const scaleKeyValues = {
  sm: {
    handleHeight: '10px',
    handleWidth: '10px',
    handleLeft: '2px',
    handleTop: '2px',
    checkedLeft: 'calc(100% - 14px)',
    toggleHeight: '15px',
    toggleWidth: '30px',
  },
  md: {
    handleHeight: '15px',
    handleWidth: '15px',
    handleLeft: '3px',
    handleTop: '3px',
    checkedLeft: 'calc(100% - 19px)',
    toggleHeight: '20px',
    toggleWidth: '45px',
  },
  lg: {
    handleHeight: '20px',
    handleWidth: '20px',
    handleLeft: '4px',
    handleTop: '4px',
    checkedLeft: 'calc(100% - 24px)',
    toggleHeight: '25px',
    toggleWidth: '60px',
  },
}

const getScale =
  (property: ScaleKeys) =>
  ({scale = scales.LG}: ToggleProps) => {
    return scaleKeyValues[scale][property]
  }

export const Handle = styled.div<HandleProps>`
  // background-color: ${({theme}) => theme.toggle.handleBackground};
  background-color: #fff;
  border-radius: 50%;
  cursor: pointer;
  left: ${getScale('handleLeft')};
  position: absolute;
  top: ${getScale('handleTop')};
  transition: left 200ms ease-in;
  height: ${getScale('handleHeight')};
  width: ${getScale('handleWidth')};
  z-index: 1;
`

export const Input = styled.input<InputProps>`
  cursor: pointer;
  opacity: 0;
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 3;

  &:checked + ${Handle} {
    left: ${getScale('checkedLeft')};
    background-color: ${({theme}) => theme.colors.primary};
  }

  &:focus + ${Handle} {
    //box-shadow: ${({theme}) => theme.shadows.focus};
  }

  &:hover + ${Handle}:not(:disabled):not(:checked) {
    //box-shadow: ${({theme}) => theme.shadows.focus};
  }
`

const StyledToggle = styled.div<ToggleProps>`
  align-items: center;
  background-color: #555557;
  // background-color: ${({theme, checked}) => theme.colors[checked ? 'input' : 'input']};
  border-radius: 24px;
  //box-shadow: ${({theme}) => theme.shadows.inset};
  cursor: pointer;
  display: inline-flex;
  height: ${getScale('toggleHeight')};
  position: relative;
  transition: background-color 200ms;
  width: ${getScale('toggleWidth')};
`

export default StyledToggle
