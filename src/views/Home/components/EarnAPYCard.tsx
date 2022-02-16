import BigNumber from 'bignumber.js'
import {ArrowForwardIcon, Card, CardBody, Flex, Heading} from 'components/Pancake-uikit'
import max from 'lodash/max'
import React, {useMemo} from 'react'
import {NavLink} from 'react-router-dom'
// import { useFarms, useGetApiPrices, usePriceCakeBusd } from 'state/hooks'
import styled from 'styled-components'
// import { getFarmApy } from 'utils/apy'

const EarnAPYCard = () => {
  // const farmsLP = useFarms()
  // const prices = useGetApiPrices()
  // const cakePrice = usePriceCakeBusd()

  // const highestApy = useMemo(() => {
  //   const apys = farmsLP
  //     // Filter inactive farms, because their theoretical APY is super high. In practice, it's 0.
  //     .filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X')
  //     .map((farm) => {
  //       if (farm.lpTotalInQuoteToken && prices) {
  //         const quoteTokenPriceUsd = prices[farm.quoteToken.symbol.toLowerCase()]
  //         const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(quoteTokenPriceUsd)
  //         return getFarmApy(farm.poolWeight, cakePrice, totalLiquidity)
  //       }
  //       return null
  //     })

  //   const maxApy = max(apys)
  //   return maxApy?.toLocaleString('en-US', { maximumFractionDigits: 2 })
  // }, [cakePrice, farmsLP, prices])

  return (
    <StyledFarmStakingCard>
      <CardBody p="16px">
        <CardTitle color="#202224">Earn up to</CardTitle>
        <CardMidContent style={{marginTop: '16px', marginBottom: '2px'}} color="#202224">
          60% APR
        </CardMidContent>
        <Flex>
          <CardTitle color="#606060">in Farms</CardTitle>
          <StyleButton>
            <NavLink exact activeClassName="active" to="/farms" id="farm-apy-cta">
              <ArrowForwardIcon color="#202224" />
            </NavLink>
          </StyleButton>
        </Flex>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

const ContrastText = styled.div<{color?: string}>`
  color: ${({theme, color}) => {
    if (theme.isDark) return '#eae2fc'
    if (!color) return '#323B4B'
    return color
  }};
`

const StyledFarmStakingCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  border-radius: 8px;
  min-height: 165px;
  position: relative;
  background: ${({theme}) => (theme.isDark ? '#27262c' : '#fff')};
  box-shadow: 6px 6px 54px rgba(0, 0, 0, 0.05);

  ${({theme}) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`
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
