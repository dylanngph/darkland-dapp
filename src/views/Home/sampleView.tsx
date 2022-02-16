import React from 'react'
import styled from '@emotion/styled'
import {
    Box
} from '@mui/material'
import { Button, useMatchBreakpoints } from '@pancakeswap/uikit'

const SampleView = () => {
    const { isMobile } = useMatchBreakpoints()

    return (
        <Wrapper>
            <Header>
                <img src="/images/coins/adt.png" alt="" />
                <div>
                    <span style={{fontSize: '30px', fontWeight: '700'}}>DotArcade TOKEN</span>
                    <div>Hold ADT to take part in our events !</div> 
                </div>
            </Header>
            <Flex>
                <Line/>
                <div style={{fontSize: '22px', fontWeight: '700'}}>
                    FARM & POOL
                </div>
            </Flex>
            <DashboardCard>
                <GridLayout sx={{
                    gridTemplateColumns: isMobile ? 'auto' : 'auto auto auto',
                    
                }}>
                    <MiniBox>
                        <Title>Liquidity</Title>
                        <Money>$ ---</Money>
                    </MiniBox>
                    <MiniBox>
                        <Title>Your Investment</Title>
                        <Money>$ ---</Money>
                    </MiniBox>
                    <MiniBox>
                        <Flex justifyContent='space-between'>
                            <Box>
                                <Title>Your Reward</Title>
                                <Money>$ ---</Money>
                            </Box>
                            <Button>
                                Harvest all
                            </Button>
                        </Flex>
                        
                    </MiniBox>
                </GridLayout>
            </DashboardCard>
            <Flex>
                <Line/>
                <div style={{fontSize: '22px', fontWeight: '700'}}>
                    MARKETPLACE
                </div>
                <Box sx={{color: '#E6AB58', border: '1px solid #747475', borderRadius: '10px', padding: '8px 15px', fontWeight: '700', textTransform: 'uppercase'}}>
                    Coming soon
                </Box>
            </Flex>
            <GridLayout sx={{
                gridTemplateColumns: isMobile ? 'auto' : 'auto auto auto auto',
                justifyContent: isMobile ? 'center' : null
            }}>
                <img src="/images/card1.png" alt="" />
                <img src="/images/card2.png" alt="" />
                <img src="/images/card3.png" alt="" />
                <img src="/images/card4.png" alt="" />
            </GridLayout>
        </Wrapper>
    )
}
const Wrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 20px;

`
const Flex = styled(Box)`
    display: flex;
    align-items: center;
    gap: 20px
`
const Header = styled(Box)`
    display: flex;
    gap: 20px;
    align-items: center;
`
const Line = styled(Box)`
    width: 7px;
    height: 21px;
    background: linear-gradient(180deg, #E8A639 0%, #EBB340 50.84%, #F2CA4C 100%); 
`
const DashboardCard = styled(Box)`
    width: 100%;
    border: 1px solid #747475;
    border-radius: 10px;
    padding: 15px;
    background: rgba(255,255,255, .05)
`
const GridLayout = styled(Box)`
    display: grid;
    gap: 15px;
    align-items: center;    
`
const MiniBox = styled(Box)`
    border: 1px solid #747475;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    min-height: 125px
`
const Title = styled(Box)`
    font-size: 16px;
    font-weight: 700;
    color: #E6AB58
`
const Money = styled(Box)`
    font-size: 20px;
    font-weight: 700;
    color: #fff
`

export default SampleView
