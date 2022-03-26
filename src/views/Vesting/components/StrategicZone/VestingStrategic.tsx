import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import {
    Box
} from '@mui/material'
import { Hero } from 'components/KShark'
import { Heading, Text } from 'components/Pancake-uikit'
import Page from 'components/Layout/Page'
import history from 'routerHistory'
import TableSection from 'views/Vesting/components/Table/TableSection'
import { Button, useMatchBreakpoints, Skeleton } from '@pancakeswap/uikit'
import { useFetchVestingTGE } from 'views/Vesting/hooks/useFetchVestingStrategic'
import { formatNumber } from 'utils/formatBalance'
import { useVestingStrategic } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useWeb3React } from '@web3-react/core'
import { useFetchVestingTGE as useFetchPrivate, useFetchVestingStage } from 'views/Vesting/hooks/useFetchVesting'
import { ReactComponent as ArrowLeftBrownIcon } from 'assets/icons/ArrowLeftBrown.svg'

const StrategicZone = () => {
    const { isMobile } = useMatchBreakpoints()
    const [isClaimedTGE, setIsClaimTGE] = useState(false)
    const { account } = useWeb3React()

    const stageData = useFetchVestingStage()
    const [pendingTx, setPendingTx] = useState(false)
    const { toastSuccess, toastError } = useToast()
    const { callWithGasPrice } = useCallWithGasPrice()
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
            const tx = await callWithGasPrice(vestingContract, 'claim', [])
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
        canUnlockAmount,
        infoWallet,
        balanceOf,
    } = useFetchVestingTGE()

    return (
        <Page>
            <div className='flex mb-8 items-center'>
                <BackButton variant='text' onClick={() => history.push('/vesting')}>
                    <ArrowLeftBrownIcon />
                    Vesting
                </BackButton>
                <span className='font-bold text-xl mx-2' style={{ fontSize: '22px' }}>/</span>
                <span className='font-bold text-xl'>Seed Round</span>
            </div>
            {/* <Hero>
                <Heading as="h1" size="xl" color="#fff">
                Vesting
                </Heading>
                <Text color="#fff">Stragegic sales round</Text>
            </Hero> */}
            <Wrapper sx={{
                gridTemplateColumns: isMobile ? '100%' : '70% 30%'
            }}>
                <Col>
                    {/* <Card>
                        <TableSection />
                    </Card> */}
                    <StyledBox>
                        <div style={{ color: '#E6AB58', fontWeight: '700' }}>Your Vesting Balance</div>
                        <Flex>
                            <img src="/images/coins/big.png" alt="" width="27px" />
                            <Money>
                                {balanceOf !== undefined ? formatNumber(balanceOf) : 0} BIG
                            </Money>
                        </Flex>
                        <div style={{ color: '#E6AB58', fontWeight: '700' }}>Token Claimed</div>
                        <Flex>
                            <img src="/images/coins/big.png" alt="" width="27px" />
                            <Money>
                                {infoWallet ? formatNumber(infoWallet[1]) : 0} BIG
                            </Money>
                        </Flex>
                        <div style={{ color: '#E6AB58', fontWeight: '700' }}>Token Remaining</div>
                        <Flex>
                            <img src="/images/coins/big.png" alt="" width="27px" />
                            <Money>
                                {infoWallet ? formatNumber(infoWallet[0] - infoWallet[1]) : 0} BIG
                            </Money>
                        </Flex>
                    </StyledBox>
                    <StyledBox>
                        <div style={{ color: '#E6AB58', fontWeight: '700' }}>Claimable token</div>
                        <Flex>
                            <img src="/images/coins/big.png" alt="" width="27px" />
                            <Money>
                                {infoWallet ? formatNumber(infoWallet[2]) : 0} BIG
                            </Money>
                        </Flex>
                        <Button
                            disabled={canUnlockAmount === 0}
                            onClick={() => handleClaim()}
                        >
                            Claim
                        </Button>
                        <Text>*Note: Tokens are vested at the time of TG will be automatically sent to the investors wallets at the time of TGE.</Text>
                    </StyledBox>
                </Col>
                <Col>
                    <StyledBox>
                        <div>
                            <div style={{ fontSize: '22px', fontWeight: '700', borderBottom: '1px solid #747475', paddingBottom: '20px', color: '#FFA800' }}>Seed Round</div>
                            <div style={{ borderBottom: '1px solid #747475', padding: '20px 0', marginBottom: '20px' }}>
                                <Flex justifyContent='space-between' sx={{ marginBottom: '15px' }}>
                                    <div>
                                        Price:
                                    </div>
                                    <div style={{ fontSize: '16px', fontWeight: '700' }} >
                                        1 $BIG = 0.03$
                                    </div>
                                </Flex>
                                <Flex justifyContent='space-between'>
                                    <div>
                                        Token allocation:
                                    </div>
                                    <div style={{ fontSize: '16px', fontWeight: '700' }} >
                                        8,000,000 BIG
                                    </div>
                                </Flex>
                            </div>
                            <div>
                                Thank you for placing your trust and investment in <strong style={{ color: '#FFA800' }}>Dark Land Survival</strong>. We&apos;re honored to have you on board and it&apos;s our responsibility to expand the project&apos;s vision and bring a good return on investment to you!
                                <br />
                                To ensure the success of our project and your return on investment, please follow these instructions:
                                <br />
                                <br />
                                <strong>🎯 First 24 hours</strong>
                                <br />
                                <strong>Limit per order: 500 USD</strong>
                                <br />
                                <strong>Limit: 1 order every 5 minutes</strong>
                                <br />
                                <strong>Limit per day: 5000 USD</strong>
                                <br />
                                <strong>Stop selling when price goes below: 0.15</strong>
                                <br />
                                <br />
                                <strong>🎯  Day 2-7</strong>
                                <br />
                                <strong>Limit per order: 750 USD</strong>
                                <br />
                                <strong>Limit: 1 order every 5 minutes</strong>
                                <br />
                                <strong>Limit per day: 7500 USD</strong>
                                <br />
                                <strong>Stop selling when price goes below: 0.15</strong>
                                <br />
                                <br />
                                <strong>🎯  Day 7 - 30</strong>
                                <br />
                                <strong>Limit per order: 1000 USD</strong>
                                <br />
                                <strong>Limit: 1 order every 2 minutes</strong>
                                <br />
                                <strong>Limit per day: 15000 USD</strong>
                                <br />
                                <strong>Stop selling when price goes below: 0.2</strong>
                                <br />
                                <br />
                                <strong>🎯   After day 30</strong>
                                <br />
                                <strong>Limit per order: 1500 USD</strong>
                                <br />
                                <strong>Limit: 1 order every 2 minutes</strong>
                                <br />
                                <strong>Limit per day: No limit</strong>
                                <br />
                                <strong>Stop selling when price goes below: No restrict</strong>
                                <br />
                                <br />
                                <strong>$BIG listing time : 16:00pm UTC 26/3/2022</strong>
                                <br />
                                <strong>TGE time &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : 18:00pm UTC 26/3/2022</strong>
                            </div>
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
    overflow: auto;
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
    color: #747475;
    padding: 0;
    margin-left: -10px;
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
