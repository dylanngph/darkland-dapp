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
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from 'state'
import useWeb3Provider from 'hooks/useActiveWeb3React'
import { updateUserInGame } from 'state/user/actions'
import { signMessage } from 'utils/web3React'

interface LinkWalletProps extends InjectedModalProps {
	userData?: any
}

const LinkWallet: React.FC<LinkWalletProps> = ({ onDismiss }) => {
	const userData = useSelector((state: AppState) => state.user.userInfo)
	const dispatch = useDispatch<AppDispatch>()
	const { account } = useWeb3React()
	const {library} = useWeb3Provider()
	const { toastError, toastSuccess } = useToast()
	const [isProcess, setIsProcess] = useState(false)
	const handleLink = async() => {
		const tokenId = getCookie(TOKEN_ID)
		setIsProcess(true)
		const signature = await signMessage(library, account, userData?.email)
		await heroestdApi.linkWallet(account, tokenId, userData?.email, signature)
		.then((data: any) => {
			const isValid = data?.error_code === 0 && toastSuccess('Success', TYPE_LINK_WALLET.SUCCESS)
			const newData = { ...userData, address: account }
			dispatch(updateUserInGame(newData))
			onDismiss()
		})
		.catch((error) => {
			const codeType = error?.message
			toastError('Error', codeType)
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
					<Text fontSize={12} textColor="white" fontWeight="bold" my={3}>{account} will link to your account with email { userData?.email }. Are you sure ?</Text>
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