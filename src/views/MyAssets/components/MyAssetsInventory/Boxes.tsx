import { Box } from '@mui/material'
import { Button } from '@pancakeswap/uikit'
import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import {useFetchMysteryBox, useFetchPremiumBox , useFetchMysteryBoxId , useFetchPremiumBoxId} from 'views/MyAssets/hooks/useFetchMysteryBox'


const Boxes = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const mysteryBox = useFetchMysteryBox()
  const premiumBox = useFetchPremiumBox()
  const mysteryId =  useFetchMysteryBoxId()
  const premiumId = useFetchPremiumBoxId()

  return (
    <Box sx={{
      marginTop: '40px'
    }}>
      <Box display="flex" gap="20px" alignItems="center" flexWrap='wrap' >
        <Card sx={{
          alignItems: 'center'
        }}>
          <BoxWrapper>
            <img src='images/blindbox/common_box.png' alt="" width="200px" />
          </BoxWrapper>
          <Title>Mystery Box</Title>
          <AmountText>
            Amount:
            <span style={{color: '#E6AB58'}}> {mysteryBox ?? 0}</span>
          </AmountText>
          <OpenButton disabled >
              Coming soon
          </OpenButton>
        </Card>
        <Card sx={{
          alignItems: 'center'
        }}>
          <BoxWrapper>
            <img src='images/blindbox/premium_box.png' alt="" width="200px" />
          </BoxWrapper>
          <Title>Premium Box</Title>
          <AmountText>
            Amount: 
            <span style={{color: '#E6AB58'}}> {premiumBox ?? 0}</span>
          </AmountText>
          <OpenButton disabled >
              Coming soon
          </OpenButton>
        </Card>
      </Box>
      
    </Box>
  )
}



const Card = styled(Box)`
  display: flex;
  flex-direction: column;
  background: #091749;
  padding: 35px 45px 30px 45px;
  gap: 20px;
`


const BoxWrapper = styled(Box)`
  min-height: 220px;
`

const Title = styled(Box)`
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase
`
const AmountText = styled(Box)`
  font-weight: 700;
`
const OpenButton = styled(Button)`
  // background-color: #FFA800;
  border-radius: 0;
  // padding: 8px 30px;
  // :hover {
  //   background-color: rgba(255, 168, 0, .8);
  // }
  // :disabled {
  //   color: #333;
  //   background-color: #
  // }
`

export default Boxes
