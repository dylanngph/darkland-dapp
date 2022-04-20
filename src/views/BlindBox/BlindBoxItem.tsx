import React , {useState , useEffect} from 'react'
import styled from '@emotion/styled'
import {Box, keyframes} from '@mui/material'
import {ReactComponent as PlusIcon} from 'assets/icons/plus.svg'
import {ReactComponent as MinusIcon} from 'assets/icons/minus.svg'
import { formatNumber } from 'utils/formatBalance'
import { Button } from 'components/Pancake-uikit'
import { Text, useModal } from '@pancakeswap/uikit'
import Popup from 'reactjs-popup'
import PendingTransactionModal from 'components/PendingTransaction/PendingTransaction'
import ApproveModal from 'components/ApproveModal/ApproveModal'
import TokenModal from 'components/TokenModal/TokenModal'
import { getAddress } from 'utils/addressHelpers'
import tokens from 'config/constants/tokens'
import { useBlindBoxContract, useERC20 } from 'hooks/useContract'
import { blindBoxConfig } from 'config/constants'
import checkAllowance from 'utils/checkAllowance'
import checkBalance from 'utils/checkBalance'
import { useWeb3React } from '@web3-react/core'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useToast from 'hooks/useToast'


export type Prop = {
  isMobile?: boolean
  type?: string
  rate?: {
    common: number,
    rare: number,
    epic: number,
    legend: number
  }
  typeBox?: number
  dataBox?: {
    price: number,
    maxBox: number,
    totalBox: number
  }
  isDiscount?: boolean
  percent?: number
  isWhitelist?: boolean
  isUserHadBuyBox?: boolean
}


