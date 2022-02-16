import React from 'react'
import {Flex, IconButton, CogIcon, useModal} from '@pancakeswap/uikit'
import SettingsModal from './SettingsModal'
import {ReactComponent as SettingIcon} from '../../../settings.svg'

const GlobalSettings = () => {
  const [onPresentSettingsModal] = useModal(<SettingsModal />)

  return (
    <Flex>
      <IconButton onClick={onPresentSettingsModal} variant="text" scale="sm" mr="8px">
        <SettingIcon height={22} width={22} color="textSubtle" />
      </IconButton>
    </Flex>
  )
}

export default GlobalSettings
