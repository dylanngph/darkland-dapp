import React from 'react'
import styled from 'styled-components'
import {NavLink, useLocation} from 'react-router-dom'
import {ButtonMenu, ButtonMenuItem} from '@pancakeswap/uikit'
import {useTranslation} from 'contexts/Localization'

const StyledNav = styled.nav`
  background: #0D1A4E;
  // border-radius: 20px;
  margin-top: 13vh;
  margin-bottom: 32px;
  justify-content: center;
  text-align: center;
  display: flex;
  overflow: hidden;
  flex-direction: row;
  width: 100%;
  ${({theme}) => theme.mediaQueries.sm} {
    padding: 0;
    max-width: 330px;
  }
  a {
    // border-radius: 20px;
    flex-grow: 1;
    padding-top: 12px;
    padding-bottom: 12px;
    background: ${({theme}) => (theme.isDark ? '#0D1A4E' : '#fff')};
    color: ${({theme}) => (theme.isDark ? theme.colors.textSubtle : '#202224')};
    font-weight: 400;
    font-size: 20px;
    line-height: 16px;
    text-align: center;
    height: 40px;
    /* border-right: 0.4 solid rgba(151, 151, 151, 0.7) !important; */
    display: inline-block;
  }
`
const defaultStyle = {
  // borderRight: '0.4px solid rgba(151, 151, 151, 0.7)',
  // borderLeft: '0.4px solid rgba(151, 151, 151, 0.7)',
}

const getActiveIndex = (pathname: string): number => {
  let pathActive = 0
  switch (pathname) {
    case '/liquidity':
      pathActive = 1
      break
    case '/bridge':
      pathActive = 2
      break
    default:
      pathActive = 0
      break
  }
  return pathActive
}

const styleActive = {
  // background: 'linear-gradient(180deg, #E8A639 0%, #EBB340 50.84%, #F2CA4C 100%)',
  background: 'rgba(0, 191, 213, 0.5)',
  color: '#fff',
}

const Nav = () => {
  const location = useLocation()
  const {t} = useTranslation()
  const activeIndex = getActiveIndex(location.pathname)

  return (
    <StyledNav>
      {/* <ButtonMenu activeIndex={getActiveIndex(location.pathname)} scale="sm" variant="subtle">
        <ButtonMenuItem id="swap-nav-link" to="/swap" as={Link}>
          {t('Swap')}
        </ButtonMenuItem>
        <ButtonMenuItem id="pool-nav-link" to="/pool" as={Link}>
          {t('Liquidity')}
        </ButtonMenuItem>
      </ButtonMenu> */}
      <NavLink style={activeIndex === 0 && location.pathname !== '/add' ? styleActive : {}} to="/swap" aria-hidden="true">
        <strong>{t('Swap')}</strong>
      </NavLink>
      <NavLink style={activeIndex === 1 || location.pathname === '/add' ? styleActive : defaultStyle} to="/pool" aria-hidden="true">
        <strong>{t('Liquidity')}</strong>
      </NavLink>
      {/* <NavLink style={activeIndex === 2 ? styleActive : defaultStyle} to="/bridge" aria-hidden="true">
        <strong>{t('Bridge')}</strong>
      </NavLink> */}
    </StyledNav>
  )
}

export default Nav
