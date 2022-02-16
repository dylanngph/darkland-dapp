import Page from 'components/Layout/Page'
import {useMatchBreakpoints, Button} from 'components/Pancake-uikit'
import React, {useState} from 'react'
import {
  Box,
} from '@mui/material'
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
  const privateSaleData = useFetchPrivate()


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

  const percentRemaining = Number.isNaN((privateSaleData.userRemaining / privateSaleData.totalTokenLock) * 100)
    ? 0
    : (privateSaleData.userRemaining / privateSaleData.totalTokenLock) * 100

  const isMobile = isXl === false

  return (
    <Page>
      <Wrapper>
        <Header>
            <img src="logo.png" alt="" />
            <div>
                <span style={{fontSize: '30px', fontWeight: '700', textTransform: 'uppercase'}}>DotArcade</span>
                <div>Vesting site for investors.</div> 
            </div>
        </Header>
        <Body>
          <LayoutCard sx={{
            gridTemplateColumns: isMobile ? 'auto' :'auto auto auto'
          }}>
            <Card>
              <CardHeader>
                <Box sx={{
                  fontSize: '22px',
                  color: '#E6AB58',
                  fontWeight: '700'
                }}>Private Sales Round</Box>
                <Button variant='secondary' onClick={() => history.push('/vesting/private-round')}>
                  Open
                </Button>
              </CardHeader>
              <CardBody>
                <Flex>
                  <div>
                    Price:
                  </div>
                  <div style={{fontSize: '16px', fontWeight: '700'}} >
                    1 ADT = 0.075 BUSD
                  </div>
                </Flex>
                <Flex>
                  <div>
                    Max Supply:
                  </div>
                  <div style={{fontSize: '16px', fontWeight: '700'}} >
                    17.000.000 ADT
                  </div>
                </Flex>
              </CardBody>
            </Card>


            <Card>
              <CardHeader>
                <Box sx={{
                  fontSize: '22px',
                  color: '#E6AB58',
                  fontWeight: '700'
                }}>Strategic Round</Box>
                <Button variant='secondary' onClick={() => history.push('/vesting/strategic-round')}>
                  Open
                </Button>
              </CardHeader>
              <CardBody>
                <Flex>
                  <div>
                    Price:
                  </div>
                  <div style={{fontSize: '16px', fontWeight: '700'}} >
                    1 ADT = 0.05 BUSD
                  </div> 
                </Flex>
                
                <Flex>
                  <div>
                    Max Supply:
                  </div>
                  <div style={{fontSize: '16px', fontWeight: '700'}} >
                    12.000.000 ADT
                  </div>
                </Flex>
              </CardBody>
            </Card>
          
          </LayoutCard>
        </Body>
      </Wrapper>
    </Page>
  )
}
const Header = styled(Box)`
    display: flex;
    gap: 20px;
    align-items: center;
    background: url('/images/vesting/vesting-bg.png');
    background-position: center;
    object-fit: cover;
    background-size: cover;
    min-height: 144px;
    padding: 20px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border: 1px solid #747475;
`
const Body = styled(Box)`
    display: flex;
    gap: 20px;
    align-items: center;
    padding: 40px 20px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
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
`
const LayoutCard = styled(Box)`
    display: grid;
    gap: 15px;
    align-items: center;
    width: 100%;
`
const Card = styled(Box)`
    background: rgba(255,255,255, .05);
    border: 1px solid #747475;
    border-radius: 10px;
    padding: 20px;
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
