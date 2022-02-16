import BigNumber from 'bignumber.js'
import {ArrowForwardIcon, CardBody, Flex, Heading} from 'components/Pancake-uikit'
import Card from 'components/Card'
import max from 'lodash/max'
import React, {useMemo} from 'react'
import {NavLink} from 'react-router-dom'
// import { useFarms, useGetApiPrices, usePriceCakeBusd } from 'state/hooks'
import styled from 'styled-components'
// import { getFarmApy } from 'utils/apy'

const EarnAPYCard = () => {
  return (
    <Container>
      <CardBody p="24px">
        <CardTitle color="#202224">User Insight</CardTitle>
        <CardMidContent style={{marginTop: '16px', marginBottom: '2px'}} color="#202224">
          30.000+
        </CardMidContent>
        <Flex>
          <CardTitle color="#606060">Users</CardTitle>
        </Flex>
      </CardBody>
    </Container>
  )
}

const ContrastText = styled.div<{color?: string}>`
  color: ${({theme, color}) => {
    if (theme.isDark) return '#eae2fc'
    if (!color) return '#323B4B'
    return color
  }};
`

const Container = styled(Card)``
const CardMidContent = styled(Heading).attrs({size: 'xl'})`
  font-style: normal;
  font-weight: 800;
  font-size: 28px;
  line-height: 38px;
  letter-spacing: 1px;
  color: ${({theme}) => theme.isDark && '#eae2fc'}};
`
const StyleButton = styled.span`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #e3e3e3;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CardTitle = styled(ContrastText)`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
`

export default EarnAPYCard
