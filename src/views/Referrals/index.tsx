import React, {useEffect} from 'react'
import {useWeb3React} from '@web3-react/core'
import {Hero} from 'components/KShark'
import Page from 'components/Layout/Page'
import {Text, Heading, BaseLayout} from 'components/Pancake-uikit'
import styled from 'styled-components'
import {useAppDispatch} from 'state'
import {fetchReferralInfoAsync} from 'state/referrals'
import {useTranslation} from 'contexts/Localization'
import UnlockWalletCard from './components/UnlockWalletCard'
import TotalReferralCard from './components/TotalReferralCard'
import TotalCommissionCard from './components/TotalCommissionCard'
import MyReferralLinkCard from './components/MyReferralLinkCard'

const Referrals: React.FC = () => {
  const {t} = useTranslation()
  const {account} = useWeb3React()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (account) {
      dispatch(fetchReferralInfoAsync(account))
    }
  }, [dispatch, account])

  return (
    <>
      <Page>
        <Hero>
          <Heading as="h1" size="xl" color="#171B3D">
            {t('Referrals')}
          </Heading>
          <Text color="#171B3D">
            {t('Share the referral link below to invite your friends and earn 1% of your friends earnings FOREVER!')}
          </Text>
        </Hero>
        {!account ? (
          <UnlockWalletCard />
        ) : (
          <div>
            <MyReferralLinkCard />
            <Cards>
              <TotalReferralCard />
              <TotalCommissionCard />
            </Cards>
          </div>
        )}
      </Page>
    </>
  )
}

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;
  & > div {
    grid-column: span 6;
    width: 100%;
  }
  ${({theme}) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }
  ${({theme}) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

export default Referrals
