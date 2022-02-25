import React from 'react'
import styled from '@emotion/styled'
import {
    Box
} from '@mui/material'
import { useMatchBreakpoints } from '@pancakeswap/uikit'
import { style } from '@mui/system'

const MarketplaceItem = (prop) => {
    const { isMobile } = useMatchBreakpoints()
    const {buttonTitle, imageUrl, mt, mb} = prop;

    return (
        <Item mt={mt} mb={mb}>
            <Img src={imageUrl} alt={buttonTitle} />
            <ModuleBorderWrap>
                <Button>{buttonTitle}</Button>
            </ModuleBorderWrap>
        </Item>
    )
}

const Item = styled(Box)`
    padding-left: 15px;
    padding-right: 15px;
    height: 100%;
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;

    @media only screen and (max-width: 767px) {
        max-width: 100%;
        margin-left: 0;
        margin-top: 10px;
    }
`

const ModuleBorderWrap = styled(Box)`
    display: block;
    margin: auto;
    width: 250px;
    position: relative;
    padding: 3px;
    align-self: flex-end;
    background: linear-gradient(102.16deg, #00FDFF 0%, #22C3FF 3.86%, #4190FF 7.78%, #5B64FF 11.78%, #7040FF 15.78%, #8124FF 19.78%, #8D10FF 23.79%, #9404FF 27.81%, #9600FF 31.88%, #00FDFF 64.8%, #22C3FF 69.06%, #4190FF 73.39%, #5B64FF 77.8%, #7040FF 82.22%, #8124FF 86.64%, #8D10FF 91.06%, #9404FF 95.51%, #9600FF 100%);
`

const Button = styled.button`
    color: #FFFFFF;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 25px;
    position: relative;
    max-width: 244px;
    width: 244px;
    padding-top: 11px;
    padding-bottom: 10px;
    background-image: linear-gradient(100.94deg, #185E93 0%, #185E93 0.16%, #0F4479 13.81%, #083164 28.76%, #042356 45.74%, #011A4E 66.26%, #00184B 100%);
`

const Img = styled.img`
    margin: auto;
    margin-bottom: 60px;
    flex: 1;
    object-fit: contain;
`

export default MarketplaceItem
