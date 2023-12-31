import styled from 'styled-components'
import {OverlayProps} from './types'

const Overlay = styled.div.attrs({role: 'presentation'})<OverlayProps>`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: ${({theme}) => theme.colors.overlay};
  transition: opacity 0.4s;
  opacity: ${({show}) => (show ? 0.6 : 0)};
  z-index: ${({zIndex}) => zIndex};
  pointer-events: ${({show}) => (show ? 'initial' : 'none')};
  backdrop-filter: blur(355px);
`

Overlay.defaultProps = {
  show: false,
  zIndex: 20,
}

export default Overlay
