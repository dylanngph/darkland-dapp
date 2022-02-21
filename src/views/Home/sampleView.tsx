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
            <Header>
                <div>
                    <WrapImage>
                        <img src="/images/welcome.png" alt="welcome" />
                        <img src="/images/dark-land.png" alt="dark-land" />
                        <PlayToEarn>PLAY TO EARN NOW</PlayToEarn>
                        <Socials>
                            <ul>
                                <li><img src="/images/socials/discord.svg" alt="discord" /></li>
                                <li><img src="/images/socials/telegram.svg" alt="telegram" /></li>
                                <li><img src="/images/socials/twitter.svg" alt="twitter" /></li>
                                <li><img src="/images/socials/facebook.svg" alt="facebook" /></li>
                                <li><img src="/images/socials/youtube.svg" alt="youtube" /></li>
                            </ul>
                        </Socials>
                    </WrapImage>
                </div>
            </Header>
            <Section sx={{paddingLeft: '90px', paddingRight: '90px'}}>
                <Box sx={{maxWidth: '1440px', margin: 'auto'}}>
                    <Title mb={5} text="Marketplace" icon='/images/icons/marketplace-icon.png' />
                    <Box alignItems='end' flexDirection={isMobile ? 'column' : 'row'} sx={{display: 'flex'}}>
                        <MarketplaceItem buttonTitle='MYSTERY BOX' imageUrl='/images/marketplace-images/MYSTERY-BOX.png' />
                        <MarketplaceItem buttonTitle='MYSTERY WAEPON' imageUrl='/images/marketplace-images/MYSTERY-WAEPON.png' />
                        <MarketplaceItem buttonTitle='MYSTERY ARMOR' imageUrl='/images/marketplace-images/MYSTERY-ARMOR.png' />
                        <MarketplaceItem buttonTitle='MYSTERY HELMET' imageUrl='/images/marketplace-images/MYSTERY-HELMET.png' />
                    </Box>
                </Box>
            </Section>
            <Section mt={5} mb={5}>
                <ImageDecord className='decord-left' src="/images/avarta-arrow/men-arrow.png" alt="men-arrow" />
                <ImageDecord className='decord-right' src="/images/avarta-arrow/girld-arrow.png" alt="girld-arrow" />
            </Section>
            <Section sx={{marginTop: '100px', marginBottom: '140px', paddingLeft: '90px', paddingRight: '90px', zIndex: '10'}}>
                <Box sx={{maxWidth: '1440px', margin: 'auto'}}>
                    <Title mb={5} text="Farm & Pool" icon='/images/icons/farm-pool-icon.png' />
                    <Box flexDirection={isMobile ? 'column' : 'row'} sx={{display: 'flex'}}>
                        <FarmPoolItem title='Liquidity' price='$456.565' />
                        <FarmPoolItem title='Liquidity' price='$456.565' />
                        <FarmPoolItem title='Liquidity' price='$456.565' buttonTitle='Connect Wallet' />
                    </Box>
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
        width: 100%;
        max-width: fit-content;
        margin-bottom: 24px;
    }

    @media only screen and (max-width: 767px) {
        max-width: 320px;
        position: relative;
    }
`
const Socials = styled(Box)`
    ul {
        list-style: none;
        display: flex;

        li {
            width: 40px;
            height: 40px;
            background-image: url( )
        }
    }
`
const PlayToEarn = styled(Button)`
    background: #FFA800;
    height: 40px;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    padding-left: 30px;
    padding-right: 30px;
    border-radius: 0;
    border-bottom: 7px solid #C16000;
    box-sizing: content-box;
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
        left: 0;
        z-index: 1;
    }

    .decord-right {
        right: 0;
        z-index: 1;
    }

    @media only screen and (max-width: 767px) {
        .decord-left,
        .decord-right {
            display: none;
        }
    }
`
const ImageDecord = styled.img`
    position: absolute;
`

export default SampleView
