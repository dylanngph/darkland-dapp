import {Button} from 'components/Pancake-uikit'
import {useWalletModal} from '@pancakeswap/uikit'
import useAuth from 'hooks/useAuth'
import React from 'react'

const UnlockButton = (props) => {
  const {login, logout} = useAuth()
  const {onPresentConnectModal} = useWalletModal(login, logout)

  return (
    <Button onClick={onPresentConnectModal} {...props}>
      Unlock Wallet
    </Button>
  )
}

export default UnlockButton
