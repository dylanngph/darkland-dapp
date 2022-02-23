import React from 'react'
import styled, { css } from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router'
import { DEFAULT_META, getCustomMeta } from 'config/constants/meta'
import { usePriceCakeBusd } from 'state/farms/hooks'
import Container from './Container'

// const ContainerPage = styled(Container)`
//   ${(props) =>
//     props.isBackgroundImage &&
//     css`
//       background: ${props.background || 'transparent'};
//     `}
//   min-height: 100vh;
//   padding: 16px;
//   padding-top: 90px !important;
//   ${({ theme }) => theme.mediaQueries.md} {
//     padding-top: 16px;
//     padding: 90px;
//   }
//   background-repeat: no-repeat;
//   background-size: cover;
//   background-position: center;
//   background-attachment: fixed;
//   // max-width: 1400px;
//   color: #fff;
// `

// const StyledPage = styled(Container)`
//   min-height: calc(100vh - 64px);
//   padding-top: 16px;
//   padding-bottom: 16px;

//   ${({ theme }) => theme.mediaQueries.sm} {
//     padding-top: 24px;
//     padding-bottom: 24px;
//   }

//   ${({ theme }) => theme.mediaQueries.lg} {
//     padding-top: 32px;
//     padding-bottom: 32px;
//   }
// `

const PageMeta = () => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  console.log('pathname==>', pathname);
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
  
  const ContainerPage = styled(Container)`
    min-height: 100vh;
    padding: 16px;
    padding-top: 90px !important;
    ${({ theme }) => theme.mediaQueries.md} {
      padding-top: 16px;
      padding: ${pathname === '/home' ? '0' : '90px'};
    }
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    // max-width: 1400px;
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
    padding-top: ${pathname === '/home' ? '0' : '64px'};
  }
  max-width: ${pathname === '/home' ? '100%' : '1440px'};
  background-image: ${pathname === '/home' ? "url('/images/Home.png')" : 'none'};
  background-repeat: no-repeat;
  background-size: cover;
`
  return (
    <>
      <PageMeta />
      <ContainerPage {...props} isBackgroundImage={isBackgroundImage}>
        <StyledPage {...props} isBackgroundImage={false} background="transparent">
          {children}
        </StyledPage>
      </ContainerPage>
    </>
  )
}

export default Page
