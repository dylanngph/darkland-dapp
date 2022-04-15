import React, { useEffect, useState } from 'react'
import {
	Box,
    ButtonMenu,
    ButtonMenuItem,
    CloseIcon,
    Heading,
    IconButton,
    InjectedModalProps,
    ModalBody,
    ModalContainer,
    ModalHeader as UIKitModalHeader,
    ModalTitle,
	Text
} from '@pancakeswap/uikit'
import styled from 'styled-components'

export const ModalContainerUI: React.FC = ({children}, props) => {
    return(
        <Container {...props}>{ children }</Container>
    )
}

export const ModalHeaderUI: React.FC = ({ children }) => {
    return(
        <Header>{ children }</Header>
    )
}

const Container = styled(ModalContainer)`
    border-radius: 0;
`

const Header = styled(UIKitModalHeader)`
    border-bottom: none;
`