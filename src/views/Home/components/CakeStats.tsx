import {useWeb3React} from '@web3-react/core'
import FarmIcon from 'assets/icons/FarmIcon.svg'
import {Button, Card, CardBody, Flex, Box} from 'components/Pancake-uikit'
import {Divider} from '@chakra-ui/react'
import UnlockButton from 'components/UnlockButton'
import styled from 'styled-components'
import React, {useState, useCallback} from 'react'
import {usePriceCakeBusd} from 'state/farms/hooks'
import {formatNumber} from 'utils/formatBalance'
import {useGetTokenPrice} from 'hooks/useTokenToUsd'
import CakeHarvestBalance from './CakeHarvestBalance'
import CakeWalletBalance from './CakeWalletBalance'
import {ReactComponent as WalletIcon} from '../wallet-icon.svg'
import useStats from '../hooks/useStats'

const ContrastText = styled.div<{color?: string}>`
  color: ${({theme, color}) => {
    if (theme.isDark) return '#eae2fc'
    if (!color) return '#323B4B'
    return color
  }};
`

const Container = styled(Card)`
  background-repeat: no-repeat;
  background-position: top right;
  border-radius: 20px;
  background-image: url('/images/mask.png');
  background-color: ${({theme}) => (theme.isDark ? '#000' : '#fff')};
  border: 1px solid #343434;
`

const Money = styled(ContrastText)`
  font-size: 24px;
  line-height: 48px;
  color: rgb(253, 181, 51);
`
const Label = styled(Box)`
  font-weight: 500;
  font-size: 21px;
  line-height: 30px;
  color: #fff;
`

const CustomFlex = styled(Flex)`
  flex-direction: column;
  gap: 10px;
  padding: 30px;
`

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

const CakeStats = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const {account} = useWeb3React()
  const {maxTotalSupply, tokenAddress, totalBurnBalance, totalLocked, totalSupply, balanceCirculation} = useStats()
  const getHtdPrice = Number(usePriceCakeBusd())
  const htdPriceUsd = Number.isNaN(getHtdPrice) ? 0 : getHtdPrice

  return (
    <Container>
      <CardBody style={{backgroundColor: 'transparent'}} p="0">
        <Flex justifyContent="space-between" alignItems="center" p="30px" borderBottom="1px solid #343434">
          <Flex flexDirection="column" justifyContent="center">
            <Title>HTD in numbers</Title>
            <SubTitle> Circulation </SubTitle>
            <MoneyText>{formatNumber(balanceCirculation, 0)}</MoneyText>
          </Flex>
          <Flex>
            <img src="/htd-token.png" alt="" />
          </Flex>
        </Flex>
        <CustomFlex>
          <Row>
            <Label>BEP20</Label>
            <Money>{formatNumber(balanceCirculation, 0)}</Money>
          </Row>
          {/* <Row>
                <Label>
                    KRC20
                </Label>
                <Money>
                  9,584,138
                </Money>
            </Row> */}
          <Divider color="#343434" />
          <Row>
            <Label>Max Supply</Label>
            <Money>{formatNumber(maxTotalSupply, 0)}</Money>
          </Row>
          <Row>
            <Label>Total Supply</Label>
            <Money>{formatNumber(totalSupply, 0)}</Money>
          </Row>
          <Row>
            <Label>Forever Burned</Label>
            <Money>{formatNumber(totalBurnBalance, 0)}</Money>
          </Row>
          <Row>
            <Label>Total Locked</Label>
            <Money>{formatNumber(totalLocked, 0)}</Money>
          </Row>
          <Divider color="#343434" />
          <Flex flexDirection="column" justifyContent="center">
            <MarketCap>Market Cap</MarketCap>
            <MoneyText>${formatNumber(htdPriceUsd * balanceCirculation)}</MoneyText>
          </Flex>
        </CustomFlex>
      </CardBody>
    </Container>
  )
}

const MoneyText = styled.div`
  color: #ffc247;
  font-size: 32px;
  font-weight: 700;
  span {
    font-size: 32px;
  }
`

const Title = styled.div`
  color: #fff;
  font-size: 30px;
`
const MarketCap = styled.div`
  color: #fff;
  font-size: 30px;
`
const SubTitle = styled.div`
  color: #ffab04;
  font-size: 24px;
  font-weight: 500;
`
const ScreenText = styled.div`
  @media screen and (min-width: 576px) {
    text-align: right;
  }
`

export default CakeStats
