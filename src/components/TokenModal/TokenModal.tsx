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
import {MaxUint256} from '@ethersproject/constants'
import { Button } from 'components/Pancake-uikit'
import styled from 'styled-components'
import history from 'routerHistory'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useToast from 'hooks/useToast'
import { useTranslation } from 'contexts/Localization'

interface BuyTokenProps extends InjectedModalProps {
	balanceNeed?: number,
	symbol?: string
}

const TokenModal: React.FC<BuyTokenProps> = ({ balanceNeed, symbol, onDismiss }) => {
	const { t } = useTranslation()
	const handleClick = () => {
		history.push('/swap')
		onDismiss()
	}
	return(
		<ModalContainer title='Balance Alert' minWidth="320px">
			<ModalHeader>
				<ModalTitle>
					<Heading>Not enought balance</Heading>
				</ModalTitle>
				<IconButton variant="text" onClick={onDismiss}>
					<CloseIcon width="24px" color="text" />
				</IconButton>
			</ModalHeader>
			<ModalBody p="24px" maxWidth="400px" width="100%">
				<Box minHeight='auto'> 
					<Text mb={2} textAlign='center' color='red'>Your balance is not enough</Text>
					<Button width='100%' onClick={handleClick}>Buy Now</Button>
				</Box>
			</ModalBody>
		</ModalContainer>
	)
}

const ModalHeader = styled(UIKitModalHeader)`
  background: ${({theme}) => theme.colors.gradients.bubblegum};
`

export default TokenModal