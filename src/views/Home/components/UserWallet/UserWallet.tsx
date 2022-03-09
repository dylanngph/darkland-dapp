import {useWeb3React} from '@web3-react/core'
import FarmIcon from 'assets/icons/FarmIcon.svg'
import {Button, Card, CardBody, Flex, Box} from 'components/Pancake-uikit'
import UnlockButton from 'components/UnlockButton'
import styled from 'styled-components'
import React, {useState, useCallback} from 'react'
import {NavLink} from 'react-router-dom'
import {formatNumber} from 'utils/formatBalance'
import useGetYourBalance from '../../hooks/useGetYourBalance'
// import { useAllHarvest } from 'hooks/useHarvest'
import {ReactComponent as WalletIcon} from '../../wallet-icon.svg'
import {ReactComponent as BusdIcon} from '../../busd.svg'

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
  font-size: 22px;
  line-height: 48px;
  color: rgb(253, 181, 51);
`
const Label = styled(Box)`
  font-size: 22px;
  line-height: 30px;
  color: #fff;
`

const Col = styled(Flex)`
  flex-direction: column;
  gap: 5px;
`

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    width: 100%;
    align-items: start;
    gap: 30px;
  }
`

const UserWallet = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const {account} = useWeb3React()
  const {adt, busd} = useGetYourBalance()
  // const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  // const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))

  // const harvestAllFarms = useCallback(async () => {
  //   setPendingTx(true)
  //   try {
  //     await onReward()
  //   } catch (error) {
  //     // TODO: find a way to handle when the user rejects transaction or it fails
  //   } finally {
  //     setPendingTx(false)
  //   }
  // }, [onReward])

  return (
    <Container>
      <CardBody style={{backgroundColor: 'transparent'}} p="0">
        <Flex justifyContent="space-between" alignItems="center" p="30px" borderBottom="1px solid #343434">
          <Flex flexDirection="column" justifyContent="center">
            <Title>Your Wallet</Title>
            <SubTitle>Binance Smart Chain</SubTitle>
          </Flex>
          <Flex>
            <WalletIcon />
          </Flex>
        </Flex>

        <Row>
          <Flex alignItems="center">
            <img src="/images/coins/adt.png" alt='adt' width={65} />
            <Col ml="10px">
              <Label>{formatNumber(adt)} DAK</Label>
              <NavLink to="/swap">
                <BuyText>Buy DAK</BuyText>
              </NavLink>
            </Col>
          </Flex>
          <Flex alignItems="center">
            <BusdIcon />
            <Col ml="10px">
              <Label>{formatNumber(busd)} BUSD</Label>
              <NavLink to="/swap">
                <BuyText>Buy BUSD</BuyText>
              </NavLink>
            </Col>
          </Flex>
        </Row>
      </CardBody>
    </Container>
  )
}

const MoneyText = styled.div`
  color: rgb(253, 181, 51);
  font-size: 32px;
  span {
    font-size: 32px;
  }
`
const BuyText = styled.a`
  color: #2ba400;
  font-size: 22px;
  text-transform: uppercase;
`

const Title = styled.div`
  color: #fff;
  font-size: 30px;
`
const SubTitle = styled.div`
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  color: #ffab04;
`
const ScreenText = styled.div`
  @media screen and (min-width: 576px) {
    text-align: right;
  }
`

export default UserWallet
