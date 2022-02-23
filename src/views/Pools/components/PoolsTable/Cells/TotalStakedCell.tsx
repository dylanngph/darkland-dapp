import React, {useMemo} from 'react'
import {Flex, Skeleton, Text} from '@pancakeswap/uikit'
import styled from 'styled-components'
import {useTranslation} from 'contexts/Localization'
import BigNumber from 'bignumber.js'
import Balance from 'components/Balance'
import {Pool} from 'state/types'
import {useCakeVault} from 'state/pools/hooks'
import {getBalanceNumber} from 'utils/formatBalance'
import {ReactComponent as QuestionCircleIcon} from 'assets/icons/QuestionCircle.svg'
import BaseCell, {CellContent} from './BaseCell'


interface TotalStakedCellProps {
  pool: Pool
}

const StyledCell = styled(BaseCell)`
  flex: 2 0 100px;
`

const TotalStakedCell: React.FC<TotalStakedCellProps> = ({pool}) => {
  const {t} = useTranslation()
  const {sousId, stakingToken, totalStaked, isAutoVault, stakingTokenPrice} = pool
  const {totalCakeInVault} = useCakeVault()

  const isManualCakePool = sousId === 0

  const totalStakedBalance = useMemo(() => {
    if (isAutoVault) {
      return getBalanceNumber(totalCakeInVault, stakingToken.decimals)
    }
    if (isManualCakePool) {
      const manualCakeTotalMinusAutoVault = new BigNumber(totalStaked).minus(totalCakeInVault)
      return getBalanceNumber(manualCakeTotalMinusAutoVault, stakingToken.decimals)
    }

    return getBalanceNumber(totalStaked, stakingToken.decimals) * stakingTokenPrice
  }, [isAutoVault, totalCakeInVault, isManualCakePool, totalStaked, stakingToken.decimals, stakingTokenPrice])

  return (
    <StyledCell role="cell">
      <CellContent>
        <Text fontSize="12px" color="#FFAB04" textAlign="left">
          {t('Liquidity')}
        </Text>
        {totalStaked && totalStaked.gte(0) ? (
          <Flex height="20px" alignItems="center">
            <Balance fontSize="16px" value={totalStakedBalance} decimals={0} unit="$" />
            <span style={{marginLeft: '20px'}}><QuestionCircleIcon /></span>
          </Flex>
        ) : (
          <Skeleton width="80px" height="16px" />
        )}
      </CellContent>
    </StyledCell>
  )
}

export default TotalStakedCell
