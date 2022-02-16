import React from 'react'
import styled from 'styled-components'
import {Heading, Card, CardBody, Flex, Text} from 'components/Pancake-uikit'
import {useTranslation} from 'contexts/Localization'
import {useWeb3React} from '@web3-react/core'
import CopyToClipboard from './CopyClipload'

const StyledLotteryCard = styled(Card)`
  text-align: center;
  margin-bottom: 22px;
`

const MyReferralLinkCard = () => {
  const {t} = useTranslation()
  const {account} = useWeb3React()

  const domain = 'https://dapp.kshark.io/?ref='
  const referralLink = domain + account
  return (
    <StyledLotteryCard>
      <CardBody>
        <Heading scale="xl" mb="24px">
          {t('Invite my friends')}
        </Heading>
        <Text color="#606060">Copy & send the address to all of your friends and get reward on every transactions</Text>
        <Flex mb="32px" justifyContent="center" mt="10px">
          <CopyToClipboard toCopy={referralLink}>{referralLink}</CopyToClipboard>
        </Flex>
      </CardBody>
    </StyledLotteryCard>
  )
}

export default MyReferralLinkCard
