import Page from 'components/Layout/Page'
import {useMatchBreakpoints, Button} from 'components/Pancake-uikit'
import React, {useState} from 'react'
import {
  Box,
} from '@mui/material'
import {NavLink, Link} from 'react-router-dom'
import useToast from 'hooks/useToast'
import styled from 'styled-components'
import {useCallWithGasPrice} from 'hooks/useCallWithGasPrice'
import {useWeb3React} from '@web3-react/core'
import {useVesting} from 'hooks/useContract'
import history from 'routerHistory'
import {Progress} from '@chakra-ui/react'
import {formatNumber} from 'utils/formatBalance'
import Popup from 'reactjs-popup'
import PopupVesting from './components/PopupVesting'
import TableSection from './components/Table/TableSection'
import Tabs from './components/tabs/Tabs'
import {useFetchVestingTGE as useFetchPrivate, useFetchVestingStage} from './hooks/useFetchVesting'


export const DONT_SHOW_AGAIN = 'DONT_SHOW_AGAIN'

const Vesting = () => {
  const {account} = useWeb3React()
  const {isXl} = useMatchBreakpoints()
  // const privateSaleData = useFetchPrivate()


  // const stageData = useFetchVestingStage()
  // const [pendingTx, setPendingTx] = useState(false)
  // const {toastSuccess, toastError} = useToast()
  // const {callWithGasPrice} = useCallWithGasPrice()

  // const dataSession = Boolean(sessionStorage.getItem(DONT_SHOW_AGAIN)) ?? false

  // const hanldeDontShowAgain = (close) => {
  //   sessionStorage.setItem(DONT_SHOW_AGAIN, 'true')
  //   close()
  // }

  // const handleClaimTGE = async () => {
  //   try {
  //     setPendingTx(true)
  //     const tx = await callWithGasPrice(vestingContract, 'claimTGE', [])
  //     const receipt = await tx.wait()
  //     toastSuccess('Success', 'Your transaction was successful')
  //   } catch (e) {
  //     console.log(e)
  //     toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!')
  //   } finally {
  //     setPendingTx(false)
  //   }
  // }
  // const handleClaimStage = async (params: number) => {
  //   try {
  //     setPendingTx(true)
  //     const tx = await callWithGasPrice(vestingContract, 'claimStage', [params])
  //     const receipt = await tx.wait()
  //     toastSuccess('Success', 'Your transaction was successful')
  //   } catch (e) {
  //     console.log(e)
  //     toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!')
  //   } finally {
  //     setPendingTx(false)
  //   }
  // }


  const isMobile = isXl === false

  return (
    <Wrapper>
      <Header>
          <img src="logo_darkland.png" alt="" />
          <div>
              <span style={{fontSize: '30px', fontWeight: '700', textTransform: 'uppercase'}}>DARKLAND</span>
              <div>Vesting section for investors.</div> 
          </div>
      </Header>
      <Body>
        <LayoutCard sx={{
          gridTemplateColumns: isMobile ? 'auto' :'auto auto'
        }}>
          <Card onClick={() => history.push('/vesting/strategic-round')}>
            <CardHeader>
              <Box sx={{
                fontSize: '22px',
                color: '#ffffff',
                fontWeight: '700',
                '& a:hover': {
                  opacity: '0.7',
                }
              }}><NavLink to='/vesting/strategic-round' aria-hidden="true">Strategic Partners</NavLink></Box>
              {/* <Button variant='secondary' onClick={() => history.push('/vesting/private-round')}>
                Open
              </Button> */}
            </CardHeader>
            <CardBody>
              <Flex>
                <div style={{color: '#F7F7F7'}} >
                  Price:
                </div>
                <div style={{fontSize: '16px', fontWeight: '700'}} >
                  1 BIG = 0.04 BUSD
                </div>
              </Flex>
              <Flex>
                <div style={{color: '#F7F7F7'}} >
                  Token allocation:
                </div>
                <div style={{fontSize: '16px', fontWeight: '700'}} >
                  45,000,000 BIG
                </div>
              </Flex>
              <Flex>
                <div style={{color: '#F7F7F7'}} >
                  Raised:
                </div>
                <div style={{fontSize: '16px', fontWeight: '700'}} >
                  1,800,000$
                </div>
              </Flex>
            </CardBody>
          </Card>

          <Card onClick={() => history.push('/vesting/seed-round')}>
            <CardHeader>
              <Box sx={{
                fontSize: '22px',
                color: '#ffffff',
                fontWeight: '700',
                '& a:hover': {
                  opacity: '0.7',
                }
              }}>
                <NavLink to='/vesting/seed-round' aria-hidden="true">Seed Partners</NavLink>
              </Box>
              {/* <Button variant='secondary' onClick={() => history.push('/vesting/strategic-round')}>
                Open
              </Button> */}
            </CardHeader>
            <CardBody>
              <Flex>
                <div style={{color: '#F7F7F7'}} >
                  Price:
                </div>
                <div style={{fontSize: '16px', fontWeight: '700'}} >
                  1 BIG = 0.03 BUSD
                </div> 
              </Flex>
              <Flex>
                <div style={{color: '#F7F7F7'}} >
                  Token allocation:
                </div>
                <div style={{fontSize: '16px', fontWeight: '700'}} >
                  8,000,000 BIG
                </div> 
              </Flex>
              <Flex>
                <div style={{color: '#F7F7F7'}} >
                  Raised:
                </div>
                <div style={{fontSize: '16px', fontWeight: '700'}} >
                  240,000$
                </div>
              </Flex>
            </CardBody>
          </Card>
          {/* <Card onClick={() => history.push('/vesting/airdrop')}>
            <CardHeader>
              <Box sx={{
                fontSize: '22px',
                color: '#ffffff',
                fontWeight: '700',
                '& a:hover': {
                  opacity: '0.7',
                }
              }}>
                <NavLink to='/vesting/airdrop' aria-hidden="true">Airdrop</NavLink>
              </Box>
              <Button variant='secondary' onClick={() => history.push('/vesting/strategic-round')}>
                Open
              </Button>
            </CardHeader>
            <CardBody>
              <Flex>
                <div style={{color: '#F7F7F7'}} >
                  Price:
                </div>
                <div style={{fontSize: '16px', fontWeight: '700'}} >
                  1 BIG = 0.04 BUSD
                </div> 
              </Flex>
              <Flex>
                <div style={{color: '#F7F7F7'}} >
                  Token allocation:
                </div>
                <div style={{fontSize: '16px', fontWeight: '700'}} >
                  1 BIG = 0.04 BUSD
                </div> 
              </Flex>
              <Flex>
                <div style={{color: '#F7F7F7'}} >
                  Max Supply:
                </div>
                <div style={{fontSize: '16px', fontWeight: '700'}} >
                  0 BIG
                </div>
              </Flex>
            </CardBody>
          </Card> */}
        </LayoutCard>
      </Body>
    </Wrapper>
  )
}
const Header = styled(Box)`
    display: flex;
    gap: 20px;
    align-items: center;
    min-height: 144px;
    padding: 20px;
    background: rgba(26, 43, 109, 0.5);
`
const Body = styled(Box)`
    display: flex;
    gap: 20px;
    align-items: center;
    padding: 40px 20px;
    border: 1px solid #747475;
    border-top: none;
`
const Flex = styled(Box)`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`
const Wrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    background: url('/images/vesting/vesting-img-bg.png');
    background-position: center;
    object-fit: cover;
    background-size: cover;
`
const LayoutCard = styled(Box)`
    display: grid;
    gap: 15px;
    align-items: center;
    width: 100%;
`
const Card = styled(Box)`
    background-color: #1D2D71;
    border: 1px solid #747475;
    // border-radius: 10px;
    padding: 20px;
    color: #ffffff;
    cursor: pointer;

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    }
`
const CardHeader = styled(Box)`
  border-bottom: 1px solid #747475;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
`
const CardBody = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
`
const OpenButton = styled(Button)`

`
export default Vesting
