import React from 'react'
import styled from '@emotion/styled'
import {
    Box
} from '@mui/material'
import { Button, useMatchBreakpoints } from '@pancakeswap/uikit'
import { style } from '@mui/system'

const Title = (prop) => {
    const { isMobile } = useMatchBreakpoints()
    const {text, icon} = prop;

    return (
        <Flex>
            <TitleContent>{text}</TitleContent>
            {icon ? <Img src={icon} alt={text} /> : null}
        </Flex>
    )
}

const Flex = styled(Box)`
    display: flex;
    align-item: center;
    justify-content: center;
`

const TitleContent = styled.h3`
    font-style: normal;
    font-weight: 800;
    font-size: 40px;
    line-height: 54px;
    color: #FFFFFF;
`

const Img = styled.img`
    margin-left: 13px;
`

export default Title
