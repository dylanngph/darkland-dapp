import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import Container from 'components/Layout/Container'
import { IBoxData } from 'config/constants/types'
import { Box } from '@mui/material'
import useRefresh from 'hooks/useRefresh'
import { useMatchBreakpoints } from '@pancakeswap/uikit'
import boxData from 'config/constants/boxData'
import BoxSection from './components/BoxSection'
import { fetchFarms } from './hooks/fetchPublicUserPool'


const NFTStaking = () => {
  const { isMobile } = useMatchBreakpoints()
	const { account } = useWeb3React()
	const { fastRefresh } = useRefresh()
	const [boxDataPublic, setBoxDataPublic] = useState<IBoxData[]>([])

	useEffect(() => {
		const fetchData = async() => {
			const userData = await fetchFarms(boxData, account)
			setBoxDataPublic(userData)
		}
		if (account) fetchData()
	}, [account, fastRefresh])

  return (
    <Page>
        <Hero>
            <HeroLayout>
                <Box p="20px" >
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px'
                    }}>
                        <Box sx={{
                            'img' : {
                                height: '140px'
                            }
                        }}>
                            <img src="images/nftDivider.png" alt="divider"/>
                        </Box>
                        <Box sx={{
                            textTransform: 'uppercase',
                            textShadow: '0px 4px 7px rgba(142, 235, 255, 0.54)',
                            lineHeight: '1'
                        }}>
                            <Box sx={{
                                fontSize: isMobile ? '32px' :'48px',
                                fontWeight: '700',
                            }}>
                                Stake <span style={{color: '#FFA800'}}>$BIG</span>
                            </Box>
                            <Box sx={{
                                fontSize: isMobile? '56px' : '74px',
                                fontWeight: '700',
                            }}>
                                Earn NFTS
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{
                        fontWeight: '600',
                        lineHeight: '1.5'
                    }}>
                        The Event will start from <br/>
                        <span style={{color: '#00FB28'}}>13:00 UTC April 15 </span> to <span style={{color: '#00FB28'}}>13:00 UTC May 15</span> 
                    </Box>
                </Box>
                <img src="images/nftBox.svg" alt="" width={isMobile ? "500px" : "700px"} />
            </HeroLayout>
        </Hero>
        <StakingLayout>{ boxDataPublic.map(item => <BoxSection isMobile={isMobile} boxData={item} />) }</StakingLayout>
    </Page>
  )
}

const Page = styled(Box)`
    min-height: 100vh;
    padding-top: 80px !important;
    background: #000C38;
    color: #fff;
    padding-bottom: 100px;
`
const Hero = styled(Box)`
    width: 100%;
    min-height: 500px;
    background-image: url('images/nftStakingBg.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    object-fit: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
`
const HeroLayout = styled(Box)`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
`
const StakingLayout = styled(Box)`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: center;
`

export default NFTStaking