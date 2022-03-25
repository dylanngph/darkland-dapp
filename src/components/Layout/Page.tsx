import React from 'react'
import styled, { css } from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router'
import { DEFAULT_META, getCustomMeta } from 'config/constants/meta'
import { usePriceCakeBusd } from 'state/farms/hooks'
import Container from './Container'

const ContainerPage = styled(Container)`
min-height: 100vh;
padding: 16px;
padding-top: 90px !important;

${({ theme }) => theme.mediaQueries.md} {
  padding-top: 16px;
  padding: ${(props) => props.pathName === '/home' ? '0' : '90px'};
}

@media only screen and (max-width: 851px) {
  padding: ${(props) => props.pathName === '/home' ? '0' : '16px'};
}

background-repeat: no-repeat;
background-size: cover;
background-position: center;
background-attachment: fixed;
color: #fff;
`
const StyledPage = styled(Container)`
  ${({ theme }) => theme.mediaQueries.sm} {
  padding-top: 64px;

  @media only screen and (max-width: 967px) {
    padding-top: 0;
  }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
  padding-top: ${(props) => props.pathName === '/home' ? '0' : '64px'};
  }
  max-width: ${(props) => props.pathName === '/home' ? '100%' : '1440px'}; 
  background-image: ${(props) => props.pathName === '/home' ? "url('/images/Home.png')" : 'none'};
  background-repeat: no-repeat;
  background-size: cover;
`

const PageMeta = () => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const cakePriceUsd = usePriceCakeBusd()
  const cakePriceUsdDisplay = cakePriceUsd.gt(0)
    ? `$${cakePriceUsd.toNumber().toLocaleString(undefined, {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    })}`
    : ''

  const pageMeta = getCustomMeta(pathname, t) || {}
  const { title, description, image } = { ...DEFAULT_META, ...pageMeta }
  const pageTitle = cakePriceUsdDisplay ? [title, cakePriceUsdDisplay].join(' - ') : title

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Helmet>
  )
}

const Page: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  const isBackgroundImage = true
  const { pathname } = useLocation()

  return (
    <>
      <PageMeta />
      <ContainerPage {...props} isBackgroundImage={isBackgroundImage} pathName={pathname}>
        <StyledPage {...props} isBackgroundImage={false} background="transparent" pathName={pathname}>
          {children}
        </StyledPage>
      </ContainerPage>
    </>
  )
}

export default Page
