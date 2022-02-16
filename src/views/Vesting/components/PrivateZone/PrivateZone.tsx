import React , {useState, useEffect} from 'react'
import styled from '@emotion/styled'
import {
    Box
} from '@mui/material'
import Page from 'components/Layout/Page'
import history from 'routerHistory'
import useToast from 'hooks/useToast'
import {useCallWithGasPrice} from 'hooks/useCallWithGasPrice'
import {useVesting} from 'hooks/useContract'

import { Button , useMatchBreakpoints , Skeleton } from '@pancakeswap/uikit'
import { useFetchVestingTGE } from 'views/Vesting/hooks/useFetchVesting'
import { formatNumber } from 'utils/formatBalance'
import { useWeb3React } from '@web3-react/core'

const PrivateZone = () => {
    const {isMobile} = useMatchBreakpoints()
    const [isClaimedTGE, setIsClaimTGE] = useState(false)
    const {account} = useWeb3React()

    const [pendingTx, setPendingTx] = useState(false)
    const {toastSuccess, toastError} = useToast()
    const {callWithGasPrice} = useCallWithGasPrice()
    const vestingContract = useVesting()


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

    console.log(vestable)

    
    return (
        <Page>
            <BackButton variant='text' onClick={() => history.push('/vesting')}>
                Back
            </BackButton>
            <Wrapper sx={{
                gridTemplateColumns: isMobile ? '100%' : '50% 50%'
            }}>
                <Col>
                    <StyledBox>
                        <div style={{color: '#E6AB58', fontWeight: '700'}}>Your Vesting Balance</div>
                        <Flex>
                            <img src="/images/coins/adt.png" alt="" width="27px" />
                            <Money>
                            {getAllocation ? formatNumber(getAllocation) : <Skeleton/>} ADT
                            </Money>
                        </Flex>
                        <div style={{color: '#E6AB58', fontWeight: '700'}}>Token Claimed</div>
                        <Flex>
                            <img src="/images/coins/adt.png" alt="" width="27px" />
                            <Money>
                            {getReleased ? formatNumber(getReleased) : '0'} ADT
                            </Money>
                        </Flex>
                    </StyledBox>
                    <StyledBox>
                        <div style={{color: '#E6AB58', fontWeight: '700'}}>Claimable token</div>
                        <Flex>
                            <img src="/images/coins/adt.png" alt="" width="27px" />
                            <Money>
                            {vestable ? formatNumber(vestable): <Skeleton/>} ADT
                            </Money>
                        </Flex>
                        <Button
                            disabled={vestable === 0}
                            onClick={() => handleClaim()}
                        >
                            Claim
                        </Button>
                    </StyledBox>
                </Col>
                <Col>
                    <Card>
                        <CardHeader>
                            <Box sx={{
                                fontSize: '22px',
                                color: '#E6AB58',
                                fontWeight: '700'
                            }}>Private Sale Round</Box>
                        </CardHeader>
                        <CardBody>
                            <Flex justifyContent='space-between'>
                                <div>
                                    Max Supply:
                                </div>
                                <div style={{fontSize: '16px', fontWeight: '700'}} >
                                    17.000.000 ADT
                                </div>
                            </Flex>
                            <Flex justifyContent='space-between'>
                                <div>
                                    Price:
                                </div>
                                <div style={{fontSize: '16px', fontWeight: '700'}} >
                                    1 ADT = 0.075 BUSD
                                </div>
                            </Flex>
                        </CardBody>
                        <CardDiscription>
                            In case you would like to sell your $ADT, we ask that you strictly follow the Price Management Policy below: 
                            <ul>
                                <li>
                                    Between 19th January 2022 and 25th January 2022 (23:59 UTC): Maximum sale amount of $ADT tokens is BUSD 1,000 (or equivalent) per transaction and no more than twenty-five (25) sale transactions per day. </li>
                                <li>
                                    Between 26th January 2022 (00:00 UTC) and 5th February 2022 (23:59 UTC): Maximum sale amount of $ADT tokens is BUSD 1,500 (or equivalent) per transaction and no more than thirty (30) sale transactions per day.                                </li>
                                <li>
                                    Between 6th February 2022 (00:00 UTC) and 20th February 2022 (23:59 UTC): Maximum sale amount of $ADT tokens is BUSD 2,000 (or equivalent) per transaction and no more than thirty-five (35) sale transactions per day.                                </li>
                                <li>
                                The limitations above apply to your wallet address and any other wallet addresses that you transfer the $ADT tokens to. It will be considered to be a breach if any or all of such wallet addresses breach the policy set out above.                                </li>
                            </ul>
                        </CardDiscription>
                    </Card>
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
    background: #181819;
    border: 1px solid #D8D8D8;
    border-radius: 12px;
    width: 100%;
`
const Money = styled(Box)`
    font-size: 20px;
    font-weight: 700
`
const Card = styled(Box)`
    background: rgba(255,255,255, .05);
    border: 1px solid #747475;
    border-radius: 10px;
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
  border-bottom: 1px solid #747475;
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
export default PrivateZone
