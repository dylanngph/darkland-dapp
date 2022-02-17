import {CardViewIcon, IconButton, ListViewIcon} from 'components/Pancake-uikit'
import React from 'react'
import styled from 'styled-components'
import {ViewMode} from '../types'

interface ToggleViewProps {
  viewMode: ViewMode
  onToggle: (mode: ViewMode) => void
}

const Container = styled.div`
  padding-right: 20px !important;
  border: none;
  display: flex;
  ${({theme}) => theme.mediaQueries.sm} {
    border-right: 0.15px solid rgba(151, 151, 151, 0.69);
  }
  /* margin-left: -8px;
  ${({theme}) => theme.mediaQueries.sm} {
    margin-left: 0;
  } */
`

const ToggleView: React.FunctionComponent<ToggleViewProps> = ({viewMode, onToggle}) => {
  const handleToggle = (mode: ViewMode) => {
    if (viewMode !== mode) {
      onToggle(mode)
    }
  }

  return (
    <Container>
      <IconButton style={{background: viewMode === ViewMode.CARD ? 'rgba(0, 191, 213, 0.5)' : '#1A2B6D', border: '0.825px solid #00BFD5', borderRadius: '0'}} variant="text" scale="sm" onClick={() => handleToggle(ViewMode.CARD)}>
        <CardViewIcon color={viewMode === ViewMode.CARD ? '#fff' : '#333'} />
      </IconButton>
      <IconButton style={{background: viewMode === ViewMode.TABLE ? 'rgba(0, 191, 213, 0.5)' : '#1A2B6D', border: '0.825px solid #00BFD5', borderRadius: '0'}} variant="text" scale="sm" onClick={() => handleToggle(ViewMode.TABLE)}>
        <ListViewIcon color={viewMode === ViewMode.TABLE ? '#fff' : '#333'} />
      </IconButton>
    </Container>
  )
}

export default ToggleView
