import React, { useEffect, useState } from 'react'
import {
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
} from '@pancakeswap/uikit'
import { Button } from 'components/Pancake-uikit'
import styled from 'styled-components'
import { Flex, Text } from '@chakra-ui/react'
import history from 'routerHistory'

interface BuyTokenProps extends InjectedModalProps {
	tokenNeedHold?: number
}

const BuyToken: React.FC<BuyTokenProps> = ({ tokenNeedHold, onDismiss }) => {
	const handleBuy = () => {
		history.push('/swap')
		onDismiss()
	}
	return(
		<ModalContainer title='Balance Alert' minWidth="320px">
			<ModalHeader>
				<ModalTitle>
					<Heading>Balance Alert !!!</Heading>
				</ModalTitle>
				<IconButton variant="text" onClick={onDismiss}>
					<CloseIcon width="24px" color="text" />
				</IconButton>
			</ModalHeader>
			<ModalBody p="24px" maxWidth="400px" width="100%">
				<Flex minHeight={120} flexDirection='column' justifyContent='space-between'>
					<Text textColor="white">You need hold more than <Text as="span" fontWeight="bold" textColor="yellow.500">{tokenNeedHold} ADT</Text> for add to game</Text>
					<Button onClick={handleBuy}>Buy ADT</Button>
				</Flex>
			</ModalBody>
		</ModalContainer>
	)
}

const ModalHeader = styled(UIKitModalHeader)`
  background: ${({theme}) => theme.colors.gradients.bubblegum};
`

export default BuyToken