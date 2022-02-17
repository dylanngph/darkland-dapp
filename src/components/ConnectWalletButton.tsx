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
    color: #ffffff;
    padding: ${padding};
    background-color: #FFA800;
    background-position: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 84px;
    width: 180px;
    cursor: pointer;
    font-weight: 700;
    font-size: 14px;
    border-bottom: solid 4px #C16000;
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
            {t('Connect Wallet')}
          </ColorButton>
        :
          <NormalButton onClick={onPresentConnectModal} {...props}>
            {t('Connect Wallet')}
          </NormalButton>
      }
    </>
  )
}

export default ConnectWalletButton
