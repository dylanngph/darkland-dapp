import React from 'react'
import styled from 'styled-components'
import {Heading, Card, CardBody, Text} from 'components/Pancake-uikit'
import {useTranslation} from 'contexts/Localization'
import {useGetReferralInfo} from 'state/hooks'

const StyledLotteryCard = styled(Card)``

const TotalReferralCard = () => {
  const {t} = useTranslation()
  const referralsInfo = useGetReferralInfo()
  return (
    <StyledLotteryCard>
      <CardBody>
        <Heading size="xl" mb="24px">
          {t('Referrals made')}
        </Heading>
        <Text color="#606060">Users you have referred who have made account.</Text>
        <Text bold>{referralsInfo.referralsCount}</Text>
      </CardBody>
    </StyledLotteryCard>
  )
}

export default TotalReferralCard
