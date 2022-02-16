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
import heroestdApi from 'api/heroestdApi'
import { getCookie } from 'utils/cookie'
import { TOKEN_ID, TYPE_LINK_WALLET } from 'contants'
import { useWeb3React } from '@web3-react/core'
import useToast from 'hooks/useToast'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'
import { updateUserInGame } from 'state/user/actions'

interface LinkWalletProps extends InjectedModalProps {
	userData?: any
}

const LinkWallet: React.FC<LinkWalletProps> = ({ userData, onDismiss }) => {
	const dispatch = useDispatch<AppDispatch>()
	const { account } = useWeb3React()
	const { toastError, toastSuccess } = useToast()
	const [isProcess, setIsProcess] = useState(false)
	const handleLink = async() => {
		const tokenId = getCookie(TOKEN_ID)
		setIsProcess(true)
		await heroestdApi.setLinkWallet(account, tokenId)
		.then((data: any) => {
			// console.log("data", data.code)
			const isValid = data?.code === 0 && toastSuccess('Success', TYPE_LINK_WALLET.SUCCESS)
			const newData = { ...userData, walletAddress: account }
			dispatch(updateUserInGame(newData))
			onDismiss()
		})
		.catch((error) => {
			const codeType = error.response.data?.code ?? -1
			switch(codeType) {
				case 24:
					toastError('Error', TYPE_LINK_WALLET.WalletAlreadyLink)
					break
				case 25:
					toastError('Error', TYPE_LINK_WALLET.LinkWalletFail)
					break
				default:
					toastError('Error', 'An error occurred. Please try again later.')
					break
			}
		})
		.finally(() => setIsProcess(false))
	}

	useEffect(() => {
		if (!account) onDismiss()
	}, [account, onDismiss])

	return(
		<ModalContainer title='Link wallet' minWidth="320px">
			<ModalHeader>
				<ModalTitle>
					<Heading>One more step !</Heading>
				</ModalTitle>
				<IconButton variant="text" onClick={onDismiss}>
					<CloseIcon width="24px" color="text" />
				</IconButton>
			</ModalHeader>
			<ModalBody p="24px" maxWidth="400px" width="100%">
				<Flex minHeight={120} flexDirection='column' justifyContent='space-between'>
					<Text color="#727272">Link your wallet address to your game account to continue.</Text>
					<Text fontSize={12} textColor="red.500" fontWeight="bold" my={3}>{account} will link to your account with email { userData?.email }. Are you sure ?</Text>
					<Button onClick={handleLink} disabled={isProcess}>{ isProcess ? 'Processing...' : `Link to ${ userData?.email }` }</Button>
				</Flex>
      </ModalBody>
		</ModalContainer>
	)
}

const ModalHeader = styled(UIKitModalHeader)`
  background: ${({theme}) => theme.colors.gradients.bubblegum};
`

export default LinkWallet