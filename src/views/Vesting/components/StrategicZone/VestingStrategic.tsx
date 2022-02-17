import React , {useState , useEffect} from 'react'
import styled from '@emotion/styled'
import {
    Box
} from '@mui/material'
import { Hero } from 'components/KShark'
import {Heading, Text} from 'components/Pancake-uikit'
import Page from 'components/Layout/Page'
import history from 'routerHistory'
import TableSection from 'views/Vesting/components/Table/TableSection'
import { Button , useMatchBreakpoints , Skeleton } from '@pancakeswap/uikit'
import { useFetchVestingTGE } from 'views/Vesting/hooks/useFetchVestingStrategic'
import { formatNumber } from 'utils/formatBalance'
import { useVestingStrategic } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useWeb3React } from '@web3-react/core'
import {useFetchVestingTGE as useFetchPrivate, useFetchVestingStage} from 'views/Vesting/hooks/useFetchVesting'

const StrategicZone = () => {
    const {isMobile} = useMatchBreakpoints()
    const [isClaimedTGE, setIsClaimTGE] = useState(false)
    const {account} = useWeb3React()

    const stageData = useFetchVestingStage()
    const [pendingTx, setPendingTx] = useState(false)
    const {toastSuccess, toastError} = useToast()
    const {callWithGasPrice} = useCallWithGasPrice()
    const vestingContract = useVestingStrategic()

    const [swictchIndex, setSwitchIndex] = useState(0)


    const handleClaimTGE = async () => {
        try {
            setPendingTx(true)
            const tx = await callWithGasPrice(vestingContract, 'claimTGE', [])
            const receipt = await tx.wait()
            toastSuccess('Success', 'Your transaction was successful')
        } catch (e) {
            console.log(e)
        toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!')
        } finally {
            setPendingTx(false)
        }
    }

    const handleClaimStage = async (params: number) => {
        try {
            setPendingTx(true)
            const tx = await callWithGasPrice(vestingContract, 'claimStage', [params])
            const receipt = await tx.wait()
            toastSuccess('Success', 'Your transaction was successful')
        } catch (e) {
            console.log(e)
            toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!')
        } finally {
            setPendingTx(false)
        }
    }

    const handleClaim = async () => {
        try {
          setPendingTx(true)
          const tx = await callWithGasPrice(vestingContract, 'release', [account])
          const receipt = await tx.wait()
          toastSuccess('Success', 'Your transaction was successful')
        } catch (e) {
          console.log(e)
          toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!')
        } finally {
          setPendingTx(false)
        }
    }

    const {
        getAllocation, 
        getReleased,
        vestable, 
        getTGERelease,
        getCliffDuration
    } = useFetchVestingTGE()

    useEffect(() => {
        if(getTGERelease === 0) setIsClaimTGE(true)
        else setIsClaimTGE(false)
        
    }, [getTGERelease])

    return (
        <Page>
            {/* <BackButton variant='text' onClick={() => history.push('/vesting')}>
                Back
            </BackButton> */}
            <Hero>
                <Heading as="h1" size="xl" color="#fff">
                Vesting
                </Heading>
                <Text color="#fff">Stragegic sales round</Text>
            </Hero>
            <Wrapper sx={{
                gridTemplateColumns: isMobile ? '100%' : '70% 30%'
            }}>
                <Col>
                    <Card>
                        <TableSection />
                    </Card>
                </Col>
                <Col>
                    <StyledBox>
                        <div style={{fontSize: '22px', fontWeight: '700', borderBottom: '1px solid #747475', paddingBottom: '20px' }}>Your Info</div>
                        <div style={{color: '#E6AB58', fontWeight: '500'}}>Your Vesting Balance</div>
                        <Flex>
                            <img src="/images/coins/adt.png" alt="" width="27px" />
                            <Money>
                                {getAllocation ? formatNumber(getAllocation) : <Skeleton/>} ADT
                            </Money>
                        </Flex>
                        <div style={{color: '#E6AB58', fontWeight: '500'}}>Token Claimed</div>
                        <Flex>
                            <img src="/images/coins/adt.png" alt="" width="27px" />
                            <Money>
                                {getReleased ? formatNumber(getReleased) : <Skeleton/>} ADT
                            </Money>
                        </Flex>
                    </StyledBox>
                    <StyledBox>
                        <div>
                            <div style={{fontSize: '22px', fontWeight: '700', borderBottom: '1px solid #747475', paddingBottom: '20px' }}>Stragegic Round</div>
                            <StyledNav>
                                <button type='button' style={swictchIndex === 0 ? styleActive : null} onClick={() => setSwitchIndex(0)}>
                                    <strong>Information</strong>
                                </button>
                                <button type='button' style={swictchIndex === 1 ? styleActive : null} onClick={() => setSwitchIndex(1)}>
                                    <strong>Description</strong>
                                </button>
                            </StyledNav>
                            {swictchIndex === 0 ? (
                                <div>
                                    <Flex justifyContent='space-between' sx={{marginBottom: '15px'}}>
                                        <div>
                                            Max Supply:
                                        </div>
                                        <div style={{fontSize: '16px', fontWeight: '700'}} >
                                            300.000.000 BIG
                                        </div>
                                    </Flex>
                                    <Flex justifyContent='space-between' sx={{marginBottom: '15px'}}>
                                        <div>
                                            Price:
                                        </div>
                                        <div style={{fontSize: '16px', fontWeight: '700'}} >
                                            1 ADT = 0.125 BUSD
                                        </div>
                                    </Flex>
                                </div>
                            ) : (
                                <div>
                                    In case you would like to sell your $ADT, we ask that you strictly follow the Price Management Policy below:
                                    <ul>
                                        <li>
                                        Between 19th January 2022 and 25th January 2022 (23:59 UTC): Maximum sale amount of $ADT tokens is BUSD 1,000 (or equivalent) per transaction and no more than twenty-five (25) sale transactions per day.
                                        </li>
                                        <li>
                                        Between 26th January 2022 (00:00 UTC) and 5th February 2022 (23:59 UTC): Maximum sale amount of $ADT tokens is BUSD 1,500 (or equivalent) per transaction and no more than thirty (30) sale transactions per day.
                                        </li>
                                        <li>
                                        Between 6th February 2022 (00:00 UTC) and 20th February 2022 (23:59 UTC): Maximum sale amount of $ADT tokens is BUSD 2,000 (or equivalent) per transaction and no more than thirty-five (35) sale transactions per day.
                                        </li>
                                        <li>
                                        The limitations above apply to your wallet address and any other wallet addresses that you transfer the $ADT tokens to. It will be considered to be a breach if any or all of such wallet addresses breach the policy set out above.
                                        </li>
                                    </ul>
                                </div>
                            )}
                        {/* <div style={{color: '#E6AB58', fontWeight: '500'}}>Claimable token</div>
                        <Flex>
                            <img src="/images/coins/adt.png" alt="" width="27px" />
                            <Money>
                                {vestable ? formatNumber(vestable): '--'} ADT
                            </Money>
                        </Flex>
                        <Button
                            disabled={vestable === 0}
                            onClick={() => handleClaim()}
                        >
                            Claim
                        </Button> */}
                        </div>
                    </StyledBox>
                </Col>
            </Wrapper>
        </Page>
    )
}

