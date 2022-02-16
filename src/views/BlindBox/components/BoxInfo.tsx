import React, {useEffect, useState, useCallback} from 'react'
import {Hero} from 'components/KShark'
import Page from 'components/Layout/Page'
import {Button, Heading, Text} from 'components/Pancake-uikit'
import {RouteComponentProps, NavLink} from 'react-router-dom'
import {useTranslation} from 'contexts/Localization'
import styled from 'styled-components'
import BlindBoxDetails from './BlindBoxDetails'
import SingleDetail from './SingleDetail'

const BoxInfo = ({
  match: {
    params: {boxId},
  },
  history,
}: RouteComponentProps<{boxId?: string}>) => {
  const {t} = useTranslation()
  const [nameBox, setNameBox] = useState('NFT Blind Box')
  return (
    <Page>
      <Hero>
        <Heading as="h1" size="xl" color="#ffffff">
          {t('Blind Box')}
        </Heading>
        <Breadcrumb>
          <li>
            <NavLink to="/Bounty">{t('Blind Box')}</NavLink>
          </li>
          <li>NFT Blind Box</li>
        </Breadcrumb>
      </Hero>
      <SingleDetail />
      <BlindBoxDetails style={{marginTop: 20}} />
    </Page>
  )
}

const Breadcrumb = styled.ul`
  list-style: none;

  li {
    display: inline;
    font-size: 16px;
    color: #fff;
  }

  li + li:before {
    padding: 0 12px;
    color: #fff;
    content: '>';
  }
`

export default BoxInfo
