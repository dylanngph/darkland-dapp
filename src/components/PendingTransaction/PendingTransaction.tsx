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
	Text,
	WaitIcon,
} from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { RefreshIcon } from 'components/Pancake-uikit/widgets/Menu/icons'

interface BuyTokenProps extends InjectedModalProps {
	isProgressing?: () => void
}

const PendingTransactionModal: React.FC<BuyTokenProps> = ({ onDismiss, isProgressing }) => {
	const { t } = useTranslation()

	return(
		<Box 
			style={{ backgroundColor: "#091749", boxShadow: "0 0 110px #222", border: "1px solid #01AAC4" }}
			p={3}
			title='Confirming...'
			minWidth="320px"
		>
			<Text textAlign="center" fontSize="24px" color="#fff" fontWeight="bold">Confirming...</Text>
			<ModalBody p="24px" maxWidth="400px" width="100%">
				<RefreshIcon spin width={60} height={60} style={{ fill: "none" }} />
				<Text marginTop={4} fontSize="14px" textAlign="center" color='#C0C0C0'>Please confirm this transaction in your wallet. Wait for the new transaction to be confirmed.</Text>
			</ModalBody>
		</Box>
	)
}

const ModalHeader = styled(UIKitModalHeader)`
  background: ${({theme}) => theme.colors.gradients.bubblegum};
`

export default PendingTransactionModal