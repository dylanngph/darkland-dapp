import React from 'react'
import Page from 'components/Layout/Page'
import {Heading, Text} from 'components/Pancake-uikit'
import {
  Hero
} from 'components/KShark'
import {useTranslation} from 'contexts/Localization'

const MiniFarms = () => {
  const {t} = useTranslation()
  return (
    <Page>
      <Hero>
        <Heading as="h1" size="xl" color="#ffffff">
          {t('Farms on Mini Farm')}
        </Heading>
        <Text color="#ffffff">{t('Stake LP tokens to earn.')}</Text>
      </Hero>
    </Page>
  )
}

export default MiniFarms
