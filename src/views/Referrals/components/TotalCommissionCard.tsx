import React from 'react'
import styled from 'styled-components'
import {Heading, Card, CardBody, Text} from 'components/Pancake-uikit'
import {useTranslation} from 'contexts/Localization'
import {useGetReferralInfo} from 'state/hooks'

const StyledLotteryCard = styled(Card)``

const TotalCommissionCard = () => {
  const {t} = useTranslation()
  const referralsInfo = useGetReferralInfo()
  return (
    <StyledLotteryCard>
      <CardBody>
        <Heading size="xl" mb="24px">
          {t('Total Referral Commissions')}
        </Heading>
        <Text bold fontSize="64px">
          {referralsInfo.totalReferralCommissions} <TokenColor>BKS</TokenColor>
        </Text>
      </CardBody>
    </StyledLotteryCard>
  )
}

const TokenColor = styled.span`
  color: ${({theme}) => theme.colors.primary};
  font-size: 32px;
`

export default TotalCommissionCard
