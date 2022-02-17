import React from 'react'
import styled from '@emotion/styled'
import {
    Box
} from '@mui/material'
import { useMatchBreakpoints } from '@pancakeswap/uikit'
import { style } from '@mui/system'

const FarmPoolItem = (prop) => {
    const { isMobile } = useMatchBreakpoints()
    const {buttonTitle, title, price, mt, mb} = prop;

    return (
        <Item mt={mt} mb={mb}>
            <Title>{title}</Title>
            <Price>{price}</Price>
            {buttonTitle ? <Button>{buttonTitle}</Button> : null}
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
`

const Button = styled.button`
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 25px;
    max-width: 200px;
    width: 100%;
    background: #FFA800;
    text-align: center;
    padding: 9px 5px 8px;
    border-bottom: 4px solid #C16000;
    margin-top: 15px;
`

const Price = styled.p`
    color: #FFFFFF;
    font-style: normal;
    font-weight: 800;
    font-size: 40px;
    line-height: 54px;
    letter-spacing: 1px;
    margin: 0;
`

const Title = styled.p`
    color: #FFA800;
    font-style: normal;
    font-weight: 300;
    font-size: 24px;
    line-height: 30px;
    margin: 0;
`

export default FarmPoolItem
