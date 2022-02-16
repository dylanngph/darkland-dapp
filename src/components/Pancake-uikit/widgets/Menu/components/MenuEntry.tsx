import React from 'react'
import styled, {DefaultTheme, keyframes} from 'styled-components'
import {MENU_ENTRY_HEIGHT} from '../config'

export interface Props {
  secondary?: boolean
  isActive?: boolean
  theme: DefaultTheme
  isPushed?: boolean
}

const rainbowAnimation = keyframes`
  0%,
  100% {
    background-position: 0 0;
  }
  50% {
    background-position: 100% 0;
  }
`

const LinkLabel = styled.div<{isPushed: boolean}>`
  color: ${({isPushed, theme }) => !isPushed && 'transparent'};
  transition: color 0.4s;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.3px;
  flex-grow: 1;
`

/*
margin-left: ${({ isPushed }) => {
    return isPushed ? '15px' : '0px'
  }};
  margin-right: ${({ isPushed }) => {
    return isPushed ? '15px' : '0px'
  }};
*/
const MenuEntry = styled.div<Props>`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: ${MENU_ENTRY_HEIGHT}px;
  font-size: ${({secondary}) => (secondary ? '16px' : '18px')};
  // background-color: ${({isActive}) => (isActive ? '#464646' : 'transparent')};
  color: ${({isActive, theme}) => (isActive ? '#fff' : theme.colors.text)};
  opacity: ${({isActive}) => (isActive ? 1 : '0.9')};
  padding: 0 20px;

  &:hover {
    opacity: 1;
  }

  position: relative;
  a {
    display: flex;
    align-items: center;
    width: 100%;
    font-size: 12px;
    height: 100%;
    color: ${({isActive, theme}) => {
      if (isActive) return '#E6AB58'
      // if (theme.isDark) return theme.colors.text
      return '#fff'
    }};
  }

  svg {
    margin-right: 18px;
    filter: ${({isActive, theme}) => {
      if (isActive) return 'invert(99%) sepia(19%) saturate(125%) hue-rotate(82deg) brightness(119%) contrast(100%);'
      if (theme.isDark) return 'invert(99%) sepia(19%) saturate(125%) hue-rotate(82deg) brightness(60%) contrast(100%);'
      return 'invert(40%) sepia(94%) saturate(1752%) hue-rotate(329deg) brightness(90%) contrast(101%)'
    }};
  }

  // &::before {
  //   content: '';
  //   position: absolute;
  //   left: 0;
  //   height: 100%;
  //   width: 5px;
  //   background-color: ${({isActive, theme}) => ((isActive) ? theme.colors.primary : 'transparent')};
  // }

  // Safari fix
  flex-shrink: 0;

  &.rainbow {
    background-clip: text;
    animation: ${rainbowAnimation} 3s ease-in-out infinite;
    background: ${({theme}) => theme.colors.gradients.bubblegum};
    background-size: 400% 100%;
  }
`
MenuEntry.defaultProps = {
  secondary: false,
  isActive: false,
  role: 'button',
}

const LinkLabelMemo = React.memo(LinkLabel, (prev, next) => prev.isPushed === next.isPushed)

export {MenuEntry, LinkLabelMemo as LinkLabel}
