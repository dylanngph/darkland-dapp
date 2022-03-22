import React from 'react'
import UikitMenu from 'components/Pancake-uikit/widgets/Menu/Menu'
import {languageList} from 'config/localization/languages'
import {useTranslation} from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import {useProfile} from 'state/profile/hooks'
import config from './config'
import UserMenu from './UserMenu'
import GlobalSettings from './GlobalSettings'

const Menu = (props) => {
  const {isDark, toggleTheme} = useTheme()
  const cakePriceUsd = '0'
  const {profile} = useProfile()
  const {currentLanguage, setLanguage, t} = useTranslation()

  return (
    <UikitMenu
      userMenu={<UserMenu />}
      // globalMenu={<GlobalSettings />}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={currentLanguage.code}
      langs={languageList}
      setLang={setLanguage}
      cakePriceUsd={cakePriceUsd}
      links={config(t)}
      profile={{
        username: profile?.username,
        image: profile?.nft ? `/images/nfts/${profile.nft?.images.sm}` : undefined,
        profileLink: '/profile',
        noProfileLink: '/profile',
        showPip: !profile?.username,
      }}
      {...props}
    />
  )
}

export default Menu