const Wrapper = styled(Box)`
    display: grid;
    gap: 20px;
    justify-content: center;
`
const Col = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
`
const Flex = styled(Box)`
    display: flex;
    align-items: center;
    gap: 15px;
    width: 100%;
`
const StyledBox = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px;
    background: #1A2B6D;
    border: 1px solid #00BFD5;
    width: 100%;
`
const Money = styled(Box)`
    font-size: 20px;
    font-weight: 700
`
const Card = styled(Box)`
    background: #091749;
    border: 1px solid #091749;
    padding: 20px;
    width: 100%;
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
  padding-bottom: 20px;
//   border-bottom: 1px solid #747475;
`
const CardDiscription = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
`
const BackButton = styled(Button)`
    font-size: 22px;
`

const StyledNav = styled.div`
  background: #1A2B6D;
  border: 1px solid #00BFD5;
  margin-top: 24px;
  margin-bottom: 32px;
  justify-content: center;
  text-align: center;
  display: flex;
  overflow: hidden;
  flex-direction: row;
  width: 100%;
  button {
    flex-grow: 1;
    padding-top: 12px;
    padding-bottom: 12px;
    background: #1A2B6D;
    color: #ffffff;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    height: 40px;
    /* border-right: 0.4 solid rgba(151, 151, 151, 0.7) !important; */
    display: inline-block;
    cursor: pointer;
  }
`

const styleActive = {
    background: 'rgba(0, 191, 213, 0.5)',
    color: '#fff',
    boxShadow: '0px 4px 17px rgba(0, 0, 0, 0.5)',
}

const defaultStyle = {
    // borderRight: '0.4px solid rgba(151, 151, 151, 0.7)',
    // borderLeft: '0.4px solid rgba(151, 151, 151, 0.7)',
  }

export default StrategicZone
