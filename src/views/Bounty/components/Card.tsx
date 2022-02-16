import React, {useMemo} from 'react'
import {Button, Text} from 'components/Pancake-uikit'
import styled from 'styled-components'
import {useWeb3React} from '@web3-react/core'
import {useBounty, useKsharkContract} from 'hooks/useContract'
import {useTranslation} from 'contexts/Localization'
import {useCallWithGasPrice} from 'hooks/useCallWithGasPrice'
import useToast from 'hooks/useToast'
import {BountyConfig} from 'config/constants/types'
import UnlockButton from 'components/UnlockButton'
import {ToastDescriptionWithTx} from 'components/Toast'
import {BIG_ZERO} from 'utils/bigNumber'
import {getAddress} from 'utils/addressHelpers'
import {useFarmsNft} from 'state/farmsNft/hooks'
import {NavLink} from 'react-router-dom'
import Detail from './Detail'

interface CardProps {
  data: BountyConfig
}

const Card: React.FC<CardProps> = ({data}) => {
  return (
    <CardStyle>
      <NavLink to={`/bounty-detail/${data.slug}`}>
        <Detail data={data} />
      </NavLink>
    </CardStyle>
  )
}

const CardStyle = styled.div`
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-4px);
  }
`

export default Card
