import React, { ChangeEvent, useState } from 'react'
import Wrapper from "components/Popup/Wrapper"
import { Text, Box, Flex, Input, InputGroup, InputRightAddon } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { Button } from 'components/Pancake-uikit'
import heroConfig from 'config/constants/gameConfig/heroConfig.json'
import styled from 'styled-components'
import { formatNumber } from 'utils/formatBalance'
import Fee from 'components/Popup/Fee'

const PopupSellHero = ({ close, heroesDetail, idHero, isAllowance, onApprove, approveTx, onSell, pendingTx, minPrice }) => {
	const FEE = 4.68
	const MAX_VALUE = 1000000000
	const heroProps = heroConfig[heroesDetail.heroId - 1]
	const newHero = Object.assign(heroesDetail, heroProps)
	const [prices, setPrices] = useState('')
	const [invalidPrice, setInvalidPrice] = useState(false)

	const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
		const {value} = evt.currentTarget
		const price = Number(value) > MAX_VALUE ? MAX_VALUE : Number(value)
		setInvalidPrice(Number(price) < minPrice)
		setPrices(price.toString())
	}
	
	return (
		<Wrapper>
			<Container borderBottom="1px solid #525252">
				<Flex>
					<Text fontSize={16} fontWeight={700}>Sell <Text as="span" fontWeight="bold" textColor="yellow.500">{newHero.name}</Text> on Marketplace</Text>
				</Flex>
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
			<Flex flexDirection="column" gridGap={5} justifyContent="space-between" padding={5} minHeight={240}>
				<Flex flexDirection="column" gridGap={1}>
					<Text>Price:</Text>
					<InputGroup>
						<Input
							type="number"
							placeholder="Enter Price"
							pattern="[0-9]"
							borderColor="#555"
							backgroundColor="#222"
							max={MAX_VALUE}
							onChange={handleChange}
							_focus={{
								borderColor: 'none'
							}}
						/>
						<InputRightAddon backgroundColor="#333" borderColor="#555">
							<Flex gridGap={1} alignItems="center">
								<img src='/images/coins/busd.png' alt='busd' className="w-5 h-5 object-cover" /> BUSD
							</Flex>
						</InputRightAddon>
					</InputGroup>
					{
						invalidPrice && <Text fontSize={12} textColor='red.500' >Min prices is {formatNumber(minPrice)}</Text>
					}
				</Flex>
				{
					Number(prices) > 0 && <Flex>
					<Text>Selling <span className='text-yellow-400'>{ newHero.name } - #{idHero}</span> with <span className='font-bold text-yellow-400'>{formatNumber(Number(prices))}</span> BUSD ?</Text>
				</Flex>
				}
				<Fee fee={FEE} prices={prices} symbol='BUSD'/>
				<Flex justifyContent="space-between">
					<Button variant='text' onClick={close}>Cancel</Button>
					{
						isAllowance
						?
							<Button disabled={pendingTx} onClick={() => onSell(Number(prices))}>{ pendingTx ? 'Selling...' : 'Sell'}</Button>
						:
							<Button onClick={onApprove} disabled={approveTx}>
								<Text fontSize={12}>{ approveTx ? `Approving...` : `Approve marketplace` }</Text>
							</Button>
					}
				</Flex>
			</Flex>
		</Wrapper>
	)
}

const Container = styled(Box)`
  padding: 20px 30px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

export default PopupSellHero