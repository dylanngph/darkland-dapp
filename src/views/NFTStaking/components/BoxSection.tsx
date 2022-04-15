import React from 'react'
import styled, { keyframes } from 'styled-components'
import { IBoxData } from 'config/constants/types'
import { Box } from '@mui/material'
import StepBox from './StepBox'

export type BoxProp = {
    isMobile?: boolean
    boxData: IBoxData
}

const BoxSection = ({isMobile, boxData }:BoxProp) => {
  return (
    <Wrapper>
        <Flex sx={{
            flexDirection: isMobile? 'column' : 'row'
        }}>
            <Box width={isMobile ? "100%" : "43%"} >
                <Box sx={{
                    'img':{
                        height: '378px',
                        position: 'absolute',
                        zIndex: '1',
                    }
                }}>
                    <img src="images/nftStaking/light.png" alt="" />
                </Box>
                <StyledBox sx={{
                    'img':{
                        width: '200px',
                        position: 'relative',
                        zIndex: '2',
                        top: '70px',
                        left: '50%',
                        transform: 'translateX(-50%)'
                    }
                }}>
                    <img src={`images/nftStaking/${boxData.image}`} width="100%" alt="" />
                </StyledBox>
                <Box sx={{
                    position: 'relative',
                    zIndex: '2',
                    top: '90px',
                    // left: isMobile ? '33%' : '110px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Box sx={{
                        color: '#FFA800',
                        textTransform: 'uppercase',
                        fontWeight: '700',
                        fontSize: '30px',
                        marginBottom: '10px'
                    }}>
                        {boxData.type} Box
                    </Box>
                    <Box sx={{fontSize: '20px'}} >
                        <span style={{color: '#00FB28'}}>{ boxData.totalUserStaking }</span> / {boxData.poolLimitUser}
                    </Box>
                </Box>
            </Box>
            <Box width={isMobile ? "100%" : "57%"} p="30px" mt={isMobile && '100px'}  >
                <StepBox isMobile={isMobile} boxData={boxData} />
            </Box>
        </Flex>
        
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
    width: 100%;
    max-width: 1080px;
    min-height: 444px;
    background-image: url('images/nftStaking/bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    object-fit: cover;
    display: flex;
`
const Floating = keyframes`
    0% {
        transform: translateY(0)
    }
    50% {
        transform: translateY(20px)
    }
    100% {
        transform: translateY(0px)
    }
`
const StyledBox = styled(Box)`
    transition: .3s ease-in;
    animation: ${Floating} 4s linear infinite;
`
const Flex = styled(Box)`
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
`

export default BoxSection