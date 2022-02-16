import React from 'react'
import styled from 'styled-components'
import PanelBody from './PanelBody'
import PanelFooter from './PanelFooter'
import { SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL, MENU_HEIGHT } from '../config'
import { PanelProps, PushedProps } from '../types'
import Flex from '../../../components/Box/Flex'
import MenuButton from './MenuButton'
import {HamburgerIcon, HamburgerCloseIcon, LogoIcon as LogoWithText} from '../icons'

interface Props extends PanelProps, PushedProps {
  showMenu: boolean
  isMobile: boolean
}

const StyledPanel = styled.div<{isPushed: boolean; showMenu: boolean}>`
  border-radius: 14px;
  // border-top-left-radius: 0px;
  // border-bottom-left-radius: 0px;

  padding: 15px 0;
  margin-left 8px;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  background-color: ${({theme}) => theme.colors.backgroundMenu};
  width: ${SIDEBAR_WIDTH_FULL}px;
  height: 100%;
  transition: padding-top 0.2s, width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border-right: ${({ isPushed }) => (isPushed ? '2px solid rgba(133, 133, 133, 0.1)' : 0)};
  z-index: 11;
  overflow: ${({ isPushed }) => (isPushed ? 'initial' : 'hidden')};
  ${({ isPushed }) => !isPushed && 'white-space: nowrap;'};

  ${({theme}) => theme.mediaQueries.nav} {
    border-right: 2px solid rgba(133, 133, 133, 0.1);
    width: ${({isPushed}) => `${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px`};
  }
  box-shadow: 0 10px 15px -3px rgb(255 255 255 / 3%), 0 4px 6px -2px rgb(255 255 255 / 1%);
  height: calc(100vh - ${MENU_HEIGHT + 30}px);
`

const PannelWrap = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  margin-top: calc(${MENU_HEIGHT + 15}px);
  position: fixed;
  left: ${({ isPushed }) => (isPushed ? 0 : '-270px')};
  z-index: 30;
  transition: left 0.3s;
`

const Panel: React.FC<Props> = (props) => {
  const { isPushed, showMenu, isDark, pushNav, isMobile } = props
  return (
    <PannelWrap isPushed={isPushed} showMenu={showMenu}>
      <StyledPanel isPushed={isPushed} showMenu={showMenu}>
        {/* <Flex style={{ padding: '0 15px' }} alignItems="center">
          <MenuButton aria-label="Toggle menu" onClick={() => pushNav(!isPushed)}>
            <HamburgerCloseIcon width="32px" color="textSubtle" />
          </MenuButton>
          <img
            src="/logo.png"
            height="42px"
            style={{ paddingLeft: '30px', transform: 'translateX(-15px)', minHeight: '40px', width: 'auto' }}
            alt="HeroesTD"
          />
        </Flex> */}
        <PanelBody {...props} />
        <PanelFooter {...props} />
      </StyledPanel>
    </PannelWrap>
  )
}

export default Panel
