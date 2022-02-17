import React from 'react'
import styled from '@emotion/styled'
import {
    Box
} from '@mui/material'
import { Button, useMatchBreakpoints } from '@pancakeswap/uikit'
import Title from 'components/Layout/Title'

const SampleView = () => {
    const { isMobile } = useMatchBreakpoints()

    return (
        <Wrapper>
            {/* <Header>
                <img src="/images/coins/adt.png" alt="" />
                <div>
                    <span style={{fontSize: '30px', fontWeight: '700'}}>DotArcade TOKEN</span>
                    <div>Hold ADT to take part in our events !</div> 
                </div>
            </Header> */}
            <Header>
                <div>
                    <WrapImage>
                        <img src="/images/welcome.png" alt="welcome" />
                        <img src="/images/dark-land.png" alt="dark-land" />
                        <Button>PLAY TO EARN NOW</Button>
                        <Socials>
                            {/* <ul>
                                <li></li>
                            </ul> */}
                        </Socials>
                    </WrapImage>
                </div>
            </Header>
            <Section>
                <Title text="Marketplace" icon='/images/icons/marketplace-icon.png' />
                <GridLayout sx={{
                    gridTemplateColumns: isMobile ? 'auto' : 'auto auto auto auto',
                    justifyContent: isMobile ? 'center' : null
                }}>
                    <img src="/images/card1.png" alt="" />
                    <img src="/images/card2.png" alt="" />
                    <img src="/images/card3.png" alt="" />
                    <img src="/images/card4.png" alt="" />
                </GridLayout>
            </Section>
        </Wrapper>
    )
}
const Wrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 20px;
`
const WrapImage = styled(Box)`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    top: 15%;
    position: absolute;
    left: 5%;
    
    > img {
        width: auto;
        max-width: fit-content;
        margin-bottom: 24px;
    }
`

const Socials = styled(Box)`

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
    background-image: url('/images/dark-land-banner.png');
    background-repeat: no-repeat;
    background-size: contain;
    aspect-ratio: 2/1.0313;
    position: relative;
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

const Money = styled(Box)`
    font-size: 20px;
    font-weight: 700;
    color: #fff
`

const Section = styled(Box)`

`

export default SampleView
