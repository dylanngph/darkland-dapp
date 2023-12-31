import React from 'react'
import styled from 'styled-components'
import {useLocation} from 'react-router-dom'
import {SvgProps} from '../../../components/Svg'
import * as IconModule from '../icons'
import Accordion from './Accordion'
import {MenuEntry, LinkLabel} from './MenuEntry'
import MenuLink from './MenuLink'
import {PanelProps, PushedProps} from '../types'

interface Props extends PanelProps, PushedProps {
  isMobile: boolean
}

const Icons = IconModule as unknown as {[key: string]: React.FC<SvgProps>}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  margin-top: 15px;
`

const PanelBody: React.FC<Props> = ({isPushed, pushNav, isMobile, links}) => {
  const location = useLocation()

  // Close the menu when a user clicks a link on mobile
  const handleClick = isMobile ? () => pushNav(false) : undefined

  return (
    <Container>
      {/* {isPushed && (
        <div
          style={{
            fontWeight: 'bold',
            fontSize: '12px',
            lineHeight: '16px',
            letterSpacing: '0.257143px',
            color: '#202224',
            opacity: 0.6,
            margin: '10px 10px 16px 40px',
          }}
        >
          Pages
        </div>
      )} */}
      {links.map((entry) => {
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
                      {itemIcons[index]}
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
              {iconElement}
              <LinkLabel isPushed={isPushed}>{entry.label}</LinkLabel>
            </MenuLink>
          </MenuEntry>
        )
      })}
    </Container>
  )
}

export default PanelBody
