import styled from 'styled-components'
import {Card} from '@pancakeswap/uikit'

export const StyledCard = styled(Card)<{isFinished?: boolean}>`
  max-width: 352px;
  margin: 0 8px 24px;
  display: flex;
  flex-direction: column;
  align-self: baseline;
  position: relative;
  color: ${({isFinished, theme}) => theme.colors[isFinished ? 'textDisabled' : 'secondary']};
  background: rgba(255,255,255, .05);
  padding: 0;
  border: 1px solid #747475;

  ${({theme}) => theme.mediaQueries.sm} {
    margin: 0 12px 46px;
  }
`

export default StyledCard
