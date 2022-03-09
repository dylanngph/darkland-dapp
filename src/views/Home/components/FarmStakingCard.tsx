import {useWeb3React} from '@web3-react/core'
import {ReactComponent as FarmIcon} from 'assets/icons/FarmIcon.svg'
import {Button, Card, CardBody, Flex, Box} from 'components/Pancake-uikit'
// import {Button} from '@chakra-ui/react'
import UnlockButton from 'components/UnlockButton'
import styled from 'styled-components'
import React, {useState, useCallback} from 'react'
import { formatNumber } from 'utils/formatBalance'
import { useLpTokenPrice, usePriceHtdBusd } from 'state/farms/hooks'
import useFarmsWithBalance from '../hooks/useFarmsWithBalance'
import usePoolsWithBalance from '../hooks/usePoolsWithBalance'
import { useAllHarvest, useHarvestPool } from '../hooks/useAllHarvest'
import CakeHarvestBalance from './CakeHarvestBalance'
import CakeWalletBalance from './CakeWalletBalance'

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
  min-height: 430px;
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
  gap: 5px;
  align-items: center;
  padding: 30px;
`

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

const LP_SYMBOL = 'DAK-BUSD'

const FarmStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const {account} = useWeb3React()
  const tokenPrice = Number(usePriceHtdBusd())
  const lpPrice = Number(useLpTokenPrice(LP_SYMBOL))
  const { farmsWithStakedBalance, earningsSum, staked: stakedFarm } = useFarmsWithBalance()
  const { poolsWithStakedBalance, earningsPool, staked: stakedPool } = usePoolsWithBalance()
  const totalInvest = (lpPrice * stakedFarm) + (stakedPool * tokenPrice)
  const balancesWithValue = farmsWithStakedBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)
  const balancePoolValue = poolsWithStakedBalance.filter((value) => value.balance.toNumber() > 0)

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))
  const { onRewardPool } = useHarvestPool(balancePoolValue.map((pool) => pool.sousId))

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
      await onRewardPool()
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward, onRewardPool])

  return (
    <Container>
      <Flex flexDirection="column" justifyContent="space-around" height="100%">
        <Flex justifyContent="space-between" alignItems="center" p="30px" borderBottom="1px solid #343434">
            <Flex flexDirection="column" justifyContent="center">
                <Title>Your Investment</Title>
                <MoneyText>${formatNumber(totalInvest, 2, 3)}</MoneyText>
            </Flex>
            <Flex>
                <FarmIcon/>
            </Flex>
        </Flex>
        <CustomFlex>
          {/* <div className="text-xl uppercase">Coming Soon</div> */}
          <Row>
                <Label>
                  Farming
                </Label>
                <Money>
                    ${formatNumber(earningsSum * tokenPrice, 2, 3)}
                </Money>
            </Row>
            <Row>
                <Label>
                    Staking
                </Label>
                <Money>
                    ${formatNumber(earningsPool * tokenPrice, 2, 3)}
                </Money>
            </Row>
            <ClaimAllButton onClick={harvestAllFarms} disabled={pendingTx}>
              { pendingTx ? `Processing...` : `Harvest All ($${formatNumber((earningsSum + earningsPool) * tokenPrice)})` }
            </ClaimAllButton>
        </CustomFlex>
      </Flex>
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
const SubTitle = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  margin-top: 20px;
`
const ScreenText = styled.div`
  @media screen and (min-width: 576px) {
    text-align: right;
  }
`
const ClaimAllButton = styled(Button)`
  // border: 1px solid #FDB32F;
  // color: #FDB32F;
  // &:hover {
  //   background-color: #FDB32F;
  //   color: #fff;
  // }
  width: 100%;
  margin-top: 20px;
`

export default FarmStakingCard
