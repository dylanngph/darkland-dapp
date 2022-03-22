import React from 'react'
import styled from 'styled-components'
import {Link , useLocation} from 'react-router-dom'
import {LogoIcon, SvgProps} from '../../../components/Svg'
import * as IconModule from '../icons'
import Accordion from './Accordion'
import {MenuEntry, LinkLabel} from './MenuEntry'
import Flex from '../../../components/Box/Flex'
import MenuLink from './MenuLink'
import {HamburgerIcon, HamburgerCloseIcon, LogoIcon as LogoWithText} from '../icons'
import MenuButton from './MenuButton'

interface Props {
  links: any
  isMobile: boolean
  isPushed: boolean
  isDark: boolean
  togglePush: () => void
  href: string
  pushNav?: any
}

const Icons = IconModule as unknown as {[key: string]: React.FC<SvgProps>}


const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #1f9fd3;
  font-size: 20px;
  .mobile-icon {
    width: 32px;

    ${({theme}) => theme.mediaQueries.nav} {
      display: none;
    }
  }
  .desktop-icon {
    width: 120px;
    display: none;
    color: #1f9fd3;
    font-size: 20px;
    ${({theme}) => theme.mediaQueries.nav} {
      display: block;
    }
  }
`
const StyledP = styled(Link)`
  padding-left: 10px;
`
const Logo: React.FC<Props> = ({links , isMobile , isPushed, togglePush, isDark, href:absoluteHref, pushNav}) => {
  const isAbsoluteUrl = absoluteHref.startsWith('http')
  const innerLogo = (
    <>
      <LogoIcon className="mobile-icon" />
      <LogoWithText className="desktop-icon" isDark={isDark} />
    </>
  )

  const location = useLocation()

  const handleClick = isMobile ? () => pushNav(false) : undefined


  return (
    <Flex alignItems="center">
      <MenuButton aria-label="Toggle menu" onClick={togglePush}>
        {isMobile ? (
          <HamburgerIcon width="24px" color="textSubtle" />
        ) : null}
      </MenuButton>
      {isAbsoluteUrl ? (
        <StyledLink to={absoluteHref} aria-label="DarkLand home page">
          <img src="#" alt="DarkLand" width="35px" height="40px" />
          <StyledP to={absoluteHref} aria-label="DarkLand home page">
            <p>DarkLand Swap</p>
          </StyledP>
          {innerLogo}
        </StyledLink>
      ) : (
        <StyledLink to={absoluteHref} aria-label="DarkLand home page">
          <StyledP to={absoluteHref} aria-label="DarkLand home page">
            <img
              src="/logo.png"
              height="42px"
              style={{paddingLeft: '30px', transform: 'translateX(-15px)', width: 'auto'}}
              alt="DarkLand"
            />
            {/* <DotArcadeLogo/> */}
          </StyledP>
          {/* {innerLogo} */}
        </StyledLink>
      )}

      {
      isMobile ? null
      :
      links.map((entry) => {
        const Icon = Icons[entry.icon]
        const iconElement = <Icon width="24px" />
        const calloutClass = entry.calloutClass ? entry.calloutClass : undefined
        if (entry.items) {
          const itemsMatchIndex = entry.items.findIndex((item) => item.href === location.pathname)
          const initialOpenState = entry.initialOpenState === true ? entry.initialOpenState : itemsMatchIndex >= 0

          const itemIcons = []

          entry.items.map((item, index) => {
            const IconItem = Icons[item.icon]
            const iconElementItem = <IconItem width="24px" />
            itemIcons[index] = iconElementItem
            return itemIcons
          })

          return (
            <Accordion
              key={entry.label}
              isPushed={isPushed}
              pushNav={pushNav}
              icon={iconElement}
              label={entry.label}
              initialOpenState={initialOpenState}
              className={calloutClass}
              isActive={entry.items.some(({ href }) => href === location.pathname)}
            >
              {isPushed &&
                entry.items.map(({ href, label }, index) => label && (
                    <MenuEntry
                      isPushed={isPushed}
                      key={href}
                      secondary
                      isActive={href === location.pathname}
                      onClick={handleClick}
                    >
                      {/* {itemIcons[index]} */}
                      <MenuLink href={href}>{label}</MenuLink>
                    </MenuEntry>
                  )
                )}
            </Accordion>
          )
        }
        return (
          <MenuEntry
            isPushed={isPushed}
            key={entry.label}
            isActive={entry.href === location.pathname}
            className={calloutClass}
          >
            <MenuLink href={entry.href} onClick={handleClick}>
              {/* {iconElement} */}
              <LinkLabel isPushed={isPushed}>{entry.label}</LinkLabel>
            </MenuLink>
          </MenuEntry>
        )
      })}
    </Flex>
  )
}

export default React.memo(Logo, (prev, next) => prev.isPushed === next.isPushed && prev.isDark === next.isDark)
