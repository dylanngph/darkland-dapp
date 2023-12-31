import React from 'react'
import { Flex, Text } from "@chakra-ui/react"
import { formatNumber } from 'utils/formatBalance'

interface Props {
    symbol?: string
    fee?: number
    prices?: any
}

const Fee: React.FC<Props> = ({ fee, prices, symbol }) => {
    return (
        <Flex gridGap={1} flexDirection="column">
            <Flex justifyContent="space-between">
                <Text fontSize={12} textColor="#ddd">Transaction fee <span className='text-white'>({fee}%)</span>:</Text>
                <Text fontSize={12} fontWeight="bold"><span className='text-yellow-400'>{ formatNumber(Number(prices) * fee / 100)}</span> { symbol }</Text>
            </Flex>
            <Flex justifyContent="space-between">
                <Text fontSize={12} textColor="#ddd">Income:</Text>
                <Text fontSize={12} fontWeight="bold"><span className='text-yellow-400'>{ formatNumber(Number(prices) - (Number(prices) * fee / 100))}</span> { symbol }</Text>
            </Flex>
            <Text fontSize={12} borderLeft="3px solid #f09e00" paddingLeft={1} textColor="#ddd" lineHeight='150%'>
                Your asset will be listed on Marketplace. You can cancel the order so as to get it back.
            </Text>
        </Flex>
    )
}

Fee.defaultProps = {
    symbol: 'BUSD',
    fee: 0.48,
    prices: 0
}

export default Fee