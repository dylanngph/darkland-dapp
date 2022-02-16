import React from 'react'
import styled from 'styled-components/macro'
import orderBy from 'lodash/orderBy'
import {Heading, CardBody, Flex, ArrowForwardIcon} from 'components/Pancake-uikit'
import Card from 'components/Card'
import {NavLink} from 'react-router-dom'
import pools from 'config/constants/pools'
import {Pool} from 'state/types'
import {ReactComponent as ArrowRightIcon} from '../../../arrow-right.svg'

const EarnAssetCard = () => {
  const activeNonCakePools = pools.filter((pool) => !pool.isFinished && !pool.earningToken.symbol.includes('DMS'))
  const latestPools: Pool[] = orderBy(activeNonCakePools, ['sortOrder', 'pid'], ['desc', 'desc']).slice(0, 3)
  // Always include CAKE
  const assets = ['BKS'].join(', ')

  return (
    <StyledFarmStakingCard>
      <a href="/">
        <CardBody>
          <Flex alignItems="center" justifyContent="space-between">
            <div>
              <CardTitle color="#202224">Total Value Locked</CardTitle>
              <Flex style={{marginTop: '16px', marginBottom: '2px'}}>
                <LabelH2>100,165.51</LabelH2>
              </Flex>
              <Flex>
                <CardTitle color="#606060">in Pools</CardTitle>
                {/* <StyleButton>
                <NavLink exact activeClassName="active" to="/farms" id="farm-apy-cta">
                  <ArrowForwardIcon color="primary" />
                </NavLink>
              </StyleButton> */}
              </Flex>
            </div>
            {/* <img
              src="/images/logo2.png"
              // height="20px"
              style={{ width: '100px', height: '100px', transform: 'translateX(-15px)' }}
              alt=""
            /> */}
            <ArrowRightIcon />
            {/* <svg width="249" height="128" viewBox="0 0 249 128" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M185 128C220.346 128 249 99.3462 249 64C249 28.6538 220.346 0 185 0C149.654 0 121 28.6538 121 64C121 99.3462 149.654 128 185 128Z"
              fill="#FFECB9"
            />
            <path d="M157.7 33.8H212.3L227 56.1L185 110.2L143 56.1L157.7 33.8Z" fill="#FBB116" />
            <path d="M185 110.2L227 56.1H202.3L185 110.2Z" fill="#FBB116" />
            <path d="M185 110.2L143 56.1H167.7L185 110.2Z" fill="#FFD46A" />
            <path d="M185 110.2L167.7 56.1H202.3L185 110.2Z" fill="#FFCE46" />
            <path d="M185 33.8L167.7 56.1H202.3L185 33.8Z" fill="#FFE5A0" />
            <path d="M167.7 56.1L157.7 33.8L143 56.1H167.7Z" fill="#FDBC45" />
            <path d="M202.3 56.1L212.3 33.8L227 56.1H202.3Z" fill="#FDBC45" />
            <path d="M212.3 33.8H185L202.3 56.1L212.3 33.8Z" fill="#FFD46A" />
            <path d="M157.7 33.8H185L167.7 56.1L157.7 33.8Z" fill="#FFD46A" />
            <path d="M202.4 48.1001L203.7 56.1001L202.4 64.0001L200.8 56.1001L202.4 48.1001Z" fill="white" />
            <path d="M194.3 55.9001L202.3 54.6001L210.2 55.9001L202.3 57.5001L194.3 55.9001Z" fill="white" />
            <path d="M205.8 52.7001L203 56.7001L198.9 59.6001L201.7 55.5001L205.8 52.7001Z" fill="white" />
            <path d="M198.9 52.6001L203 55.5001L205.8 59.5001L201.7 56.7001L198.9 52.6001Z" fill="white" />
            <g opacity="0.2">
              <path d="M100.93 32.1215L113.456 19.2818L107.028 18.553L100.93 32.1215Z" fill="#FBB116" />
              <path d="M100.93 32.1215L91.5962 16.8034L98.0241 17.5322L100.93 32.1215Z" fill="#FBB116" />
              <path d="M100.93 32.1215L98.0239 17.5322L107.028 18.553L100.93 32.1215Z" fill="#FFCE46" />
              <path d="M103.184 12.2393L98.0239 17.5322L107.028 18.5531L103.184 12.2393Z" fill="#FFE5A0" />
              <path d="M98.0241 17.5322L96.0796 11.4338L91.5962 16.8034L98.0241 17.5322Z" fill="#FDBC45" />
              <path d="M107.028 18.5531L110.289 13.0448L113.456 19.2818L107.028 18.5531Z" fill="#FDBC45" />
              <path d="M110.289 13.0448L103.184 12.2393L107.028 18.5531L110.289 13.0448Z" fill="#FFD46A" />
              <path d="M96.0796 11.4338L103.184 12.2393L98.024 17.5322L96.0796 11.4338Z" fill="#FFD46A" />
            </g>
            <g opacity="0.6">
              <path d="M88.7391 99.5322L102.796 78.2743L93.6315 78.9712L88.7391 99.5322Z" fill="#FBB116" />
              <path d="M88.739 99.5321L71.6292 80.6442L80.7937 79.9473L88.739 99.5321Z" fill="#FBB116" />
              <path d="M88.7392 99.5322L80.7939 79.9473L93.6317 78.9711L88.7392 99.5322Z" fill="#FFCE46" />
              <path d="M86.5834 71.185L80.7937 79.9472L93.6315 78.971L86.5834 71.185Z" fill="#FFE5A0" />
              <path d="M80.7937 79.9473L76.4542 71.9554L71.6292 80.6442L80.7937 79.9473Z" fill="#FDBC45" />
              <path d="M93.6316 78.9711L96.7128 70.4149L102.796 78.2742L93.6316 78.9711Z" fill="#FDBC45" />
              <path d="M96.7127 70.4149L86.5835 71.1851L93.6316 78.9711L96.7127 70.4149Z" fill="#FFD46A" />
              <path d="M76.4541 71.9555L86.5833 71.1852L80.7936 79.9474L76.4541 71.9555Z" fill="#FFD46A" />
            </g>
            <path
              d="M10.3606 30.6311L46.9551 15.9522L62.8026 26.9463L49.1975 74.497L6.50351 49.5291L10.3606 30.6311Z"
              fill="#FBB116"
            />
            <path d="M49.1973 74.4969L62.8024 26.9461L46.2478 33.5866L49.1973 74.4969Z" fill="#FBB116" />
            <path d="M49.1974 74.4968L6.50342 49.5289L23.058 42.8885L49.1974 74.4968Z" fill="#FFD46A" />
            <path d="M49.1975 74.4969L23.0581 42.8886L46.248 33.5866L49.1975 74.4969Z" fill="#FFCE46" />
            <path d="M28.6577 23.2913L23.058 42.8884L46.2478 33.5864L28.6577 23.2913Z" fill="#FFE5A0" />
            <path d="M23.0581 42.8887L10.3606 30.6311L6.50351 49.5291L23.0581 42.8887Z" fill="#FDBC45" />
            <path d="M46.2479 33.5865L46.955 15.9519L62.8025 26.946L46.2479 33.5865Z" fill="#FDBC45" />
            <path d="M46.9549 15.952L28.6577 23.2914L46.2479 33.5865L46.9549 15.952Z" fill="#FFD46A" />
            <path d="M10.3604 30.6309L28.6576 23.2914L23.0578 42.8885L10.3604 30.6309Z" fill="#FFD46A" />
            <path d="M44.1642 28.1978L47.1862 33.2102L48.4388 38.8545L45.2425 33.9898L44.1642 28.1978Z" fill="white" />
            <path d="M40.8324 35.6033L45.8447 32.5812L51.489 31.3287L46.6244 34.5249L40.8324 35.6033Z" fill="white" />
            <path d="M47.68 30.3668L46.8787 33.8005L44.9104 36.8464L45.6848 33.3457L47.68 30.3668Z" fill="white" />
            <path d="M43.0283 32.1547L46.5559 32.9961L49.5079 34.9242L46.0072 34.1498L43.0283 32.1547Z" fill="white" />
          </svg> */}
          </Flex>
        </CardBody>
      </a>
    </StyledFarmStakingCard>
  )
}

const StyledFarmStakingCard = styled(Card)``

const LabelH2 = styled.div`
  font-weight: 800;
  font-size: 28px;
  line-height: 38px;
  letter-spacing: 1px;
  color: rgb(253, 181, 51);
`
const StyleButton = styled.span`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #e3e3e3;
  border-radius: 5px;
  padding-top: 10px;
  font-size: 24px;
  color: #ffab00;
  font-weight: 600;
  min-height: 40px;
  text-align: center;
  width: 60px;
  font-weight: 600;
`

const ContrastText = styled.div<{color?: string}>`
  color: ${({theme, color}) => {
    if (theme.isDark) return '#eae2fc'
    if (!color) return '#323B4B'
    return color
  }};
`

const CardTitle = styled(ContrastText)`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
`

export default EarnAssetCard
