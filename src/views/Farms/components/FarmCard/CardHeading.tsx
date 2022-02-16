import React from 'react'
import styled from 'styled-components'
import {Tag, Flex, Heading, Text} from '@pancakeswap/uikit'
import {CommunityTag, CoreTag} from 'components/Tags'
import {Token} from 'config/constants/types'
import {TokenPairImage} from 'components/TokenImage'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  isCommunityFarm?: boolean
  token: Token
  quoteToken: Token
}

const Wrapper = styled(Flex)`
  display: flex;
  justify-content: space-between;
  svg {
    margin-right: 4px;
  }
  padding-bottom: 20px;
  border-bottom: 1px solid #686868;
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
`

const CardHeading: React.FC<ExpandableSectionProps> = ({lpLabel, multiplier, isCommunityFarm, token, quoteToken}) => {
  return (
    <Wrapper justifyContent="start" alignItems="center" mb="12px">
      <TokenPairImage variant="inverted" primaryToken={token} secondaryToken={quoteToken} width={64} height={64} />
      <Flex ml="15px" flexDirection="column" alignItems="start">
        <Heading mb="4px">
          <Text color="#fff">{lpLabel.split(' ')[0]}</Text>
        </Heading>
        <Flex justifyContent="center">
          {isCommunityFarm ? <CommunityTag /> : <CoreTag />}
          <MultiplierTag variant="warning">{multiplier}</MultiplierTag>
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
