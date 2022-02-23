import React from 'react'
import styled from '@emotion/styled'
import {
    Box
} from '@mui/material'
import { useMatchBreakpoints } from '@pancakeswap/uikit'
import { style } from '@mui/system'
import ConnectWalletButton from 'components/ConnectWalletButton'

const FarmPoolItem = (prop) => {
    const { isMobile } = useMatchBreakpoints()
    const {buttonTitle, title, price, mt, mb} = prop;

    const Price = styled.p`
        color: #FFFFFF;
        font-style: normal;
        font-weight: 800;
        font-size: 40px;
        line-height: 54px;
        letter-spacing: 1px;
        margin: 0;
        ${buttonTitle ? 'margin-bottom: 24px;' : '' }
    `

    return (
        <Item mt={mt} mb={mb}>
            <Title>{title}</Title>
            <Price>{price}</Price>
            {buttonTitle ? <ConnectWalletButton /> : null}
        </Item>
    )
}

const Item = styled(Box)`
    display: inline-flex;
    width: 100%;
    max-width: calc(100% / 3 - 30px);
    text-align: center;
    background-image: url('/images/farm-pool-bg.png');
    border: 4px solid #00BFD5;
    aspect-ratio: 1/0.6;
    margin-left: 15px;
    margin-right: 15px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-repeat: no-repeat;
    background-size: cover;

    @media only screen and (max-width: 1199px) {
        aspect-ratio: 1;
    }

    @media only screen and (max-width: 859px) {
        aspect-ratio: 1/0.4;
        max-width: 100%;
        margin-bottom: 20px
    }

    @media only screen and (max-width: 767px) {
        max-width: 100%;
        margin-top: 10px;
    }
`

const Title = styled.p`
    color: #FFA800;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
    margin: 0;
`

export default FarmPoolItem