const BlindBoxItem = ({ isMobile , type, rate, dataBox, isDiscount = false, percent = 0, isUserHadBuyBox = false, isWhitelist = false, typeBox }:Prop) => {
  const [quantity , setQuantity] = useState(1)
  const { account } = useWeb3React()
  const [pendingTx, setPendingTx] = useState(false)
  const tokenContract = useERC20(getAddress(tokens.big.address))
  const blindBoxContract = useBlindBoxContract()
  const { toastError, toastSuccess } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const [openModalApprove] = useModal(<ApproveModal 
    contractApprove={tokenContract} 
    contractNeedApprove={getAddress(blindBoxConfig.contractAddress)}
    title="Enable NFT Box"
  />, false)
  const [openModalToken] = useModal(<TokenModal symbol='BIG'/>, false)

  const remaining = dataBox.maxBox - dataBox.totalBox
  const isSoldOut = remaining <= 0

  useEffect(() => {
    if(quantity < 0) setQuantity(0)
  },[quantity])

  const handleBuy = async() => {
    try {
      const allowance = await checkAllowance(account, tokens.big.address, blindBoxConfig.contractAddress)
      const balance = await checkBalance(account, tokens.big.address, tokens.big.decimals)
      if (!allowance) {
        openModalApprove()
        return
      } if (!balance) {
        openModalToken()
        return
      }
      setPendingTx(true)
      const tx = await callWithGasPrice(blindBoxContract, 'buyNFTWhitelist', [typeBox])
      const rep = await tx.wait()
      toastSuccess("Success", "Bought successful !")
    } catch(error) {
      console.log("error")
      toastError("Error", error?.data?.message)
    }
    finally {
      setPendingTx(false)
    }
  }


  return (
    <>
      <Flex sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        flexDirection: isMobile ? 'column' : 'row',
        gap: '20px'
      }}>
        <Col sx={{
          alignItems: 'center'
        }}>
          <BoxWrapper>
            <img src={`images/blindbox/${type}_box.png`} alt="" width="250px" />
          </BoxWrapper>
          <img src="images/tokens/box_plate.png" alt="" width="300px" />
        </Col>
        <Col sx={{gap: '20px'}}>
          <Flex sx={{
            alignItems: 'center',
            gap: '10px'
          }}>
            <img src="images/blindbox/TitleDivider.png" alt='' width="8px" />
            <Col sx={{gap: '10px',textTransform: 'uppercase'}}>
              <Box sx={{fontSize: '20px'}}>
                Box
              </Box>
              <Box sx={{
                fontSize: '48px',
                fontWeight: '700',
              }}>
                {type === 'common' ? 'Mystery' : 'Premium'}
              </Box>
            </Col>
          </Flex>
          <Box sx={{color: '#C0C0C0', fontSize: '20px', fontWeight: '700'}}>
            Drop rate
          </Box>
          <Flex sx={{gap: '20px', flexWrap: 'wrap'}}>
              <RateBox sx={{background: '#006CBE'}}>
                  <div>Common</div>
                  <Box sx={{fontSize: '24px', fontWeight: '700'}} >{rate.common}%</Box>
              </RateBox>
              <RateBox sx={{background: '#7D44DB'}}>
                  <div>Rare</div>
                  <Box sx={{fontSize: '24px', fontWeight: '700'}} >{rate.rare}%</Box>
              </RateBox>
              <RateBox sx={{background: '#E8A500'}}>
                  <div>Epic</div>
                  <Box sx={{fontSize: '24px', fontWeight: '700'}} >{rate.epic}%</Box>
              </RateBox>
              <RateBox sx={{background: '#D40060'}}>
                  <div>Legendary</div>
                  <Box sx={{fontSize: '24px', fontWeight: '700'}} >{rate.legend}%</Box>
              </RateBox>
          </Flex>
          <Flex>
            <Box sx={{ color: '#C0C0C0' }}>Remaining amount: <span style={{ color: 'lime', fontWeight: 'bold' }}>{ remaining <= 0 ? 0 : remaining }</span></Box>
          </Flex>
          {
            isWhitelist
            ?
            <>
            <Flex sx={{alignItems: 'center',gap: '10px'}}>
              <img src="images/coins/big.png" alt="" width="50px" />
              <Box sx={{
                fontSize: '26px',
                fontWeight: '700'
              }}>
              {
                isDiscount 
                ?
                <Flex gap={2} flexWrap="wrap">
                  <Box>{ formatNumber(dataBox.price - (dataBox.price * percent / 100)) } BIG </Box> 
                  <Box sx={{ color: '#A8A8A8', textDecoration: 'line-through' }}>{formatNumber(dataBox.price)} BIG</Box>
                  <Box sx={{ color: 'red' }}>(-{percent}%)</Box>
                </Flex>
                : <Box>{ formatNumber(dataBox.price, 0, 0) } BIG</Box>
              }
              </Box>
            </Flex>
            <StyleButton variant='primary' disabled={isSoldOut} onClick={handleBuy}>
            { isSoldOut ? "Sold out" : "Purchase"}
            </StyleButton>
            </>
            :
            <Button disabled>You&apos;re not whitelisted</Button>
          }
        </Col>
      </Flex>
      <Popup className="w-full" modal closeOnDocumentClick={false} open={pendingTx}>
      {(close) => <PendingTransactionModal/> }
      </Popup>
    </>
  )
}

const Floating = keyframes`
  0% {
    transform: translateY(0)
  }
  50% {
    transform: translateY(-10px)
  }
  100% {
    transform: translateY(0)
  }
`

const Flex = styled(Box)`
  display: flex;
`
const Col = styled(Box)`
  display: flex;
  flex-direction: column;
`
const RateBox = styled(Box)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
  padding: 10px 25px;
  border-radius: 8px;
`
const InputButton = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background: #00A3FF;
  min-width: 65px;
  min-height: 30px;
  cursor:  pointer;
  transition: .1s ease-in;
  :hover {
    opacity: .8
  }
`
const StyleButton = styled(Button)`
  display: flex;
  border-radius: 0;
  background-color: #FFA800;
  border-bottom: 7px solid #C16000;
  font-weight: 700;
  text-transform: none;
  height: 3rem;
  :hover {
    background-color: rgba(255, 168, 0, .8);
  }
`
const BoxWrapper = styled(Box)`
  animation: ${Floating} 3s linear infinite;
`


export default BlindBoxItem