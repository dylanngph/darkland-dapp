import BigNumber from 'bignumber.js'
import React from 'react'
import {CardBody, Flex, Text, CardRibbon} from '@pancakeswap/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import {useTranslation} from 'contexts/Localization'
import {BIG_ZERO} from 'utils/bigNumber'
import {Pool} from 'state/types'
import {PoolCategory} from 'config/constants/types'
import HarvestActions from './CardActions/HarvestActions'
import AprRow from './AprRow'

import {StyledCard} from './StyledCard'
import CardFooter from './CardFooter'
import StyledCardHeader from './StyledCardHeader'
import CardActions from './CardActions'


const PoolCard: React.FC<{pool: Pool; account: string}> = ({pool, account}) => {
  const {sousId, stakingToken, earningToken, harvest, poolCategory, userData, earningTokenPrice, isFinished} = pool
  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO
  const accountHasStakedBalance = stakedBalance.gt(0)
  // Pools using native BNB behave differently than pools using a token
  const isBnbPool = poolCategory === PoolCategory.BINANCE
  const {t} = useTranslation()
  const allowance = userData?.allowance ? new BigNumber(userData.allowance) : BIG_ZERO
  const stakingTokenBalance = userData?.stakingTokenBalance ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO
  const earnings = userData?.pendingReward ? new BigNumber(userData.pendingReward) : BIG_ZERO
  const needsApproval = !allowance.gt(0) && !isBnbPool
  const isStaked = stakedBalance.gt(0)
  const isLoading = !userData

  return (
    <StyledCard
      background="#1D2D71"
      isFinished={isFinished && sousId !== 0}
      ribbon={isFinished && <CardRibbon variantColor="textDisabled" text={t('Finished')} />}
    >
      <StyledCardHeader
        isStaking={accountHasStakedBalance}
        earningToken={earningToken}
        stakingToken={stakingToken}
        isFinished={isFinished && sousId !== 0}
      />
      <CardBody>
        <AprRow pool={pool} stakedBalance={stakedBalance} />

        {/* <Flex mt="24px" flexDirection="column">
          <Text mb="10px" textTransform="uppercase" fontSize="12px" color="textSubtle" bold>
            <span style={{color: '#FFA800'}}>BIG </span><span style={{color: '#00FB28'}}>{t('EARNED')}</span>
          </Text>
        </Flex>
        <HarvestActions
          earnings={earnings}
          earningToken={earningToken}
          sousId={sousId}
          earningTokenPrice={earningTokenPrice}
          isBnbPool={isBnbPool}
          isLoading={isLoading}
        /> */}

        <Flex mt="24px" flexDirection="column">
          {account ? (
            <CardActions pool={pool} stakedBalance={stakedBalance} />
          ) : (
            <>
              <Text mb="10px" textTransform="uppercase" fontSize="12px" color="textSubtle" bold>
                <span style={{color: '#00FB28'}}>{t('STAKED')}</span><span style={{color: '#FFA800'}}> BIG</span>
              </Text>
              <ConnectWalletButton />
            </>
          )}
        </Flex>
      </CardBody>
      <CardFooter pool={pool} account={account} />
    </StyledCard>
  )
}

export default PoolCard
