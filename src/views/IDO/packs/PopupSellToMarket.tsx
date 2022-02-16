import {Button, Skeleton} from 'components/Pancake-uikit'
import React, {ChangeEvent, useEffect, useRef, useState} from 'react'
import styled from '@emotion/styled'
import {Box,Flex,Text,Select,Input,InputGroup,InputRightAddon} from '@chakra-ui/react'
import { useFetchBox } from 'views/MyAssets/hooks/useFetchMysteryBox'
import useToast from 'hooks/useToast'
import {formatNumber} from 'utils/formatBalance'
import { IBox } from 'views/MyAssets/types'
import {ReactComponent as CloseIcon} from './close.svg'

export default ({close, onSell, boxInfo, onApprove, pendingTx, approveTx}) => {
  const FEE = 4.68
  const MAX_VALUE = 1000000000
  const { isAllowance, listsNFT} : IBox = useFetchBox(boxInfo.id)
  const [prices, setPrices] = useState('')
  const [nftId, setNftId] = useState<number>(null)
  const {toastError} = useToast()

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {value} = evt.currentTarget
    const price = Number(value) > MAX_VALUE ? MAX_VALUE : Number(value)
    setPrices(price.toString())
  }

  const handleSelectNft = (evt: any) => {
    const { value } = evt.currentTarget
    setNftId(value)
  }

  return (
    <Wrapper>
      <Container borderBottom="1px solid #525252">
        <Title>Sell on Marketplace</Title>
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
      <Flex flexDirection="column" padding={5} justifyContent="space-between" gridGap={5}>
        <Flex flexDirection="column" gridGap={1}>
          <Select
            placeholder='Please select Box ID'
            colorScheme="#000"
            backgroundColor="#444"
            borderColor="#888"
            cursor="pointer"
            sx={{
              '& option': {
                backgroundColor: '#ddd',
                color: '#000'
              },
            }}
            _focus={{
              boxShadow: "none"
            }}
            onChange={handleSelectNft}
          >
          {
            listsNFT && listsNFT.map((d) => <option key={d} value={d}>{boxInfo.label} - #{d}</option>)
          }
          </Select>
        </Flex>
        <Flex flexDirection="column" gridGap={1}>
          <Text fontWeight="bolder">Price</Text>
          <InputGroup>
            <Input
              type="number"
              placeholder="Enter Price"
              pattern="[0-9]"
              borderColor="#555"
              backgroundColor="#222"
              onChange={handleChange}
              max={MAX_VALUE}
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
        </Flex>
        {
          (nftId && Number(prices) > 0) && <Text fontSize={12}>Selling {boxInfo.label} - <span className='font-bold text-yellow-400'>#{nftId}</span> with <span className='font-bold text-yellow-400'>{formatNumber(Number(prices))}</span> BUSD ?</Text>
        }
        <Flex justifyContent="space-between">
          <Text fontSize={12} textColor="#ddd">Transaction fee <span className='text-white'>({FEE}%)</span>:</Text>
          <Text fontSize={12} fontWeight="bold"><span className='text-yellow-400'>{ formatNumber(Number(prices) * FEE / 100)}</span> BUSD</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text fontSize={12} textColor="#ddd">Income:</Text>
          <Text fontSize={12} fontWeight="bold"><span className='text-yellow-400'>{ formatNumber(Number(prices) - (Number(prices) * FEE / 100))}</span> BUSD</Text>
        </Flex>
        <Text fontSize={12} borderLeft="2px solid #FD476A" paddingLeft={3} textColor="#ddd">
          Your asset will be listed on Marketplace. You can cancel the order so as to get it back.
        </Text>
        <Flex justifyContent="space-between" width="100%">
          <Button onClick={close} variant="text">
            Cancel
          </Button>
          {
            isAllowance
            ?
            <Button variant="primary" disabled={!nftId || Number(prices) <= 0 || pendingTx} onClick={() => onSell(nftId, Number(prices))}>
            { pendingTx ? 'Selling...' : 'Confirm'}
            </Button>
            :
            <Button variant="primary" onClick={onApprove} disabled={approveTx}>
              <Text fontSize={12}>{ approveTx ? 'Approving...' : 'Approve Marketplace' }</Text>
            </Button>
          }
        </Flex>
      </Flex>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  background: linear-gradient(270deg, #000000b3 0, #444444c7 0.01%, #424242d1 105.1%);
  border: 1px solid #52525270;
  border-radius: 12px;
  color: #fff;
  width: 100%;
  max-width: 360px;
  min-height: 300px;
`
const Title = styled(Box)`
  font-size: 21px;
  font-weight: 700;
`
const Container = styled(Box)`
  padding: 20px 30px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`
