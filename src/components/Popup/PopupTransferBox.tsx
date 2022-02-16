import {Button, Skeleton} from 'components/Pancake-uikit'
import React, {ChangeEvent, useEffect, useRef, useState} from 'react'
import styled from '@emotion/styled'
import {Box,Flex,Text,Input,Select} from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import web3 from 'web3'
import { useFetchBox } from 'views/MyAssets/hooks/useFetchMysteryBox'
import { IBox } from 'views/MyAssets/types'
import {ReactComponent as CloseIcon} from './close.svg'

export default ({close, boxInfo, pendingTx, onTransfer}) => {
  const { account } = useWeb3React()
  const [validAddress, setValidAddress] = useState(false)
  const [isYour, setIsYour] = useState(false)
  const [walletAddress, setWalletAddress] = useState(null)
  const { isAllowance, listsNFT} : IBox = useFetchBox(boxInfo.id)
  const [nftId, setNftId] = useState<number>(null)

  const onChangeAddress = (event: any) => {
    const value = event.target.value
    setWalletAddress(value)
    const isValid = web3.utils.isAddress(value)
    setValidAddress(isValid)
    setIsYour(account === value)
  }

  const handleSelectNft = (evt: any) => {
    const { value } = evt.currentTarget
    setNftId(value)
  }

  return (
    <Wrapper>
      <Container borderBottom="1px solid #525252">
        <Title>Transfer Box</Title>
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
      <Flex padding={5} flex={1} width="100%" justifyContent="center" minHeight={300} minWidth={{ md: 300 }}>
        <Flex flexDirection="column"justifyContent="space-between">
          <Text color="#b5b5b5" fontSize={14}>You are about to transfer {boxInfo.label}</Text>
          <Flex flexDirection="column" gridGap={2}>
            <Select
              placeholder='Please select Box ID'
              colorScheme="#000"
              backgroundColor="#444"
              borderColor="#888"
              sx={{
                '& option': {
                  backgroundColor: '#ddd',
                  color: '#000'
                }
              }}
              _focus={{
                boxShadow: "none"
              }}
              onChange={handleSelectNft}
            >
            {
              listsNFT && listsNFT.map((d) => <option value={d}>{boxInfo.label} - #{d}</option>)
            }
            </Select>
          </Flex>
          <Flex flexDirection="column" gridGap={2}>
            <Text fontSize={14} fontWeight="bolder">To Address:</Text>
            <Input 
              placeholder='Enter wallet address'
              borderColor={!isYour && validAddress ? 'green.500' : 'red.500'}
              backgroundColor="#222"
              autoComplete='false'
              textColor="#b5b5b5"
              sx={{
                '&:focus, &:active': {
                  borderColor: '#ddd',
                  boxShadow: 'none'
                },
              }}
              value={walletAddress}
              onChange={(v) => onChangeAddress(v)}
            />
            { isYour && <Text fontSize={11} textColor='red.500'>You cannot transfer to yourself</Text>}
            { walletAddress && <Text fontSize={11} textColor={validAddress ? null : 'red.500' }>{ validAddress ? null : 'Invalid address'}</Text> }
          </Flex>
          {
            (walletAddress && validAddress && nftId && !isYour) && <Text my={2} fontSize={12}>
              You will send <span className='font-bold text-yellow-400'>{boxInfo.label} - #{nftId}</span> to <span className='text-yellow-400 font-bold'>{walletAddress}</span>
            </Text>
          }
          <Flex justifyContent="space-between">
            <Button onClick={close} variant="text">
              Cancel
            </Button>
            <Button variant="primary" disabled={!walletAddress || !validAddress || !nftId || pendingTx || isYour} onClick={() => onTransfer(account, walletAddress, nftId)}>
              { pendingTx ? 'Transfering...' : 'Confirm' }
            </Button>
          </Flex>
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
  width: 360px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
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
