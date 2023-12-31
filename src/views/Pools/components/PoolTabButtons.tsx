import React from 'react'
import {useRouteMatch, Link} from 'react-router-dom'
import styled from 'styled-components'
import {ButtonMenu, ButtonMenuItem, NotificationDot} from 'components/Pancake-uikit'
import {useTranslation} from 'contexts/Localization'

// const ToggleWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   margin-left: 10px;

//   ${Text} {
//     margin-left: 8px;
//   }
// `

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({theme}) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    padding-left: 12px;
    padding-right: 12px;
  }

  ${({theme}) => theme.mediaQueries.sm} {
    margin-left: 16px;
  }
`

const PoolTabButtons = ({hasStakeInFinishedPools}) => {
  const {url, isExact} = useRouteMatch()
  const {t} = useTranslation()

  const liveOrFinishedSwitch = (
    <Wrapper>
      <ButtonMenu activeIndex={isExact ? 0 : 1} scale="sm" variant="primary">
        <ButtonMenuItem as={Link} to={`${url}`}>
          {t('Live')}
        </ButtonMenuItem>
        <NotificationDot show={hasStakeInFinishedPools}>
          <ButtonMenuItem as={Link} to={`${url}/history`}>
            {t('Finished')}
          </ButtonMenuItem>
        </NotificationDot>
      </ButtonMenu>
    </Wrapper>
  )

  return <ViewControls>{liveOrFinishedSwitch}</ViewControls>
}

export default PoolTabButtons
