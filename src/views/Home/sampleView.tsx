import React from 'react'
import styled from '@emotion/styled'
import {
    Box
} from '@mui/material'
import { Button, useMatchBreakpoints } from '@pancakeswap/uikit'
import Title from 'components/Layout/Title'
import MarketplaceItem from './components/MarketplaceItem';
import FarmPoolItem from './components/FarmPoolItem';

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
                <Title mb={5} text="Marketplace" icon='/images/icons/marketplace-icon.png' />
                <Box>
                    <MarketplaceItem buttonTitle='MYSTERY BOX' imageUrl='/images/marketplace-images/MYSTERY-BOX.png' />
                    <MarketplaceItem buttonTitle='MYSTERY WAEPON' imageUrl='/images/marketplace-images/MYSTERY-WAEPON.png' />
                    <MarketplaceItem buttonTitle='MYSTERY ARMOR' imageUrl='/images/marketplace-images/MYSTERY-ARMOR.png' />
                    <MarketplaceItem buttonTitle='MYSTERY HELMET' imageUrl='/images/marketplace-images/MYSTERY-HELMET.png' />
                </Box>
            </Section>
            <Section mt={5} mb={5}>
                <ImageDecord className='decord-left' src="/images/avarta-arrow/men-arrow.png" alt="men-arrow" />
                <ImageDecord className='decord-right' src="/images/avarta-arrow/girld-arrow.png" alt="girld-arrow" />
            </Section>
            <Section sx={{marginTop: '100px'}}>
                <Title mb={5} text="Farm & Pool" icon='/images/icons/farm-pool-icon.png' />
                <Box sx={{display: 'flex'}}>
                    <FarmPoolItem title='Liquidity' price='$456.565' />
                    <FarmPoolItem title='Liquidity' price='$456.565' />
                    <FarmPoolItem title='Liquidity' price='$456.565' buttonTitle='Connect Wallet' />
                </Box>
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
const Section = styled(Box)`
    position: relative;

    .decord-left {
        left: -90px;
        z-index: -1;
    }

    .decord-right {
        right: -90px;
        z-index: -1;z
    }
`
const ImageDecord = styled.img`
    position: absolute;
`

export default SampleView
