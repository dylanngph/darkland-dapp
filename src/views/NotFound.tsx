import React from 'react'
import styled from 'styled-components'
import {Button, Heading, Text, LogoIcon} from 'components/Pancake-uikit'
// import Page from 'components/Layout/Page'
import {useTranslation} from 'contexts/Localization'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
`

const NotFound = () => {
  const {t} = useTranslation()

  return (
    <Page>
      <StyledNotFound>
        <LogoIcon width="64px" mb="8px" />
        <Heading scale="xxl">404</Heading>
        <Text mb="16px">{t('Oops, page not found.')}</Text>
        <Button as="a" href="/" scale="sm">
          {t('Back Home')}
        </Button>
      </StyledNotFound>
    </Page>
  )
}

const Page = styled.div``

export default NotFound
