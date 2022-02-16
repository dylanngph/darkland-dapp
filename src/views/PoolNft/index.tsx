import React from 'react'
import {Hero} from 'components/KShark'
import Page from 'components/Layout/Page'
import {Text, Heading} from 'components/Pancake-uikit'
import { useTranslation } from 'contexts/Localization'
import GroupMenu from './components/GroupMenu'

const PoolNft = () => {
  const { t } = useTranslation()

  return (
    <Page>
      <GroupMenu />
    </Page>
  )
}

export default PoolNft
