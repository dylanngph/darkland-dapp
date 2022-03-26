import React from 'react'
import styled from 'styled-components'
import {CogIcon} from '../../../components/Svg'
import IconButton from '../../../components/Button/IconButton'
import {MENU_ENTRY_HEIGHT} from '../config'
import {PanelProps, PushedProps} from '../types'
import PrimaryPrice from './PrimaryPrice'
import ThemeSwitcher from './ThemeSwitcher'
import SocialLinks from './SocialLinks'
import LangSelector from './LangSelector'

interface Props extends PanelProps, PushedProps {}

const Container = styled.div`
  flex: none;
  padding: 8px 4px;
  background-color: ${({theme}) => theme.colors.backgroundMenu};
  border-top: solid 2px rgba(133, 133, 133, 0.1);
`

const SettingsEntry = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${MENU_ENTRY_HEIGHT}px;
  padding: 0 8px;
`

const SocialEntry = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 21px;
  margin: 0 21px;
  flex-direction: column;
  background-color: rgba(133, 133, 133, 0.1);
  margin-top: 15px;
  margin-bottom: 45px;
  border-radius: 14px;
  position: relative;
  align-items: flex-start;
  :after {
    content: '';
    position: absolute;
    bottom: -35px;
    left: 0;
    height: 1px;
    background-color: rgba(133, 133, 133, 0.1);
    width: 100%;
  }
`

const PanelFooter: React.FC<Props> = ({
  isPushed,
  pushNav,
  toggleTheme,
  isDark,
  primaryPriceUsd,
  currentLang,
  langs,
  setLang,
}) => {
  if (!isPushed) {
    return (
      <Container>
        <IconButton variant="text" onClick={() => pushNav(true)}>
          <CogIcon />
        </IconButton>
      </Container>
    )
  }

  return (
    <Container>
      <SocialEntry>
        <PrimaryPrice primaryPriceUsd={primaryPriceUsd} />
        {/* <img src="/images/coins/0x244b0fd79fc79d34c26ecf1603e88de7c773a95d.png" width="30px" height="30px" alt="" />
        <b style={{color:'#FFAB00'}}>17.11$</b> */}
      </SocialEntry>
      {/* <SettingsEntry> */}
        {/* <SocialLinks /> */}
        {/* <ThemeSwitcher isDark={isDark} toggleTheme={toggleTheme} /> */}
        {/* <LangSelector currentLang={currentLang} langs={langs} setLang={setLang} /> */}
      {/* </SettingsEntry> */}
    </Container>
  )
}

export default PanelFooter
