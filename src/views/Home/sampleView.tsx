import React, { useMemo } from 'react'
import styled from '@emotion/styled'
import {
    Box
} from '@mui/material'
import history from 'routerHistory'
import { Button, useMatchBreakpoints } from '@pancakeswap/uikit'
import Title from 'components/Layout/Title'
import { useWeb3React } from '@web3-react/core'
import { formatNumber } from 'utils/formatBalance';
import { useFarms, useLpTokenPrice, usePriceHtdBusd } from 'state/farms/hooks';
import { usePools } from 'state/pools/hooks'
import { formatEther } from 'ethers/lib/utils'
import usePoolsWithBalance from './hooks/usePoolsWithBalance'
import useFarmsWithBalance from './hooks/useFarmsWithBalance'
import MarketplaceItem from './components/MarketplaceItem';
import FarmPoolItem from './components/FarmPoolItem';

const LP_SYMBOL = 'BIG-BUSD'

const SampleView = () => {
    const { isMobile } = useMatchBreakpoints()
    const socials = [
        {
            title: 'Discord',
            link: "https://discord.com/invite/5TqqMHX9Sz",
            image: '/images/socials/discord.svg'
        },
        {
            title: 'Telegram',
            link: "https://t.me/DarkLandSurvivalAnnounce",
            image: '/images/socials/telegram.svg'
        },
        {
            title: 'Twitter',
            link: "https://twitter.com/DarkLandGame",
            image: '/images/socials/twitter.svg'
        },
        {
            title: 'Facebook',
            link: "https://www.facebook.com/darklandsurvival/",
            image: '/images/socials/facebook.svg'
        },
        {
            title: 'Youtube',
            link: "https://www.youtube.com/channel/UC29_ydawYyxoDw7hlMASI1g",
            image: '/images/socials/youtube.svg'
        },
    ]
    const tokenPrice = Number(usePriceHtdBusd())
    const lpPrice = Number(useLpTokenPrice(LP_SYMBOL))
    const { farmsWithStakedBalance, earningsSum, staked: stakedFarm } = useFarmsWithBalance()
    const { poolsWithStakedBalance, earningsPool, staked: stakedPool } = usePoolsWithBalance()

    const { account } = useWeb3React()
    const { data: farms } = useFarms()
    const { pools } = usePools(account)
    const totalInvest = (stakedPool * tokenPrice) || 0;
    const totalReward = ((earningsSum + earningsPool) * tokenPrice) || 0;

    const liquidity = useMemo(() => {
        // const farmLiq = farms.reduce((acc, farm) => Number(farm.lpTotalInQuoteToken ?? 0) + acc, 0)
        const poolLiq = pools.reduce((acc, pool) => {
            if (pool.isFinished !== undefined && !pool.isFinished) {
                return (
                    Number(
                        formatEther(
                            pool?.totalStaked?.toString() !== 'NaN' ? pool?.totalStaked?.toString() : 0,
                        ),
                    ) *
                    pool.earningTokenPrice +
                    acc
                )
            }
            return 0
        }, 0)

        return poolLiq
    }, [pools])

    return (
        <Wrapper>
            <VideoWrap>
                <Header src="https://ipfs.infura.io/ipfs/bafybeihsb6mjre37jrvlz3jz7f6o5lzoxp55aoywc4z7in5npt44n6swau" loop autoPlay muted />
                <WrapImage>
                    <PlayToEarn onClick={() => history.push('/play-game')}>PLAY TO EARN NOW</PlayToEarn>
                    <Socials>
                        <ul>
                            {socials?.map((item, index) => (
                                <li>
                                    <a target='_blank' href={item.link} rel="noreferrer">
                                        <img src={item.image} alt={item.title} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </Socials>
                </WrapImage>
            </VideoWrap>
            {/* <Section sx={{paddingLeft: '90px', paddingRight: '90px'}}>
                
            </Section> */}
            <Section className='marketplace'>
                <Box sx={{ maxWidth: '1440px', margin: 'auto' }}>
                    <Title mb={5} text="Marketplace" icon='/images/icons/marketplace-icon.png' />
                    <WrapMarketplaceItem className='grid'>
                        <MarketplaceItem buttonTitle='MYSTERY BOX' imageUrl='/images/marketplace-images/MYSTERY-BOX.png' />
                        <MarketplaceItem buttonTitle='MYSTERY WEAPON' imageUrl='/images/marketplace-images/MYSTERY-WAEPON.png' />
                        <MarketplaceItem buttonTitle='MYSTERY ARMOR' imageUrl='/images/marketplace-images/MYSTERY-ARMOR.png' />
                        <MarketplaceItem buttonTitle='MYSTERY HELMET' imageUrl='/images/marketplace-images/MYSTERY-HELMET.png' />
                    </WrapMarketplaceItem>
                </Box>
            </Section>
            <Section mt={5} mb={5}>
                <ImageDecord className='decord-left' src="/images/avarta-arrow/men-arrow.png" alt="men-arrow" />
                <ImageDecord className='decord-right' src="/images/avarta-arrow/girld-arrow.png" alt="girld-arrow" />
            </Section>
            <Section className='farm-pool' sx={{}}>
                <Box sx={{ maxWidth: '1440px', margin: 'auto' }}>
                    <Title mb={5} text="Pools" icon='/images/icons/farm-pool-icon.png' />
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <FarmPoolItem title='Liquidity' price={`$${formatNumber(liquidity, 2, 3)}`} />
                        <FarmPoolItem title='Your investment' price={`$${formatNumber(totalInvest, 2, 3)}`} />
                        <FarmPoolItem title='Your reward' price={`$${formatNumber(totalReward)}`} buttonTitle='Connect Wallet' />
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

    @media only screen and (max-width: 767px) {
        margin-top: 15px;
    }
`
const WrapImage = styled(Box)`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    top: calc(100vw - 127%);
    left: calc(100vw - 84%);
    position: absolute;
    z-index: 2;
    > img {
        width: 100%;
        max-width: fit-content;
        margin-bottom: 24px;
    }

    @media only screen and (max-width: 851px) {
        max-width: 320px;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
    }
`
const WrapMarketplaceItem = styled(Box)`
    grid-template-columns: repeat(4, minmax(0, 1fr));

    @media only screen and (max-width: 1199px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        row-gap: 50px;
    }

    @media only screen and (max-width: 767px) {
        grid-template-columns: repeat(1, minmax(0, 1fr));
        row-gap: 50px;
    }
`
const Socials = styled(Box)`
    ul {
        list-style: none;
        display: flex;

        li {
            width: 40px;
            height: 40px;
            background-image: url('/bg-social.png');
            position: relative;
            background-repeat: no-repeat;
            margin-left: 6px;
            margin-right: 6px;
        }

        a {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-55%, -55%);
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
    margin-bottom: 25px;
`
const Header = styled.video`
    display: flex;
    gap: 20px;
    align-items: center;
    background-repeat: no-repeat;
    background-size: contain;
    width: 100%;
    z-index: 1;
    position: relative;

    @media only screen and (max-width: 767px) {
        background-size: cover;
        padding-bottom: 30px;
    }
`
const Section = styled(Box)`
    position: relative;

    .decord-left {
        left: 0;
        z-index: 0;
    }

    .decord-right {
        right: 0;
        z-index: 0;
        top: -82px
    }

    &.farm-pool {
        margin-top: 100px;
        margin-bottom: 140px;
        padding-left: 90px;
        padding-right: 90px;
        z-index: 10;
    }

    &.marketplace {
        padding-left: 90px;
        padding-right: 90px;
    }

    @media only screen and (max-width: 851px) {
        .decord-left,
        .decord-right {
            display: none;
        }
        
        &.farm-pool {
            margin-top: 0;
            margin-bottom: 40px;
        }
    }

    @media only screen and (max-width: 767px) {
        &.marketplace {
            padding-left: 15px;
            padding-right: 15px;
        }

        &.farm-pool {
            padding-left: 15px;
            padding-right: 15px;
        }
    }
`
const ImageDecord = styled.img`
    position: absolute;
`

const VideoWrap = styled.div`
    position: relative;
`

export default SampleView
