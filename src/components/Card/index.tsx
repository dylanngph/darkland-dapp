import styled from 'styled-components'
import {Box} from '@pancakeswap/uikit'

const Card = styled(Box)<{
  width?: string
  padding?: string
  border?: string
  borderRadius?: string
}>`
  width: ${({width}) => width ?? '100%'};
  border-radius: 16px;
  padding: 1.25rem;
  padding: ${({padding}) => padding};
  border: ${({border}) => border};
  border-radius: ${({borderRadius}) => borderRadius};
  background: ${({theme}) => theme.colors.gradients.red};
`
export default Card

export const LightCard = styled(Card)`
  border: 1px solid ${({theme}) => theme.colors.background};
  background-color: rgba(255,255,255,.05);
`

export const LightGreyCard = styled(Card)`
  border: 1px solid ${({theme}) => theme.colors.cardBorder};
  background-color: ${({theme}) => theme.colors.background};
`

export const GreyCard = styled(Card)`
  background-color: ${({theme}) => theme.colors.dropdown};
`
