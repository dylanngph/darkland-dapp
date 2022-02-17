import React from 'react'
import styled from 'styled-components'
import {Text, Flex, Heading, IconButton, ArrowBackIcon, NotificationDot} from 'components/Pancake-uikit'
import {Link} from 'react-router-dom'
import {useExpertModeManager} from 'state/user/hooks'
import GlobalSettings from 'components/Menu/GlobalSettings'
import Transactions from './Transactions'
import QuestionHelper from '../QuestionHelper'

interface Props {
  title: string
  subtitle: string
  helper?: string
  backTo?: string
  noConfig?: boolean
}

const AppHeaderContainer = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 36px;
`

const HeadingDetail = styled.div`
  font-weight: 800;
  font-size: 30px;
  line-height: 41px;
  letter-spacing: -0.114286px;
  color: ${({theme}) => (theme.isDark ? theme.colors.textSubtle : '#171B3D')};
`

const DetailDescription = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  align-items: center;
  color: #8a94a6;
  font-style: normal;
`

const ImageFlex = styled.div`
  img {
    filter: ${({theme}) =>
      theme.isDark && 'invert(64%) sepia(7%) saturate(770%) hue-rotate(180deg) brightness(90%) contrast(88%)'};
  }
`

const AppHeader: React.FC<Props> = ({title, subtitle, helper, backTo, noConfig = false}) => {
  const [expertMode] = useExpertModeManager()

  return (
    <AppHeaderContainer>
      <Flex
        style={{
          paddingRight: '5px',
          flex: 1,
          borderRight: '1px solid #424243'
        }}
        alignItems="center"
        mr={noConfig ? 0 : '16px'}
      >
        {backTo && (
          <IconButton as={Link} to={backTo}>
            <ArrowBackIcon width="32px" />
          </IconButton>
        )}
        <Flex flexDirection="column">
          <HeadingDetail>{title}</HeadingDetail>
          <Flex alignItems="center">
            {helper && <QuestionHelper text={helper} mr="4px" />}
            {subtitle && <DetailDescription>{subtitle}</DetailDescription>}
          </Flex>
        </Flex>
      </Flex>
      {!noConfig && (
        <ImageFlex>
          <NotificationDot show={expertMode}>
            <GlobalSettings />
          </NotificationDot>
          <Transactions />
        </ImageFlex>
      )}
    </AppHeaderContainer>
  )
}

export default AppHeader
