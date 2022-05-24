import React, { ChangeEvent, useState } from 'react'
import Wrapper from "components/Popup/Wrapper"
import { Text, Box, Flex, Input, InputGroup, InputRightAddon } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { Button } from 'components/Pancake-uikit'
import heroConfig from 'config/constants/gameConfig/heroConfig.json'
import { useWeb3React } from '@web3-react/core'
import web3 from 'web3'
import styled from 'styled-components'
import { formatNumber } from 'utils/formatBalance'

const PopupTransferHero = ({ close, heroesDetail, idHero, pendingTx, onSend }) => {
	const { account } = useWeb3React()
	const heroProps = heroConfig[heroesDetail.heroId - 1]
	const newHero = Object.assign(heroesDetail, heroProps)
	const [validAddress, setValidAddress] = useState(false)
	const [isYour, setIsYour] = useState(false)
	const [walletAddress, setWalletAddress] = useState(null)

	const onChangeAddress = (event: any) => {
		const value = event.target.value
		setWalletAddress(value)
		const isValid = web3.utils.isAddress(value)
		setValidAddress(isValid)
		setIsYour(account === value)
	}
	
	return (
		<Wrapper>
			<Container borderBottom="1px solid #525252">
				<Text fontWeight="700" fontSize={16}>Transfer Hero</Text>
				<Box
					cursor="pointer"
					sx={{
						'&:hover': {
							opacity: '.8',
						},
					}}
					onClick={close}
				>
					<CloseIcon />
				</Box>
			</Container>
			<Flex flexDirection="column" justifyContent="flex-start" width="100%" gridGap={1} padding={5} minHeight={100}>
				<Flex flexDirection="column" gridGap={1}>
					<Text color="#b5b5b5" fontSize={14}>You are about to transfer <Text as="span" textColor='yellow.500'>{heroesDetail.name} - #{heroesDetail.seq_id}</Text></Text>
					<Text fontSize={12} mt={5}>Wallet Address:</Text>
					<Flex flexDirection="column" gridGap={1}>
						<Input 
							placeholder='Enter wallet address'
							borderColor={!isYour && validAddress ? 'green.500' : 'red.500'}
							backgroundColor="#222"
							autoComplete='off'
							textColor="#b5b5b5"
							disabled={pendingTx}
							sx={{
								'&:focus, &:active': {
								borderColor: '#ddd',
								boxShadow: 'none'
								},
							}}
							maxLength={42}
							value={walletAddress}
							onChange={(v) => onChangeAddress(v)}
						/>
						{ isYour && <Text fontSize={11} textColor='red.500'>You cannot transfer to yourself</Text>}
						{ walletAddress && <Text fontSize={11} textColor={validAddress ? null : 'red.500' }>{ validAddress ? null : 'Invalid address'}</Text> }
					</Flex>
					{
						(walletAddress && validAddress && !isYour) && <Text my={2} fontSize={12}>
						You will send <span className='font-bold text-yellow-400'>{heroesDetail.name} - #{heroesDetail.seq_id}</span> to <span className='text-yellow-400 font-bold'>{walletAddress}</span>
						</Text>
					}
				</Flex>
				<Flex justifyContent="space-between" mt={5}>
					<Button variant='text' onClick={close}>Cancel</Button>
					<Button disabled={pendingTx} onClick={() => onSend(walletAddress)}>{ pendingTx ? 'Sending...' : 'Send' }</Button>
				</Flex>
			</Flex>
		</Wrapper>
	)
}

const Container = styled(Box)`
	padding: 10px 30px;
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
`

export default PopupTransferHero