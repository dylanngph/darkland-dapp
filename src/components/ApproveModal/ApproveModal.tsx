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
} from '@pancakeswap/uikit'
import {MaxUint256} from '@ethersproject/constants'
import { Button } from 'components/Pancake-uikit'
import styled from 'styled-components'
import history from 'routerHistory'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useToast from 'hooks/useToast'
import { useTranslation } from 'contexts/Localization'

interface BuyTokenProps extends InjectedModalProps {
	contractApprove: any,
	contractNeedApprove: string
	title?: string
}

const ApproveModal: React.FC<BuyTokenProps> = ({ contractApprove, contractNeedApprove, title, onDismiss }) => {
	const { t } = useTranslation()
	const { callWithGasPrice } = useCallWithGasPrice()
	const [pendingTx, setPendingTx] = useState(false)
	const {toastError, toastSuccess} = useToast()
	const handleBuy = async() => {
		try {
			setPendingTx(true)
			const tx = await callWithGasPrice(contractApprove, 'approve', [contractNeedApprove, MaxUint256])
			const receipt = await tx.wait()
			toastSuccess('Success', t(`Approved`))
			onDismiss()
		} catch(error) {
			toastError('Error', error?.data?.message)
		} finally {
			setPendingTx(false)
		}
	}
	return(
		<ModalContainer title='Balance Alert' minWidth="320px">
			<ModalHeader>
				<ModalTitle>
					<Heading>{ title }</Heading>
				</ModalTitle>
				<IconButton variant="text" onClick={onDismiss}>
					<CloseIcon width="24px" color="text" />
				</IconButton>
			</ModalHeader>
			<ModalBody p="24px" maxWidth="400px" width="100%">
				<Box minHeight='auto'> 
					<Button width='100%' onClick={handleBuy} disabled={pendingTx}>{ pendingTx ? 'Progressing..' : 'Approve Contract' }</Button>
				</Box>
			</ModalBody>
		</ModalContainer>
	)
}

const ModalHeader = styled(UIKitModalHeader)`
  background: ${({theme}) => theme.colors.gradients.bubblegum};
`

export default ApproveModal