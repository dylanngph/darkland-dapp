import {ButtonMenu, ButtonMenuItem, NotificationDot} from 'components/Pancake-uikit'
import {useTranslation} from 'contexts/Localization'
import React from 'react'
import {NavLink, useLocation, useRouteMatch, Link} from 'react-router-dom'
import styled from 'styled-components'

const styleActive = {background: '#4072D3', color: '#fff'}

const defaultStyle = {
  borderRight: '0.4px solid rgba(151, 151, 151, 0.7)',
  borderLeft: '0.4px solid rgba(151, 151, 151, 0.7)',
}

const StyledNav = styled.nav`
  display: flex;
  a {
    flex-grow: 1;
    width: 120px;
    background: ${({theme}) => (theme.isDark ? '#27262c' : '#fff')};
    color: ${({theme}) => (theme.isDark ? theme.colors.textSubtle : '#202224')};
    background: #fafbfc;
    border: 1px solid #e4e7eb;
    box-sizing: border-box;
    border-radius: 8px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
interface FarmTabButtonsProps {
  hasStakeInFinishedFarms: boolean
}

const FarmTabButtons: React.FC<FarmTabButtonsProps> = ({hasStakeInFinishedFarms}) => {
  const {url} = useRouteMatch()
  const location = useLocation()
  const {t} = useTranslation()

  let activeIndex
  switch (location.pathname) {
    case '/farms':
      activeIndex = 0
      break
    case '/farms/history':
      activeIndex = 1
      break
    case '/farms/archived':
      activeIndex = 2
      break
    default:
      activeIndex = 0
      break
  }

  return (
    <Wrapper>
      <ButtonMenu activeIndex={activeIndex} scale="sm" variant="primary">
        <ButtonMenuItem as={Link} to={`${url}`}>
          {t('Live')}
        </ButtonMenuItem>
        <NotificationDot show={hasStakeInFinishedFarms}>
          <ButtonMenuItem as={Link} to={`${url}/history`}>
            {t('Finished')}
          </ButtonMenuItem>
        </NotificationDot>
        {/* <ButtonMenuItem as={Link} to={`${url}/archived`}> */}
        {/*  {t('Archived')} */}
        {/* </ButtonMenuItem> */}
      </ButtonMenu>
    </Wrapper>
  )
}

export default FarmTabButtons

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    padding-left: 12px;
    padding-right: 12px;
    border-radius: 0 !important;
  }

  ${({theme}) => theme.mediaQueries.sm} {
    margin-left: 16px;
  }
`
