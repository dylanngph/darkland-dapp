import {ArrowForwardIcon, CardBody, Flex, Heading} from 'components/Pancake-uikit'
import Card from 'components/Card'
// import useLotteryTotalPrizesUsd from 'hooks/useLotteryTotalPrizesUsd'
import React from 'react'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import Timer from 'components/Timer'

const WinCard = () => {
  // const lotteryPrize = Math.round(useLotteryTotalPrizesUsd())

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <CardTitle color="#202224">Next Halving in</CardTitle>
        <CardMidContent style={{marginTop: '16px', marginBottom: '2px'}} color="#202224">
          <strong>
            <Timer time="2021/09/12" />
          </strong>
        </CardMidContent>
        {/* <CardTitle color="#202224">Join pools</CardTitle>
        <CardMidContent style={{ marginTop: '16px', marginBottom: '2px' }} color="#202224"> */}
        {/* {lotteryPrize !== 0 ? (
            `$${lotteryPrize.toLocaleString()}`
          ) : (
            <Skeleton animation="pulse" variant="rect"  />
          )} */}
        {/* Up for grabs
        </CardMidContent>
        <Flex>
          <StyleButton>
            <NavLink exact activeClassName="active" to="/farms" id="lottery-pot-cta">
              <ArrowForwardIcon color="#202224" />
            </NavLink>
          </StyleButton>
        </Flex> */}
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

const StyledFarmStakingCard = styled(Card)``
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

export default WinCard
