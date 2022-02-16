import React from 'react'
import styled from '@emotion/styled'
import {Button, AutoRenewIcon, Skeleton} from '@pancakeswap/uikit'
import {useTranslation} from 'contexts/Localization'
import {useERC20} from 'hooks/useContract'
import {getAddress} from 'utils/addressHelpers'
import {Pool} from 'state/types'
import {useApprovePool} from '../../../hooks/useApprove'

interface ApprovalActionProps {
  pool: Pool
  isLoading?: boolean
}

const ApprovalAction: React.FC<ApprovalActionProps> = ({pool, isLoading = false}) => {
  const {sousId, stakingToken, earningToken} = pool
  const {t} = useTranslation()
  const stakingTokenContract = useERC20(stakingToken.address ? getAddress(stakingToken.address) : '')
  const {handleApprove, requestedApproval} = useApprovePool(stakingTokenContract, sousId, earningToken.symbol)

  return (
    <>
      {isLoading ? (
        <Skeleton width="100%" height="52px" />
      ) : (
        <CustomButton
          isLoading={requestedApproval}
          endIcon={requestedApproval ? <AutoRenewIcon spin color="currentColor" /> : null}
          disabled={requestedApproval}
          onClick={handleApprove}
          width="100%"
        >
          {t('Enable')}
        </CustomButton>
      )}
    </>
  )
}
const CustomButton = styled(Button)`
  background: linear-gradient(180deg, #E8A639 0%, #EBB340 50.84%, #F2CA4C 100%);
`

export default ApprovalAction
