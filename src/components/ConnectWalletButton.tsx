import React from 'react'
import {Button} from 'components/Pancake-uikit'
import {Box} from '@mui/material'
import {useWalletModal} from '@pancakeswap/uikit'
import useAuth from 'hooks/useAuth'
import {useTranslation} from 'contexts/Localization'
import styled from 'styled-components'

const ConnectWalletButton = (props) => {
  const {color, variant , padding, isCustom} = props
  const {t} = useTranslation()
  const {login, logout} = useAuth()
  const {onPresentConnectModal} = useWalletModal(login, logout)

  const ColorButton = styled(Box)`
    color: #E6AB58;
    padding: ${padding};
    // border-radius: 8px;
    background-color: transparent;
    background-size: cover;
    background-repeat: no-repeat;
    object-fit: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60px;
    width: 180px;
    cursor: pointer;
    font-weight: 700;
    font-size: 14px;
    &:hover {
      opacity: .8
    }
  `

  const NormalButton = styled(Button)`
    color: ${color};
    padding: ${padding};
    border-radius: 8px;
    background: ${variant === 'text' ? null : 'linear-gradient(180deg, #E8A639 0%, #E5A219 50.84%, #FCC312 100%)'};
  `

  return (
    <>
      {
        isCustom ?
          <ColorButton onClick={onPresentConnectModal} {...props}>
            {t('Connect Your Wallet')}
          </ColorButton>
        :
          <NormalButton onClick={onPresentConnectModal} {...props}>
            {t('Connect Your Wallet')}
          </NormalButton>
      }
    </>
  )
}

export default ConnectWalletButton
