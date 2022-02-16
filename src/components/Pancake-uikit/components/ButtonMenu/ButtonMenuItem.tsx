import React from 'react'
import styled from 'styled-components'
import Button from '../Button/Button'
import {BaseButtonProps, PolymorphicComponent, variants} from '../Button/types'
import {ButtonMenuItemProps} from './types'

interface InactiveButtonProps extends BaseButtonProps {
  forwardedAs: BaseButtonProps['as']
}

const InactiveButton: PolymorphicComponent<InactiveButtonProps, 'button'> = styled(Button)<InactiveButtonProps>`
  // background-color: ${({theme}) => theme.colors.backgroundTab};
  // color: ${({theme, variant}) => (variant === variants.PRIMARY ? theme.colors.textTab : theme.colors.textTab)};
  // // border: 1px solid ${({theme}) => theme.colors.borderTab} !important;
  // &:hover:not(:disabled):not(:active) {
  //   background-color: ${({theme, variant}) =>
    variant === variants.PRIMARY ? theme.colors.primary : theme.colors.backgroundTab};
  // }
  background: #3c3a3a;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 26px;
`

const ButtonActive = styled(Button)`
  background: linear-gradient(180deg, #E8A639 0%, #EBB340 50.84%, #F2CA4C 100%);
  border: 1px solid #7a7a7a;
  box-sizing: border-box;
  box-shadow: 0px 4px 17px rgba(0, 0, 0, 0.5);
  border-radius: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ButtonMenuItem: PolymorphicComponent<ButtonMenuItemProps, 'button'> = ({
  isActive = false,
  variant = variants.PRIMARYDARK,
  as,
  ...props
}: ButtonMenuItemProps) => {
  if (!isActive) {
    return <InactiveButton forwardedAs={as} {...props} />
  }

  return <ButtonActive as={as} {...props} />
}

export default ButtonMenuItem
