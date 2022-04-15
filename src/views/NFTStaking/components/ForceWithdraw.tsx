import React, { useEffect, useState } from 'react'
import {
	Box,
    ButtonMenu,
    ButtonMenuItem,
    CloseIcon,
    Heading,
    IconButton,
    ModalContainer,
    InjectedModalProps,
    ModalBody,
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
import { ModalContainerUI, ModalHeaderUI } from 'components/ModalCustom'

interface BuyTokenProps extends InjectedModalProps {
	onConfirm?: () => void
    symbol?: string
    balance?: number
}

const ForceWithdraw: React.FC<BuyTokenProps> = ({symbol, balance, onConfirm, onDismiss }) => {
	const { t } = useTranslation()
	const handleClick = () => {
		onDismiss()
        onConfirm()
	}
	return(
		<ModalContainerUI>
			<ModalHeaderUI>
				<ModalTitle>
					<Heading>Force Withdraw</Heading>
				</ModalTitle>
				<IconButton variant="text" onClick={onDismiss}>
					<CloseIcon width="24px" color="text" style={{ backgroundColor: 'red' }} />
				</IconButton>
			</ModalHeaderUI>
			<ModalBody p="24px" pt={0} maxWidth="400px" width="100%">
				<Box minHeight='auto'>
                    <Box background='#1D2D71' padding={3}>
                        <Text fontSize='12px' mb={2}>Amount</Text>
                        <Text>{balance} {symbol}</Text>
                    </Box>
					<Text my={3} color='#00BFD5' fontSize="14px">Your staking status will be reset after this action !</Text>
					<Button width='100%' onClick={handleClick}>Confirm</Button>
				</Box>
			</ModalBody>
		</ModalContainerUI>
	)
}

const ModalHeader = styled(UIKitModalHeader)`
  background: ${({theme}) => theme.colors.gradients.bubblegum};
`

export default ForceWithdraw